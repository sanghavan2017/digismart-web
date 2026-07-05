"use client";
import { useState } from "react";

type FormState = "idle" | "sending" | "sent";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [state, setState] = useState<FormState>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setTimeout(() => setState("sent"), 1000);
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

  if (state === "sent") {
    return (
      <div style={{ background: "#E6F8F0", border: "1.5px solid #52C98A", borderRadius: 10, padding: "2rem", textAlign: "center" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>✅</div>
        <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.1rem", color: "#1A6640", marginBottom: "0.5rem" }}>
          Đã nhận yêu cầu!
        </div>
        <p style={{ fontFamily: "var(--font-sans)", color: "#1A6640", fontSize: "0.9rem" }}>
          Chúng tôi sẽ liên hệ lại với bạn sớm nhất. Hoặc gọi ngay <strong>0778 886 758</strong> để được hỗ trợ nhanh hơn.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <label style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 600, color: "var(--brand)", display: "block", marginBottom: 6 }}>
          Họ và tên *
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Nguyễn Văn A"
          style={inputStyle}
        />
      </div>
      <div>
        <label style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 600, color: "var(--brand)", display: "block", marginBottom: 6 }}>
          Số điện thoại *
        </label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          type="tel"
          placeholder="0900 000 000"
          style={inputStyle}
        />
      </div>
      <div>
        <label style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 600, color: "var(--brand)", display: "block", marginBottom: 6 }}>
          Nội dung cần tư vấn *
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Tôi muốn hỏi về sản phẩm..."
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>
      <button
        type="submit"
        disabled={state === "sending"}
        style={{ background: "#F07B20", color: "#fff", padding: "12px 24px", borderRadius: 8, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.95rem", border: "none", cursor: state === "sending" ? "wait" : "pointer", opacity: state === "sending" ? 0.7 : 1 }}
      >
        {state === "sending" ? "Đang gửi..." : "Gửi yêu cầu tư vấn"}
      </button>
    </form>
  );
}
