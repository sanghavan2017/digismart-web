"use client";
import { useEffect, useState } from "react";
import RatingStars from "./RatingStars";

type ReviewRow = {
  id: string;
  product_slug: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  created_at: string;
};

const STORAGE_KEY = "digismart_admin_pw";

// Trang nội bộ duyệt/từ chối đánh giá sản phẩm (T041, FR-016) — dùng chung mật khẩu với
// trang quản lý đơn hàng (OrdersAdminClient) vì cùng mức bảo mật phù hợp quy mô hiện tại.
export default function ReviewsAdminClient() {
  const [password, setPassword] = useState("");
  const [reviews, setReviews] = useState<ReviewRow[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [actingOn, setActingOn] = useState<string | null>(null);

  async function load(pw: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin-reviews", { headers: { Authorization: `Bearer ${pw}` } });
      if (res.status === 401) {
        setError("Sai mật khẩu.");
        setReviews(null);
        try {
          sessionStorage.removeItem(STORAGE_KEY);
        } catch {
          // sessionStorage bị chặn — bỏ qua
        }
        return;
      }
      if (!res.ok) throw new Error();
      const data = await res.json();
      setReviews(data.reviews);
      try {
        sessionStorage.setItem(STORAGE_KEY, pw);
      } catch {
        // sessionStorage bị chặn — vẫn xem được trong phiên hiện tại
      }
    } catch {
      setError("Không tải được danh sách đánh giá chờ duyệt. Thử lại sau.");
    } finally {
      setLoading(false);
    }
  }

  async function moderate(id: string, status: "approved" | "rejected") {
    setActingOn(id);
    try {
      await fetch("/api/admin-reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${password}` },
        body: JSON.stringify({ id, status }),
      });
      setReviews(prev => (prev ? prev.filter(r => r.id !== id) : prev));
    } catch {
      setError("Không xử lý được, thử lại.");
    } finally {
      setActingOn(null);
    }
  }

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPassword(saved);
        load(saved);
      }
    } catch {
      // sessionStorage bị chặn (private mode...) — bắt đầu lại từ màn hình nhập mật khẩu
    }
  }, []);

  if (reviews === null) {
    return (
      <div style={{ maxWidth: 360, margin: "4rem auto", padding: "0 1rem" }}>
        <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "1.2rem", color: "var(--brand)", marginBottom: "1rem" }}>
          Quản lý đánh giá sản phẩm
        </h1>
        <form
          onSubmit={e => {
            e.preventDefault();
            load(password);
          }}
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Mật khẩu quản lý"
            autoFocus
            style={{ padding: "10px 14px", border: "1.5px solid var(--border)", borderRadius: 8, fontFamily: "var(--font-sans)", fontSize: "0.95rem" }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ background: "var(--brand)", color: "#fff", padding: "10px", borderRadius: 8, fontFamily: "var(--font-sans)", fontWeight: 700, border: "none", cursor: loading ? "wait" : "pointer" }}
          >
            {loading ? "Đang kiểm tra..." : "Xem đánh giá chờ duyệt"}
          </button>
          {error && <p style={{ color: "#D64545", fontFamily: "var(--font-sans)", fontSize: "0.85rem" }}>{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: "0 1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
        <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "1.3rem", color: "var(--brand)" }}>
          Đánh giá chờ duyệt ({reviews.length})
        </h1>
        <button
          onClick={() => load(password)}
          style={{ background: "none", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 14px", fontFamily: "var(--font-sans)", fontSize: "0.85rem", cursor: "pointer" }}
        >
          🔄 Tải lại
        </button>
      </div>

      {error && <p style={{ color: "#D64545", fontFamily: "var(--font-sans)", fontSize: "0.85rem", marginBottom: "1rem" }}>{error}</p>}

      {reviews.length === 0 ? (
        <p style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}>Không có đánh giá nào đang chờ duyệt.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {reviews.map(r => (
            <div key={r.id} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 10, padding: "1rem 1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <div>
                  <strong style={{ fontFamily: "var(--font-sans)", color: "var(--brand)" }}>{r.product_slug}</strong>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--muted)", marginLeft: 10 }}>
                    {new Date(r.created_at).toLocaleString("vi-VN")}
                  </span>
                </div>
                <RatingStars value={r.rating} size={16} />
              </div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--text)", marginBottom: "0.75rem" }}>
                <strong>{r.reviewer_name}</strong>: {r.comment}
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={() => moderate(r.id, "approved")}
                  disabled={actingOn === r.id}
                  style={{ background: "#2E9E5B", color: "#fff", border: "none", borderRadius: 6, padding: "7px 16px", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.82rem", cursor: actingOn === r.id ? "wait" : "pointer" }}
                >
                  ✓ Duyệt
                </button>
                <button
                  onClick={() => moderate(r.id, "rejected")}
                  disabled={actingOn === r.id}
                  style={{ background: "#fff", color: "#D64545", border: "1.5px solid #D64545", borderRadius: 6, padding: "7px 16px", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.82rem", cursor: actingOn === r.id ? "wait" : "pointer" }}
                >
                  ✕ Từ chối
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
