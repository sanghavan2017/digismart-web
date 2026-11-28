# DigiSmart Website — Master Plan (bản dễ hiểu cho người không chuyên kỹ thuật)

(Tạo lần đầu: 26/10/2026. Đây là tài liệu "nhìn tổng thể 1 lần" — giải thích web này được xây như thế nào,
bằng ngôn ngữ đời thường, để bạn tự tin trao đổi với dev/freelancer khác nếu cần, không phụ thuộc vào
một mình Claude. Khác với `DigiSmart_TrangThai_Roadmap.md` — file đó là nhật ký trạng thái/việc-cần-làm,
cập nhật liên tục theo từng buổi code; file này là bức tranh kiến trúc tổng thể, ít thay đổi hơn.)

---

## 1. Dự án này là gì?

Một **website giới thiệu + bán hàng nhẹ** cho DigiSmart — hộ kinh doanh bán và lắp đặt điều hòa
(Mitsubishi Electric, Daikin) và máy lọc nước (Cleansui, Kitz Micro Filter) tại TP.HCM.

Mô hình bán hàng: khách xem sản phẩm trên web → bỏ vào giỏ → điền form đặt lịch lắp đặt →
nhân viên DigiSmart gọi lại tư vấn → lắp đặt tại nhà → **khách trả tiền lúc lắp đặt** (không thanh
toán online qua web). Vì vậy web này **không phải sàn thương mại điện tử** kiểu Shopee/Tiki (không có
giỏ hàng server, không cổng thanh toán) — nó giống một "cuốn catalog điện tử thông minh có nhân viên
tư vấn AI trực" hơn.

---

## 2. Web được xây như thế nào? (ví dụ đời thường)

Hình dung web như **một cửa hàng**:

| Thành phần | Ví như gì trong cửa hàng | Công nghệ thật đang dùng |
|---|---|---|
| **Frontend** (cái khách nhìn thấy) | Mặt tiền, kệ trưng bày, bảng giá | **Next.js** (dựa trên React) — một "khung sườn" làm web phổ biến, kèm **Tailwind/CSS** để tạo giao diện |
| **Backend / API** (xử lý phía sau) | Nhân viên nghe điện thoại, ghi đơn, gọi chuyên gia tư vấn | 3 "nhân viên" nhỏ: nhận form đặt lịch, chạy chatbot AI, và 2 việc tự động chạy định kỳ (cron job) |
| **Dữ liệu sản phẩm** | Sổ ghi hàng hoá/giá/bảo hành | **Không có database riêng** — toàn bộ 86 sản phẩm nằm thẳng trong file code (`data/products.ts`). Sửa giá/thêm SP = sửa file này |
| **Hosting** (nơi web "sống") | Mặt bằng thuê, có điện nước 24/7 | **Vercel** — nền tảng chuyên host web Next.js, tự động triển khai mỗi khi có code mới |
| **Tên miền + khóa an toàn** | Địa chỉ cửa hàng + ổ khóa cửa | **digismartvn.com** (tên miền) + **SSL/HTTPS** (ổ khóa, hiện biểu tượng 🔒 trên trình duyệt) |
| **Kho tạm giữ phiếu đặt hàng** | Hộp thư nhận phiếu trước khi xử lý | **Vercel KV** (một loại cơ sở dữ liệu nhỏ, kiểu "sổ tay" lưu tạm, không phải database đầy đủ) |
| **Bên thứ 3 đi thuê** | Thuê người giao hàng, tổng đài ngoài | Xem mục 3 bên dưới |

**Vì sao không cần "database thật" / CMS quản trị nội dung?**
Vì danh mục chỉ ~86 sản phẩm, không đổi liên tục (vài ngày/tuần mới sửa 1 lần). Viết thẳng vào code
rẻ hơn, nhanh hơn là xây riêng 1 hệ thống quản trị nội dung (CMS). Đánh đổi: muốn sửa giá/thêm sản
phẩm phải nhờ người biết sửa code (xem mục 5) — chưa có màn hình "nhập liệu" kiểu Excel cho người
không biết code. Nếu sau này đổi giá/thêm SP **rất thường xuyên** (vài lần/ngày), lúc đó mới đáng công
xây CMS riêng (Strapi/Directus) — xem roadmap "Giai đoạn 4".

---

## 3. Các dịch vụ bên ngoài (API) đang dùng và dùng để làm gì

| Dịch vụ | Dùng để làm gì | Có phải trả phí không |
|---|---|---|
| **Anthropic (Claude API)** | Chạy chatbot AI tư vấn sản phẩm trên web | Tính phí theo lượng dùng (token) — chi phí tăng theo lượng khách chat |
| **Resend** | Gửi email khi khách điền form đặt lịch/báo giá | Có gói miễn phí cho lượng gửi vừa phải; hiện đang ở "chế độ test" (chỉ gửi về được 1 địa chỉ email đã đăng ký) |
| **Vercel KV** | Lưu tạm các phiếu đặt lịch (lead) để tổng hợp báo cáo tuần | Nằm trong gói Vercel |
| **YouTube Data API** | Tự động kiểm tra video mới của hãng Cleansui/Kitz hàng tháng | Miễn phí (có giới hạn lượt gọi/ngày) |
| **Google Analytics (GA4)** | Đếm số người vào web, trang nào xem nhiều | Miễn phí |
| **Google Search Console** | Theo dõi web có được Google lập chỉ mục/tìm thấy không | Miễn phí |

**Chi phí vận hành — ước tính tham khảo, CẦN TỰ KIỂM TRA LẠI con số thật trong từng dashboard
(Vercel/Anthropic Console/Resend), mình không có quyền xem hóa đơn thật của bạn nên không bịa số:**
- Vercel hosting: miễn phí (gói Hobby) nếu traffic còn thấp; cần nâng lên gói Pro (trả phí hàng tháng)
  nếu traffic tăng nhiều hoặc cần nhiều cron job hơn.
- Anthropic API (chatbot): trả theo lượng khách chat thực tế — tăng theo mùa cao điểm bán hàng.
- Resend: miễn phí ở lượng gửi hiện tại.
- Tên miền `digismartvn.com`: phí gia hạn hàng năm (giá tùy nhà cung cấp tên miền bạn mua).
- Google Analytics/Search Console: miễn phí hoàn toàn.

---

## 4. Bảo mật — những gì đã làm để an toàn

- **Chìa khóa bí mật (API key)** của Anthropic/Resend được giữ trên server (Vercel), **không bao giờ**
  xuất hiện trong code chạy ở trình duyệt khách — nếu lộ, người lạ có thể dùng chùa dịch vụ bằng tiền
  của bạn. (Bản chatbot gốc hồi đầu từng gọi thẳng từ trình duyệt — đã phát hiện và sửa.)
- **HTTPS/SSL**: toàn bộ kết nối tới web đều mã hóa (ổ khóa 🔒 trên trình duyệt) — ai chặn đường truyền
  cũng không đọc được nội dung.
- **Không thu thập thông tin nhạy cảm**: web không xin số thẻ ngân hàng/mật khẩu — chỉ xin tên + SĐT
  khi khách muốn được tư vấn, xem chi tiết ở trang Chính sách bảo mật.
- **Rate-limit chống spam**: chatbot và form đặt lịch có giới hạn số lần gửi liên tục, tránh bị spam phá web.
- **Từng phát hiện & chặn kịp thời**: 1 file chứa chìa khóa API thật từng được tạo ra trên máy tính cá
  nhân nhưng **chưa bao giờ bị đưa lên GitHub** — đã chặn vào danh sách "không bao giờ commit" ngay khi phát hiện.

---

## 5. Cách tự cập nhật nội dung (không cần biết code nhiều)

Chi tiết từng bước nằm ở cuối file `DigiSmart_TrangThai_Roadmap.md` (mục "Hướng dẫn tự cập nhật"). Tóm tắt:

1. **Đổi giá / thêm sản phẩm / sửa mô tả, bảo hành** → sửa file `data/products.ts` (và `data/warranty.ts`
   cho chính sách bảo hành).
2. **Đổi ảnh sản phẩm** → thêm file ảnh vào `public/images/products/`, trỏ đường dẫn trong `data/products.ts`.
3. **Thêm bài viết kiến thức** → thêm vào `data/kienthuc.ts`.
4. **Đổi banner/hero, thêm video YouTube** → sửa trực tiếp trong file trang tương ứng (`app/page.tsx`...).

Tất cả đều là **sửa file chữ thường (text file)** — ai biết gõ máy tính cẩn thận đều làm được, không
nhất thiết phải là lập trình viên. Việc cần lập trình viên thật sự: thêm 1 trang mới, đổi giao diện,
tích hợp thêm dịch vụ mới (cổng thanh toán, CMS...).

**Quy trình đưa thay đổi lên web thật (digismartvn.com):** sửa code → chạy thử ở máy cá nhân
(`npm run dev`) → nếu ổn thì `git push` lên nhánh chính (`master`) → Vercel tự nhận thay đổi và cập
nhật web thật trong ~1-2 phút. Không có bước "duyệt thủ công" ở giữa — đây là lý do roadmap luôn nhấn
mạnh: đổi gì lên `master` cũng cần chắc chắn trước, vì lên thẳng production ngay.

---

## 6. Rủi ro / điểm cần lưu ý hiện tại

1. **Không có "nút lùi lại" (rollback) tự động cho dữ liệu** — vì không dùng database, không có migration
   history. Nếu sửa nhầm giá/thông tin, phải tự sửa lại bằng tay hoặc nhờ Claude/dev tìm lại bản cũ qua git.
2. **Resend đang ở chế độ test** — email đặt lịch chỉ về được 1 địa chỉ (`digismart606@gmail.com`). Nếu
   địa chỉ đó có sự cố (đầy hộp thư, mất tài khoản), **sẽ không nhận được đơn đặt lịch nào** cho tới khi
   verify domain riêng trên Resend.
3. **Một số link mạng xã hội/sàn TMĐT (Shopee, Facebook, TikTok) vẫn sai/placeholder** — khách bấm vào
   có thể ra trang không tồn tại, ảnh hưởng uy tín.
4. **Không có CMS** — mọi thay đổi nội dung đều cần sửa code + deploy lại, không có màn hình quản trị
   độc lập cho nhân viên không biết code tự thao tác.
5. **Phụ thuộc hạ tầng Google Drive để đồng bộ code nhiều máy** — cách làm hiện tại (sửa trên Google
   Drive rồi copy sang ổ C: để chạy) có thể gây nhầm lẫn phiên bản giữa các máy nếu không robocopy đúng
   lúc (xem roadmap, "Giai đoạn 1.5" vẫn chưa xử lý dứt điểm).
6. **Chi phí Anthropic API tăng theo lượng khách chat** — nếu traffic tăng đột biến (ví dụ chạy ads), nên
   theo dõi usage trên console.anthropic.com để tránh bất ngờ về chi phí.

---

## 7. Thuật ngữ cần biết (để nói chuyện với dev không bị "lạc trôi")

| Thuật ngữ | Hiểu nôm na |
|---|---|
| **Frontend** | Phần khách nhìn thấy, bấm vào — giao diện |
| **Backend / API** | Phần xử lý phía sau, khách không nhìn thấy trực tiếp |
| **Database** | Kho dữ liệu có cấu trúc (ở đây web KHÔNG dùng loại này cho sản phẩm) |
| **Hosting** | Nơi "thuê chỗ" cho web chạy 24/7 (ở đây là Vercel) |
| **Deploy** | Hành động "đẩy" code mới lên cho web thật chạy theo |
| **Domain (tên miền)** | Địa chỉ web, ví dụ digismartvn.com |
| **SSL/HTTPS** | Lớp mã hóa bảo vệ đường truyền — biểu tượng ổ khóa trên trình duyệt |
| **API key** | "Chìa khóa" bí mật để gọi 1 dịch vụ bên ngoài (vd Anthropic, Resend) — không được lộ ra ngoài |
| **Git / repository (repo)** | Hệ thống lưu lịch sử thay đổi code — mỗi lần sửa code là 1 "commit", gộp lại thành lịch sử |
| **Branch (nhánh)** | 1 "bản nháp" code tách riêng để thử nghiệm, không ảnh hưởng bản chính (`master`) cho tới khi merge |
| **Merge** | Gộp 1 nhánh nháp vào nhánh chính |
| **Push** | Đẩy code từ máy cá nhân lên kho lưu trữ chung (GitHub) |
| **SEO** | Tối ưu để Google xếp hạng web cao hơn trong kết quả tìm kiếm |
| **GEO** (Generative Engine Optimization) | Tối ưu để ChatGPT/Gemini/Perplexity... trích dẫn/giới thiệu đúng thông tin web khi người dùng hỏi AI |
| **Schema.org / JSON-LD** | Đoạn dữ liệu "giấu" trong trang để Google/AI hiểu đúng đây là sản phẩm gì, giá bao nhiêu |
| **Cron job** | Việc tự động chạy định kỳ (vd: mỗi tuần 1 lần), không cần người bấm tay |
| **CMS** | Hệ thống quản trị nội dung có màn hình nhập liệu, cho người không biết code tự sửa nội dung web |

---

## 8. Lộ trình tiếp theo (tóm tắt — chi tiết đầy đủ xem `DigiSmart_TrangThai_Roadmap.md`)

- ✅ Giai đoạn 1 (Brand/content + chatbot): đã xong phần lớn.
- ⚠️ Giai đoạn 1.5 (ổn định quy trình dev nhiều máy): mới xong 1 phần.
- ✅ Giai đoạn 2 (giỏ hàng + đặt lịch lắp đặt): đã xong, đang chạy thật.
- ⏳ Giai đoạn 3 (cổng thanh toán online — tuỳ chọn): chưa làm, chỉ cần khi muốn thu tiền cọc online.
- ⏳ Giai đoạn 4 (CMS cho người không biết code tự nhập liệu): chưa làm, chỉ làm khi tần suất đổi nội
  dung tăng cao đủ để đáng công sức.

---

## Cách dùng 2 file song song

- **File này (`DigiSmart_MasterPlan.md`)**: đọc khi cần hiểu *bức tranh tổng thể* — kiến trúc, bảo mật,
  chi phí, rủi ro — hoặc khi cần trao đổi với 1 dev/freelancer khác về dự án. Ít khi cần sửa.
- **`DigiSmart_TrangThai_Roadmap.md`**: đọc/cập nhật *mỗi buổi làm việc* — việc gì xong, việc gì đang
  chặn, chi tiết kỹ thuật theo từng ngày.
