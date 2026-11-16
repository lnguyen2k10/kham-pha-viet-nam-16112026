import { categories, provinces, normalize, type Business } from './data';
export function validateBusinessInput(input:Record<string,unknown>) {
  const text=(key:string,min:number,max:number)=>{const v=input[key];if(typeof v!=='string'||v.trim().length<min||v.length>max||/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(v))throw new Error(`Vui lòng kiểm tra ${key==='name'?'tên doanh nghiệp':key==='description'?'giới thiệu':key==='address'?'địa chỉ':key}.`);return v.trim();};
  const name=text('name',2,120),province=text('province',2,80),category=text('category',2,80),address=text('address',5,300),description=text('description',40,3000),phone=text('phone',9,20);
  if(!provinces.some(p=>p.slug===province))throw new Error('Vui lòng chọn tỉnh / thành phố.');
  if(!categories.slice(1).includes(category))throw new Error('Vui lòng chọn ngành nghề.');
  if(!/^[+0-9 ()-]{9,20}$/.test(phone))throw new Error('Số điện thoại chưa hợp lệ.');
  if(input.consent!==true)throw new Error('Vui lòng xác nhận quyền đăng thông tin.');
  const website=typeof input.website==='string'?input.website.trim():'';
  if(website){let url;try{url=new URL(website);}catch{throw new Error('Website cần bắt đầu bằng https://.');}if(url.protocol!=='https:'||url.username||url.password||website.length>300)throw new Error('Website chưa hợp lệ.');}
  const zalo=typeof input.zalo==='string'?input.zalo.replace(/[+ ()-]/g,''):'';
  if(zalo&&!/^(0\d{9}|84\d{9})$/.test(zalo))throw new Error('Số Zalo chưa hợp lệ.');
  const services=typeof input.services==='string'?input.services.split('\n').map(s=>s.trim()).filter(Boolean):[];
  if(services.length>6||services.some(s=>s.length>140))throw new Error('Nhập tối đa 6 dịch vụ, mỗi dòng tối đa 140 ký tự.');
  return {name,province,category,address,description,phone,zalo:zalo||null,website:website||null,services,tagline:typeof input.tagline==='string'&&input.tagline.trim()?input.tagline.trim().slice(0,160):description.slice(0,130)};
}
export function slugFromName(name:string){return normalize(name).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,65)||'doanh-nghiep';}
export function detectImage(bytes:Uint8Array){if(bytes[0]===0xff&&bytes[1]===0xd8&&bytes[2]===0xff)return{mime:'image/jpeg',ext:'jpg'};if(bytes[0]===0x89&&bytes[1]===0x50&&bytes[2]===0x4e&&bytes[3]===0x47)return{mime:'image/png',ext:'png'};if(new TextDecoder().decode(bytes.slice(0,4))==='RIFF'&&new TextDecoder().decode(bytes.slice(8,12))==='WEBP')return{mime:'image/webp',ext:'webp'};return null;}
export function asPublishedBusiness(input:ReturnType<typeof validateBusinessInput>,slug:string,image:string,imageKind:'area'|'business'):Business{return{...input,slug,commune:'',image,imageKind,isSample:false,submissionType:'self'};}

export function sameOrigin(origin:string|null,host:string|null){if(!origin||!host)return false;try{const url=new URL(origin);return ['http:','https:'].includes(url.protocol)&&url.host===host;}catch{return false;}}
