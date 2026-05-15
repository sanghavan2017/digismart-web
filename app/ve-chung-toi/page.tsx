export default function VeChungToiPage() {
  return (
    <>
      <div style={{ background: "var(--brand)", padding: "2.5rem 0" }}>
        <div className="container">
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#fff" }}>Về chúng tôi</h1>
          <p style={{ color: "rgba(255,255,255,0.75)", marginTop: "0.5rem" }}>Nhà phân phối chính thức BBG Unimax Vina</p>
        </div>
      </div>

      <div style={{ padding: "3rem 0 5rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", flexWrap: "wrap" as const, marginBottom: "3rem" }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "var(--brand)", marginBottom: "1rem" }}>Digismart là ai?</h2>
              <p style={{ lineHeight: 1.8, color: "var(--muted)", marginBottom: "1rem" }}>
                Digismart là nhà phân phối chính thức của BBG Unimax Vina — đơn vị nhập khẩu và phân phối các sản phẩm gia dụng chất lượng cao từ Hàn Quốc và quốc tế.
              </p>
              <p style={{ lineHeight: 1.8, color: "var(--muted)" }}>
                Chúng tôi hoạt động theo mô hình B2B2C, phân phối sản phẩm đến tay người tiêu dùng qua các kênh thương mại điện tử và đại lý bán lẻ toàn quốc.
              </p>
            </div>

            <div style={{ background: "var(--brand-light)", borderRadius: 16, padding: "2rem" }}>
              <h3 style={{ color: "var(--brand)", marginBottom: "1.25rem", fontWeight: 600 }}>Tại sao chọn Digismart?</h3>
              {[
                { icon: "✅", text: "Sản phẩm chính hãng, có bảo hành đầy đủ" },
                { icon: "🚀", text: "Giao hàng nhanh toàn quốc qua Shopee, Lazada" },
                { icon: "💬", text: "Hỗ trợ tư vấn 24/7 qua Zalo & điện thoại" },
                { icon: "💰", text: "Giá cạnh tranh, nhiều chương trình khuyến mãi" },
                { icon: "🔄", text: "Đổi trả dễ dàng theo chính sách sàn TMĐT" },
              ].map(item => (
                <div key={item.text} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", fontSize: "0.9rem" }}>
                  <span>{item.icon}</span>
                  <span style={{ color: "var(--text)" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
            {[
              { num: "3+", label: "Thương hiệu phân phối" },
              { num: "5+", label: "Sản phẩm đang bán" },
              { num: "4", label: "Sàn thương mại điện tử" },
              { num: "100%", label: "Hàng chính hãng" },
            ].map(s => (
              <div key={s.label} style={{ background: "var(--brand)", borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "var(--accent)", fontWeight: 700 }}>{s.num}</div>
                <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
