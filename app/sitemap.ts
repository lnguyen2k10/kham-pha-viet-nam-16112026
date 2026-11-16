import type{MetadataRoute}from'next';
import{provinces,places,communes}from'@/lib/data';
import{getBusinesses}from'@/lib/business-store';
import{siteUrl}from'@/lib/site';
export const revalidate=300;
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const businesses=await getBusinesses();return['','/dia-phuong','/diem-den','/doanh-nghiep','/ban-do','/thong-tin',...provinces.map(p=>`/dia-phuong/${p.slug}`),...communes.map(c=>`/dia-phuong/${c.province}/${c.slug}`),...places.map(p=>`/diem-den/${p.slug}`),...businesses.map(b=>`/doanh-nghiep/${b.slug}`)].map(path=>({url:siteUrl+path,changeFrequency:path.startsWith('/doanh-nghiep')?'weekly':'monthly',priority:path===''?1:path.startsWith('/dia-phuong/')?.8:.6}));}
