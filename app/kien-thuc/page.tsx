import Link from "next/link";
import LeadFormButton from "@/components/LeadFormButton";
import { articles, posts } from "@/data/kienthuc";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kiến thức điều hòa & nước sạch — DigiSmart",
  description: "Chọn công suất điều hòa theo m², Inverter có đáng tiền, TDS bao nhiêu an toàn, bao lâu thay lõi lọc — cẩm nang mua sắm và sử dụng từ DigiSmart, có nguồn tham khảo rõ ràng.",
  alternates: { canonical: "/kien-thuc" },
};

export default function KienThucPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #042C53 0%, #185FA5 100%)", padding: "3.5rem 0" }}>
        <div className="container">
          <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", color: "#fff", marginBottom: "0.75rem" }}>
            Kiến thức <span style={{ color: "#F07B20" }}>điều hòa & nước sạch</span>
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.85)", fontSize: "1rem", maxWidth: 640 }}>
            Cẩm nang chọn mua và sử dụng — viết dễ hiểu, có nguồn tham khảo rõ ràng, giúp anh/chị quyết định đúng trước khi chi tiền.
          </p>
        </div>
      </section>

      {/* Bài viết */}
      <section style={{ padding: "3rem 0 1rem", background: "var(--bg)" }}>
        <div className="container">
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "1.3rem", color: "var(--brand)", marginBottom: "1.25rem" }}>
            📖 Bài viết
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {posts.map(p => (
              <Link key={p.slug} href={`/kien-thuc/${p.slug}`}
                style={{ background: "#fff", borderRadius: 12, border: "1px solid var(--border)", padding: "1.4rem", textDecoration: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", fontFamily: "var(--font-sans)", fontSize: "0.75rem" }}>
                  <span style={{ background: "var(--brand-light)", color: "var(--brand2)", padding: "2px 10px", borderRadius: 12, fontWeight: 600 }}>
                    {p.category}
                  </span>
                  <span style={{ color: "var(--muted)" }}>Đọc {p.readMinutes} phút</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "var(--brand)", lineHeight: 1.45 }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--text)", lineHeight: 1.6, flex: 1 }}>
                  {p.excerpt}
                </p>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--brand2)", fontWeight: 600 }}>
                  Đọc bài →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <section style={{ padding: "2rem 0 3rem", background: "var(--bg)" }}>
        <div className="container">
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "1.3rem", color: "var(--brand)", marginBottom: "1.25rem" }}>
            🎬 Video
          </h2>
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
                  <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "var(--brand)", marginBottom: "0.5rem", lineHeight: 1.4 }}>
                    {a.title}
                  </h3>
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
