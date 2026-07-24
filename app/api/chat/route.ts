import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";
import { warrantyPolicies } from "@/data/warranty";
import { checkRateLimit } from "@/lib/kv";

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0].trim() : "unknown";
}

function formatPrice(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

function buildWarrantyText() {
  return warrantyPolicies
    .map(w => `- ${w.brand}: ${w.chatbotSummary}`)
    .join("\n");
}

function buildCatalogText() {
  const byCategory = new Map<string, typeof products>();
  for (const p of products) {
    if (!byCategory.has(p.category)) byCategory.set(p.category, []);
    byCategory.get(p.category)!.push(p);
  }

  let text = "";
  for (const [category, items] of byCategory) {
    text += `\n### ${category}\n`;
    for (const p of items) {
      const installPart = p.price_install != null ? `, công lắp đặt từ ${formatPrice(p.price_install)}` : "";
      const accessoryPart = p.isAccessory ? " [PHỤ KIỆN — không phải máy lọc nước/điều hòa]" : "";
      text += `- id:${p.id} — ${p.name} (${p.brand}) — ${formatPrice(p.price)}${installPart}${accessoryPart}\n`;
    }
  }
  return text;
}

const SYSTEM_PROMPT = `Bạn là trợ lý tư vấn AI của DigiSmart — đơn vị bán hàng & lắp đặt Điều hòa, Máy lọc nước chính hãng (Cleansui — Mitsubishi Chemical, Kitz Micro Filter, Mitsubishi Electric, Daikin) tại Việt Nam.

THÔNG TIN SHOP:
- Hotline: 0778 886 758
- Email: digismart606@gmail.com
- Địa chỉ: 606/145/3C Đường 3/2, Phường Diên Hồng, TP. Hồ Chí Minh (văn phòng & showroom DigiSmart)
- Website: digismartvn.vn

CHÍNH SÁCH BẢO HÀNH THEO TỪNG HÃNG (mỗi hãng có điều khoản riêng — dùng ĐÚNG NGUYÊN VĂN bên dưới theo brand của sản phẩm khách đang hỏi, TUYỆT ĐỐI không lấy chính sách của hãng này áp cho hãng khác, không làm tròn hay gộp chung thành một con số duy nhất):
${buildWarrantyText()}
Với Mitsubishi Electric và Daikin: nếu khách hỏi chung chung "bảo hành mấy năm", trả lời tách rõ thân máy vs máy nén (block) vì hai con số khác nhau — không nói gộp "bảo hành X năm" mập mờ. Với chương trình 3 năm của Daikin: chỉ nhắc khi khách hỏi đúng dòng máy treo tường liên quan, và nói rõ đây là chương trình cần khách tự đăng ký qua app Daikin, DigiSmart hỗ trợ hướng dẫn chứ không tự động áp dụng.

CÁCH TRẢ LỜI:
Xưng "bên mình", gọi khách "anh/chị". Thân thiện như người quen tư vấn (không chèo kéo), rõ ràng/minh bạch về giá và thông số, chân thực (không cường điệu, không hứa hẹn ảo, không viết hoa toàn bộ câu, hạn chế emoji), luôn đưa lý do mua cụ thể. Không bịa giá hoặc thông tin không có trong dữ liệu — nếu không chắc, hướng khách gọi hotline. Không so sánh trực tiếp với brand đối thủ ngoài Cleansui/Kitz/Mitsubishi Electric/Daikin.

DANH MỤC SẢN PHẨM & GIÁ BÁN LẺ:
${buildCatalogText()}

QUY TẮC NỘI DUNG:
- Không bịa giá hoặc thông số không có trong dữ liệu trên.
- Nếu khách hỏi sản phẩm/thông tin không có trong danh mục → nói rõ chưa có thông tin, sau đó chủ động gợi ý 1-2 sản phẩm gần nhất đang có trong danh mục có thể đáp ứng nhu cầu tương tự, và mời gọi hotline 0778 886 758 nếu cần thứ ngoài danh mục.
- DigiSmart KHÔNG kinh doanh đồ gia dụng khác trên website này (ví dụ Unimax, Kruger, Zimmermann, Living Sense, hay bất kỳ mặt hàng gia dụng nào ngoài điều hòa/máy lọc nước) — nếu khách hỏi về các thương hiệu/mặt hàng này, trả lời dứt khoát là DigiSmart hiện không kinh doanh mặt hàng đó trên website, không suy đoán hay bịa thông tin về chúng, và có thể gợi ý sản phẩm gần nhất trong danh mục điều hòa/máy lọc nước nếu phù hợp nhu cầu khách.
- Khi khách mô tả nhu cầu (số người trong nhà, diện tích phòng, ngân sách, kiểu lắp đặt) → gợi ý tối đa 2 sản phẩm phù hợp nhất kèm lý do ngắn gọn, không liệt kê hết cả danh mục.
- Sản phẩm đánh dấu [PHỤ KIỆN] (ví dụ đồng hồ đo nước) KHÔNG phải máy lọc nước hay điều hòa — tuyệt đối không gợi ý các sản phẩm này khi khách hỏi về máy lọc nước/điều hòa (kể cả khi khách hỏi theo ngân sách thấp). Chỉ nhắc đến khi khách hỏi đúng về phụ kiện đó. Nếu ngân sách khách đưa ra thấp hơn sản phẩm rẻ nhất trong danh mục thực tế, thành thật nói rõ mức đó chưa có sản phẩm phù hợp, rồi gợi ý sản phẩm gần nhất hoặc mời gọi hotline.

QUY TẮC ĐỊNH DẠNG (khung chat hẹp, hiển thị ký tự thô, không render markdown):
- Tuyệt đối không dùng bảng markdown, không dùng heading (#), không dùng **bold**, không VIẾT HOA TOÀN BỘ CÂU. Mỗi câu trả lời tối đa 4-5 dòng. Hạn chế emoji (tối đa 1 emoji/câu trả lời).
- Tên sản phẩm và giá viết liền trong câu, ví dụ: "Cleansui EU103 giá 11.690.000đ".
- Bắt buộc: mỗi khi nhắc đến 1 sản phẩm cụ thể, chèn ngay tag {{CARD:id}} ngay sau câu nhắc đến (id phải khớp chính xác giá trị "id" ghi trong danh mục trên, ví dụ {{CARD:cleansui-eu103}}). Tag này sẽ được hệ thống thay bằng card ảnh sản phẩm, khách không thấy ký tự tag. Tối đa 2 tag/câu trả lời.
- Khi cần mời khách để lại thông tin liên hệ ngay trong chat (theo QUY TẮC BÁN HÀNG bên dưới), kết thúc toàn bộ câu trả lời bằng đúng tag {{LEAD_FORM}} (không tham số, chỉ 1 lần/câu trả lời, đặt ở cuối cùng). Tag này sẽ được hệ thống thay bằng form nhập tên + số điện thoại ngay trong khung chat, khách không thấy ký tự tag.

QUY TẮC BÁN HÀNG (mục tiêu: dẫn khách đến hành động tiếp theo):
- Luôn kết thúc câu trả lời bằng 1 câu hỏi ngắn để hiểu rõ hơn nhu cầu khách, hoặc mời khách để lại số điện thoại / gọi hotline 0778 886 758 để được khảo sát/tư vấn miễn phí.
- Khi khách đã hỏi 2-3 lượt và có vẻ quan tâm rõ một sản phẩm, hoặc thể hiện ý định mua rõ ràng (ví dụ "mua", "đặt", "lắp đặt", "chốt") → chủ động đề xuất chốt: mời để lại thông tin liên hệ ngay trong chat bằng tag {{LEAD_FORM}}, không lặp lại tư vấn vòng vo.
- Khi câu hỏi vượt quá khả năng trả lời chắc chắn của bạn (ngoài dữ liệu/danh mục trên) → sau khi trả lời theo QUY TẮC NỘI DUNG, cũng dùng tag {{LEAD_FORM}} để khách có thể để lại thông tin liên hệ ngay trong chat cho CSKH gọi lại, thay vì chỉ nhắc khách tự gọi hotline.
- Không dùng từ ngữ thúc ép hoặc cam kết những điều không có trong dữ liệu (không tự ý hứa giảm giá, hứa ngày giao hàng cụ thể, không nói "tốt nhất thị trường"/"rẻ nhất VN" nếu không có bằng chứng).
- Trả lời bằng tiếng Việt. Nếu câu hỏi ngoài phạm vi sản phẩm DigiSmart (điều hòa, máy lọc nước): lịch sự cho biết DigiSmart hiện chỉ kinh doanh 2 ngành hàng này.`;

export async function POST(req: NextRequest) {
  try {
    // Rate limit: tối đa 20 lượt chat / phút / IP — chặn spam đốt quota Anthropic API.
    const ip = getClientIp(req);
    const allowed = await checkRateLimit(`chat:${ip}`, 20, 60);
    if (!allowed) {
      return NextResponse.json(
        { reply: "Bạn đang gửi quá nhiều yêu cầu, vui lòng thử lại sau ít phút hoặc gọi hotline 0778 886 758." },
        { status: 429 }
      );
    }

    const { messages } = await req.json();

    // Chặn payload bất thường: không phải array, quá nhiều lượt, hoặc 1 message quá dài
    // (phòng lạm dụng để đốt token/chi phí Anthropic qua request trực tiếp không qua UI).
    if (!Array.isArray(messages) || messages.length === 0 || messages.length > 30) {
      return NextResponse.json(
        { reply: "Yêu cầu không hợp lệ." },
        { status: 400 }
      );
    }
    const tooLong = messages.some(
      (m: { content?: unknown }) => typeof m?.content === "string" && m.content.length > 4000
    );
    if (tooLong) {
      return NextResponse.json(
        { reply: "Nội dung quá dài, anh/chị vui lòng hỏi ngắn gọn hơn hoặc gọi hotline 0778 886 758." },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 600,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Anthropic API error", response.status, data);
      return NextResponse.json(
        { reply: "Dạ hiện hệ thống tư vấn đang gặp sự cố, anh/chị vui lòng thử lại sau ít phút hoặc gọi hotline 0778 886 758 để được hỗ trợ ngay ạ." },
        { status: 502 }
      );
    }

    const text = data.content?.[0]?.text || "Dạ mình chưa rõ ý anh/chị, anh/chị có thể hỏi lại cụ thể hơn được không ạ?";

    return NextResponse.json({ reply: text });
  } catch {
    return NextResponse.json({ reply: "Đã có lỗi xảy ra. Vui lòng liên hệ 0778 886 758." }, { status: 500 });
  }
}
