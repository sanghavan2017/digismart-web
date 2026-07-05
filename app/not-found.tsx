import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 1.5rem" }}>
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: "5rem", fontWeight: 700, color: "var(--brand)", lineHeight: 1 }}>404</div>
        <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "1.3rem", color: "var(--brand)", margin: "1rem 0 0.5rem" }}>
          Không tìm thấy trang
        </h1>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.75rem" }}>
          Trang bạn tìm không tồn tại hoặc đã được chuyển đi. Có thể sản phẩm đã đổi đường dẫn — xem danh mục bên dưới nhé.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" style={{ background: "var(--accent)", color: "#fff", padding: "12px 26px", borderRadius: 6, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}>
            Về trang chủ
          </Link>
          <Link href="/san-pham" style={{ background: "transparent", color: "var(--brand)", border: "1.5px solid var(--border)", padding: "12px 26px", borderRadius: 6, fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
            Xem sản phẩm
          </Link>
        </div>
      </div>
    </div>
  );
}
