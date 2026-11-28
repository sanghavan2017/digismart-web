"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartContext";
import { products } from "@/data/products";

type FormState = "idle" | "sending" | "sent" | "error";

const BANK_INFO = { bank: "Vietcombank", accountNumber: "0071001257228", accountHolder: "HA VAN SANG" };

function formatPrice(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  border: "1.5px solid var(--border)",
  borderRadius: 8,
  fontFamily: "var(--font-sans)",
  fontSize: "0.95rem",
  color: "var(--text)",
  background: "#fff",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.82rem",
  fontWeight: 600,
  color: "var(--brand)",
  display: "block",
  marginBottom: 6,
};

export default function CheckoutForm() {
  const { items, clear, total } = useCart();
  const hasInstallItems = items.some(i => products.find(p => p.id === i.id)?.category === "Điều hòa");
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", note: "" });
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bank_transfer">("cod");
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [orderCode, setOrderCode] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderHasInstall, setOrderHasInstall] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          paymentMethod,
          items: items.map(i => ({ id: i.id, qty: i.qty })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Đặt hàng thất bại. Vui lòng thử lại.");
        setState("error");
        return;
      }
      setOrderCode(data.orderCode);
      setOrderTotal(total);
      setOrderHasInstall(hasInstallItems);
      clear();
      setState("sent");
    } catch {
      setErrorMsg("Đặt hàng thất bại. Vui lòng thử lại hoặc gọi 0778 886 758.");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
        <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "1.3rem", color: "var(--brand)", marginBottom: "0.75rem" }}>
          Đặt hàng thành công!
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", color: "var(--text)", fontSize: "0.95rem", maxWidth: 440, margin: "0 auto 0.5rem" }}>
          Mã đơn hàng: <strong>{orderCode}</strong>
        </p>
        <p style={{ fontFamily: "var(--font-sans)", color: "var(--text)", fontSize: "0.95rem", maxWidth: 440, margin: "0 auto 1rem" }}>
          {paymentMethod === "cod"
            ? "DigiSmart sẽ gọi xác nhận đơn và giao hàng sớm nhất — thanh toán khi nhận hàng."
            : "Vui lòng chuyển khoản theo thông tin bên dưới. DigiSmart sẽ gọi xác nhận và giao hàng sau khi nhận được tiền."}
        </p>
        {orderHasInstall && (
          <p style={{ fontFamily: "var(--font-sans)", color: "#D64545", fontSize: "0.9rem", maxWidth: 440, margin: "0 auto 1rem" }}>
            Số tiền trên chưa gồm công lắp đặt điều hòa — DigiSmart sẽ gọi khảo sát và báo giá công lắp riêng.
          </p>
        )}
        {paymentMethod === "bank_transfer" && (
          <div style={{ background: "var(--brand-light)", border: "1px solid var(--border)", borderRadius: 10, padding: "1rem 1.25rem", maxWidth: 420, margin: "0 auto 1.5rem", textAlign: "left", fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--text)" }}>
            <div><strong>Ngân hàng:</strong> {BANK_INFO.bank}</div>
            <div><strong>Số tài khoản:</strong> {BANK_INFO.accountNumber}</div>
            <div><strong>Chủ tài khoản:</strong> {BANK_INFO.accountHolder}</div>
            <div><strong>Số tiền:</strong> {formatPrice(orderTotal)}</div>
            <div><strong>Nội dung chuyển khoản:</strong> {orderCode}</div>
          </div>
        )}
        <p style={{ fontFamily: "var(--font-sans)", color: "var(--text)", fontSize: "0.95rem", maxWidth: 440, margin: "0 auto 1.5rem" }}>
          Cần gấp? Gọi ngay <strong>0778 886 758</strong>.
        </p>
        <Link href="/san-pham"
          style={{ display: "inline-block", background: "var(--brand)", color: "#fff", padding: "11px 28px", borderRadius: 8, textDecoration: "none", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.9rem" }}>
          Tiếp tục xem sản phẩm
        </Link>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", alignItems: "start" }}>
      {/* Tóm tắt đơn hàng */}
      <div>
        <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.05rem", color: "var(--brand)", marginBottom: "0.75rem" }}>
          Đơn hàng ({items.length} sản phẩm)
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {items.map(item => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--text)" }}>
              <span>{item.name} × {item.qty}</span>
              <span style={{ fontWeight: 700 }}>{formatPrice(item.price * item.qty)}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "1rem 0 0", borderTop: "1px solid var(--border)", marginTop: "0.75rem" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--text)" }}>Tổng tiền:</span>
          <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.3rem", color: "#F07B20" }}>
            {formatPrice(total)}
          </span>
        </div>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--muted)", marginTop: "0.5rem" }}>
          Giá đã gồm VAT. Miễn phí giao hàng nội thành — DigiSmart gọi xác nhận trước khi giao.
        </p>
        {hasInstallItems && (
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "#D64545", marginTop: "0.4rem" }}>
            Giá trên chưa gồm công lắp đặt điều hòa — DigiSmart sẽ gọi khảo sát và báo giá công lắp riêng sau khi xác nhận đơn.
          </p>
        )}
      </div>

      {/* Form thông tin giao hàng */}
      <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: "1.5rem" }}>
        <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.1rem", color: "var(--brand)", marginBottom: "1.25rem" }}>
          Thông tin giao hàng
        </h2>
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
            <label style={labelStyle}>Email (không bắt buộc)</label>
            <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="ban@email.com" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Địa chỉ giao hàng *</label>
            <input name="address" value={form.address} onChange={handleChange} required placeholder="Số nhà, đường, quận, TPHCM" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Ghi chú giao hàng</label>
            <textarea name="note" value={form.note} onChange={handleChange} rows={2} placeholder="Giờ giao mong muốn, tầng lầu..." style={{ ...inputStyle, resize: "vertical" }} />
          </div>
          <div>
            <label style={labelStyle}>Phương thức thanh toán *</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--text)", cursor: "pointer" }}>
                <input type="radio" name="paymentMethod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
                Thanh toán khi nhận hàng (COD)
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--text)", cursor: "pointer" }}>
                <input type="radio" name="paymentMethod" checked={paymentMethod === "bank_transfer"} onChange={() => setPaymentMethod("bank_transfer")} />
                Chuyển khoản ngân hàng
              </label>
            </div>
          </div>
          {state === "error" && (
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "#D64545" }}>{errorMsg}</p>
          )}
          <button
            type="submit"
            disabled={state === "sending"}
            style={{ background: "#F07B20", color: "#fff", padding: "12px 24px", borderRadius: 8, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.95rem", border: "none", cursor: state === "sending" ? "wait" : "pointer", opacity: state === "sending" ? 0.7 : 1 }}
          >
            {state === "sending" ? "Đang đặt hàng..." : "Đặt hàng"}
          </button>
        </form>
      </div>
    </div>
  );
}
