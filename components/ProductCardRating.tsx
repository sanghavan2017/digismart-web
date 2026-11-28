"use client";
import { useEffect, useState } from "react";
import RatingStars from "./RatingStars";

// Rating trung bình gọn cho thẻ sản phẩm ở trang danh mục (T040). Dùng 1 cache dạng
// module-level để mọi thẻ trên cùng trang chia sẻ đúng 1 lượt gọi API, không gọi lặp
// theo từng sản phẩm (Nguyên tắc II — tránh N request không cần thiết).
let summaryPromise: Promise<Record<string, { avg: number; count: number }>> | null = null;
function getSummary() {
  if (!summaryPromise) {
    summaryPromise = fetch("/api/reviews")
      .then(res => res.json())
      .then(data => data.summary || {})
      .catch(() => ({}));
  }
  return summaryPromise;
}

// Sản phẩm chưa có đánh giá nào -> không hiện gì (không bịa sao giả) — khác với trang
// chi tiết sản phẩm (ReviewList) có ghi rõ "chưa có đánh giá" bằng chữ, ở quy mô lưới
// nhiều thẻ thì im lặng là lựa chọn đơn giản hơn, tránh rợp chữ trên mọi thẻ.
export default function ProductCardRating({ productSlug }: { productSlug: string }) {
  const [info, setInfo] = useState<{ avg: number; count: number } | null>(null);

  useEffect(() => {
    getSummary().then(summary => setInfo(summary[productSlug] || null));
  }, [productSlug]);

  if (!info || info.count === 0) return null;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
      <RatingStars value={info.avg} size={13} />
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--muted)" }}>({info.count})</span>
    </div>
  );
}
