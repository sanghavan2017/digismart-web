# DigiSmart Website — Trạng thái & Roadmap
(Cập nhật: 04/07/2026 — đây là nguồn sự thật duy nhất về tình trạng project. Đọc file này trước khi bắt đầu mỗi phiên làm việc mới.)

## 🗺️ Checklist tổng thể — web đã "xong" chưa?
Mục này để nhìn toàn cảnh 1 lần, không cần đoán hay chờ gợi ý từng phần. Cập nhật trạng thái mỗi khi xử lý xong 1 dòng.

### A. Nội dung & Catalog
- ✅ Máy lọc nước: 18 SKU thật (Cleansui + Kitz), giá/thông số/bảo hành/ảnh/carousel/video đầy đủ cho phần lớn model
- ✅ **Ảnh 4 SKU Cleansui EU3xx/EU2xx đồng bộ kiểu "vòi+lõi lọc"** (06/07/2026, bạn phát hiện ảnh không đồng nhất so với web hãng): EU301/EU201/EU103 trước đó chỉ có ảnh vòi đơn lẻ (không có lõi lọc, khác kiểu EU202 đang dùng) — đã tìm đúng ảnh combo chính thức từ `mitsubishicleansui.vn` (trang danh mục sản phẩm) cho cả 3 SKU, thay vào `imageUrl`/ảnh đầu gallery trong `data/products.ts`. Cả 4 SKU giờ cùng kiểu ảnh trên lưới sản phẩm.
- ✅ **Điều hòa: 68 SKU THẬT — 22 Mitsubishi Electric + 46 Daikin** (04/07/2026), giá bán lẻ hiển thị theo đúng web hãng (quyết định của bạn 04/07/2026):
  - **Mitsubishi Electric** (mitsubishi-electric.vn, API GetDetailDto): 6 dòng MSY-JY/JA/GR, MSZ-HT/LN, MS-JS; **giá bán DigiSmart = niêm yết −10%** (làm tròn xuống nghìn, quyết định 05/07/2026), `originalPrice` = giá niêm yết hãng → badge "Tiết kiệm 10%"; 88 ảnh; video YouTube dòng GR + LN; bảo hành thân 2 năm/nén 5 năm.
  - **Daikin** (daikin.com.vn/shop, loại 2 dàn rời, Magento): 10 dòng FTKB/FTKF/FTKY/FTKM/FTKZ (inverter 1 chiều), FTHB (1 chiều + sưởi), FTHF/FTXV/FTXM (2 chiều), FTF (tiêu chuẩn); `price` = giá bán lẻ E-Shop, `originalPrice` = giá niêm yết → badge giảm 12–17% thật; 166 ảnh (đã nén 55MB→16MB); thông số từ tab specs (CSPF, model dàn nóng, độ ồn, kích thước...).
  - Giá gạch ngang + chip "Tiết kiệm" giờ chỉ hiện khi có giảm giá thật (sửa cả 5 trang — trước đây sản phẩm đồng giá hiện giá gạch trùng giá bán).
- ✅ Trang `/kien-thuc` **nâng cấp thành hub content SEO** (05/07/2026): 9 bài viết dạng chữ có trang riêng `/kien-thuc/[slug]` (5 bài điều hòa: chọn BTU, Inverter, CSPF, 1 chiều/2 chiều, vệ sinh định kỳ; 4 bài nước: TDS, màng sợi rỗng Cleansui, thay lõi, lọc tại vòi vs lọc tổng) + giữ 3 video cũ. Mỗi bài có nguồn tham khảo (daikin.com.vn, mitsubishicleansui.vn, WHO, QCVN...), Article JSON-LD, canonical, đã vào sitemap (104 URL). Số liệu trong bài đã kiểm chứng qua web hãng — muốn thêm bài mới chỉ cần thêm object vào `posts` trong `data/kienthuc.ts`.
  - **Viết lại 05/07/2026 sau feedback của bạn**: giọng văn ban đầu quá "máy móc" (liệt kê gạch đầu dòng nhiều, thiếu chiều sâu), không có ảnh minh họa. Đã sửa: (1) văn phong tự nhiên hơn, giảm bullet, viết như giải thích trực tiếp; (2) mỗi bài đều có ít nhất 1 ảnh minh họa thật (ảnh sản phẩm hoặc ảnh công nghệ đã có sẵn trong `public/images/`, không dùng ảnh giả); (3) bài chọn công suất BTU bổ sung hẳn phần "chọn thiếu công suất thì sao — chọn thừa công suất thì sao" (short-cycling, hao mòn máy nén, vấn đề độ ẩm) mà bản đầu thiếu. Kiểu dữ liệu `PostSection` thêm field `image?: { src, alt, caption }`, component `app/kien-thuc/[slug]/page.tsx` đã render bằng `next/image`.
- ✅ **Địa chỉ kinh doanh công khai** (05/07/2026, bạn cung cấp): Hộ Kinh Doanh Digismart — 606/145/3C Đường Ba Tháng Hai, P. Diên Hồng, TP.HCM. Đã hiện ở footer + trang liên hệ (kèm link Google Maps), schema nâng từ Organization → **LocalBusiness** (địa chỉ, giờ mở cửa 8h-21h). Bước tiếp theo nên làm: đăng ký **Google Business Profile** với đúng địa chỉ này.
- ✅ **Mốc "1.000+ đơn hàng 2023" — SAI, đã bỏ** (05/07/2026, bạn xác nhận: doanh nghiệp mới 100%). Đồng thời phát hiện + sửa 2 số liệu bịa tương tự chưa từng được dọn dù roadmap từng ghi "đã sửa": mục "Con số nổi bật" ghi "10.000+ Khách hàng hài lòng" và "4.9⭐ Đánh giá trung bình" — không có căn cứ. Đã đổi sang số liệu thật lấy trực tiếp từ `data/products.ts`: 86+ sản phẩm chính hãng, 4 thương hiệu đối tác, 2 ngành hàng, 100% chính hãng có bảo hành.

### B. Chuyển đổi khách hàng (Conversion)
- ✅ Form lead → email + lưu KV → tổng hợp tuần
- ✅ Chatbot AI tư vấn theo data thật
- ✅ Hotline, Zalo, Shopee/TikTok link
- ✅ **Giỏ hàng + đặt lịch lắp đặt nhiều sản phẩm** (04/07/2026, Giai đoạn 2 xong): nút "🛒 Thêm vào giỏ" trên card (`/san-pham`, `/may-loc-nuoc`, `/dieu-hoa`) + trang chi tiết, icon giỏ + badge trên Navbar, trang `/gio-hang` (chỉnh số lượng, xoá, tổng tiền, form đặt lịch), `/api/lead` mở rộng nhận `items` + `address` (email dạng bảng, subject "Đặt lịch lắp đặt", vẫn tương thích form báo giá cũ). Giỏ lưu localStorage, không cần backend. Spec: `specs/2026-07-04-gio-hang-dat-lich.md`. Đã test end-to-end trên dev server: thêm 2 SP → chỉnh qty → gửi form → email đi (API 200) → giỏ tự xoá → màn hình cảm ơn; mobile 375px không tràn ngang.

### C. SEO & khả năng được tìm thấy
- ✅ `sitemap.xml`, `robots.txt`
- ✅ **Google Analytics (GA4)** — đã gắn vào `app/layout.tsx`, Measurement ID `G-YNQSD9M50Q`, đã verify nhận dữ liệu thật trên production
- ✅ **Google Search Console — ĐÃ ĐĂNG KÝ** (property `https://www.digismartvn.com/`, xác minh qua GA). 05/07/2026: sitemap.xml đã submit lại (bản 95 URL, thêm `/bao-hanh-dieu-khoan`), yêu cầu lập chỉ mục thủ công cho 4 trang chính (`/`, `/may-loc-nuoc`, `/dieu-hoa`, `/san-pham`). Trạng thái 5 trang "Đã thu thập – chưa lập chỉ mục" là bình thường với site mới, chờ Google xử lý (kiểm tra lại sau ~1-2 tuần).
- ✅ **Structured Data (Schema.org Product)** — đã thêm JSON-LD vào `app/san-pham/[id]/page.tsx` (tên, ảnh, giá, brand, tình trạng còn hàng). 05/07/2026: sửa URL ảnh + offer thành tuyệt đối (www) theo chuẩn schema.org.
- ✅ **Open Graph tags** (05/07/2026) — share link lên Zalo/Facebook/Messenger giờ có ảnh + tiêu đề đẹp: banner brand `public/images/og-banner.png` (1200×630, vẽ bằng sharp theo brand mark) cho mọi trang, riêng trang sản phẩm dùng đúng ảnh + tên sản phẩm đó. `metadataBase` đã khai báo trong `app/layout.tsx`.
- ✅ **Trang 404 riêng** (05/07/2026) — `app/not-found.tsx` theo brand, có nút về trang chủ + xem sản phẩm.
- ✅ **SEO on-page hoàn chỉnh** (05/07/2026): canonical URL cho mọi trang (kể cả 86 trang sản phẩm), `/gio-hang` noindex, Organization JSON-LD (tên/logo/SĐT) trong layout, BreadcrumbList JSON-LD trang sản phẩm, sửa description trang Liên hệ (còn ghi "phụ kiện điện tử" cũ), title `/san-pham` thêm từ khóa. Đã pass: title/description riêng 12 trang, 1 H1/trang, 13/13 ảnh có alt.

### D. Pháp lý
- ✅ **Chính sách bảo mật thông tin khách hàng** — đã có trang `/chinh-sach-bao-mat` (commit `dc16639`), link ở footer
- ✅ **Chính sách bảo hành & Điều khoản** — trang `/bao-hanh-dieu-khoan`. **05/07/2026: sửa lỗi bảo hành sai/thiếu theo brand** (phát hiện qua chatbot trả lời chung chung "bảo hành 5 năm" khi so Mitsubishi Electric vs Daikin): tạo `data/warranty.ts` làm nguồn dữ liệu bảo hành duy nhất theo từng hãng (có nguồn tham khảo chính thức), dùng chung cho chatbot + trang pháp lý + trang chi tiết sản phẩm. Nội dung đầy đủ 4 hãng: Cleansui (vòi 5 năm/thân 2 năm/lõi 6 tháng), Kitz (24/12 tháng), **Mitsubishi Electric (thân máy 24 tháng/máy nén 60 tháng — trước đây chưa có trong trang pháp lý dù chiếm 22 SKU)**, **Daikin (thân máy 12 tháng/máy nén 60 tháng, cộng chương trình mở rộng 3 năm cho 1 số dòng treo tường cần khách tự đăng ký — trước đây 0/46 SKU Daikin có dữ liệu bảo hành)**. Chatbot giờ trả lời tách rõ thân máy vs máy nén, không áp dụng chéo giữa các hãng. ⚠️ Danh sách dòng Daikin được hưởng ưu đãi 3 năm (FTKY/FTKF/FTKB/FTF/FTHF/FTHB...) lấy từ 1 bài tin tức, có thể chưa đầy đủ 100% — nên xác nhận lại với Daikin nếu muốn quảng bá con số 3 năm rộng rãi hơn.

### E. Kỹ thuật & vận hành
- ✅ Vercel Cron: check video mới hàng tháng, tổng hợp lead hàng tuần (cả 2 đã test pass trên production)
- ✅ Domain, SSL, branch production — ổn định
- ✅ **Đã test responsive/mobile** (04/07/2026, viewport 375px): 10/10 trang không tràn ngang, menu hamburger hoạt động đúng, ảnh hiển thị đủ. Lỗi hàng thống kê hero trang chủ gãy dòng xấu **đã sửa** (04/07/2026): chuyển sang lưới 2×2 cố định, đã verify trên viewport 375px.
- ✅ **Đã đo Core Web Vitals** (04/07/2026, Lighthouse mobile trên production): Trang chủ 75/100 (LCP 4,5s), /san-pham 81/100 (LCP 3,5s), CLS và TBT đều tốt, TTFB 50ms. Nguyên nhân LCP chậm: (1) redirect `digismartvn.com → www.digismartvn.com` tốn ~0,9s; (2) ảnh thiếu `sizes`/`priority` — **đã sửa xong tất cả trang** (04/07/2026): `/san-pham`, `/`, `/may-loc-nuoc`, `/san-pham/[id]` + `ProductGallery`.
- ✅ **Đã điều tra việc đổi primary domain trên Vercel (05/07/2026) — QUYẾT ĐỊNH GIỮ NGUYÊN**: kiểm tra qua Vercel API xác nhận `digismartvn.com` (gốc) đang redirect 308 sang `www.digismartvn.com` — đúng nguyên nhân độ trễ 0,9s. Nhưng toàn bộ SEO xây dựng 05/07/2026 (canonical 12+ trang, sitemap, Organization/LocalBusiness schema) đều neo vào `www` làm bản chính, và **Google Search Console đã đăng ký property riêng cho `https://www.digismartvn.com/`** — đổi ngược sẽ phải sửa lại tất cả + đăng ký lại GSC từ đầu (Google coi www và non-www là 2 site khác nhau, mất lịch sử index). Độ trễ 0,9s chỉ ảnh hưởng khi khách gõ tay domain không `www`; mọi link từ Google/Facebook/Zalo/chatbot đều ra thẳng `www` nên không bị redirect này. Kết luận: giữ nguyên, không đáng đánh đổi.

### F. Thương hiệu/hình ảnh
- ✅ **Favicon logo DigiSmart** (04/07/2026) — `app/icon.svg` vẽ brand mark 4 ô vuông (3 trắng + 1 cam trên nền navy, khớp logo Navbar/Footer). Đã xóa favicon.ico + svg mặc định Next/Vercel trong `public/`. Logo gốc đầy đủ ở `G:\My Drive\DS\` (bản mới nhất: `digismart_logo v2.png`, `DS logo 2.svg`).

**Tóm lại: catalog đã đủ data thật cho CẢ 2 danh mục (18 máy lọc nước + 68 điều hòa), giá bán đã chốt (Mitsubishi −10%, Daikin theo E-Shop), giỏ hàng + đặt lịch đã chạy, trang chi tiết Mitsubishi Electric/Daikin/Kitz giờ có mục "Điểm nổi bật" như trang hãng. Việc lớn còn lại cần bạn: đăng ký Google Business Profile, 2 ảnh Kitz.**

- ✅ **Trang chi tiết sản phẩm — bổ sung mục "Điểm nổi bật" (features)** (05/07/2026): phát hiện 0/68 sản phẩm Mitsubishi Electric + Daikin có mục này (khác với Cleansui đã có từ trước) — khi so với trang hãng thật (mitsubishi-electric.vn) thấy thiếu hẳn phần feature card (Mát lạnh siêu tốc, Tiết kiệm điện, Khử mùi kháng khuẩn...). Đã viết bổ sung cho toàn bộ 6 dòng Mitsubishi Electric (MSY-JY/JA/GR, MSZ-HT/LN, MS-JS) + 10 dòng Daikin (FTKB/FTKF/FTKY/FTKM/FTKZ/FTHB/FTHF/FTXV/FTXM/FTF), dựa trên specs/thông số **đã xác minh sẵn trong data** (không bịa thêm claim mới) — riêng dòng MS-JS dùng đúng nội dung từ screenshot trang thật bạn gửi. ⚠️ Không tự truy cập lại được trang marketing SPA của hãng trong phiên này (WebFetch không render được JS, trình duyệt bị chặn domain ngoài) nên nội dung không phải chép nguyên văn 100% — nếu muốn khớp chính xác câu chữ marketing mới nhất của hãng, cần chụp màn hình gửi thêm hoặc mở quyền truy cập domain đó cho trình duyệt.
- ✅ Bổ sung "Điểm nổi bật" cho `kitz-micro-filter-10inch` (dựa trên specs có sẵn).
- ⚠️ **Kitz vẫn thiếu ảnh thật ở 4/8 SKU** (chỉ 1 ảnh: oss-t7, micro-filter-10inch, bo-loc-tong-2-coc, dong-ho-do-nuoc-thong-minh) — đã thử tìm thêm ảnh cho oss-t7 trên kitzmf.vn nhưng ảnh phụ tìm được là lõi lọc thay thế (OSSC-7), không phải ảnh máy chính nên không dùng. 2 sản phẩm bo-loc-tong-2-coc/dong-ho-do-nuoc vẫn chờ bạn xử lý như đã ghi ở mục "Đang chặn".

## Repo & môi trường chạy code
- Repo: github.com/sanghavan2017/digismart-web — branch đang làm việc: `cleansui-wip`
- **Code thật chạy ở ổ C: — mỗi máy có 1 clone riêng, không qua Google Drive:**
  - Máy công ty (HP): `C:\Users\HP\projects\digismart-web`
  - Máy này (06/07/2026, mới dựng): `C:\Users\ad\projects\digismart-web` — `git clone` từ GitHub, branch `cleansui-wip`, `npm ci` xong, đã copy `.env.local` sang.
- **Lý do**: bản gốc ở `G:\My Drive\Hoc AI\digismart-web` (Google Drive "Stream files" mode) làm hỏng `node_modules` khi cài đặt — không thể chạy `npm install`/`next dev` trực tiếp trên ổ G:.
- **Quy trình hiện tại (2 máy, cùng 1 kiểu)**: sửa code ở `G:\...` (bản chính/sync nhiều máy) → robocopy file đã sửa sang clone C: tương ứng của máy đang dùng (loại trừ `node_modules`/`.next`/`.git`/`.env.local`) → chạy `npm run dev` ở đó để xem demo local → commit/push từ bản C:.
- `.claude/launch.json` trỏ `npm --prefix <đường dẫn clone C: của máy đang dùng>` — **đường dẫn này đặc thù theo máy, sửa cục bộ không commit** khi đổi máy (tránh ghi đè cấu hình máy khác).
- ⚠️ Vẫn là quy trình 2 bước (sửa G: → robocopy → chạy C:), chưa phải "chuyển hẳn sang git thuần" như mục tiêu Giai đoạn 1.5 ban đầu — lý do: Claude Code session gắn với thư mục `G:\My Drive\Hoc AI\digismart-web` (nơi có CLAUDE.md/AGENTS.md của project), đổi hẳn sang C: sẽ cần mở lại session ở đường dẫn mới. Đã cải thiện so với trước: clone ở C: giờ **thường trực** (không tạo lại mỗi phiên như bản scratchpad tạm trước đây), nên chỉ cần robocopy nhanh (~4 giây, không cần `npm ci` lại) thay vì dựng lại từ đầu mỗi lần.
- Stack: Next.js 16 (App Router, Turbopack), deploy Vercel
- Brand: Navy #042C53, Cam #F07B20, font **Montserrat** (geometric sans-serif, toàn bộ heading + body — đổi 05/07/2026 theo yêu cầu, thay Trebuchet MS/Calibri của guideline cũ). Nạp qua `next/font/google` trong `app/layout.tsx` (subset latin + vietnamese, self-host lúc build), biến CSS `--font-sans` trong `app/globals.css`. Muốn đổi font khác: sửa import trong `layout.tsx` là xong — mọi chỗ khác đều dùng `var(--font-sans)`.

## Đã làm xong
- Trang: `/`, `/san-pham`, `/san-pham/[id]`, `/dieu-hoa`, `/may-loc-nuoc`, `/ve-chung-toi`, `/lien-he`
- Form thu lead (`app/api/lead/route.ts`, `LeadForm.tsx`, `LeadFormButton.tsx`) — **đã test thành công trên cả local và production** (digismartvn.com/api/lead trả `{"ok":true}`, email tới được `digismart606@gmail.com`)
- **18 SKU Máy lọc nước THẬT** trong `data/products.ts`: 10 Cleansui (Mitsubishi Chemical) + 8 Kitz Micro Filter — giá, thông số, bảo hành lấy từ catalog NPP + web chính hãng (mitsubishicleansui.vn, kitzmf.vn)
- **18/18 ảnh sản phẩm thật** đã gắn (`public/images/products/`). Ảnh EU202 đã tìm được trên web hãng (`mitsubishicleansui.vn/wp-content/uploads/2023/10/202-1.png` — ảnh nền trắng vòi + lõi EUC2000), lưu tại `cleansui-eu202.png` (04/07/2026)
- ⚠️ **3 ảnh Kitz chưa đạt chuẩn nền trắng** (xem mục "Đang chặn"): `kitz-micro-filter-10inch.jpg` (ảnh công trình crop dở), `kitz-bo-loc-tong-2-coc.jpg` (ảnh bị cắt xén), `kitz-dong-ho-do-nuoc-thong-minh.jpg` (ảnh sản phẩm brand **Callme**, không phải Kitz — cần xác nhận có đúng sản phẩm đang bán không)
- Đã bỏ danh mục Cáp sạc/Tai nghe/Sạc dự phòng/Phụ kiện điện thoại (Remax) khỏi web — quyết định cuối: web chỉ tập trung Điều hòa + Máy lọc nước (phụ kiện khác vẫn bán qua Shopee/Lazada/TikTok Shop riêng, không qua web này)
- **Máy lọc nước ưu tiên hiển thị trước Điều hòa** trong danh mục, menu Navbar, và thứ tự sản phẩm
- Dọn file `page.tsx` dư ở root (trùng `app/page.tsx`)
- **Chatbot đã port từ bản HTML bạn build riêng** (`G:\My Drive\DS\Chatbot DS\chatbot_ds\digismart_chatbot.html`) sang component React `components/Chatbot.tsx` — giữ tính năng card sản phẩm `{{CARD:id}}`, quick menu, voice input/output. **Đã sửa lỗi bảo mật**: bản gốc gọi Claude API trực tiếp từ browser (lộ key qua DevTools) → bản mới gọi qua backend `/api/chat`, key giữ ở server.
- System prompt chatbot (`app/api/chat/route.ts`) tự build từ `data/products.ts` — luôn đồng bộ khi data đổi, không cần sửa code riêng. Có field `isAccessory` để chatbot không gợi ý nhầm phụ kiện (đồng hồ đo nước) khi khách hỏi máy lọc nước/điều hòa.
- Section "Công nghệ lọc nước Nhật Bản" trên `/may-loc-nuoc` đã có 3 ảnh thật (minh hoạ 3D sợi rỗng, ảnh macro cấu trúc sợi, ảnh SEM chặn vi khuẩn) lấy từ mitsubishicleansui.vn/cong-nghe-loc, lưu tại `public/images/tech/`, và 1 video YouTube nhúng (`8Ejncdl2Tg0`, không tải về, chỉ embed iframe).
- **Đã merge `cleansui-wip` → `master` và push** — `digismartvn.com` (production) đã hiện đúng data/UI mới.
- **Vercel Environment Variables đã cấu hình đủ**: `ANTHROPIC_API_KEY` (đã có sẵn từ trước) + `RESEND_API_KEY` (vừa thêm) — chatbot và form lead đã test pass trên cả local và production.

## ⚠️ Đang chặn / cần bạn xử lý (xem Task List trong Claude Code để theo dõi)
1. ~~Update giá bán điều hòa~~ — **cập nhật 05/07/2026: Mitsubishi chuyển sang giá bán riêng DigiSmart = niêm yết −10%** (badge -10% trên cả 22 SKU, đã verify dev server); Daikin giữ nguyên giá E-Shop + badge giảm 12–17% so với niêm yết. Muốn đổi tỷ lệ giảm thì sửa `price` trong `data/products.ts`.
2. **Resend đang ở chế độ test** (chưa verify domain riêng) — chỉ gửi email lead tới đúng 1 địa chỉ đã đăng ký tài khoản Resend (`digismart606@gmail.com`). Muốn gửi thêm tới `sang.havan2017@gmail.com` hoặc địa chỉ khác, cần verify 1 domain tại resend.com/domains (không gấp, chỉ cần khi muốn nhận lead về nhiều email).
3. **2 ảnh Kitz còn lại cần bạn xử lý** (ảnh 10 Inch đã thay bằng ảnh chính hãng MOF254BW từ kitzmf.vn 04/07/2026 — model khớp cả giá 5tr):
   - `kitz-bo-loc-tong-2-coc`: kitzmf.vn KHÔNG có ảnh bộ 2 cốc lắp sẵn (đây là bộ DigiSmart tự ghép) → cần bạn chụp 1 tấm bộ thật, nền càng trơn càng tốt.
   - `kitz-dong-ho-do-nuoc-thong-minh`: ảnh hiện tại là sản phẩm brand **Callme** (callme.vn) — cần bạn xác nhận có đúng sản phẩm đang bán không rồi mới thay ảnh.
4. **Link mạng xã hội/sàn TMĐT SAI — chờ bạn gửi link đúng** (phát hiện 05/07/2026): `shopee.vn/digismart85` (404, shop không tồn tại), `facebook.com/digismartvn`, `tiktok.com/@digismart85` — tổng 12 chỗ trong `components/Footer.tsx`, `app/lien-he/page.tsx`, `app/san-pham/[id]/page.tsx`. Khi có link đúng, Claude sẽ thay tất cả 1 lần (và gom về 1 file constants để sau này chỉ sửa 1 chỗ). **09/07/2026: thêm 1 chỗ dùng link tạm nữa** — `components/ContactWidget.tsx` (icon Messenger trong cụm liên hệ nhanh góc dưới-trái) dùng tạm `facebook.com/digismartvn` + email tạm `digismart606@gmail.com`, cần thay khi có Facebook Page/email công khai thật.
5. ~~node_modules trên ổ G: (máy này) đã hỏng do Google Drive sync~~ — **đã xử lý 06/07/2026 (Giai đoạn 1.5)**: dựng clone thường trực tại `C:\Users\ad\projects\digismart-web`, `.claude\launch.json` trỏ vào đó, verify giỏ hàng end-to-end pass. Quy trình vẫn cần robocopy (G: → C:) trước khi chạy dev — xem mục "Repo & môi trường chạy code" ở trên.

## Đã xử lý gần đây
- ✅ (04/07/2026) **Ảnh EU202** — tải ảnh chính hãng nền trắng từ mitsubishicleansui.vn, gắn vào `data/products.ts`. 18/18 sản phẩm máy lọc nước đã có ảnh thật.
- ✅ (04/07/2026) **Badge giảm giá "-0%" — đã sửa xong CẢ 5 trang** (`/san-pham`, `/`, `/dieu-hoa`, `/may-loc-nuoc`, `/san-pham/[id]`): chỉ hiện badge khi discount > 0. Đã verify trên dev server: trang máy lọc nước (đồng giá) không còn badge nào, trang điều hòa (có giảm thật) vẫn hiện đúng -14%/-13%/-12%.
- ✅ Domain, branch production, 2 API key (Anthropic + Resend) — tất cả đã xong, web thật `digismartvn.com` đã chạy đúng data + chatbot + form lead.
- ✅ 2 claim sai trên `/ve-chung-toi` đã sửa: bỏ "Logitech & Anker" (không đúng), bỏ "10.000 khách hàng" (không có số liệu thật).
- ✅ Chatbot không còn gợi ý nhầm đồng hồ đo nước khi khách hỏi máy lọc nước theo ngân sách thấp.

## Quyết định: brand/content site, không cần Medusa.js
Mô hình thật: khách bỏ SP vào giỏ → đặt lịch lắp đặt → **thu tiền lúc lắp đặt** (không cần checkout online ngay). Vì vậy bỏ Medusa.js khỏi roadmap — không cần backend thương mại riêng.

## Roadmap
1. **Giai đoạn 1 — Brand/content + chatbot (gần xong):** còn data Điều hòa thật + xử lý 5 việc đang chặn ở trên.
2. ⚠️ **Giai đoạn 1.5 — Ổn định quy trình dev — MỘT PHẦN xong (06/07/2026)**: mỗi máy giờ có clone thường trực ở ổ C: (không cần `npm ci` lại mỗi phiên, chỉ robocopy nhanh ~4 giây từ G: trước khi chạy) — đỡ hẳn phần chậm/lỗi node_modules. Chưa xong phần "chuyển hẳn sang git thuần" (bỏ Google Drive làm nơi sửa code chính) vì Claude Code session vẫn gắn với thư mục `G:\My Drive\...`; muốn dứt điểm cần đổi nơi mở Claude Code sang thẳng clone C: — đây là quyết định của bạn (ảnh hưởng chỗ mở app/editor hàng ngày), chưa tự làm.
3. ✅ **Giai đoạn 2 — Giỏ hàng nhẹ + đặt lịch lắp đặt: XONG 04/07/2026** (xem mục B checklist ở trên). Đã merge `cleansui-wip` → `master` (commit `a83fed0`, được duyệt 04/07/2026) — **đã live trên digismartvn.com**: `/gio-hang` trả 200, nút "Thêm vào giỏ" + icon giỏ Navbar đã hiện trên production.
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
