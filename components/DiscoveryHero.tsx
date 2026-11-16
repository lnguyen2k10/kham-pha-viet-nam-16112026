'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Info, MapPin, Navigation } from 'lucide-react';
import { provinces } from '@/lib/data';
import outline from '@/lib/vietnam-outline.json';

const markers = [
  { slug: 'ha-noi', lat: 21.03, lon: 105.83, label: 'Hà Nội' },
  { slug: 'quang-ninh', lat: 20.95, lon: 107.08, label: 'Quảng Ninh' },
  { slug: 'ninh-binh', lat: 20.25, lon: 105.97, label: 'Ninh Bình' },
  { slug: 'lao-cai', lat: 22.48, lon: 103.97, label: 'Lào Cai' },
  { slug: 'hue', lat: 16.47, lon: 107.59, label: 'Huế' },
  { slug: 'da-nang', lat: 16.05, lon: 108.2, label: 'Đà Nẵng' },
  { slug: 'ho-chi-minh', lat: 10.82, lon: 106.63, label: 'TP. Hồ Chí Minh' },
  { slug: 'can-tho', lat: 10.05, lon: 105.75, label: 'Cần Thơ' },
];
// Schematic anchors only: these points do not describe island outlines or boundaries.
const islands = [
  { name: 'Cô Tô', lon: 107.77, lat: 21, dx: 9, dy: -8 },
  { name: 'Cát Bà', lon: 107.05, lat: 20.8, dx: 9, dy: 12 },
  { name: 'Bạch Long Vĩ', lon: 107.73, lat: 20.13, dx: 9, dy: 16 },
  { name: 'Cồn Cỏ', lon: 107.34, lat: 17.16, dx: 8, dy: -8 },
  { name: 'Lý Sơn', lon: 109.12, lat: 15.38, dx: 8, dy: 12 },
  { name: 'Phú Quý', lon: 108.96, lat: 10.52, dx: 8, dy: 12 },
  { name: 'Côn Đảo', lon: 106.61, lat: 8.68, dx: 7, dy: 14 },
  { name: 'Phú Quốc', lon: 103.96, lat: 10.22, dx: -9, dy: -3 },
  { name: 'Thổ Chu', lon: 103.47, lat: 9.3, dx: -8, dy: 11 },
];
const project = (lon: number, lat: number) => ({ x: (lon - 101) * 23, y: 35 + (24 - lat) * 30 });

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
      <Link className="hero-business-link" href="/doanh-nghiep">Tìm doanh nghiệp địa phương <ArrowRight size={17} /></Link>
    </div>
    <aside className="explorer-panel" aria-labelledby="explorer-heading">
      <h2 id="explorer-heading">Việt Nam, những miền đất kết nối</h2>
      <p className="explorer-guide">Chọn một địa phương để bắt đầu hành trình.</p>
      <div className="explorer-map">
        <svg viewBox="0 0 410 555" className="vietnam-outline" aria-labelledby="vietnam-map-title vietnam-map-description">
          <title id="vietnam-map-title">Sơ đồ Việt Nam và một số đảo, quần đảo chính</title>
          <desc id="vietnam-map-description">Thể hiện đất liền, quần đảo Hoàng Sa, quần đảo Trường Sa, Phú Quốc, Côn Đảo và một số đảo chính. Các ký hiệu chỉ mang tính minh họa, không thể hiện ranh giới hay phạm vi đầy đủ của các quần đảo.</desc>
          <defs><linearGradient id="land-tone" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#cce6d0" /><stop offset="1" stopColor="#f4e7ac" /></linearGradient></defs>
          <g className="land-paths">{outline.paths.map((d, i) => <path key={i} d={d} fill="url(#land-tone)" stroke="#fff" strokeWidth=".8" />)}</g>
          <g className="island-labels">{islands.map(island => { const { x, y } = project(island.lon, island.lat); return <g key={island.name} transform={`translate(${x},${y})`}><circle r="2.5" /><text x={island.dx} y={island.dy} textAnchor={island.dx < 0 ? 'end' : 'start'}>{island.name}</text></g>; })}</g>
          <g className="archipelago" transform="translate(255,225)"><circle r="3" /><text x="13" y="-6"><tspan x="13">Quần đảo Hoàng Sa</tspan><tspan x="13" dy="14">(Việt Nam)</tspan></text></g>
          <g className="archipelago" transform="translate(300,445)"><circle r="3" /><text x="-12" y="-6" textAnchor="end"><tspan x="-12">Quần đảo Trường Sa</tspan><tspan x="-12" dy="14">(Việt Nam)</tspan></text></g>
          {markers.map(marker => { const { x, y } = project(marker.lon, marker.lat); const active = marker.slug === selected; return <g key={marker.slug} className={`map-point ${active ? 'selected' : ''}`} transform={`translate(${x},${y})`} role="button" tabIndex={0} aria-label={`Chọn ${marker.label}`} aria-pressed={active} onClick={() => setSelected(marker.slug)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelected(marker.slug); } }}><title>{marker.label}</title><circle r="13" fill={active ? '#f42c79' : 'transparent'} opacity=".2" /><circle className="map-dot" r={active ? 6 : 4} fill={active ? '#ec4778' : '#247b79'} stroke="white" strokeWidth="2" /></g>; })}
        </svg>
      </div>
      <label className="map-location-select"><MapPin size={17} /><span className="sr-only">Chọn địa phương trên sơ đồ</span><select aria-label="Chọn địa phương trên sơ đồ" value={selected} onChange={event => setSelected(event.target.value)}>{provinces.map(p => <option value={p.slug} key={p.slug}>{p.name}</option>)}</select></label>
      <article className="map-place-preview" aria-live="polite"><img src={province.image} alt={`Cảnh quan minh họa ${province.name}`} /><div><h3>{province.name}</h3><p>{province.tagline}</p><Link href={`/dia-phuong/${province.slug}`}>Khám phá địa phương <ArrowRight size={16} /></Link></div></article>
      <p className="map-disclaimer"><Info size={16} /><span>Sơ đồ minh họa, không dùng để xác định ranh giới. Ký hiệu đảo, quần đảo không theo tỷ lệ; không thể hiện đầy đủ từng đảo. Tám địa phương có nội dung demo.</span></p>
    </aside>
    <span className="dream-art-note">Phong cảnh minh họa sáng tạo bằng AI, không phải bản đồ địa lý.</span>
  </section>;
}
