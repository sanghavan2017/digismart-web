# Giỏ hàng nhẹ + Đặt lịch lắp đặt (Giai đoạn 2)

Ngày: 04/07/2026 · Trạng thái: implement ngay theo chế độ tự chạy

## Vấn đề
Hiện mỗi sản phẩm có nút "Nhận báo giá" riêng — khách muốn hỏi 2-3 món phải gửi form nhiều lần. Mô hình bán thật: khách chọn sản phẩm → đặt lịch lắp đặt → thu tiền lúc lắp đặt (không cần checkout online).

## Giải pháp
Giỏ hàng thuần client (React Context + localStorage), không cần DB/backend riêng. Khi gửi, dùng lại API lead có sẵn (`/api/lead`) mở rộng thêm danh sách sản phẩm.

## Thiết kế

### 1. `components/CartContext.tsx` (mới)
- `"use client"` — Context + Provider bọc trong `app/layout.tsx`.
- Item: `{ id, name, price, imageUrl?, icon, qty }`.
- Persist vào `localStorage` key `digismart_cart`; load trong `useEffect` (tránh lệch hydration SSR), save mỗi khi đổi.
- API: `items`, `add(product)`, `remove(id)`, `setQty(id, qty)`, `clear()`, `count` (tổng qty), `total` (tổng tiền).

### 2. `components/AddToCartButton.tsx` (mới)
- Nút phụ "🛒 Thêm vào giỏ" (outline navy) đặt cạnh nút "Nhận báo giá" trên card sản phẩm và trang chi tiết.
- `preventDefault/stopPropagation` vì card nằm trong `<Link>`.
- Feedback: đổi text thành "✓ Đã thêm" ~1,5s sau khi bấm.

### 3. Navbar
- Icon 🛒 + badge số lượng (desktop + mobile), link tới `/gio-hang`. Badge chỉ hiện khi count > 0.

### 4. `app/gio-hang/page.tsx` (mới)
- Server wrapper (metadata) + client component `components/CartPage.tsx`:
  - Danh sách item: ảnh, tên, đơn giá, ô chỉnh số lượng (−/+), nút xoá.
  - Tổng tiền tạm tính. Ghi chú: "Thanh toán khi lắp đặt — DigiSmart liên hệ xác nhận lịch".
  - Form đặt lịch: họ tên*, SĐT*, địa chỉ lắp đặt, ghi chú → POST `/api/lead` kèm `items`.
  - Gửi thành công → xoá giỏ, hiện màn hình cảm ơn.
  - Giỏ trống → gợi ý quay lại `/san-pham`.

### 5. `app/api/lead/route.ts` (mở rộng, giữ tương thích cũ)
- Payload thêm `address?: string`, `items?: { id, name, qty, price }[]`.
- Có `items` → email render bảng sản phẩm + tổng tiền, subject "Đặt lịch lắp đặt".
- Lưu KV kèm `items`, `address` (kvPushLead nhận `object` nên không cần sửa lib).

### Vị trí gắn nút Thêm vào giỏ
- Card sản phẩm: `/san-pham`, `/may-loc-nuoc`, `/dieu-hoa` (trang chủ giữ nguyên — card chỉ link tới chi tiết).
- Trang chi tiết `/san-pham/[id]`: nút to cạnh "Nhận báo giá".
- Sản phẩm hết hàng: không hiện nút thêm giỏ.

## Không làm (ngoài scope)
- Không checkout/thanh toán online (Giai đoạn 3).
- Không lưu giỏ vào server/DB.
- Không đổi hệ thống giá 3 tier (web chỉ hiện giá lẻ như hiện tại).
