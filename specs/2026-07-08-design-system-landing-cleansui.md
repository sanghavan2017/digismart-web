# Design System — Landing Page Cleansui (máy lọc nước)

> Nguồn: skill `ui-ux-pro-max` (`--design-system`, domain `landing`/`color`) + dữ liệu SKU thật trong [data/products.ts](../data/products.ts) (EU301, EU201, EU202, EU103, MPOE-P, MPOE-S...).

## 1. Cấu trúc trang (Section order)

Kết hợp pattern **Feature-Rich Showcase** (chủ đạo) + **Trust & Authority** (vì sản phẩm liên quan sức khỏe/nước uống — cần yếu tố tin cậy) + **Product Review**:

1. **Hero** — value prop chính: "Máy lọc nước Cleansui — công nghệ Nhật Bản, giữ khoáng tự nhiên". Ảnh sản phẩm lớn + CTA chính (Mua ngay / Xem sản phẩm).
2. **Trust bar** — logo/chứng nhận: Mitsubishi Chemical, xuất xứ Nhật Bản, tiêu chuẩn lọc, bảo hành 5 năm.
3. **Feature grid (4–6 card)** — lõi lọc, giữ khoáng, công suất lọc (L), lưu lượng (L/phút), kiểu lắp đặt.
4. **Dòng sản phẩm / So sánh SKU** — bảng so sánh EU301 / EU201 / EU202 / EU103 / MPOE-P / MPOE-S (giá, công suất, đặc điểm nổi bật) → dẫn sang trang chi tiết.
5. **Ảnh lắp đặt thực tế / gallery** — đã có sẵn theo commit gần nhất (gallery gia dụng thực tế).
6. **Đánh giá khách hàng** (nếu có review) — rating tổng, vài review nổi bật.
7. **CTA cuối trang** — nút mua hàng lặp lại (Shopee Mall / TikTok Shop link).

**CTA placement:** Hero (sticky trên mobile) + sau feature grid + cuối trang.

## 2. Style

**Flat Design** — 2D, tối giản, không đổ bóng nặng, bo góc nhẹ, icon-heavy, hiệu năng tốt (quan trọng cho traffic từ TikTok/Shopee ads → cần load nhanh).

- Không dùng gradient/shadow phức tạp
- Hover: đổi màu/opacity, 150–200ms ease
- Icon: SVG (Phosphor/Heroicons), không dùng emoji

## 3. Bảng màu (Color tokens)

Chủ đề "nước sạch" — xanh dương + cyan, tin cậy và sạch sẽ:

| Role | Hex | CSS Variable |
|---|---|---|
| Primary | `#0284C7` | `--color-primary` |
| On Primary | `#FFFFFF` | `--color-on-primary` |
| Secondary | `#06B6D4` | `--color-secondary` |
| Accent/CTA | `#0891B2` | `--color-accent` |
| Background | `#F0F9FF` | `--color-background` |
| Foreground | `#0F172A` | `--color-foreground` |
| Card | `#FFFFFF` | `--color-card` |
| Muted | `#EFF7FB` | `--color-muted` |
| Muted Foreground | `#64748B` | `--color-muted-foreground` |
| Border | `#E0F0F8` | `--color-border` |
| Destructive | `#DC2626` | `--color-destructive` |
| Ring | `#0284C7` | `--color-ring` |

Tuỳ chọn thay thế (nếu muốn nghiêm túc/y tế hơn — dùng cho phần "chứng nhận an toàn"): thêm accent xanh lá `#16A34A` (health green) cho badge "đạt chuẩn" — tách biệt với CTA để tránh nhầm lẫn ý nghĩa màu.

## 4. Typography

- **Heading:** Rubik (600–700 cho H1/H2, 500 cho H3)
- **Body:** Nunito Sans (400 body, 500 label)
- Import:
```css
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700&family=Rubik:wght@300;400;500;600;700&display=swap');
```
- Type scale: 12 / 14 / 16 / 18 / 24 / 32 / 40
- Số liệu kỹ thuật (công suất L, lưu lượng L/phút, giá) → dùng tabular figures để bảng so sánh không lệch.

## 5. Spacing & Layout

- Spacing scale 8pt: 8 / 16 / 24 / 32 / 48 / 64
- Breakpoints: 375 / 768 / 1024 / 1440
- Container max-width: `max-w-6xl` (desktop)
- Mobile-first, không scroll ngang, ảnh sản phẩm dùng `aspect-ratio` cố định để tránh CLS

## 6. Hiệu ứng (Effects)

- Không gradient/shadow nặng — card dùng border 1px `--color-border` thay vì shadow
- Transition 150–300ms, ease-out khi vào, ease-in khi ra
- Ảnh lazy-load, trừ ảnh hero (load ngay, có kích thước khai báo trước)

## 7. Cần tránh (Anti-patterns)

- Giấu thông tin liên hệ / bảo hành
- Thiếu chứng nhận, xuất xứ rõ ràng (đặc biệt quan trọng vì sản phẩm liên quan nước uống)
- Dùng emoji làm icon chức năng
- Bảng so sánh SKU quá dày đặc trên mobile → cần dạng card xếp dọc hoặc scroll ngang có chỉ báo

## 8. Checklist trước khi bàn giao

- [ ] Contrast text ≥ 4.5:1 (light mode, nền `#F0F9FF`)
- [ ] Touch target ≥ 44px cho nút CTA trên mobile
- [ ] Responsive test: 375px, 768px, 1024px, 1440px
- [ ] Ảnh có kích thước khai báo (tránh layout shift)
- [ ] CTA nhất quán màu `--color-accent` xuyên suốt trang
- [ ] prefers-reduced-motion được tôn trọng
