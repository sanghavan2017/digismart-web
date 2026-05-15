export default function LienHePage() {
  return (
    <>
      <div style={{ background: "var(--brand)", padding: "2.5rem 0" }}>
        <div className="container">
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#fff" }}>Liên hệ</h1>
          <p style={{ color: "rgba(255,255,255,0.75)", marginTop: "0.5rem" }}>Chúng tôi sẵn sàng hỗ trợ bạn</p>
        </div>
      </div>

      <div style={{ padding: "3rem 0 5rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", flexWrap: "wrap" as const }}>
            {/* Contact Info */}
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "var(--brand)", marginBottom: "1.5rem" }}>Thông tin liên hệ</h2>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
                {[
                  { icon: "📞", label: "Điện thoại / Zalo", value: "0778 886 758", href: "tel:0778886758" },
                  { icon: "💬", label: "Chat Zalo", value: "Nhắn tin ngay", href: "https://zalo.me/0778886758" },
                  { icon: "📘", label: "Facebook", value: "Digismart Vietnam", href: "#" },
                  { icon: "🎵", label: "TikTok Shop", value: "@digismart.vn", href: "#" },
                  { icon: "🛍️", label: "Shopee", value: "Digismart Official", href: "#" },
                  { icon: "🛒", label: "Lazada", value: "Digismart Store", href: "#" },
                ].map(c => (
                  <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : "_self"}
                    style={{ display: "flex", alignItems: "center", gap: "1rem", background: "var(--brand-light)", borderRadius: 10, padding: "1rem 1.25rem", textDecoration: "none" }}>
                    <span style={{ fontSize: "1.5rem" }}>{c.icon}</span>
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: 2 }}>{c.label}</div>
                      <div style={{ fontWeight: 600, color: "var(--brand)", fontSize: "0.95rem" }}>{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "var(--brand)", marginBottom: "1.5rem" }}>Đặt hàng nhanh</h2>
              <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: "1.5rem" }}>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  Để đặt hàng hoặc được tư vấn, vui lòng liên hệ trực tiếp qua:
                </p>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
                  <a href="tel:0778886758" style={{ background: "var(--brand)", color: "#fff", padding: "14px", borderRadius: 10, textAlign: "center", textDecoration: "none", fontWeight: 600, fontSize: "1rem" }}>
                    📞 Gọi: 0778 886 758
                  </a>
                  <a href="https://zalo.me/0778886758" target="_blank" style={{ background: "#0068ff", color: "#fff", padding: "14px", borderRadius: 10, textAlign: "center", textDecoration: "none", fontWeight: 600, fontSize: "1rem" }}>
                    💬 Nhắn Zalo ngay
                  </a>
                  <a href="#" target="_blank" style={{ background: "#1877f2", color: "#fff", padding: "14px", borderRadius: 10, textAlign: "center", textDecoration: "none", fontWeight: 600, fontSize: "1rem" }}>
                    📘 Nhắn Facebook
                  </a>
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--muted)", textAlign: "center", marginTop: "1rem" }}>
                  Thời gian hỗ trợ: 8:00 – 21:00 hàng ngày
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
