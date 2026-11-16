# Bản đồ điểm sáng và cộng đồng 3D — hướng mở rộng

Ý tưởng tham khảo từ cách tạo tham gia đơn giản và cảm giác cộng đồng trong “Thắp đèn đọc sách”. Không sao chép tên, hình ảnh, tài sản 3D, giao diện hay mã của sản phẩm tham khảo. Demo hiện có trang /ban-do với điểm tổng hợp doanh nghiệp theo tám địa phương, tìm/lọc ngành/vùng/xã và dẫn tới hồ sơ. Điểm ở trang chủ dùng cùng dữ liệu. Chế độ public có thể đọc hồ sơ được duyệt qua luồng CSV/Git, nhưng file công khai hiện trống. Tọa độ cơ sở thật, ranh giới tỉnh/xã và cộng đồng 3D chưa được triển khai.

## Bước 1: Bản đồ doanh nghiệp

- Mỗi hồ sơ đã được duyệt có điểm hiển thị, dẫn về hồ sơ chính.
- Mức toàn quốc hiển thị số hồ sơ theo tỉnh; phóng to thì nhóm điểm gần nhau và hiển thị theo xã/phường/ngành nghề.
- Dùng tọa độ địa chỉ đã xác minh khi có. Nếu chỉ biết tỉnh/xã thì hiển thị là điểm tổng hợp khu vực, không đặt một ghim giả tại nhà dân hoặc địa chỉ ngẫu nhiên.
- Phân biệt hồ sơ đã duyệt, thông tin đã xác minh, trạng thái trả phí và vị trí tài trợ. Điểm sáng không tự động là một chứng nhận chất lượng.
- Các số đếm phải lấy từ dữ liệu thật; không làm sáng giả để tạo cảm giác đông người.
- Bản đồ hành chính dùng nguồn dữ liệu hợp lệ, cập nhật phiên bản, giữ tên cũ/chuyển tiếp khi đổi địa giới, ghi nguồn và tôn trọng điều kiện sử dụng bản đồ.

Bước này giúp người xem tìm doanh nghiệp và giúp người đăng thấy lợi ích cụ thể. Ưu tiên trước khi xây một thế giới 3D toàn quốc.

## Bước 2: Khách ghé thăm cộng đồng

Có thể cho phép chọn tên hiển thị và avatar để vào không gian địa phương ngay trên web, không cài ứng dụng và không cần tạo tài khoản hiển thị cho thao tác ghé thăm. Hệ thống vẫn cần tạo phiên khách/định danh tạm để chống spam và đồng bộ trạng thái.

Phiên ẩn danh không bảo đảm nhận diện cùng một người ở nhiều thiết bị, không thay thế quyền sở hữu hồ sơ doanh nghiệp và không đủ để quản lý thanh toán. Các thao tác có quyền sở hữu hoặc tài chính vẫn cần xác thực phù hợp.

Không công khai GPS chính xác mặc định. Người xem có thể chọn tỉnh/xã thủ công; vị trí avatar trong phòng chỉ là tọa độ ảo, không chứng minh người đó đang ở địa phương thật. Nếu có check-in địa lý, phải có lựa chọn đồng ý rõ ràng, cách xóa/ẩn và thời hạn lưu phù hợp. Không hiển thị người đã rời phòng là đang trực tuyến.

## Bước 3: Một quảng trường 3D thí điểm

- Thêm nút “Vào quảng trường 3D”; website tìm kiếm/danh bạ thông thường vẫn là đường vào chính.
- Một không gian nhẹ: bảng thông tin địa phương, gian giới thiệu doanh nghiệp, điểm xem câu chuyện và ảnh. Không mô phỏng địa hình/chuyển động toàn quốc ngay từ đầu.
- Three.js/React Three Fiber hoặc công cụ web tương đương phục vụ cảnh 3D trong trình duyệt; tài sản 3D có quyền sử dụng.
- Chia phòng nhỏ. Có thể bắt đầu thử ở mức 20–30 người/phòng, đo hiệu năng và chi phí trước khi tăng; đây là mục tiêu thí điểm, không phải giới hạn đã được benchmark.
- Dùng dịch vụ realtime/presence hoặc máy chủ trạng thái phù hợp, đồng bộ có giới hạn tần suất, chia phòng và xử lý người mất kết nối. Không dùng thao tác ghi database cho từng frame di chuyển.
- Cảnh và mô hình tải khi người xem chủ động mở; có bản nhẹ/2D cho máy yếu, mạng chậm và người cần hỗ trợ tiếp cận.
- Có tên hiển thị được kiểm soát, báo cáo vi phạm, chặn và quy trình kiểm duyệt; chưa mở voice/chat tự do quy mô lớn khi chưa có nguồn lực quản lý.

## Kinh tế và vận hành

300.000đ/năm là gói giới thiệu hồ sơ; không mặc định bao gồm sử dụng realtime 3D không giới hạn. Đo số phiên, thời gian trực tuyến, lưu lượng và công hỗ trợ để quyết định phần miễn phí, giới hạn công bằng và tài trợ sự kiện.

Thứ tự đầu tư: dữ liệu doanh nghiệp thật + tìm kiếm + hồ sơ công khai → bản đồ → phiên ghé thăm đơn giản → một phòng 3D → mở rộng nếu có người dùng quay lại và doanh nghiệp thấy giá trị. Trước khi triển khai realtime cần chốt phạm vi, dịch vụ, chi phí và quyền riêng tư.
