"use client";
import { useEffect, useState } from "react";

const CENTER = { x: 500, y: 300, w: 260, h: 90, href: "/" };
const HUB_AC = { x: 210, y: 300, w: 180, h: 58, label: ["ĐIỀU HÒA", "KHÔNG KHÍ"], href: "/dieu-hoa" };
const HUB_WATER = { x: 790, y: 300, w: 180, h: 58, label: ["MÁY LỌC", "NƯỚC"], href: "/may-loc-nuoc" };

type Logo = { type: "image"; src: string; aspect: number } | { type: "mitsubishi"; aspect: number };

const LEAVES: { hub: typeof HUB_AC; x: number; y: number; w: number; h: number; logo: Logo; href: string }[] = [
  { hub: HUB_AC, x: 90, y: 170, w: 190, h: 64, logo: { type: "mitsubishi", aspect: 4.25 }, href: "/san-pham?brand=Mitsubishi+Electric" },
  { hub: HUB_AC, x: 90, y: 430, w: 190, h: 64, logo: { type: "image", src: "/images/brands/daikin-logo.png", aspect: 345 / 84 }, href: "/san-pham?brand=Daikin" },
  { hub: HUB_WATER, x: 910, y: 170, w: 190, h: 64, logo: { type: "image", src: "/images/brands/cleansui-logo.svg", aspect: 116 / 40 }, href: "/san-pham?brand=Cleansui" },
  { hub: HUB_WATER, x: 910, y: 430, w: 190, h: 64, logo: { type: "image", src: "/images/brands/kitz-logo.png", aspect: 482 / 143 }, href: "/san-pham?brand=Kitz" },
];

function elbowH(x1: number, y1: number, x2: number, y2: number) {
  const midX = (x1 + x2) / 2;
  return `M${x1},${y1} H${midX} V${y2} H${x2}`;
}

export function MitsubishiLogo({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
  const diamond = (cx: number, cy: number, d: number) =>
    `M${cx},${cy - d / 2} L${cx + d / 2},${cy} L${cx},${cy + d / 2} L${cx - d / 2},${cy} Z`;
  return (
    <svg x={x} y={y} width={width} height={height} viewBox="0 0 170 40" preserveAspectRatio="xMidYMid meet">
      <path d={diamond(12, 20, 15)} fill="#E60012" />
      <path d={diamond(24, 20, 15)} fill="#E60012" />
      <path d={diamond(36, 20, 15)} fill="#E60012" />
      <text x={48} y={26} textLength={118} lengthAdjust="spacingAndGlyphs"
        style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 800, fill: "#0F172A" }}>
        MITSUBISHI ELECTRIC
      </text>
    </svg>
  );
}

function LeafLogo({ logo, x, y, w, h }: { logo: Logo; x: number; y: number; w: number; h: number }) {
  const dispH = h - 20;
  const dispW = dispH * logo.aspect;
  const dispX = x + (w - dispW) / 2;
  const dispY = y + (h - dispH) / 2;
  if (logo.type === "mitsubishi") return <MitsubishiLogo x={dispX} y={dispY} width={dispW} height={dispH} />;
  return <image href={logo.src} x={dispX} y={dispY} width={dispW} height={dispH} preserveAspectRatio="xMidYMid meet" />;
}

export default function SolutionDiagram() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAnimate(!mq.matches);
  }, []);

  const hubPaths = [
    `M${CENTER.x - CENTER.w / 2},${CENTER.y} H${HUB_AC.x + HUB_AC.w / 2}`,
    `M${CENTER.x + CENTER.w / 2},${CENTER.y} H${HUB_WATER.x - HUB_WATER.w / 2}`,
  ];
  const leafPaths = LEAVES.map(l => {
    const fromRight = l.hub === HUB_AC;
    const hubEdgeX = fromRight ? l.hub.x - l.hub.w / 2 : l.hub.x + l.hub.w / 2;
    const leafEdgeX = fromRight ? l.x + l.w / 2 : l.x - l.w / 2;
    return elbowH(hubEdgeX, l.hub.y, leafEdgeX, l.y);
  });
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

            {/* Center hub — dead center of the diagram, links home */}
            <a href={CENTER.href} className={`dgs-sd-leaf${animate ? " dgs-sd-pulse" : ""}`} style={{ animationDelay: "0s" }}>
              <rect x={CENTER.x - CENTER.w / 2} y={CENTER.y - CENTER.h / 2} width={CENTER.w} height={CENTER.h}
                rx={12} fill="#F07B20" stroke="#FFB27A" strokeWidth={1.5} />
              <line x1={CENTER.x - CENTER.w / 2 + 10} y1={CENTER.y - CENTER.h / 2 + 8} x2={CENTER.x - CENTER.w / 2 + 22} y2={CENTER.y - CENTER.h / 2 + 8} stroke="#fff" strokeWidth={1.5} />
              <line x1={CENTER.x - CENTER.w / 2 + 10} y1={CENTER.y - CENTER.h / 2 + 8} x2={CENTER.x - CENTER.w / 2 + 10} y2={CENTER.y - CENTER.h / 2 + 20} stroke="#fff" strokeWidth={1.5} />
              <line x1={CENTER.x + CENTER.w / 2 - 10} y1={CENTER.y + CENTER.h / 2 - 8} x2={CENTER.x + CENTER.w / 2 - 22} y2={CENTER.y + CENTER.h / 2 - 8} stroke="#fff" strokeWidth={1.5} />
              <line x1={CENTER.x + CENTER.w / 2 - 10} y1={CENTER.y + CENTER.h / 2 - 8} x2={CENTER.x + CENTER.w / 2 - 10} y2={CENTER.y + CENTER.h / 2 - 20} stroke="#fff" strokeWidth={1.5} />
              <text x={CENTER.x} y={CENTER.y - 6} textAnchor="middle" style={{ fontFamily: "var(--font-sans)", fontSize: 19, fontWeight: 700, fill: "#fff", letterSpacing: 1 }}>
                DIGISMART
              </text>
              <text x={CENTER.x} y={CENTER.y + 18} textAnchor="middle" style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 500, fill: "rgba(255,255,255,0.9)" }}>
                Tư vấn AI · Lắp đặt tận nơi · Bảo hành chính hãng
              </text>
            </a>

            {/* Category hubs — link to /dieu-hoa and /may-loc-nuoc */}
            {[HUB_AC, HUB_WATER].map((h, hi) => (
              <a key={h.label.join("")} href={h.href} className={`dgs-sd-leaf${animate ? " dgs-sd-pulse" : ""}`} style={{ animationDelay: `${0.4 + hi * 0.3}s` }}>
                <rect x={h.x - h.w / 2} y={h.y - h.h / 2} width={h.w} height={h.h} rx={10}
                  fill="#0A2C4E" stroke="#38BDF8" strokeWidth={2} />
                {h.label.map((line, i) => (
                  <text key={line} x={h.x} y={h.y - (h.label.length - 1) * 8 + i * 16 + 5} textAnchor="middle"
                    style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, fill: "#fff", letterSpacing: 1 }}>
                    {line}
                  </text>
                ))}
              </a>
            ))}

            {/* Leaf nodes — real brand logos, full-size, no squish; each links to filtered product listing */}
            {LEAVES.map((l, i) => (
              <a key={i} href={l.href} className="dgs-sd-leaf">
                <rect x={l.x - l.w / 2} y={l.y - l.h / 2} width={l.w} height={l.h} rx={9}
                  fill="#fff" stroke="rgba(56,189,248,0.6)" strokeWidth={1.5} />
                <LeafLogo logo={l.logo} x={l.x - l.w / 2} y={l.y - l.h / 2} w={l.w} h={l.h} />
              </a>
            ))}
          </svg>
        </div>

        {/* Mobile: grouped card sections */}
        <div className="dgs-sd-mobile">
          {[{ h: HUB_AC.label.join(" "), href: HUB_AC.href, items: LEAVES.filter(l => l.hub === HUB_AC) },
            { h: HUB_WATER.label.join(" "), href: HUB_WATER.href, items: LEAVES.filter(l => l.hub === HUB_WATER) }].map(group => (
            <div key={group.h} style={{ marginBottom: "1.25rem" }}>
              <a href={group.href} style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "0.8rem", fontWeight: 700, color: "#38BDF8", letterSpacing: 1, marginBottom: "0.6rem", textDecoration: "none" }}>
                {group.h} →
              </a>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
                {group.items.map((l, i) => (
                  <a key={i} href={l.href} style={{ background: "#fff", border: "1.5px solid rgba(56,189,248,0.4)", borderRadius: 10, padding: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 50 }}>
                    {l.logo.type === "image"
                      ? <img src={l.logo.src} alt="" style={{ maxHeight: 34, maxWidth: "100%", objectFit: "contain" }} />
                      : <svg width={34 * (l.logo as { aspect: number }).aspect} height={34} viewBox="0 0 170 40" style={{ maxWidth: "100%" }}>
                          <MitsubishiLogo x={0} y={0} width={170} height={40} />
                        </svg>}
                  </a>
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
        .dgs-sd-leaf { cursor: pointer; transform-box: fill-box; transform-origin: center; transition: transform 0.15s ease; }
        .dgs-sd-leaf:hover { transform: scale(1.05); }
        @media (max-width: 767px) {
          .dgs-sd-svg-wrap { display: none; }
          .dgs-sd-mobile { display: block; }
        }
      `}</style>
    </section>
  );
}
