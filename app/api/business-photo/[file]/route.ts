import { get } from '@vercel/blob';
export async function GET(_request:Request,{params}:{params:Promise<{file:string}>}){
  const{file}=await params;if(!/^[a-z0-9-]+\.(jpg|png|webp)$/.test(file))return new Response(null,{status:404});
  try{const result=await get(`business-images/${file}`,{access:'private'});if(!result||result.statusCode!==200)return new Response(null,{status:404});return new Response(result.stream,{headers:{'Content-Type':result.blob.contentType,'X-Content-Type-Options':'nosniff','Cache-Control':'public, max-age=300'}});}catch{return new Response(null,{status:503});}
}
