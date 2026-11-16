# Nhập và xuất bản doanh nghiệp — quy trình biên tập thí điểm

Dành cho người phụ trách kỹ thuật/biên tập của dự án. Chủ doanh nghiệp gửi thông tin bằng biểu mẫu/tệp/trao đổi với đội vận hành; không yêu cầu họ chạy lệnh hoặc sửa GitHub.

## Nguồn dữ liệu

- `lib/data.ts`: địa phương, điểm đến và hồ sơ mẫu.
- `content/public-businesses.json`: chỉ hồ sơ thật đã duyệt để xuất bản.
- `NEXT_PUBLIC_CONTENT_MODE=demo`: trạng thái hiện tại, tám hồ sơ minh họa.
- `NEXT_PUBLIC_CONTENT_MODE=public`: chỉ đọc file công khai. Rỗng thì hiển thị rỗng; không trộn hồ sơ mẫu. Cần build/triển khai lại khi đổi dữ liệu hoặc chế độ.

Không phải database, CMS trực tuyến hay đăng nhập doanh nghiệp. Thay đổi được quản lý bằng Git; chỉ đội có quyền repository mới được xuất bản.

## Nhập CSV

Dùng tiêu đề trong `content/businesses-template.csv`. Một dòng cho một cơ sở:

- `slug`: ID đường dẫn không dấu, duy nhất; tên công khai trong `name`.
- `province`, `commune`: slug đúng dữ liệu địa phương hiện có. Không tự suy diễn tên/mã hành chính; bổ sung địa phương hợp lệ trước khi nhập nơi chưa có.
- `category`: một nhóm ngành hiện có, không dùng “Tất cả”.
- `image`: đường dẫn `/images/ten-anh.jpg` (jpg/jpeg/png/webp) đã có trong `public/images`. `imageKind=business` cho ảnh thật của cơ sở; `area` cho ảnh minh họa cảnh quan và sẽ được ghi chú rõ.
- `tagline`, `description`, `address`: thông tin thật được cơ sở đồng ý công bố.
- `services`: các dịch vụ, ngăn bằng dấu `|`; 1–6 mục.
- `phone`, `zalo`, `website`: ít nhất một kênh công khai. Zalo chỉ gồm số, website HTTPS. Không nhập số người phụ trách nếu họ không cho phép công bố.
- `approved=yes`, `consent=yes`, `rights=yes`: biên tập viên chỉ đánh dấu sau khi đã duyệt hồ sơ, nhận đồng ý công bố và đối chiếu quyền sử dụng ảnh. Không coi cờ CSV là chứng nhận pháp lý/chất lượng.

Không nhập email, giấy tờ, bằng chứng đồng ý hoặc thông tin riêng vào file công khai. Lưu tài liệu đối chiếu ở kho riêng có phân quyền.

```sh
npm run import:businesses -- /duong-dan/danh-sach-da-duyet.csv
npm run test:content
npm run check:content
npm run build
npm run check
```

Lệnh nhập thay toàn bộ file công khai bằng danh sách đã kiểm tra. Dùng bản xuất đầy đủ, giữ bản cũ trong Git, xem `git diff` trước khi commit. Dữ liệu trống, sai địa phương, trùng slug, thiếu đồng ý/quyền ảnh/duyệt hoặc liên hệ không hợp lệ sẽ bị từ chối trước khi ghi file. Không có API nhập công khai.

## Xuất bản và phục hồi

1. Chốt thông tin đơn vị vận hành, hỗ trợ, điều khoản, quyền ảnh và dữ liệu hành chính/bản đồ trước mở công khai.
2. Nhập/duyệt hồ sơ và ảnh, kiểm tra các nút liên hệ trên preview.
3. Chuyển môi trường sang `public`, build/preview và kiểm tra không còn hồ sơ mẫu. Chỉ duyệt mở index hoặc bỏ bảo vệ bản demo sau khi nội dung thật được chấp thuận.
4. Commit và triển khai qua GitHub → Vercel. GitHub Actions kiểm tra dữ liệu/build; chưa đặt branch protection bắt buộc nên đội vận hành vẫn phải chờ kiểm tra đạt trước duyệt release.
5. Khi có lỗi nội dung: khôi phục commit dữ liệu trước đó và triển khai lại. Khi có lỗi mã: dùng deployment tốt trước đó, đồng thời xác nhận phiên bản nội dung tương ứng. Không chỉ bấm rollback rồi coi mọi lớp dữ liệu đã được phục hồi.
6. Sao chép repo/ảnh ra nơi lưu độc lập do anh sở hữu; phân công người nhận cảnh báo HTTP từ `/api/health`. Đường dẫn này kiểm tra ứng dụng phản hồi, không chứng minh cơ sở dữ liệu, thu tiền hay vận hành thương mại đã sẵn sàng.

Không nhận thanh toán bằng nút “đã chuyển tiền”, ảnh chụp hoặc file nháp. Giai đoạn thu phí cần điều kiện dịch vụ, đơn vị thu tiền và quy trình đối soát riêng.
