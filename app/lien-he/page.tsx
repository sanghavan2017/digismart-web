import type { Metadata } from "next";
import ContactForm from "./_components/ContactForm";

export const metadata: Metadata = {
  title: "Liên hệ — DigiSmart",
  description: "Liên hệ với DigiSmart để được tư vấn phụ kiện điện tử chính hãng. Gọi điện, nhắn Zalo hoặc gửi form — chúng tôi phản hồi trong ngày.",
};

const contactMethods = [
  {
    icon: "📞",
    label: "Điện thoại",
    value: "0778 886 758",
    href: "tel:0778886758",
    desc: "Gọi trực tiếp — hỗ trợ 8h–21h mỗi ngày",
  },
  {
    icon: "💬",
    label: "Zalo",
    value: "0778 886 758",
    href: "https://zalo.me/0778886758",
    desc: "Chat Zalo — phản hồi nhanh nhất",
  },
  {
    icon: "📘",
    label: "Facebook",
    value: "facebook.com/digismartvn",
    href: "https://facebook.com/digismartvn",
    desc: "Theo dõi để nhận tin khuyến mãi",
  },
  {
    icon: "🛍️",
    label: "Shopee",
    value: "shopee.vn/digismart85",
    href: "https://shopee.vn/digismart85",
    desc: "Đặt hàng trực tiếp trên Shopee",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #042C53 0%, #185FA5 70%, #378ADD 100%)", padding: "4rem 0" }}>
        <div className="container" style={{ textAlign: "center", color: "#fff" }}>
          <div style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.9)", fontSize: "0.8rem", padding: "4px 14px", borderRadius: 20, display: "inline-block", marginBottom: "1.25rem", fontWeight: 500 }}>
            ✦ Chúng tôi luôn sẵn sàng hỗ trợ
          </div>
          <h1 style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", marginBottom: "1rem" }}>
            Liên hệ với <span style={{ color: "#F07B20" }}>DigiSmart</span>
          </h1>
          <p style={{ fontFamily: "Calibri, sans-serif", fontSize: "1.05rem", opacity: 0.85, maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
            Cần tư vấn sản phẩm hoặc hỗ trợ sau bán hàng? Liên hệ ngay — chúng tôi phản hồi trong ngày.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section style={{ background: "var(--bg)", padding: "4rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2.5rem" }}>
            {/* Left: Contact methods */}
            <div>
              <h2 style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "1.3rem", color: "var(--brand)", marginBottom: "1.5rem" }}>
                Kênh liên hệ
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {contactMethods.map(m => (
                  <a key={m.label} href={m.href} target={m.href.startsWith("http") ? "_blank" : undefined}
                    style={{ background: "#fff", borderRadius: 10, padding: "1.25rem", border: "1px solid var(--border)", textDecoration: "none", display: "flex", gap: "1rem", alignItems: "flex-start", transition: "border-color 0.2s" }}>
                    <span style={{ fontSize: "1.6rem", flexShrink: 0 }}>{m.icon}</span>
                    <div>
                      <div style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 }}>{m.label}</div>
                      <div style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--brand)", marginBottom: 4 }}>{m.value}</div>
                      <div style={{ fontFamily: "Calibri, sans-serif", fontSize: "0.82rem", color: "var(--muted)" }}>{m.desc}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <h2 style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "1.3rem", color: "var(--brand)", marginBottom: "1.5rem" }}>
                Gửi yêu cầu tư vấn
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section style={{ background: "#fff", padding: "3rem 0", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 700, color: "var(--brand)", marginBottom: "1.25rem", fontSize: "1rem" }}>
            Hoặc mua ngay trên sàn thương mại điện tử
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { icon: "🛍️", label: "Shopee DigiSmart", href: "https://shopee.vn/digismart85" },
              { icon: "🎵", label: "TikTok Shop DigiSmart", href: "https://tiktok.com/@digismart85" },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank"
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 22px", border: "1.5px solid var(--border)", borderRadius: 8, textDecoration: "none", fontFamily: "Trebuchet MS, sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "var(--brand)" }}>
                {s.icon} {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
