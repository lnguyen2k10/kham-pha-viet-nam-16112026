import { randomBytes } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
import { revalidateTag,revalidatePath } from 'next/cache';
import { claimPostingSlot, createBusiness, storageReady } from '@/lib/business-store';
import { validateBusinessInput, slugFromName, detectImage, asPublishedBusiness, sameOrigin } from '@/lib/business-input';
import { provinces } from '@/lib/data';
export const runtime='nodejs';
export const maxDuration=60;
export async function POST(request:NextRequest){
  if(!sameOrigin(request.headers.get('origin'),request.headers.get('host')))return NextResponse.json({error:'Yêu cầu không hợp lệ.'},{status:403});
  if(!storageReady())return NextResponse.json({error:'Chưa thể đăng trang lúc này. Vui lòng thử lại sau.'},{status:503});
  const length=Number(request.headers.get('content-length')||0);if(length>2_000_000)return NextResponse.json({error:'Ảnh tối đa 1,5 MB.'},{status:413});
  let form:FormData;try{form=await request.formData();}catch{return NextResponse.json({error:'Không đọc được biểu mẫu.'},{status:400});}
  if(form.get('company_url'))return NextResponse.json({error:'Không thể đăng nội dung này.'},{status:400});
  let input;try{input=validateBusinessInput({...Object.fromEntries(form),consent:form.get('consent')==='true'});}catch(error){return NextResponse.json({error:(error as Error).message},{status:400});}
  const photo=form.get('photo');let bytes:Uint8Array|undefined,type:ReturnType<typeof detectImage>=null;
  if(photo instanceof File&&photo.size){if(photo.size>1_500_000)return NextResponse.json({error:'Ảnh tối đa 1,5 MB.'},{status:413});bytes=new Uint8Array(await photo.arrayBuffer());type=detectImage(bytes);if(!type)return NextResponse.json({error:'Chọn ảnh JPG, PNG hoặc WebP.'},{status:400});}
  const slug=`${slugFromName(input.name)}-${randomBytes(5).toString('hex')}`;let uploaded:string|undefined;let ratePath:string|null=null;
  try{
    const ip=request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown';
    ratePath=await claimPostingSlot(ip);
    if(!ratePath)return NextResponse.json({error:'Bạn vừa đăng một trang. Vui lòng chờ ít phút trước khi đăng thêm.'},{status:429});
    let image=provinces.find(p=>p.slug===input.province)!.image;
    if(bytes&&type){uploaded=`business-images/${slug}.${type.ext}`;await put(uploaded,Buffer.from(bytes),{access:'private',addRandomSuffix:false,contentType:type.mime});image=`/api/business-photo/${slug}.${type.ext}`;}
    const token=await createBusiness(asPublishedBusiness(input,slug,image,bytes?'business':'area'));
    revalidateTag('business-directory');for(const path of ['/', '/doanh-nghiep','/ban-do',`/dia-phuong/${input.province}`])revalidatePath(path);
    const response=NextResponse.json({slug,url:`/doanh-nghiep/${slug}`},{status:201});
    response.cookies.set(`kpvn_edit_${slug}`,token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:60*60*24*180});return response;
  }catch(error){if(uploaded)await del(uploaded).catch(()=>{});if(ratePath)await del(ratePath).catch(()=>{});console.error('business_publish_failed',error instanceof Error?error.name:'unknown');return NextResponse.json({error:'Trang chưa được đăng. Vui lòng thử lại sau.'},{status:503});}
}
