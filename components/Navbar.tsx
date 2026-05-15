"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{ background: "var(--brand)", position: "sticky", top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#fff", letterSpacing: 0.5 }}>
            Digi<span style={{ color: "var(--accent)" }}>smart</span>
          </span>
        </Link>

        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {[
            { href: "/", label: "Trang chủ" },
            { href: "/san-pham", label: "Sản phẩm" },
            { href: "/ve-chung-toi", label: "Về chúng tôi" },
            { href: "/lien-he", label: "Liên hệ" },
          ].map((item) => (
            <Link key={item.href} href={item.href} style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }}>
              {item.label}
            </Link>
          ))}
          <a href="tel:0778886758" style={{ background: "var(--accent)", color: "#fff", padding: "8px 18px", borderRadius: 20, fontSize: "0.85rem", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
            📞 0778 886 758
          </a>
        </div>
      </div>
    </nav>
  );
}
