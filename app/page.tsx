import Link from "next/link";
import { products, categories } from "@/data/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DigiSmart — Phụ kiện điện tử chính hãng",
  description: "DigiSmart cung cấp phụ kiện điện tử chính hãng: chuột, bàn phím, tai nghe, SSD, sạc nhanh. Giao toàn quốc, bảo hành đầy đủ.",
};

function formatPrice(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}
function discountPct(orig: number, price: number) {
  return Math.round((1 - price / orig) * 100);
}

export default function HomePage() {
  const featured = products.filter(p => p.inStock).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #042C53 0%, #185FA5 70%, #378ADD 100%)", padding: "5rem 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
          <div style={{ color: "#fff", maxWidth: 560 }}>
            <div style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.9)", fontSize: "0.8rem", padding: "4px 14px", borderRadius: 20, display: "inline-block", marginBottom: "1.25rem", fontWeight: 500 }}>
              ✦ Phụ kiện điện tử chính hãng — Bảo hành đầy đủ
            </div>
            <h1 style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", lineHeight: 1.2, marginBottom: "0.75rem" }}>
              Công nghệ chính hãng<br />
              <span style={{ color: "#F07B20" }}>— Giá hợp lý nhất</span>
            </h1>
            <p style={{ fontFamily: "Calibri, sans-serif", fontSize: "1rem", opacity: 0.85, lineHeight: 1.7, marginBottom: "0.5rem" }}>
              "Mua thông minh — Sống tiện nghi"
            </p>
            <p style={{ fontFamily: "Calibri, sans-serif", fontSize: "0.9rem", opacity: 0.75, lineHeight: 1.7, marginBottom: "2rem" }}>
              Cáp sạc, tai nghe, pin dự phòng, phụ kiện điện thoại Remax — chính hãng, bảo hành đầy đủ.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/san-pham" style={{ background: "#F07B20", color: "#fff", padding: "12px 28px", borderRadius: 6, fontSize: "0.95rem", fontWeight: 700, textDecoration: "none", fontFamily: "Trebuchet MS, sans-serif" }}>
                Xem sản phẩm
              </Link>
              <Link href="/lien-he" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.5)", padding: "12px 28px", borderRadius: 6, fontSize: "0.95rem", fontWeight: 500, textDecoration: "none", fontFamily: "Trebuchet MS, sans-serif" }}>
                Liên hệ ngay
              </Link>
            </div>
          </div>

          <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
            {[
              { num: "50+", label: "Sản phẩm" },
              { num: "10K+", label: "Khách hàng" },
              { num: "4", label: "Sàn TMĐT" },
              { num: "100%", label: "Chính hãng" },
            ].map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "2rem", color: "#F07B20", fontWeight: 700 }}>{s.num}</div>
                <div style={{ fontFamily: "Calibri, sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.7)", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: "3rem 0", background: "#fff" }}>
        <div className="container">
          <h2 style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "1.5rem", marginBottom: "1.5rem", color: "var(--brand)" }}>
            Danh mục sản phẩm
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {categories.map(c => (
              <Link key={c.name} href={`/san-pham?cat=${encodeURIComponent(c.name)}`}
                style={{ background: "var(--brand-light)", borderRadius: 8, padding: "1.5rem", textDecoration: "none", display: "block", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: "2.2rem", marginBottom: "0.75rem" }}>{c.icon}</div>
                <div style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 700, color: "var(--brand)", marginBottom: "0.4rem" }}>{c.name}</div>
                <div style={{ fontFamily: "Calibri, sans-serif", fontSize: "0.85rem", color: "var(--muted)" }}>{c.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: "3rem 0", background: "var(--bg)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "1.5rem", color: "var(--brand)" }}>Sản phẩm nổi bật</h2>
            <Link href="/san-pham" style={{ color: "var(--brand2)", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", fontFamily: "Trebuchet MS, sans-serif" }}>
              Xem tất cả →
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
            {featured.map(p => (
              <Link key={p.id} href={`/san-pham/${p.id}`}
                style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden", textDecoration: "none", display: "block" }}>
                <div style={{ background: "var(--brand-light)", height: 150, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", position: "relative" }}>
                  {p.icon}
                  <span style={{ position: "absolute", top: 8, left: 8, background: "#F07B20", color: "#fff", fontSize: "0.7rem", fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>
                    -{discountPct(p.originalPrice, p.price)}%
                  </span>
                </div>
                <div style={{ padding: "1rem" }}>
                  <div style={{ fontFamily: "Calibri, sans-serif", fontSize: "0.7rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
                    {p.brand}
                  </div>
                  <div style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 700, fontSize: "0.88rem", marginBottom: "0.5rem", color: "var(--text)", lineHeight: 1.4 }}>
                    {p.name}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "var(--brand2)" }}>
                      {formatPrice(p.price)}
                    </span>
                    <span style={{ fontFamily: "Calibri, sans-serif", fontSize: "0.8rem", color: "var(--muted)", textDecoration: "line-through" }}>
                      {formatPrice(p.originalPrice)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section style={{ background: "#fff", padding: "2.5rem 0", borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
            {[
              { icon: "✅", title: "Hàng chính hãng", desc: "Nguồn gốc rõ ràng, bảo hành đầy đủ" },
              { icon: "🚀", title: "Giao hàng nhanh", desc: "Toàn quốc qua Shopee, Lazada, TikTok" },
              { icon: "💬", title: "Tư vấn 24/7", desc: "Hỗ trợ qua Zalo & điện thoại" },
              { icon: "🔄", title: "Đổi trả dễ dàng", desc: "Theo chính sách sàn TMĐT" },
            ].map(b => (
              <div key={b.title} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{b.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "var(--brand)", marginBottom: 3 }}>{b.title}</div>
                  <div style={{ fontFamily: "Calibri, sans-serif", fontSize: "0.82rem", color: "var(--muted)" }}>{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--brand)", padding: "3rem 0", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "1.7rem", color: "#fff", marginBottom: "0.75rem" }}>
            Cần tư vấn sản phẩm?
          </h2>
          <p style={{ fontFamily: "Calibri, sans-serif", color: "rgba(255,255,255,0.8)", marginBottom: "1.5rem" }}>
            Liên hệ ngay để được hỗ trợ nhanh nhất
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:0778886758" style={{ background: "#F07B20", color: "#fff", padding: "12px 28px", borderRadius: 6, fontWeight: 700, textDecoration: "none", fontFamily: "Trebuchet MS, sans-serif" }}>
              📞 Gọi ngay: 0778 886 758
            </a>
            <a href="https://zalo.me/0778886758" target="_blank" rel="noopener noreferrer" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.5)", padding: "12px 28px", borderRadius: 6, fontWeight: 500, textDecoration: "none", fontFamily: "Trebuchet MS, sans-serif" }}>
              💬 Chat Zalo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
