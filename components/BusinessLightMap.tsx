'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, ArrowUpRight, MapPin, Sparkles, Pause, Play, X, Building2, Info } from 'lucide-react';
import { categories, communes, provinces, regions, isDemoMode, businessRecordLabel } from '@/lib/data';
import { aggregateMapBusinesses, filterMapBusinesses } from '@/lib/map-data';
import VietnamMap from './VietnamMap';

export default function BusinessLightMap() {
  const params = useSearchParams();
  const initialProvince = params.get('tinh');
  const [selected, setSelected] = useState(provinces.some(p => p.slug === initialProvince) ? initialProvince! : 'ninh-binh');
  const [query, setQuery] = useState(''), [category, setCategory] = useState('Tất cả'), [region, setRegion] = useState('Tất cả'), [paused, setPaused] = useState(false);
  const records = filterMapBusinesses({ query, category, region });
  const counts = aggregateMapBusinesses(records);
  const province = provinces.find(p => p.slug === selected)!;
  const localRecords = records.filter(b => b.province === selected);
  const activeRegions = Object.values(counts).filter(count => count > 0).length;
  function clearFilters() { setQuery(''); setCategory('Tất cả'); setRegion('Tất cả'); }
  return <section className="business-map-section" id="ban-do-doanh-nghiep">
    <div className="light-map-intro"><div><span className="eyebrow">MỖI HỒ SƠ, MỘT KẾT NỐI</span><h2>Những điểm sáng<br /><em>trên hành trình Việt.</em></h2><p>Chọn điểm trên bản đồ hoặc tên địa phương để gặp các doanh nghiệp trong khu vực.</p></div><div className="light-map-totals" role="status"><div><strong>{records.length}</strong><span>{businessRecordLabel} phù hợp</span></div><div><strong>{activeRegions}</strong><span>địa phương có {businessRecordLabel}</span></div></div></div>
    <div className="light-map-filters"><label><Search size={19} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Tên doanh nghiệp, xã/phường, ngành nghề…" aria-label="Tìm trên bản đồ doanh nghiệp" /></label><select aria-label="Lọc ngành trên bản đồ" value={category} onChange={e => setCategory(e.target.value)}>{categories.map(c => <option key={c}>{c}</option>)}</select><select aria-label="Lọc vùng trên bản đồ" value={region} onChange={e => setRegion(e.target.value)}>{regions.map(r => <option key={r}>{r}</option>)}</select><button onClick={clearFilters} className="light-map-clear"><X size={16} />Xóa lọc</button></div>
    <div className="business-map-workspace"><div className="business-map-canvas"><div className="light-map-caption"><span><Sparkles size={17} /> Điểm sáng theo khu vực</span><button onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? <Play size={15} /> : <Pause size={15} />}{paused ? 'Bật hiệu ứng' : 'Dừng hiệu ứng'}</button></div><VietnamMap selected={selected} onSelect={setSelected} counts={counts} idPrefix="directory-map" paused={paused} /><div className="light-map-key"><span><i />Có {businessRecordLabel}</span><span><i />Đang chọn</span><span><i />Chưa có kết quả</span></div><p className="light-map-geo-note">Sơ đồ minh họa. Điểm tổng hợp tỉnh/thành phố không phải vị trí cơ sở. Ký hiệu đảo, quần đảo không theo tỷ lệ, không thể hiện đầy đủ từng đảo hoặc ranh giới.</p></div>
    <aside className="light-map-results" aria-label="Hồ sơ theo địa phương"><label className="light-map-location"><MapPin size={19} /><select aria-label="Địa phương trên bản đồ doanh nghiệp" value={selected} onChange={e => setSelected(e.target.value)}>{provinces.map(p => <option key={p.slug} value={p.slug}>{p.name} · {counts[p.slug]} {businessRecordLabel}</option>)}</select></label><div className="light-map-result-heading" aria-live="polite"><span className="eyebrow">ĐỊA PHƯƠNG ĐANG CHỌN</span><h3>{province.name}</h3><p>{localRecords.length} {businessRecordLabel} phù hợp · {province.region}</p></div>
      <div className="light-map-business-list">{localRecords.length ? localRecords.map(b => { const commune = communes.find(c => c.slug === b.commune && c.province === b.province); return <article className="light-business" key={b.slug}><img src={b.image} alt={b.imageKind === 'business' ? `Hình ảnh ${b.name}` : `Ảnh cảnh quan minh họa khu vực ${b.name}`}  loading="lazy" /><div><span>{b.category} · {b.isSample ? 'Hồ sơ mẫu' : 'Thông tin từ cơ sở'}</span><h4><Link href={`/doanh-nghiep/${b.slug}`}>{b.name}<ArrowUpRight size={18} /></Link></h4><p>{b.tagline}</p>{commune && <small><MapPin size={13} />{commune.name}</small>}<Link className="text-link" href={`/doanh-nghiep/${b.slug}`}>Xem hồ sơ <ArrowUpRight size={15} /></Link></div></article>; }) : <div className="map-no-results"><Building2 size={30} /><h4>Chưa có hồ sơ phù hợp tại {province.name}.</h4><p>Thử đổi bộ lọc hoặc chọn một địa phương khác có điểm sáng.</p><button className="button outline" onClick={clearFilters}>Xóa bộ lọc</button></div>}</div>
      <div className="light-map-local-link"><Link href={`/dia-phuong/${selected}`}>Khám phá {province.name}<ArrowUpRight size={17} /></Link><Link href={`/doanh-nghiep?tinh=${selected}`}>Mở danh bạ địa phương<ArrowUpRight size={17} /></Link></div></aside></div>
    <div className="light-map-disclosure"><Info size={21} /><p><strong>{isDemoMode ? 'Đang hiển thị hồ sơ minh họa.' : 'Thông tin được biên tập trước khi công khai.'}</strong> Điểm sáng được tính từ dữ liệu hiện có, không phải số người đang trực tuyến. {isDemoMode && 'Các hồ sơ mẫu chưa phải doanh nghiệp đã đăng ký.'} Trả phí không đồng nghĩa được xác minh chất lượng. Khi vận hành thật, chỉ hồ sơ được duyệt mới được công khai.</p></div>
  </section>;
}
