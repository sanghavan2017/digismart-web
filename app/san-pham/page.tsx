import Link from "next/link";
import Image from "next/image";
import { products, categories, brands } from "@/data/products";
import LeadFormButton from "@/components/LeadFormButton";
import AddToCartButton from "@/components/AddToCartButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sản phẩm: Điều hòa & Máy lọc nước chính hãng — DigiSmart",
  description: "Điều hòa, máy lọc nước chính hãng (Cleansui, Kitz Micro Filter, Mitsubishi Electric, Daikin). Tư vấn miễn phí, lắp đặt tận nơi tại TPHCM.",
  alternates: { canonical: "/san-pham" },
};

function formatPrice(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}
function discountPct(orig: number, price: number) {
  return Math.round((1 - price / orig) * 100);
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { cat, brand } = await searchParams;
  const activeCat = typeof cat === "string" ? cat : "";
  const activeBrand = typeof brand === "string" ? brand : "";

  const filtered = products.filter(p =>
    (!activeCat || p.category === activeCat) &&
    (!activeBrand || p.brand === activeBrand)
  );

  function buildHref(next: { cat?: string; brand?: string }) {
    const params = new URLSearchParams();
    const c = next.cat !== undefined ? next.cat : activeCat;
    const b = next.brand !== undefined ? next.brand : activeBrand;
    if (c) params.set("cat", c);
    if (b) params.set("brand", b);
    const qs = params.toString();
    return qs ? `/san-pham?${qs}` : "/san-pham";
  }

  return (
    <>
      {/* Header */}
      <section style={{ background: "linear-gradient(135deg, #042C53 0%, #185FA5 100%)", padding: "2.5rem 0" }}>
        <div className="container">
          <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#fff", marginBottom: "0.5rem" }}>
            Sản phẩm <span style={{ color: "#F07B20" }}>chính hãng</span>
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.8)", fontSize: "0.95rem" }}>
            {filtered.length} sản phẩm
            {activeCat ? ` trong danh mục "${activeCat}"` : ""}
            {activeBrand ? ` · thương hiệu "${activeBrand}"` : ""}
          </p>
        </div>
      </section>

      <section style={{ padding: "2rem 0", background: "var(--bg)", minHeight: "60vh" }}>
        <div className="container">
          {/* Category Filters */}
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <Link href={buildHref({ cat: "" })}
              style={{ padding: "7px 18px", borderRadius: 20, textDecoration: "none", fontFamily: "var(--font-sans)", fontSize: "0.85rem", fontWeight: 600, background: !activeCat ? "var(--brand)" : "#fff", color: !activeCat ? "#fff" : "var(--brand)", border: `1.5px solid ${!activeCat ? "var(--brand)" : "var(--border)"}` }}>
              Tất cả danh mục
            </Link>
            {categories.map(c => (
              <Link key={c.name} href={buildHref({ cat: c.name })}
                style={{ padding: "7px 18px", borderRadius: 20, textDecoration: "none", fontFamily: "var(--font-sans)", fontSize: "0.85rem", fontWeight: 600, background: activeCat === c.name ? "var(--brand)" : "#fff", color: activeCat === c.name ? "#fff" : "var(--brand)", border: `1.5px solid ${activeCat === c.name ? "var(--brand)" : "var(--border)"}` }}>
                {c.icon} {c.name}
              </Link>
            ))}
          </div>

          {/* Brand Filters */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--muted)", marginRight: 4 }}>
              Thương hiệu:
            </span>
            <Link href={buildHref({ brand: "" })}
              style={{ padding: "5px 14px", borderRadius: 16, textDecoration: "none", fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 600, background: !activeBrand ? "var(--accent)" : "#fff", color: !activeBrand ? "#fff" : "var(--text)", border: `1.5px solid ${!activeBrand ? "var(--accent)" : "var(--border)"}` }}>
              Tất cả
            </Link>
            {brands.map(b => (
              <Link key={b} href={buildHref({ brand: b })}
                style={{ padding: "5px 14px", borderRadius: 16, textDecoration: "none", fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 600, background: activeBrand === b ? "var(--accent)" : "#fff", color: activeBrand === b ? "#fff" : "var(--text)", border: `1.5px solid ${activeBrand === b ? "var(--accent)" : "var(--border)"}` }}>
                {b}
              </Link>
            ))}
          </div>

          {/* Product Grid */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
              Không tìm thấy sản phẩm trong danh mục này.
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
              {filtered.map((p, idx) => (
                <Link key={p.id} href={`/san-pham/${p.id}`}
                  style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden", textDecoration: "none", display: "block", position: "relative" }}>
                  {/* Image area */}
                  <div style={{ background: "#fff", borderBottom: "1px solid var(--border)", height: 160, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3.5rem", position: "relative", overflow: "hidden" }}>
                    {p.imageUrl ? (
                      <Image src={p.imageUrl} alt={p.name} fill sizes="(max-width: 768px) 90vw, 240px" priority={idx < 4} style={{ objectFit: "contain", padding: "0.75rem" }} />
                    ) : (
                      p.icon
                    )}
                    {discountPct(p.originalPrice, p.price) > 0 && (
                      <span style={{ position: "absolute", top: 10, left: 10, background: "#F07B20", color: "#fff", fontSize: "0.7rem", fontWeight: 700, padding: "3px 9px", borderRadius: 4 }}>
                        -{discountPct(p.originalPrice, p.price)}%
                      </span>
                    )}
                    {!p.inStock && (
                      <span style={{ position: "absolute", top: 10, right: 10, background: "var(--muted)", color: "#fff", fontSize: "0.65rem", fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>
                        Hết hàng
                      </span>
                    )}
                  </div>
                  {/* Info */}
                  <div style={{ padding: "1rem" }}>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>
                      {p.brand} · {p.category}
                    </div>
                    <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.88rem", color: "var(--text)", lineHeight: 1.4, marginBottom: "0.6rem", minHeight: 40 }}>
                      {p.name}
                    </div>
                    {p.highlights && p.highlights.length > 0 && (
                      <div style={{ marginBottom: "0.75rem" }}>
                        <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.68rem", color: "var(--brand)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
                          Tính năng
                        </div>
                        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                          {p.highlights.map(h => (
                            <li key={h} style={{ display: "flex", gap: 6, alignItems: "flex-start", fontFamily: "var(--font-sans)", fontSize: "0.76rem", color: "var(--text)", lineHeight: 1.5, marginBottom: 2 }}>
                              <span style={{ color: "#F07B20", flexShrink: 0 }}>•</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", fontWeight: 700, color: "var(--brand2)" }}>
                        {formatPrice(p.price)}
                      </span>
                      {p.originalPrice > p.price && (
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--muted)", textDecoration: "line-through" }}>
                          {formatPrice(p.originalPrice)}
                        </span>
                      )}
                    </div>
                    <LeadFormButton productName={p.name} style={{ width: "100%", padding: "9px 0", borderRadius: 6, fontSize: "0.8rem" }}>
                      Nhận báo giá
                    </LeadFormButton>
                    {p.inStock && (
                      <AddToCartButton
                        product={{ id: p.id, name: p.name, price: p.price, imageUrl: p.imageUrl, icon: p.icon }}
                        style={{ width: "100%", padding: "8px 0", borderRadius: 6, fontSize: "0.8rem", marginTop: 8 }}
                      />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
