'use client';
import { useEffect,useState } from 'react';
import Link from 'next/link';
export default function OwnerTools({slug}:{slug:string}){const[canEdit,setCanEdit]=useState(false);useEffect(()=>{let active=true;fetch(`/api/businesses/${encodeURIComponent(slug)}`).then(r=>r.ok?r.json():null).then(r=>{if(active)setCanEdit(Boolean(r?.canEdit));}).catch(()=>{});return()=>{active=false;};},[slug]);return canEdit?<div className="owner-tools"><strong>Đây là trang của bạn</strong><Link href={`/dang-ky?sua=${slug}`}>Chỉnh sửa thông tin ↗</Link></div>:null;}
