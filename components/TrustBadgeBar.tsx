const ICON_PROPS = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function CheckBadgeIcon() {
  return (
    <svg {...ICON_PROPS} width={26} height={26} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9.5" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg {...ICON_PROPS} width={26} height={26} aria-hidden="true">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
    </svg>
  );
}
function TruckIcon() {
  return (
    <svg {...ICON_PROPS} width={26} height={26} aria-hidden="true">
      <path d="M3 7h11v9H3z" />
      <path d="M14 11h4l3 3v2h-7z" />
      <circle cx="7" cy="18" r="1.5" />
      <circle cx="17.5" cy="18" r="1.5" />
    </svg>
  );
}
function HeadsetIcon() {
  return (
    <svg {...ICON_PROPS} width={26} height={26} aria-hidden="true">
      <path d="M4 13a8 8 0 0 1 16 0" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
    </svg>
  );
}

const ITEMS = [
  { Icon: CheckBadgeIcon, title: "Hàng chính hãng 100%", desc: "Nguồn gốc rõ ràng, đầy đủ tem, phiếu bảo hành" },
  { Icon: ShieldIcon, title: "Bảo hành chính hãng", desc: "Hỗ trợ đăng ký và bảo hành theo đúng chính sách hãng" },
  { Icon: TruckIcon, title: "Giao/lắp đặt tận nơi", desc: "Đội ngũ DigiSmart trực tiếp giao hàng và lắp đặt tại TPHCM" },
  { Icon: HeadsetIcon, title: "Tư vấn miễn phí", desc: "Hỗ trợ qua hotline & Zalo, không mất phí tư vấn" },
];

// Dải cam kết kiểu eguru — dùng chung cho trang danh mục Cửa hàng, PDP, trang Điều hòa (FR-011).
export default function TrustBadgeBar() {
  return (
    <section style={{ background: "#fff", padding: "1.75rem 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
          {ITEMS.map(item => (
            <div key={item.title} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <span style={{ color: "var(--brand2)", flexShrink: 0 }}>
                <item.Icon />
              </span>
              <div>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.85rem", color: "var(--brand)", marginBottom: 2 }}>
                  {item.title}
                </div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--muted)" }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
