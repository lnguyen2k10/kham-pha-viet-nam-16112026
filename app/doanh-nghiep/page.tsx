import { Suspense } from 'react';
import Directory from '@/components/Directory';
import TravelHero from '@/components/TravelHero';
import JourneyBand from '@/components/JourneyBand';
export const metadata = { title: 'Doanh nghiệp địa phương' };
export default function Page() { return <main id="main" className="travel-page"><TravelHero image="/images/hoi-an.jpg" imageAlt="Kiến trúc phố cổ Hội An" eyebrow="GẶP GỠ NHỮNG GIÁ TRỊ ĐỊA PHƯƠNG" title={<>Tìm dịch vụ bạn cần.<br /><em>Gặp người làm nên nét riêng.</em></>} subtitle="Khám phá ẩm thực, lưu trú, đặc sản và dịch vụ theo từng địa phương. Hồ sơ hiện tại là dữ liệu mẫu để trải nghiệm giao diện." crumbs={[{name:'Doanh nghiệp'}]} /><section className="section listing" id="danh-sach"><Suspense fallback={<p role="status">Đang tải danh sách…</p>}><Directory kind="business" /></Suspense></section><JourneyBand title="Mỗi doanh nghiệp, một kết nối gần hơn." text="Giới thiệu sản phẩm, dịch vụ và câu chuyện của bạn ngay tại địa phương. Gói dự kiến 300.000đ/năm; bản demo chưa nhận thanh toán." href="/dang-ky" label="Giới thiệu doanh nghiệp" /></main>; }
