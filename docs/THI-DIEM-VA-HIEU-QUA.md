# Điểm sáng doanh nghiệp: vận hành và kiểm chứng sức hút

## Nhận định

Mô hình có một lời hứa dễ hiểu: khám phá một vùng đất và tìm cơ sở địa phương liên quan. Bản đồ tạo động lực khám phá và cảm giác hiện diện trong cộng đồng, nhưng không tự tạo khách hàng. Với doanh nghiệp, giá 300.000đ/năm chỉ có ý nghĩa nếu hồ sơ mang lại khả năng được tìm thấy, liên hệ hoặc giúp họ giới thiệu thông tin rõ ràng. Chưa có người dùng thật, lượt liên hệ hay tỷ lệ trả phí được đo; chưa thể kết luận đã phù hợp thị trường.

Khác biệt cần chứng minh so với Google Maps, Facebook và các danh bạ khác: thông tin địa phương được chọn lọc, ảnh/liên hệ cập nhật, tìm theo xã/phường/ngành và hỗ trợ nhập nội dung cho cơ sở ít rành công nghệ. Không bán việc có một chấm sáng như một bảo đảm doanh thu.

## Những gì đã chạy được

- Trang `/ban-do`: điểm sáng tổng hợp theo tỉnh/thành phố; lọc ngành/vùng, tìm tên cơ sở hoặc xã/phường không dấu, chọn điểm, xem danh sách và mở hồ sơ.
- Trang chủ có điểm sáng và dẫn tới danh sách địa phương trên bản đồ.
- Số lượng lấy từ cùng nguồn dữ liệu hồ sơ; không có bộ đếm giả, số người online hoặc check-in giả.
- Hai chế độ xuất bản tách biệt. `demo` dùng tám hồ sơ mẫu. `public` chỉ đọc `content/public-businesses.json`; dữ liệu trống thì không làm sáng giả hoặc tự chèn hồ sơ mẫu.
- Nhập CSV đã duyệt bằng `npm run import:businesses -- /duong-dan/danh-sach.csv`. Có kiểm tra địa phương, ngành, quyền công bố, quyền ảnh, liên hệ và liên kết an toàn. Chưa phải CMS trực tuyến.
- Trong chế độ `public`, hồ sơ có liên hệ thật được nhập sẽ có nút gọi/Zalo/website tương ứng. Không đặt ghim chỉ đường khi chưa có tọa độ được kiểm tra.
- Kiểm tra dữ liệu, build và TypeScript trong GitHub Actions; `/api/health` cho kiểm tra HTTP, tách rõ trạng thái ứng dụng phản hồi và trạng thái chưa sẵn sàng thương mại. Endpoint không thay thế giám sát bên ngoài hay cảnh báo tới người trực.

## Cách thí điểm ít chi phí

Ưu tiên 1–3 xã/phường trong cùng một cụm mà anh có quan hệ thực tế. Đề xuất mời 30–50 cơ sở ban đầu, có đủ lưu trú, ẩm thực, đặc sản/dịch vụ cần thiết để người dùng tìm thấy lựa chọn hữu ích. Đây là quy mô thử nghiệm đề xuất, chưa phải khách hàng đã có.

1. Phỏng vấn khoảng 10–15 chủ cơ sở: họ đang tìm khách bằng cách nào, thông tin nào khó cập nhật, có sẵn sàng trả 300k sau thử nghiệm không? Hỏi về hành vi và chi tiêu thực tế, không chỉ hỏi “ý tưởng có hay không”.
2. Thu thông tin và ảnh có quyền sử dụng; xác nhận liên hệ công khai. Đội anh nhập và duyệt giúp. Không yêu cầu mỗi doanh nghiệp tự học công nghệ trong đợt đầu.
3. Chuẩn bị một trang địa phương có nội dung hữu ích và hồ sơ đủ liên hệ. Mời một nhóm người khám phá/khách du lịch thực hiện việc thật: tìm bữa ăn, chỗ ở, đặc sản, dịch vụ và liên hệ.
4. Chạy thử 4–6 tuần. Ghi nhận đường vào, hồ sơ được xem, thao tác liên hệ và phản hồi của doanh nghiệp. Nếu dùng analytics, cần kết nối dịch vụ thật và công bố chính sách phù hợp trước khi thu thập. Bản hiện tại chưa thu sự kiện người dùng ở máy chủ, không giả lập thống kê bằng localStorage.
5. Thử lời mời trả phí khi đã có bằng chứng giá trị và điều kiện dịch vụ rõ. Chỉ mở thanh toán sau khi chốt đơn vị thu tiền, chứng từ và quy trình đối soát.

### Bảng theo dõi thí điểm đề xuất

| Chỉ số | Cách hiểu và giới hạn |
|---|---|
| Hồ sơ đầy đủ, đã được duyệt | Mẫu số chất lượng dữ liệu, không dùng tổng hồ sơ nháp để khoe quy mô |
| Người truy cập thực / nguồn giới thiệu | Phải dùng công cụ thật; tách người thử nội bộ và bot khi có thể |
| Lượt xem hồ sơ | Lượt xem không tương đương một khách hàng tiềm năng |
| Bấm gọi/Zalo/website | Chỉ là ý định liên hệ; không khẳng định cuộc gọi thành công hoặc có đơn hàng |
| Liên hệ/đơn được doanh nghiệp xác nhận | Cần hỏi và đối soát được nguồn; tránh nhận vơ mọi đơn hàng |
| Doanh nghiệp đồng ý trả phí / gia hạn | Đo trên nhóm được tiếp xúc đầy đủ; đây là bằng chứng chính về giá trị kinh doanh |
| Phút nhập/sửa/hỗ trợ mỗi hồ sơ | Quyết định mức 300k có đủ vận hành không |

Ngưỡng đánh giá cần chốt trước thử nghiệm theo khả năng kéo người dùng thật và chi phí phục vụ. Không có số liệu hiện tại để tự đặt một ngưỡng rồi tuyên bố thành công.

## Kinh tế ở mức 300.000đ/năm

100 doanh nghiệp trả phí tạo 30 triệu đồng doanh thu gộp/năm; 1.000 doanh nghiệp tạo 300 triệu đồng/năm. Tương đương 25.000đ/doanh nghiệp/tháng, trước chi phí bán hàng, biên tập, hỗ trợ, hạ tầng, thanh toán và thuế. Không thể bao gồm thiết kế riêng hoặc chỉnh sửa không giới hạn cho từng cơ sở ở giá này. Cần quy định số ảnh, phạm vi chỉnh sửa và thời gian hỗ trợ trong gói.

## Những điều chưa được mở

- Chưa có dữ liệu doanh nghiệp thật được anh cung cấp/duyệt; file công khai hiện trống, bản online vẫn là demo.
- Chưa có tên đơn vị vận hành, email/Zalo hỗ trợ, điều khoản chính thức, đối soát/thu phí hoặc thông tin hóa đơn.
- Chưa kết nối database, đăng nhập chủ doanh nghiệp, kho ảnh upload hoặc CMS trực tuyến. Vercel project chưa có integration dữ liệu/xác thực khi kiểm tra phiên này. Tích hợp Vercel trong cuộc trò chuyện truy cập được project; Vercel CLI chưa có phiên đăng nhập để provision dịch vụ.
- Chưa có giám sát ngoài hệ thống, người nhận cảnh báo, SLA hoặc diễn tập phục hồi được thực hiện.
- Giữ noindex và bảo vệ bản trình diễn. Chưa tự mở công khai khi dữ liệu địa lý, pháp lý và nội dung chưa duyệt.

## Từ thí điểm sang tự phục vụ

Khi đã chứng minh doanh nghiệp sẵn sàng dùng và trả phí, kết nối PostgreSQL + Auth + Storage (Supabase là phương án đã đề xuất) trong tài khoản thuộc anh. Cần bước kết nối dịch vụ của chủ tài khoản, không gửi khóa bí mật trong chat. Sau đó mới triển khai tài khoản chủ cơ sở, phân quyền, lưu nháp → gửi duyệt → xuất bản, kiểm toán thay đổi và sao lưu cơ sở dữ liệu/ảnh. Luồng CSV/Git hiện tại dùng cho thí điểm do đội vận hành biên tập; không được mô tả là đã có hệ thống tự quản trị.
