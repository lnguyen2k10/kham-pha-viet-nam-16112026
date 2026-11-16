import provinces from './provinces.json';

// Former provincial names remain searchable; pages use the current locality.
export const formerProvinceNames: Record<string, string[]> = {
  'lao-cai': ['Lào Cai', 'Yên Bái'],
  'tuyen-quang': ['Tuyên Quang', 'Hà Giang'],
  'thai-nguyen': ['Thái Nguyên', 'Bắc Kạn'],
  'phu-tho': ['Phú Thọ', 'Vĩnh Phúc', 'Hòa Bình'],
  'bac-ninh': ['Bắc Ninh', 'Bắc Giang'],
  'hai-phong': ['Hải Phòng', 'Hải Dương'],
  'hung-yen': ['Hưng Yên', 'Thái Bình'],
  'ninh-binh': ['Ninh Bình', 'Nam Định', 'Hà Nam'],
  'da-nang': ['Đà Nẵng', 'Quảng Nam'],
  'quang-tri': ['Quảng Trị', 'Quảng Bình'],
  'quang-ngai': ['Quảng Ngãi', 'Kon Tum'],
  'gia-lai': ['Gia Lai', 'Bình Định'],
  'dak-lak': ['Đắk Lắk', 'Phú Yên'],
  'khanh-hoa': ['Khánh Hòa', 'Ninh Thuận'],
  'lam-dong': ['Lâm Đồng', 'Đắk Nông', 'Bình Thuận'],
  'ho-chi-minh': ['TP. Hồ Chí Minh', 'Bình Dương', 'Bà Rịa – Vũng Tàu'],
  'dong-nai': ['Đồng Nai', 'Bình Phước'],
  'tay-ninh': ['Tây Ninh', 'Long An'],
  'dong-thap': ['Đồng Tháp', 'Tiền Giang'],
  'vinh-long': ['Vĩnh Long', 'Bến Tre', 'Trà Vinh'],
  'can-tho': ['Cần Thơ', 'Hậu Giang', 'Sóc Trăng'],
  'an-giang': ['An Giang', 'Kiên Giang'],
  'ca-mau': ['Cà Mau', 'Bạc Liêu'],
};

export const regionGuides = [
  { name: 'Miền Bắc', id: 'mien-bac', intro: 'Những mùa núi rừng, phố cổ và miền di sản.' },
  { name: 'Miền Trung', id: 'mien-trung', intro: 'Theo dải biển xanh, qua phố Hội đến đại ngàn.' },
  { name: 'Miền Nam', id: 'mien-nam', intro: 'Nhịp sống cởi mở, vườn cây và những dòng sông.' },
] as const;

export function normalizeProvinceQuery(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/gi, 'd').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

export function provinceMatches(province: typeof provinces[number], query: string) {
  const names = formerProvinceNames[province.slug] || [];
  const aliases = province.slug === 'hue' ? ['Thừa Thiên Huế'] : province.slug === 'ha-noi' ? ['Hà Tây'] : province.slug === 'ho-chi-minh' ? ['Sài Gòn', 'Hồ Chí Minh', 'Vũng Tàu'] : [];
  return normalizeProvinceQuery([province.name, ...names, ...aliases, ...province.highlights.map(h => h.name)].join(' ')).includes(normalizeProvinceQuery(query));
}
