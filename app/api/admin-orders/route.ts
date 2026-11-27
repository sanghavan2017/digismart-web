import { NextRequest, NextResponse } from "next/server";
import { listOrders } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!process.env.ORDERS_ADMIN_PASSWORD || authHeader !== `Bearer ${process.env.ORDERS_ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Sai mật khẩu." }, { status: 401 });
  }
  try {
    const orders = await listOrders();
    return NextResponse.json({ orders });
  } catch (err) {
    console.error("List orders error:", err);
    return NextResponse.json({ error: "Không tải được danh sách đơn hàng." }, { status: 500 });
  }
}
