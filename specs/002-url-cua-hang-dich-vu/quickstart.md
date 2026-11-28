# Quickstart: Kiểm tra feature "2 cổng Cửa hàng/Dịch vụ" trên dev server

## Chuẩn bị

1. Robocopy code mới nhất từ `G:\My Drive\Hoc AI\digismart-web` sang clone thường trực
   `C:\Users\ad\projects\digismart-web` (loại trừ `node_modules`/`.next`/`.git`/`.env.local`).
2. `npm run dev` ở clone C:, mở `http://localhost:3000`.

## Kịch bản 1 — Trang chủ chọn cổng (User Story 2)

1. Mở `/`. **Kỳ vọng**: thấy ngay 2 lựa chọn rõ ràng "Cửa hàng" và "Dịch vụ" không cần cuộn.
2. Bấm "Cửa hàng". **Kỳ vọng**: vào `/cua-hang`, thấy danh mục Máy lọc nước.
3. Quay lại `/`, bấm "Dịch vụ". **Kỳ vọng**: vào `/dich-vu`, thấy link tới Điều hòa/Về
   chúng tôi/Kiến thức/Liên hệ.

## Kịch bản 2 — Redirect URL cũ (User Story 1)

Mở từng URL sau, xác nhận KHÔNG có URL nào báo lỗi, và trình duyệt tự chuyển tới đúng
nội dung:

| Mở URL cũ | Phải tới |
|---|---|
| `/may-loc-nuoc` | nội dung danh mục Máy lọc nước tại `/cua-hang/may-loc-nuoc` |
| `/may-loc-nuoc/cleansui` | trang Cleansui tại `/cua-hang/may-loc-nuoc/cleansui` |
| `/dieu-hoa` | nội dung danh mục Điều hòa tại `/dich-vu/dieu-hoa` |

Dùng DevTools (tab Network) kiểm tra status code của request đầu tiên là **308** (không
phải 307/302 tạm thời).

## Kịch bản 3 — URL không đổi vẫn hoạt động đúng (xác nhận R2/R3 không gây hỏng)

1. Mở 1 trang chi tiết sản phẩm máy lọc nước, ví dụ `/san-pham/cleansui-eu301` —
   vẫn load đúng, không redirect.
2. Mở 1 trang chi tiết điều hòa, ví dụ `/san-pham/mitsubishi-msy-gr71vf` — vẫn load đúng.
3. Mở `/san-pham` — thấy nội dung mới (mục lục dẫn 2 cổng), không còn lưới trộn 86 SP.
4. Mở `/gio-hang`, `/thanh-toan`, `/ve-chung-toi`, `/kien-thuc`, `/lien-he` — tất cả vẫn
   load đúng như trước, không bị ảnh hưởng.

## Kịch bản 4 — Danh mục Cửa hàng có lọc/sắp xếp (User Story 3)

1. Vào `/cua-hang/may-loc-nuoc`.
2. Lọc theo 1 thương hiệu (ví dụ chỉ Kitz) → danh sách chỉ còn sản phẩm Kitz.
3. Sắp xếp "Giá thấp đến cao" → thứ tự đúng.

## Kịch bản 5 — Luồng mua hàng không bị gãy (User Story 4, 5)

1. Từ `/cua-hang/may-loc-nuoc`, bấm "Mua ngay" 1 sản phẩm → qua `/thanh-toan` → đặt 1 đơn
   test (COD) → nhận mã đơn → kiểm tra Supabase `digismart-web-shop` có ghi đúng → xoá
   đơn test.
2. Từ `/dich-vu/dieu-hoa`, bấm "Mua ngay" 1 điều hòa → lặp lại bước kiểm tra như trên.
3. Từ `/dich-vu/dieu-hoa`, thử luồng "Đặt lịch tư vấn trước" → form gửi được như cũ.

## Kịch bản 6 — Breadcrumb/schema đúng URL mới

1. Mở `/san-pham/cleansui-eu301`, xem HTML source hoặc DevTools → kiểm tra JSON-LD
   `BreadcrumbList` trỏ tới `/cua-hang/may-loc-nuoc` (không còn `/may-loc-nuoc`).
2. Mở `/san-pham/mitsubishi-msy-gr71vf`, kiểm tra breadcrumb trỏ tới `/dich-vu/dieu-hoa`.

## Kịch bản 7 — Đánh giá sản phẩm (User Story 6)

1. Mở 1 trang chi tiết sản phẩm chưa có đánh giá nào → thấy đúng trạng thái "chưa có
   đánh giá, hãy là người đầu tiên" (không hiện số sao giả).
2. Gửi 1 đánh giá test (sao + nhận xét + tên) → thấy thông báo "đang chờ duyệt", đánh giá
   CHƯA xuất hiện công khai ngay.
3. Vào `/quan-ly-danh-gia` (dùng mật khẩu `ORDERS_ADMIN_PASSWORD`) → thấy đánh giá test ở
   trạng thái chờ duyệt → duyệt nó.
4. Quay lại trang sản phẩm → đánh giá test giờ hiển thị công khai, số sao trung bình cập
   nhật đúng.
5. Gửi liên tục nhiều đánh giá trong thời gian ngắn (test rate-limit) → bị chặn tạm thời
   giống hành vi `/api/lead`.
6. Xoá đánh giá test khỏi Supabase sau khi kiểm tra xong (giữ DB sạch, giống cách đã làm
   với các đơn hàng test trước đây).

## Gate cuối cùng trước khi báo "xong"

- `npm run build && npm run lint` — 0 lỗi.
- `curl -I` (hoặc DevTools) xác nhận cả 3 redirect ở Kịch bản 2 trả đúng status 308.
- Tất cả 6 kịch bản trên PASS trên dev server trước khi commit/push.
