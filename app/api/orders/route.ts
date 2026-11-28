import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/kv";
import { createCustomer, createOrder, createOrderItems } from "@/lib/supabase";
import { products } from "@/data/products";

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0].trim() : "unknown";
}

function esc(s: unknown) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatPrice(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

function genOrderCode() {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `DS-${ymd}-${rand}`;
}

const ORDER_NOTIFY_RECIPIENTS = ["digismart606@gmail.com"];

type OrderItemInput = { id: string; qty: number };

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const allowed = await checkRateLimit(`order:${ip}`, 5, 600);
    if (!allowed) {
      return NextResponse.json(
        { error: "Bạn đã gửi yêu cầu nhiều lần, vui lòng thử lại sau hoặc gọi hotline 0778 886 758." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, phone, email, address, note, paymentMethod, items } = body as {
      name?: string;
      phone?: string;
      email?: string;
      address?: string;
      note?: string;
      paymentMethod?: string;
      items?: OrderItemInput[];
    };

    if (!name || !phone || !address) {
      return NextResponse.json({ error: "Thiếu họ tên, số điện thoại hoặc địa chỉ giao hàng." }, { status: 400 });
    }
    if (String(name).length > 200 || String(phone).length > 30 || String(address).length > 500) {
      return NextResponse.json({ error: "Thông tin không hợp lệ." }, { status: 400 });
    }
    if (paymentMethod !== "cod" && paymentMethod !== "bank_transfer") {
      return NextResponse.json({ error: "Phương thức thanh toán không hợp lệ." }, { status: 400 });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Giỏ hàng trống." }, { status: 400 });
    }

    // Tự tra giá/tên thật từ data/products.ts theo slug — không tin giá client gửi lên.
    // Nhận cả Máy lọc nước và Điều hòa — riêng Điều hòa chưa tính công lắp đặt vào đơn,
    // sẽ báo giá riêng sau khảo sát (xem hasInstallItems bên dưới).
    const resolvedItems: { productSlug: string; productName: string; unitPrice: number; quantity: number; subtotal: number }[] = [];
    let hasInstallItems = false;
    for (const raw of items) {
      const qty = Math.floor(Number(raw?.qty));
      if (!raw?.id || !Number.isFinite(qty) || qty <= 0 || qty > 50) {
        return NextResponse.json({ error: "Số lượng sản phẩm không hợp lệ." }, { status: 400 });
      }
      const product = products.find(p => p.id === raw.id);
      if (!product || (product.category !== "Máy lọc nước" && product.category !== "Điều hòa") || !product.inStock) {
        return NextResponse.json({ error: `Sản phẩm "${esc(raw.id)}" không hợp lệ hoặc đã hết hàng.` }, { status: 400 });
      }
      if (product.category === "Điều hòa") hasInstallItems = true;
      resolvedItems.push({
        productSlug: product.id,
        productName: product.name,
        unitPrice: product.price,
        quantity: qty,
        subtotal: product.price * qty,
      });
    }

    const subtotal = resolvedItems.reduce((s, i) => s + i.subtotal, 0);
    const shippingFee = 0; // Chưa tính phí ship — giai đoạn 1 miễn phí giao, có thể sửa sau khi có nhu cầu thật.
    const total = subtotal + shippingFee;

    const customer = await createCustomer({ fullName: name, phone, email, address });

    let order;
    let orderCode = genOrderCode();
    try {
      order = await createOrder({
        orderCode,
        customerId: customer.id,
        paymentMethod,
        shippingAddress: address,
        shippingNote: note,
        subtotal,
        shippingFee,
        total,
      });
    } catch {
      // order_code trùng (hiếm) — thử lại 1 lần với mã khác
      orderCode = genOrderCode();
      order = await createOrder({
        orderCode,
        customerId: customer.id,
        paymentMethod,
        shippingAddress: address,
        shippingNote: note,
        subtotal,
        shippingFee,
        total,
      });
    }

    await createOrderItems(order.id, resolvedItems);

    // Gửi email báo đơn hàng mới — không chặn phản hồi nếu lỗi
    try {
      const itemsHtml = `
        <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse">
          <tr><th align="left">Sản phẩm</th><th>SL</th><th align="right">Đơn giá</th><th align="right">Thành tiền</th></tr>
          ${resolvedItems
            .map(
              i =>
                `<tr><td>${esc(i.productName)}</td><td align="center">${i.quantity}</td><td align="right">${formatPrice(i.unitPrice)}</td><td align="right">${formatPrice(i.subtotal)}</td></tr>`
            )
            .join("")}
          <tr><td colspan="3" align="right"><strong>Tổng tiền</strong></td><td align="right"><strong>${formatPrice(total)}</strong></td></tr>
        </table>`;
      const html = `
        <h2>Đơn hàng mới từ website DigiSmart — ${esc(orderCode)}</h2>
        <p><strong>Họ tên:</strong> ${esc(name)}</p>
        <p><strong>Số điện thoại:</strong> ${esc(phone)}</p>
        ${email ? `<p><strong>Email:</strong> ${esc(email)}</p>` : ""}
        <p><strong>Địa chỉ giao hàng:</strong> ${esc(address)}</p>
        <p><strong>Thanh toán:</strong> ${paymentMethod === "cod" ? "Thanh toán khi nhận hàng (COD)" : "Chuyển khoản"}</p>
        ${itemsHtml}
        <p><strong>Ghi chú:</strong> ${esc(note) || "(không có)"}</p>
        ${hasInstallItems ? `<p style="color:#D64545"><strong>⚠ Có sản phẩm Điều hòa cần khảo sát — gọi khách báo giá công lắp đặt trước khi giao.</strong></p>` : ""}
      `;
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.RESEND_API_KEY || ""}` },
        body: JSON.stringify({
          from: "DigiSmart Website <onboarding@resend.dev>",
          to: ORDER_NOTIFY_RECIPIENTS,
          subject: `Đơn hàng mới ${orderCode} — ${name}`,
          html,
        }),
      });
    } catch (mailErr) {
      console.error("Order confirmation email error:", mailErr);
    }

    return NextResponse.json({ ok: true, orderCode });
  } catch (err) {
    console.error("Create order error:", err);
    return NextResponse.json({ error: "Đã có lỗi xảy ra. Vui lòng gọi 0778 886 758." }, { status: 500 });
  }
}
