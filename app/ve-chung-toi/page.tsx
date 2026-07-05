import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Về chúng tôi — DigiSmart",
  description: "DigiSmart — chuyên cung cấp & lắp đặt Điều hòa, Máy lọc nước chính hãng tại TPHCM. Ngoài ra phân phối phụ kiện điện tử qua Shopee, Lazada, TikTok Shop.",
};

const values = [
  { icon: "✅", title: "Hàng chính hãng 100%", desc: "Mỗi sản phẩm đều có tem nhập khẩu, nguồn gốc rõ ràng, được kiểm định trước khi đến tay khách hàng." },
  { icon: "🔧", title: "Lắp đặt tận nơi", desc: "Điều hòa, máy lọc nước được kỹ thuật DigiSmart tư vấn và lắp đặt trực tiếp tại TPHCM." },
  { icon: "💬", title: "Tư vấn tận tâm", desc: "Đội ngũ tư vấn nhiệt tình, am hiểu sản phẩm, hỗ trợ qua Zalo và điện thoại mọi ngày." },
  { icon: "🛍️", title: "Phụ kiện đa kênh", desc: "Ngoài điều hòa & máy lọc nước, phụ kiện điện tử được phân phối qua Shopee, Lazada, TikTok Shop." },
];

const milestones = [
  { year: "2022", event: "Thành lập DigiSmart, bắt đầu kinh doanh trên Shopee" },
  { year: "2023", event: "Mở rộng sang Lazada và TikTok Shop, đạt 1.000+ đơn hàng" },
  { year: "2024", event: "Mở rộng sang lĩnh vực Điều hòa & Máy lọc nước, trở thành đại lý Cleansui & Kitz Micro Filter" },
  { year: "2025", event: "Ra mắt website digismartvn.vn" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #042C53 0%, #185FA5 70%, #378ADD 100%)", padding: "4rem 0" }}>
        <div className="container" style={{ textAlign: "center", color: "#fff" }}>
          <div style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.9)", fontSize: "0.8rem", padding: "4px 14px", borderRadius: 20, display: "inline-block", marginBottom: "1.25rem", fontWeight: 500 }}>
            ✦ Câu chuyện của chúng tôi
          </div>
          <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", marginBottom: "1rem" }}>
            Về <span style={{ color: "#F07B20" }}>DigiSmart</span>
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", opacity: 0.85, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            Chúng tôi tin rằng công nghệ chất lượng không cần phải đắt tiền — chỉ cần mua đúng chỗ, đúng sản phẩm.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ background: "#fff", padding: "4rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem", alignItems: "center" }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "1.6rem", color: "var(--brand)", marginBottom: "1rem" }}>
                Sứ mệnh của chúng tôi
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "var(--text)", lineHeight: 1.8, marginBottom: "1rem" }}>
                DigiSmart ra đời với sứ mệnh đưa Điều hòa và Máy lọc nước chính hãng — Cleansui, Kitz Micro Filter, Mitsubishi Electric, Daikin — đến tay người dùng Việt Nam với giá hợp lý nhất, cùng dịch vụ lắp đặt tận nơi tận tâm.
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "var(--text)", lineHeight: 1.8 }}>
                Chúng tôi làm việc trực tiếp với nhà phân phối uy tín, loại bỏ các khâu trung gian không cần thiết để mang lại giá trị thực sự cho khách hàng.
              </p>
            </div>
            <div style={{ background: "var(--brand-light)", borderRadius: 12, padding: "2.5rem", border: "1px solid var(--border)" }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", color: "var(--brand)", fontWeight: 700, marginBottom: "1.5rem" }}>
                Con số nổi bật
              </div>
              {[
                { num: "10.000+", label: "Khách hàng hài lòng" },
                { num: "50+", label: "Sản phẩm chính hãng" },
                { num: "4", label: "Sàn thương mại điện tử" },
                { num: "4.9⭐", label: "Đánh giá trung bình" },
              ].map(s => (
                <div key={s.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontFamily: "var(--font-sans)", color: "var(--muted)", fontSize: "0.9rem" }}>{s.label}</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, color: "#F07B20", fontSize: "1rem" }}>{s.num}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: "var(--bg)", padding: "4rem 0" }}>
        <div className="container">
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "1.5rem", color: "var(--brand)", marginBottom: "2rem", textAlign: "center" }}>
            Giá trị cốt lõi
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {values.map(v => (
              <div key={v.title} style={{ background: "#fff", borderRadius: 10, padding: "1.75rem", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{v.icon}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.95rem", color: "var(--brand)", marginBottom: "0.5rem" }}>{v.title}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.65 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: "#fff", padding: "4rem 0" }}>
        <div className="container">
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "1.5rem", color: "var(--brand)", marginBottom: "2rem", textAlign: "center" }}>
            Hành trình phát triển
          </h2>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            {milestones.map((m, i) => (
              <div key={m.year} style={{ display: "flex", gap: "1.5rem", marginBottom: i < milestones.length - 1 ? "1.5rem" : 0 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--brand)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.8rem" }}>
                    {m.year}
                  </div>
                  {i < milestones.length - 1 && (
                    <div style={{ width: 2, flex: 1, background: "var(--border)", marginTop: 6, minHeight: 28 }} />
                  )}
                </div>
                <div style={{ paddingTop: 10 }}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--text)", lineHeight: 1.6 }}>{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--brand)", padding: "3rem 0", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "1.7rem", color: "#fff", marginBottom: "0.75rem" }}>
            Bạn muốn hợp tác hoặc tìm hiểu thêm?
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.8)", marginBottom: "1.5rem" }}>
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:0778886758" style={{ background: "#F07B20", color: "#fff", padding: "12px 28px", borderRadius: 6, fontWeight: 700, textDecoration: "none", fontFamily: "var(--font-sans)" }}>
              📞 Gọi ngay: 0778 886 758
            </a>
            <a href="/lien-he" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.5)", padding: "12px 28px", borderRadius: 6, fontWeight: 500, textDecoration: "none", fontFamily: "var(--font-sans)" }}>
              Gửi tin nhắn
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
