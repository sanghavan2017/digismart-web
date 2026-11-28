"use client";
import { useState } from "react";
import RatingStars from "./RatingStars";

// Form gửi đánh giá sản phẩm — khách không cần tài khoản, đánh giá vào trạng thái
// "chờ duyệt" (FR-012/FR-013), hiển thị công khai sau khi DigiSmart duyệt ở /quan-ly-danh-gia.
export default function ReviewForm({ productSlug }: { productSlug: string }) {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<"ok" | "error" | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    setSubmitting(true);
    setResult(null);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug, reviewerName: name.trim(), rating, comment: comment.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Có lỗi xảy ra, vui lòng thử lại.");
        setResult("error");
        return;
      }
      setResult("ok");
      setName("");
      setComment("");
      setRating(5);
    } catch {
      setErrorMsg("Không gửi được, vui lòng thử lại sau.");
      setResult("error");
    } finally {
      setSubmitting(false);
    }
  }

  if (result === "ok") {
    return (
      <div style={{ background: "var(--brand-light)", borderRadius: 8, padding: "1rem 1.25rem", fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--brand)" }}>
        Cảm ơn bạn đã đánh giá! Đánh giá đang chờ DigiSmart duyệt trước khi hiển thị công khai.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 480 }}>
      <div>
        <label style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--muted)", marginBottom: 4 }}>
          Chọn số sao
        </label>
        <RatingStars value={rating} onChange={setRating} readOnly={false} size={24} />
      </div>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Tên của bạn"
        maxLength={100}
        required
        style={{ padding: "10px 14px", border: "1.5px solid var(--border)", borderRadius: 8, fontFamily: "var(--font-sans)", fontSize: "0.9rem" }}
      />
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
        maxLength={1000}
        required
        rows={3}
        style={{ padding: "10px 14px", border: "1.5px solid var(--border)", borderRadius: 8, fontFamily: "var(--font-sans)", fontSize: "0.9rem", resize: "vertical" }}
      />
      {result === "error" && (
        <p style={{ color: "#D64545", fontFamily: "var(--font-sans)", fontSize: "0.82rem", margin: 0 }}>{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={submitting}
        style={{ alignSelf: "flex-start", background: "var(--brand)", color: "#fff", padding: "10px 24px", borderRadius: 8, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.88rem", border: "none", cursor: submitting ? "wait" : "pointer" }}
      >
        {submitting ? "Đang gửi..." : "Gửi đánh giá"}
      </button>
    </form>
  );
}
