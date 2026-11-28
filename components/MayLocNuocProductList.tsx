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
type PriceRange = "all" | "under-2m" | "2m-5m" | "5m-10m" | "over-10m";

function matchesPriceRange(price: number, range: PriceRange) {
  if (range === "under-2m") return price < 2_000_000;
  if (range === "2m-5m") return price >= 2_000_000 && price < 5_000_000;
  if (range === "5m-10m") return price >= 5_000_000 && price < 10_000_000;
  if (range === "over-10m") return price >= 10_000_000;
  return true;
}

// Lọc theo thương hiệu/khoảng giá/tồn kho + sắp xếp theo giá (FR-006, US3 trong
// specs/002-url-cua-hang-dich-vu/spec.md). Giữ ở component này (không đẩy lên page)
// để tái dùng được nguyên vẹn sort đã có từ trước, không phá vỡ hành vi cũ.
export default function MayLocNuocProductList({ items }: { items: Product[] }) {
  const [sort, setSort] = useState<SortOption>("default");
  const [brand, setBrand] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [inStockOnly, setInStockOnly] = useState(false);

  const brands = useMemo(() => Array.from(new Set(items.map(p => p.brand))), [items]);

  const filteredItems = useMemo(() => {
    return items.filter(p =>
      (brand === "all" || p.brand === brand) &&
      matchesPriceRange(p.price, priceRange) &&
      (!inStockOnly || p.inStock)
    );
  }, [items, brand, priceRange, inStockOnly]);

  const sortedItems = useMemo(() => {
    if (sort === "price-asc") return [...filteredItems].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...filteredItems].sort((a, b) => b.price - a.price);
    return filteredItems;
  }, [filteredItems, sort]);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center", marginBottom: "1.25rem" }}>
        {brands.length > 1 && (
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button type="button" onClick={() => setBrand("all")}
              style={{ padding: "6px 14px", borderRadius: 16, fontFamily: "var(--font-sans)", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", background: brand === "all" ? "var(--brand)" : "#fff", color: brand === "all" ? "#fff" : "var(--brand)", border: `1.5px solid ${brand === "all" ? "var(--brand)" : "var(--border)"}` }}>
              Tất cả thương hiệu
            </button>
            {brands.map(b => (
              <button key={b} type="button" onClick={() => setBrand(b)}
                style={{ padding: "6px 14px", borderRadius: 16, fontFamily: "var(--font-sans)", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", background: brand === b ? "var(--brand)" : "#fff", color: brand === b ? "#fff" : "var(--brand)", border: `1.5px solid ${brand === b ? "var(--brand)" : "var(--border)"}` }}>
                {b}
              </button>
            ))}
          </div>
        )}

        <select
          value={priceRange}
          onChange={e => setPriceRange(e.target.value as PriceRange)}
          aria-label="Lọc theo khoảng giá"
          style={{ padding: "8px 14px", border: "1.5px solid var(--border)", borderRadius: 8, fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--text)", background: "#fff" }}
        >
          <option value="all">Mọi khoảng giá</option>
          <option value="under-2m">Dưới 2 triệu</option>
          <option value="2m-5m">2 - 5 triệu</option>
          <option value="5m-10m">5 - 10 triệu</option>
          <option value="over-10m">Trên 10 triệu</option>
        </select>

        <label style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--text)", cursor: "pointer" }}>
          <input type="checkbox" checked={inStockOnly} onChange={e => setInStockOnly(e.target.checked)} />
          Chỉ hiện còn hàng
        </label>

        <select
          value={sort}
          onChange={e => setSort(e.target.value as SortOption)}
          aria-label="Sắp xếp theo giá"
          style={{ marginLeft: "auto", padding: "8px 14px", border: "1.5px solid var(--border)", borderRadius: 8, fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--text)", background: "#fff" }}
        >
          <option value="default">Mặc định</option>
          <option value="price-asc">Giá: thấp đến cao</option>
          <option value="price-desc">Giá: cao đến thấp</option>
        </select>
      </div>
      {sortedItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem 0", color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
          Không tìm thấy sản phẩm phù hợp — thử bỏ bớt điều kiện lọc.
        </div>
      ) : (
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
                {p.originalPrice > p.price && (
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.76rem", color: "#2E9E5B", fontWeight: 600, marginBottom: "0.3rem" }}>
                    Tiết kiệm {formatPrice(p.originalPrice - p.price)}
                  </p>
                )}
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
      )}
    </>
  );
}
