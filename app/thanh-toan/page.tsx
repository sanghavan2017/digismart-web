import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Thanh toán — DigiSmart",
  description: "Hoàn tất đặt hàng máy lọc nước — giao tận nơi tại TPHCM.",
  robots: { index: false },
};

export default function ThanhToanPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, #042C53 0%, #185FA5 100%)", padding: "2.5rem 0" }}>
        <div className="container">
          <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#fff", marginBottom: "0.5rem" }}>
            Hoàn tất <span style={{ color: "#F07B20" }}>đặt hàng</span>
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.8)", fontSize: "0.95rem" }}>
            Điền thông tin giao hàng — DigiSmart gọi xác nhận trước khi giao.
          </p>
        </div>
      </section>
      <section style={{ padding: "2rem 0 3rem", background: "var(--bg)", minHeight: "50vh" }}>
        <div className="container">
          <CheckoutForm />
        </div>
      </section>
    </>
  );
}
