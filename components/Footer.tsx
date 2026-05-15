export default function Footer() {
  return (
    <footer style={{ background: "var(--brand)", color: "rgba(255,255,255,0.8)", padding: "3rem 0 1.5rem" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#fff", marginBottom: "0.75rem" }}>
              Digi<span style={{ color: "var(--accent)" }}>smart</span>
            </div>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.7 }}>Nhà phân phối chính thức BBG Unimax Vina. Thiết bị gia dụng chất lượng cao.</p>
          </div>

          <div>
            <p style={{ fontWeight: 600, color: "#fff", marginBottom: "0.75rem" }}>Danh mục</p>
            {["Diệt côn trùng", "Thiết bị nhà bếp", "Chăm sóc cá nhân"].map(c => (
              <a key={c} href="/san-pham" style={{ display: "block", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", textDecoration: "none", marginBottom: "0.4rem" }}>{c}</a>
            ))}
          </div>

          <div>
            <p style={{ fontWeight: 600, color: "#fff", marginBottom: "0.75rem" }}>Liên hệ</p>
            {[
              { icon: "📞", text: "0778 886 758", href: "tel:0778886758" },
              { icon: "💬", text: "Zalo: 0778886758", href: "https://zalo.me/0778886758" },
              { icon: "📘", text: "Facebook Digismart", href: "#" },
              { icon: "🎵", text: "TikTok Shop", href: "#" },
            ].map(c => (
              <a key={c.text} href={c.href} style={{ display: "block", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", textDecoration: "none", marginBottom: "0.4rem" }}>
                {c.icon} {c.text}
              </a>
            ))}
          </div>

          <div>
            <p style={{ fontWeight: 600, color: "#fff", marginBottom: "0.75rem" }}>Mua hàng ngay</p>
            {[
              { icon: "🛍️", text: "Shopee Digismart", href: "#" },
              { icon: "🛒", text: "Lazada Digismart", href: "#" },
              { icon: "🎵", text: "TikTok Shop", href: "#" },
            ].map(c => (
              <a key={c.text} href={c.href} target="_blank" style={{ display: "block", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", textDecoration: "none", marginBottom: "0.4rem" }}>
                {c.icon} {c.text}
              </a>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "1.25rem", textAlign: "center", fontSize: "0.8rem" }}>
          © 2026 Digismart — BBG Unimax Vina. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
