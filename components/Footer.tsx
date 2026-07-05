import Link from "next/link";
import { categories } from "@/data/products";

export default function Footer() {
  return (
    <footer style={{ background: "var(--brand)", color: "rgba(255,255,255,0.75)", padding: "3rem 0 1.5rem" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, width: 20, height: 20 }}>
                {[0, 1, 2, 3].map(i => (
                  <div key={i} style={{ borderRadius: 2, background: i === 3 ? "#F07B20" : "rgba(255,255,255,0.8)" }} />
                ))}
              </div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "1.2rem", color: "#fff", fontWeight: 700 }}>
                Digi<span style={{ color: "#F07B20" }}>Smart</span>
              </span>
            </div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "0.5rem" }}>
              "Mua thông minh — Sống tiện nghi"
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", lineHeight: 1.6, marginBottom: "0.5rem" }}>
              Điều hòa, máy lọc nước chính hãng — lắp đặt tận nơi.
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", lineHeight: 1.6, color: "rgba(255,255,255,0.6)" }}>
              Hộ Kinh Doanh Digismart<br />
              📍 606/145/3C Đường Ba Tháng Hai, P. Diên Hồng, TP.HCM
            </p>
          </div>

          {/* Danh mục */}
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 700, color: "#fff", marginBottom: "0.75rem", fontSize: "0.9rem" }}>Danh mục</p>
            {categories.map(c => (
              <Link key={c.name} href={`/san-pham?cat=${encodeURIComponent(c.name)}`}
                style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", textDecoration: "none", marginBottom: "0.4rem" }}>
                {c.icon} {c.name}
              </Link>
            ))}
          </div>

          {/* Liên hệ */}
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 700, color: "#fff", marginBottom: "0.75rem", fontSize: "0.9rem" }}>Liên hệ</p>
            {[
              { icon: "📞", text: "0778 886 758", href: "tel:0778886758" },
              { icon: "💬", text: "Zalo: 0778886758", href: "https://zalo.me/0778886758" },
              { icon: "📘", text: "Facebook DigiSmart", href: "https://facebook.com/digismartvn" },
              { icon: "🎵", text: "TikTok @digismart85", href: "https://tiktok.com/@digismart85" },
            ].map(c => (
              <a key={c.text} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined}
                style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", textDecoration: "none", marginBottom: "0.4rem" }}>
                {c.icon} {c.text}
              </a>
            ))}
          </div>

          {/* Mua hàng */}
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 700, color: "#fff", marginBottom: "0.75rem", fontSize: "0.9rem" }}>Mua hàng ngay</p>
            {[
              { icon: "🛍️", text: "Shopee DigiSmart", href: "https://shopee.vn/digismart85" },
              { icon: "🎵", text: "TikTok Shop DigiSmart", href: "https://tiktok.com/@digismart85" },
            ].map(c => (
              <a key={c.text} href={c.href} target="_blank"
                style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", textDecoration: "none", marginBottom: "0.4rem" }}>
                {c.icon} {c.text}
              </a>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: "1.25rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", fontSize: "0.8rem", fontFamily: "var(--font-sans)" }}>
          <span>© 2026 DigiSmart. All rights reserved.</span>
          <div style={{ display: "flex", gap: "1.25rem" }}>
            <Link href="/chinh-sach-bao-mat" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Chính sách bảo mật</Link>
            <Link href="/bao-hanh-dieu-khoan" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Bảo hành &amp; Điều khoản</Link>
            <span style={{ color: "rgba(255,255,255,0.5)" }}>digismartvn.vn</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
