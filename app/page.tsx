import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import SolutionDiagram from "@/components/SolutionDiagram";
import type { Metadata } from "next";

const ICON_PROPS = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function CheckIcon(props: { width: number; height: number }) {
  return (
    <svg {...ICON_PROPS} width={props.width} height={props.height} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9.5" />
    </svg>
  );
}
function WrenchIcon(props: { width: number; height: number }) {
  return (
    <svg {...ICON_PROPS} width={props.width} height={props.height} aria-hidden="true">
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2 2.6-2.6z" />
    </svg>
  );
}
function ChatIcon(props: { width: number; height: number }) {
  return (
    <svg {...ICON_PROPS} width={props.width} height={props.height} aria-hidden="true">
      <path d="M4 5h16v11H8l-4 4V5z" />
    </svg>
  );
}
function WalletIcon(props: { width: number; height: number }) {
  return (
    <svg {...ICON_PROPS} width={props.width} height={props.height} aria-hidden="true">
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <circle cx="16.5" cy="14" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}
function PhoneIcon(props: { width: number; height: number }) {
  return (
    <svg {...ICON_PROPS} width={props.width} height={props.height} aria-hidden="true">
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3z" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "DigiSmart — Điều hòa & Máy lọc nước chính hãng",
  description: "DigiSmart cung cấp & lắp đặt Điều hòa, Máy lọc nước (Cleansui, Kitz Micro Filter, Mitsubishi Electric, Daikin) chính hãng tại TPHCM. Tư vấn miễn phí, bảo hành đầy đủ.",
  alternates: { canonical: "/" },
};

function formatPrice(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}
function discountPct(orig: number, price: number) {
  return Math.round((1 - price / orig) * 100);
}

export default function HomePage() {
  const featured = products.filter(p => p.inStock).slice(0, 4);

  return (
    <>
      {/* Hero — màn hình chọn cổng: Cửa hàng (mua máy lọc nước, giao tận nơi) / Dịch vụ
          (điều hòa, khảo sát lắp đặt). Gộp cùng 1 section để khách thấy đủ 2 lựa chọn
          ngay màn hình đầu, không cần cuộn (FR-002, US2 trong
          specs/002-url-cua-hang-dich-vu/spec.md). */}
      <section style={{ background: "linear-gradient(135deg, #042C53 0%, #185FA5 70%, #378ADD 100%)", padding: "3.5rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", color: "#fff", maxWidth: 680, margin: "0 auto 2.25rem" }}>
            <div style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.9)", fontSize: "0.8rem", padding: "4px 14px", borderRadius: 20, display: "inline-block", marginBottom: "1.25rem", fontWeight: 500 }}>
              ✦ Điều hòa & Máy lọc nước chính hãng — Lắp đặt tận nơi
            </div>
            <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", lineHeight: 1.25, marginBottom: "0.75rem" }}>
              Công nghệ chính hãng<br />
              <span style={{ color: "#F07B20" }}>— Giá hợp lý nhất</span>
            </h1>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", opacity: 0.8, lineHeight: 1.7 }}>
              Chọn đúng nhu cầu của bạn bên dưới — DigiSmart có cả mua hàng giao ngay và dịch vụ tư vấn/lắp đặt tận nơi.
            </p>
          </div>

          {/* 2 cổng */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", maxWidth: 820, margin: "0 auto" }}>
            <Link href="/cua-hang" className="card-link"
              style={{ display: "block", textDecoration: "none", borderRadius: 12, padding: "2rem", background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.3)", color: "#fff" }}>
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
              style={{ display: "block", textDecoration: "none", borderRadius: 12, padding: "2rem", background: "#fff" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔧</div>
              <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.4rem", color: "var(--brand)" }}>
                Dịch vụ — Điều hòa
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--muted)", marginBottom: "1rem" }}>
                Mitsubishi Electric, Daikin — khảo sát miễn phí, tư vấn công suất, lắp đặt tận nơi tại TPHCM.
              </p>
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.85rem", color: "var(--brand2)" }}>
                Xem & đặt lịch khảo sát →
              </span>
            </Link>
          </div>

          {/* Số liệu — gọn lại thành 1 dòng mỏng dưới 2 cổng, không còn chiếm nửa hero như trước */}
          <div style={{ display: "flex", justifyContent: "center", gap: "2.5rem", flexWrap: "wrap", marginTop: "2rem" }}>
            {[
              { num: `${products.length}+`, label: "Sản phẩm" },
              { num: "2", label: "Ngành hàng" },
              { num: "100%", label: "Chính hãng" },
              { num: "Tận nơi", label: "Lắp đặt" },
            ].map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "1.3rem", color: "#F07B20", fontWeight: 700 }}>{s.num}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "rgba(255,255,255,0.7)", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hệ sinh thái sản phẩm — diagram thay cho "Danh mục sản phẩm" dạng thẻ (đã bỏ vì trùng lặp với banner 2 cổng ở trên) */}
      <SolutionDiagram />

      {/* Featured Products */}
      <section style={{ padding: "3rem 0", background: "var(--bg)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "1.5rem", color: "var(--brand)" }}>Sản phẩm nổi bật</h2>
            <Link href="/san-pham" style={{ color: "var(--brand2)", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", fontFamily: "var(--font-sans)" }}>
              Xem tất cả →
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
            {featured.map((p, idx) => (
              <Link key={p.id} href={`/san-pham/${p.id}`} className="card-link"
                style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden", textDecoration: "none", display: "block" }}>
                <div style={{ background: "#fff", borderBottom: "1px solid var(--border)", height: 150, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", position: "relative", overflow: "hidden" }}>
                  {p.imageUrl ? (
                    <Image src={p.imageUrl} alt={p.name} fill sizes="(max-width: 768px) 90vw, 240px" priority={idx < 4} style={{ objectFit: "contain", padding: "0.75rem" }} />
                  ) : (
                    p.icon
                  )}
                  {discountPct(p.originalPrice, p.price) > 0 && (
                    <span style={{ position: "absolute", top: 8, left: 8, background: "#F07B20", color: "var(--brand)", fontSize: "0.7rem", fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>
                      -{discountPct(p.originalPrice, p.price)}%
                    </span>
                  )}
                </div>
                <div style={{ padding: "1rem" }}>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
                    {p.brand}
                  </div>
                  <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.88rem", marginBottom: "0.5rem", color: "var(--text)", lineHeight: 1.4 }}>
                    {p.name}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", fontWeight: 700, color: "var(--brand2)" }}>
                      {formatPrice(p.price)}
                    </span>
                    {p.originalPrice > p.price && (
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--muted)", textDecoration: "line-through" }}>
                        {formatPrice(p.originalPrice)}
                      </span>
                    )}
                  </div>
                  {p.originalPrice > p.price && (
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.76rem", color: "#2E9E5B", fontWeight: 600, marginTop: 4 }}>
                      Tiết kiệm {formatPrice(p.originalPrice - p.price)}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section style={{ background: "#fff", padding: "2.5rem 0", borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
            {[
              { Icon: CheckIcon, title: "Hàng chính hãng", desc: "Nguồn gốc rõ ràng, bảo hành đầy đủ" },
              { Icon: WrenchIcon, title: "Lắp đặt tận nơi", desc: "Kỹ thuật DigiSmart lắp đặt trực tiếp tại TPHCM" },
              { Icon: ChatIcon, title: "Tư vấn miễn phí", desc: "Hỗ trợ qua hotline & Zalo" },
              { Icon: WalletIcon, title: "Giá minh bạch", desc: "Báo giá rõ ràng trọn gói, không phát sinh" },
            ].map(b => (
              <div key={b.title} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                <span style={{ color: "var(--brand2)", flexShrink: 0 }}><b.Icon width={28} height={28} /></span>
                <div>
                  <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.9rem", color: "var(--brand)", marginBottom: 3 }}>{b.title}</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--muted)" }}>{b.desc}</div>
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
            Cần tư vấn sản phẩm?
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.8)", marginBottom: "1.5rem" }}>
            Liên hệ ngay để được hỗ trợ nhanh nhất
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:0778886758" className="btn-primary" style={{ background: "#F07B20", color: "var(--brand)", padding: "12px 28px", borderRadius: 6, fontWeight: 700, textDecoration: "none", fontFamily: "var(--font-sans)", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <PhoneIcon width={18} height={18} /> Gọi ngay: 0778 886 758
            </a>
            <a href="https://zalo.me/0778886758" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.5)", padding: "12px 28px", borderRadius: 6, fontWeight: 500, textDecoration: "none", fontFamily: "var(--font-sans)", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <ChatIcon width={18} height={18} /> Chat Zalo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
