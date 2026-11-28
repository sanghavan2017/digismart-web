@AGENTS.md

# DigiSmart Web (digismartvn.com) — Nguyên tắc làm việc bắt buộc

> File này được Claude Code tự đọc khi mở session trong project này.
> KHÔNG xoá, KHÔNG sửa nếu không có lý do rõ ràng.
> Áp dụng chính thức 27/11/2026, thay thế bản mô tả sai (xem `CLAUDE.old.md`) từng
> nhầm web này với app quản lý nội bộ Supabase "Unimax" — hai dự án khác nhau.
> Đọc trước khi làm: `DigiSmart_MasterPlan.md` (bức tranh tổng thể), `DigiSmart_TrangThai_Roadmap.md` (trạng thái, việc đang làm), `.specify/memory/constitution.md` (nguyên tắc dự án).

---

## 1. Web này là gì (và KHÔNG phải là gì)

- Website giới thiệu + đặt lịch lắp đặt cho DigiSmart: điều hòa (Mitsubishi Electric, Daikin) và máy lọc nước (Cleansui, Kitz). Khách trả tiền lúc lắp đặt, không thanh toán online.
- **Công nghệ:** Next.js trên Vercel, tự deploy khi push lên `master`.
- **Dữ liệu sản phẩm:** nằm thẳng trong file code `data/products.ts`, `data/warranty.ts`, `data/kienthuc.ts`. **Không có database sản phẩm, không dùng Supabase, không có hệ thống role, không có giá 3 tier.**
- **Backend nhỏ:** `app/api/chat` (chatbot Claude), `app/api/lead` (form đặt lịch, gửi email qua Resend, lưu tạm Vercel KV), `app/api/cron/*` (việc định kỳ).
- Các thương hiệu Unimax, Kruger, Zimmermann, Living Sense bán qua TikTok Shop/Shopee, **ngoài phạm vi web này**. App quản lý nội bộ Supabase "Unimax" là dự án khác, có `CLAUDE.md` riêng.
- **Cập nhật 27/11/2026:** đang redesign thành TMĐT thật (giỏ hàng + checkout có database riêng) —
  xem `specs/2026-11-27-redesign-theo-eguru.md`. Đã tạo Supabase project mới **`digismart-web-shop`**
  (project ref `usjjtcimelzgjadrdfkk`, tách biệt hoàn toàn với "Unimax") dành riêng cho web này —
  chỉ chứa `customers`/`orders`/`order_items` của web, không phải "database sản phẩm" nói ở trên
  (sản phẩm vẫn nằm trong `data/products.ts`).

---

## 2. Cách làm việc (chế độ: LẬP KẾ HOẠCH → BẠN DUYỆT → LÀM)

Chủ dự án không phải lập trình viên và muốn hiểu mình đang làm gì. Vì vậy:

1. **Trước khi sửa**, viết kế hoạch ngắn bằng tiếng Việt đơn giản: làm gì, vì sao, sửa những file nào, ảnh hưởng gì tới khách, cách quay lại nếu hỏng. Rồi **chờ bạn đồng ý**.
2. Việc lớn (thêm tính năng, trang mới, đổi cách hoạt động): dùng quy trình Spec Kit (`/speckit-*`), lưu trong `specs/NNN-ten-feature/`. Bạn duyệt từng bước spec → plan → tasks.
3. Việc nhỏ (đổi chữ, giá, ảnh trong `data/*.ts`): vẫn báo trước sửa gì, nhưng nếu bạn nói **"làm thẳng"** thì làm luôn rồi báo kết quả.
4. **Sau khi sửa:** tự kiểm tra (chạy thử `npm run dev`, build, chụp màn hình nếu là giao diện) và báo kết quả kèm bằng chứng. Không nói "xong" khi chưa kiểm tra.
5. **Cập nhật `DigiSmart_TrangThai_Roadmap.md`** sau mỗi phiên: việc gì đã xong, gì còn mở. Nếu thay đổi cả kiến trúc thì cập nhật cả `DigiSmart_MasterPlan.md`.
6. Giải thích bằng tiếng Việt đời thường; thuật ngữ kỹ thuật phải kèm một câu giải nghĩa.
7. **Quy tắc minh bạch bắt buộc, không cần nhắc** (thêm 27/11/2026): việc nào động tới
   database thật/tiền/resource bên ngoài (Supabase project, API key...) → tự kèm bằng
   chứng (ảnh chụp, log, kết quả chạy thử) khi báo xong, không chờ hỏi. Tạo/xoá/tạm
   dừng resource bên ngoài → ghi ngay vào `specs/` lúc làm, không để sau.

---

## 3. LUÔN HỎI TRƯỚC (kể cả khi bạn đã nói "làm thẳng")

- `git push` lên `master` (tự động deploy lên web thật), `git push --force`, `git reset --hard`, xóa nhánh.
- Xóa hoặc đổi tên file/thư mục không khôi phục được.
- Đổi biến môi trường, API key, cấu hình Vercel, tên miền, Resend.
- Gọi API bên ngoài bằng dữ liệu khách hàng thật (form đặt lịch, SĐT, email).
- Đổi logic chatbot gửi lead, rate-limit, hoặc hành vi của `app/api/*`.
- Thêm thư viện (npm package) mới.
- Tạo, xoá, tạm dừng project/resource trên Supabase hoặc dịch vụ bên ngoài khác.

## 4. TUYỆT ĐỐI KHÔNG

- Không mở, đọc, in ra, hoặc commit: `.env.local`, `API Console Web.txt`, `API console.txt`, `thong tin tk digismartvn.txt` và mọi file chứa key hoặc mật khẩu. Nếu cần biết một biến có đặt chưa, hỏi bạn.
- Không dán API key vào chat, code hay file tài liệu.
- Không đưa key ra trình duyệt; key chỉ nằm ở server (Vercel).
- Không thu thập thông tin nhạy cảm của khách (thẻ, mật khẩu); form chỉ xin tên + SĐT.

---

## 5. Bản đồ nhanh các thư mục

| Thư mục / file | Việc |
|---|---|
| `app/` | Các trang của web (trang chủ, sản phẩm, điều hòa, máy lọc nước, kiến thức, liên hệ, giỏ hàng...) |
| `app/api/` | Backend nhỏ: chat, lead, cron |
| `components/` | Các khối giao diện dùng lại (Navbar, Footer, Chatbot, LeadForm, giỏ hàng...) |
| `data/` | Dữ liệu sản phẩm, bảo hành, bài kiến thức |
| `lib/kv.ts` | Lưu tạm phiếu đặt lịch (Vercel KV) |
| `lib/supabase.ts` | Gọi Supabase project `digismart-web-shop` (customers/orders/order_items) qua REST API |
| `specs/` | Tài liệu thiết kế: `NNN-ten-feature/` (Spec Kit) và các ghi chú cũ dạng `YYYY-MM-DD-ten.md`. Không xóa spec cũ |
| `.specify/` | Bộ công cụ và nguyên tắc Spec Kit (constitution) |
| `openwiki/` | Tài liệu tự sinh. Không sửa tay trừ khi được yêu cầu |

---

## 6. Rủi ro đã biết (xem chi tiết ở MasterPlan mục 6)

- Deploy thẳng production, không staging; sửa nhầm giá hoặc nội dung lên web thật ngay.
- Resend đang ở chế độ test: email đặt lịch chỉ về một địa chỉ.
- Một số link mạng xã hội/sàn TMĐT còn sai hoặc là placeholder.
- Đồng bộ code nhiều máy qua Google Drive dễ nhầm phiên bản.
- Chi phí Anthropic API tăng theo lượng khách chat.

<!-- OPENWIKI:START -->

## OpenWiki

This repository uses OpenWiki for recurring code documentation. Start with `openwiki/quickstart.md`, then follow its links to architecture, workflows, domain concepts, operations, integrations, testing guidance, and source maps.

The scheduled OpenWiki GitHub Actions workflow refreshes the repository wiki. Do not hand-edit generated OpenWiki pages unless explicitly asked; prefer updating source code/docs and letting OpenWiki regenerate.

<!-- OPENWIKI:END -->
