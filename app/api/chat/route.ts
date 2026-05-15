import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";

const SYSTEM_PROMPT = `Bạn là trợ lý tư vấn sản phẩm của Digismart — nhà phân phối thiết bị gia dụng chính hãng tại Việt Nam.

DANH MỤC SẢN PHẨM HIỆN TẠI:
${products.map(p => `- ${p.name} (${p.brand}, ${p.sku}): ${p.price.toLocaleString("vi-VN")}đ | ${p.specs}`).join("\n")}

THÔNG TIN LIÊN HỆ:
- Điện thoại/Zalo: 0778 886 758
- Shopee, Lazada, TikTok Shop: Digismart Official

QUY TẮC:
1. Chỉ tư vấn về sản phẩm Digismart và thông tin đặt hàng.
2. Nếu khách hỏi ngoài chủ đề, lịch sự từ chối và hướng về tư vấn sản phẩm.
3. Luôn kết thúc bằng cách mời khách liên hệ 0778 886 758 nếu cần thêm hỗ trợ.
4. Trả lời bằng tiếng Việt, thân thiện và ngắn gọn.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || "Xin lỗi, mình chưa hiểu câu hỏi. Bạn có thể hỏi lại không?";

    return NextResponse.json({ reply: text });
  } catch {
    return NextResponse.json({ reply: "Đã có lỗi xảy ra. Vui lòng liên hệ 0778 886 758." }, { status: 500 });
  }
}
