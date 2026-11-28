# Implementation Plan: Tách 2 cổng "Cửa hàng" / "Dịch vụ" theo cấu trúc URL mới

**Branch**: `002-url-cua-hang-dich-vu` | **Date**: 2026-11-28 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/002-url-cua-hang-dich-vu/spec.md`

## Summary

Đổi trang chủ thành màn hình chọn cổng ("Cửa hàng" / "Dịch vụ"), tạo 2 nhánh route mới
`/cua-hang` (Máy lọc nước Cleansui/Kitz) và `/dich-vu` (Điều hòa + giới thiệu công ty),
và thêm redirect vĩnh viễn từ các URL cũ (`/may-loc-nuoc`, `/dieu-hoa`,
`/may-loc-nuoc/cleansui`) sang URL mới tương ứng — dùng cơ chế `redirects()` có sẵn
của Next.js (không cần hạ tầng/dependency mới). Trang chi tiết sản phẩm (`/san-pham/[id]`),
giỏ hàng, thanh toán, về chúng tôi, kiến thức, liên hệ **giữ nguyên URL** (xem Research
quyết định R2) để giảm tối đa số lượng redirect và rủi ro hỏng link — chỉ cập nhật đường
dẫn điều hướng (nav, breadcrumb, schema) bên trong các trang đó để trỏ đúng sang cấu trúc
mới. Trang danh mục mới trong Cửa hàng dùng route `/cua-hang/[category]` (slug) để sau
này thêm thương hiệu/nhóm sản phẩm khác không cần đổi URL lần nữa. Bổ sung thêm 2 việc
theo yêu cầu làm "giống eguru" đầy đủ hơn: (1) các khối trải nghiệm trust bar/khối
khuyến mãi theo chiến dịch trên trang danh mục + PDP, và (2) tính năng đánh giá/rating
sản phẩm (khách gửi đánh giá → chờ duyệt → hiển thị công khai + tính sao trung bình) —
dùng thêm 1 bảng mới trên Supabase project `digismart-web-shop` đã có sẵn cho web này.

## Technical Context

**Language/Version**: TypeScript, Next.js 16 (App Router, Turbopack) — không đổi so với hiện tại.

**Primary Dependencies**: Không thêm dependency mới. Dùng `redirects()` có sẵn trong
`next.config.ts` (tính năng gốc của Next.js) cho mọi chuyển hướng URL cũ → mới.

**Storage**: Dữ liệu sản phẩm/bài viết vẫn ở `data/products.ts`/`data/kienthuc.ts`, không
đổi. Thêm 1 bảng mới `product_reviews` trên Supabase project `digismart-web-shop` (project
đã có sẵn cho web này, dùng chung với `customers`/`orders`/`order_items`) để lưu đánh giá
sản phẩm — xem `data-model.md`. **Việc tạo bảng mới này là thay đổi schema, cần trình SQL
và chờ xác nhận riêng trước khi chạy, theo đúng quy tắc CLAUDE.md** (dù không phải project
Supabase "Unimax" production).

**Testing**: Không có bộ test tự động trong repo hiện tại. Xác minh bằng cách chạy
`npm run build && npm run lint` (bắt buộc theo Nguyên tắc V của constitution) + kiểm tra
thủ công từng nhóm URL trên dev server (xem `quickstart.md`).

**Target Platform**: Web, deploy Vercel — không đổi.

**Project Type**: Web app Next.js App Router, 1 project duy nhất (không có cấu trúc
frontend/backend tách riêng) — giữ như hiện tại.

**Performance Goals**: Không làm chậm thêm so với hiện trạng (`/` LCP 4,5s, `/san-pham`
LCP 3,5s theo đo Lighthouse 04/07/2026 — xem roadmap mục E). `redirects()` của
Next.js/Vercel xử lý ở tầng edge, độ trễ thêm không đáng kể (~chục ms).

**Constraints**:
- Không URL cũ nào (đã index) được trả về lỗi "không tìm thấy trang" sau khi deploy.
- Không đổi logic giỏ hàng/thanh toán/đặt lịch đã có — chỉ đổi đường dẫn điều hướng.
- Không yêu cầu đổi schema Supabase hay biến môi trường.
- Chỉ merge vào `master` sau khi được xác nhận riêng (Nguyên tắc IV, không tự động).

**Scale/Scope**: ~95 URL đang có trong sitemap hiện tại, 86 trang chi tiết sản phẩm
(giữ nguyên URL), 2 nhánh route mới, 1 trang chủ viết lại, ~9 file code có chứa
link cứng tới `/may-loc-nuoc`/`/dieu-hoa` cần cập nhật (xem Research R5).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Nguyên tắc | Đánh giá |
|---|---|
| I. Customer-Facing Reliability First | ✅ Đạt — không đổi logic lead/booking/checkout, chỉ đổi đường dẫn; redirect đảm bảo không khách nào gặp trang lỗi. |
| II. Simplicity & Minimal Dependencies | ✅ Đạt — dùng `redirects()` gốc của Next.js, không thêm package nào. Quyết định giữ nguyên URL `/san-pham/[id]` (thay vì tách `/cua-hang/san-pham/[id]` + `/dich-vu/san-pham/[id]`) chủ động chọn phương án đơn giản hơn, ít thay đổi hơn (xem R2). Tính năng đánh giá dùng lại bảng/project Supabase đã có, không tạo project mới, không thêm thư viện ngoài (form + API route tự viết như `lib/kv.ts`/`app/api/lead` đang làm). |
| III. Customer Data Handling | ⚠️ Cần lưu ý — tính năng đánh giá thu thập tên + nhận xét của khách (PII nhẹ). Phải `esc()` nội dung trước khi render (như `app/api/lead/route.ts` đang làm) để chống injection, và phải rate-limit theo IP (như `/api/chat`, `/api/lead`) theo đúng Nguyên tắc III + FR-015. |
| IV. Production Deploy Gate | ✅ Đạt — sẽ làm trên nhánh làm việc hiện tại, merge vào `master` chỉ sau khi người dùng xác nhận riêng, như mọi lần trước. |
| V. Verify-Before-Merge | ✅ Sẽ đạt — `npm run build && npm run lint` + kiểm tra thủ công toàn bộ nhóm URL cũ/mới trên dev server trước khi coi là xong (chi tiết ở `quickstart.md`). |

Không có vi phạm nào cần biện minh → bỏ qua phần "Complexity Tracking".

## Project Structure

### Documentation (this feature)

```text
specs/002-url-cua-hang-dich-vu/
├── spec.md               # Đã có — yêu cầu nghiệp vụ
├── plan.md               # File này
├── research.md           # Quyết định kỹ thuật (Phase 0)
├── data-model.md          # Cấu hình category/redirect (Phase 1)
├── quickstart.md          # Kịch bản kiểm tra thủ công (Phase 1)
└── tasks.md               # Danh sách việc cụ thể (sinh bởi /speckit-tasks, chưa có)
```
(Không có `contracts/` — feature này không thêm API/giao diện lập trình nào cho hệ thống
bên ngoài, chỉ là trang web + redirect.)

### Source Code (repository root)

```text
app/
├── page.tsx                        # SỬA: nội dung trang chủ hiện tại → màn hình chọn cổng
├── cua-hang/
│   ├── page.tsx                    # MỚI: trang chủ "Cửa hàng" (nội dung /may-loc-nuoc hiện tại chuyển vào đây + nâng cấp)
│   ├── [category]/
│   │   └── page.tsx                # MỚI: trang danh mục theo slug (hiện tại chỉ có "may-loc-nuoc"), có filter brand/giá/tồn kho + sort
│   └── may-loc-nuoc/
│       └── cleansui/
│           └── page.tsx            # DI CHUYỂN từ app/may-loc-nuoc/cleansui/ (landing riêng Cleansui, giữ nguyên nội dung)
├── dich-vu/
│   ├── page.tsx                    # MỚI: trang chủ "Dịch vụ" (giới thiệu công ty + điều hướng Điều hòa/Về chúng tôi/Kiến thức/Liên hệ)
│   └── dieu-hoa/
│       └── page.tsx                # DI CHUYỂN nội dung từ app/dieu-hoa/page.tsx
├── may-loc-nuoc/                    # XOÁ sau khi di chuyển nội dung — route cũ xử lý bằng redirect trong next.config.ts
├── dieu-hoa/                        # XOÁ sau khi di chuyển nội dung — route cũ xử lý bằng redirect trong next.config.ts
├── san-pham/[id]/                   # GIỮ NGUYÊN URL (xem Research R2) — chỉ sửa link breadcrumb/"quay lại danh mục" bên trong
├── san-pham/                        # GIỮ NGUYÊN URL (xem Research R3) — sửa nội dung để dẫn sang 2 cổng
├── gio-hang/, thanh-toan/           # GIỮ NGUYÊN — không đổi
└── ve-chung-toi/, kien-thuc/, lien-he/  # GIỮ NGUYÊN URL — chỉ thêm liên kết điều hướng từ /dich-vu

next.config.ts                       # SỬA: thêm redirects() cho /may-loc-nuoc, /may-loc-nuoc/cleansui, /dieu-hoa
app/sitemap.ts                       # SỬA: thay URL cũ bằng URL mới (/cua-hang, /cua-hang/may-loc-nuoc, /dich-vu, /dich-vu/dieu-hoa)
components/Navbar.tsx, Footer.tsx, SolutionDiagram.tsx  # SỬA: link điều hướng sang URL mới
components/CartPage.tsx, BuyNowButton.tsx, MayLocNuocProductList.tsx  # SỬA: link "tiếp tục mua sắm"/điều hướng sau khi đổi URL
data/kienthuc.ts                     # SỬA: field relatedCategory của 9 bài viết trỏ sang URL mới
app/san-pham/[id]/page.tsx           # SỬA: breadcrumb JSON-LD + link "xem thêm sản phẩm cùng loại" trỏ sang URL mới + thêm mục đánh giá
app/api/reviews/route.ts             # MỚI: nhận đánh giá mới (POST), lấy danh sách đánh giá đã duyệt theo sản phẩm (GET) — rate-limit qua lib/kv.ts
app/api/admin-reviews/route.ts       # MỚI: API cho trang quản trị duyệt/từ chối đánh giá (bảo vệ bằng ORDERS_ADMIN_PASSWORD có sẵn)
app/quan-ly-danh-gia/page.tsx        # MỚI: trang nội bộ (noindex) để DigiSmart duyệt/từ chối đánh giá đang chờ
components/ReviewForm.tsx, ReviewList.tsx, RatingStars.tsx, TrustBadgeBar.tsx  # MỚI: form gửi đánh giá, danh sách đánh giá, sao đánh giá, dải cam kết
lib/supabase.ts                      # SỬA: thêm hàm tạo/đọc/duyệt product_reviews + tính rating trung bình
```

**Structure Decision**: Giữ nguyên cấu trúc Next.js App Router 1 project hiện tại (không
tách frontend/backend). Thêm 2 route-group mới (`cua-hang/`, `dich-vu/`) lồng trang con,
xoá 2 route cũ sau khi di chuyển nội dung, xử lý tương thích ngược hoàn toàn bằng
`redirects()` — không ảnh hưởng các route khác đang hoạt động tốt.

## Complexity Tracking

*Không có vi phạm Constitution cần biện minh — bỏ để trống theo hướng dẫn template.*
