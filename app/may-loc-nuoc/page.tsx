import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import LeadFormButton from "@/components/LeadFormButton";
import AddToCartButton from "@/components/AddToCartButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Máy lọc nước chính hãng, lắp đặt tận nơi tại TPHCM — DigiSmart",
  description:
    "Máy lọc nước Cleansui (Mitsubishi Chemical), Kitz Micro Filter chính hãng — công nghệ Nhật Bản, nhiều cấp lọc, nóng lạnh tiện lợi. Tư vấn miễn phí, lắp đặt tận nơi tại TPHCM.",
};

function formatPrice(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}
function discountPct(orig: number, price: number) {
  return Math.round((1 - price / orig) * 100);
}

const benefits = [
  { icon: "💧", title: "Công nghệ lọc Nhật Bản", desc: "Màng lọc đa cấp loại bỏ vi khuẩn, tạp chất, kim loại nặng — giữ lại khoáng chất có lợi cho sức khỏe." },
  { icon: "🏷️", title: "Hàng chính hãng 100%", desc: "Phân phối trực tiếp Cleansui (Mitsubishi Chemical), Kitz Micro Filter — đầy đủ tem, phiếu bảo hành." },
  { icon: "🔧", title: "Lắp đặt tận nơi", desc: "Đội ngũ kỹ thuật DigiSmart lắp đặt nhanh chóng, hướng dẫn sử dụng và bảo trì tận tình." },
  { icon: "💰", title: "Giá tốt, minh bạch", desc: "Báo giá rõ ràng trọn gói máy + công lắp đặt, không phát sinh chi phí." },
];

const filterStages = [
  { step: "1", title: "Vải lưới", desc: "Lớp lọc đầu tiên giữ lại cặn thô, gỉ sét, cát bụi có kích thước lớn trong nước đầu nguồn." },
  { step: "2", title: "Trao đổi ion", desc: "Loại bỏ clo dư và một số kim loại nặng hòa tan, giảm mùi, vị lạ trong nước." },
  { step: "3", title: "Than hoạt tính", desc: "Hấp thụ tạp chất hữu cơ, hóa chất tồn dư, khử mùi, làm nước trong và sạch hơn." },
  { step: "4", title: "Màng sợi rỗng", desc: "Lỗ lọc siêu nhỏ (cấp độ micromet) chặn vi khuẩn, ký sinh trùng, vẫn giữ lại khoáng chất tự nhiên có lợi." },
];

const filterHighlights = [
  { icon: "🔬", title: "Diện tích bề mặt lọc lớn", desc: "Cấu trúc sợi rỗng dày đặc tăng diện tích tiếp xúc, lọc hiệu quả mà vẫn duy trì lưu lượng nước ổn định." },
  { icon: "🧫", title: "Lỗ lọc cấp độ micromet", desc: "Kích thước lỗ lọc cực nhỏ giữ lại vi khuẩn, ký sinh trùng mà không cần dùng hóa chất diệt khuẩn." },
  { icon: "🍃", title: "Không hóa chất", desc: "Lọc cơ học hoàn toàn, không thêm hóa chất vào nước, an toàn cho cả gia đình dùng lâu dài." },
  { icon: "🛡️", title: "Vật liệu bền, ổn định", desc: "Lõi lọc và thân máy dùng vật liệu cao cấp, ổn định hiệu suất lọc suốt vòng đời sử dụng." },
];

export default function MayLocNuocPage() {
  const items = products.filter(p => p.category === "Máy lọc nước");

  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #042C53 0%, #185FA5 100%)", padding: "3.5rem 0" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", alignItems: "center" }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "#fff", lineHeight: 1.3, marginBottom: "1rem" }}>
              Máy lọc nước <span style={{ color: "#F07B20" }}>chính hãng</span>, lắp đặt tận nơi
            </h1>
            <p style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.85)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              DigiSmart cung cấp & lắp đặt máy lọc nước Cleansui (Mitsubishi Chemical), Kitz Micro Filter chính hãng — công nghệ Nhật Bản nhiều cấp lọc, nóng lạnh tiện lợi cho cả gia đình.
            </p>
            <LeadFormButton productName="Dịch vụ lắp đặt máy lọc nước" style={{ padding: "14px 32px", borderRadius: 8, fontSize: "1rem", background: "#F07B20" }}>
              📩 Nhận báo giá ngay
            </LeadFormButton>
          </div>
          <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 12px 32px rgba(0,0,0,0.25)" }}>
            <Image src="/images/products/cleansui-cwmf-500e.jpg" alt="Máy lọc nước Cleansui CWMF-500E" width={500} height={500} style={{ width: "100%", height: "auto", display: "block", background: "#fff" }} />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: "3rem 0", background: "var(--bg)" }}>
        <div className="container">
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "1.4rem", color: "var(--brand)", textAlign: "center", marginBottom: "2rem" }}>
            Vì sao chọn DigiSmart?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
            {benefits.map(b => (
              <div key={b.title} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 10, padding: "1.5rem", textAlign: "center" }}>
                <div style={{ fontSize: "2.2rem", marginBottom: "0.75rem" }}>{b.icon}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1rem", color: "var(--brand)", marginBottom: "0.5rem" }}>
                  {b.title}
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--text)", lineHeight: 1.6 }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Công nghệ lọc */}
      <section style={{ padding: "3.5rem 0", background: "#fff" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", alignItems: "center", marginBottom: "2.5rem" }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "1.4rem", color: "var(--brand)", marginBottom: "0.75rem" }}>
                Công nghệ lọc nước Nhật Bản
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", color: "var(--muted)" }}>
                Các dòng máy Cleansui và Kitz Micro Filter DigiSmart phân phối đều dùng công nghệ lọc đa cấp của Nhật Bản, lõi lọc là màng sợi rỗng (hollow fiber membrane): loại bỏ vi khuẩn, tạp chất, kim loại nặng mà vẫn giữ lại khoáng chất tự nhiên có lợi cho cơ thể.
              </p>
            </div>
            <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)" }}>
              <Image src="/images/tech/cong-nghe-mang-soi-rong.jpg" alt="Công nghệ màng lọc sợi rỗng" width={640} height={360} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          </div>

          {/* 4 cấp lọc */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem", marginBottom: "2.5rem" }}>
            {filterStages.map(s => (
              <div key={s.step} style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 10, padding: "1.5rem 1.25rem", position: "relative" }}>
                <div style={{ position: "absolute", top: 14, right: 14, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.6rem", color: "var(--brand-light)" }}>
                  {s.step}
                </div>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.98rem", color: "var(--brand)", marginBottom: "0.5rem" }}>
                  Cấp {s.step}: {s.title}
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--text)", lineHeight: 1.6 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          {/* 4 ưu điểm công nghệ */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
            {filterHighlights.map(h => (
              <div key={h.title} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                <div style={{ fontSize: "1.6rem", flexShrink: 0 }}>{h.icon}</div>
                <div>
                  <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.92rem", color: "var(--brand)", marginBottom: "0.3rem" }}>
                    {h.title}
                  </div>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.84rem", color: "var(--text)", lineHeight: 1.6 }}>
                    {h.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Ảnh minh hoạ cấu trúc màng lọc */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem", marginTop: "2.5rem" }}>
            <div>
              <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)" }}>
                <Image src="/images/tech/cau-truc-soi-rong.jpg" alt="Cấu trúc màng sợi rỗng" width={500} height={400} style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--muted)", textAlign: "center", marginTop: "0.5rem" }}>
                Cấu trúc bó sợi rỗng — diện tích bề mặt lọc lớn, lưu lượng nước ổn định
              </p>
            </div>
            <div>
              <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)" }}>
                <Image src="/images/tech/chan-vi-khuan-sem.jpg" alt="Màng lọc chặn vi khuẩn ở cấp độ micromet" width={500} height={400} style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--muted)", textAlign: "center", marginTop: "0.5rem" }}>
                Ảnh kính hiển vi: lỗ lọc cấp độ micromet chặn vi khuẩn mà không cần hóa chất
              </p>
            </div>
          </div>

          {/* Video minh hoạ */}
          <div style={{ marginTop: "2.5rem", maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
            <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", color: "var(--brand)", textAlign: "center", marginBottom: "1rem" }}>
              Video: Công nghệ màng lọc sợi rỗng hoạt động như thế nào
            </h3>
            <div style={{ position: "relative", paddingBottom: "56.25%", borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)" }}>
              <iframe
                src="https://www.youtube.com/embed/8Ejncdl2Tg0"
                title="Công nghệ màng lọc sợi rỗng"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product list */}
      <section style={{ padding: "3rem 0", background: "#fff" }}>
        <div className="container">
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "1.4rem", color: "var(--brand)", marginBottom: "1.5rem" }}>
            Các dòng máy lọc nước đang phân phối
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {items.map((p, idx) => (
              <div key={p.id} style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
                <Link href={`/san-pham/${p.id}`} style={{ textDecoration: "none", display: "block" }}>
                  <div style={{ background: "#fff", borderBottom: "1px solid var(--border)", height: 150, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3.5rem", position: "relative", overflow: "hidden" }}>
                    {p.imageUrl ? (
                      <Image src={p.imageUrl} alt={p.name} fill sizes="(max-width: 768px) 90vw, 260px" priority={idx < 4} style={{ objectFit: "contain", padding: "0.75rem" }} />
                    ) : (
                      p.icon
                    )}
                    {discountPct(p.originalPrice, p.price) > 0 && (
                      <span style={{ position: "absolute", top: 10, left: 10, background: "#F07B20", color: "#fff", fontSize: "0.7rem", fontWeight: 700, padding: "3px 9px", borderRadius: 4 }}>
                        -{discountPct(p.originalPrice, p.price)}%
                      </span>
                    )}
                  </div>
                  <div style={{ padding: "1rem 1rem 0" }}>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>
                      {p.brand} · {p.capacity_lph} lít/giờ · {p.stages} cấp lọc
                      {p.has_hot && p.has_cold ? " · Nóng lạnh" : p.has_cold ? " · Có lạnh" : p.has_hot ? " · Có nóng" : ""}
                    </div>
                    <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.92rem", color: "var(--text)", lineHeight: 1.4, marginBottom: "0.6rem", minHeight: 40 }}>
                      {p.name}
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: "0.4rem" }}>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", fontWeight: 700, color: "var(--brand2)" }}>
                        {formatPrice(p.price)}
                      </span>
                      {p.originalPrice > p.price && (
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--muted)", textDecoration: "line-through" }}>
                          {formatPrice(p.originalPrice)}
                        </span>
                      )}
                    </div>
                    {p.price_install != null && (
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--muted)", marginBottom: "0.6rem" }}>
                        + Công lắp đặt từ {formatPrice(p.price_install)} · Bảo hành {p.warranty_years} năm
                      </p>
                    )}
                  </div>
                </Link>
                <div style={{ padding: "0 1rem 1rem" }}>
                  <LeadFormButton productName={p.name} style={{ width: "100%", padding: "10px 0", borderRadius: 6, fontSize: "0.82rem" }}>
                    Nhận báo giá
                  </LeadFormButton>
                  {p.inStock && (
                    <AddToCartButton
                      product={{ id: p.id, name: p.name, price: p.price, imageUrl: p.imageUrl, icon: p.icon }}
                      style={{ width: "100%", padding: "9px 0", borderRadius: 6, fontSize: "0.82rem", marginTop: 8 }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form CTA */}
      <section style={{ padding: "3rem 0", background: "var(--bg)" }}>
        <div className="container" style={{ maxWidth: 480, textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "1.3rem", color: "var(--brand)", marginBottom: "0.75rem" }}>
            Cần tư vấn chọn máy lọc nước phù hợp?
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", color: "var(--text)", marginBottom: "1.5rem" }}>
            Để lại thông tin, đội ngũ DigiSmart sẽ liên hệ tư vấn và báo giá lắp đặt miễn phí.
          </p>
          <LeadFormButton productName="Dịch vụ lắp đặt máy lọc nước" style={{ padding: "14px 32px", borderRadius: 8, fontSize: "1rem", background: "#F07B20" }}>
            📩 Nhận báo giá ngay
          </LeadFormButton>
        </div>
      </section>
    </>
  );
}
