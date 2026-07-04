"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "./CartContext";

type FormState = "idle" | "sending" | "sent" | "error";

function formatPrice(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  border: "1.5px solid var(--border)",
  borderRadius: 8,
  fontFamily: "Calibri, sans-serif",
  fontSize: "0.95rem",
  color: "var(--text)",
  background: "#fff",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'Trebuchet MS', sans-serif",
  fontSize: "0.82rem",
  fontWeight: 600,
  color: "var(--brand)",
  display: "block",
  marginBottom: 6,
};

export default function CartPage() {
  const { items, remove, setQty, clear, total } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" });
  const [state, setState] = useState<FormState>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map(i => ({ id: i.id, name: i.name, qty: i.qty, price: i.price })),
        }),
      });
      if (!res.ok) throw new Error();
      clear();
      setState("sent");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
        <h2 style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "1.3rem", color: "var(--brand)", marginBottom: "0.75rem" }}>
          Đã nhận yêu cầu đặt lịch lắp đặt!
        </h2>
        <p style={{ fontFamily: "Calibri, sans-serif", color: "var(--text)", fontSize: "0.95rem", maxWidth: 440, margin: "0 auto 1.5rem" }}>
          DigiSmart sẽ gọi lại xác nhận lịch trong thời gian sớm nhất. Thanh toán khi lắp đặt.
          Cần gấp? Gọi ngay <strong>0778 886 758</strong>.
        </p>
        <Link href="/san-pham"
          style={{ display: "inline-block", background: "var(--brand)", color: "#fff", padding: "11px 28px", borderRadius: 8, textDecoration: "none", fontFamily: "Trebuchet MS, sans-serif", fontWeight: 700, fontSize: "0.9rem" }}>
          Tiếp tục xem sản phẩm
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🛒</div>
        <h2 style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "1.2rem", color: "var(--brand)", marginBottom: "0.75rem" }}>
          Giỏ hàng đang trống
        </h2>
        <p style={{ fontFamily: "Calibri, sans-serif", color: "var(--muted)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
          Thêm sản phẩm vào giỏ để đặt lịch lắp đặt — thanh toán khi lắp, không cần trả trước.
        </p>
        <Link href="/san-pham"
          style={{ display: "inline-block", background: "var(--accent)", color: "#fff", padding: "11px 28px", borderRadius: 8, textDecoration: "none", fontFamily: "Trebuchet MS, sans-serif", fontWeight: 700, fontSize: "0.9rem" }}>
          Xem sản phẩm
        </Link>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", alignItems: "start" }}>
      {/* Danh sách sản phẩm trong giỏ */}
      <div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {items.map(item => (
            <div key={item.id}
              style={{ display: "flex", gap: "0.875rem", background: "#fff", border: "1px solid var(--border)", borderRadius: 10, padding: "0.875rem", alignItems: "center" }}>
              <Link href={`/san-pham/${item.id}`}
                style={{ width: 64, height: 64, flexShrink: 0, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", background: "var(--bg)", borderRadius: 8, overflow: "hidden", textDecoration: "none" }}>
                {item.imageUrl ? (
                  <Image src={item.imageUrl} alt={item.name} fill sizes="64px" style={{ objectFit: "contain", padding: 4 }} />
                ) : (
                  item.icon
                )}
              </Link>
              <div style={{ flex: 1, minWidth: 0 }}>
                <Link href={`/san-pham/${item.id}`}
                  style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "var(--text)", lineHeight: 1.35, textDecoration: "none", display: "block", marginBottom: 4 }}>
                  {item.name}
                </Link>
                <div style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "var(--brand2)" }}>
                  {formatPrice(item.price)}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                <button type="button" onClick={() => setQty(item.id, item.qty - 1)} aria-label="Giảm số lượng"
                  style={{ width: 28, height: 28, borderRadius: 6, border: "1.5px solid var(--border)", background: "#fff", color: "var(--brand)", fontWeight: 700, cursor: "pointer", lineHeight: 1 }}>
                  −
                </button>
                <span style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "var(--text)", minWidth: 20, textAlign: "center" }}>
                  {item.qty}
                </span>
                <button type="button" onClick={() => setQty(item.id, item.qty + 1)} aria-label="Tăng số lượng"
                  style={{ width: 28, height: 28, borderRadius: 6, border: "1.5px solid var(--border)", background: "#fff", color: "var(--brand)", fontWeight: 700, cursor: "pointer", lineHeight: 1 }}>
                  +
                </button>
                <button type="button" onClick={() => remove(item.id)} aria-label={`Xoá ${item.name} khỏi giỏ`}
                  style={{ marginLeft: 6, background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: "1rem", lineHeight: 1 }}>
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "1rem 0.25rem 0" }}>
          <span style={{ fontFamily: "Calibri, sans-serif", fontSize: "0.95rem", color: "var(--text)" }}>Tạm tính:</span>
          <span style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#F07B20" }}>
            {formatPrice(total)}
          </span>
        </div>
        <p style={{ fontFamily: "Calibri, sans-serif", fontSize: "0.82rem", color: "var(--muted)", padding: "0 0.25rem" }}>
          Giá đã gồm VAT. Phí lắp đặt (nếu có) sẽ được báo khi xác nhận lịch. <strong>Thanh toán khi lắp đặt</strong> — không cần trả trước.
        </p>
      </div>

      {/* Form đặt lịch lắp đặt */}
      <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: "1.5rem" }}>
        <h2 style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--brand)", marginBottom: "0.4rem" }}>
          Đặt lịch lắp đặt
        </h2>
        <p style={{ fontFamily: "Calibri, sans-serif", fontSize: "0.85rem", color: "var(--muted)", marginBottom: "1.25rem" }}>
          Để lại thông tin, DigiSmart sẽ gọi xác nhận lịch lắp đặt cho {items.length} sản phẩm trong giỏ.
        </p>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={labelStyle}>Họ và tên *</label>
            <input name="name" value={form.name} onChange={handleChange} required placeholder="Nguyễn Văn A" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Số điện thoại *</label>
            <input name="phone" value={form.phone} onChange={handleChange} required type="tel" placeholder="0900 000 000" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Địa chỉ lắp đặt</label>
            <input name="address" value={form.address} onChange={handleChange} placeholder="Số nhà, đường, quận, TPHCM" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Ghi chú</label>
            <textarea name="note" value={form.note} onChange={handleChange} rows={3} placeholder="Thời gian mong muốn, tầng lầu, chung cư..." style={{ ...inputStyle, resize: "vertical" }} />
          </div>
          {state === "error" && (
            <p style={{ fontFamily: "Calibri, sans-serif", fontSize: "0.85rem", color: "#D64545" }}>
              Gửi yêu cầu thất bại. Vui lòng thử lại hoặc gọi 0778 886 758.
            </p>
          )}
          <button
            type="submit"
            disabled={state === "sending"}
            style={{ background: "#F07B20", color: "#fff", padding: "12px 24px", borderRadius: 8, fontFamily: "Trebuchet MS, sans-serif", fontWeight: 700, fontSize: "0.95rem", border: "none", cursor: state === "sending" ? "wait" : "pointer", opacity: state === "sending" ? 0.7 : 1 }}
          >
            {state === "sending" ? "Đang gửi..." : "Gửi yêu cầu đặt lịch"}
          </button>
        </form>
      </div>
    </div>
  );
}
