# Feature Specification: Hoàn thiện Chatbot tư vấn sản phẩm

**Feature Branch**: `001-finish-product-chatbot`

**Created**: 2026-07-14

**Status**: Draft

**Input**: User description: "Hoàn thiện Chatbot.tsx trên digismart-web — chatbot hỗ trợ khách hàng xem thông tin sản phẩm gia dụng (Unimax/Kruger/Zimmermann/Living Sense/Cleansui/Kitz). Cách trả lời (tĩnh/AI động/chuyển CSKH) và nguồn dữ liệu sản phẩm (API/DB có sẵn hay file catalog tĩnh) chưa quyết định — cần đề xuất dựa trên kiến trúc hiện tại của repo."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Tra cứu thông tin sản phẩm qua chat (Priority: P1)

Một khách hàng đang xem website DigiSmart mở khung chat và hỏi tự nhiên về sản phẩm (giá, thông số, so sánh giữa các dòng máy lọc nước/điều hòa). Chatbot trả lời đúng bằng dữ liệu sản phẩm thật của DigiSmart, kèm ảnh + giá sản phẩm được nhắc tới, không bịa đặt thông tin không có trong danh mục.

**Why this priority**: Đây là giá trị cốt lõi của chatbot — nếu không trả lời đúng và đáng tin, các tính năng khác không còn ý nghĩa.

**Independent Test**: Mở chat, hỏi "Cleansui EU103 giá bao nhiêu", nhận được đúng tên + giá lấy từ danh mục sản phẩm hiện có, kèm hình ảnh sản phẩm.

**Acceptance Scenarios**:

1. **Given** khách đang ở trang bất kỳ trên website, **When** khách mở chat và hỏi về giá/thông số một sản phẩm có trong danh mục, **Then** chatbot trả lời đúng giá và thông số thật, kèm thẻ ảnh sản phẩm tương ứng.
2. **Given** khách hỏi so sánh 2 sản phẩm cùng loại, **When** chatbot trả lời, **Then** câu trả lời chỉ dùng thông tin có trong danh mục, không tự suy diễn thêm thông số.
3. **Given** khách hỏi về một sản phẩm/thương hiệu không có trong danh mục hiện tại, **When** chatbot trả lời, **Then** chatbot nói rõ hiện chưa có sản phẩm đó, gợi ý 1-2 sản phẩm gần nhất đang có, và không bịa giá/thông số.

---

### User Story 2 - Tư vấn theo nhu cầu cá nhân (Priority: P2)

Khách mô tả nhu cầu thực tế (số người trong nhà, diện tích phòng, ngân sách, kiểu lắp đặt) thay vì hỏi tên sản phẩm cụ thể. Chatbot gợi ý tối đa 2 sản phẩm phù hợp nhất kèm lý do ngắn gọn, thay vì liệt kê cả danh mục.

**Why this priority**: Đây là tình huống phổ biến nhất với khách chưa rành sản phẩm — quyết định trực tiếp tỷ lệ khách để lại thông tin liên hệ.

**Independent Test**: Nhập "gia đình 4 người, phòng 15m2, ngân sách 10 triệu, nên chọn điều hòa nào" và nhận được tối đa 2 gợi ý cụ thể kèm lý do, không phải danh sách toàn bộ điều hòa.

**Acceptance Scenarios**:

1. **Given** khách mô tả nhu cầu cụ thể, **When** chatbot trả lời, **Then** chatbot gợi ý tối đa 2 sản phẩm phù hợp nhất kèm lý do, không liệt kê toàn bộ danh mục.
2. **Given** ngân sách khách đưa ra thấp hơn sản phẩm rẻ nhất phù hợp trong danh mục, **When** chatbot trả lời, **Then** chatbot nói thật là chưa có sản phẩm ở mức giá đó, rồi gợi ý sản phẩm gần nhất hoặc mời gọi hotline.

---

### User Story 3 - Chuyển tiếp hỗ trợ khi chatbot không đủ khả năng trả lời (Priority: P3)

Khi khách hỏi ngoài phạm vi chatbot có thể trả lời chắc chắn (VD: yêu cầu báo giá lắp đặt thực tế, khiếu nại, câu hỏi kỹ thuật phức tạp), hoặc khi khách đã thể hiện rõ ý định mua sau vài lượt hỏi, chatbot chủ động dẫn khách sang kênh hỗ trợ con người (CSKH) thay vì tiếp tục đoán trả lời.

**Why this priority**: Bảo vệ trải nghiệm khách và tránh chatbot trả lời sai những việc cần con người xử lý; đồng thời không chặn đường một khách hàng tiềm năng đã sẵn sàng mua.

**Independent Test**: Hỏi liên tục 3 lượt về cùng một sản phẩm rồi thể hiện ý định mua ("cho anh đặt lắp cái này"); chatbot chủ động mời để lại tên + số điện thoại ngay trong khung chat, và thông tin đó được ghi nhận thành một yêu cầu liên hệ (lead) cho CSKH gọi lại.

**Acceptance Scenarios**:

1. **Given** câu hỏi của khách nằm ngoài phạm vi sản phẩm/dữ liệu chatbot có, **When** chatbot không thể trả lời chắc chắn, **Then** chatbot nói rõ giới hạn và mời khách để lại thông tin liên hệ ngay trong chat hoặc gọi hotline, thay vì suy đoán câu trả lời.
2. **Given** khách đã hỏi 2-3 lượt và thể hiện rõ ý định mua, **When** chatbot trả lời, **Then** chatbot chủ động mời khách để lại tên + số điện thoại ngay trong khung chat thay vì tiếp tục lặp lại tư vấn.
3. **Given** khách đồng ý và nhập tên + số điện thoại ngay trong khung chat, **When** khách gửi thông tin đó, **Then** hệ thống ghi nhận thành một yêu cầu liên hệ (lead) để CSKH gọi lại, và chatbot xác nhận lại với khách là đã nhận được thông tin.

---

### Edge Cases

- Dịch vụ AI trả lời bên ngoài lỗi hoặc quá thời gian chờ → khách vẫn nhận được một phản hồi thân thiện kèm hotline, không bao giờ "treo" không có phản hồi nào.
- Khách gửi liên tục nhiều tin nhắn trong thời gian ngắn (spam) → hệ thống giới hạn tần suất và báo khách thử lại sau, không để một khách làm nghẽn dịch vụ cho người khác.
- Khách hỏi bằng ngôn ngữ khác tiếng Việt, hoặc hỏi chủ đề hoàn toàn ngoài sản phẩm/dịch vụ DigiSmart → chatbot lịch sự cho biết phạm vi hỗ trợ hiện tại.
- Khách dùng trình duyệt/thiết bị không hỗ trợ nhập liệu bằng giọng nói → tính năng giọng nói ẩn đi hoặc báo không khả dụng, không làm gián đoạn phần chat bằng văn bản.
- Sản phẩm ngừng kinh doanh hoặc hết hàng → chatbot không gợi ý sản phẩm đó như đang bán, hoặc nói rõ tình trạng còn hàng.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Chatbot MUST trả lời câu hỏi về sản phẩm chỉ dựa trên dữ liệu sản phẩm thật hiện có của DigiSmart (tên, giá, thông số, tình trạng còn hàng) — không tự bịa giá hoặc thông số không có trong dữ liệu.
- **FR-002**: Khi nhắc đến một sản phẩm cụ thể còn trong danh mục, chatbot MUST hiển thị kèm hình ảnh và giá bán hiện tại của đúng sản phẩm đó.
- **FR-003**: Chatbot MUST áp dụng đúng chính sách bảo hành riêng của từng thương hiệu khi được hỏi, không áp chính sách của thương hiệu này cho thương hiệu khác.
- **FR-004**: Khi khách mô tả nhu cầu (số người, diện tích, ngân sách, kiểu lắp đặt) thay vì hỏi tên sản phẩm, chatbot MUST gợi ý tối đa 2 sản phẩm phù hợp nhất kèm lý do ngắn gọn.
- **FR-005**: Khi khách hỏi về sản phẩm/thương hiệu không có trong phạm vi kinh doanh hiện tại của website, chatbot MUST nói rõ hiện chưa có, gợi ý sản phẩm gần nhất thay thế nếu có, và không suy đoán thông tin.
- **FR-006**: Phạm vi sản phẩm/thương hiệu mà chatbot MUST hỗ trợ giới hạn đúng theo danh mục đang kinh doanh trên website hôm nay (Cleansui, Kitz Micro Filter — máy lọc nước; Mitsubishi Electric, Daikin — điều hòa). Khi khách hỏi về thương hiệu ngoài phạm vi này (kể cả Unimax/Kruger/Zimmermann/Living Sense hoặc thương hiệu đối thủ), chatbot MUST nói rõ DigiSmart hiện không kinh doanh mặt hàng đó, không bịa thông tin, và có thể gợi ý sản phẩm gần nhất trong đúng phạm vi đang bán nếu phù hợp với nhu cầu khách.
- **FR-007**: Khi dịch vụ trả lời AI gặp sự cố hoặc không phản hồi kịp thời, chatbot MUST vẫn trả về một phản hồi cho khách (thông báo sự cố + số hotline), không được im lặng không phản hồi.
- **FR-008**: Chatbot MUST giới hạn số lượt gửi tin nhắn từ một khách trong một khoảng thời gian ngắn để chống spam/lạm dụng, và báo cho khách biết khi vượt hạn mức.
- **FR-009**: Khi khách đã hỏi nhiều lượt về cùng sản phẩm và thể hiện rõ ý định mua, hoặc khi câu hỏi vượt quá khả năng trả lời chắc chắn của chatbot, chatbot MUST chủ động mời khách để lại tên và số điện thoại ngay trong khung chat (không bắt khách rời sang form riêng), rồi gửi thông tin đó thành một yêu cầu liên hệ (lead) cho CSKH gọi lại — tái sử dụng luồng lưu/gửi lead sản phẩm đã có trên website thay vì dựng luồng lead mới song song.
- **FR-010**: Chatbot MUST chỉ trả lời bằng tiếng Việt và giữ đúng giọng văn tư vấn thân thiện, minh bạch về giá — không cường điệu, không hứa hẹn những điều không có trong dữ liệu (giảm giá, ngày giao hàng cụ thể, v.v.).
- **FR-011**: Việc chatbot gặp lỗi hoặc chậm phản hồi MUST không chặn khách tiếp tục xem và thao tác trên các phần khác của website (chatbot là một thành phần độc lập, không phải luồng bắt buộc).
- **FR-012**: Thông tin liên hệ khách nhập trong chat (tên, số điện thoại) MUST được kiểm tra hợp lệ tối thiểu (không để trống, đúng định dạng số điện thoại Việt Nam) trước khi gửi thành lead; nếu chưa hợp lệ, chatbot MUST báo rõ cho khách để sửa lại.
- **FR-013**: Sau khi khách gửi thông tin liên hệ trong chat thành công, chatbot MUST xác nhận lại với khách là thông tin đã được ghi nhận và CSKH sẽ liên hệ lại, kèm số hotline dự phòng nếu khách muốn được hỗ trợ ngay.

### Key Entities *(include if feature involves data)*

- **Sản phẩm (Product)**: Một mặt hàng DigiSmart đang bán — tên, thương hiệu, danh mục, giá, thông số kỹ thuật, tình trạng còn hàng, hình ảnh. Là nguồn sự thật duy nhất mà chatbot được phép dùng để trả lời về giá/thông số.
- **Chính sách bảo hành (Warranty Policy)**: Điều khoản bảo hành riêng theo từng thương hiệu, dùng khi khách hỏi về bảo hành.
- **Cuộc hội thoại (Conversation)**: Chuỗi tin nhắn qua lại giữa khách và chatbot trong một phiên chat, dùng để chatbot hiểu ngữ cảnh nhiều lượt hỏi liên tiếp.
- **Yêu cầu liên hệ (Lead)**: Thông tin liên hệ khách để lại trong chat (tên, số điện thoại, sản phẩm quan tâm) để CSKH gọi lại — dùng chung cơ chế lưu/gửi lead đã có trên website.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Với các câu hỏi về giá/thông số sản phẩm đang có trong danh mục, khách nhận được câu trả lời đúng dữ liệu thật ngay trong lần hỏi đầu tiên, không cần hỏi lại để "sửa" thông tin sai.
- **SC-002**: 100% trường hợp dịch vụ AI gặp sự cố, khách vẫn nhận được một phản hồi hướng dẫn (không bao giờ chat bị "treo" không có phản hồi nào).
- **SC-003**: Với câu hỏi ngoài phạm vi sản phẩm/kinh doanh hiện tại, khách luôn được cho biết rõ giới hạn và có ít nhất một hướng đi tiếp theo (sản phẩm thay thế hoặc kênh liên hệ), thay vì im lặng hoặc trả lời sai.
- **SC-004**: Khách thể hiện rõ ý định mua sau vài lượt hỏi luôn được chatbot chủ động mời để lại tên + số điện thoại ngay trong chat, trước khi kết thúc hội thoại.
- **SC-005**: 100% lượt khách đồng ý để lại thông tin liên hệ trong chat đều đến được CSKH qua ít nhất một trong hai kênh ghi nhận hiện có (email báo ngay cho CSKH, hoặc danh sách lead nội bộ để tổng hợp) — không bị thất lạc hoàn toàn. "Không bị thất lạc" ở đây nghĩa là ít nhất một kênh nhận được thành công; đây không phải cam kết cả hai kênh luôn đồng thời thành công (nếu một kênh gặp sự cố kỹ thuật, kênh còn lại vẫn phải đảm bảo CSKH nhận được thông tin).

## Assumptions

- Chatbot tiếp tục dùng kiến trúc "AI động" hiện có (mô hình ngôn ngữ trả lời tự nhiên) thay vì kịch bản trả lời tĩnh cố định — vì trải nghiệm tư vấn tự nhiên theo ngữ cảnh nhiều lượt hỏi là giá trị cốt lõi đã được xác nhận qua các user story trên.
- Nguồn dữ liệu sản phẩm/bảo hành tiếp tục là file catalog tĩnh trong repo (như `data/products.ts`, `data/warranty.ts` hiện nay) chứ không phải gọi tới một API/CSDL sản phẩm riêng — vì DigiSmart hiện chưa có hệ thống quản lý sản phẩm trung tâm nào khác ngoài các file này, và việc dựng thêm API/DB mới nằm ngoài phạm vi "hoàn thiện chatbot".
- Tính năng nhập/đọc bằng giọng nói (voice) là phần nâng cao, không bắt buộc để coi chatbot là "hoàn thiện" — có thể tiếp tục hoạt động ở mức hiện tại mà không cần mở rộng thêm.
- Chưa có hệ thống chat trực tiếp với nhân viên (live agent) — "chuyển CSKH" trong phạm vi tính năng này nghĩa là chatbot thu thập tên + số điện thoại ngay trong chat và gửi thành lead cho CSKH gọi lại (tái dùng hạ tầng lead/email hiện có ở trang sản phẩm), không phải nối cuộc trò chuyện trực tiếp với nhân viên thật trong khung chat.
- Phạm vi thương hiệu/sản phẩm chatbot hỗ trợ giữ đúng như website đang kinh doanh hôm nay (Cleansui, Kitz, Mitsubishi Electric, Daikin). Unimax/Kruger/Zimmermann/Living Sense không thuộc phạm vi tính năng này vì chưa có trong catalog của website và việc bổ sung catalog mới nằm ngoài phạm vi "hoàn thiện chatbot".
