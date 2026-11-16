import { Suspense } from 'react';
import Registration from '@/components/Registration';
import TravelHero from '@/components/TravelHero';
export const metadata={title:'Đăng doanh nghiệp miễn phí',robots:{index:false,follow:true}};
export default function Page(){return <main id="main" className="travel-page"><TravelHero image="/images/hoi-an.jpg" imageAlt="Phố cổ Hội An" eyebrow="CÙNG KẾT NỐI DOANH NGHIỆP VIỆT" title={<>Trang riêng cho bạn.<br/><em>Bắt đầu miễn phí hôm nay.</em></>} subtitle="Giới thiệu cơ sở, đăng sản phẩm và dịch vụ, kết nối trực tiếp với khách hàng. Chỉ cần vài thông tin, trang doanh nghiệp của bạn sẽ sẵn sàng chia sẻ." crumbs={[{name:'Đăng doanh nghiệp'}]}/><section className="registration-steps" aria-label="Các bước đăng trang"><span><b>01</b>Giới thiệu cơ sở</span><span><b>02</b>Thêm liên hệ</span><span><b>03</b>Đăng và chia sẻ</span></section><section className="section"><Suspense fallback={<p>Đang mở đăng ký…</p>}><Registration/></Suspense></section></main>}
