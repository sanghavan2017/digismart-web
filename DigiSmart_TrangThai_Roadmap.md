# DigiSmart Website — Trạng thái & Roadmap
(Cập nhật: 29/06/2026 — đây là nguồn sự thật duy nhất về tình trạng project. Đọc file này trước khi bắt đầu mỗi phiên làm việc mới.)

## 🗺️ Checklist tổng thể — web đã "xong" chưa?
Mục này để nhìn toàn cảnh 1 lần, không cần đoán hay chờ gợi ý từng phần. Cập nhật trạng thái mỗi khi xử lý xong 1 dòng.

### A. Nội dung & Catalog
- ✅ Máy lọc nước: 18 SKU thật (Cleansui + Kitz), giá/thông số/bảo hành/ảnh/carousel/video đầy đủ cho phần lớn model
- ❌ **Điều hòa: vẫn 100% data giả** — việc lớn nhất còn lại, cần bạn gửi SKU thật
- ✅ Trang `/kien-thuc` (SEO content giáo dục nước sạch)
- ⚠️ Mốc lịch sử công ty (`/ve-chung-toi`, mục "Cột mốc") — 2023 "1.000+ đơn hàng" **chưa xác minh**, có thể cũng là claim cũ chưa kiểm tra như 2 mốc đã sửa

### B. Chuyển đổi khách hàng (Conversion)
- ✅ Form lead → email + lưu KV → tổng hợp tuần
- ✅ Chatbot AI tư vấn theo data thật
- ✅ Hotline, Zalo, Shopee/TikTok link
- ❌ **Giỏ hàng/đặt lịch lắp đặt nhiều sản phẩm cùng lúc** — hiện mỗi sản phẩm có nút riêng, khách muốn hỏi 2-3 món phải gửi form nhiều lần (xem Giai đoạn 2 ở Roadmap)

### C. SEO & khả năng được tìm thấy
- ✅ `sitemap.xml`, `robots.txt`
- ✅ **Google Analytics (GA4)** — đã gắn vào `app/layout.tsx`, Measurement ID `G-YNQSD9M50Q`, đã verify nhận dữ liệu thật trên production
- ❌ **Google Search Console — CHƯA ĐĂNG KÝ.** Không submit được sitemap cho Google, không biết web có lỗi index hay không, không thấy từ khoá khách đang tìm ra web
- ✅ **Structured Data (Schema.org Product)** — đã thêm JSON-LD vào `app/san-pham/[id]/page.tsx` (tên, ảnh, giá, brand, tình trạng còn hàng)

### D. Pháp lý
- ❌ **Chính sách bảo mật thông tin khách hàng — CHƯA CÓ.** Form lead đang thu tên/SĐT khách mà chưa có trang nào giải thích dùng thông tin đó để làm gì — rủi ro pháp lý + mất tin tưởng khách
- ❌ **Điều khoản sử dụng / Chính sách bảo hành công khai** — đang chỉ nói miệng qua chatbot, chưa có trang chính thức

### E. Kỹ thuật & vận hành
- ✅ Vercel Cron: check video mới hàng tháng, tổng hợp lead hàng tuần (cả 2 đã test pass trên production)
- ✅ Domain, SSL, branch production — ổn định
- ⚠️ **Chưa test responsive/mobile thật** trong suốt quá trình làm — chỉ xem qua desktop
- ⚠️ **Chưa đo tốc độ tải trang** (Core Web Vitals/PageSpeed) — ảnh nhiều có thể làm trang chậm trên mobile/mạng yếu

### F. Thương hiệu/hình ảnh
- ⚠️ Favicon và vài icon trong `public/` vẫn là mặc định của Next.js/Vercel (`next.svg`, `vercel.svg`...) — chưa đổi sang logo DigiSmart

**Tóm lại: phần "khách thấy được" (catalog, chatbot, lead form) đã khá hoàn chỉnh cho Máy lọc nước. Phần "nền tảng để web sống lâu dài và đo được hiệu quả" (Analytics, Search Console, pháp lý) — hoàn toàn chưa làm, và đây là nhóm việc không ai tự nhớ ra nếu không có checklist như này.**

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

## Hướng dẫn tự cập nhật (không cần AI)
Mọi việc dưới đây là code/file thường — không có gì "chỉ AI mới làm được". Bất kỳ ai biết sửa text file đều làm được; nếu cần code thật (component, route) thì cần biết chút Next.js/React hoặc thuê freelancer, không bắt buộc phải dùng Claude.

**1. Thêm/đổi ảnh sản phẩm:**
- Đặt file ảnh (nền trắng, vuông, khoảng 1000×1000px là đẹp nhất) vào `public/images/products/`, đặt tên theo `id` sản phẩm, ví dụ `cleansui-eu202.jpg`.
- Mở `data/products.ts`, tìm đúng sản phẩm theo `id`, thêm/sửa dòng `imageUrl: "/images/products/cleansui-eu202.jpg",` (đường dẫn bắt đầu bằng `/images/...`, không có `public`).
- Lưu file, chạy `npm run dev` xem lại — không cần sửa gì khác.

**2. Đổi banner/hero (ảnh lớn ở đầu trang):**
- Tìm trong file trang tương ứng (`app/page.tsx` cho trang chủ, `app/may-loc-nuoc/page.tsx`, `app/dieu-hoa/page.tsx`...) đoạn comment `{/* Hero */}`.
- Nếu đang là emoji/icon (`<div>💧</div>`) → thay bằng `<Image src="/images/..." alt="..." width={500} height={500} style={{ width: "100%", height: "auto" }} />` (cần `import Image from "next/image";` ở đầu file nếu chưa có).
- Ảnh banner đặt ở `public/images/` (có thể tạo thư mục con tuỳ ý, ví dụ `public/images/banners/`).

**3. Thêm video (YouTube):**
- Lấy ID video từ link YouTube (`youtube.com/watch?v=XXXXXXXXXXX` → ID là phần sau `v=`).
- Chèn đoạn sau vào trang muốn hiển thị: `<iframe src="https://www.youtube.com/embed/XXXXXXXXXXX" allowFullScreen style={{ width: "100%", aspectRatio: "16/9", border: "none" }} />`.
- Không cần tải video về, chỉ nhúng link — an toàn về bản quyền, nhẹ cho web.

**4. Thêm/sửa thông tin sản phẩm (giá, mô tả, bảo hành):**
- Mọi thông tin sản phẩm nằm hết trong `data/products.ts` — sửa trực tiếp các field `price`, `description`, `specs`, `warranty_years`... theo đúng sản phẩm.
- Chatbot (`app/api/chat/route.ts`) tự đọc lại từ file này mỗi lần trả lời — sửa data xong là chatbot tự cập nhật theo, không cần sửa thêm gì ở phần chatbot.

**Quy trình chạy thử trước khi đưa lên web thật:**
1. Sửa file ở `C:\Users\HP\projects\digismart-web` (xem mục môi trường chạy code ở trên — không sửa trực tiếp trên ổ G: rồi chạy npm).
2. Chạy `npm run dev`, mở `http://localhost:3000` xem thử.
3. Ổn rồi thì `git add`, `git commit`, `git push origin master` — Vercel tự deploy lên `digismartvn.com` sau khoảng 1-2 phút.
