"use client";
import { useEffect, useState } from "react";

const CENTER = { x: 500, y: 150, w: 280, h: 84 };
const HUB_AC = { x: 270, y: 320, w: 210, h: 62, label: ["ĐIỀU HÒA", "KHÔNG KHÍ"] };
const HUB_WATER = { x: 730, y: 320, w: 210, h: 62, label: ["MÁY LỌC", "NƯỚC"] };

const LEAVES = [
  { hub: HUB_AC, x: 120, y: 480, w: 170, h: 56, icon: "❄️", label: ["Mitsubishi Electric"] },
  { hub: HUB_AC, x: 420, y: 480, w: 170, h: 56, icon: "🌀", label: ["Daikin"] },
  { hub: HUB_WATER, x: 580, y: 480, w: 170, h: 56, icon: "💧", label: ["Cleansui"] },
  { hub: HUB_WATER, x: 880, y: 480, w: 170, h: 56, icon: "🚰", label: ["Kitz Micro Filter"] },
];

function elbow(x1: number, y1: number, x2: number, y2: number) {
  const midY = (y1 + y2) / 2;
  return `M${x1},${y1} V${midY} H${x2} V${y2}`;
}

export default function SolutionDiagram() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAnimate(!mq.matches);
  }, []);

  const centerBottom = { x: CENTER.x, y: CENTER.y + CENTER.h / 2 };
  const hubPaths = [
    elbow(centerBottom.x, centerBottom.y, HUB_AC.x, HUB_AC.y - HUB_AC.h / 2),
    elbow(centerBottom.x, centerBottom.y, HUB_WATER.x, HUB_WATER.y - HUB_WATER.h / 2),
  ];
  const leafPaths = LEAVES.map(l => elbow(l.hub.x, l.hub.y + l.hub.h / 2, l.x, l.y - l.h / 2));
  const allPaths = [...hubPaths, ...leafPaths];

  return (
    <section style={{ background: "#03182E", padding: "3.5rem 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "1.5rem", color: "#fff", marginBottom: "0.5rem" }}>
            Hệ sinh thái sản phẩm &amp; dịch vụ DigiSmart
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "rgba(255,255,255,0.55)" }}>
            2 ngành hàng chính hãng — điều hòa không khí &amp; máy lọc nước
          </p>
        </div>

        {/* Desktop: hierarchical tech diagram */}
        <div className="dgs-sd-svg-wrap">
          <svg viewBox="0 0 1000 600" style={{ width: "100%", height: "auto", display: "block" }}>
            <defs>
              <pattern id="dgs-sd-grid" width={28} height={28} patternUnits="userSpaceOnUse">
                <circle cx={1} cy={1} r={1} fill="rgba(56,189,248,0.15)" />
              </pattern>
            </defs>
            <rect x={0} y={0} width={1000} height={600} fill="url(#dgs-sd-grid)" />

            {allPaths.map((d, i) => (
              <path key={`path-${i}`} d={d} fill="none" stroke="rgba(56,189,248,0.45)" strokeWidth={2}
                strokeDasharray="6 6" className={animate ? "dgs-sd-flow" : undefined} />
            ))}
            {animate && allPaths.map((d, i) => (
              <circle key={`dot-${i}`} r={3.5} fill="#38BDF8">
                <animateMotion dur="2.4s" repeatCount="indefinite" path={d} begin={`${i * 0.2}s`} />
              </circle>
            ))}

            {/* Center hub */}
            <g className={animate ? "dgs-sd-pulse" : undefined} style={{ animationDelay: "0s" }}>
              <rect x={CENTER.x - CENTER.w / 2} y={CENTER.y - CENTER.h / 2} width={CENTER.w} height={CENTER.h}
                rx={12} fill="#F07B20" stroke="#FFB27A" strokeWidth={1.5} />
              <line x1={CENTER.x - CENTER.w / 2 + 10} y1={CENTER.y - CENTER.h / 2 + 8} x2={CENTER.x - CENTER.w / 2 + 22} y2={CENTER.y - CENTER.h / 2 + 8} stroke="#fff" strokeWidth={1.5} />
              <line x1={CENTER.x - CENTER.w / 2 + 10} y1={CENTER.y - CENTER.h / 2 + 8} x2={CENTER.x - CENTER.w / 2 + 10} y2={CENTER.y - CENTER.h / 2 + 20} stroke="#fff" strokeWidth={1.5} />
              <line x1={CENTER.x + CENTER.w / 2 - 10} y1={CENTER.y + CENTER.h / 2 - 8} x2={CENTER.x + CENTER.w / 2 - 22} y2={CENTER.y + CENTER.h / 2 - 8} stroke="#fff" strokeWidth={1.5} />
              <line x1={CENTER.x + CENTER.w / 2 - 10} y1={CENTER.y + CENTER.h / 2 - 8} x2={CENTER.x + CENTER.w / 2 - 10} y2={CENTER.y + CENTER.h / 2 - 20} stroke="#fff" strokeWidth={1.5} />
              <text x={CENTER.x} y={CENTER.y - 4} textAnchor="middle" style={{ fontFamily: "var(--font-sans)", fontSize: 19, fontWeight: 700, fill: "#fff", letterSpacing: 1 }}>
                DIGISMART
              </text>
              <text x={CENTER.x} y={CENTER.y + 18} textAnchor="middle" style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 500, fill: "rgba(255,255,255,0.9)" }}>
                Tư vấn AI · Lắp đặt tận nơi · Bảo hành chính hãng
              </text>
            </g>

            {/* Category hubs */}
            {[HUB_AC, HUB_WATER].map((h, hi) => (
              <g key={h.label.join("")} className={animate ? "dgs-sd-pulse" : undefined} style={{ animationDelay: `${0.4 + hi * 0.3}s` }}>
                <rect x={h.x - h.w / 2} y={h.y - h.h / 2} width={h.w} height={h.h} rx={10}
                  fill="#0A2C4E" stroke="#38BDF8" strokeWidth={2} />
                {h.label.map((line, i) => (
                  <text key={line} x={h.x} y={h.y - (h.label.length - 1) * 8 + i * 16 + 5} textAnchor="middle"
                    style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, fill: "#fff", letterSpacing: 1 }}>
                    {line}
                  </text>
                ))}
              </g>
            ))}

            {/* Leaf nodes */}
            {LEAVES.map(l => (
              <g key={l.label.join("")}>
                <rect x={l.x - l.w / 2} y={l.y - l.h / 2} width={l.w} height={l.h} rx={9}
                  fill="#081F38" stroke="rgba(56,189,248,0.5)" strokeWidth={1.5} />
                <text x={l.x - l.w / 2 + 26} y={l.y + 7} textAnchor="middle" style={{ fontSize: 20 }}>{l.icon}</text>
                {l.label.map((line, i) => (
                  <text key={line} x={l.x + 14} y={l.y + 5 + i * 14 - (l.label.length - 1) * 7} textAnchor="middle"
                    style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, fill: "#fff" }}>
                    {line}
                  </text>
                ))}
              </g>
            ))}
          </svg>
        </div>

        {/* Mobile: grouped card sections */}
        <div className="dgs-sd-mobile">
          {[{ h: HUB_AC.label.join(" "), items: LEAVES.filter(l => l.hub === HUB_AC) },
            { h: HUB_WATER.label.join(" "), items: LEAVES.filter(l => l.hub === HUB_WATER) }].map(group => (
            <div key={group.h} style={{ marginBottom: "1.25rem" }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", fontWeight: 700, color: "#38BDF8", letterSpacing: 1, marginBottom: "0.6rem" }}>
                {group.h}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
                {group.items.map(l => (
                  <div key={l.label.join("")} style={{ background: "#081F38", border: "1.5px solid rgba(56,189,248,0.4)", borderRadius: 10, padding: "0.9rem", textAlign: "center" }}>
                    <div style={{ fontSize: "1.5rem", marginBottom: "0.35rem" }}>{l.icon}</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.76rem", fontWeight: 600, color: "#fff" }}>{l.label.join(" ")}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div style={{ textAlign: "center", fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginTop: "0.5rem" }}>
            Tư vấn AI · Lắp đặt tận nơi · Bảo hành chính hãng
          </div>
        </div>
      </div>
      <style>{`
        .dgs-sd-mobile { display: none; }
        @keyframes dgs-sd-dash { to { stroke-dashoffset: -24; } }
        @keyframes dgs-sd-pulse { 0%, 100% { filter: drop-shadow(0 0 0px rgba(56,189,248,0.5)); } 50% { filter: drop-shadow(0 0 6px rgba(56,189,248,0.85)); } }
        .dgs-sd-flow { animation: dgs-sd-dash 1s linear infinite; }
        .dgs-sd-pulse { animation: dgs-sd-pulse 2.6s ease-in-out infinite; }
        @media (max-width: 767px) {
          .dgs-sd-svg-wrap { display: none; }
          .dgs-sd-mobile { display: block; }
        }
      `}</style>
    </section>
  );
}
