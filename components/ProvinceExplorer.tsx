'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Search, X } from 'lucide-react';
import provinces from '@/lib/provinces.json';
import { formerProvinceNames, provinceMatches, regionGuides } from '@/lib/province-directory';
import { ProvinceCard } from './Cards';

const alphabetical = [...provinces].sort((a, b) => a.name.replace('TP. ', '').localeCompare(b.name.replace('TP. ', ''), 'vi'));

export default function ProvinceExplorer() {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  const [region, setRegion] = useState('Tất cả');
  const results = alphabetical.filter(p => (region === 'Tất cả' || region === p.region) && provinceMatches(p, query));
  const filtering = Boolean(query.trim()) || region !== 'Tất cả';

  function reset() { setQuery(''); setRegion('Tất cả'); }

  return <div className="province-explorer">
    <div className="province-explorer-heading">
      <div><span className="eyebrow">CHỌN MỘT NƠI. BẮT ĐẦU HÀNH TRÌNH.</span><h2>Đi khắp Việt Nam.</h2><p>Đầy đủ {provinces.length} tỉnh, thành phố hiện nay. Mỗi nơi là một câu chuyện riêng.</p></div>
      <span className="province-total"><strong>{provinces.length}</strong> tỉnh, thành phố</span>
    </div>
    <div className="province-search-bar">
      <label><Search size={21}/><span className="sr-only">Tìm tỉnh thành hoặc địa danh</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Tìm tỉnh thành, tên cũ hoặc địa danh…" type="search"/></label>
      <select aria-label="Chọn miền" value={region} onChange={e => setRegion(e.target.value)}><option>Tất cả</option>{regionGuides.map(r => <option key={r.id}>{r.name}</option>)}</select>
      {filtering ? <button onClick={reset} aria-label="Xóa bộ lọc"><X size={18}/><span>Xóa lọc</span></button> : null}
    </div>
    <p className="province-search-help">Vẫn có thể tìm bằng tên quen thuộc như Hà Giang, Yên Bái, Bình Định, Phú Yên… Nội dung được sắp theo tỉnh/thành hiện nay.</p>
    <details className="province-quick-index"><summary>Xem nhanh tên {provinces.length} tỉnh, thành phố <ArrowDown size={17}/></summary><div>{alphabetical.map(p => <Link key={p.slug} href={`/dia-phuong/${p.slug}`}>{p.name}<ArrowUpRight size={14}/></Link>)}</div></details>
    <nav className="province-region-links" aria-label="Đi đến danh sách theo miền">{regionGuides.map(r => <a href={`#${r.id}`} key={r.id} onClick={() => setRegion('Tất cả')}><span>{r.name}</span><small>{provinces.filter(p => p.region === r.name).length} tỉnh/thành</small><ArrowDown size={17}/></a>)}</nav>
    <p className="province-result-count" role="status">{filtering ? `Tìm thấy ${results.length} tỉnh, thành phố` : `Hiển thị đầy đủ ${provinces.length} tỉnh, thành phố`}</p>
    {results.length === 0 ? <div className="empty-state"><Search size={30}/><h2>Thử tìm một miền đất khác.</h2><p>Nhập tên tỉnh thành hoặc bỏ bộ lọc để xem toàn bộ Việt Nam.</p><button className="button" onClick={reset}>Xem tất cả tỉnh thành<ArrowUpRight size={17}/></button></div> : regionGuides.map(r => {
      const list = results.filter(p => p.region === r.name);
      return list.length > 0 ? <section id={r.id} className="province-region-section" key={r.id} aria-labelledby={`${r.id}-heading`}><div className="province-region-title"><div><span>{r.id === 'mien-bac' ? '01' : r.id === 'mien-trung' ? '02' : '03'}</span><h2 id={`${r.id}-heading`}>{r.name}</h2></div><p>{r.intro}</p><small>{list.length} tỉnh/thành</small></div><div className="province-grid">{list.map(p => <div className="province-catalog-entry" key={p.slug}><ProvinceCard province={p}/>{query.trim() && formerProvinceNames[p.slug]?.length > 1 ? <p className="province-former-names">Khu vực: {formerProvinceNames[p.slug].join(' · ')}</p> : null}</div>)}</div></section> : null;
    })}
  </div>;
}
