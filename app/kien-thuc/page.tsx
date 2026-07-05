import LeadFormButton from "@/components/LeadFormButton";
import { articles } from "@/data/kienthuc";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kiến thức nước sạch — DigiSmart",
  description: "Chỉ số chất lượng nước, TDS bao nhiêu là an toàn, cách khắc phục vấn đề nguồn nước sinh hoạt — kiến thức hữu ích từ Mitsubishi Cleansui, tổng hợp bởi DigiSmart.",
};

export default function KienThucPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #042C53 0%, #185FA5 100%)", padding: "3.5rem 0" }}>
        <div className="container">
          <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", color: "#fff", marginBottom: "0.75rem" }}>
            Kiến thức <span style={{ color: "#F07B20" }}>nước sạch</span>
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.85)", fontSize: "1rem", maxWidth: 640 }}>
            Tổng hợp kiến thức hữu ích về chất lượng nước sinh hoạt, giúp anh/chị hiểu rõ hơn trước khi chọn giải pháp lọc nước phù hợp.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section style={{ padding: "3rem 0", background: "var(--bg)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {articles.map(a => (
              <div key={a.videoId} style={{ background: "#fff", borderRadius: 12, border: "1px solid var(--border)", overflow: "hidden" }}>
                <div style={{ position: "relative", paddingBottom: "56.25%" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${a.videoId}`}
                    title={a.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                  />
                </div>
                <div style={{ padding: "1.25rem" }}>
                  <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "var(--brand)", marginBottom: "0.5rem", lineHeight: 1.4 }}>
                    {a.title}
                  </h2>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--text)", lineHeight: 1.6 }}>
                    {a.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "3rem 0", background: "#fff" }}>
        <div className="container" style={{ maxWidth: 480, textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "1.2rem", color: "var(--brand)", marginBottom: "0.75rem" }}>
            Cần kiểm tra chất lượng nước nhà bạn?
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--text)", marginBottom: "1.5rem" }}>
            DigiSmart tư vấn miễn phí giải pháp máy lọc nước phù hợp với nguồn nước và nhu cầu gia đình bạn.
          </p>
          <LeadFormButton productName="Tư vấn chất lượng nước" style={{ padding: "14px 32px", borderRadius: 8, fontSize: "1rem", background: "#F07B20" }}>
            📩 Nhận tư vấn miễn phí
          </LeadFormButton>
        </div>
      </section>
    </>
  );
}
