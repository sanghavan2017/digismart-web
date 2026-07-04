import { NextRequest, NextResponse } from "next/server";
import { kvGetAllLeads } from "@/lib/kv";

function buildReportHtml(leads: { name: string; phone: string; productName?: string | null; createdAt: string }[]) {
  if (leads.length === 0) {
    return `<p>Không có lead mới nào trong 7 ngày qua.</p>`;
  }
  const rows = leads
    .map(
      l => `<li style="margin-bottom:10px;">
        <strong>${l.name}</strong> — ${l.phone}${l.productName ? ` — quan tâm: ${l.productName}` : ""}
        <br/><span style="color:#888;font-size:12px;">${new Date(l.createdAt).toLocaleString("vi-VN")}</span>
      </li>`
    )
    .join("");
  return `
    <h2 style="color:#042C53;">Tổng hợp lead tuần này: ${leads.length} lead</h2>
    <ul style="padding-left:18px;">${rows}</ul>
  `;
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const allLeads = await kvGetAllLeads();
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentLeads = allLeads.filter(l => new Date(l.createdAt).getTime() >= sevenDaysAgo);

    const html = buildReportHtml(recentLeads);

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY || ""}`,
      },
      body: JSON.stringify({
        from: "DigiSmart Website <onboarding@resend.dev>",
        to: ["digismart606@gmail.com"],
        subject: `[DigiSmart] Tổng hợp lead tuần này (${recentLeads.length} lead)`,
        html,
      }),
    });

    return NextResponse.json({ ok: true, leadCount: recentLeads.length });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
