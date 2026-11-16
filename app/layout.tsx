import type{Metadata}from'next';import{Header,Footer}from'@/components/Shell';import'./globals.css';
export const metadata:Metadata={title:{default:'Khám phá Việt Nam — Mỗi miền đất, một câu chuyện',template:'%s | Khám phá Việt Nam'},description:'Khám phá điểm đến, câu chuyện địa phương và kết nối doanh nghiệp Việt. Gói giới thiệu doanh nghiệp 300.000đ/năm.',robots:{index:false,follow:false}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="vi"><body><Header/>{children}<Footer/></body></html>}
