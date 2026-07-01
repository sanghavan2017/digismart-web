import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính sách bảo mật — DigiSmart",
  description: "Chính sách bảo mật thông tin khách hàng của DigiSmart. Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn.",
};

export default function ChinhSachBaoMatPage() {
  return (
    <main style={{ padding: "4rem 0" }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <h1 style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "2rem", color: "#042C53", marginBottom: "0.5rem" }}>
          Chính sách bảo mật thông tin
        </h1>
        <p style={{ color: "#666", fontFamily: "Calibri, sans-serif", marginBottom: "2.5rem" }}>
          Cập nhật lần cuối: 01/07/2026
        </p>

        <Section title="1. Chúng tôi thu thập thông tin gì?">
          <p>Khi bạn điền form tư vấn hoặc đặt lịch lắp đặt trên website <strong>digismartvn.vn</strong>, chúng tôi thu thập các thông tin sau:</p>
          <ul>
            <li>Họ và tên</li>
            <li>Số điện thoại</li>
            <li>Nội dung yêu cầu tư vấn (nếu có)</li>
          </ul>
          <p>Chúng tôi <strong>không</strong> thu thập thông tin thẻ ngân hàng, mật khẩu, hoặc thông tin tài chính qua website này.</p>
        </Section>

        <Section title="2. Tại sao chúng tôi thu thập?">
          <p>Thông tin được dùng duy nhất để:</p>
          <ul>
            <li>Liên hệ lại tư vấn sản phẩm theo yêu cầu của bạn</li>
            <li>Xếp lịch lắp đặt hoặc bảo hành tại nhà</li>
          </ul>
          <p>Chúng tôi không dùng thông tin của bạn để gửi quảng cáo từ bên thứ ba.</p>
        </Section>

        <Section title="3. Chúng tôi lưu trữ và bảo vệ thông tin như thế nào?">
          <p>Thông tin bạn gửi được lưu trữ an toàn trên hệ thống Cloudflare KV (mã hóa tại tầng lưu trữ) và chuyển về email nội bộ của DigiSmart qua dịch vụ Resend (tuân thủ SOC 2 Type II). Chúng tôi không chia sẻ, bán, hoặc cho thuê thông tin của bạn cho bất kỳ bên thứ ba nào.</p>
        </Section>

        <Section title="4. Quyền của bạn">
          <p>Bạn có quyền:</p>
          <ul>
            <li>Yêu cầu xem lại thông tin bạn đã cung cấp</li>
            <li>Yêu cầu xóa thông tin của bạn khỏi hệ thống</li>
          </ul>
          <p>Để thực hiện các quyền trên, liên hệ chúng tôi qua:</p>
          <ul>
            <li>Hotline: <a href="tel:0778886758" style={{ color: "#042C53" }}>0778 886 758</a></li>
            <li>Zalo: <a href="https://zalo.me/0778886758" target="_blank" rel="noopener noreferrer" style={{ color: "#042C53" }}>0778 886 758</a></li>
          </ul>
        </Section>

        <Section title="5. Cookie và phân tích">
          <p>Website sử dụng Google Analytics 4 để đo lường lưu lượng truy cập (số người xem, trang phổ biến, nguồn truy cập). Dữ liệu này là ẩn danh và tổng hợp — không gắn với danh tính cá nhân của bạn. Bạn có thể tắt theo dõi Analytics bằng tiện ích mở rộng <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: "#042C53" }}>Google Analytics Opt-out</a>.</p>
        </Section>

        <Section title="6. Thay đổi chính sách">
          <p>Nếu chính sách này có cập nhật, chúng tôi sẽ thay đổi ngày "Cập nhật lần cuối" ở đầu trang. Các thay đổi có hiệu lực ngay khi đăng tải.</p>
        </Section>

        <div style={{ marginTop: "2.5rem", padding: "1.25rem 1.5rem", background: "#f5f8fc", borderRadius: 8, borderLeft: "4px solid #042C53" }}>
          <p style={{ fontFamily: "Calibri, sans-serif", color: "#333", margin: 0 }}>
            Nếu có thắc mắc về chính sách bảo mật, vui lòng liên hệ DigiSmart qua hotline{" "}
            <a href="tel:0778886758" style={{ color: "#042C53", fontWeight: 600 }}>0778 886 758</a>.
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
