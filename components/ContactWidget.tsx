"use client";
import { useState } from "react";

const CHANNELS = [
  { key: "zalo", label: "Zalo", href: "https://zalo.me/0778886758", bg: "#0068FF", icon: "💬" },
  { key: "messenger", label: "Messenger", href: "https://facebook.com/digismartvn", bg: "linear-gradient(135deg, #00B2FF, #006AFF 50%, #A033FF, #FF5CA1)", icon: "🗨️" },
  { key: "phone", label: "Gọi điện", href: "tel:0778886758", bg: "#fff", border: "2px solid #FF3B30", icon: "📞" },
  { key: "email", label: "Email", href: "mailto:digismart606@gmail.com", bg: "#fff", border: "2px solid #FF3B30", icon: "✉️" },
];

export default function ContactWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "fixed", bottom: 20, left: 20, zIndex: 999, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, fontFamily: "var(--font-sans)" }}>
      {open &&
        CHANNELS.map((c, i) => (
          <a
            key={c.key}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
            title={c.label}
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: c.bg,
              border: c.border,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.3rem",
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              animation: `dgs-cw-in 0.2s ease ${i * 0.05}s backwards`,
            }}
          >
            {c.icon}
          </a>
        ))}
      <style>{`
        @keyframes dgs-cw-in {
          from { opacity: 0; transform: translateY(8px) scale(0.8); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Đóng liên hệ nhanh" : "Mở liên hệ nhanh"}
        style={{
          width: 54,
          height: 54,
          borderRadius: "50%",
          background: open ? "#fff" : "var(--brand)",
          border: open ? "2px solid var(--border)" : "none",
          color: open ? "var(--text)" : "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.4rem",
          boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
        }}
      >
        {open ? "✕" : "📲"}
      </button>
    </div>
  );
}
