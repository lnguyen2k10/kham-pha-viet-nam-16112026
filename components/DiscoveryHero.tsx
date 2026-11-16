'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Info, MapPin, Navigation } from 'lucide-react';
import { provinces, businesses, businessRecordLabel, isDemoMode } from '@/lib/data';
import VietnamMap from './VietnamMap';
import { aggregateMapBusinesses } from '@/lib/map-data';
const counts = aggregateMapBusinesses(businesses);

export default function DiscoveryHero() {
  const [selected, setSelected] = useState('da-nang');
  const province = provinces.find(p => p.slug === selected)!;
  return <section className="dream-hero focused-hero" aria-label="Khám phá tinh hoa mọi miền Việt Nam">
    <div className="dream-scene"><Image src="/images/discovery-world.png" alt="Phong cảnh Việt Nam tưởng tượng, minh họa sáng tạo bằng AI" fill priority sizes="100vw" quality={85} /></div>
    <div className="dream-atmosphere" />
    <div className="dream-copy">
      <span className="dream-intro">Khám phá</span>
      <h1><span>Tinh hoa</span><span>mọi miền</span><em>Việt Nam</em></h1>
      <p>Tìm một miền đất để khám phá.<br />Gặp những doanh nghiệp làm nên bản sắc địa phương.</p>
      <Link className="dream-start" href="#bat-dau"><span><Navigation size={18} /></span>Bắt đầu khám phá <ArrowRight size={22} /></Link>
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
      <p className="map-disclaimer"><Info size={16} /><span>Sơ đồ minh họa, không dùng để xác định ranh giới. Ký hiệu đảo, quần đảo không theo tỷ lệ; không thể hiện đầy đủ từng đảo. Số trong điểm là số {businessRecordLabel}. Không phải tọa độ doanh nghiệp.</span></p>
    </aside>
    <span className="dream-art-note">Phong cảnh minh họa sáng tạo bằng AI, không phải bản đồ địa lý.</span>
  </section>;
}
