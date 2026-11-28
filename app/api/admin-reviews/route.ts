import { NextRequest, NextResponse } from "next/server";
import { listPendingReviews, moderateReview } from "@/lib/supabase";

function checkAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  return Boolean(process.env.ORDERS_ADMIN_PASSWORD) && authHeader === `Bearer ${process.env.ORDERS_ADMIN_PASSWORD}`;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Sai mật khẩu." }, { status: 401 });
  }
  try {
    const reviews = await listPendingReviews();
    return NextResponse.json({ reviews });
  } catch (err) {
    console.error("List pending reviews error:", err);
    return NextResponse.json({ error: "Không tải được danh sách đánh giá chờ duyệt." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Sai mật khẩu." }, { status: 401 });
  }
  try {
    const { id, status } = await req.json();
    if (!id || (status !== "approved" && status !== "rejected")) {
      return NextResponse.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
    }
    await moderateReview(id, status);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Moderate review error:", err);
    return NextResponse.json({ error: "Không xử lý được đánh giá." }, { status: 500 });
  }
}
