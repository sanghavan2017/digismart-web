import { NextRequest, NextResponse } from "next/server";
import { kvPushLead } from "@/lib/kv";

// Resend ở chế độ test (chưa verify domain riêng) chỉ gửi được tới email đã đăng ký tài khoản Resend.
// Verify domain tại resend.com/domains để gửi được nhiều địa chỉ nhận.
const LEAD_RECIPIENTS = ["digismart606@gmail.com"];

export async function POST(req: NextRequest) {
  try {
    const { name, phone, note, productName } = await req.json();

    if (!name || !phone) {
      return NextResponse.json({ error: "Thiếu họ tên hoặc số điện thoại." }, { status: 400 });
    }

    const html = `
      <h2>Yêu cầu nhận báo giá từ website DigiSmart</h2>
      <p><strong>Họ tên:</strong> ${name}</p>
      <p><strong>Số điện thoại:</strong> ${phone}</p>
      ${productName ? `<p><strong>Sản phẩm quan tâm:</strong> ${productName}</p>` : ""}
      <p><strong>Ghi chú:</strong> ${note || "(không có)"}</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY || ""}`,
      },
      body: JSON.stringify({
        from: "DigiSmart Website <onboarding@resend.dev>",
        to: LEAD_RECIPIENTS,
        subject: `Yêu cầu báo giá mới — ${name}`,
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend API error:", errText);
      return NextResponse.json({ error: "Đã có lỗi xảy ra. Vui lòng gọi 0778 886 758." }, { status: 500 });
    }

    // Lưu lại lead để tổng hợp báo cáo hàng tuần — không chặn phản hồi nếu lỗi
    try {
      await kvPushLead({ name, phone, productName: productName || null, createdAt: new Date().toISOString() });
    } catch (kvErr) {
      console.error("KV push lead error:", kvErr);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Đã có lỗi xảy ra. Vui lòng gọi 0778 886 758." }, { status: 500 });
  }
}
