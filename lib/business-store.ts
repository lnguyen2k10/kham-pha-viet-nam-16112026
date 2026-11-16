import 'server-only';
import { get, list, put, BlobError, BlobPreconditionFailedError } from '@vercel/blob';
import { createHash, createHmac, randomBytes } from 'node:crypto';
import { unstable_cache } from 'next/cache';
import { businesses, type Business } from './data';

export type StoredBusiness = { business:Business; editHash:string; createdAt:string; updatedAt:string };
const prefix = 'business-pages/';
export const businessPath = (slug:string) => `${prefix}${slug}.json`;
export const tokenHash = (token:string) => createHash('sha256').update(token).digest('hex');
export const storageReady = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
export async function readStoredBusiness(slug:string) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !storageReady()) return null;
  const result=await get(businessPath(slug),{access:'private',useCache:false});
  if(!result||result.statusCode!==200)return null;
  const record=await new Response(result.stream).json() as StoredBusiness;
  return {record,etag:result.blob.etag.replace(/^W\//,'')};
}
const readDirectory=unstable_cache(async()=>{
  if(!storageReady())return [] as Business[];
  const paths:string[]=[];let cursor:string|undefined;
  do { const page=await list({prefix,limit:1000,cursor});paths.push(...page.blobs.map(b=>b.pathname));cursor=page.hasMore?page.cursor:undefined; }while(cursor&&paths.length<1000);
  const output:Business[]=[];
  for(let i=0;i<paths.length;i+=12){
    const records=await Promise.all(paths.slice(i,i+12).map(async path=>{const r=await get(path,{access:'private',useCache:false});if(!r||r.statusCode!==200)return null;return (await new Response(r.stream).json() as StoredBusiness).business;}));
    output.push(...records.filter((b):b is Business=>Boolean(b)));
  }
  return output.sort((a,b)=>(b.createdAt||'').localeCompare(a.createdAt||''));
},['business-public-directory-v1'],{revalidate:30,tags:['business-directory']});
export async function getBusinesses(){const published=await readDirectory();return [...published,...businesses.filter(b=>!published.some(p=>p.slug===b.slug))];}
export async function getBusiness(slug:string){const fixed=businesses.find(b=>b.slug===slug);if(fixed)return fixed;return (await readStoredBusiness(slug))?.record.business||null;}
export async function claimPostingSlot(ip:string){
  const secret=process.env.BLOB_READ_WRITE_TOKEN; if(!secret)throw new Error('STORAGE_UNAVAILABLE');
  const bucket=Math.floor(Date.now()/(10*60*1000));
  const id=createHmac('sha256',secret).update(`${ip}:${bucket}`).digest('hex');
  try{await put(`posting-limits/${id}.json`,'{}',{access:'private',addRandomSuffix:false,allowOverwrite:false,ttlDays:1,contentType:'application/json'});return `posting-limits/${id}.json`;}
  catch(error){if(error instanceof BlobError&&/already exists|overwrite|precondition/i.test(error.message))return null;throw error;}
}
export async function createBusiness(business:Business){
  const editToken=randomBytes(32).toString('hex'),now=new Date().toISOString();
  const record:StoredBusiness={business:{...business,createdAt:now},editHash:tokenHash(editToken),createdAt:now,updatedAt:now};
  await put(businessPath(business.slug),JSON.stringify(record),{access:'private',addRandomSuffix:false,allowOverwrite:false,contentType:'application/json'});
  return editToken;
}
export async function updateBusiness(record:StoredBusiness,business:Business,etag:string){
  try{await put(businessPath(business.slug),JSON.stringify({...record,business:{...business,createdAt:record.createdAt},updatedAt:new Date().toISOString()}),{access:'private',addRandomSuffix:false,ifMatch:etag,contentType:'application/json'});return true;}
  catch(error){if(error instanceof BlobPreconditionFailedError)return false;throw error;}
}
