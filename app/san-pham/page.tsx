import Link from "next/link";
import { products } from "@/data/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sản phẩm: Điều hòa & Máy lọc nước chính hãng — DigiSmart",
  description: "Điều hòa, máy lọc nước chính hãng (Cleansui, Kitz Micro Filter, Mitsubishi Electric, Daikin). Tư vấn miễn phí, lắp đặt tận nơi tại TPHCM.",
  alternates: { canonical: "/san-pham" },
};

// Trang này trước đây là lưới lọc trộn cả Điều hòa + Máy lọc nước. Sau khi tách 2 cổng
// (xem specs/002-url-cua-hang-dich-vu/research.md quyết định R3), viết lại thành "mục
// lục" dẫn khách chọn đúng cổng — giữ nguyên URL/metadata để không mất SEO đã có, chỉ
// đổi nội dung. Vẫn liệt kê link tới từng sản phẩm (không chỉ 2 nút lớn) để giữ mạng
// link nội bộ tới 86 trang chi tiết sản phẩm cho Google crawl tiếp.
export default function ProductsPage() {
  const maylocnuoc = products.filter(p => p.category === "Máy lọc nước");
  const dieuhoa = products.filter(p => p.category === "Điều hòa");

  return (
    <>
      <section style={{ background: "linear-gradient(135deg, #042C53 0%, #185FA5 100%)", padding: "2.5rem 0" }}>
        <div className="container">
          <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#fff", marginBottom: "0.5rem" }}>
            Sản phẩm <span style={{ color: "#F07B20" }}>chính hãng</span>
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.8)", fontSize: "0.95rem" }}>
            DigiSmart có {products.length}+ sản phẩm thuộc 2 ngành hàng — chọn đúng nhu cầu bên dưới để xem đầy đủ.
          </p>
        </div>
      </section>

      <section style={{ padding: "2.5rem 0", background: "var(--bg)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", marginBottom: "2.5rem" }}>
            <Link href="/cua-hang" className="card-link"
              style={{ display: "block", textDecoration: "none", borderRadius: 12, padding: "2rem", background: "var(--brand)", color: "#fff" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🛒</div>
              <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.4rem" }}>
                Cửa hàng — Máy lọc nước
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", opacity: 0.85, marginBottom: "1rem" }}>
                Cleansui, Kitz Micro Filter — mua ngay, giao tận nơi, thanh toán COD hoặc chuyển khoản.
              </p>
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.85rem", color: "#F07B20" }}>
                Mua ngay →
              </span>
            </Link>
            <Link href="/dich-vu" className="card-link"
              style={{ display: "block", textDecoration: "none", borderRadius: 12, padding: "2rem", background: "#fff", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔧</div>
              <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.4rem", color: "var(--brand)" }}>
                Dịch vụ — Điều hòa
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--muted)", marginBottom: "1rem" }}>
                Mitsubishi Electric, Daikin — mua ngay hoặc đặt lịch khảo sát, tư vấn công suất, lắp đặt tận nơi tại TPHCM.
              </p>
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.85rem", color: "var(--brand2)" }}>
                Xem & đặt lịch khảo sát →
              </span>
            </Link>
          </div>

          {/* Danh sách link tới từng sản phẩm, gom theo ngành hàng — giữ mạng link nội bộ cho SEO */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", color: "var(--brand)", marginBottom: "1rem" }}>
                Toàn bộ máy lọc nước ({maylocnuoc.length})
              </h2>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {maylocnuoc.map(p => (
                  <li key={p.id}>
                    <Link href={`/san-pham/${p.id}`} style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--text)", textDecoration: "none" }}>
                      {p.brand} — {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", color: "var(--brand)", marginBottom: "1rem" }}>
                Toàn bộ điều hòa ({dieuhoa.length})
              </h2>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {dieuhoa.map(p => (
                  <li key={p.id}>
                    <Link href={`/san-pham/${p.id}`} style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--text)", textDecoration: "none" }}>
                      {p.brand} — {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
