'use client';

import { businessRecordLabel } from '@/lib/data';
import outline from '@/lib/vietnam-outline.json';
import { mapAnchors, projectMap } from '@/lib/map-data';

// Schematic reference points. Not outlines, administrative boundaries or business addresses.
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
export default function VietnamMap({ selected, onSelect, counts, idPrefix, paused = false }: {
  selected: string; onSelect: (slug: string) => void; counts: Record<string, number>; idPrefix: string; paused?: boolean;
}) {
  return <svg viewBox="0 0 410 555" className={`vietnam-outline light-map-svg ${paused ? 'light-map-paused' : ''}`} aria-labelledby={`${idPrefix}-title ${idPrefix}-description`}>
    <title id={`${idPrefix}-title`}>Sơ đồ điểm sáng doanh nghiệp Việt Nam</title>
    <desc id={`${idPrefix}-description`}>Điểm tổng hợp theo địa phương, không phải tọa độ cơ sở. Số trong điểm là số {businessRecordLabel} phù hợp bộ lọc. Có chú thích một số đảo, quần đảo chính; không dùng xác định ranh giới hoặc thể hiện đầy đủ từng đảo.</desc>
    <defs><linearGradient id={`${idPrefix}-land`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#cce6d0" /><stop offset="1" stopColor="#f4e7ac" /></linearGradient></defs>
    <g className="land-paths">{outline.paths.map((d, i) => <path key={i} d={d} fill={`url(#${idPrefix}-land)`} stroke="#fff" strokeWidth=".8" />)}</g>
    <g className="island-labels">{islands.map(island => { const { x, y } = projectMap(island.lon, island.lat); return <g key={island.name} transform={`translate(${x},${y})`}><circle r="2.5" /><text x={island.dx} y={island.dy} textAnchor={island.dx < 0 ? 'end' : 'start'}>{island.name}</text></g>; })}</g>
    <g className="archipelago" transform="translate(255,225)"><circle r="3" /><text x="13" y="-6"><tspan x="13">Quần đảo Hoàng Sa</tspan><tspan x="13" dy="14">(Việt Nam)</tspan></text></g>
    <g className="archipelago" transform="translate(300,445)"><circle r="3" /><text x="-12" y="29" textAnchor="end"><tspan x="-12">Quần đảo Trường Sa</tspan><tspan x="-12" dy="14">(Việt Nam)</tspan></text></g>
    {mapAnchors.map(marker => { const { x, y } = projectMap(marker.lon, marker.lat), count = counts[marker.slug] || 0, active = marker.slug === selected; return <g key={marker.slug} className={`map-point business-light ${count ? 'has-records' : 'no-records'} ${active ? 'selected' : ''}`} transform={`translate(${x},${y})`} role="button" tabIndex={0} aria-label={`Chọn ${marker.label}`} aria-pressed={active} onClick={() => onSelect(marker.slug)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(marker.slug); } }}><title>{`${marker.label}: ${count} ${businessRecordLabel} phù hợp`}</title><circle r="15" fill="transparent" />{count > 0 && <circle className="business-light-halo" r="14" fill="#ffc968" opacity=".35" />}<circle className="map-dot" r={count ? 10 : 4} fill={active ? '#ed3b7e' : count ? '#f6b746' : '#8aa6ae'} stroke="white" strokeWidth="1.8" />{count > 0 && <text className="business-light-count" y="3.2" textAnchor="middle">{count}</text>}</g>; })}
  </svg>;
}
