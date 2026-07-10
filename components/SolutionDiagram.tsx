const NODES = [
  { x: 500, y: 90, icon: "💬", lines: ["Tư vấn AI 24/7"] },
  { x: 220, y: 150, icon: "🛡️", lines: ["Bảo hành chính hãng"] },
  { x: 780, y: 150, icon: "🔧", lines: ["Lắp đặt tận nơi"] },
  { x: 95, y: 300, icon: "❄️", lines: ["Điều hòa Mitsubishi", "Electric"] },
  { x: 905, y: 300, icon: "🌀", lines: ["Điều hòa Daikin"] },
  { x: 220, y: 450, icon: "💧", lines: ["Máy lọc nước", "Cleansui"] },
  { x: 780, y: 450, icon: "🚰", lines: ["Máy lọc nước Kitz", "Micro Filter"] },
  { x: 500, y: 510, icon: "🛒", lines: ["Giỏ hàng & đặt lịch", "online"] },
];

export default function SolutionDiagram() {
  return (
    <section style={{ background: "#03182E", padding: "3.5rem 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "1.5rem", color: "#fff", marginBottom: "0.5rem" }}>
            Hệ sinh thái sản phẩm &amp; dịch vụ DigiSmart
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>
            Từ tư vấn, sản phẩm chính hãng đến lắp đặt và bảo hành — tất cả trong một nơi
          </p>
        </div>

        {/* Desktop: hub-spoke diagram */}
        <div className="dgs-sd-svg-wrap">
          <svg viewBox="0 0 1000 600" style={{ width: "100%", height: "auto", display: "block" }}>
            {NODES.map(n => (
              <line key={`l-${n.lines[0]}`} x1={500} y1={300} x2={n.x} y2={n.y}
                stroke="rgba(255,255,255,0.22)" strokeWidth={2} />
            ))}
            <rect x={370} y={270} width={260} height={60} rx={12} fill="#F07B20" />
            <text x={500} y={296} textAnchor="middle" style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 700, fill: "#fff" }}>
              DIGISMART
            </text>
            <text x={500} y={315} textAnchor="middle" style={{ fontFamily: "var(--font-sans)", fontSize: 10.5, fontWeight: 500, fill: "rgba(255,255,255,0.9)" }}>
              ĐIỀU HÒA &amp; NƯỚC SẠCH CHÍNH HÃNG
            </text>
            {NODES.map(n => {
              const above = n.y < 300;
              const baseOffset = above ? -52 : 62;
              const lineStep = above ? -15 : 15;
              return (
                <g key={n.lines[0]}>
                  <circle cx={n.x} cy={n.y} r={38} fill="#0A2C4E" stroke="rgba(255,255,255,0.25)" strokeWidth={1.5} />
                  <text x={n.x} y={n.y + 9} textAnchor="middle" style={{ fontSize: 24 }}>{n.icon}</text>
                  {n.lines.map((line, i) => (
                    <text key={line} x={n.x} y={n.y + baseOffset + i * lineStep} textAnchor="middle"
                      style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 600, fill: "#fff" }}>
                      {line}
                    </text>
                  ))}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Mobile: card grid fallback */}
        <div className="dgs-sd-grid">
          {NODES.map(n => (
            <div key={n.lines[0]} style={{ background: "#0A2C4E", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.6rem", marginBottom: "0.4rem" }}>{n.icon}</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 600, color: "#fff", lineHeight: 1.35 }}>{n.lines.join(" ")}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .dgs-sd-grid { display: none; }
        @media (max-width: 767px) {
          .dgs-sd-svg-wrap { display: none; }
          .dgs-sd-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
        }
      `}</style>
    </section>
  );
}
