'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Info, MapPin, Navigation } from 'lucide-react';
import { provinces, businesses, businessRecordLabel, isDemoMode, type Business } from '@/lib/data';
import VietnamMap from './VietnamMap';
import { aggregateMapBusinesses } from '@/lib/map-data';


export default function DiscoveryHero({businessRecords=businesses}:{businessRecords?:Business[]}) {
  const counts=aggregateMapBusinesses(businessRecords);
  const [selected, setSelected] = useState(businessRecords[0]?.province||'ha-noi');
  const province = provinces.find(p => p.slug === selected)!;
  return <section className="dream-hero focused-hero illustrated-hero" aria-label="Khám phá tinh hoa mọi miền Việt Nam">
    <div className="dream-scene"><Image src="/images/discovery-world.png" alt="Minh họa nghệ thuật Việt Nam với cảnh quan, di sản và các biểu tượng văn hóa từ Bắc vào Nam" fill priority sizes="100vw" quality={85} /></div>
    <div className="dream-atmosphere" />
    <div className="dream-copy">
      <span className="dream-intro">KHÁM PHÁ VIỆT NAM</span>
      <h1><span>Tinh hoa</span><span>mọi miền</span><em>Việt Nam.</em></h1>
      <p>Tìm một miền đất để khám phá.<br />Gặp những doanh nghiệp làm nên bản sắc địa phương.</p>
      <Link className="dream-start" href="/dia-phuong"><span><Navigation size={18} /></span>Khám phá 34 tỉnh thành <ArrowRight size={22} /></Link>
      <Link className="hero-business-link" href="/ban-do">Mở bản đồ doanh nghiệp <ArrowRight size={17} /></Link>
    </div>
    <aside className="explorer-panel" aria-labelledby="explorer-heading">
      <h2 id="explorer-heading">Điểm sáng doanh nghiệp Việt</h2>
      <p className="explorer-guide">Mỗi điểm sáng kết nối những hồ sơ trong cùng địa phương.</p>
      <div className="explorer-map">
        <VietnamMap selected={selected} onSelect={setSelected} counts={counts} idPrefix="hero-map" />
      </div>
      <label className="map-location-select"><MapPin size={17} /><span className="sr-only">Chọn địa phương trên sơ đồ</span><select aria-label="Chọn địa phương trên sơ đồ" value={selected} onChange={event => setSelected(event.target.value)}>{provinces.map(p => <option value={p.slug} key={p.slug}>{p.name}</option>)}</select></label>
      <article className="map-place-preview" aria-live="polite"><img src={province.image} alt={`Cảnh quan minh họa ${province.name}`} /><div><h3>{province.name}</h3><p>{counts[selected]} {businessRecordLabel} · Điểm tổng hợp khu vực</p><Link href={`/ban-do?tinh=${province.slug}`}>Xem các điểm sáng <ArrowRight size={16} /></Link></div></article>
      <p className="map-disclaimer"><Info size={16} /><span>Số trong điểm là số doanh nghiệp tại địa phương. Sơ đồ không dùng để xác định vị trí cơ sở hoặc ranh giới.</span></p>
    </aside>
    <span className="dream-art-note">Minh họa nghệ thuật Việt Nam</span>
  </section>;
}
