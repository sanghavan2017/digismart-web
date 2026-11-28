"use client";
import { useEffect, useState } from "react";

type OrderRow = {
  id: string;
  order_code: string;
  status: string;
  payment_method: string;
  payment_status: string;
  shipping_address: string;
  shipping_note: string | null;
  total: number;
  created_at: string;
  customers: { full_name: string; phone: string; email: string | null } | null;
  order_items: { product_name: string; unit_price: number; quantity: number; subtotal: number }[];
};

function formatPrice(n: number) {
  return Number(n).toLocaleString("vi-VN") + "đ";
}

const STORAGE_KEY = "digismart_admin_pw";

export default function OrdersAdminClient() {
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState<OrderRow[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function load(pw: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin-orders", { headers: { Authorization: `Bearer ${pw}` } });
      if (res.status === 401) {
        setError("Sai mật khẩu.");
        setOrders(null);
        try {
          sessionStorage.removeItem(STORAGE_KEY);
        } catch {
          // sessionStorage bị chặn — bỏ qua, không ảnh hưởng chức năng chính
        }
        return;
      }
      if (!res.ok) throw new Error();
      const data = await res.json();
      setOrders(data.orders);
      try {
        sessionStorage.setItem(STORAGE_KEY, pw);
      } catch {
        // sessionStorage bị chặn — vẫn xem được trong phiên hiện tại, chỉ không nhớ cho lần sau
      }
    } catch {
      setError("Không tải được danh sách đơn hàng. Thử lại sau.");
    } finally {
      setLoading(false);
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

  if (orders === null) {
    return (
      <div style={{ maxWidth: 360, margin: "4rem auto", padding: "0 1rem" }}>
        <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "1.2rem", color: "var(--brand)", marginBottom: "1rem" }}>
          Quản lý đơn hàng
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
            {loading ? "Đang kiểm tra..." : "Xem đơn hàng"}
          </button>
          {error && <p style={{ color: "#D64545", fontFamily: "var(--font-sans)", fontSize: "0.85rem" }}>{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1100, margin: "2rem auto", padding: "0 1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
        <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "1.3rem", color: "var(--brand)" }}>
          Đơn hàng ({orders.length})
        </h1>
        <button
          onClick={() => load(password)}
          style={{ background: "none", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 14px", fontFamily: "var(--font-sans)", fontSize: "0.85rem", cursor: "pointer" }}
        >
          🔄 Tải lại
        </button>
      </div>

      {orders.length === 0 ? (
        <p style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}>Chưa có đơn hàng nào.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {orders.map(o => (
            <div key={o.id} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 10, padding: "1rem 1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <div>
                  <strong style={{ fontFamily: "var(--font-sans)", color: "var(--brand)" }}>{o.order_code}</strong>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--muted)", marginLeft: 10 }}>
                    {new Date(o.created_at).toLocaleString("vi-VN")}
                  </span>
                </div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem" }}>
                  <span style={{ background: "var(--brand-light)", padding: "2px 10px", borderRadius: 12, marginRight: 6 }}>{o.status}</span>
                  <span style={{ background: "var(--brand-light)", padding: "2px 10px", borderRadius: 12 }}>
                    {o.payment_method === "cod" ? "COD" : "Chuyển khoản"} · {o.payment_status}
                  </span>
                </div>
              </div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--text)", marginBottom: "0.5rem" }}>
                <strong>{o.customers?.full_name}</strong> — {o.customers?.phone}
                {o.customers?.email ? ` — ${o.customers.email}` : ""}
                <br />
                {o.shipping_address}
                {o.shipping_note ? ` (${o.shipping_note})` : ""}
              </div>
              <table style={{ width: "100%", fontFamily: "var(--font-sans)", fontSize: "0.85rem", borderCollapse: "collapse" }}>
                <tbody>
                  {o.order_items.map((it, idx) => (
                    <tr key={idx} style={{ borderTop: "1px solid var(--border)" }}>
                      <td style={{ padding: "4px 0" }}>{it.product_name}</td>
                      <td style={{ padding: "4px 0", textAlign: "center", width: 60 }}>× {it.quantity}</td>
                      <td style={{ padding: "4px 0", textAlign: "right", width: 140 }}>{formatPrice(it.subtotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ textAlign: "right", fontFamily: "var(--font-sans)", fontWeight: 700, color: "#F07B20", marginTop: "0.5rem" }}>
                Tổng: {formatPrice(o.total)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
