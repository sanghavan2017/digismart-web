import { products } from "@/data/products";
import Link from "next/link";
import { notFound } from "next/navigation";

function formatPrice(n: number) { return n.toLocaleString("vi-VN") + "đ"; }
function discount(orig: number, price: number) { return Math.round((1 - price / orig) * 100) + "%"; }

export function generateStaticParams() {
  return products.map(p => ({ id: p.id }));
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);
  if (!product) notFound();

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div style={{ padding: "2rem 0 4rem" }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "1.5rem" }}>
          <Link href="/" style={{ color: "var(--brand2)", textDecoration: "none" }}>Trang chủ</Link>
          {" / "}
          <Link href="/san-pham" style={{ color: "var(--brand2)", textDecoration: "none" }}>Sản phẩm</Link>
          {" / "}
          {product.name}
        </div>

        {/* Main */}
        <div style={{ display: "grid", gridTemplateColumns: "minmax(280px, 420px) 1fr", gap: "2.5rem", flexWrap: "wrap" as const }}>
          {/* Image */}
          <div>
            <div style={{ background: "var(--brand-light)", borderRadius: 16, height: 320, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "6rem", position: "relative", marginBottom: "1rem" }}>
              {product.icon}
              <span style={{ position: "absolute", top: 12, left: 12, background: "#f0a500", color: "#fff", fontSize: "0.8rem", fontWeight: 700, padding: "4px 12px", borderRadius: 12 }}>
                -{discount(product.originalPrice, product.price)}
              </span>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {product.shopeeLink && (
                <a href={product.shopeeLink} target="_blank" style={{ flex: 1, background: "#ee4d2d", color: "#fff", padding: "10px", borderRadius: 8, textAlign: "center", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600 }}>
                  🛍️ Mua Shopee
                </a>
              )}
              {product.lazadaLink && (
                <a href={product.lazadaLink} target="_blank" style={{ flex: 1, background: "#0f146d", color: "#fff", padding: "10px", borderRadius: 8, textAlign: "center", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600 }}>
                  🛒 Mua Lazada
                </a>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <div style={{ fontSize: "0.78rem", color: "var(--muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>
              {product.brand} · {product.sku}
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", marginBottom: "1rem", lineHeight: 1.3, color: "var(--text)" }}>{product.name}</h1>

            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: "1.25rem" }}>
              <span style={{ fontSize: "2rem", fontWeight: 700, color: "var(--brand)" }}>{formatPrice(product.price)}</span>
              <span style={{ fontSize: "1rem", color: "var(--muted)", textDecoration: "line-through" }}>{formatPrice(product.originalPrice)}</span>
              <span style={{ background: "#fff3cd", color: "#856404", padding: "3px 10px", borderRadius: 10, fontSize: "0.8rem", fontWeight: 600 }}>
                Tiết kiệm {formatPrice(product.originalPrice - product.price)}
              </span>
            </div>

            <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.5rem", fontSize: "0.95rem" }}>{product.shortDesc}</p>

            {/* Specs */}
            <div style={{ background: "var(--brand-light)", borderRadius: 10, padding: "1rem 1.25rem", marginBottom: "1.5rem" }}>
              <p style={{ fontWeight: 600, color: "var(--brand)", marginBottom: "0.75rem", fontSize: "0.9rem" }}>Thông số kỹ thuật</p>
              {product.specs.split(" | ").map(spec => (
                <div key={spec} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: "0.88rem" }}>
                  <span style={{ color: "var(--brand2)" }}>✓</span>
                  <span>{spec}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" as const }}>
              <a href="tel:0778886758" style={{ flex: 1, minWidth: 160, background: "var(--brand)", color: "#fff", padding: "13px 20px", borderRadius: 10, fontWeight: 600, textDecoration: "none", textAlign: "center", fontSize: "0.95rem" }}>
                📞 Gọi đặt hàng
              </a>
              <a href="https://zalo.me/0778886758" target="_blank" style={{ flex: 1, minWidth: 160, background: "var(--brand-light)", color: "var(--brand)", border: "1.5px solid var(--brand2)", padding: "13px 20px", borderRadius: 10, fontWeight: 600, textDecoration: "none", textAlign: "center", fontSize: "0.95rem" }}>
                💬 Chat Zalo
              </a>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: "4rem" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", marginBottom: "1.25rem", color: "var(--brand)" }}>Sản phẩm cùng danh mục</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
              {related.map(p => (
                <Link key={p.id} href={`/san-pham/${p.id}`} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", textDecoration: "none" }}>
                  <div style={{ background: "var(--brand-light)", height: 120, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem" }}>{p.icon}</div>
                  <div style={{ padding: "0.875rem" }}>
                    <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text)", marginBottom: 6 }}>{p.name}</div>
                    <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--brand)" }}>{formatPrice(p.price)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
