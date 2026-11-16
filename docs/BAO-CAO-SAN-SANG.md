# Trạng thái triển khai — 16/11/2026

Đã triển khai đăng trang doanh nghiệp miễn phí và lưu dữ liệu thật trên Vercel Blob riêng tư. Hồ sơ công khai xuất hiện ngay sau khi đăng thành công. Người đăng có thể sửa hoặc xóa bằng trình duyệt đã tạo trang; quyền chỉnh sửa dùng cookie HttpOnly, dữ liệu bí mật không gửi trong API công khai. Chưa có đăng nhập hoặc khôi phục quyền từ thiết bị khác.

Nguồn doanh nghiệp biên tập hiện có Fit Club 222, dùng thông tin và ảnh khách hàng cung cấp. Không thêm giá, đánh giá, giờ mở cửa hoặc cam kết chưa có nguồn. Các hồ sơ hư cấu đã được loại bỏ.

Có 34 trang tỉnh/thành với giới thiệu riêng, ba điểm khám phá, đặc sản, lưu ý du lịch và nguồn tham khảo. Tên đơn vị được đối chiếu nguồn hành chính và cập nhật việc Đồng Nai trở thành thành phố năm 2026. Ảnh địa phương thật có ghi nguồn và giấy phép tại trang Nguồn ảnh. Bản đồ giữ Hoàng Sa, Trường Sa và các đảo chính; điểm vùng không được diễn giải thành tọa độ cơ sở.

## Kiểm tra

- Build production và TypeScript thành công.
- Kiểm tra nội dung và bốn nhóm kiểm tra nhập dữ liệu thành công.
- Kiểm tra đăng thật có ảnh, đọc lại dữ liệu, sửa và xóa qua kho lưu trữ thật thành công; trình duyệt khác bị từ chối chỉnh sửa.
- Kiểm tra giao diện và liên kết trên điện thoại, máy tính bảng và máy tính; không đưa dữ liệu thử vào danh bạ lâu dài.
- Kiểm tra thư viện production không có lỗ hổng được npm audit báo cáo tại thời điểm triển khai.

## Vận hành

`BLOB_READ_WRITE_TOKEN` được Vercel cấp cho dự án và chỉ dùng phía máy chủ. Không đưa token vào Git hoặc biến NEXT_PUBLIC. API sức khỏe kiểm tra thực tế kết nối kho dữ liệu. Mỗi lần thay đổi giao diện đi qua GitHub và Vercel; hồ sơ mới không yêu cầu rebuild. Nội dung doanh nghiệp do chủ trang tự khai báo, không tự gắn nhãn đã xác minh.

Hiện mở dùng miễn phí, chưa tích hợp thu tiền. Khi phát triển thêm, ưu tiên sao lưu định kỳ và quyền quản trị nhiều thiết bị; không đặt các chức năng này làm điều kiện để người dùng thử đăng trang hiện nay.
