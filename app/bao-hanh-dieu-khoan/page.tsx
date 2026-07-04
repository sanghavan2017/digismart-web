import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính sách bảo hành & Điều khoản — DigiSmart",
  description:
    "Chính sách bảo hành chính hãng Cleansui, Kitz Micro Filter và điều khoản sử dụng dịch vụ của DigiSmart. Lắp đặt và bảo hành tận nơi tại TPHCM.",
};

export default function BaoHanhDieuKhoanPage() {
  return (
    <main style={{ padding: "4rem 0" }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <h1 style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "2rem", color: "#042C53", marginBottom: "0.5rem" }}>
          Chính sách bảo hành &amp; Điều khoản
        </h1>
        <p style={{ color: "#666", fontFamily: "Calibri, sans-serif", marginBottom: "2.5rem" }}>
          Cập nhật lần cuối: 04/07/2026
        </p>

        <Section title="1. Bảo hành sản phẩm Cleansui (Mitsubishi Chemical)">
          <p>Theo chính sách chính hãng Cleansui áp dụng cho các sản phẩm DigiSmart phân phối:</p>
          <ul>
            <li><strong>Vòi lọc dòng CM</strong> (EU301, EU201, EU202, EU101, EU103): bảo hành <strong>5 năm</strong></li>
            <li><strong>Thân máy / bo mạch</strong>: bảo hành <strong>2 năm</strong></li>
            <li><strong>Lõi lọc</strong>: đổi mới trong <strong>6 tháng</strong> nếu có lỗi kỹ thuật từ nhà sản xuất</li>
          </ul>
          <p>
            DigiSmart <strong>hỗ trợ đăng ký bảo hành với hãng cho khách khi mua hàng</strong> — bạn không cần tự
            đăng ký với hãng, chỉ cần liên hệ DigiSmart khi cần bảo hành.
          </p>
        </Section>

        <Section title="2. Bảo hành sản phẩm Kitz Micro Filter">
          <ul>
            <li><strong>Thiết bị</strong>: bảo hành <strong>24 tháng</strong></li>
            <li><strong>Lõi lọc</strong>: bảo hành <strong>12 tháng</strong></li>
          </ul>
          <p>Việc lắp đặt và bảo hành do đội ngũ DigiSmart trực tiếp thực hiện.</p>
        </Section>

        <Section title="3. Điều kiện bảo hành">
          <p>Bảo hành áp dụng khi:</p>
          <ul>
            <li>Sản phẩm mua tại DigiSmart (website, Shopee, TikTok Shop hoặc hotline)</li>
            <li>Lỗi phát sinh từ nhà sản xuất hoặc trong quá trình lắp đặt bởi DigiSmart</li>
          </ul>
          <p>Bảo hành <strong>không</strong> áp dụng cho các trường hợp:</p>
          <ul>
            <li>Hư hỏng do tự ý tháo lắp, sửa chữa bởi bên thứ ba</li>
            <li>Hư hỏng do thiên tai, nguồn nước/nguồn điện bất thường ngoài thông số khuyến nghị của hãng</li>
            <li>Lõi lọc hết công suất theo tuổi thọ tự nhiên (đây là vật tư tiêu hao, không phải lỗi)</li>
          </ul>
        </Section>

        <Section title="4. Đặt hàng, lắp đặt và thanh toán">
          <ul>
            <li>Website này là kênh giới thiệu sản phẩm và nhận yêu cầu tư vấn — <strong>không thu tiền online</strong></li>
            <li>Sau khi bạn gửi yêu cầu, DigiSmart liên hệ xác nhận sản phẩm, báo giá cuối cùng và hẹn lịch lắp đặt</li>
            <li>Thanh toán thực hiện <strong>khi lắp đặt hoàn tất</strong> (tiền mặt hoặc chuyển khoản)</li>
            <li>Giá niêm yết trên website là giá tham khảo, đã gồm VAT, chưa gồm phụ kiện phát sinh theo hiện trạng nhà (nếu có — sẽ báo trước khi lắp)</li>
            <li>Khu vực lắp đặt tận nơi: TPHCM và vùng lân cận — khu vực khác vui lòng liên hệ trước</li>
          </ul>
        </Section>

        <Section title="5. Liên hệ bảo hành">
          <ul>
            <li>Hotline: <a href="tel:0778886758" style={{ color: "#042C53" }}>0778 886 758</a></li>
            <li>Zalo: <a href="https://zalo.me/0778886758" target="_blank" rel="noopener noreferrer" style={{ color: "#042C53" }}>0778 886 758</a></li>
          </ul>
        </Section>

        <div style={{ marginTop: "2.5rem", padding: "1.25rem 1.5rem", background: "#f5f8fc", borderRadius: 8, borderLeft: "4px solid #042C53" }}>
          <p style={{ fontFamily: "Calibri, sans-serif", color: "#333", margin: 0 }}>
            Cần hỗ trợ bảo hành hoặc có thắc mắc về điều khoản, gọi ngay{" "}
            <a href="tel:0778886758" style={{ color: "#042C53", fontWeight: 600 }}>0778 886 758</a> — DigiSmart phản hồi trong giờ làm việc.
          </p>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "2rem" }}>
      <h2 style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "1.15rem", color: "#042C53", marginBottom: "0.75rem" }}>
        {title}
      </h2>
      <div style={{ fontFamily: "Calibri, sans-serif", fontSize: "1rem", color: "#333", lineHeight: 1.75 }}>
        {children}
      </div>
    </section>
  );
}
