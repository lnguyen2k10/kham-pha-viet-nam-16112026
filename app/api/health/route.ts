import { list } from '@vercel/blob';
import { storageReady } from '@/lib/business-store';
export const dynamic='force-dynamic';
export async function GET(){let storage=false;if(storageReady())try{await list({prefix:'business-pages/',limit:1});storage=true;}catch{}return Response.json({status:storage?'ok':'degraded',service:'kham-pha-viet-nam',provinces:34,registration:storage?'open':'temporarily-unavailable',publishing:'immediate',pricing:'free'},{status:storage?200:503,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});}
