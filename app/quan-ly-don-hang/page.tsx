import type { Metadata } from "next";
import OrdersAdminClient from "@/components/OrdersAdminClient";

export const metadata: Metadata = {
  title: "Quản lý đơn hàng — DigiSmart",
  robots: { index: false, follow: false },
};

export default function QuanLyDonHangPage() {
  return <OrdersAdminClient />;
}
