import { Suspense } from 'react';
import Directory from '@/components/Directory';
import TravelHero from '@/components/TravelHero';
import JourneyBand from '@/components/JourneyBand';
export const metadata = { title: 'Khám phá địa phương' };
export default function Page() { return <main id="main" className="travel-page"><TravelHero image="/images/vietnam-2.jpg" imageAlt="Cảnh quan núi đá vôi Ninh Bình" eyebrow="MỖI MIỀN ĐẤT, MỘT NÉT RIÊNG" title={<>Việt Nam,<br /><em>đẹp từ từng địa phương.</em></>} subtitle="Chọn một tỉnh, thành phố. Khám phá cảnh quan, đời sống và những doanh nghiệp làm nên bản sắc của vùng đất." crumbs={[{name:'Địa phương'}]} /><section className="section listing" id="danh-sach"><Suspense fallback={<p role="status">Đang tải danh sách…</p>}><Directory kind="province" /></Suspense></section><JourneyBand title="Mỗi doanh nghiệp, một kết nối gần hơn." text="Giới thiệu sản phẩm, dịch vụ và câu chuyện của bạn ngay tại địa phương. Gói dự kiến 300.000đ/năm; bản demo chưa nhận thanh toán." href="/dang-ky" label="Giới thiệu doanh nghiệp" /></main>; }
