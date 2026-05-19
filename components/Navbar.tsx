"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{ background: "var(--brand)", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(4,44,83,0.15)" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          {/* Logo mark: 4 squares */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, width: 22, height: 22 }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{ borderRadius: 2, background: i === 3 ? "var(--accent)" : "rgba(255,255,255,0.85)" }} />
            ))}
          </div>
          <span style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "1.35rem", color: "#fff", fontWeight: 700, letterSpacing: 0.3 }}>
            Digi<span style={{ color: "var(--accent)" }}>Smart</span>
          </span>
        </Link>

        {/* Nav links */}
        <div style={{ display: "flex", gap: "1.75rem", alignItems: "center" }}>
          {[
            { href: "/", label: "Trang chủ" },
            { href: "/san-pham", label: "Sản phẩm" },
            { href: "/ve-chung-toi", label: "Về chúng tôi" },
            { href: "/lien-he", label: "Liên hệ" },
          ].map(item => (
            <Link key={item.href} href={item.href}
              style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: "0.88rem", fontWeight: 500, fontFamily: "Trebuchet MS, sans-serif" }}>
              {item.label}
            </Link>
          ))}
          <a href="tel:0778886758"
            style={{ background: "var(--accent)", color: "#fff", padding: "8px 18px", borderRadius: 20, fontSize: "0.85rem", fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap", fontFamily: "Trebuchet MS, sans-serif" }}>
            📞 0778 886 758
          </a>
        </div>
      </div>
    </nav>
  );
}
