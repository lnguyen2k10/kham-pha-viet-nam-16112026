import { businesses, communes, normalize, provinces, type Business } from './data';

export const mapAnchors = [
  {
    "slug": "ha-noi",
    "lat": 21.03,
    "lon": 105.83,
    "label": "Hà Nội"
  },
  {
    "slug": "cao-bang",
    "lat": 22.67,
    "lon": 106.26,
    "label": "Cao Bằng"
  },
  {
    "slug": "dien-bien",
    "lat": 21.39,
    "lon": 103.02,
    "label": "Điện Biên"
  },
  {
    "slug": "lai-chau",
    "lat": 22.39,
    "lon": 103.47,
    "label": "Lai Châu"
  },
  {
    "slug": "lang-son",
    "lat": 21.85,
    "lon": 106.76,
    "label": "Lạng Sơn"
  },
  {
    "slug": "son-la",
    "lat": 21.33,
    "lon": 103.91,
    "label": "Sơn La"
  },
  {
    "slug": "lao-cai",
    "lat": 22.0,
    "lon": 104.2,
    "label": "Lào Cai"
  },
  {
    "slug": "tuyen-quang",
    "lat": 22.4,
    "lon": 105.0,
    "label": "Tuyên Quang"
  },
  {
    "slug": "thai-nguyen",
    "lat": 21.9,
    "lon": 105.85,
    "label": "Thái Nguyên"
  },
  {
    "slug": "phu-tho",
    "lat": 21.3,
    "lon": 105.2,
    "label": "Phú Thọ"
  },
  {
    "slug": "bac-ninh",
    "lat": 21.28,
    "lon": 106.15,
    "label": "Bắc Ninh"
  },
  {
    "slug": "hai-phong",
    "lat": 20.86,
    "lon": 106.68,
    "label": "Hải Phòng"
  },
  {
    "slug": "quang-ninh",
    "lat": 20.95,
    "lon": 107.08,
    "label": "Quảng Ninh"
  },
  {
    "slug": "hung-yen",
    "lat": 20.65,
    "lon": 106.2,
    "label": "Hưng Yên"
  },
  {
    "slug": "ninh-binh",
    "lat": 20.25,
    "lon": 105.97,
    "label": "Ninh Bình"
  },
  {
    "slug": "thanh-hoa",
    "lat": 19.8,
    "lon": 105.77,
    "label": "Thanh Hóa"
  },
  {
    "slug": "nghe-an",
    "lat": 19.2,
    "lon": 104.8,
    "label": "Nghệ An"
  },
  {
    "slug": "ha-tinh",
    "lat": 18.35,
    "lon": 105.9,
    "label": "Hà Tĩnh"
  },
  {
    "slug": "quang-tri",
    "lat": 17.0,
    "lon": 106.7,
    "label": "Quảng Trị"
  },
  {
    "slug": "hue",
    "lat": 16.47,
    "lon": 107.59,
    "label": "Huế"
  },
  {
    "slug": "da-nang",
    "lat": 16.05,
    "lon": 108.2,
    "label": "Đà Nẵng"
  },
  {
    "slug": "quang-ngai",
    "lat": 14.8,
    "lon": 108.5,
    "label": "Quảng Ngãi"
  },
  {
    "slug": "gia-lai",
    "lat": 13.8,
    "lon": 108.5,
    "label": "Gia Lai"
  },
  {
    "slug": "dak-lak",
    "lat": 12.9,
    "lon": 108.5,
    "label": "Đắk Lắk"
  },
  {
    "slug": "khanh-hoa",
    "lat": 12.0,
    "lon": 109.0,
    "label": "Khánh Hòa"
  },
  {
    "slug": "lam-dong",
    "lat": 11.5,
    "lon": 108.2,
    "label": "Lâm Đồng"
  },
  {
    "slug": "ho-chi-minh",
    "lat": 10.82,
    "lon": 106.63,
    "label": "TP. Hồ Chí Minh"
  },
  {
    "slug": "dong-nai",
    "lat": 11.1,
    "lon": 107.1,
    "label": "Đồng Nai"
  },
  {
    "slug": "tay-ninh",
    "lat": 10.9,
    "lon": 106.0,
    "label": "Tây Ninh"
  },
  {
    "slug": "dong-thap",
    "lat": 10.4,
    "lon": 105.8,
    "label": "Đồng Tháp"
  },
  {
    "slug": "vinh-long",
    "lat": 10.0,
    "lon": 106.0,
    "label": "Vĩnh Long"
  },
  {
    "slug": "can-tho",
    "lat": 10.05,
    "lon": 105.75,
    "label": "Cần Thơ"
  },
  {
    "slug": "an-giang",
    "lat": 10.2,
    "lon": 104.9,
    "label": "An Giang"
  },
  {
    "slug": "ca-mau",
    "lat": 9.15,
    "lon": 105.15,
    "label": "Cà Mau"
  }
];

export type MapFilters = { query?: string; category?: string; region?: string };
export function filterMapBusinesses({ query = '', category = 'Tất cả', region = 'Tất cả' }: MapFilters = {}, records:Business[]=businesses): Business[] {
  const search = normalize(query.trim());
  return records.filter(b => {
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
