import { isDemoMode } from '@/lib/data';
import { Suspense } from 'react';
import TravelHero from '@/components/TravelHero';
import BusinessLightMap from '@/components/BusinessLightMap';
import JourneyBand from '@/components/JourneyBand';
export const metadata = { title: 'Bản đồ điểm sáng doanh nghiệp Việt' };
export default function Page() {
  return <main id="main" className="travel-page"><TravelHero image="/images/discovery-world.png" imageAlt="Phong cảnh Việt Nam tưởng tượng, minh họa AI" eyebrow="CÙNG KẾT NỐI NHỮNG GIÁ TRỊ VIỆT" title={<>Mỗi địa phương,<br /><em>những kết nối sáng lên.</em></>} subtitle="Khám phá doanh nghiệp theo vùng đất, ngành nghề và câu chuyện của họ. Một điểm sáng mở ra những hồ sơ trong cùng địa phương." crumbs={[{ name: 'Bản đồ doanh nghiệp' }]} note={isDemoMode ? 'Phong cảnh minh họa AI. Bản đồ bên dưới đang hiển thị dữ liệu mẫu.' : 'Phong cảnh minh họa AI. Điểm trên bản đồ là điểm tổng hợp theo địa phương.'} /><Suspense fallback={<section className="section"><p role="status">Đang mở bản đồ doanh nghiệp…</p></section>}><BusinessLightMap /></Suspense><JourneyBand title="Câu chuyện của bạn có thể bắt đầu từ đây." text="Chuẩn bị hồ sơ giới thiệu theo ngành nghề và địa phương. Gói dự kiến 300.000đ/năm; bản demo chưa nhận đăng ký hay thu tiền." href="/dang-ky" label="Giới thiệu doanh nghiệp" /></main>;
}
