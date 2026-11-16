import { Suspense } from 'react';
import Directory from '@/components/Directory';
import TravelHero from '@/components/TravelHero';
import JourneyBand from '@/components/JourneyBand';
export const metadata = { title: 'Điểm đến & trải nghiệm' };
export default function Page() { return <main id="main" className="travel-page"><TravelHero image="/images/vietnam-1.jpg" imageAlt="Cảnh quan vịnh và đảo đá" eyebrow="ĐI ĐỂ THẤY, ĐẾN ĐỂ CẢM NHẬN" title={<>Một hành trình mới.<br /><em>Muôn điều đáng nhớ.</em></>} subtitle="Từ biển đảo đến núi rừng, từ di sản đến phố xá. Tìm một điểm dừng phù hợp cho hành trình tiếp theo của bạn." crumbs={[{name:'Điểm đến'}]} /><section className="section listing" id="danh-sach"><Suspense fallback={<p role="status">Đang tải danh sách…</p>}><Directory kind="place" /></Suspense></section><JourneyBand title="Mỗi doanh nghiệp, một kết nối gần hơn." text="Giới thiệu sản phẩm, dịch vụ và câu chuyện của bạn ngay tại địa phương. Gói dự kiến 300.000đ/năm; bản demo chưa nhận thanh toán." href="/dang-ky" label="Giới thiệu doanh nghiệp" /></main>; }
