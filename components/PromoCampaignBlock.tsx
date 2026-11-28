"use client";
import { useEffect, useState } from "react";

// Khối khuyến mãi theo chiến dịch (kiểu "Flash Sale" của eguru) — FR-011.
// Hiện CHƯA có chiến dịch nào cấu hình -> component tự ẩn hoàn toàn, không bịa
// khuyến mãi giả. Khi DigiSmart có 1 chiến dịch thật (ví dụ giảm giá theo ngày),
// thêm 1 object vào CAMPAIGNS bên dưới — block sẽ tự hiện đúng khoảng thời gian
// startAt/endAt, tự ẩn lại khi hết hạn.
type Campaign = {
  title: string;
  description: string;
  startAt: string; // ISO date string
  endAt: string; // ISO date string
  href: string;
};

const CAMPAIGNS: Campaign[] = [];

function useCountdown(endAt: string) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    // Set sau mount để khớp HTML server render, tránh lệch hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (now == null) return null;
  const diff = new Date(endAt).getTime() - now;
  if (diff <= 0) return null;
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return { h, m, s };
}

function CampaignCard({ campaign }: { campaign: Campaign }) {
  const countdown = useCountdown(campaign.endAt);
  if (!countdown) return null;
  return (
    <a href={campaign.href} style={{
      display: "block", textDecoration: "none", borderRadius: 12, padding: "1.5rem 1.75rem",
      background: "linear-gradient(135deg, #D64545 0%, #F07B20 100%)", color: "#fff",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.05rem", marginBottom: 4 }}>
            🔥 {campaign.title}
          </div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", opacity: 0.9, margin: 0 }}>
            {campaign.description}
          </p>
        </div>
        <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.95rem", background: "rgba(0,0,0,0.18)", borderRadius: 8, padding: "6px 14px", whiteSpace: "nowrap" }}>
          {String(countdown.h).padStart(2, "0")}:{String(countdown.m).padStart(2, "0")}:{String(countdown.s).padStart(2, "0")}
        </div>
      </div>
    </a>
  );
}

function isCampaignActive(c: Campaign, now: number) {
  return now >= new Date(c.startAt).getTime() && now < new Date(c.endAt).getTime();
}

export default function PromoCampaignBlock() {
  // Date.now() là hàm impure — không gọi thẳng trong thân component (React purity rule),
  // tính lại trong effect sau mount, giống cách SolutionDiagram xử lý matchMedia.
  const [active, setActive] = useState<Campaign[]>([]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(CAMPAIGNS.filter(c => isCampaignActive(c, Date.now())));
  }, []);
  if (active.length === 0) return null;
  return (
    <section style={{ padding: "1.5rem 0 0" }}>
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {active.map(c => <CampaignCard key={c.title} campaign={c} />)}
      </div>
    </section>
  );
}
