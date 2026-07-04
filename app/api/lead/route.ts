import { NextRequest, NextResponse } from "next/server";
import { kvPushLead } from "@/lib/kv";

// Resend ở chế độ test (chưa verify domain riêng) chỉ gửi được tới email đã đăng ký tài khoản Resend.
// Verify domain tại resend.com/domains để gửi được nhiều địa chỉ nhận.
const LEAD_RECIPIENTS = ["digismart606@gmail.com"];

type LeadItem = { id?: string; name: string; qty: number; price: number };

function formatPrice(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

// Chống HTML injection vào email — mọi giá trị khách nhập đều đi qua đây
function esc(s: unknown) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(req: NextRequest) {
  try {
    const { name, phone, note, address, productName, items } = await req.json();

    if (!name || !phone) {
      return NextResponse.json({ error: "Thiếu họ tên hoặc số điện thoại." }, { status: 400 });
    }

    // Giỏ hàng gửi kèm items → email "Đặt lịch lắp đặt"; không có → email báo giá như cũ
    const cartItems: LeadItem[] = Array.isArray(items)
      ? items.filter((i: LeadItem) => i && i.name && Number(i.qty) > 0)
      : [];
    const isBooking = cartItems.length > 0;
    const total = cartItems.reduce((s, i) => s + Number(i.price) * Number(i.qty), 0);

    const itemsHtml = isBooking
      ? `
      <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse">
        <tr><th align="left">Sản phẩm</th><th>SL</th><th align="right">Đơn giá</th><th align="right">Thành tiền</th></tr>
        ${cartItems
          .map(
            i =>
              `<tr><td>${esc(i.name)}</td><td align="center">${Number(i.qty)}</td><td align="right">${formatPrice(Number(i.price))}</td><td align="right">${formatPrice(Number(i.price) * Number(i.qty))}</td></tr>`
          )
          .join("")}
        <tr><td colspan="3" align="right"><strong>Tạm tính</strong></td><td align="right"><strong>${formatPrice(total)}</strong></td></tr>
      </table>
      <p style="color:#666">Thanh toán khi lắp đặt — cần gọi khách xác nhận lịch.</p>`
      : "";

    const html = `
      <h2>${isBooking ? "Yêu cầu đặt lịch lắp đặt từ website DigiSmart" : "Yêu cầu nhận báo giá từ website DigiSmart"}</h2>
      <p><strong>Họ tên:</strong> ${esc(name)}</p>
      <p><strong>Số điện thoại:</strong> ${esc(phone)}</p>
      ${address ? `<p><strong>Địa chỉ lắp đặt:</strong> ${esc(address)}</p>` : ""}
      ${productName ? `<p><strong>Sản phẩm quan tâm:</strong> ${esc(productName)}</p>` : ""}
      ${itemsHtml}
      <p><strong>Ghi chú:</strong> ${esc(note) || "(không có)"}</p>
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
        subject: isBooking
          ? `Đặt lịch lắp đặt mới — ${name} (${cartItems.length} sản phẩm)`
          : `Yêu cầu báo giá mới — ${name}`,
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
      await kvPushLead({
        name,
        phone,
        productName: productName || (isBooking ? cartItems.map(i => `${i.name} x${i.qty}`).join(", ") : null),
        address: address || null,
        items: isBooking ? cartItems : undefined,
        createdAt: new Date().toISOString(),
      });
    } catch (kvErr) {
      console.error("KV push lead error:", kvErr);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Đã có lỗi xảy ra. Vui lòng gọi 0778 886 758." }, { status: 500 });
  }
}
