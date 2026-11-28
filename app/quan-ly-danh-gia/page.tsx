import type { Metadata } from "next";
import ReviewsAdminClient from "@/components/ReviewsAdminClient";

export const metadata: Metadata = {
  title: "Quản lý đánh giá sản phẩm — DigiSmart",
  robots: { index: false, follow: false },
};

export default function QuanLyDanhGiaPage() {
  return <ReviewsAdminClient />;
}
