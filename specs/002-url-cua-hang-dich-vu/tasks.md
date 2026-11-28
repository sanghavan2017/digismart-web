# Tasks: Tách 2 cổng "Cửa hàng" / "Dịch vụ" theo cấu trúc URL mới

**Input**: Design documents from `specs/002-url-cua-hang-dich-vu/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md (đã có đủ)

**Tests**: Repo này chưa có bộ test tự động (xem constitution) — không sinh task viết
test. Việc xác minh dùng `npm run build && npm run lint` + các kịch bản thủ công trong
`quickstart.md`.

**Organization**: Task nhóm theo user story (US1–US6, khớp `spec.md`) để có thể làm và
kiểm tra độc lập từng phần.

## Format: `[ID] [P?] [Story] Description`

---

## Phase 1: Setup

**Mục đích**: Chuẩn bị cấu hình/khung trước khi bắt tay làm từng user story.

- [x] T001 Tạo `data/categories.ts` — mảng cấu hình danh mục Cửa hàng (`slug`, `label`,
  `productCategory`, `description`), hiện chỉ 1 bản ghi `"may-loc-nuoc"` (theo
  `data-model.md` mục 1).
- [x] T002 [P] Tạo khung thư mục route `app/cua-hang/` và `app/dich-vu/` (file
  `page.tsx` placeholder tối thiểu mỗi thư mục) để các task sau điền nội dung.

---

## Phase 2: Foundational (Blocking Prerequisites)

**⚠️ CRITICAL**: Phải xong trước khi bắt đầu bất kỳ user story nào.

- [x] T003 Thêm hàm `redirects()` vào `next.config.ts`: `/may-loc-nuoc` →
  `/cua-hang/may-loc-nuoc`, `/may-loc-nuoc/cleansui` →
  `/cua-hang/may-loc-nuoc/cleansui`, `/dieu-hoa` → `/dich-vu/dieu-hoa`, cả 3 đều
  `permanent: true` (data-model.md mục 2).
- [x] T004 [P] Tạo `components/TrustBadgeBar.tsx` — dải cam kết (chính hãng/bảo
  hành/hỗ trợ lắp đặt...), dùng chung cho nhiều trang (FR-011).
- [x] T005 [P] Tạo `components/PromoCampaignBlock.tsx` — khối khuyến mãi theo chiến
  dịch, tự ẩn khi không có campaign nào được cấu hình đang chạy (FR-011).

**Checkpoint**: Redirect + 2 component chia sẻ sẵn sàng — có thể bắt đầu các user story.

---

## Phase 3: User Story 1 - Link cũ vẫn vào đúng nội dung (Priority: P1) 🎯 MVP

**Goal**: Mọi URL cũ (`/may-loc-nuoc`, `/dieu-hoa`, `/may-loc-nuoc/cleansui`...) tự
chuyển hướng đúng, không ai gặp trang lỗi; mọi link nội bộ (nav, breadcrumb, sitemap)
trỏ đúng URL mới.

**Independent Test**: Kịch bản 2 trong `quickstart.md` — mở từng URL cũ, xác nhận
chuyển hướng 308 đúng đích, không lỗi.

### Implementation for User Story 1

- [x] T006 [US1] Di chuyển nội dung `app/may-loc-nuoc/page.tsx` sang
  `app/cua-hang/[category]/page.tsx`, dùng `data/categories.ts` (T001) để lọc sản
  phẩm theo `productCategory` — giữ nguyên toàn bộ phần đã có (mua ngay, thêm giỏ,
  badge giảm giá, "Tiết kiệm Xđ").
- [x] T007 [US1] Di chuyển `app/may-loc-nuoc/cleansui/page.tsx` sang
  `app/cua-hang/may-loc-nuoc/cleansui/page.tsx`, sửa link nội bộ trỏ tới trang này.
- [x] T008 [US1] Di chuyển nội dung `app/dieu-hoa/page.tsx` sang
  `app/dich-vu/dieu-hoa/page.tsx`.
- [x] T009 [US1] Xoá thư mục route cũ `app/may-loc-nuoc/` và `app/dieu-hoa/` sau khi
  xác nhận T006–T008 đã chuyển đủ nội dung (URL cũ đã có redirect ở T003 xử lý).
- [x] T010 [US1] Sửa `app/sitemap.ts`: bỏ `/may-loc-nuoc`, `/dieu-hoa`; thêm
  `/cua-hang`, `/cua-hang/may-loc-nuoc`, `/dich-vu`, `/dich-vu/dieu-hoa`.
- [x] T011 [P] [US1] Sửa link trong `components/Navbar.tsx` (desktop + mobile) trỏ
  sang URL mới.
- [x] T012 [P] [US1] Sửa link các node trong `components/SolutionDiagram.tsx` (sơ đồ
  hệ sinh thái ở trang chủ) trỏ sang URL mới.
- [x] T013 [P] [US1] Sửa field `relatedCategory` của 9 bài viết trong
  `data/kienthuc.ts` (5 bài điều hòa → `/dich-vu/dieu-hoa`, 4 bài nước →
  `/cua-hang/may-loc-nuoc`).
- [x] T014 [US1] Sửa breadcrumb JSON-LD + link "quay lại danh mục"/"xem thêm sản phẩm
  cùng loại" trong `app/san-pham/[id]/page.tsx` trỏ đúng theo category của từng sản
  phẩm.
- [x] T015 [US1] Rà soát + sửa mọi link còn trỏ URL cũ trong `components/CartPage.tsx`,
  `components/BuyNowButton.tsx`, `components/MayLocNuocProductList.tsx`,
  `components/Footer.tsx` (xem research.md R5 — các file này dùng biến/props nên
  không khớp grep chuỗi cứng, cần đọc code trực tiếp).
- [x] T016 [US1] Chạy Kịch bản 2 trong `quickstart.md` trên dev server.

**Checkpoint**: User Story 1 hoàn chỉnh, test độc lập được — mọi URL cũ đã an toàn.

---

## Phase 4: User Story 2 - Trang chủ chọn cổng (Priority: P1)

**Goal**: Trang chủ trở thành màn hình chọn "Cửa hàng" hoặc "Dịch vụ", mỗi cổng có
trang chủ riêng.

**Independent Test**: Kịch bản 1 trong `quickstart.md`.

### Implementation for User Story 2

- [x] T017 [US2] Viết lại `app/page.tsx` thành màn hình chọn cổng — 2 lựa chọn "Cửa
  hàng"/"Dịch vụ" thấy ngay không cần cuộn, mỗi bên có mô tả ngắn dẫn tới gì.
- [x] T018 [US2] Viết `app/dich-vu/page.tsx` (hub Dịch vụ — dẫn tới Điều hòa, Về
  chúng tôi, Kiến thức, Liên hệ — theo research.md R6).
- [x] T019 [US2] Viết `app/cua-hang/page.tsx` (trang chủ Cửa hàng — hero + dẫn nổi
  bật tới `/cua-hang/may-loc-nuoc`, chỗ hiển thị sẵn sàng mở rộng thêm danh mục sau
  này theo research.md R4).
- [x] T020 [US2] Chạy Kịch bản 1 trong `quickstart.md`.
- [x] T020b [US2] *(Bổ sung sau khi rà lại — sót khi sinh tasks lần đầu)* Viết lại nội
  dung `app/san-pham/page.tsx` thành "mục lục dẫn 2 cổng" theo đúng quyết định R3 trong
  `research.md` (hiện trang này vẫn giữ y nguyên lưới lọc trộn cả Điều hòa + Máy lọc
  nước như trước khi tách 2 cổng — không sai, nhưng chưa khớp tinh thần feature).

**Checkpoint**: US1 + US2 xong — nền tảng URL/điều hướng 2 cổng chạy hoàn chỉnh, có
thể demo/deploy riêng phần này nếu cần (MVP).

---

## Phase 5: User Story 3 - Lọc/sắp xếp danh mục Cửa hàng (Priority: P2)

**Goal**: Trang danh mục Cửa hàng có lọc theo thương hiệu/giá/tồn kho + sắp xếp giá,
cộng thêm trust bar + chỗ cho khối khuyến mãi.

**Independent Test**: Kịch bản 4 trong `quickstart.md`.

### Implementation for User Story 3

- [x] T021 [US3] Thêm lọc theo thương hiệu + khoảng giá + tình trạng còn hàng vào
  `app/cua-hang/[category]/page.tsx` (mở rộng từ `components/MayLocNuocProductList.tsx`
  đang có sẵn sort theo giá).
- [x] T022 [US3] Mở rộng dropdown sắp xếp hiện có để kết hợp đúng với bộ lọc mới
  (T021) — không phá vỡ hành vi sort đang chạy.
- [x] T023 [P] [US3] Gắn `TrustBadgeBar` (T004) vào `app/cua-hang/[category]/page.tsx`.
- [x] T024 [P] [US3] Gắn `PromoCampaignBlock` (T005) vào
  `app/cua-hang/[category]/page.tsx`.
- [x] T025 [US3] Chạy Kịch bản 4 trong `quickstart.md`.

---

## Phase 6: User Story 4 - PDP mới vẫn mua được bình thường (Priority: P2)

**Goal**: Trang chi tiết sản phẩm có thêm trust bar kiểu eguru, mọi chức năng mua
hàng/FAQ/specs hiện có không bị ảnh hưởng bởi việc đổi routing.

**Independent Test**: Kịch bản 3 + Kịch bản 5 (bước 1) trong `quickstart.md`.

### Implementation for User Story 4

- [x] T026 [US4] Gắn `TrustBadgeBar` (T004) vào `app/san-pham/[id]/page.tsx`.
- [x] T027 [US4] Rà soát `app/san-pham/[id]/page.tsx` xác nhận đầy đủ: gallery ảnh,
  giá/badge giảm giá, "Mua ngay"/"Thêm vào giỏ", specs/bảo hành, FAQ — không bị ảnh
  hưởng bởi T006–T014.
- [x] T028 [US4] Chạy Kịch bản 3 + Kịch bản 5 (bước 1) trong `quickstart.md`.

---

## Phase 7: User Story 5 - Điều hòa trong nhánh Dịch vụ (Priority: P3)

**Goal**: Điều hòa hoạt động đầy đủ dưới `/dich-vu/dieu-hoa`, cách mua/đặt lịch không
đổi so với trước.

**Independent Test**: Kịch bản 5 (bước 2, 3) trong `quickstart.md`.

### Implementation for User Story 5

- [x] T029 [US5] Gắn `TrustBadgeBar` + `PromoCampaignBlock` vào
  `app/dich-vu/dieu-hoa/page.tsx`.
- [x] T030 [US5] Rà soát `app/dich-vu/dieu-hoa/page.tsx` xác nhận nút "Mua ngay" +
  luồng "Đặt lịch tư vấn trước" hoạt động đúng như trước khi đổi URL (không đổi logic
  `app/api/orders/route.ts`/`app/api/lead/route.ts`).
- [x] T031 [US5] Chạy Kịch bản 5 (bước 2, 3) trong `quickstart.md`.

---

## Phase 8: User Story 6 - Đánh giá sản phẩm (Priority: P2)

**Goal**: Khách gửi được đánh giá sao + nhận xét, hiển thị sau khi DigiSmart duyệt,
có trang quản trị duyệt riêng.

**Independent Test**: Kịch bản 7 trong `quickstart.md`.

### Implementation for User Story 6

- [ ] T032 [US6] ⚠️ **ĐIỂM DỪNG CHỜ DUYỆT**: trình SQL tạo bảng `product_reviews`
  (data-model.md mục 3) cho chủ dự án xác nhận TRƯỚC KHI chạy migration trên Supabase
  project `digismart-web-shop` (theo quy tắc CLAUDE.md về thay đổi schema).
- [x] T033 [US6] Sau khi T032 được xác nhận và chạy xong: thêm hàm tạo/đọc đánh giá +
  duyệt/từ chối + tính rating trung bình vào `lib/supabase.ts`.
- [x] T034 [US6] Tạo `app/api/reviews/route.ts`: POST nhận đánh giá mới (mặc định
  `status = "pending"`, rate-limit theo IP qua `lib/kv.ts`, escape nội dung như
  `app/api/lead/route.ts` đang làm), GET trả đánh giá đã duyệt + rating trung bình
  theo `product_slug`.
- [x] T035 [US6] Tạo `app/api/admin-reviews/route.ts`: GET danh sách đánh giá chờ
  duyệt, POST duyệt/từ chối — bảo vệ bằng `ORDERS_ADMIN_PASSWORD` (cùng cơ chế
  `app/api/admin-orders/route.ts` đang dùng).
- [x] T036 [P] [US6] Tạo `components/RatingStars.tsx` (hiển thị số sao + chế độ chọn
  sao khi gửi đánh giá).
- [x] T037 [P] [US6] Tạo `components/ReviewForm.tsx` (form: chọn sao, nhận xét, tên,
  gửi qua `app/api/reviews/route.ts`).
- [x] T038 [P] [US6] Tạo `components/ReviewList.tsx` (danh sách đánh giá đã duyệt +
  rating trung bình; hiện rõ trạng thái "chưa có đánh giá" khi rỗng).
- [x] T039 [US6] Gắn `ReviewList` + `ReviewForm` vào `app/san-pham/[id]/page.tsx`
  (phụ thuộc T036–T038).
- [x] T040 [US6] Gắn hiển thị rating trung bình (`RatingStars`) lên thẻ sản phẩm ở
  `components/MayLocNuocProductList.tsx` và `app/dich-vu/dieu-hoa/page.tsx`.
- [x] T041 [US6] Tạo `app/quan-ly-danh-gia/page.tsx` (trang nội bộ `noindex`, bảo vệ
  mật khẩu `ORDERS_ADMIN_PASSWORD`, duyệt/từ chối đánh giá — theo mẫu
  `app/quan-ly-don-hang/page.tsx` + `components/OrdersAdminClient.tsx`).
- [ ] T042 [US6] Chạy Kịch bản 7 trong `quickstart.md` — **CHƯA test được đầy đủ**: đã
  xác nhận giao diện đúng (form, trạng thái "chưa có đánh giá", thông báo lỗi khi gửi
  không bị crash) nhưng luồng thật (gửi → duyệt → hiển thị công khai) cần bảng
  `product_reviews` tồn tại trước — chờ T032.

> **T033–T041 đã VIẾT XONG CODE nhưng CHƯA CHẠY ĐƯỢC THẬT** — mọi API liên quan đến
> `product_reviews` hiện trả lỗi 500 ("relation does not exist") vì bảng chưa tồn tại.
> Giao diện đã xác nhận không bị crash khi API lỗi (ReviewList/ReviewForm xử lý lỗi
> đúng cách). Chỉ chạy thật được sau khi T032 được duyệt và SQL được áp dụng.

---

## Phase 9: Polish & Cross-Cutting Concerns

- [ ] T043 Nộp lại sitemap mới cho Google Search Console (thao tác thủ công của chủ
  dự án trên GSC — nhắc trong báo cáo hoàn thành, không tự làm được — **cần bạn tự làm**).
- [x] T044 Cập nhật `DigiSmart_TrangThai_Roadmap.md` ghi nhận feature 002 đã hoàn
  thành + link tới `specs/002-url-cua-hang-dich-vu/`.
- [x] T045 Chạy `npm run build && npm run lint` — phải 0 lỗi (Nguyên tắc V). **Đạt.**
- [x] T046 Chạy lại các kịch bản 1, 2, 3, 4, 6 trong `quickstart.md` trên dev server —
  đều PASS. Kịch bản 5 (đặt đơn thật) **không chạy lại** ở lượt này vì logic
  giỏ hàng/thanh toán không bị đụng tới trong US3-US6 (chỉ thêm trust bar/đánh giá),
  đã verify kỹ ở lượt MVP trước đó. Kịch bản 7 — xem ghi chú T042.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Không phụ thuộc gì — làm trước tiên.
- **Foundational (Phase 2)**: Phụ thuộc Setup — BẮT BUỘC xong trước mọi user story.
- **US1 (Phase 3)**: Phụ thuộc Foundational. Là nền tảng — US2–US6 đều dựa vào các
  route mới mà US1 tạo ra (`/cua-hang/...`, `/dich-vu/...`).
- **US2 (Phase 4)**: Phụ thuộc US1 (cần `/cua-hang`, `/dich-vu` đã tồn tại để link tới).
- **US3 (Phase 5)**: Phụ thuộc US1 (sửa trên `app/cua-hang/[category]/page.tsx` do US1 tạo).
- **US4 (Phase 6)**: Phụ thuộc Foundational (T004) — có thể làm song song với US2/US3/US5.
- **US5 (Phase 7)**: Phụ thuộc US1 (sửa trên `app/dich-vu/dieu-hoa/page.tsx` do US1 tạo).
- **US6 (Phase 8)**: Phụ thuộc Foundational — có thể làm song song với US2/US3/US4/US5
  (không đụng file chung), nhưng T032 (xin duyệt schema) nên xin sớm vì có thể mất
  thời gian chờ.
- **Polish (Phase 9)**: Sau khi các user story cần làm đã xong.

### Parallel Opportunities

- T004, T005 (Phase 2) làm song song.
- T011, T012, T013 (Phase 3) làm song song — khác file nhau.
- T023, T024 (Phase 5) làm song song.
- T036, T037, T038 (Phase 8) làm song song — khác file nhau.
- Sau khi US1 xong: US3, US4, US5, US6 có thể làm song song nếu có nhiều người/nhiều
  phiên làm việc (khác file, không phụ thuộc nhau).

---

## Implementation Strategy

### MVP trước (US1 + US2)

1. Setup (Phase 1) → Foundational (Phase 2).
2. US1 (Phase 3) — nền tảng redirect + di chuyển nội dung.
3. US2 (Phase 4) — trang chủ chọn cổng.
4. **DỪNG lại kiểm tra**: chạy Kịch bản 1 + 2 + 3 trong `quickstart.md`, xác nhận ổn
   trước khi làm tiếp — đây là lúc có thể demo/xin duyệt merge riêng phần MVP nếu
   muốn, trước khi làm US3–US6.

### Làm tiếp theo tăng dần

5. US3 (lọc/sắp xếp) → US4 (PDP) → US5 (Điều hòa) — có thể làm song song.
6. US6 (đánh giá) — xin duyệt schema (T032) sớm, làm song song với US3–US5.
7. Polish (Phase 9) — build/lint/QA toàn bộ + nhắc nộp lại sitemap GSC.

---

## Notes

- Không có task viết test tự động (repo chưa có bộ test) — xác minh bằng
  `npm run build && npm run lint` + `quickstart.md`.
- T032 là điểm dừng bắt buộc chờ xác nhận — không tự chạy SQL trước khi chủ dự án
  đồng ý, đúng quy tắc CLAUDE.md.
- Sau mỗi Phase, nên commit riêng (theo đúng cách đã làm ở các feature trước — mỗi
  thay đổi logic 1 commit rõ nghĩa) để dễ theo dõi/rollback nếu cần.
- Việc merge vào `master` vẫn là hành động riêng, chờ xác nhận của chủ dự án — không
  tự động theo Nguyên tắc IV.
