import { getBusinesses } from '@/lib/business-store';
export const revalidate=30;
import { isDemoMode } from '@/lib/data';
import { Suspense } from 'react';
import Directory from '@/components/Directory';
import TravelHero from '@/components/TravelHero';
import JourneyBand from '@/components/JourneyBand';
export const metadata = { title: 'Doanh nghiệp địa phương' };
export default async function Page() { const records=await getBusinesses(); return <main id="main" className="travel-page"><TravelHero image="/images/hoi-an.jpg" imageAlt="Kiến trúc phố cổ Hội An" eyebrow="GẶP GỠ NHỮNG GIÁ TRỊ ĐỊA PHƯƠNG" title={<>Tìm dịch vụ bạn cần.<br /><em>Gặp người làm nên nét riêng.</em></>} subtitle={isDemoMode ? 'Khám phá ẩm thực, lưu trú, đặc sản và dịch vụ theo từng địa phương. Hồ sơ hiện tại là dữ liệu mẫu để trải nghiệm giao diện.' : 'Khám phá ẩm thực, lưu trú, đặc sản và dịch vụ theo từng địa phương. Thông tin sản phẩm, dịch vụ và liên hệ do cơ sở cung cấp.'} crumbs={[{name:'Doanh nghiệp'}]} /><section className="section listing" id="danh-sach"><Suspense fallback={<p role="status">Đang tải danh sách…</p>}><Directory kind="business" businessRecords={records} /></Suspense></section><JourneyBand title="Mỗi doanh nghiệp, một kết nối gần hơn." text="Đăng trang miễn phí, giới thiệu sản phẩm và dịch vụ, kết nối trực tiếp với khách hàng tại địa phương." href="/dang-ky" label="Giới thiệu doanh nghiệp" /></main>; }
