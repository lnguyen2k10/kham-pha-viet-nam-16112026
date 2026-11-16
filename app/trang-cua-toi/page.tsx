import TravelHero from '@/components/TravelHero';
import MyPages from '@/components/MyPages';
export const metadata={title:'Trang của tôi',robots:{index:false,follow:false}};
export default function Page(){return <main id="main" className="travel-page"><TravelHero image="/images/hoi-an.jpg" imageAlt="Phố cổ Hội An" eyebrow="DOANH NGHIỆP CỦA BẠN" title="Trang của tôi" subtitle="Xem, chia sẻ và cập nhật các trang bạn đã đăng từ trình duyệt này." crumbs={[{name:'Trang của tôi'}]}/><section className="section"><MyPages/></section></main>}
