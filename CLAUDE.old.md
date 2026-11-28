@AGENTS.md

# DigiSmart App — Nguyên tắc làm việc bắt buộc (BẢN CŨ — đã thay thế 27/11/2026)

> **Đã ngừng dùng.** File này mô tả NHẦM dự án Supabase "Unimax"/4-role/giá 3 tier —
> đó là 1 app nội bộ khác, không phải web digismartvn.vn trong thư mục này. Giữ lại
> chỉ để làm lịch sử. Xem `CLAUDE.md` hiện hành (trước là `CLAUDE.new.md`).

---

## 🏗️ Tech Stack

- **Frontend:** Web app (thư mục: `G:\My Drive\DS\ds_app\web\`)
- **Backend:** Supabase — Project "Unimax", region Tokyo, Nano plan
- **Kênh bán:** TikTok Shop, Shopee Mall

---

## ⚠️ Ràng buộc cứng — KHÔNG được phá vỡ

### 1. Production trực tiếp — không staging, không migration history
- Supabase Unimax **là production thật**, không có branch dev/staging
- Không có migration history → **không rollback được** nếu sai
- **Tuyệt đối không** tự chạy lệnh thay đổi schema (ALTER TABLE, DROP, CREATE TABLE, RLS policy...) mà không hỏi và được duyệt trước
- Mọi thay đổi schema → phải trình bày SQL rõ ràng → chờ duyệt → mới chạy

### 2. Hệ thống phân quyền 4 role — không được tự ý mở rộng
| Role | Quyền chính |
|---|---|
| **Admin** | Toàn quyền |
| **Warehouse** | Xem + cập nhật tồn kho |
| **Sales** | Xem sản phẩm, giá, xuất báo cáo |
| **CSKH** | Xem thông tin đơn hàng, hỗ trợ khách |

- Mọi feature mới → phải khai rõ **role nào được dùng** trước khi viết code
- Không tự ý cho role thấp hơn truy cập dữ liệu của role cao hơn

### 3. Hệ thống giá 3 tier — không tự ý thay đổi logic
- **Shop Thường** / **Shop Mall** / **TikTok**
- Không tự ý gộp, đổi tên, hay sửa logic tính giá nếu không được yêu cầu rõ ràng

### 4. Quy mô dữ liệu thật
- 230+ SKUs, nhiều brand: Unimax, Kruger, Zimmermann, Living Sense, Cleansui
- Không dùng dữ liệu thật để test — hỏi trước nếu cần chạy query trên production

---

## 📋 Chế độ làm việc: TỰ CHẠY (autonomous)

> Người dùng chọn chế độ này ngày 2026-07-04. Ghi đè quy trình
> CLARIFY → SPEC → APPROVAL trong CLAUDE.md toàn cục — CHỈ áp dụng cho project này.

- Mọi task trong project web này: làm thẳng end-to-end, KHÔNG trình spec chờ duyệt
- Vẫn tự VERIFY sau khi sửa: chạy trang / chụp màn hình / test, báo kết quả kèm bằng chứng
- Task lớn vẫn lưu design doc vào `specs/` làm lịch sử, nhưng không dừng chờ duyệt

**CHỈ dừng hỏi khi hành động phá hủy / không hoàn tác được:**
- SQL thay đổi schema/data trên Supabase Unimax (production, không rollback được)
- Xoá/rename bảng, cột, RLS policy
- Xoá file hoặc dữ liệu không khôi phục được
- `git push --force`, `git reset --hard`, xoá branch
- Push/merge lên master (tự động deploy production digismartvn.vn)
- Gọi API bên ngoài với dữ liệu SKU/khách hàng thật

---

## 🔍 Quy tắc minh bạch bắt buộc — không cần nhắc

> Thêm 27/11/2026, theo yêu cầu người dùng: để người dùng không phải *nhớ* chủ động
> hỏi/kiểm tra, các việc dưới đây là luật cố định — Claude Code tự làm mỗi lần, không
> chờ được hỏi.

- Việc nào động tới **database thật, tiền, tài khoản/resource bên ngoài** (Supabase
  project, API key, domain...) → khi báo xong phải **tự kèm bằng chứng** (ảnh chụp
  màn hình, log, kết quả chạy thử) — không chờ người dùng hỏi "xong chưa/cho xem".
- **Tạo/xoá/tạm dừng resource bên ngoài** (project Supabase, API key, service mới...)
  → ghi lại ngay vào `specs/` (file liên quan tới việc đang làm) lúc thực hiện, không
  để sau mới ghi.
- Task lớn làm xong → tự cập nhật `DigiSmart_TrangThai_Roadmap.md`, không cần người
  dùng nhắc "cập nhật roadmap đi".
- Mọi quyết định "khó sửa lại" (đã liệt kê ở mục "CHỈ dừng hỏi khi...") vẫn phải hỏi
  trước dù đang ở chế độ tự chạy — quy tắc này không thay đổi.

---

## 💾 Quản lý spec & tài liệu

- Mọi design doc lưu vào thư mục: `specs/`
- Tên file: `YYYY-MM-DD-ten-feature.md`
- Không xoá spec cũ sau khi implement xong — giữ lại làm lịch sử

---

## ❌ Các việc KHÔNG được tự làm

- Chạy migration hoặc seed data trên Supabase Unimax
- Xoá hoặc rename cột, bảng trong database
- Thay đổi RLS policy mà không trình bày trước
- Push code lên branch main mà không có bước review
- Gọi API bên ngoài với dữ liệu SKU/khách hàng thật

<!-- OPENWIKI:START -->

## OpenWiki

This repository uses OpenWiki for recurring code documentation. Start with `openwiki/quickstart.md`, then follow its links to architecture, workflows, domain concepts, operations, integrations, testing guidance, and source maps.

The scheduled OpenWiki GitHub Actions workflow refreshes the repository wiki. Do not hand-edit generated OpenWiki pages unless explicitly asked; prefer updating source code/docs and letting OpenWiki regenerate.

<!-- OPENWIKI:END -->
