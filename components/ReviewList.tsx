"use client";
import { useEffect, useState } from "react";
import RatingStars from "./RatingStars";
import ReviewForm from "./ReviewForm";

type Review = {
  id: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  created_at: string;
};

// Danh sách đánh giá đã duyệt + rating trung bình + form gửi đánh giá mới (FR-012, FR-014).
// Sản phẩm chưa có đánh giá nào hiện rõ trạng thái "chưa có đánh giá" (FR-014, edge case
// trong spec.md) — không hiện số sao giả gây hiểu nhầm.
export default function ReviewList({ productSlug }: { productSlug: string }) {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    fetch(`/api/reviews?product_slug=${encodeURIComponent(productSlug)}`)
      .then(res => res.json())
      .then(data => {
        setReviews(data.reviews || []);
        setAvg(data.avg || 0);
      })
      .catch(() => setReviews([]));
  }, [productSlug]);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
        {reviews && reviews.length > 0 ? (
          <>
            <RatingStars value={avg} size={22} />
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, color: "var(--text)" }}>
              {avg.toFixed(1)}/5
            </span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--muted)" }}>
              ({reviews.length} đánh giá)
            </span>
          </>
        ) : (
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--muted)" }}>
            Chưa có đánh giá nào — hãy là người đầu tiên chia sẻ trải nghiệm!
          </span>
        )}
      </div>

      {reviews && reviews.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2rem" }}>
          {reviews.map(r => (
            <div key={r.id} style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
                <RatingStars value={r.rating} size={15} />
                <strong style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--text)" }}>{r.reviewer_name}</strong>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--muted)" }}>
                  {new Date(r.created_at).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--text)", lineHeight: 1.6, margin: 0 }}>
                {r.comment}
              </p>
            </div>
          ))}
        </div>
      )}

      <ReviewForm productSlug={productSlug} />
    </div>
  );
}
