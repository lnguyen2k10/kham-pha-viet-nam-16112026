import { NextRequest,NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { revalidateTag,revalidatePath } from 'next/cache';
import { readStoredBusiness,tokenHash,updateBusiness } from '@/lib/business-store';
import { validateBusinessInput,asPublishedBusiness,sameOrigin } from '@/lib/business-input';
export const runtime='nodejs';
export async function GET(request:NextRequest,{params}:{params:Promise<{slug:string}>}){const{slug}=await params;const saved=await readStoredBusiness(slug);if(!saved)return NextResponse.json({error:'Không tìm thấy trang.'},{status:404});const token=request.cookies.get(`kpvn_edit_${slug}`)?.value;const canEdit=Boolean(token&&tokenHash(token)===saved.record.editHash);return NextResponse.json({business:saved.record.business,canEdit},{headers:{'Cache-Control':'no-store'}});}
export async function PUT(request:NextRequest,{params}:{params:Promise<{slug:string}>}){
  if(!sameOrigin(request.headers.get('origin'),request.headers.get('host')))return NextResponse.json({error:'Yêu cầu không hợp lệ.'},{status:403});
  const{slug}=await params;const saved=await readStoredBusiness(slug);if(!saved)return NextResponse.json({error:'Không tìm thấy trang.'},{status:404});
  const token=request.cookies.get(`kpvn_edit_${slug}`)?.value;
  if(!token||!timingSafeEqual(Buffer.from(tokenHash(token)),Buffer.from(saved.record.editHash)))return NextResponse.json({error:'Trình duyệt này không có quyền chỉnh sửa trang.'},{status:403});
  if(Number(request.headers.get('content-length')||0)>16000)return NextResponse.json({error:'Nội dung quá dài.'},{status:413});
  let input;try{input=validateBusinessInput(await request.json());}catch(error){return NextResponse.json({error:(error as Error).message},{status:400});}
  const updated=asPublishedBusiness(input,slug,saved.record.business.image,saved.record.business.imageKind);
  if(!await updateBusiness(saved.record,updated,saved.etag))return NextResponse.json({error:'Trang vừa được cập nhật. Hãy tải lại trước khi lưu.'},{status:409});
  revalidateTag('business-directory');for(const path of ['/', '/doanh-nghiep','/ban-do',`/doanh-nghiep/${slug}`,`/dia-phuong/${input.province}`,`/dia-phuong/${saved.record.business.province}`])revalidatePath(path);return NextResponse.json({url:`/doanh-nghiep/${slug}`});
}
export async function DELETE(request:NextRequest,{params}:{params:Promise<{slug:string}>}){
  if(!sameOrigin(request.headers.get('origin'),request.headers.get('host')))return NextResponse.json({error:'Yêu cầu không hợp lệ.'},{status:403});
  const{slug}=await params;const saved=await readStoredBusiness(slug);if(!saved)return NextResponse.json({error:'Không tìm thấy trang.'},{status:404});
  const token=request.cookies.get(`kpvn_edit_${slug}`)?.value;if(!token||!timingSafeEqual(Buffer.from(tokenHash(token)),Buffer.from(saved.record.editHash)))return NextResponse.json({error:'Bạn không có quyền xóa trang này.'},{status:403});
  const {del}=await import('@vercel/blob');
  await del(`business-pages/${slug}.json`,{ifMatch:saved.etag});
  if(saved.record.business.image.startsWith('/api/business-photo/'))await del(`business-images/${saved.record.business.image.split('/').pop()}`).catch(()=>{});
  revalidateTag('business-directory');for(const path of ['/', '/doanh-nghiep','/ban-do',`/doanh-nghiep/${slug}`,`/dia-phuong/${saved.record.business.province}`])revalidatePath(path);
  const response=NextResponse.json({deleted:true});response.cookies.delete(`kpvn_edit_${slug}`);return response;
}
