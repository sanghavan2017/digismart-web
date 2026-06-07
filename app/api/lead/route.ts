import { NextRequest, NextResponse } from "next/server";

const LEAD_RECIPIENTS = ["digismart606@gmail.com", "sang.havan2017@gmail.com"];

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

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Đã có lỗi xảy ra. Vui lòng gọi 0778 886 758." }, { status: 500 });
  }
}
