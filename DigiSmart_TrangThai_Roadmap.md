# DigiSmart Website — Trạng thái & Roadmap
(Cập nhật: 28/06/2026 — đây là nguồn sự thật duy nhất về tình trạng project. Đọc file này trước khi bắt đầu mỗi phiên làm việc mới.)

## Repo & môi trường chạy code
- Repo: github.com/sanghavan2017/digismart-web — branch đang làm việc: `cleansui-wip`
- **Code thật chạy ở ổ C:** `C:\Users\HP\projects\digismart-web` (clone riêng, không qua Google Drive)
- **Lý do**: bản gốc ở `G:\My Drive\Hoc AI\digismart-web` (Google Drive "Stream files" mode) làm hỏng `node_modules` khi cài đặt — không thể chạy `npm install`/`next dev` trực tiếp trên ổ G:.
- **Quy trình hiện tại**: sửa code ở `G:\...` (bản chính/sync nhiều máy) → copy file đã sửa sang `C:\Users\HP\projects\digismart-web` → chạy `npm run dev` ở đó để xem demo local → commit/push từ bản C:.
- ⚠️ Đây là quy trình tạm, dễ quên đồng bộ 2 chiều. Về lâu dài nên chuyển hẳn sang dùng git để sync (clone về máy công ty qua `git clone`/`git pull` thay vì Google Drive) — xem mục Roadmap.
- Stack: Next.js 16 (App Router, Turbopack), deploy Vercel
- Brand: Navy #042C53, Cam #F07B20, font Trebuchet MS (heading) + Calibri (body)

## Đã làm xong
- Trang: `/`, `/san-pham`, `/san-pham/[id]`, `/dieu-hoa`, `/may-loc-nuoc`, `/ve-chung-toi`, `/lien-he`
- Form thu lead (`app/api/lead/route.ts`, `LeadForm.tsx`, `LeadFormButton.tsx`) — **đã test thành công trên cả local và production** (digismartvn.com/api/lead trả `{"ok":true}`, email tới được `digismart606@gmail.com`)
- **18 SKU Máy lọc nước THẬT** trong `data/products.ts`: 10 Cleansui (Mitsubishi Chemical) + 8 Kitz Micro Filter — giá, thông số, bảo hành lấy từ catalog NPP + web chính hãng (mitsubishicleansui.vn, kitzmf.vn)
- **17/18 ảnh sản phẩm thật** đã gắn (`public/images/products/`), chuẩn hoá nền trắng đồng nhất 1000×1000. Còn thiếu ảnh: **EU202** (cả web hãng cũng không có ảnh riêng — sản phẩm giống EU201 chỉ khác góc xoay vòi)
- Đã bỏ danh mục Cáp sạc/Tai nghe/Sạc dự phòng/Phụ kiện điện thoại (Remax) khỏi web — quyết định cuối: web chỉ tập trung Điều hòa + Máy lọc nước (phụ kiện khác vẫn bán qua Shopee/Lazada/TikTok Shop riêng, không qua web này)
- **Máy lọc nước ưu tiên hiển thị trước Điều hòa** trong danh mục, menu Navbar, và thứ tự sản phẩm
- Dọn file `page.tsx` dư ở root (trùng `app/page.tsx`)
- **Chatbot đã port từ bản HTML bạn build riêng** (`G:\My Drive\DS\Chatbot DS\chatbot_ds\digismart_chatbot.html`) sang component React `components/Chatbot.tsx` — giữ tính năng card sản phẩm `{{CARD:id}}`, quick menu, voice input/output. **Đã sửa lỗi bảo mật**: bản gốc gọi Claude API trực tiếp từ browser (lộ key qua DevTools) → bản mới gọi qua backend `/api/chat`, key giữ ở server.
- System prompt chatbot (`app/api/chat/route.ts`) tự build từ `data/products.ts` — luôn đồng bộ khi data đổi, không cần sửa code riêng. Có field `isAccessory` để chatbot không gợi ý nhầm phụ kiện (đồng hồ đo nước) khi khách hỏi máy lọc nước/điều hòa.
- Section "Công nghệ lọc nước Nhật Bản" trên `/may-loc-nuoc` đã có 3 ảnh thật (minh hoạ 3D sợi rỗng, ảnh macro cấu trúc sợi, ảnh SEM chặn vi khuẩn) lấy từ mitsubishicleansui.vn/cong-nghe-loc, lưu tại `public/images/tech/`, và 1 video YouTube nhúng (`8Ejncdl2Tg0`, không tải về, chỉ embed iframe).
- **Đã merge `cleansui-wip` → `master` và push** — `digismartvn.com` (production) đã hiện đúng data/UI mới.
- **Vercel Environment Variables đã cấu hình đủ**: `ANTHROPIC_API_KEY` (đã có sẵn từ trước) + `RESEND_API_KEY` (vừa thêm) — chatbot và form lead đã test pass trên cả local và production.

## ⚠️ Đang chặn / cần bạn xử lý (xem Task List trong Claude Code để theo dõi)
1. **Data Điều hòa vẫn 100% giả** (Mitsubishi/Daikin placeholder, giá bịa) — cần SKU thật (brand đang bán, ví dụ Unimax) để làm tương tự Cleansui/Kitz. Đây là việc lớn cuối cùng còn lại trước khi web "xong" hoàn toàn.
2. **Resend đang ở chế độ test** (chưa verify domain riêng) — chỉ gửi email lead tới đúng 1 địa chỉ đã đăng ký tài khoản Resend (`digismart606@gmail.com`). Muốn gửi thêm tới `sang.havan2017@gmail.com` hoặc địa chỉ khác, cần verify 1 domain tại resend.com/domains (không gấp, chỉ cần khi muốn nhận lead về nhiều email).

## Đã xử lý gần đây
- ✅ Domain, branch production, 2 API key (Anthropic + Resend) — tất cả đã xong, web thật `digismartvn.com` đã chạy đúng data + chatbot + form lead.
- ✅ 2 claim sai trên `/ve-chung-toi` đã sửa: bỏ "Logitech & Anker" (không đúng), bỏ "10.000 khách hàng" (không có số liệu thật).
- ✅ Chatbot không còn gợi ý nhầm đồng hồ đo nước khi khách hỏi máy lọc nước theo ngân sách thấp.

## Quyết định: brand/content site, không cần Medusa.js
Mô hình thật: khách bỏ SP vào giỏ → đặt lịch lắp đặt → **thu tiền lúc lắp đặt** (không cần checkout online ngay). Vì vậy bỏ Medusa.js khỏi roadmap — không cần backend thương mại riêng.

## Roadmap
1. **Giai đoạn 1 — Brand/content + chatbot (gần xong):** còn data Điều hòa thật + xử lý 5 việc đang chặn ở trên.
2. **Giai đoạn 1.5 — Ổn định quy trình dev (nên làm sớm):** chuyển hẳn việc đồng bộ code khỏi Google Drive sang git thuần (clone repo trực tiếp ở mỗi máy, `git pull`/`git push` để sync) — tránh phải copy tay giữa ổ G: và C: như hiện tại, giảm rủi ro quên đồng bộ.
3. **Giai đoạn 2 — Giỏ hàng nhẹ + đặt lịch lắp đặt:** cart bằng React state (không cần DB/backend riêng) → khách chọn SP → gửi qua API lead đã có sẵn (`app/api/lead/route.ts`), mở rộng thêm field danh sách SP đã chọn.
4. **Giai đoạn 3 — Cổng thanh toán (tuỳ chọn):** VNPay/MoMo/ZaloPay để khách đặt cọc trước khi lắp đặt.
5. **Giai đoạn 4 — CMS (Strapi/Directus), làm sau khi cần:** chỉ làm khi tần suất đổi nội dung/sản phẩm đủ nhiều để đáng công setup riêng 1 backend.

## Cách dùng file này
- Đầu mỗi phiên làm việc mới với Claude: yêu cầu đọc file này trước để nắm tình trạng, tránh phải kể lại từ đầu.
- Sau khi xử lý xong 1 việc trong mục "Đang chặn", cập nhật lại mục đó (xoá hoặc đánh dấu xong) — giữ file này luôn khớp thực tế, không để cũ như lần trước.
