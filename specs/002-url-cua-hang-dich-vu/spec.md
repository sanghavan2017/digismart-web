# Feature Specification: Tách 2 cổng "Cửa hàng" / "Dịch vụ" theo cấu trúc URL mới

**Feature Branch**: `002-url-cua-hang-dich-vu`

**Created**: 2026-11-28

**Status**: Draft

**Input**: User description: "Đổi cấu trúc URL website DigiSmart theo bản thiết kế 'redesign theo eGuru' (xem specs/2026-11-27-redesign-theo-eguru.md mục 7.1): tách website thành 2 nhánh URL riêng — '/cua-hang' (mua sắm: Máy lọc nước Cleansui/Kitz, trang danh mục có filter brand/giá/tồn kho + sort, trang chi tiết sản phẩm kiểu eguru) và '/dich-vu' (Điều hòa + khảo sát/lắp đặt, Về chúng tôi, Kiến thức, Liên hệ — giữ flow đặt lịch như hiện tại). Trang chủ '/' trở thành landing chọn 1 trong 2 cổng. Vì các URL hiện tại (/may-loc-nuoc, /dieu-hoa, /san-pham/[id]...) đã được Google Search Console index, bắt buộc phải có redirect 301 từ URL cũ sang URL mới và cập nhật lại sitemap.xml + mọi schema JSON-LD đang trỏ URL cũ, để không mất thứ hạng SEO đã xây. Người dùng đã xác nhận chọn đổi hẳn URL (không giữ phương án giữ URL cũ)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Khách bấm link cũ (đã lưu/đã chia sẻ/từ Google) vẫn vào đúng nội dung (Priority: P1)

Khách từng lưu, chia sẻ, hoặc tìm thấy trên Google một link cũ của website (ví dụ trang danh mục máy lọc nước, trang chi tiết một sản phẩm điều hòa, hoặc trang giỏ hàng). Sau khi website đổi cấu trúc URL, khách bấm vào link cũ đó vẫn phải được dẫn thẳng tới đúng nội dung tương ứng ở địa chỉ mới, không gặp trang lỗi.

**Why this priority**: Đây là rủi ro lớn nhất của việc đổi URL — nếu làm sai, website mất toàn bộ thứ hạng tìm kiếm đã xây (nhiều tháng SEO) và khách cũ bấm link hỏng. Phải làm đúng trước khi làm bất kỳ việc gì khác.

**Independent Test**: Lấy danh sách toàn bộ URL hiện đang có (trang chủ, `/may-loc-nuoc`, `/dieu-hoa`, từng `/san-pham/[id]` của 86 sản phẩm, `/gio-hang`, `/ve-chung-toi`, `/kien-thuc`, `/kien-thuc/[slug]`, `/lien-he`), mở từng URL sau khi deploy — mỗi URL phải chuyển hướng (không phải báo lỗi) tới đúng trang tương ứng ở cấu trúc mới.

**Acceptance Scenarios**:

1. **Given** khách mở URL cũ `/may-loc-nuoc`, **When** trang tải xong, **Then** khách được chuyển tới trang danh mục Máy lọc nước ở địa chỉ mới và thấy đúng nội dung (không phải trang trắng/404).
2. **Given** khách mở URL cũ `/san-pham/cleansui-eu301`, **When** trang tải xong, **Then** khách thấy đúng trang chi tiết sản phẩm Cleansui EU301 ở địa chỉ mới.
3. **Given** khách mở URL cũ `/dieu-hoa`, **When** trang tải xong, **Then** khách được chuyển tới trang Điều hòa trong nhánh Dịch vụ.
4. **Given** Googlebot thu thập lại một URL cũ đã index, **When** Google nhận phản hồi, **Then** Google nhận được mã chuyển hướng vĩnh viễn (không phải lỗi hoặc chuyển hướng tạm), để chuyển thứ hạng sang URL mới.

---

### User Story 2 - Khách vào trang chủ, chọn đúng cổng cần vào (Priority: P1)

Khách mới vào website lần đầu (chưa có link cụ thể) cần nhìn trang chủ và hiểu ngay: muốn mua máy lọc nước thì bấm vào đâu, muốn tìm hiểu/đặt lịch lắp điều hòa thì bấm vào đâu — giống cách eguru.vn tách "eGURU Store" và "eGURU Services" ngay từ đầu.

**Why this priority**: Đây là mục tiêu chính của việc tách 2 cổng — nếu trang chủ không rõ, mọi URL mới phía sau cũng không ích gì vì khách không tìm thấy đường vào.

**Independent Test**: Mở trang chủ trên cả desktop và điện thoại, không đọc tài liệu hướng dẫn, xác định được trong vài giây nên bấm vào đâu để mua máy lọc nước, và vào đâu để xem/đặt lịch điều hòa.

**Acceptance Scenarios**:

1. **Given** khách mở trang chủ, **When** khách nhìn vào màn hình đầu tiên (không cuộn), **Then** khách thấy rõ 2 lựa chọn: vào "Cửa hàng" hoặc vào "Dịch vụ", kèm mô tả ngắn mỗi bên dẫn tới gì.
2. **Given** khách bấm "Cửa hàng", **When** trang tải xong, **Then** khách thấy danh mục Máy lọc nước (Cleansui/Kitz) tại địa chỉ nhánh `/cua-hang`.
3. **Given** khách bấm "Dịch vụ", **When** trang tải xong, **Then** khách thấy nội dung Điều hòa + Về chúng tôi + Kiến thức + Liên hệ tại nhánh `/dich-vu`.

---

### User Story 3 - Khách lọc/sắp xếp sản phẩm trong Cửa hàng để tìm nhanh hơn (Priority: P2)

Trong nhánh "Cửa hàng", khách muốn thu hẹp danh sách sản phẩm theo thương hiệu, khoảng giá, tình trạng còn hàng, và sắp xếp theo giá — giống trải nghiệm trang danh mục của eguru.vn — thay vì phải cuộn qua toàn bộ danh sách.

**Why this priority**: Cải thiện trải nghiệm tìm sản phẩm, nhưng không chặn việc đổi URL (User Story 1, 2) — có thể làm sau khi nền tảng URL mới đã chạy ổn.

**Independent Test**: Vào trang danh mục Cửa hàng, áp 1 bộ lọc (ví dụ chỉ hiện Kitz) và 1 cách sắp xếp (giá thấp→cao) — danh sách sản phẩm hiển thị phải đúng với lựa chọn đó.

**Acceptance Scenarios**:

1. **Given** khách đang xem toàn bộ sản phẩm trong Cửa hàng, **When** khách chọn lọc theo 1 thương hiệu, **Then** danh sách chỉ còn sản phẩm của thương hiệu đó.
2. **Given** khách đang xem danh sách đã lọc, **When** khách chọn sắp xếp "Giá thấp đến cao", **Then** danh sách hiển thị đúng thứ tự giá tăng dần.
3. **Given** khách lọc theo khoảng giá hoặc tình trạng còn hàng, **When** không có sản phẩm nào khớp, **Then** trang hiển thị thông báo rõ ràng (không phải màn hình trắng) và gợi ý bỏ bớt điều kiện lọc.

---

### User Story 4 - Khách xem trang chi tiết sản phẩm mới trong Cửa hàng vẫn mua được bình thường (Priority: P2)

Trang chi tiết sản phẩm trong nhánh Cửa hàng được nâng cấp theo kiểu eguru (gallery ảnh, giá/badge giảm giá, nút "Mua ngay"/"Thêm vào giỏ"...) nhưng toàn bộ chức năng mua hàng đã có (giỏ hàng, thanh toán COD/chuyển khoản, FAQ sản phẩm) phải tiếp tục hoạt động đúng như trước.

**Why this priority**: Nâng cấp giao diện, không phải chức năng lõi — làm sau khi URL + điều hướng 2 cổng (P1) đã ổn.

**Independent Test**: Từ trang chi tiết sản phẩm mới, bấm "Mua ngay" → đi qua checkout → đặt 1 đơn test → xác nhận đơn ghi đúng vào hệ thống như luồng hiện tại, không có bước nào bị gãy.

**Acceptance Scenarios**:

1. **Given** khách đang xem trang chi tiết 1 sản phẩm máy lọc nước ở địa chỉ mới, **When** khách bấm "Thêm vào giỏ", **Then** sản phẩm được thêm vào giỏ hàng giống hành vi hiện tại.
2. **Given** khách đang xem trang chi tiết sản phẩm, **When** khách cuộn xuống, **Then** khách vẫn thấy đầy đủ specs, bảo hành, và mục FAQ đã có.

---

### User Story 5 - Điều hòa chuyển hẳn vào nhánh Dịch vụ, giữ nguyên cách mua/đặt lịch (Priority: P3)

Toàn bộ nội dung Điều hòa (danh mục, trang chi tiết, mua thẳng, đặt lịch khảo sát) chuyển vào nhánh `/dich-vu`, nhưng cách khách mua hàng hoặc đặt lịch không đổi so với hiện tại.

**Why this priority**: Chủ yếu là đổi vị trí (namespace), rủi ro thấp nhất vì logic nghiệp vụ không đổi — làm sau cùng khi các phần quan trọng hơn đã xong.

**Independent Test**: Từ nhánh Dịch vụ, vào danh mục Điều hòa, chọn mua thẳng 1 sản phẩm hoặc đặt lịch tư vấn — cả 2 luồng phải hoạt động giống hệt trước khi đổi URL.

**Acceptance Scenarios**:

1. **Given** khách vào nhánh Dịch vụ, **When** khách chọn Điều hòa, **Then** khách thấy đúng danh mục 68 sản phẩm điều hòa hiện có.
2. **Given** khách chọn mua thẳng 1 điều hòa, **When** khách hoàn tất checkout, **Then** đơn hàng vẫn ghi nhận đúng và vẫn có cảnh báo cần khảo sát lắp đặt như hiện tại.

### User Story 6 - Khách xem đánh giá sản phẩm và có thể gửi đánh giá của mình (Priority: P2)

Trên trang chi tiết sản phẩm (và trên thẻ sản phẩm ở trang danh mục), khách thấy số sao
đánh giá trung bình và danh sách nhận xét của khách khác — giống mục đánh giá (review)
của eguru.vn — và có thể tự gửi đánh giá (số sao + nhận xét) cho sản phẩm mình quan tâm.

**Why this priority**: Đây là mảng nội dung mới (chưa từng có trên web), cần có trước khi
công bố "giống eguru" đầy đủ, nhưng không chặn việc đổi URL (P1) — có thể làm song song
hoặc ngay sau khi nền tảng URL mới chạy ổn.

**Independent Test**: Vào 1 trang chi tiết sản phẩm, gửi 1 đánh giá (chọn số sao + viết
nhận xét) — sau khi được duyệt, đánh giá đó hiển thị đúng trên trang, và điểm trung bình
của sản phẩm cập nhật đúng theo đánh giá mới.

**Acceptance Scenarios**:

1. **Given** khách đang xem trang chi tiết sản phẩm, **When** khách cuộn tới mục đánh giá,
   **Then** khách thấy số sao trung bình + số lượng đánh giá + danh sách nhận xét đã có
   (nếu có).
2. **Given** khách muốn chia sẻ trải nghiệm, **When** khách điền số sao + nhận xét + tên
   và gửi, **Then** hệ thống ghi nhận đánh giá đó và báo cho khách biết đánh giá đang chờ
   duyệt trước khi hiển thị công khai (chống đánh giá rác/giả vì web chưa có hệ thống xác
   minh đã mua hàng).
3. **Given** 1 đánh giá đã được duyệt hiển thị công khai, **When** khách khác xem trang
   danh mục, **Then** thẻ sản phẩm đó hiện đúng số sao trung bình đã tính lại.
4. **Given** khách gửi đánh giá liên tục nhiều lần trong thời gian ngắn (spam), **When**
   hệ thống phát hiện vượt giới hạn, **Then** yêu cầu gửi tiếp bị chặn tạm thời, giống cơ
   chế chống spam đang áp dụng cho form đặt lịch/chatbot.

### Edge Cases

- Khách có giỏ hàng đã lưu (localStorage) từ trước khi website đổi URL — giỏ hàng không được mất, vì dữ liệu nằm ở máy khách, không gắn với URL cụ thể.
- Sản phẩm chưa có đánh giá nào — trang chi tiết phải hiện trạng thái "chưa có đánh giá, hãy là người đầu tiên", không hiện số sao giả hoặc 0 sao gây hiểu nhầm là đánh giá kém.
- Đánh giá có nội dung không phù hợp (ngôn từ xấu, spam link...) — người duyệt (DigiSmart) phải từ chối được, không cho hiển thị công khai.
- Khách mở 1 link cũ đã chia sẻ trên Zalo/Facebook có kèm ảnh xem trước (rich preview) — ảnh xem trước cũ do mạng xã hội lưu cache có thể hiển thị tạm, đây không phải lỗi của website.
- Một URL cũ không còn tồn tại khái niệm tương đương ở cấu trúc mới (nếu có) — phải chuyển về trang gần nhất hợp lý (ví dụ trang danh mục cha) thay vì để lỗi 404 trần.
- Trong lúc Google đang thu thập lại dữ liệu sau khi đổi URL, có thể tạm thời xuất hiện cả URL cũ và URL mới trong kết quả tìm kiếm — đây là hiện tượng chuyển tiếp bình thường, không phải lỗi, sẽ ổn định sau một thời gian.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Website MUST cung cấp 2 nhánh URL riêng biệt: một nhánh cho mua sắm ("Cửa hàng") và một nhánh cho dịch vụ/giới thiệu công ty ("Dịch vụ").
- **FR-002**: Trang chủ ("/") MUST trở thành trang chọn cổng, cho khách chọn vào nhánh Cửa hàng hoặc nhánh Dịch vụ ngay từ màn hình đầu tiên.
- **FR-003**: Mọi URL hiện tại đã tồn tại trước khi đổi cấu trúc (bao gồm nhưng không giới hạn: trang danh mục máy lọc nước, trang danh mục điều hòa, toàn bộ trang chi tiết của 86 sản phẩm, trang giỏ hàng, trang về chúng tôi, trang kiến thức và từng bài viết, trang liên hệ) MUST tự động chuyển hướng vĩnh viễn sang đúng URL tương ứng ở cấu trúc mới — không được trả về lỗi "không tìm thấy trang".
- **FR-004**: Sơ đồ trang (sitemap.xml) khai báo cho công cụ tìm kiếm MUST chỉ chứa các URL mới, không chứa URL cũ đã chuyển hướng.
- **FR-005**: Mọi dữ liệu có cấu trúc (structured data/schema) nhúng trong trang — thông tin sản phẩm, đường dẫn điều hướng (breadcrumb), thông tin tổ chức — MUST tham chiếu đúng URL mới, không còn trỏ về URL cũ.
- **FR-006**: Trang danh mục trong nhánh Cửa hàng MUST cho khách lọc sản phẩm theo thương hiệu, theo khoảng giá, theo tình trạng còn hàng, và sắp xếp theo giá (thấp→cao, cao→thấp).
- **FR-007**: Trang chi tiết sản phẩm trong nhánh Cửa hàng MUST giữ đầy đủ các chức năng đã có ở trang chi tiết hiện tại: thêm vào giỏ, mua ngay, xem specs/bảo hành, xem câu hỏi thường gặp (FAQ).
- **FR-008**: Nội dung Điều hòa (danh mục, trang chi tiết, luồng mua thẳng, luồng đặt lịch khảo sát) MUST chuyển vào nhánh Dịch vụ, giữ nguyên hành vi mua hàng/đặt lịch như hiện tại.
- **FR-009**: Giỏ hàng và trang thanh toán MUST tiếp tục hoạt động không đổi logic nghiệp vụ (tính tiền, lưu đơn hàng, gửi email xác nhận) sau khi đổi vị trí URL — chỉ đường dẫn điều hướng ra/vào các trang này thay đổi.
- **FR-010**: Sau khi triển khai, sơ đồ trang mới MUST được nộp lại cho Google Search Console để công cụ tìm kiếm nhận diện cấu trúc mới.
- **FR-011**: Trang danh mục trong nhánh Cửa hàng và trang chi tiết sản phẩm MUST hiển thị các khối trải nghiệm theo kiểu eguru hiện DigiSmart chưa có: dải cam kết/trust bar (chính hãng, bảo hành, hỗ trợ lắp đặt...), và cấu trúc sẵn sàng cho khối khuyến mãi theo chiến dịch (chỉ hiện khi có chiến dịch đang chạy, không bắt buộc luôn hiện).
- **FR-012**: Khách MUST có thể gửi đánh giá (số sao 1-5 + nhận xét bằng chữ + tên) cho một sản phẩm từ trang chi tiết sản phẩm đó.
- **FR-013**: Đánh giá mới gửi MUST ở trạng thái "chờ duyệt", KHÔNG hiển thị công khai ngay — chỉ hiển thị sau khi được duyệt (do chưa có hệ thống xác minh khách đã mua hàng thật, cần lọc trước để tránh đánh giá rác/giả).
- **FR-014**: Trang chi tiết sản phẩm và thẻ sản phẩm ở trang danh mục MUST hiển thị số sao trung bình + số lượng đánh giá đã duyệt của sản phẩm đó; sản phẩm chưa có đánh giá nào MUST hiện rõ trạng thái "chưa có đánh giá" (không hiện số sao gây hiểu nhầm).
- **FR-015**: Việc gửi đánh giá MUST được giới hạn tốc độ (rate-limit) theo từng người gửi để chống spam, theo cùng cơ chế đang áp dụng cho form đặt lịch/chatbot.
- **FR-016**: DigiSmart MUST có cách xem danh sách đánh giá đang chờ duyệt và duyệt/từ chối từng đánh giá trước khi nó hiển thị công khai.

### Key Entities

- **Đánh giá sản phẩm (Review)**: 1 lượt đánh giá của khách cho 1 sản phẩm — gồm sản phẩm được đánh giá, số sao (1-5), nội dung nhận xét, tên người gửi, trạng thái (chờ duyệt / đã duyệt / đã từ chối), thời gian gửi. Đây là dữ liệu mới, hiện web chưa lưu trữ loại này.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% các URL đã tồn tại trước khi đổi (lấy từ sitemap.xml hiện tại, ~95+ URL) đều chuyển hướng tới đúng nội dung tương ứng, không URL nào trả về lỗi "không tìm thấy trang" sau khi triển khai.
- **SC-002**: Một người chưa từng biết website, khi mở trang chủ, xác định đúng nơi cần bấm (Cửa hàng hay Dịch vụ) cho nhu cầu của họ trong lần thử đầu tiên, không cần đọc thêm hướng dẫn.
- **SC-003**: Toàn bộ các luồng mua hàng hiện có (mua máy lọc nước, mua thẳng điều hòa, đặt lịch khảo sát điều hòa) vẫn hoàn tất thành công từ đầu đến cuối sau khi đổi cấu trúc, không phát sinh lỗi mới ở bất kỳ bước nào.
- **SC-004**: Trong vòng 2 tuần sau khi nộp lại sơ đồ trang mới cho Google Search Console, không phát sinh lỗi thu thập dữ liệu (crawl error) mới liên quan đến việc đổi URL.
- **SC-005**: Khách gửi được 1 đánh giá sản phẩm hoàn chỉnh (chọn sao + viết nhận xét + gửi) trong dưới 1 phút, không cần tạo tài khoản.
- **SC-006**: Không có đánh giá rác/spam nào hiển thị công khai mà chưa qua duyệt của DigiSmart.

## Assumptions

- Giữ nguyên bảng màu/nhận diện thương hiệu DigiSmart hiện tại (navy gradient); chỉ học theo cấu trúc trải nghiệm (UX) của eguru.vn, không đổi sang bộ nhận diện mới — theo quyết định đã chốt ở `specs/2026-11-27-redesign-theo-eguru.md` mục 4.
- Phạm vi "Cửa hàng" ở giai đoạn này chỉ gồm catalog hiện có (Máy lọc nước Cleansui/Kitz); việc đưa thêm các thương hiệu khác (Unimax, Kruger, Zimmermann, Living Sense...) vào Cửa hàng là một quyết định/feature riêng, chưa thuộc phạm vi spec này (xem mục A, "tạm để sau" trong spec gốc) — cấu trúc URL/danh mục mới trong feature này cần dễ mở rộng thêm thương hiệu/nhóm sản phẩm sau này mà không phải đổi URL lần nữa.
- Điều hòa tiếp tục dùng flow đặt lịch + mua thẳng đã có (đã triển khai trong phiên làm việc trước), chỉ đổi vị trí URL sang nhánh Dịch vụ — không đổi logic nghiệp vụ.
- Thanh toán tiếp tục là COD + chuyển khoản tay, chưa tích hợp cổng thanh toán online trong phạm vi feature này.
- Việc chuyển hướng URL cũ sang URL mới dùng cơ chế chuyển hướng ở tầng hạ tầng web hiện có (không cần thêm dịch vụ/máy chủ ngoài).
- Danh sách URL cũ cần chuyển hướng được lấy đầy đủ từ `sitemap.xml` hiện tại của site cộng với các trang không nằm trong sitemap (ví dụ `/gio-hang` đang đặt `noindex`).
- Đánh giá sản phẩm mở cho mọi khách gửi (không bắt buộc xác minh đã mua hàng ở giai đoạn này, vì web chưa có hệ thống tài khoản) — bù lại bằng việc duyệt trước khi hiển thị (FR-013) và rate-limit (FR-015). Việc gắn nhãn "đã mua hàng" cho đánh giá là cải tiến có thể làm sau, không thuộc phạm vi này.
- Lưu trữ đánh giá dùng project Supabase `digismart-web-shop` đã có sẵn cho web này (thêm 1 bảng mới) — không tạo project Supabase mới, không đụng tới project "Unimax" nội bộ khác.
- Khối khuyến mãi theo chiến dịch (flash sale) chỉ cần xây đúng cấu trúc/chỗ hiển thị sẵn sàng (FR-011); nội dung/thời điểm 1 chiến dịch cụ thể để chạy là quyết định kinh doanh riêng, không thuộc phạm vi kỹ thuật của spec này.
