import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import LeadFormButton from "@/components/LeadFormButton";
import AddToCartButton from "@/components/AddToCartButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lắp đặt điều hòa chính hãng tại TPHCM — DigiSmart",
  description:
    "Lắp đặt điều hòa Mitsubishi Electric, Daikin chính hãng tại TPHCM. Đội ngũ kỹ thuật chuyên nghiệp, bảo hành dài hạn, giá tốt nhất thị trường.",
  alternates: { canonical: "/dieu-hoa" },
};

function formatPrice(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}
function discountPct(orig: number, price: number) {
  return Math.round((1 - price / orig) * 100);
}
// Mitsubishi Electric/Daikin: bảo hành thân máy và máy nén khác nhau — số hiển thị là máy nén, ghi rõ để không gây hiểu lầm
function warrantyLabel(brand: string, years?: number) {
  if (years == null) return null;
  const isSplitWarranty = brand === "Mitsubishi Electric" || brand === "Daikin";
  return isSplitWarranty ? `Bảo hành máy nén ${years} năm` : `Bảo hành ${years} năm`;
}

const benefits = [
  { icon: "🛠️", title: "Kỹ thuật chuyên nghiệp", desc: "Đội ngũ kỹ thuật viên tay nghề cao, thi công nhanh gọn, đúng kỹ thuật." },
  { icon: "🏷️", title: "Hàng chính hãng 100%", desc: "Phân phối trực tiếp từ Mitsubishi Electric, Daikin — đầy đủ tem, phiếu bảo hành." },
  { icon: "🔧", title: "Bảo hành dài hạn", desc: "Bảo hành chính hãng đến 5 năm, hỗ trợ bảo trì tận nơi sau lắp đặt." },
  { icon: "💰", title: "Giá tốt, minh bạch", desc: "Báo giá rõ ràng trọn gói máy + công lắp đặt, không phát sinh chi phí." },
];

export default function DieuHoaPage() {
  const items = products.filter(p => p.category === "Điều hòa");

  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #042C53 0%, #185FA5 100%)", padding: "3.5rem 0" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", alignItems: "center" }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "#fff", lineHeight: 1.3, marginBottom: "1rem" }}>
              Lắp đặt điều hòa <span style={{ color: "#F07B20" }}>chính hãng</span> tại TPHCM
            </h1>
            <p style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.85)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              DigiSmart cung cấp & lắp đặt điều hòa Mitsubishi Electric, Daikin Inverter chính hãng — tư vấn công suất phù hợp, thi công nhanh chóng, bảo hành dài hạn.
            </p>
            <LeadFormButton productName="Dịch vụ lắp đặt điều hòa" style={{ padding: "14px 32px", borderRadius: 8, fontSize: "1rem", background: "#F07B20" }}>
              📩 Nhận báo giá ngay
            </LeadFormButton>
          </div>
          <div style={{ fontSize: "8rem", textAlign: "center" }}>❄️</div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: "3rem 0", background: "var(--bg)" }}>
        <div className="container">
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "1.4rem", color: "var(--brand)", textAlign: "center", marginBottom: "2rem" }}>
            Vì sao chọn DigiSmart?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
            {benefits.map(b => (
              <div key={b.title} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 10, padding: "1.5rem", textAlign: "center" }}>
                <div style={{ fontSize: "2.2rem", marginBottom: "0.75rem" }}>{b.icon}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1rem", color: "var(--brand)", marginBottom: "0.5rem" }}>
                  {b.title}
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--text)", lineHeight: 1.6 }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product list */}
      <section style={{ padding: "3rem 0", background: "#fff" }}>
        <div className="container">
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "1.4rem", color: "var(--brand)", marginBottom: "1.5rem" }}>
            Các dòng điều hòa đang phân phối
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {items.map(p => (
              <div key={p.id} style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
                <Link href={`/san-pham/${p.id}`} style={{ textDecoration: "none", display: "block" }}>
                  <div style={{ background: "#fff", borderBottom: "1px solid var(--border)", height: 150, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3.5rem", position: "relative", overflow: "hidden" }}>
                    {p.imageUrl ? (
                      <Image src={p.imageUrl} alt={p.name} fill sizes="(max-width: 768px) 90vw, 260px" style={{ objectFit: "contain", padding: "0.75rem" }} />
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
                      {p.brand} · {p.btu?.toLocaleString("vi-VN")} BTU {p.inverter ? "· Inverter" : ""}
                    </div>
                    <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.92rem", color: "var(--text)", lineHeight: 1.4, marginBottom: "0.6rem", minHeight: 40 }}>
                      {p.name}
                    </div>
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
                        + Công lắp đặt từ {formatPrice(p.price_install)}
                        {warrantyLabel(p.brand, p.warranty_years) && ` · ${warrantyLabel(p.brand, p.warranty_years)}`}
                      </p>
                    )}
                  </div>
                </Link>
                <div style={{ padding: "0 1rem 1rem" }}>
                  <LeadFormButton productName={p.name} style={{ width: "100%", padding: "10px 0", borderRadius: 6, fontSize: "0.82rem" }}>
                    Nhận báo giá
                  </LeadFormButton>
                  {p.inStock && (
                    <AddToCartButton
                      product={{ id: p.id, name: p.name, price: p.price, imageUrl: p.imageUrl, icon: p.icon }}
                      style={{ width: "100%", padding: "9px 0", borderRadius: 6, fontSize: "0.82rem", marginTop: 8 }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form CTA */}
      <section style={{ padding: "3rem 0", background: "var(--bg)" }}>
        <div className="container" style={{ maxWidth: 480, textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "1.3rem", color: "var(--brand)", marginBottom: "0.75rem" }}>
            Cần tư vấn chọn điều hòa phù hợp?
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", color: "var(--text)", marginBottom: "1.5rem" }}>
            Để lại thông tin, đội ngũ DigiSmart sẽ liên hệ tư vấn và báo giá lắp đặt miễn phí.
          </p>
          <LeadFormButton productName="Dịch vụ lắp đặt điều hòa" style={{ padding: "14px 32px", borderRadius: 8, fontSize: "1rem", background: "#F07B20" }}>
            📩 Nhận báo giá ngay
          </LeadFormButton>
        </div>
      </section>
    </>
  );
}
