# Phạm vi nội dung và vận hành demo

## Bốn phần cần duy trì

1. Địa phương: giới thiệu ngắn, ảnh, nguồn đối chiếu; tỉnh/thành phố → xã/phường → doanh nghiệp.
2. Điểm đến: mô tả ngắn, địa phương liên quan, ảnh có quyền sử dụng. Chưa nhận đặt tour hay phòng.
3. Doanh nghiệp: tên, ngành nghề, địa phương, địa chỉ, mô tả, ảnh, thông tin liên hệ do chủ cơ sở cung cấp. Nội dung demo phải có nhãn minh họa.
4. Giới thiệu doanh nghiệp: gói dự kiến 300.000đ/năm; biểu mẫu hiện chỉ lưu nháp trên thiết bị hoặc tải JSON, chưa gửi hồ sơ hay thu tiền.

Không mở danh mục sản phẩm riêng, giỏ hàng, đánh giá, tài khoản du khách, yêu thích, chat, check-in hay 3D trong giai đoạn này. Cảm hứng du lịch dùng lại các trang điểm đến, không tạo thêm hệ thống bài viết cần biên tập riêng.

## Một lần nhập, nhiều nơi hiển thị

Dữ liệu đang nằm trong lib/data.ts; trang tỉnh/xã, danh bạ và thẻ trang chủ cùng đọc dữ liệu này. Không tạo repository hay dự án triển khai riêng cho từng doanh nghiệp.

Trước khi có CMS thật: chủ dự án tiếp nhận thông tin bằng biểu mẫu/tệp; biên tập, kiểm chứng, cập nhật dữ liệu trung tâm rồi triển khai. Không hướng dẫn chủ doanh nghiệp sửa code. Google Sheets chỉ là phương án tiếp nhận/biên tập sau này, chưa kết nối trong demo. Chỉ chọn một nguồn dữ liệu chính khi triển khai CMS, không để vừa sửa Sheet vừa sửa code cho cùng nội dung.

## Kiểm tra trước khi công khai

- Xác nhận địa chỉ, tên hành chính theo thời điểm, quyền sử dụng ảnh và liên hệ từ chủ doanh nghiệp.
- Không tự tạo chứng nhận OCOP, đánh giá, số lượt xem hay số doanh nghiệp tham gia.
- Sơ đồ có chú thích Hoàng Sa, Trường Sa và một số đảo chính. Ký hiệu điểm không phải hình dạng/phạm vi quần đảo, không đại diện đầy đủ lãnh thổ ở tỷ lệ chi tiết. Đối chiếu nguồn bản đồ có thẩm quyền trước phát hành chính thức; ghi phiên bản và nguồn.
- Duyệt hồ sơ trước xuất bản. Giá và gói không cam kết mang lại số khách cụ thể.
- Duy trì bản sao dữ liệu/ảnh và lịch sử Git; quy trình phục hồi theo tài liệu hạ tầng.
