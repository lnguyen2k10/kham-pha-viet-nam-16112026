# Rà soát hoàn thiện giao diện — 16/11/2026

## Kết luận

**Sẵn sàng demo và duyệt thiết kế. Chưa sẵn sàng mở bán, nhận thanh toán hoặc cho doanh nghiệp tự quản trị.** Không nhầm trạng thái triển khai Vercel thành trạng thái vận hành thương mại.

## Phần đã triển khai

- Hệ giao diện trang con dùng chung: hero ảnh cảnh quan, lớp phủ tương phản, tiêu đề Playfair Display, nội dung Be Vietnam Pro; màu xanh biển, xanh lá, san hô/hồng và vàng ấm. Cỡ nội dung tăng, có quy tắc hiển thị điện thoại.
- Danh sách địa phương, điểm đến, doanh nghiệp: ảnh nền riêng; tìm kiếm, bộ lọc, số kết quả và trạng thái không có nội dung.
- Tỉnh/thành phố: ảnh mở đầu, điều hướng nội trang, giới thiệu, nguồn tham khảo, xã/phường, điểm đến, doanh nghiệp trong tỉnh và lời mời giới thiệu doanh nghiệp.
- Xã/phường: ảnh mở đầu, giới thiệu, nguồn tham khảo, thông tin cấp tỉnh, doanh nghiệp đúng xã/phường và gợi ý trong phạm vi tỉnh. Không tuyên bố điểm đến ngoài xã là thuộc xã.
- Điểm đến: ảnh mở đầu, giới thiệu, điểm nhấn, lưu ý chuẩn bị chuyến đi, nguồn tham khảo, địa phương và doanh nghiệp cùng tỉnh, gợi ý điểm đến khác.
- Doanh nghiệp: ảnh cảnh quan được ghi rõ không phải ảnh cơ sở; ngành nghề, địa phương/xã, câu chuyện, danh mục nội dung dịch vụ, lưu ý trước sử dụng, địa chỉ và trạng thái liên hệ, khám phá khu vực, doanh nghiệp liên quan.
- Không tạo số điện thoại, Zalo, giá, giờ mở cửa, chứng nhận, đánh giá hoặc tọa độ cơ sở giả. Không đặt nút liên hệ/đặt chỗ có vẻ hoạt động khi chưa có dữ liệu.
- Trang giới thiệu doanh nghiệp: hero, bước chuẩn bị, kiểm tra thông tin, xem trước, lưu nháp và tải tệp; ghi rõ chưa gửi hồ sơ hoặc thu tiền.
- Về nền tảng, nguồn ảnh và trang 404 cùng hệ thiết kế.
- Sơ đồ trang chủ giữ chú thích Hoàng Sa, Trường Sa và một số đảo chính; không dùng như bản đồ ranh giới chính thức.

## Cần hoàn tất trước vận hành thật

1. Nhập và duyệt nội dung, ảnh có quyền sử dụng, địa chỉ và liên hệ thực tế. Đối chiếu tên, mã hành chính và bản đồ với nguồn có thẩm quyền.
2. Chọn một hệ quản trị chính; triển khai dữ liệu trung tâm, xác thực, phân quyền chủ hồ sơ/biên tập viên và quy trình duyệt. Google Sheets/CMS chưa được kết nối hiện nay.
3. Kết nối hệ thống tiếp nhận hồ sơ và thông báo; có quy trình chỉnh sửa, gỡ thông tin và hỗ trợ doanh nghiệp.
4. Nếu thu 300.000đ/năm: công bố phạm vi dịch vụ, điều kiện gia hạn, xử lý thanh toán, đối soát, trạng thái gói và chứng từ phù hợp. Chưa thu tiền bằng biểu mẫu demo.
5. Thiết lập sao lưu dữ liệu/ảnh ngoài tài khoản chính, kiểm tra phục hồi, theo dõi lỗi và chi phí, quyền sở hữu tên miền/tài khoản và người dự phòng vận hành.
6. Công bố thông tin đơn vị vận hành, điều khoản và chính sách dữ liệu phù hợp chức năng thực tế. Chỉ mở index sau duyệt dữ liệu.

## Phạm vi kiểm tra

Build production + TypeScript; từng URL công khai và liên kết nội bộ; trang không tồn tại; mỗi trang có một H1 và ảnh hero; bố cục desktop/tablet/mobile; tìm kiếm/bộ lọc, tỉnh → xã/phường → doanh nghiệp; biểu mẫu nháp và xuất JSON. Các kiểm tra giao diện không thay thế kiểm chứng dữ liệu địa lý, giấy phép kinh doanh, khả năng chịu tải, bảo mật hoặc thanh toán của hệ thống tương lai.

## Kết quả kiểm tra bản cuối

- `npm run build`, `npm run check`: đạt.
- 33 trang công khai, mỗi trang một H1; các trang con có hero ảnh: đạt.
- 54 đích liên kết nội bộ trả HTTP 200; đường dẫn sai và mục sản phẩm đã bỏ trả 404: đạt.
- Mọi trang tại 390/768/1440px không tràn ngang; luồng chính kiểm tra thêm tại 360/1024px: đạt.
- Tìm kiếm, điều hướng điện thoại, lọc và không có kết quả, tỉnh → xã/phường → doanh nghiệp, xác thực biểu mẫu, xem trước, lưu và khôi phục nháp, tải JSON 300.000đ/năm: đạt.
- Không ghi nhận lỗi JavaScript trong các luồng đã kiểm tra.
- Font tiêu đề thực tế được trình duyệt áp dụng: Playfair Display; nội dung Be Vietnam Pro.

## Ảnh giao diện để đối chiếu

[Danh sách điểm đến](previews/destinations-desktop.jpg) · [Trang địa phương](previews/locality-desktop.jpg) · [Hồ sơ doanh nghiệp](previews/business-desktop.jpg) · [Doanh nghiệp trên điện thoại](previews/business-mobile.jpg)
