"use client";
import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { Product } from "@/data/products";
import LeadFormButton from "./LeadFormButton";
import AddToCartButton from "./AddToCartButton";
import BuyNowButton from "./BuyNowButton";

function formatPrice(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}
function discountPct(orig: number, price: number) {
  return Math.round((1 - price / orig) * 100);
}

type SortOption = "default" | "price-asc" | "price-desc";

export default function MayLocNuocProductList({ items }: { items: Product[] }) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedItems = useMemo(() => {
    if (sort === "price-asc") return [...items].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...items].sort((a, b) => b.price - a.price);
    return items;
  }, [items, sort]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.25rem" }}>
        <select
          value={sort}
          onChange={e => setSort(e.target.value as SortOption)}
          aria-label="Sắp xếp theo giá"
          style={{ padding: "8px 14px", border: "1.5px solid var(--border)", borderRadius: 8, fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--text)", background: "#fff" }}
        >
          <option value="default">Mặc định</option>
          <option value="price-asc">Giá: thấp đến cao</option>
          <option value="price-desc">Giá: cao đến thấp</option>
        </select>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
        {sortedItems.map((p, idx) => (
          <div key={p.id} style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
            <Link href={`/san-pham/${p.id}`} style={{ textDecoration: "none", display: "block" }}>
              <div style={{ background: "#fff", borderBottom: "1px solid var(--border)", height: 150, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3.5rem", position: "relative", overflow: "hidden" }}>
                {p.imageUrl ? (
                  <Image src={p.imageUrl} alt={p.name} fill sizes="(max-width: 768px) 90vw, 260px" priority={idx < 4} style={{ objectFit: "contain", padding: "0.75rem" }} />
                ) : (
                  p.icon
                )}
                {discountPct(p.originalPrice, p.price) > 0 && (
                  <span style={{ position: "absolute", top: 10, left: 10, background: "#F07B20", color: "#fff", fontSize: "0.7rem", fontWeight: 700, padding: "3px 9px", borderRadius: 4 }}>
                    -{discountPct(p.originalPrice, p.price)}%
                  </span>
                )}
              </div>
              <div style={{ padding: "1rem 1rem 0" }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>
                  {p.brand}
                  {p.stages ? ` · ${p.stages} cấp lọc` : ""}
                  {p.has_hot && p.has_cold ? " · Nóng lạnh" : p.has_cold ? " · Có lạnh" : p.has_hot ? " · Có nóng" : ""}
                </div>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.92rem", color: "var(--text)", lineHeight: 1.4, marginBottom: "0.6rem", minHeight: 40 }}>
                  {p.name}
                </div>
                {p.highlights && p.highlights.length > 0 && (
                  <div style={{ marginBottom: "0.75rem" }}>
                    <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.68rem", color: "var(--brand)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
                      Tính năng
                    </div>
                    <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                      {p.highlights.map(h => (
                        <li key={h} style={{ display: "flex", gap: 6, alignItems: "flex-start", fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--text)", lineHeight: 1.5, marginBottom: 2 }}>
                          <span style={{ color: "#F07B20", flexShrink: 0 }}>•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: "0.4rem" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", fontWeight: 700, color: "var(--brand2)" }}>
                    {formatPrice(p.price)}
                  </span>
                  {p.originalPrice > p.price && (
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--muted)", textDecoration: "line-through" }}>
                      {formatPrice(p.originalPrice)}
                    </span>
                  )}
                </div>
                {p.price_install != null && (
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--muted)", marginBottom: "0.6rem" }}>
                    + Công lắp đặt từ {formatPrice(p.price_install)} · Bảo hành {p.warranty_years} năm
                  </p>
                )}
              </div>
            </Link>
            <div style={{ padding: "0 1rem 1rem" }}>
              {p.inStock && (
                <BuyNowButton
                  product={{ id: p.id, name: p.name, price: p.price, imageUrl: p.imageUrl, icon: p.icon }}
                  style={{ width: "100%", padding: "10px 0", borderRadius: 6, fontSize: "0.85rem", marginBottom: 8 }}
                />
              )}
              <div style={{ display: "flex", gap: 8 }}>
                {p.inStock && (
                  <AddToCartButton
                    product={{ id: p.id, name: p.name, price: p.price, imageUrl: p.imageUrl, icon: p.icon }}
                    style={{ flex: 1, padding: "9px 0", borderRadius: 6, fontSize: "0.8rem" }}
                  />
                )}
                <LeadFormButton productName={p.name} style={{ flex: 1, padding: "9px 0", borderRadius: 6, fontSize: "0.8rem" }}>
                  Nhận báo giá
                </LeadFormButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
