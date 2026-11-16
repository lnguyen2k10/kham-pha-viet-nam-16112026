import { getBusinesses } from '@/lib/business-store';
export const revalidate=30;
import { isDemoMode } from '@/lib/data';
import { Suspense } from 'react';
import TravelHero from '@/components/TravelHero';
import BusinessLightMap from '@/components/BusinessLightMap';
import JourneyBand from '@/components/JourneyBand';
export const metadata = { title: 'Bản đồ điểm sáng doanh nghiệp Việt' };
export default async function Page() {
  const records=await getBusinesses();
  return <main id="main" className="travel-page"><TravelHero image="/images/vietnam-1.jpg" imageAlt="Vịnh Hạ Long" eyebrow="CÙNG KẾT NỐI NHỮNG GIÁ TRỊ VIỆT" title={<>Mỗi địa phương,<br /><em>những kết nối sáng lên.</em></>} subtitle="Khám phá doanh nghiệp theo vùng đất, ngành nghề và câu chuyện của họ. Một điểm sáng mở ra những hồ sơ trong cùng địa phương." crumbs={[{ name: 'Bản đồ doanh nghiệp' }]} note="Điểm trên sơ đồ tổng hợp doanh nghiệp theo từng địa phương." /><Suspense fallback={<section className="section"><p role="status">Đang mở bản đồ doanh nghiệp…</p></section>}><BusinessLightMap businessRecords={records} /></Suspense><JourneyBand title="Câu chuyện của bạn có thể bắt đầu từ đây." text="Đăng trang miễn phí để giới thiệu cơ sở, chia sẻ dịch vụ và để khách hàng liên hệ trực tiếp." href="/dang-ky" label="Giới thiệu doanh nghiệp" /></main>;
}
