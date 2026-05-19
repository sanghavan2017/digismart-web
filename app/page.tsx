import Link from "next/link";
import { products } from "@/data/products";

function formatPrice(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

function discount(orig: number, price: number) {
  return Math.round((1 - price / orig) * 100) + "%";
}

export default function Home() {
  const featured = products.slice(0, 4);

  return (
    <>
      {/* Hero */}
      background: "linear-gradient(135deg, #042C53 0%, #185FA5 60%, #378ADD 100%)"
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
          <div style={{ color: "#fff", maxWidth: 520 }}>
            <div style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.9)", fontSize: "0.8rem", padding: "4px 14px", borderRadius: 20, display: "inline-block", marginBottom: "1rem", fontWeight: 500 }}>
              ✦ Nhà phân phối chính thức BBG Unimax Vina
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", lineHeight: 1.2, marginBottom: "1rem" }}>
              Thiết bị gia dụng<br />
              <span style={{ color: "#f0a500" }}>chất lượng cao</span>
            </h1>
            <p style={{ fontSize: "1rem", opacity: 0.85, lineHeight: 1.7, marginBottom: "1.75rem" }}>
              Cung cấp máy gia dụng, thiết bị diệt côn trùng, thiết bị làm đẹp cho người tiêu dùng toàn quốc.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/san-pham" style={{ background: "#f0a500", color: "#fff", padding: "12px 28px", borderRadius: 28, fontSize: "0.95rem", fontWeight: 600, textDecoration: "none" }}>
                Xem sản phẩm
              </Link>
              <Link href="/lien-he" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.6)", padding: "12px 28px", borderRadius: 28, fontSize: "0.95rem", fontWeight: 500, textDecoration: "none" }}>
                Liên hệ ngay
              </Link>
            </div>
          </div>

          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {[
              { num: "5+", label: "Sản phẩm" },
              { num: "3", label: "Thương hiệu" },
              { num: "4", label: "Sàn TMĐT" },
            ].map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#f0a500", fontWeight: 700 }}>{s.num}</div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: "3rem 0", background: "#fff" }}>
        <div className="container">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", marginBottom: "1.5rem", color: "var(--brand)" }}>Danh mục sản phẩm</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {[
              { icon: "🦟", name: "Diệt côn trùng", desc: "Đèn diệt muỗi, bẫy côn trùng" },
              { icon: "🍳", name: "Thiết bị nhà bếp", desc: "Máy xay, ấm đun, nồi cơm" },
              { icon: "💆", name: "Chăm sóc cá nhân", desc: "Máy sấy tóc, thiết bị làm đẹp" },
            ].map(c => (
              <Link key={c.name} href={`/san-pham?cat=${encodeURIComponent(c.name)}`} style={{ background: "var(--brand-light)", borderRadius: 12, padding: "1.5rem", textDecoration: "none", display: "block", transition: "transform 0.2s" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{c.icon}</div>
                <div style={{ fontWeight: 600, color: "var(--brand)", marginBottom: "0.4rem" }}>{c.name}</div>
                <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>{c.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: "3rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", color: "var(--brand)" }}>Sản phẩm nổi bật</h2>
            <Link href="/san-pham" style={{ color: "var(--brand2)", fontWeight: 500, fontSize: "0.9rem", textDecoration: "none" }}>Xem tất cả →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
            {featured.map(p => (
              <Link key={p.id} href={`/san-pham/${p.id}`} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", textDecoration: "none", display: "block" }}>
                <div style={{ background: "var(--brand-light)", height: 150, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", position: "relative" }}>
                  {p.icon}
                  <span style={{ position: "absolute", top: 8, left: 8, background: "#f0a500", color: "#fff", fontSize: "0.7rem", fontWeight: 700, padding: "3px 8px", borderRadius: 10 }}>
                    -{discount(p.originalPrice, p.price)}
                  </span>
                </div>
                <div style={{ padding: "1rem" }}>
                  <div style={{ fontSize: "0.7rem", color: "var(--muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{p.brand}</div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.5rem", color: "var(--text)", lineHeight: 1.4 }}>{p.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--brand)" }}>{formatPrice(p.price)}</span>
                    <span style={{ fontSize: "0.8rem", color: "var(--muted)", textDecoration: "line-through" }}>{formatPrice(p.originalPrice)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ background: "var(--brand)", padding: "3rem 0", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "#fff", marginBottom: "0.75rem" }}>Cần tư vấn sản phẩm?</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "1.5rem", fontSize: "1rem" }}>Liên hệ ngay để được hỗ trợ nhanh nhất</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:0778886758" style={{ background: "#f0a500", color: "#fff", padding: "12px 28px", borderRadius: 28, fontWeight: 600, textDecoration: "none", fontSize: "0.95rem" }}>
              📞 Gọi ngay: 0778 886 758
            </a>
            <a href="https://zalo.me/0778886758" target="_blank" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.6)", padding: "12px 28px", borderRadius: 28, fontWeight: 500, textDecoration: "none", fontSize: "0.95rem" }}>
              💬 Chat Zalo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
