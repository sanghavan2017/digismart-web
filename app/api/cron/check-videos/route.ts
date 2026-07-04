import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";
import { articles } from "@/data/kienthuc";

const CHANNELS = [
  { id: "UCyBwo2QDpnc8LY7hUeDxkOw", name: "Mitsubishi Cleansui" },
  { id: "UCG4YNmh6aN8enymPAFmXZ9w", name: "Kitz Micro Filter Việt Nam" },
];

type YouTubeVideo = {
  id: string;
  title: string;
  publishedAt: string;
  channelName: string;
};

async function fetchRecentVideos(channelId: string, channelName: string, apiKey: string): Promise<YouTubeVideo[]> {
  const publishedAfter = new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString();
  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&type=video&maxResults=10&publishedAfter=${publishedAfter}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`YouTube API error for ${channelName}: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  return (data.items || []).map((item: { id: { videoId: string }; snippet: { title: string; publishedAt: string } }) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    publishedAt: item.snippet.publishedAt,
    channelName,
  }));
}

function buildReportHtml(newVideos: YouTubeVideo[]) {
  if (newVideos.length === 0) {
    return `<p>Không có video mới nào từ Mitsubishi Cleansui hoặc Kitz Micro Filter trong 35 ngày qua.</p>`;
  }
  const rows = newVideos
    .map(
      v => `<li style="margin-bottom:12px;">
        <a href="https://www.youtube.com/watch?v=${v.id}" style="color:#185FA5;font-weight:700;">${v.title}</a><br/>
        <span style="color:#888;font-size:13px;">${v.channelName} — ${new Date(v.publishedAt).toLocaleDateString("vi-VN")}</span>
      </li>`
    )
    .join("");
  return `
    <h2 style="color:#042C53;">Video mới tháng này</h2>
    <ul style="padding-left:18px;">${rows}</ul>
    <p style="color:#555;font-size:14px;">Xem video, quyết định: thêm vào trang /kien-thuc (nếu là nội dung giáo dục chung) hoặc gắn videoId cho 1 sản phẩm cụ thể trong data/products.ts (nếu giới thiệu riêng 1 model). Trả lời cho Claude trong phiên làm việc để thực hiện cập nhật.</p>
  `;
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const apiKey = process.env.YOUTUBE_API_KEY || "";
    const existingVideoIds = new Set<string>([
      ...articles.map(a => a.videoId),
      ...products.map(p => p.videoId).filter((v): v is string => !!v),
    ]);

    const allVideos: YouTubeVideo[] = [];
    for (const channel of CHANNELS) {
      const videos = await fetchRecentVideos(channel.id, channel.name, apiKey);
      allVideos.push(...videos);
    }

    const newVideos = allVideos.filter(v => !existingVideoIds.has(v.id));

    const html = buildReportHtml(newVideos);

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY || ""}`,
      },
      body: JSON.stringify({
        from: "DigiSmart Website <onboarding@resend.dev>",
        to: ["digismart606@gmail.com"],
        subject: `[DigiSmart] Báo cáo video mới — Kiến thức nước sạch (${newVideos.length} video mới)`,
        html,
      }),
    });

    return NextResponse.json({ ok: true, newVideosCount: newVideos.length });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
