import type { Metadata } from "next";
import CartPage from "@/components/CartPage";

export const metadata: Metadata = {
  title: "Giỏ hàng & Đặt lịch lắp đặt — DigiSmart",
  description: "Chọn nhiều sản phẩm, đặt lịch lắp đặt một lần — DigiSmart lắp tận nơi tại TPHCM, thanh toán khi lắp đặt.",
};

export default function GioHangPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, #042C53 0%, #185FA5 100%)", padding: "2.5rem 0" }}>
        <div className="container">
          <h1 style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#fff", marginBottom: "0.5rem" }}>
            Giỏ hàng & <span style={{ color: "#F07B20" }}>Đặt lịch lắp đặt</span>
          </h1>
          <p style={{ fontFamily: "Calibri, sans-serif", color: "rgba(255,255,255,0.8)", fontSize: "0.95rem" }}>
            Chọn sản phẩm, để lại thông tin — DigiSmart gọi xác nhận lịch, thanh toán khi lắp đặt.
          </p>
        </div>
      </section>
      <section style={{ padding: "2rem 0 3rem", background: "var(--bg)", minHeight: "50vh" }}>
        <div className="container">
          <CartPage />
        </div>
      </section>
    </>
  );
}
