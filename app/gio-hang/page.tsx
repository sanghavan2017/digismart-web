import type { Metadata } from "next";
import CartPage from "@/components/CartPage";

export const metadata: Metadata = {
  title: "Giỏ hàng — DigiSmart",
  description: "Xem lại giỏ hàng — mua ngay máy lọc nước/điều hòa (COD, chuyển khoản) hoặc đặt lịch tư vấn lắp đặt.",
  robots: { index: false },
};

export default function GioHangPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, #042C53 0%, #185FA5 100%)", padding: "2.5rem 0" }}>
        <div className="container">
          <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#fff", marginBottom: "0.5rem" }}>
            Giỏ hàng <span style={{ color: "#F07B20" }}>của bạn</span>
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.8)", fontSize: "0.95rem" }}>
            Mua ngay — thanh toán COD/chuyển khoản, hoặc đặt lịch tư vấn lắp đặt điều hòa trước khi mua.
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
