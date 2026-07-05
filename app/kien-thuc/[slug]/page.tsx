import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/data/kienthuc";
import LeadFormButton from "@/components/LeadFormButton";
import type { Metadata } from "next";

const BASE_URL = "https://www.digismartvn.com";

export function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find(p => p.slug === slug);
  if (!post) return { title: "Bài viết không tồn tại — DigiSmart" };
  return {
    title: `${post.title} — DigiSmart`,
    description: post.excerpt,
    alternates: { canonical: `/kien-thuc/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function KienThucPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find(p => p.slug === slug);
  if (!post) notFound();

  const related = posts.filter(p => p.category === post.category && p.slug !== post.slug).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    inLanguage: "vi",
    author: { "@type": "Organization", name: "DigiSmart", url: BASE_URL },
    publisher: { "@type": "Organization", name: "DigiSmart", url: BASE_URL },
    mainEntityOfPage: `${BASE_URL}/kien-thuc/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Breadcrumb */}
      <div style={{ background: "#fff", borderBottom: "1px solid var(--border)", padding: "0.75rem 0" }}>
        <div className="container" style={{ display: "flex", gap: "0.5rem", fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--muted)", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Trang chủ</Link>
          <span>/</span>
          <Link href="/kien-thuc" style={{ color: "var(--muted)", textDecoration: "none" }}>Kiến thức</Link>
          <span>/</span>
          <span style={{ color: "var(--brand)" }}>{post.title}</span>
        </div>
      </div>

      {/* Article */}
      <article style={{ background: "var(--bg)", padding: "2.5rem 0 3rem" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "1rem", fontFamily: "var(--font-sans)", fontSize: "0.8rem" }}>
            <span style={{ background: "var(--brand-light)", color: "var(--brand2)", padding: "3px 12px", borderRadius: 14, fontWeight: 600 }}>
              {post.category}
            </span>
            <span style={{ color: "var(--muted)" }}>
              {new Date(post.date).toLocaleDateString("vi-VN")} · Đọc {post.readMinutes} phút
            </span>
          </div>

          <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.5rem, 3.5vw, 2rem)", color: "var(--brand)", lineHeight: 1.3, marginBottom: "0.75rem" }}>
            {post.title}
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
            {post.excerpt}
          </p>

          <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: "1.75rem clamp(1.25rem, 4vw, 2.25rem)" }}>
            {post.sections.map((s, i) => (
              <section key={i} style={{ marginBottom: i === post.sections.length - 1 ? 0 : "1.75rem" }}>
                {s.heading && (
                  <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "1.15rem", color: "var(--brand)", marginBottom: "0.75rem" }}>
                    {s.heading}
                  </h2>
                )}
                {s.paragraphs?.map((p, j) => (
                  <p key={j} style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--text)", lineHeight: 1.8, marginBottom: "0.75rem" }}>
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul style={{ paddingLeft: "1.25rem", marginBottom: "0.75rem" }}>
                    {s.list.map((li, k) => (
                      <li key={k} style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--text)", lineHeight: 1.8, marginBottom: "0.4rem" }}>
                        {li}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* Nguồn tham khảo */}
            <div style={{ borderTop: "1px solid var(--border)", marginTop: "1.75rem", paddingTop: "1.25rem" }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 700, color: "var(--brand)", marginBottom: "0.5rem" }}>
                Nguồn tham khảo
              </p>
              {post.sources.map(src => (
                <a key={src.url} href={src.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--brand2)", textDecoration: "none", marginBottom: "0.3rem", lineHeight: 1.6 }}>
                  ↗ {src.label}
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ background: "linear-gradient(135deg, #042C53 0%, #185FA5 100%)", borderRadius: 12, padding: "1.75rem", marginTop: "2rem", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-sans)", color: "#fff", fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.4rem" }}>
              Cần tư vấn cho trường hợp cụ thể của nhà bạn?
            </p>
            <p style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.8)", fontSize: "0.88rem", marginBottom: "1.25rem" }}>
              DigiSmart tư vấn miễn phí và lắp đặt tận nơi tại TPHCM.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href={post.relatedCategory} style={{ background: "#F07B20", color: "#fff", padding: "11px 24px", borderRadius: 6, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}>
                Xem sản phẩm {post.category.toLowerCase()}
              </Link>
              <LeadFormButton productName={`Tư vấn: ${post.title}`} style={{ padding: "11px 24px", borderRadius: 6, fontSize: "0.9rem", background: "transparent", border: "1.5px solid rgba(255,255,255,0.5)", color: "#fff" }}>
                📩 Nhận tư vấn miễn phí
              </LeadFormButton>
            </div>
          </div>

          {/* Bài liên quan */}
          {related.length > 0 && (
            <div style={{ marginTop: "2.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "1.15rem", color: "var(--brand)", marginBottom: "1rem" }}>
                Bài viết liên quan
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
                {related.map(r => (
                  <Link key={r.slug} href={`/kien-thuc/${r.slug}`}
                    style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 10, padding: "1.1rem", textDecoration: "none", display: "block" }}>
                    <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.9rem", color: "var(--brand)", lineHeight: 1.45, marginBottom: "0.4rem" }}>
                      {r.title}
                    </div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--muted)" }}>
                      Đọc {r.readMinutes} phút →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
