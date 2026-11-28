import Link from "next/link";
import { storeCategories } from "@/data/categories";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cửa hàng DigiSmart — Mua ngay máy lọc nước chính hãng",
  description:
    "Mua ngay máy lọc nước Cleansui (Mitsubishi Chemical), Kitz Micro Filter chính hãng — giao tận nơi, thanh toán COD hoặc chuyển khoản.",
  alternates: { canonical: "/cua-hang" },
};

export default function CuaHangHomePage() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, #042C53 0%, #185FA5 100%)", padding: "3.5rem 0" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "#fff", lineHeight: 1.3, marginBottom: "1rem" }}>
            Cửa hàng <span style={{ color: "#F07B20" }}>DigiSmart</span>
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.85)", fontSize: "1rem", lineHeight: 1.7 }}>
            Mua ngay, giao tận nơi, thanh toán COD hoặc chuyển khoản — không cần đặt lịch khảo sát.
          </p>
        </div>
      </section>

      {/* Danh mục Cửa hàng — hiện chỉ 1 danh mục; sẵn sàng thêm danh mục/thương hiệu
          mới sau này chỉ bằng cách thêm vào data/categories.ts (research.md R4) */}
      <section style={{ padding: "3rem 0", background: "var(--bg)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {storeCategories.map(c => (
              <Link key={c.slug} href={`/cua-hang/${c.slug}`} className="card-link"
                style={{ display: "block", textDecoration: "none", background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: "2rem" }}>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.2rem", color: "var(--brand)", marginBottom: "0.5rem" }}>
                  {c.label}
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.6, marginBottom: "1rem" }}>
                  {c.description}
                </p>
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.85rem", color: "var(--brand2)" }}>
                  Xem sản phẩm →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
