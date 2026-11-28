# Redesign DigiSmart Web theo mô hình eGuru.vn — Master Plan

Ngày: 27/11/2026 · Trạng thái: **ĐÃ DUYỆT kiến trúc (mục 6: B/C/D) — A tạm để sau — sẵn sàng implement theo lộ trình mục 9**

> Đây là thay đổi lớn (đổi mô hình kinh doanh của website từ "lead-gen/đặt lịch" sang
> "TMĐT giao dịch thật"), đụng tới vài ràng buộc cứng trong CLAUDE.md (schema Supabase
> production, hệ thống giá 3 tier, phân quyền 4 role). Vì vậy tài liệu này viết ở chế độ
> SPEC trước khi code, kể cả khi project đang ở "chế độ tự chạy" — xin duyệt kiến trúc
> (mục 6) trước khi bắt tay implement.

## 1. Bối cảnh

Người dùng muốn thay đổi giao diện + cấu trúc website digismartvn.vn theo hướng
https://eguru.vn/ — một cửa hàng gia dụng online (chạy trên Shopify) bán Philips,
Toshiba, Tefal, Xiaomi, Logitech...

## 2. Khảo sát eguru.vn (qua gstack `/browse`)

| Khu vực | Pattern quan sát được |
|---|---|
| Trang chủ | 2 banner lớn tách luồng: "eGURU Store" (mua sắm) vs "eGURU Services" (dịch vụ/giới thiệu công ty) → trust bar 4 ô ngay đầu (chính hãng, giao 2-4h, đổi trả 7-30 ngày, bảo hành) → 3 banner khuyến mãi nhỏ → danh mục nổi bật dạng icon-grid ngang → hàng loạt block "Flash Sale" (đếm ngược) + section sản phẩm theo brand/chủ đề, lặp lại nhiều lần xuống trang |
| Trang danh mục | Sidebar filter (tình trạng kho, thương hiệu, khoảng giá) + sort dropdown + grid card (badge giảm giá %, brand tag, tên, rating, giá gốc gạch ngang/giá sale/số tiền tiết kiệm, nút "Thêm vào giỏ" nhanh ngay trên card) |
| Trang chi tiết SP | Gallery ảnh + thumbnail, rating, tồn kho, giá + badge giảm giá, chọn số lượng, 2 nút "Mua ngay" / "Thêm vào giỏ", trust badges, mô tả dài + đặc điểm nổi bật, 4 ô cam kết, khu đánh giá (Judge.me), "có thể bạn cũng thích" |
| Giỏ hàng/Checkout | Giỏ hàng thật (Shopify cart), có popup loyalty/membership (BLOY), thanh toán qua Shopify |
| Visual | Navy/indigo đậm cho hero + nút chính, đỏ/cam cho badge giảm giá, nền trắng sạch, font "Be Vietnam Pro" |
| Footer | Địa chỉ, hotline, email, cột "Về eGURU"/"Chính sách", form đăng ký tư vấn, logo phương thức thanh toán |

Ảnh chụp tham khảo: xem screenshot đã chụp trong phiên làm việc (desktop + mobile).

## 3. Hiện trạng digismart-web

- **Tech:** Next.js 16 + React 19 + Tailwind v4. **Không có** dependency ecommerce
  nào (không cart/checkout backend thật). `app/gio-hang/page.tsx` hiện ~30 dòng,
  theo spec cũ (`2026-07-04-gio-hang-dat-lich.md`) là **giỏ hàng client-only
  (localStorage) + form đặt lịch lắp đặt**, không phải giỏ hàng thanh toán thật.
- **Catalog thật trong `data/products.ts`:** chỉ **86 SKU**, 2 category:
  - Máy lọc nước: Cleansui (10), Kitz (8)
  - Điều hòa: Mitsubishi Electric (22), Daikin (46)
- **Chưa có trên web:** Unimax, Kruger, Zimmermann, Living Sense — dù đây là các
  brand chính trong business context (phân phối qua TikTok Shop/Shopee Mall).
  Dữ liệu các brand này hiện chỉ nằm trong Supabase "Unimax" (nội bộ, dùng cho
  kho/giá 3 tier/phân quyền 4 role), **chưa từng xuất ra web công khai**.
- Backend Supabase Unimax là **production thật, không staging, không rollback**.

## 4. Quyết định phạm vi (đã chốt qua AskUserQuestion trong phiên này)

| Quyết định | Lựa chọn |
|---|---|
| Mức độ thay đổi | **Nâng cấp thành TMĐT đầy đủ** — giỏ hàng thật + thanh toán, không chỉ đổi giao diện |
| Cấu trúc site | **Tách 2 cổng** như eguru: "Cửa hàng" (mua sắm) và "Dịch vụ/Giới thiệu công ty" |
| Nhận diện thương hiệu | **Giữ màu/brand DigiSmart hiện tại** (navy #042C53 gradient), chỉ học **cấu trúc UX** của eguru (không đổi sang đỏ/cam + Be Vietnam Pro) |
| Lộ trình | **Làm đồng loạt** toàn bộ cấu trúc mới, không phased theo category |
| Thanh toán | **COD + Chuyển khoản tay** — chưa tích hợp cổng thanh toán online (VNPay/Momo/thẻ) |
| Luồng mua hàng | **Tách 2 luồng:** sản phẩm giao thẳng (Cleansui, Unimax/Kruger/Zimmermann/Living Sense...) → giỏ hàng + checkout thật; Điều hòa (cần khảo sát/lắp đặt) → **vẫn giữ flow đặt lịch/báo giá** hiện tại |
| Dữ liệu đơn hàng/tồn kho | **Tách DB/schema riêng cho web**, không đọc/ghi trực tiếp vào Supabase Unimax production |

## 5. Phát hiện quan trọng cần người dùng biết trước khi duyệt

1. **Khoảng trống catalog:** Muốn bán Unimax/Kruger/Zimmermann/Living Sense trên
   web như luồng "mua ngay", nhưng dữ liệu SKU/giá các brand này hiện chỉ có
   trong Supabase Unimax nội bộ, chưa có trên web. Cần quyết định cách đưa dữ
   liệu sang (xem mục 6.A).
2. **"Tách DB riêng" vẫn cần đồng bộ:** nếu tồn kho web không nối trực tiếp
   Supabase Unimax, sẽ có nguy cơ **web báo còn hàng nhưng kho thật đã hết**
   (oversell) — cần quy trình đồng bộ tồn kho định kỳ (thủ công hoặc cron),
   ít nhất ở giai đoạn đầu.
3. **"Làm đồng loạt" vẫn có phụ thuộc kỹ thuật tuần tự:** không thể build giỏ
   hàng/checkout/PDP mới cùng lúc từ đầu — vẫn cần nền tảng data model +
   giỏ hàng + checkout chạy được trước, rồi mới nhân rộng ra tất cả danh mục/trang.
   "Đồng loạt" ở đây hiểu là: không chờ duyệt từng category một, nhưng vẫn phải
   build theo lớp (data → cart/checkout → category pages → PDP) trong cùng một đợt.
4. **Điểm dừng bắt buộc theo CLAUDE.md (production, không rollback):**
   - Bất kỳ `CREATE TABLE`/thay đổi schema nào trên Supabase Unimax → phải trình
     SQL và chờ duyệt. Vì đã chọn "tách DB riêng", nếu DB mới này vẫn tạo trong
     cùng project Supabase Unimax (schema khác) thì **vẫn tính là thay đổi
     production**, cần duyệt trước khi chạy. Nếu dùng project Supabase mới
     hoàn toàn (tách biệt) thì không đụng production, nhưng cần quyết định ở
     mục 6.B.
   - Gọi API bên ngoài với dữ liệu SKU/khách hàng thật (vd đồng bộ tồn kho,
     gửi email xác nhận đơn) → cần thông báo trước khi tự động hoá.
5. **4 role & 3 tier giá:** đơn hàng web mới sẽ do role nào xử lý (Sales?
   CSKH?) và giá hiển thị trên web public dùng tier nào (chắc chắn là "Shop
   Thường", không phải Shop Mall/TikTok — cần xác nhận).

## 6. Quyết định cần chốt tiếp trước khi code (đã chốt 27/11/2026)

**A. Nguồn dữ liệu catalog Unimax/Kruger/Zimmermann/Living Sense cho web**
- **TẠM ĐỂ SAU** — không quyết lúc này. Giai đoạn 1 của việc redesign (mục 9)
  chạy trước với catalog web hiện có (Máy lọc nước Cleansui/Kitz + Điều hòa
  Mitsubishi/Daikin). Khi nào cần đưa Unimax/Kruger/Zimmermann/Living Sense
  lên web thì quay lại chốt mục này (2 phương án gợi ý vẫn còn: export thủ
  công CSV/JSON, hoặc API đọc read-only từ Supabase Unimax).

**B. Nơi đặt DB/schema đơn hàng web mới — ĐÃ CHỐT: như đề xuất**
- Supabase project **mới, riêng biệt** (free/nano tier) dành cho web, không
  chung project "Unimax" — tránh mọi rủi ro production và không cần xin duyệt
  SQL mỗi lần đổi schema ở giai đoạn phát triển.

**C. Phạm vi "Cửa hàng" vs "Dịch vụ" (2 cổng) — ĐÃ CHỐT: như đề xuất**
- `digismartvn.vn/` = trang chọn cổng (như eguru) hoặc `/cua-hang` + `/dich-vu`.
  Cửa hàng gồm (giai đoạn 1, do mục A để sau): Máy lọc nước (Cleansui/Kitz).
  Dịch vụ gồm: Điều hòa (khảo sát/lắp đặt), Về chúng tôi, Kiến thức, Liên hệ.
  Unimax/Kruger/Zimmermann/Living Sense nhập vào Cửa hàng sau khi mục A được chốt.

**D. Đồng bộ tồn kho — ĐÃ CHỐT: như đề xuất**
- Thủ công cập nhật định kỳ (vd cuối ngày) ở giai đoạn 1, tự động hoá sau khi
  có nhu cầu thật.

## 7. Kiến trúc đề xuất

### 7.1 Sitemap mới
```
/                         → Landing chọn cổng (Cửa hàng / Dịch vụ) kiểu eguru
/cua-hang                 → Trang chủ Cửa hàng (hero, flash sale, danh mục, trust bar)
/cua-hang/danh-muc/[slug] → Trang danh mục (filter brand/giá/tồn kho + sort + grid)
/cua-hang/san-pham/[slug] → PDP: gallery, giá, mua ngay/thêm giỏ, mô tả, cam kết, liên quan
/gio-hang                 → Giỏ hàng thật (không còn kiêm đặt lịch)
/thanh-toan               → Checkout (COD/chuyển khoản), thu thông tin giao hàng
/dich-vu                  → Trang chủ Dịch vụ (giới thiệu công ty, D2C/B2B)
/dich-vu/dieu-hoa         → Catalog điều hòa + flow đặt lịch/báo giá (giữ như cũ)
/ve-chung-toi, /kien-thuc, /lien-he → giữ nguyên, chuyển vào nhánh Dịch vụ
```

### 7.2 Data model mới (DB riêng cho web)

**Cập nhật 27/11/2026 sau khi chốt mục 6:** vì mục A (đưa Unimax/Kruger/
Zimmermann/Living Sense vào web) để sau, và phạm vi "Cửa hàng" giai đoạn 1 chỉ
có Cleansui/Kitz (dữ liệu vẫn nằm trong `data/products.ts` như hiện tại) —
**chưa tạo bảng `products` trong DB mới ở giai đoạn 1**, để tránh 2 nguồn dữ
liệu sản phẩm (code + DB) cùng lúc. `order_items` lưu "snapshot" (tên, giá,
ảnh, slug) của sản phẩm tại thời điểm đặt hàng, tham chiếu bằng `product_slug`
(khớp slug trong `data/products.ts`) thay vì khóa ngoại tới bảng `products`.
Khi mục A được chốt và catalog chuyển vào DB thật, sẽ thêm bảng `products` +
cập nhật `order_items` để tham chiếu khóa ngoại.

- `customers` (tối thiểu: tên, SĐT, địa chỉ — không cần tài khoản/login ở giai đoạn 1)
- `orders`, `order_items` (snapshot sản phẩm, không FK tới bảng products — xem trên)
- Giữ nguyên `CartContext` (localStorage) cho trải nghiệm client, nhưng checkout
  ghi xuống `orders` thay vì chỉ gửi email như hiện tại.

**Schema SQL — bản sửa 27/11/2026, bổ sung theo yêu cầu (email khách, ghi chú
giao hàng, mã giảm giá) + tham khảo pattern eguru (flash sale/giảm giá, địa chỉ
giao hàng riêng với hồ sơ khách). Vì đây là Supabase project MỚI (không phải
Unimax production), thêm cột sau này bằng `ALTER TABLE ADD COLUMN` là việc nhẹ,
không rủi ro như sửa Unimax — nên không cần "hoàn hảo" ngay từ đầu, cứ bổ sung
dần khi vận hành thực tế phát sinh nhu cầu:**

```sql
create table customers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,                                    -- không bắt buộc, dùng để gửi email xác nhận đơn nếu khách cho
  address text,                                   -- địa chỉ mặc định của khách (hồ sơ)
  created_at timestamptz not null default now()
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  order_code text not null unique,                -- vd DS-20261127-0001
  customer_id uuid not null references customers(id),
  status text not null default 'pending',         -- pending/confirmed/shipping/completed/cancelled
  payment_method text not null,                    -- cod / bank_transfer
  payment_status text not null default 'unpaid',   -- unpaid / paid
  shipping_address text not null,                  -- địa chỉ giao CỦA ĐƠN NÀY (có thể khác địa chỉ hồ sơ khách)
  shipping_note text,                               -- ghi chú giao hàng: giờ giao, dặn dò tài xế...
  discount_code text,                               -- mã giảm giá đã áp dụng (nếu có), lưu dạng text đơn giản giai đoạn 1
  discount_amount numeric not null default 0,       -- số tiền được giảm nhờ mã
  subtotal numeric not null,
  shipping_fee numeric not null default 0,
  total numeric not null,
  note text,                                        -- ghi chú nội bộ (CSKH/Sales ghi khi xử lý đơn)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_slug text not null,       -- khớp slug trong data/products.ts
  product_name text not null,       -- snapshot tên tại thời điểm mua
  unit_price numeric not null,      -- snapshot giá gốc tại thời điểm mua
  discount_amount numeric not null default 0,  -- giảm giá riêng cho dòng này (vd flash sale), 0 nếu không có
  quantity integer not null check (quantity > 0),
  subtotal numeric not null          -- = (unit_price - discount_amount) * quantity
);

alter table customers enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
-- Không có policy public nào ở giai đoạn 1: chỉ API route phía server (service role key)
-- được đọc/ghi, web client không gọi DB trực tiếp. Chưa cần đăng nhập/role cho khách hàng.
```

*Chưa làm ở giai đoạn 1 (để sau, khi vận hành thực tế thấy cần):* bảng mã giảm
giá riêng có hạn mức/thời hạn tự động áp dụng (hiện chỉ lưu text đơn giản, Sales/
CSKH tự kiểm tra hợp lệ bằng tay), chương trình thành viên/loyalty kiểu BLOY của
eguru, đánh giá/rating sản phẩm (Judge.me-style).

### 7.3 Component/Page mới cần build
- `ProductCard` kiểu eguru (badge giảm giá, brand tag, giá gốc/sale, nút thêm giỏ nhanh)
- `CategoryFilters` (brand, khoảng giá, tồn kho) + `SortDropdown`
- `FlashSaleBlock` (đếm ngược) — có cấu hình bật/tắt theo campaign
- `ProductGallery` (thumbnail), `TrustBadgeBar`, `CommitmentGrid` (4 ô cam kết)
- `CheckoutForm` (COD/chuyển khoản), `OrderConfirmation`

## 8. Design system

Giữ bảng màu DigiSmart hiện tại (navy gradient #042C53 → #185FA5 → #378ADD) và
font hiện có. Bổ sung theo pattern eguru:
- Màu badge giảm giá/sale: đỏ/cam (mới, dùng riêng cho tag giảm giá — không
  thay primary color)
- Trust bar cố định ngay dưới header (giống 4 ô "100% chính hãng / giao nhanh /
  đổi trả / bảo hành" của eguru)
- Mật độ thông tin trên card sản phẩm tăng lên (brand tag, rating placeholder,
  giá gốc gạch ngang + % giảm) — hiện tại card digismart-web đơn giản hơn nhiều

*(Không chạy riêng `/design-consultation` đầy đủ với mockup AI vì đã chốt giữ
brand hiện tại — chỉ cần task thiết kế lại component, không cần bộ nhận diện mới.)*

## 9. Lộ trình (trong 1 đợt, nhưng vẫn theo lớp kỹ thuật)

1. **Nền tảng dữ liệu:** tạo Supabase project mới cho web, export catalog
   Unimax/Kruger/Zimmermann/Living Sense sang schema `products` mới, giữ
   Cleansui/Điều hòa.
2. **Giỏ hàng + Checkout thật:** `CartContext` → `orders` (COD/chuyển khoản),
   trang `/thanh-toan`, email xác nhận đơn.
3. **Trang chủ Cửa hàng + Dịch vụ (2 cổng)** theo layout eguru.
4. **Trang danh mục** (filter + sort + grid) cho tất cả brand thuộc "Cửa hàng".
5. **PDP mới** áp dụng cho toàn bộ SKU thuộc "Cửa hàng".
6. **Điều hòa:** chuyển nhánh vào `/dich-vu/dieu-hoa`, giữ flow đặt lịch.
7. QA toàn site (desktop + mobile), kiểm tra giá tier hiển thị đúng "Shop Thường".

## 10. Điểm dừng chờ duyệt (bắt buộc theo CLAUDE.md)

- [x] Duyệt mục 6 (B, C, D) — 27/11/2026. Mục A để sau.
- [ ] Duyệt SQL schema `products/orders/order_items/customers` trước khi chạy (dù ở Supabase project mới, vẫn trình để xác nhận cấu trúc đúng ý)
- [ ] Xác nhận tạo Supabase project mới (resource mới, cần xác nhận trước khi provision)
- [ ] Xác nhận role nào xử lý đơn hàng mới (Sales/CSKH) trước khi build trang quản trị đơn hàng
- [ ] Xác nhận tier giá hiển thị public = "Shop Thường"

## 11bis. Supabase project web mới — đã tạo (27/11/2026)

- Tên: `digismart-web-shop`, org `sanghavan2017's Org`, region `ap-southeast-1` (Singapore), plan free.
- Project ref: `usjjtcimelzgjadrdfkk` · URL: `https://usjjtcimelzgjadrdfkk.supabase.co`
- Đã chạy migration `create_customers_orders_order_items`: bảng `customers`, `orders`,
  `order_items` theo schema mục 7.2, RLS đã bật cho cả 3 bảng (chưa có policy public —
  chỉ server-side service role key được đọc/ghi).
- Publishable key / service role key: lấy từ Supabase dashboard project này khi cần
  cấu hình `.env` cho Next.js (chưa làm ở bước này — để dành bước "Giỏ hàng + Checkout
  thật" trong lộ trình mục 9).
- **Lưu ý vận hành quan trọng:** để tạo project này, đã phải **pause project `ds_app`**
  (region Tokyo... à `ap-southeast-1`, gắn nhãn `main [PRODUCTION]` trên Supabase
  dashboard) do tài khoản giới hạn tối đa 2 project free đang hoạt động. Đã xác nhận
  với người dùng trước khi pause. Nếu `ds_app` thực ra đang được dùng bởi app nội bộ
  nào đó, cần unpause lại hoặc nâng cấp plan trả phí.

## 11. Next steps đề xuất

1. Người dùng chốt mục 6 (A–D).
2. Bắt đầu từ bước 1 (nền tảng dữ liệu) — vì mọi phần sau đều phụ thuộc vào nó.
3. Sau khi có DB + 1 luồng mua hàng chạy end-to-end (1 sản phẩm thật), demo lại trước khi nhân rộng toàn bộ catalog.
