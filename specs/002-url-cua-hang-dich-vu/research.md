# Research: Tách 2 cổng "Cửa hàng" / "Dịch vụ" theo cấu trúc URL mới

## R1 — Cơ chế chuyển hướng URL cũ → mới

**Decision**: Dùng hàm `redirects()` trong `next.config.ts` (tính năng gốc của Next.js),
khai báo `permanent: true` cho từng cặp URL cũ/mới.

**Rationale**: Next.js dịch `permanent: true` thành mã trạng thái HTTP 308 (Permanent
Redirect). Về mặt SEO, Google xử lý 308 tương đương 301 — vẫn chuyển toàn bộ "uy tín"
(ranking signal) từ URL cũ sang URL mới. Không cần thêm middleware, dependency, hay dịch
vụ redirect ngoài. Đây cũng là cách Vercel khuyến nghị cho đổi cấu trúc URL trong Next.js.

**Alternatives considered**:
- Middleware (`middleware.ts`) tự viết logic redirect — phức tạp hơn không cần thiết,
  `redirects()` khai báo tĩnh đã đủ vì danh sách URL cần đổi đã biết trước, không phụ
  thuộc điều kiện runtime.
- Giữ cả 2 URL cùng hoạt động (không redirect, chỉ thêm URL mới) — bị loại vì gây
  "nội dung trùng lặp" (duplicate content) trong mắt Google, loãng thứ hạng SEO thay vì
  gộp lại một chỗ.

## R2 — Vị trí trang chi tiết sản phẩm (PDP): giữ `/san-pham/[id]` hay tách theo nhánh?

**Decision**: Giữ nguyên `/san-pham/[id]` cho TẤT CẢ sản phẩm (cả Máy lọc nước và Điều
hòa), không tách thành `/cua-hang/san-pham/[slug]` và `/dich-vu/san-pham/[slug]` như
sitemap phác thảo ban đầu trong `specs/2026-11-27-redesign-theo-eguru.md` mục 7.1.

**Rationale**: Bản thiết kế gốc chỉ là bản phác thảo sơ bộ, không phải yêu cầu bắt buộc
trong spec này (`spec.md` không ghi cứng URL PDP). Giữ nguyên URL PDP tránh được 86 cặp
redirect (1 cho mỗi sản phẩm) và tránh phải nhân đôi component trang chi tiết theo 2
nhánh — giảm hẳn rủi ro hỏng link/sai sản phẩm trong khi không mất gì về trải nghiệm:
khách vẫn luôn vào đúng trang chi tiết sản phẩm dù bấm từ Cửa hàng hay Dịch vụ. Đây đúng
là tình huống Constitution Nguyên tắc II ("không thêm phức tạp ngoài yêu cầu thực tế")
áp dụng.

**Alternatives considered**:
- Tách PDP theo nhánh (`/cua-hang/san-pham/[slug]`, `/dich-vu/san-pham/[slug]`) — đúng
  với thiết kế gốc hơn, nhưng cần 86 redirect + 2 bản route cho cùng 1 component → tăng
  gấp đôi điểm có thể lỗi, không có lợi ích rõ ràng cho khách hàng.

## R3 — Số phận trang `/san-pham` (danh sách toàn bộ 86 sản phẩm, cả 2 ngành hàng)

**Decision**: Giữ nguyên URL `/san-pham`, không redirect, chỉ viết lại nội dung trang
thành "mục lục tổng" dẫn khách chọn đúng cổng (Cửa hàng hoặc Dịch vụ) thay vì hiển thị
lưới toàn bộ sản phẩm trộn lẫn như hiện tại.

**Rationale**: Trang này đang được Google index với priority 0.9 — xoá hoặc redirect có
thể mất giá trị SEO đã xây không cần thiết. Giữ URL, đổi nội dung là lựa chọn an toàn
nhất, đồng thời vẫn phục vụ đúng mục tiêu "khách phân biệt rõ 2 cổng" của spec.

**Alternatives considered**:
- Redirect `/san-pham` → `/cua-hang` — bị loại vì `/san-pham` hiện liệt kê CẢ Điều hòa,
  redirect thẳng về Cửa hàng sẽ khiến khách tìm điều hòa bị dẫn sai hướng.
- Xoá hẳn trang — bị loại vì gây lỗi 404 cho URL đang được index, vi phạm FR-003.

## R4 — Cấu trúc route danh mục trong Cửa hàng: cố định hay theo slug?

**Decision**: Dùng route động `/cua-hang/[category]` (ví dụ `/cua-hang/may-loc-nuoc`)
thay vì gắn cứng nội dung Máy lọc nước ngay trong `/cua-hang/page.tsx`.

**Rationale**: Đáp ứng đúng mối quan tâm người dùng nêu khi duyệt feature này — "sau này
cũng cập nhật nhiều brand và nhóm sản phẩm khác nữa". Dùng slug động nghĩa là khi có
thêm nhóm sản phẩm/thương hiệu mới vào Cửa hàng (ví dụ Unimax, Kruger — thuộc mục A của
spec gốc, chưa chốt thời điểm), chỉ cần thêm 1 entry cấu hình + trang danh mục mới, KHÔNG
phải đổi cấu trúc URL lần nữa. `/cua-hang/page.tsx` đóng vai trò trang chủ Cửa hàng (hero,
giới thiệu, link tới từng danh mục) — khi chỉ có 1 danh mục (Máy lọc nước) như hiện tại,
trang chủ Cửa hàng có thể dẫn thẳng/nổi bật danh mục đó.

**Alternatives considered**:
- `/cua-hang` vừa là trang chủ vừa là danh mục duy nhất (gộp 1 trang) — đơn giản hơn ở
  giai đoạn này nhưng phải đổi cấu trúc lần nữa ngay khi thêm danh mục thứ 2, đi ngược
  lại đúng mối quan tâm người dùng vừa nêu ra.

## R5 — Danh sách file có link cứng tới URL cũ cần cập nhật

**Decision**: Rà bằng grep toàn repo theo pattern `/may-loc-nuoc` và `/dieu-hoa`, xác
nhận 9 file cần sửa link (không phải chỉ đổi label chữ):

| File | Thay đổi |
|---|---|
| `app/page.tsx` | Viết lại hoàn toàn thành màn hình chọn cổng |
| `app/may-loc-nuoc/page.tsx` | Nội dung di chuyển sang `app/cua-hang/[category]/page.tsx` |
| `app/dieu-hoa/page.tsx` | Nội dung di chuyển sang `app/dich-vu/dieu-hoa/page.tsx` |
| `app/may-loc-nuoc/cleansui/page.tsx` | Di chuyển sang `app/cua-hang/may-loc-nuoc/cleansui/page.tsx` |
| `components/Navbar.tsx` | Sửa link menu desktop + mobile sang URL mới |
| `components/SolutionDiagram.tsx` | Sửa link các node trong sơ đồ hệ sinh thái (trang chủ) |
| `data/kienthuc.ts` | Sửa field `relatedCategory` của 9 bài viết (5 bài điều hòa → `/dich-vu/dieu-hoa`, 4 bài nước → `/cua-hang/may-loc-nuoc`) |
| `app/sitemap.ts` | Thay URL cũ bằng URL mới trong danh sách khai báo cho Google |
| `app/san-pham/[id]/page.tsx` | Sửa breadcrumb JSON-LD + link "quay lại danh mục" trỏ đúng theo category của sản phẩm đó |

Ngoài ra rà thêm (không khớp pattern grep vì dùng biến/props, không phải chuỗi cứng):
`components/CartPage.tsx` (nút "Tiếp tục mua sắm"), `components/BuyNowButton.tsx`,
`components/MayLocNuocProductList.tsx`, `components/Footer.tsx` — cần kiểm tra thủ công
khi code vì có thể tham chiếu URL qua biến.

**Rationale**: Nếu không cập nhật các link này, trang vẫn chạy được (nhờ redirect ở R1)
nhưng khách sẽ luôn đi qua 1 bước chuyển hướng dư thừa mỗi khi bấm từ menu/trang chủ —
không sai nhưng không tối ưu và không đúng tinh thần "cổng mới". Danh sách này dùng để
viết `tasks.md` đầy đủ, không sót file.

## R6 — Trang `/dich-vu` (chủ Dịch vụ): nội dung gì?

**Decision**: `/dich-vu/page.tsx` là trang giới thiệu ngắn vai trò "Dịch vụ" (khảo sát,
lắp đặt, tư vấn), với 3 link nổi bật: Điều hòa (`/dich-vu/dieu-hoa`), Về chúng tôi
(`/ve-chung-toi`), Kiến thức (`/kien-thuc`) — tương tự cách eguru.vn làm trang
"eGURU Services" làm hub giới thiệu rồi dẫn đi tiếp, không nhồi toàn bộ nội dung vào 1
trang.

**Rationale**: Giữ đúng vai trò "landing/hub" như eguru, tái dùng nội dung đã có (Về
chúng tôi, Kiến thức, Liên hệ giữ nguyên trang riêng), tránh viết lại nội dung trùng lặp.

## R7 — Tính năng đánh giá/rating sản phẩm: lưu ở đâu, ai được đánh giá, duyệt thế nào?

**Decision**: Thêm 1 bảng mới `product_reviews` trong Supabase project `digismart-web-shop`
(project đã tạo sẵn cho web này ở feature trước, không tạo project mới). Mọi khách đều
gửi được đánh giá (không bắt buộc đã mua hàng, vì web chưa có hệ thống tài khoản/đăng
nhập để xác minh), nhưng đánh giá mới luôn ở trạng thái "chờ duyệt" — chỉ hiển thị công
khai sau khi DigiSmart duyệt qua 1 trang quản trị nội bộ (`/quan-ly-danh-gia`, bảo vệ bằng
đúng mật khẩu `ORDERS_ADMIN_PASSWORD` đang dùng cho `/quan-ly-don-hang`). Gửi đánh giá có
rate-limit theo IP, tái dùng `lib/kv.ts` đang có cho `/api/chat`/`/api/lead`.

**Rationale**: Đây là cách cân bằng giữa 2 mục tiêu: (1) không cần xây hệ thống tài
khoản/đăng nhập khách hàng (ngoài phạm vi, tốn công không cần thiết — Nguyên tắc II), và
(2) vẫn chống được đánh giá rác/giả vì web chưa biết ai "đã mua hàng thật" — duyệt trước
khi hiển thị là cách đơn giản nhất giải quyết vấn đề này mà không cần thêm hạ tầng. Dùng
chung project Supabase đã có (không tạo project mới) giữ đúng tinh thần "không tạo thêm
resource ngoài khi không cần" và tránh phải xin thêm 1 project free mới (tài khoản đang
giới hạn số project free, đã dùng hết cho `digismart-web-shop` + phải pause `ds_app` để có
chỗ tạo nó — xem `specs/2026-11-27-redesign-theo-eguru.md` mục 11bis).

**Alternatives considered**:
- Hiện đánh giá công khai ngay khi gửi, không duyệt — bị loại vì không có gì chặn đánh
  giá rác/giả/nội dung xấu, rủi ro uy tín thương hiệu.
- Chỉ cho khách đã đặt hàng thật (khớp SĐT với bảng `orders`) mới được đánh giá — an toàn
  hơn nhưng phức tạp hơn nhiều (phải xác thực SĐT, UX phức tạp) và sẽ có rất ít đánh giá ở
  giai đoạn đầu vì lịch sử đơn hàng web còn mỏng — để lại thành cải tiến sau (đã ghi trong
  Assumptions của `spec.md`).
