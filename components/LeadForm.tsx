"use client";
import { useState } from "react";

type FormState = "idle" | "sending" | "sent" | "error";

export default function LeadForm({
  productName,
  onClose,
}: {
  productName?: string;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ name: "", phone: "", note: "" });
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
        body: JSON.stringify({ ...form, productName }),
      });
      if (!res.ok) throw new Error();
      setState("sent");
    } catch {
      setState("error");
    }
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

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(4,44,83,0.55)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: "1rem",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 12, padding: "2rem",
          width: "100%", maxWidth: 420, position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Đóng"
          style={{
            position: "absolute", top: 14, right: 14, background: "none", border: "none",
            fontSize: "1.3rem", color: "var(--muted)", cursor: "pointer", lineHeight: 1,
          }}
        >
          ✕
        </button>

        {state === "sent" ? (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>✅</div>
            <div style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--brand)", marginBottom: "0.5rem" }}>
              Đã nhận yêu cầu báo giá!
            </div>
            <p style={{ fontFamily: "Calibri, sans-serif", color: "var(--text)", fontSize: "0.9rem" }}>
              DigiSmart sẽ liên hệ lại với bạn sớm nhất. Hoặc gọi ngay <strong>0778 886 758</strong> để được tư vấn nhanh hơn.
            </p>
          </div>
        ) : (
          <>
            <h3 style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 700, fontSize: "1.15rem", color: "var(--brand)", marginBottom: "0.4rem" }}>
              Nhận báo giá
            </h3>
            <p style={{ fontFamily: "Calibri, sans-serif", fontSize: "0.85rem", color: "var(--muted)", marginBottom: "1.25rem" }}>
              {productName ? `Sản phẩm: ${productName}` : "Để lại thông tin, DigiSmart sẽ liên hệ báo giá cho bạn."}
            </p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "var(--brand)", display: "block", marginBottom: 6 }}>
                  Họ và tên *
                </label>
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Nguyễn Văn A" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "var(--brand)", display: "block", marginBottom: 6 }}>
                  Số điện thoại *
                </label>
                <input name="phone" value={form.phone} onChange={handleChange} required type="tel" placeholder="0900 000 000" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "var(--brand)", display: "block", marginBottom: 6 }}>
                  Ghi chú
                </label>
                <textarea name="note" value={form.note} onChange={handleChange} rows={3} placeholder="Nhu cầu của bạn..." style={{ ...inputStyle, resize: "vertical" }} />
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
                {state === "sending" ? "Đang gửi..." : "Gửi yêu cầu báo giá"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
