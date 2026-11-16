'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { provinces } from '@/lib/data';
import { ProvinceCard } from './Cards';
export default function Regions() {
  const [region, setRegion] = useState('Nổi bật');
  const featured = ['lao-cai', 'quang-ninh', 'ninh-binh', 'da-nang', 'gia-lai', 'an-giang'];
  const list = region === 'Nổi bật' ? featured.map(slug => provinces.find(p => p.slug === slug)!) : provinces.filter(p => p.region === region);
  return <><div className="region-tabs" role="group" aria-label="Chọn vùng miền">{['Nổi bật', 'Miền Bắc', 'Miền Trung', 'Miền Nam'].map(r => <button key={r} aria-pressed={region === r} onClick={() => setRegion(r)}>{r}{r !== 'Nổi bật' ? <small>{provinces.filter(p => p.region === r).length}</small> : null}</button>)}</div><div className="province-grid">{list.map(p => <ProvinceCard province={p} key={p.slug}/>)}</div><div className="all-provinces-link"><p>{region === 'Nổi bật' ? 'Một vài gợi ý để bắt đầu. Còn nhiều miền đất đang chờ bạn.' : `Đã hiển thị đầy đủ ${list.length} tỉnh, thành phố thuộc ${region.toLowerCase()}.`}</p><Link className="text-link" href="/dia-phuong">Xem tất cả 34 tỉnh thành<ArrowUpRight size={18}/></Link></div></>;
}
