import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dịch vụ DigiSmart — Lắp đặt điều hòa, tư vấn & hỗ trợ khách hàng",
  description:
    "DigiSmart tư vấn, khảo sát và lắp đặt điều hòa Mitsubishi Electric, Daikin chính hãng tại TPHCM. Xem thêm Về chúng tôi, Kiến thức, Liên hệ.",
  alternates: { canonical: "/dich-vu" },
};

const links = [
  {
    href: "/dich-vu/dieu-hoa",
    icon: "❄️",
    title: "Lắp đặt điều hòa",
    desc: "Mitsubishi Electric, Daikin — khảo sát miễn phí, tư vấn công suất, mua ngay hoặc đặt lịch tư vấn trước.",
    cta: "Xem điều hòa →",
  },
  {
    href: "/ve-chung-toi",
    icon: "🏢",
    title: "Về chúng tôi",
    desc: "DigiSmart là ai, cam kết chất lượng và dịch vụ với khách hàng.",
    cta: "Tìm hiểu thêm →",
  },
  {
    href: "/kien-thuc",
    icon: "📘",
    title: "Kiến thức",
    desc: "Bài viết tư vấn chọn điều hòa, máy lọc nước đúng nhu cầu, công nghệ Inverter, BTU, TDS...",
    cta: "Xem bài viết →",
  },
  {
    href: "/lien-he",
    icon: "📞",
    title: "Liên hệ",
    desc: "Hotline, Zalo, địa chỉ — hỗ trợ tư vấn nhanh chóng.",
    cta: "Liên hệ ngay →",
  },
];

export default function DichVuHubPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, #042C53 0%, #185FA5 100%)", padding: "3.5rem 0" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "#fff", lineHeight: 1.3, marginBottom: "1rem" }}>
            Dịch vụ <span style={{ color: "#F07B20" }}>DigiSmart</span>
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.85)", fontSize: "1rem", lineHeight: 1.7 }}>
            Tư vấn, khảo sát và lắp đặt điều hòa chính hãng tận nơi tại TPHCM — cùng các thông tin hỗ trợ khách hàng khác.
          </p>
        </div>
      </section>

      <section style={{ padding: "3rem 0", background: "var(--bg)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {links.map(l => (
              <Link key={l.href} href={l.href} className="card-link"
                style={{ display: "block", textDecoration: "none", background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: "1.75rem" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.6rem" }}>{l.icon}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.05rem", color: "var(--brand)", marginBottom: "0.4rem" }}>
                  {l.title}
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                  {l.desc}
                </p>
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.85rem", color: "var(--brand2)" }}>
                  {l.cta}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
