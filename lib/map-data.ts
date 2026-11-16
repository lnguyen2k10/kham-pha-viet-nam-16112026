import { businesses, communes, normalize, provinces, type Business } from './data';

export const mapAnchors = [
  { slug: 'ha-noi', lat: 21.03, lon: 105.83, label: 'Hà Nội' },
  { slug: 'quang-ninh', lat: 20.95, lon: 107.08, label: 'Quảng Ninh' },
  { slug: 'ninh-binh', lat: 20.25, lon: 105.97, label: 'Ninh Bình' },
  { slug: 'lao-cai', lat: 22.48, lon: 103.97, label: 'Lào Cai' },
  { slug: 'hue', lat: 16.47, lon: 107.59, label: 'Huế' },
  { slug: 'da-nang', lat: 16.05, lon: 108.2, label: 'Đà Nẵng' },
  { slug: 'ho-chi-minh', lat: 10.82, lon: 106.63, label: 'TP. Hồ Chí Minh' },
  { slug: 'can-tho', lat: 10.05, lon: 105.75, label: 'Cần Thơ' },
];

export type MapFilters = { query?: string; category?: string; region?: string };
export function filterMapBusinesses({ query = '', category = 'Tất cả', region = 'Tất cả' }: MapFilters = {}): Business[] {
  const search = normalize(query.trim());
  return businesses.filter(b => {
    const province = provinces.find(p => p.slug === b.province);
    const commune = communes.find(c => c.slug === b.commune && c.province === b.province);
    return (category === 'Tất cả' || b.category === category)
      && (region === 'Tất cả' || province?.region === region)
      && normalize([b.name, b.category, b.tagline, province?.name, commune?.name].join(' ')).includes(search);
  });
}
export function aggregateMapBusinesses(records: Business[]) {
  return Object.fromEntries(provinces.map(p => [p.slug, records.filter(b => b.province === p.slug).length]));
}
export const projectMap = (lon: number, lat: number) => ({ x: (lon - 101) * 23, y: 35 + (24 - lat) * 30 });
