"use client";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/ve-chung-toi", label: "Về chúng tôi" },
  { href: "/lien-he", label: "Liên hệ" },
];

const serviceLinks = [
  { href: "/dieu-hoa", label: "Lắp đặt điều hòa" },
  { href: "/may-loc-nuoc", label: "Máy lọc nước" },
];

const linkStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.85)",
  textDecoration: "none",
  fontSize: "0.88rem",
  fontWeight: 500,
  fontFamily: "Trebuchet MS, sans-serif",
  whiteSpace: "nowrap",
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);

  return (
    <nav style={{ background: "var(--brand)", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(4,44,83,0.15)" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, width: 22, height: 22 }}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{ borderRadius: 2, background: i === 3 ? "var(--accent)" : "rgba(255,255,255,0.85)" }} />
            ))}
          </div>
          <span style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "1.35rem", color: "#fff", fontWeight: 700, letterSpacing: 0.3 }}>
            Digi<span style={{ color: "var(--accent)" }}>Smart</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="nav-links">
          {navLinks.map(item => (
            <Link key={item.href} href={item.href} style={linkStyle}>
              {item.label}
            </Link>
          ))}

          {/* Dịch vụ dropdown */}
          <div
            onMouseEnter={() => setServiceOpen(true)}
            onMouseLeave={() => setServiceOpen(false)}
            style={{ position: "relative" }}
          >
            <span style={{ ...linkStyle, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}>
              Dịch vụ <span style={{ fontSize: "0.7rem" }}>▾</span>
            </span>
            {serviceOpen && (
              <div style={{
                position: "absolute", top: "100%", left: 0, marginTop: 6,
                background: "#fff", borderRadius: 8, boxShadow: "0 8px 24px rgba(4,44,83,0.18)",
                minWidth: 180, overflow: "hidden", zIndex: 200,
              }}>
                {serviceLinks.map(item => (
                  <Link key={item.href} href={item.href}
                    style={{ display: "block", padding: "10px 16px", color: "var(--brand)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 500, fontFamily: "Trebuchet MS, sans-serif", borderBottom: "1px solid var(--border)" }}>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <a href="tel:0778886758"
            style={{ background: "var(--accent)", color: "#fff", padding: "8px 18px", borderRadius: 20, fontSize: "0.85rem", fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap", fontFamily: "Trebuchet MS, sans-serif" }}>
            📞 0778 886 758
          </a>
        </div>

        {/* Hamburger */}
        <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          <span style={{ display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "transform 0.2s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s" }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "transform 0.2s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="nav-mobile" style={{ background: "#032447", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "0.5rem 1.5rem 1rem" }}>
          {navLinks.map(item => (
            <Link key={item.href} href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{ display: "block", color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: "0.92rem", fontWeight: 500, padding: "0.75rem 0", borderBottom: "1px solid rgba(255,255,255,0.08)", fontFamily: "Trebuchet MS, sans-serif" }}>
              {item.label}
            </Link>
          ))}

          {/* Dịch vụ (mobile) */}
          <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <button
              onClick={() => setMobileServiceOpen(o => !o)}
              style={{ width: "100%", textAlign: "left", background: "none", border: "none", color: "rgba(255,255,255,0.85)", fontSize: "0.92rem", fontWeight: 500, padding: "0.75rem 0", fontFamily: "Trebuchet MS, sans-serif", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              Dịch vụ <span style={{ fontSize: "0.7rem" }}>{mobileServiceOpen ? "▴" : "▾"}</span>
            </button>
            {mobileServiceOpen && (
              <div style={{ paddingLeft: "1rem", paddingBottom: "0.5rem" }}>
                {serviceLinks.map(item => (
                  <Link key={item.href} href={item.href}
                    onClick={() => { setMenuOpen(false); setMobileServiceOpen(false); }}
                    style={{ display: "block", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.88rem", padding: "0.5rem 0", fontFamily: "Trebuchet MS, sans-serif" }}>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <a href="tel:0778886758"
            style={{ display: "block", marginTop: "1rem", background: "var(--accent)", color: "#fff", padding: "11px 0", borderRadius: 8, fontSize: "0.9rem", fontWeight: 700, textDecoration: "none", textAlign: "center", fontFamily: "Trebuchet MS, sans-serif" }}>
            📞 0778 886 758
          </a>
        </div>
      )}
    </nav>
  );
}
