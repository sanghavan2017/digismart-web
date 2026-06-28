import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import LeadFormButton from "@/components/LeadFormButton";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

function formatPrice(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}
function discountPct(orig: number, price: number) {
  return Math.round((1 - price / orig) * 100);
}

export async function generateStaticParams() {
  return products.map(p => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products.find(p => p.id === id);
  if (!product) return { title: "Sản phẩm không tồn tại — DigiSmart" };
  return {
    title: `${product.name} — DigiSmart`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find(p => p.id === id);

  if (!product) notFound();

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ background: "#fff", borderBottom: "1px solid var(--border)", padding: "0.75rem 0" }}>
        <div className="container" style={{ display: "flex", gap: "0.5rem", fontFamily: "Calibri, sans-serif", fontSize: "0.85rem", color: "var(--muted)", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Trang chủ</Link>
          <span>/</span>
          <Link href="/san-pham" style={{ color: "var(--muted)", textDecoration: "none" }}>Sản phẩm</Link>
          <span>/</span>
          <Link href={`/san-pham?cat=${encodeURIComponent(product.category)}`} style={{ color: "var(--muted)", textDecoration: "none" }}>{product.category}</Link>
          <span>/</span>
          <span style={{ color: "var(--text)", fontWeight: 500 }}>{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <section style={{ background: "var(--bg)", padding: "2.5rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem" }}>
            {/* Left: Image */}
            <div>
              <div style={{ background: "#fff", borderRadius: 12, padding: "3rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8rem", border: "1px solid var(--border)", minHeight: 280, position: "relative", overflow: "hidden" }}>
                {product.imageUrl ? (
                  <Image src={product.imageUrl} alt={product.name} fill style={{ objectFit: "contain", padding: "2rem" }} />
                ) : (
                  product.icon
                )}
                <span style={{ position: "absolute", top: 14, left: 14, background: "#F07B20", color: "#fff", fontSize: "0.8rem", fontWeight: 700, padding: "4px 12px", borderRadius: 6 }}>
                  -{discountPct(product.originalPrice, product.price)}%
                </span>
                {!product.inStock && (
                  <span style={{ position: "absolute", top: 14, right: 14, background: "var(--muted)", color: "#fff", fontSize: "0.75rem", fontWeight: 700, padding: "4px 10px", borderRadius: 6 }}>
                    Hết hàng
                  </span>
                )}
              </div>
            </div>

            {/* Right: Info */}
            <div>
              <div style={{ fontFamily: "Calibri, sans-serif", fontSize: "0.75rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>
                {product.brand} · {product.category}
              </div>
              <h1 style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)", color: "var(--text)", lineHeight: 1.35, marginBottom: "1rem" }}>
                {product.name}
              </h1>

              {/* Price */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: "1.25rem", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "1.75rem", fontWeight: 700, color: "#F07B20" }}>
                  {formatPrice(product.price)}
                </span>
                <span style={{ fontFamily: "Calibri, sans-serif", fontSize: "1rem", color: "var(--muted)", textDecoration: "line-through" }}>
                  {formatPrice(product.originalPrice)}
                </span>
                <span style={{ background: "#FEF0E3", color: "#F07B20", fontFamily: "Trebuchet MS, sans-serif", fontWeight: 700, fontSize: "0.8rem", padding: "2px 8px", borderRadius: 4 }}>
                  Tiết kiệm {formatPrice(product.originalPrice - product.price)}
                </span>
              </div>

              {/* Description */}
              <p style={{ fontFamily: "Calibri, sans-serif", fontSize: "0.95rem", color: "var(--text)", lineHeight: 1.75, marginBottom: "1.5rem" }}>
                {product.description}
              </p>

              {/* Specs */}
              <div style={{ background: "#fff", borderRadius: 8, padding: "1.25rem", border: "1px solid var(--border)", marginBottom: "1.5rem" }}>
                <div style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "var(--brand)", marginBottom: "0.75rem" }}>
                  Thông số kỹ thuật
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {product.specs.map(s => (
                    <li key={s} style={{ fontFamily: "Calibri, sans-serif", fontSize: "0.88rem", color: "var(--text)", display: "flex", gap: 8 }}>
                      <span style={{ color: "#F07B20", flexShrink: 0 }}>✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <LeadFormButton productName={product.name} style={{ padding: "13px 24px", borderRadius: 8, fontSize: "0.95rem" }}>
                  📩 Nhận báo giá
                </LeadFormButton>
                {product.inStock ? (
                  <>
                    <a href="https://shopee.vn/digismart85" target="_blank" rel="noopener noreferrer"
                      style={{ background: "#F07B20", color: "#fff", padding: "13px 24px", borderRadius: 8, textAlign: "center", fontFamily: "Trebuchet MS, sans-serif", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
                      🛍️ Mua trên Shopee
                    </a>
                    <a href="https://tiktok.com/@digismart85" target="_blank" rel="noopener noreferrer"
                      style={{ background: "#fff", color: "var(--brand)", padding: "11px 16px", borderRadius: 8, textAlign: "center", fontFamily: "Trebuchet MS, sans-serif", fontWeight: 600, fontSize: "0.88rem", textDecoration: "none", border: "1.5px solid var(--border)" }}>
                      🎵 TikTok Shop DigiSmart
                    </a>
                    <a href="https://zalo.me/0778886758" target="_blank" rel="noopener noreferrer"
                      style={{ background: "var(--brand)", color: "#fff", padding: "11px 24px", borderRadius: 8, textAlign: "center", fontFamily: "Trebuchet MS, sans-serif", fontWeight: 600, fontSize: "0.88rem", textDecoration: "none" }}>
                      💬 Tư vấn qua Zalo
                    </a>
                  </>
                ) : (
                  <div style={{ background: "#f5f5f5", color: "var(--muted)", padding: "13px 24px", borderRadius: 8, textAlign: "center", fontFamily: "Trebuchet MS, sans-serif", fontWeight: 600, fontSize: "0.95rem", border: "1px solid var(--border)" }}>
                    Sản phẩm tạm hết hàng — Liên hệ để đặt trước
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section style={{ background: "#fff", padding: "3rem 0", borderTop: "1px solid var(--border)" }}>
          <div className="container">
            <h2 style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "1.3rem", color: "var(--brand)", marginBottom: "1.5rem" }}>
              Sản phẩm liên quan
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
              {related.map(p => (
                <Link key={p.id} href={`/san-pham/${p.id}`}
                  style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden", textDecoration: "none", display: "block" }}>
                  <div style={{ background: "#fff", borderBottom: "1px solid var(--border)", height: 130, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", position: "relative", overflow: "hidden" }}>
                    {p.imageUrl ? (
                      <Image src={p.imageUrl} alt={p.name} fill style={{ objectFit: "contain", padding: "0.5rem" }} />
                    ) : (
                      p.icon
                    )}
                  </div>
                  <div style={{ padding: "0.875rem" }}>
                    <div style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "var(--text)", lineHeight: 1.4, marginBottom: "0.4rem" }}>{p.name}</div>
                    <span style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "var(--brand2)" }}>{formatPrice(p.price)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
