# Khám phá Việt Nam

Website khám phá 34 tỉnh/thành phố, điểm đến và doanh nghiệp địa phương. Doanh nghiệp tự đăng miễn phí và có trang riêng ngay sau khi đăng; không cần email hoặc tài khoản Vercel.

## Chức năng hiện tại

- 34 bài giới thiệu tỉnh/thành phố, từng nơi có mô tả riêng, ba điểm đến, đặc sản, gợi ý hành trình và nguồn tham khảo. Danh sách theo sắp xếp địa giới hiện hành; Đồng Nai cập nhật theo Nghị quyết 30/2026/QH16.
- Ảnh thật được ghi nguồn/tác giả/giấy phép tại `/nguon-anh`.
- Trang Fit Club 222 sử dụng tên, địa chỉ, điện thoại/Zalo, logo và ảnh do chủ dự án cung cấp. Không thêm giá, giờ mở cửa, đánh giá hoặc chứng nhận chưa được cung cấp.
- `/dang-ky`: điền thông tin, tải ảnh cơ sở, đăng trang ngay. Dữ liệu được lưu tại Vercel Blob private, không chỉ nằm trong trình duyệt.
- `/trang-cua-toi`: xem, chỉnh sửa và xóa các trang đã đăng từ trình duyệt này. Quyền sửa dùng cookie HttpOnly riêng từng trang; khóa trong kho lưu trữ chỉ giữ dạng hash. Đây không phải tài khoản đa thiết bị hay đăng nhập bằng email.
- Danh bạ, trang địa phương và bản đồ cùng đọc dữ liệu đã đăng. Điểm bản đồ là tổng hợp theo địa phương, không phải ghim địa chỉ được xác minh.
- Phân biệt dữ liệu công khai với thông tin quản lý riêng. API không trả editHash/token cho trình duyệt.
- Kiểm tra đầu vào, loại ảnh JPG/PNG/WebP và giới hạn 1,5 MB, giới hạn lượt đăng theo IP, kiểm tra Origin, chống bot cơ bản; cập nhật có điều kiện ETag.
- Trang thật được phép index; `/dang-ky`, `/trang-cua-toi`, `/api/` không đưa vào sitemap. Không có thanh toán hoặc các chỉ số người dùng giả.

## Hạ tầng

Next.js 15 / React 19, GitHub → Vercel. Vercel Blob private `kham-pha-viet-nam-business-pages` đã được kết nối với project. `BLOB_READ_WRITE_TOKEN` chỉ ở môi trường server; không đưa vào NEXT_PUBLIC hoặc Git. Bản ghi JSON theo từng doanh nghiệp, ảnh tách riêng. Cách lưu này dành cho giai đoạn quy mô nhỏ; danh sách được lưu đệm 30 giây và làm mới khi đăng/sửa/xóa.

## Chạy và kiểm tra

Dùng Node.js 22+.

```sh
npm ci
npm run test:content
npm run check:content
npm run build
npm run check
npm run start
```

Máy phát triển cần `.env.local` có `BLOB_READ_WRITE_TOKEN` để thử đăng thật. Build không có credential vẫn tạo được nội dung địa phương và trang Fit Club từ dữ liệu công khai trong repo; API đăng không báo thành công nếu lưu trữ chưa sẵn sàng. `/api/health` kiểm tra kết nối lưu trữ thực tế.

## Dữ liệu

- `lib/provinces.json`: nội dung 34 địa phương và nguồn, cập nhật 16/11/2026.
- `lib/province-photo-credits.json`, `lib/photo-credits.json`: ảnh và giấy phép.
- `content/public-businesses.json`: thông tin Fit Club do chủ dự án cung cấp; có thể bổ sung nội dung biên tập.
- `business-pages/*.json` trong Blob private: trang doanh nghiệp tự đăng, kèm hash quyền chỉnh sửa.
- `business-images/*`: ảnh tải lên; phục vụ qua API chỉ cho ảnh JPG/PNG/WebP.
- `posting-limits/*`: khóa chống đăng dồn, tự hết hạn sau một ngày.

Các tài liệu đề xuất/đánh giá ở những commit cũ mô tả giai đoạn trước khi mở tự đăng. README này mô tả trạng thái mới nhất. Không có cơ sở giả, đánh giá giả, dữ liệu thanh toán hay địa chỉ liên hệ tự bịa trong nguồn công khai.
