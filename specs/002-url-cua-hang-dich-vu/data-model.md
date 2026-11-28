# Data Model: Tách 2 cổng "Cửa hàng" / "Dịch vụ"

Feature này không thêm/đổi bảng dữ liệu nào (không có Supabase/DB liên quan — xem
`spec.md` mục Key Entities). Phần dưới đây là 2 cấu hình **trong code** (không phải
bảng DB) cần tạo để route hoạt động và dễ mở rộng sau này.

## 1. Cấu hình danh mục Cửa hàng (`CATEGORY_CONFIG`)

Dùng cho route động `app/cua-hang/[category]/page.tsx` (quyết định R4). Gợi ý đặt tại
`data/categories.ts` (file mới, tương tự cách `data/warranty.ts` đang tách riêng dữ liệu
bảo hành khỏi `data/products.ts`).

| Field | Kiểu | Ý nghĩa |
|---|---|---|
| `slug` | string | Phần URL, ví dụ `"may-loc-nuoc"` — khớp giá trị dùng trong `relatedCategory` (data/kienthuc.ts) và route param |
| `label` | string | Tên hiển thị, ví dụ `"Máy lọc nước"` |
| `productCategory` | string | Giá trị field `category` trong `data/products.ts` dùng để lọc sản phẩm thuộc danh mục này (hiện tại: `"Máy lọc nước"`) |
| `description` | string | Mô tả ngắn hiển thị đầu trang danh mục (SEO + giới thiệu) |

Giai đoạn này chỉ có 1 bản ghi: `{ slug: "may-loc-nuoc", label: "Máy lọc nước",
productCategory: "Máy lọc nước", ... }`. Khi thêm thương hiệu/nhóm sản phẩm mới vào Cửa
hàng (Unimax, Kruger... — thuộc quyết định riêng, chưa chốt thời điểm), chỉ cần thêm 1
bản ghi mới vào đây, không đổi route.

*Lưu ý: Điều hòa KHÔNG có bản ghi trong cấu hình này — Điều hòa thuộc nhánh Dịch vụ
(`/dich-vu/dieu-hoa`), có trang riêng không qua route `[category]` động, vì luồng mua
(khảo sát/lắp đặt) khác hẳn luồng mua thẳng của Cửa hàng.*

## 2. Bảng chuyển hướng URL cũ → mới (`next.config.ts` → `redirects()`)

| URL cũ | URL mới | Loại |
|---|---|---|
| `/may-loc-nuoc` | `/cua-hang/may-loc-nuoc` | permanent (308) |
| `/may-loc-nuoc/cleansui` | `/cua-hang/may-loc-nuoc/cleansui` | permanent (308) |
| `/dieu-hoa` | `/dich-vu/dieu-hoa` | permanent (308) |

Không redirect thêm URL nào khác — mọi URL còn lại (`/san-pham`, `/san-pham/[id]`,
`/gio-hang`, `/thanh-toan`, `/ve-chung-toi`, `/kien-thuc`, `/kien-thuc/[slug]`,
`/lien-he`) giữ nguyên theo quyết định R2/R3 trong `research.md`.

## 3. Bảng `product_reviews` (MỚI — Supabase project `digismart-web-shop`)

**Cần trình SQL này và chờ bạn xác nhận trước khi chạy** (thay đổi schema, theo quy tắc
CLAUDE.md), dù không phải project "Unimax". Thực hiện ở bước implement (`tasks.md`), chưa
chạy ở bước plan này.

```sql
create table product_reviews (
  id uuid primary key default gen_random_uuid(),
  product_slug text not null,           -- khớp slug trong data/products.ts (không FK — cùng lý do order_items không FK tới bảng products, xem specs/2026-11-27-redesign-theo-eguru.md 7.2)
  reviewer_name text not null,
  rating smallint not null check (rating >= 1 and rating <= 5),
  comment text not null,
  status text not null default 'pending',   -- pending / approved / rejected
  created_at timestamptz not null default now(),
  reviewed_at timestamptz                    -- thời điểm DigiSmart duyệt/từ chối
);

alter table product_reviews enable row level security;
-- Không có policy public — chỉ API route phía server (service role key) đọc/ghi,
-- giống customers/orders/order_items đã có. Trang chi tiết sản phẩm gọi API server
-- (app/api/reviews/route.ts) để lấy đánh giá ĐÃ DUYỆT, không gọi DB trực tiếp từ client.
```

**Tính điểm trung bình**: tính runtime khi đọc (SQL `avg(rating)` theo `product_slug` với
`status = 'approved'`), không lưu cột tổng hợp riêng — tránh phải đồng bộ 2 nơi dữ liệu,
đúng tinh thần "không thêm phức tạp ngoài yêu cầu" (Nguyên tắc II).
