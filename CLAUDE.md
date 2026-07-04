@AGENTS.md

# DigiSmart App — Nguyên tắc làm việc bắt buộc

> File này được Claude Code tự đọc khi mở session trong project này.
> KHÔNG xoá, KHÔNG sửa nếu không có lý do rõ ràng.

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
