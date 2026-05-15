"use client";
import { useState } from "react";
import Link from "next/link";
import { products, categories } from "@/data/products";

function formatPrice(n: number) { return n.toLocaleString("vi-VN") + "đ"; }
function discount(orig: number, price: number) { return Math.round((1 - price / orig) * 100) + "%"; }

export default function SanPhamPage() {
  const [activeCat, setActiveCat] = useState("Tất cả");
  const [search, setSearch] = useState("");

  const filtered = products.filter(p => {
    const matchCat = activeCat === "Tất cả" || p.category === activeCat;
    const q = search.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.shortDesc.toLowerCase().includes(q) || p.specs.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* Header */}
      <div style={{ background: "var(--brand)", padding: "2.5rem 0" }}>
        <div className="container">
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#fff", marginBottom: "0.5rem" }}>Sản phẩm</h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem" }}>Danh mục thiết bị gia dụng chính hãng</p>
        </div>
      </div>

      {/* Search */}
      <div style={{ background: "#fff", padding: "1.25rem 0", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ position: "relative", maxWidth: 560 }}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="🔍 Tìm theo tên, công dụng... VD: máy đuổi muỗi phòng ngủ"
              style={{ width: "100%", padding: "11px 16px", border: "1.5px solid var(--border)", borderRadius: 28, fontSize: "0.9rem", fontFamily: "inherit", outline: "none" }}
            />
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: 6 }}>✨ Tìm kiếm thông minh — nhập theo ngôn ngữ tự nhiên</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ padding: "1rem 0", background: "var(--bg)" }}>
        <div className="container" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              style={{ padding: "7px 18px", borderRadius: 20, border: "1.5px solid", borderColor: activeCat === cat ? "var(--brand2)" : "var(--border)", background: activeCat === cat ? "var(--brand-light)" : "#fff", color: activeCat === cat ? "var(--brand)" : "var(--muted)", fontWeight: activeCat === cat ? 600 : 400, fontSize: "0.85rem", cursor: "pointer", fontFamily: "inherit" }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div style={{ padding: "2rem 0 4rem" }}>
        <div className="container">
          <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "1rem" }}>{filtered.length} sản phẩm</p>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--muted)" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
              <p>Không tìm thấy sản phẩm phù hợp</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
              {filtered.map(p => (
                <div key={p.id} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
                  <div style={{ background: "var(--brand-light)", height: 140, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", position: "relative" }}>
                    {p.icon}
                    <span style={{ position: "absolute", top: 8, left: 8, background: "#f0a500", color: "#fff", fontSize: "0.68rem", fontWeight: 700, padding: "3px 8px", borderRadius: 10 }}>
                      -{discount(p.originalPrice, p.price)}
                    </span>
                  </div>
                  <div style={{ padding: "1rem" }}>
                    <div style={{ fontSize: "0.7rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{p.brand} · {p.sku}</div>
                    <div style={{ fontWeight: 600, fontSize: "0.88rem", marginBottom: 8, color: "var(--text)", lineHeight: 1.4 }}>{p.name}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginBottom: 10, borderTop: "1px solid var(--border)", paddingTop: 8 }}>{p.specs}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                      <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--brand)" }}>{formatPrice(p.price)}</span>
                      <span style={{ fontSize: "0.78rem", color: "var(--muted)", textDecoration: "line-through" }}>{formatPrice(p.originalPrice)}</span>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <Link href={`/san-pham/${p.id}`} style={{ flex: 1, background: "var(--brand)", color: "#fff", padding: "8px", borderRadius: 8, fontSize: "0.8rem", fontWeight: 600, textDecoration: "none", textAlign: "center" }}>
                        Xem chi tiết
                      </Link>
                      <a href="tel:0778886758" style={{ background: "var(--brand-light)", color: "var(--brand)", padding: "8px 10px", borderRadius: 8, fontSize: "0.8rem", textDecoration: "none" }}>
                        📞
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
