import Link from "next/link";
import Image from "next/image";
import { Noto_Serif_JP, Noto_Sans_JP } from "next/font/google";
import { products } from "@/data/products";
import LeadFormButton from "@/components/LeadFormButton";
import type { Metadata } from "next";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  variable: "--font-cleansui-serif",
  display: "swap",
});
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-cleansui-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Máy Lọc Nước Cleansui Chính Hãng Nhật Bản — Giữ Khoáng, Lọc 0,01 Micromet | DigiSmart",
  description:
    "10 dòng máy lọc nước Cleansui (Mitsubishi Chemical) chính hãng Nhật Bản — để bàn, dưới bồn rửa, nóng lạnh, thương mại, lọc tổng đầu nguồn. Bảo hành vòi 5 năm. DigiSmart tư vấn & lắp đặt tại TPHCM.",
  alternates: { canonical: "/may-loc-nuoc/cleansui" },
};

function formatPrice(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

function getProduct(id: string) {
  const p = products.find(pr => pr.id === id);
  if (!p) throw new Error(`Sản phẩm "${id}" không tồn tại trong data/products.ts`);
  return p;
}

const cleansuiFilters = products.filter(p => p.brand === "Cleansui" && p.category === "Máy lọc nước");

const familyModels = [
  { id: "cleansui-eu301", installType: "Để bàn, vòi rời", feature: "6 chế độ nước, pH 5,0–10,5" },
  { id: "cleansui-eu201", installType: "Tích hợp dưới bồn, vòi xoay 120°", feature: "Không dùng điện, không nước thải" },
  { id: "cleansui-eu202", installType: "Tích hợp dưới bồn, vòi xoay 100°", feature: "Giá tốt hơn EU201" },
  { id: "cleansui-eu103", installType: "Tích hợp dưới bồn", feature: "Rẻ nhất dòng dưới bồn rửa" },
  { id: "cleansui-cwmf-500e", installType: "Đứng sàn, tích hợp nóng/lạnh", feature: "Nóng 80–90°C · Lạnh 4–10°C" },
];

const commercialModels = [
  { id: "cleansui-mp02-3", filterName: "UMC2150", capacity: "150.000 L/năm", flow: "10 L/phút", feature: "Thân thép không gỉ, không dùng điện" },
  { id: "cleansui-mp02-4", filterName: "UMC2050", capacity: "50.000 L/năm", flow: "8 L/phút", feature: "Gọn hơn MP02-3, cùng công nghệ lọc" },
];

const wholeHouseModels = [
  { id: "cleansui-mpoe-s", filterCount: "2 × MPOE050E", feature: "Nhỏ gọn nhất dòng" },
  { id: "cleansui-mpoe-p", filterCount: "2 × MPOE050E", feature: "Màn hình cảm ứng TFT 8,4″" },
  { id: "cleansui-mpoe-s4", filterCount: "4 × MPOE050E", feature: "Tuổi thọ 500.000 L / bộ lọc" },
];

const filterLayers = [
  { idx: "01", name: "Vải không dệt", role: "Chặn cặn thô, rỉ sét, cát trong nước đầu vào" },
  { idx: "02", name: "Sợi trao đổi ion", role: "Hấp phụ kim loại nặng hoà tan trong nước" },
  { idx: "03", name: "Than hoạt tính", role: "Khử clo dư, khử mùi và màu bất thường" },
  { idx: "04", name: "Màng sợi rỗng", role: "Lọc tới 0,01 micromet, chặn vi khuẩn — vẫn giữ khoáng tự nhiên" },
];

const trustCards = [
  { idx: "01", title: "Viện Pasteur", body: "Kiểm nghiệm độc lập chất lượng nước đầu ra tại Việt Nam." },
  { idx: "02", title: "Tiêu chuẩn JIS", body: "Đạt chuẩn công nghiệp Nhật Bản (Japanese Industrial Standards)." },
  { idx: "03", title: "TCĐLCL Việt Nam", body: "Được Tổng cục Tiêu chuẩn Đo lường Chất lượng Việt Nam công nhận." },
  { idx: "04", title: "40+ quốc gia", body: "Cleansui của Mitsubishi Chemical đã có mặt tại hơn 40 quốc gia." },
];

const serif = "var(--font-cleansui-serif), 'Times New Roman', serif";
const sans = "var(--font-cleansui-sans), var(--font-sans), sans-serif";
const mono = "'IBM Plex Mono', 'Consolas', monospace";
// var(--muted) của site (#B4B2A9) chỉ ~2:1 contrast trên nền sáng — quá mờ cho chữ cỡ vừa/lớn.
// Dùng màu slate-navy đậm hơn (~5:1, đạt WCAG AA) cho toàn bộ text phụ trên trang này.
const soft = "#4A6B8A";

export default function CleansuiLandingPage() {
  const hero = getProduct("cleansui-eu301");

  return (
    <div className={`${notoSerifJP.variable} ${notoSansJP.variable}`} style={{ fontFamily: sans, background: "var(--bg)" }}>
      <style>{`
        .lp-hero-grid{display:grid;grid-template-columns:minmax(0,420px) 1fr;gap:48px;align-items:center;}
        .lp-split-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;}
        .lp-install-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:48px;align-items:center;}
        .lp-spec-rail{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--border);}
        .lp-stat-grid{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--border);margin-bottom:28px;}
        .lp-trust-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border:1px solid var(--border);}
        .lp-review-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
        .lp-layer-row{display:grid;grid-template-columns:64px 1.4fr 2fr;}
        @media (max-width:900px){
          .lp-hero-grid{grid-template-columns:1fr;}
          .lp-split-grid{grid-template-columns:1fr;}
          .lp-install-grid{grid-template-columns:1fr;}
        }
        @media (max-width:700px){
          .lp-stat-grid{grid-template-columns:1fr 1fr;}
          .lp-spec-rail{grid-template-columns:1fr;}
        }
        @media (max-width:560px){
          .lp-trust-grid{grid-template-columns:1fr;}
          .lp-layer-row{grid-template-columns:48px 1fr;}
          .lp-layer-row .lp-layer-role{grid-column:1/-1;}
        }
        @media (max-width:800px){
          .lp-review-grid{grid-template-columns:1fr;}
        }
      `}</style>
      {/* Ticker */}
      <div style={{ background: "var(--brand)", color: "var(--bg)", fontFamily: mono, fontSize: 11.5, letterSpacing: "0.08em", padding: "6px 0", textAlign: "center", textTransform: "uppercase" }}>
        Mitsubishi Chemical Cleansui &nbsp;·&nbsp; Nhập khẩu nguyên chiếc từ Nhật Bản &nbsp;·&nbsp; Phân phối bởi DigiSmart
      </div>

      {/* Hero */}
      <section style={{ padding: "56px 0 64px" }}>
        <div className="container lp-hero-grid">
          <div>
            <div style={{ position: "relative", background: "#fff", border: "1px solid var(--border)", padding: 18 }}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "4/5", background: "var(--water-tint)" }}>
                <Image src={hero.imageUrl!} alt="Máy lọc nước tạo ion kiềm Cleansui EU301" fill sizes="(max-width: 768px) 90vw, 420px" style={{ objectFit: "contain", padding: 12 }} priority />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontFamily: mono, fontSize: 11, color: soft, letterSpacing: "0.04em" }}>
                <span>ẢNH CHỤP THỰC TẾ SẢN PHẨM</span>
                <span style={{ color: "var(--water)" }}>EU301 · CM SERIES</span>
              </div>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: mono, fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--water)", display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <span style={{ width: 22, height: 1, background: "var(--accent)", display: "inline-block" }} />
              Công nghệ màng sợi rỗng — Mitsubishi Chemical, Nhật Bản
            </div>
            <h1 style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(32px,4vw,50px)", lineHeight: 1.1, color: "var(--brand)", margin: "0 0 20px" }}>
              Lọc sạch khuẩn.<br /><em style={{ fontStyle: "normal", color: "var(--water)" }}>Giữ nguyên khoáng.</em>
            </h1>
            <p style={{ fontSize: 17, color: soft, maxWidth: "52ch", margin: "0 0 30px", lineHeight: 1.6 }}>
              Cleansui không phải máy RO. Màng sợi rỗng loại bỏ vi khuẩn và tạp chất tới 0,01 micromet trong nước máy, nhưng không tước đi khoáng tự nhiên có lợi — khác biệt cốt lõi so với lọc RO thông thường.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 38 }}>
              <LeadFormButton style={{ padding: "13px 24px", borderRadius: 4, fontSize: 14.5 }}>
                Nhận tư vấn chọn máy
              </LeadFormButton>
              <a href="#dong-may" style={{ padding: "12px 23px", borderRadius: 4, border: "1.5px solid var(--border)", color: "var(--brand)", textDecoration: "none", fontWeight: 700, fontSize: 14.5 }}>
                Xem {cleansuiFilters.length} dòng máy Cleansui
              </a>
            </div>
            <div className="lp-spec-rail">
              <div style={{ padding: "16px 18px 16px 0", borderRight: "1px solid var(--border)" }}>
                <div style={{ fontFamily: mono, fontSize: 20, color: "var(--water)" }}>0,01 μm</div>
                <div style={{ fontSize: 12.5, color: soft, marginTop: 4 }}>kích thước lọc màng sợi rỗng</div>
              </div>
              <div style={{ padding: "16px 18px", borderRight: "1px solid var(--border)" }}>
                <div style={{ fontFamily: mono, fontSize: 20, color: "var(--water)" }}>pH 5,0–10,5</div>
                <div style={{ fontSize: 12.5, color: soft, marginTop: 4 }}>6 chế độ nước (dòng EU301)</div>
              </div>
              <div style={{ padding: "16px 0 16px 18px" }}>
                <div style={{ fontFamily: mono, fontSize: 20, color: "var(--water)" }}>8.000 L / năm</div>
                <div style={{ fontSize: 12.5, color: soft, marginTop: 4 }}>≈ 22 lít nước mỗi ngày</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div style={{ background: "var(--water-tint)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "16px 0" }}>
        <div className="container" style={{ display: "flex", flexWrap: "wrap", gap: "8px 28px", justifyContent: "center", fontSize: 13, fontFamily: mono, color: "var(--brand)" }}>
          {["Chứng nhận Viện Pasteur", "Tiêu chuẩn JIS — Nhật Bản", "Tổng cục Tiêu chuẩn Đo lường Chất lượng VN", "Bảo hành vòi 5 năm"].map(t => (
            <span key={t} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Trust & Authority mở rộng */}
      <section className="container" style={{ padding: "64px 0 0" }}>
        <SectionHead title="Vì sao tin được Cleansui" desc="Không chỉ lời quảng cáo — mỗi tuyên bố đều có tổ chức kiểm định hoặc tiêu chuẩn đứng sau." />
        <div className="lp-trust-grid">
          {trustCards.map(c => (
            <div key={c.idx} style={{ background: "#fff", padding: "22px 20px" }}>
              <div style={{ fontFamily: mono, color: "var(--accent)", fontSize: 13, marginBottom: 10 }}>✓ {c.idx}</div>
              <h3 style={{ fontFamily: serif, fontSize: 15, fontWeight: 600, color: "var(--brand)", margin: "0 0 6px" }}>{c.title}</h3>
              <p style={{ margin: 0, fontSize: 13, color: soft, lineHeight: 1.5 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cấu trúc lõi lọc */}
      <section className="container" style={{ padding: "64px 0" }} id="loc">
        <SectionHead title="Cấu trúc lõi lọc 4 lớp" desc="Mỗi lớp đảm nhiệm một vai trò riêng — nước đi qua tuần tự từ thô đến tinh, giữ lại khoáng ở lớp cuối cùng." />
        <div style={{ border: "1px solid var(--border)" }}>
          {filterLayers.map((l, i) => (
            <div key={l.idx} className="lp-layer-row" style={{ borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
              <div style={{
                fontFamily: mono, fontSize: 13, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                background: ["#5C7690", "#2E6E9E", "#185FA5", "#042C53"][i],
              }}>{l.idx}</div>
              <div style={{ padding: "20px 22px", fontFamily: serif, fontWeight: 600, fontSize: 17, borderRight: "1px solid var(--border)", display: "flex", alignItems: "center", color: "var(--brand)" }}>
                {l.name}
              </div>
              <div className="lp-layer-role" style={{ padding: "20px 22px", color: soft, fontSize: 14.5, display: "flex", alignItems: "center" }}>
                <span style={{ color: "var(--water)", marginRight: 8, fontFamily: mono }}>→</span>{l.role}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dòng sản phẩm */}
      <section className="container" style={{ padding: "0 0 64px" }} id="dong-may">
        <SectionHead title={`${cleansuiFilters.length} dòng máy — chọn theo cách lắp đặt`} desc="Từ máy để bàn tạo ion kiềm đến hệ lọc tổng đầu nguồn cho cả căn nhà." />

        <DatasheetTable caption="Dòng gia đình — lắp bàn / dưới bồn rửa / nóng lạnh">
          <thead>
            <tr>
              <Th>Model</Th><Th>Kiểu lắp đặt</Th><Th>Công suất lọc</Th><Th>Lưu lượng</Th><Th>Đặc điểm</Th><Th align="right">Giá</Th>
            </tr>
          </thead>
          <tbody>
            {familyModels.map(m => {
              const p = getProduct(m.id);
              return (
                <tr key={m.id}>
                  <SkuCell id={m.id} name={p.name.replace(/^Máy Lọc Nước.*Cleansui\s*/i, "")} imageUrl={p.imageUrl!} tag={m.id === "cleansui-eu301" ? "Tạo ion kiềm" : m.id === "cleansui-cwmf-500e" ? "Nóng lạnh" : "Dưới bồn rửa"} />
                  <Td>{m.installType}</Td>
                  <TdNum>8.000 L/năm</TdNum>
                  <TdNum>3 L/phút</TdNum>
                  <Td>{m.feature}</Td>
                  <TdPrice>{formatPrice(p.price)}</TdPrice>
                </tr>
              );
            })}
          </tbody>
        </DatasheetTable>

        <div style={{ height: 28 }} />

        <DatasheetTable caption="Dòng thương mại — văn phòng, nhà hàng, spa">
          <thead>
            <tr>
              <Th>Model</Th><Th>Bộ lọc kèm theo</Th><Th>Công suất lọc</Th><Th>Lưu lượng</Th><Th>Đặc điểm</Th><Th align="right">Giá</Th>
            </tr>
          </thead>
          <tbody>
            {commercialModels.map(m => {
              const p = getProduct(m.id);
              return (
                <tr key={m.id}>
                  <SkuCell id={m.id} name={p.name.replace(/^Máy Lọc Nước.*Cleansui\s*/i, "")} imageUrl={p.imageUrl!} tag="Thương mại" />
                  <TdNum>{m.filterName}</TdNum>
                  <TdNum>{m.capacity}</TdNum>
                  <TdNum>{m.flow}</TdNum>
                  <Td>{m.feature}</Td>
                  <TdPrice>{formatPrice(p.price)}</TdPrice>
                </tr>
              );
            })}
          </tbody>
        </DatasheetTable>

        <div style={{ height: 28 }} />

        <DatasheetTable caption="Dòng lọc tổng đầu nguồn — cần khảo sát kỹ thuật trước lắp đặt">
          <thead>
            <tr>
              <Th>Model</Th><Th>Bộ lọc kèm theo</Th><Th>Lưu lượng</Th><Th>Đặc điểm</Th><Th align="right">Giá</Th>
            </tr>
          </thead>
          <tbody>
            {wholeHouseModels.map(m => {
              const p = getProduct(m.id);
              return (
                <tr key={m.id}>
                  <SkuCell id={m.id} name={p.name.replace(/^Hệ Thống Lọc Tổng Đầu Nguồn Cleansui\s*/i, "")} imageUrl={p.imageUrl!} tag="Lọc tổng đầu nguồn" />
                  <TdNum>{m.filterCount}</TdNum>
                  <Td>Gần như không giới hạn</Td>
                  <Td>{m.feature}</Td>
                  <TdPrice>{formatPrice(p.price)}</TdPrice>
                </tr>
              );
            })}
          </tbody>
        </DatasheetTable>
      </section>

      {/* Social proof */}
      <section className="container" style={{ padding: "0 0 64px" }}>
        <SectionHead title="Quy mô đang phân phối" desc="Số liệu thật từ danh mục Cleansui DigiSmart đang bán — không phải ước tính." />
        <div className="lp-stat-grid">
          {[
            { num: String(cleansuiFilters.length), lbl: "dòng máy Cleansui đang phân phối" },
            { num: "5 năm", lbl: "bảo hành vòi, dài nhất phân khúc" },
            { num: "40+", lbl: "quốc gia Cleansui đã có mặt" },
            { num: "0,01 μm", lbl: "ngưỡng lọc màng sợi rỗng" },
          ].map((s, i) => (
            <div key={s.lbl} style={{ padding: 22, borderRight: i < 3 ? "1px solid var(--border)" : "none", textAlign: "center" }}>
              <div style={{ fontFamily: mono, fontSize: 26, color: "var(--water)" }}>{s.num}</div>
              <div style={{ fontSize: 12, color: soft, marginTop: 6 }}>{s.lbl}</div>
            </div>
          ))}
        </div>
        <div className="lp-review-grid">
          {[
            { text: "Khu vực đánh giá khách hàng đang được DigiSmart tổng hợp từ Shopee Mall & TikTok Shop.", src: "Cập nhật sau đơn hàng đầu tiên" },
            { text: "Mỗi đơn lắp đặt đều có ảnh thực tế lưu lại — xem ví dụ ở phần \"Lắp đặt thực tế\" bên dưới.", src: "Quy trình xác minh" },
            { text: "DigiSmart hỗ trợ đăng ký bảo hành trực tiếp với hãng — khách không cần tự liên hệ Cleansui.", src: "Cam kết hậu mãi" },
          ].map(r => (
            <div key={r.src} style={{ border: "1px solid var(--border)", padding: 20, background: "#fff" }}>
              <div style={{ color: "var(--accent)", fontFamily: mono, fontSize: 13, marginBottom: 10, letterSpacing: 2 }}>★★★★★</div>
              <p style={{ margin: 0, fontSize: 13.5, color: soft, lineHeight: 1.55 }}>{r.text}</p>
              <div style={{ marginTop: 12, fontFamily: mono, fontSize: 10.5, color: "var(--brand)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{r.src}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Lắp đặt thực tế */}
      <section className="container" style={{ padding: "0 0 64px" }} id="lap-dat">
        <div className="lp-install-grid">
          <div style={{ position: "relative", border: "1px solid var(--border)", background: "#fff" }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "16/11" }}>
              <Image src="/images/products/cleansui-eu202-gallery-2.png" alt="Lõi lọc Cleansui treo dưới gầm tủ bếp, đấu nối vào đường cấp nước lạnh" fill sizes="(max-width: 900px) 90vw, 600px" style={{ objectFit: "contain" }} />
            </div>
            <span style={{ position: "absolute", bottom: 14, left: 14, background: "var(--brand)", color: "var(--bg)", fontFamily: mono, fontSize: 11, padding: "6px 10px", letterSpacing: "0.05em" }}>
              LẮP ĐẶT THỰC TẾ · DƯỚI BỒN RỬA
            </span>
          </div>
          <div>
            <div style={{ fontFamily: mono, fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--water)", marginBottom: 14 }}>Không chỉ ảnh studio</div>
            <p style={{ fontFamily: serif, fontWeight: 600, fontSize: 24, lineHeight: 1.3, color: "var(--brand)", margin: "0 0 18px" }}>
              "Lõi lọc treo gọn dưới gầm tủ, đấu thẳng vào đường nước lạnh có sẵn — không khoan thêm lỗ trên mặt đá."
            </p>
            <p style={{ color: soft, fontSize: 15, margin: "0 0 24px", maxWidth: "46ch" }}>
              Khách thường hỏi &quot;lõi lọc để đâu, có chiếm chỗ tủ không&quot; — ảnh lắp đặt thực tế này trả lời trực tiếp, thay vì chỉ xem ảnh sản phẩm rời trên nền trắng.
            </p>
            <a href="#dong-may" style={{ padding: "12px 23px", borderRadius: 4, border: "1.5px solid var(--border)", color: "var(--brand)", textDecoration: "none", fontWeight: 700, fontSize: 14.5 }}>
              Xem toàn bộ dòng máy →
            </a>
          </div>
        </div>
      </section>

      {/* Bảo hành */}
      <div style={{ background: "linear-gradient(135deg, #042C53 0%, #185FA5 100%)", color: "#F4F7FA", padding: "40px 0" }} id="bao-hanh">
        <div className="container" style={{ display: "flex", gap: 40, flexWrap: "wrap", justifyContent: "space-between" }}>
          {[
            { num: "05", title: "Bảo hành vòi 5 năm", body: "Thân máy và bo mạch bảo hành 2 năm theo chính sách hãng Cleansui." },
            { num: "JP", title: "Nhập khẩu nguyên chiếc", body: "Sản xuất tại Nhật Bản, không lắp ráp hay gia công lại trong nước." },
            { num: "DS", title: "DigiSmart hỗ trợ đăng ký", body: "Khách không cần tự làm việc với hãng khi cần bảo hành." },
          ].map(w => (
            <div key={w.num} style={{ display: "flex", gap: 14, maxWidth: 320 }}>
              <div style={{ fontFamily: mono, color: "var(--accent)", fontSize: 22 }}>{w.num}</div>
              <div>
                <strong style={{ display: "block", fontFamily: serif, fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{w.title}</strong>
                <p style={{ margin: 0, fontSize: 13.5, opacity: 0.82, lineHeight: 1.5 }}>{w.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nhận tư vấn */}
      <section style={{ background: "var(--water-tint)", padding: "56px 0" }} id="tu-van">
        <div className="container lp-split-grid">
          <div>
            <div style={{ fontFamily: mono, fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--water)", marginBottom: 14 }}>Nhận tư vấn miễn phí</div>
            <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: 26, color: "var(--brand)", margin: "0 0 14px" }}>
              Để lại thông tin, DigiSmart gọi lại trong giờ làm việc
            </h2>
            <p style={{ color: soft, fontSize: 14.5, maxWidth: "42ch", margin: "0 0 20px" }}>
              Không cần tự so sánh {cleansuiFilters.length} model — nói diện tích bếp và số người trong nhà, DigiSmart gợi ý đúng dòng máy.
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {["Tư vấn đúng model theo nhu cầu thực tế", "Báo giá kèm chi phí lắp đặt rõ ràng", "Hỗ trợ đăng ký bảo hành với hãng"].map(li => (
                <li key={li} style={{ display: "flex", gap: 8, fontSize: 13.5, color: "var(--brand)", marginBottom: 9, alignItems: "baseline" }}>
                  <span style={{ color: "var(--accent)", fontFamily: mono }}>→</span>{li}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: "#fff", border: "1px solid var(--border)", padding: 28, textAlign: "center" }}>
            <p style={{ margin: "0 0 20px", color: soft, fontSize: 14 }}>
              Bấm nút bên dưới để lại tên, số điện thoại và dòng máy quan tâm — DigiSmart liên hệ tư vấn trong giờ làm việc.
            </p>
            <LeadFormButton style={{ width: "100%", padding: "14px 0", borderRadius: 4, fontSize: 14.5, justifyContent: "center" }}>
              Gửi yêu cầu tư vấn
            </LeadFormButton>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container" style={{ padding: "64px 0", textAlign: "center" }}>
        <div style={{ fontFamily: mono, fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--water)", marginBottom: 14 }}>
          Chọn máy phù hợp với gia đình bạn
        </div>
        <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(26px,4vw,38px)", color: "var(--brand)", margin: "0 0 16px" }}>
          Từ máy để bàn 11,6 triệu đến hệ lọc tổng đầu nguồn 233,7 triệu.
        </h2>
        <p style={{ color: soft, maxWidth: "50ch", margin: "0 auto 30px", fontSize: 15.5 }}>
          DigiSmart tư vấn theo diện tích bếp, số người dùng và ngân sách — không cần tự so sánh {cleansuiFilters.length} model một mình.
        </p>
        <LeadFormButton style={{ padding: "16px 30px", borderRadius: 4, fontSize: 15.5 }}>
          Nhận tư vấn chọn máy
        </LeadFormButton>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 26, flexWrap: "wrap" }}>
          <span style={{ fontFamily: mono, fontSize: 12, border: "1px solid var(--border)", padding: "9px 16px", color: soft }}>CÓ BÁN TRÊN SHOPEE MALL</span>
          <span style={{ fontFamily: mono, fontSize: 12, border: "1px solid var(--border)", padding: "9px 16px", color: soft }}>CÓ BÁN TRÊN TIKTOK SHOP</span>
        </div>
      </section>
    </div>
  );
}

function SectionHead({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, margin: "14px 0 40px", flexWrap: "wrap" }}>
      <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(26px,3vw,36px)", color: "var(--brand)", margin: 0 }}>{title}</h2>
      <p style={{ maxWidth: "44ch", color: soft, fontSize: 15, margin: 0 }}>{desc}</p>
    </div>
  );
}

function DatasheetTable({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <div style={{ overflowX: "auto", border: "1px solid var(--border)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
        <caption style={{
          textAlign: "left", fontFamily: mono, fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase",
          color: "var(--water)", background: "var(--water-tint)", padding: "10px 16px", borderBottom: "1px solid var(--border)", captionSide: "top",
        }}>{caption}</caption>
        {children}
      </table>
    </div>
  );
}

function Th({ children, align }: { children: React.ReactNode; align?: "left" | "right" }) {
  return (
    <th style={{ textAlign: align ?? "left", fontFamily: mono, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: soft, padding: "12px 16px", borderBottom: "1px solid var(--border)", whiteSpace: "nowrap" }}>
      {children}
    </th>
  );
}
function Td({ children }: { children: React.ReactNode }) {
  return <td style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", fontSize: 14.5, color: "var(--text)" }}>{children}</td>;
}
function TdNum({ children }: { children: React.ReactNode }) {
  return <td style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", fontSize: 14.5, fontFamily: mono, color: soft, whiteSpace: "nowrap" }}>{children}</td>;
}
function TdPrice({ children }: { children: React.ReactNode }) {
  return <td style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", fontSize: 14.5, fontFamily: mono, fontWeight: 600, color: "var(--water)", textAlign: "right", whiteSpace: "nowrap" }}>{children}</td>;
}
function SkuCell({ id, name, imageUrl, tag }: { id: string; name: string; imageUrl: string; tag: string }) {
  return (
    <td style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)" }}>
      <Link href={`/san-pham/${id}`} style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "inherit" }}>
        <span style={{ position: "relative", width: 44, height: 44, border: "1px solid var(--border)", background: "var(--water-tint)", flexShrink: 0, display: "block" }}>
          <Image src={imageUrl} alt="" fill sizes="44px" style={{ objectFit: "contain" }} />
        </span>
        <span>
          <span style={{ display: "block", fontWeight: 600, fontSize: 14.5, color: "var(--brand)" }}>{name.trim()}</span>
          <span style={{ display: "block", fontFamily: mono, fontSize: 11, color: "var(--water)", marginTop: 2 }}>{tag}</span>
        </span>
      </Link>
    </td>
  );
}
