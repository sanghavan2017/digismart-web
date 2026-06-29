// Helper gọi Vercel KV (Upstash Redis REST API) — không cần thêm package npm.
// Cần 2 biến môi trường: KV_REST_API_URL, KV_REST_API_TOKEN (Vercel tự thêm khi bạn tạo KV database và connect vào project).

const KV_URL = process.env.KV_REST_API_URL || "";
const KV_TOKEN = process.env.KV_REST_API_TOKEN || "";

async function kvCommand(parts: (string | number)[]): Promise<unknown> {
  if (!KV_URL || !KV_TOKEN) throw new Error("KV chưa được cấu hình (thiếu KV_REST_API_URL/KV_REST_API_TOKEN)");
  // Gửi qua POST body (mảng JSON) thay vì nhúng vào URL path — an toàn với chuỗi JSON dài/có ký tự đặc biệt.
  const res = await fetch(KV_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parts),
  });
  if (!res.ok) throw new Error(`KV command failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.result;
}

export async function kvPushLead(record: object) {
  await kvCommand(["lpush", "leads", JSON.stringify(record)]);
  // Giữ tối đa 500 lead gần nhất, tránh list phình to vô hạn
  await kvCommand(["ltrim", "leads", "0", "499"]);
}

export async function kvGetAllLeads(): Promise<{ name: string; phone: string; productName?: string; createdAt: string }[]> {
  const raw = (await kvCommand(["lrange", "leads", "0", "-1"])) as string[];
  return (raw || []).map(r => JSON.parse(r));
}
