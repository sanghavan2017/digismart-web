export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  icon: string;
  imageUrl?: string;
  // Ảnh carousel cho trang chi tiết sản phẩm (nhiều góc chụp). Nếu có, trang chi tiết hiện carousel thay cho ảnh đơn imageUrl.
  images?: string[];
  // ID video YouTube giới thiệu sản phẩm (phần sau "v=" trong link YouTube)
  videoId?: string;
  description: string;
  specs: string[];
  inStock: boolean;
  // Điều hòa
  btu?: number;
  power_kw?: number;
  inverter?: boolean;
  // Máy lọc nước
  capacity_lph?: number;
  stages?: number;
  has_hot?: boolean;
  has_cold?: boolean;
  // Chung cho dịch vụ lắp đặt
  price_install?: number;
  warranty_years?: number;
  // true nếu là phụ kiện đi kèm (không phải thiết bị lọc nước/làm lạnh chính) — dùng để chatbot không gợi ý nhầm khi khách hỏi máy lọc nước/điều hòa
  isAccessory?: boolean;
  // Ảnh + chú thích "Đặc điểm nổi bật" trên trang chi tiết sản phẩm (tham khảo bố cục trang chính hãng)
  features?: { image: string; caption: string }[];
};

export const categories = [
  { name: "Máy lọc nước", icon: "💧", desc: "Máy lọc nước RO, nóng lạnh, nhiều cấp lọc", slug: "may-loc-nuoc" },
  { name: "Điều hòa", icon: "❄️", desc: "Điều hòa Inverter chính hãng, lắp đặt tận nơi", slug: "dieu-hoa" },
];

export const brands = ["Mitsubishi", "Daikin", "Cleansui", "Kitz"];

export const products: Product[] = [
  // ------- Máy lọc nước: Cleansui (Mitsubishi Chemical) -------
  // Nguồn: catalog B2B "251031) CM catalog_8%_EU103-B2B.pdf", giá bán lẻ NPP, 24/06/2026
  // Bảo hành (theo chính sách hãng Cleansui, cập nhật 27/06/2026): vòi dòng CM (EU301/EU201/EU202/EU101/EU103) 5 năm,
  // thân máy/bo mạch 2 năm. DigiSmart hỗ trợ đăng ký bảo hành cho khách khi mua hàng — liên hệ DigiSmart, không cần khách tự đăng ký với hãng.
  {
    id: "cleansui-eu301",
    name: "Máy Lọc Nước Tạo Ion Kiềm Cleansui EU301",
    brand: "Cleansui",
    category: "Máy lọc nước",
    price: 48600000,
    originalPrice: 48600000,
    icon: "💧",
    imageUrl: "/images/products/cleansui-eu301.jpg",
    images: [
      "/images/products/cleansui-eu301.jpg",
      "/images/products/cleansui-eu301-gallery-2.jpg",
      "/images/products/cleansui-eu301-gallery-3.jpg",
      "/images/products/cleansui-eu301-gallery-4.jpg",
    ],
    videoId: "P1vevIaQQJA",
    features: [
      { image: "/images/products/cleansui-eu301-feature-2.jpg", caption: "Tạo 6 chế độ nước với pH tương ứng từ 5,0 – 10,5, bao gồm 4 chế độ nước ion kiềm, 1 chế độ nước ion axit, 1 chế độ nước lọc giữ khoáng tự nhiên." },
      { image: "/images/products/cleansui-eu301-feature-1.jpg", caption: "Kiểu dáng hiện đại, nhỏ gọn cho không gian lắp đặt tối ưu. Vật liệu bền bỉ, kết hợp bề mặt mạ chrome sáng bóng mang lại vẻ ngoài tinh tế và dễ dàng vệ sinh." },
      { image: "/images/products/cleansui-eu301-feature-3.jpg", caption: "Bảng điều khiển trực quan, thuận tiện thao tác khi sử dụng." },
      { image: "/images/tech/chan-vi-khuan-sem.jpg", caption: "Hệ thống chống rò rỉ ưu việt, không tạo áp lực lên bộ lọc và toàn hệ thống lọc." },
    ],
    description:
      "Thiết bị lọc nước tạo ion kiềm EU301 là sản phẩm chăm sóc sức khỏe của Mitsubishi Chemical Cleansui — thành viên của Tập đoàn Mitsubishi Chemical Holdings, một trong những tập đoàn hóa chất lâu đời và lớn nhất Nhật Bản. EU301 mang đến nguồn nước ion kiềm, đã có mặt tại hơn 40 quốc gia trên thế giới và đang ngày càng phổ biến tại Việt Nam. Kèm bộ lọc EUC3000 đầu tiên, phù hợp gia đình 4-6 người.",
    specs: [
      "Công suất lọc 8.000 lít / 12 tháng (~22 lít/ngày)",
      "Lưu lượng 3 lít/phút",
      "6 chế độ nước: 4 mức kiềm, 1 mức acid, 1 nước lọc giữ khoáng — pH 5,0-10,5",
      "Lõi lọc 4 lớp: vải không dệt → sợi trao đổi ion → than hoạt tính → màng sợi rỗng (lọc tới 0,01 micromet)",
      "Vòi: cao 290mm, ~1.5kg, hợp kim đồng/inox/nhựa ABS mạ chrome",
      "Áp suất hoạt động 0,07-0,35 MPa, nước đầu vào dưới 35°C",
      "Nguồn điện AC 220-240V, 50-60Hz, công suất tối đa ~250W",
      "Kích thước bộ điện phân: 170 x 104 x 294mm",
      "Đạt chứng nhận Viện Pasteur, tiêu chuẩn JIS (Nhật Bản) và Tổng cục Tiêu chuẩn Đo lường Chất lượng Việt Nam",
      "Kèm bộ lọc EUC3000 đầu tiên",
      "Bảo hành vòi 5 năm, thân máy/bo mạch 2 năm, lõi lọc 6 tháng (lỗi sản xuất) — DigiSmart hỗ trợ đăng ký bảo hành",
    ],
    inStock: true,
    stages: 4,
    has_hot: false,
    has_cold: false,
    warranty_years: 5,
  },
  {
    id: "cleansui-eu201",
    name: "Máy Lọc Nước Tích Hợp Dưới Bồn Rửa Cleansui EU201",
    brand: "Cleansui",
    category: "Máy lọc nước",
    price: 28990000,
    originalPrice: 28990000,
    icon: "💧",
    imageUrl: "/images/products/cleansui-eu201.jpg",
    images: [
      "/images/products/cleansui-eu201.jpg",
      "/images/products/cleansui-eu201-gallery-2.jpg",
      "/images/products/cleansui-eu201-gallery-3.jpg",
      "/images/products/cleansui-eu201-gallery-4.jpg",
    ],
    features: [
      { image: "/images/products/cleansui-eu201.jpg", caption: "Sản xuất và nhập khẩu nguyên chiếc từ Nhật Bản, vòi xoay 120° tiện lợi." },
      { image: "/images/tech/chan-vi-khuan-sem.jpg", caption: "Công nghệ màng lọc sợi rỗng loại bỏ vi khuẩn, tạp chất nhỏ tới 0,01 micromet, vẫn giữ khoáng tự nhiên." },
      { image: "/images/tech/cau-truc-soi-rong.jpg", caption: "Thiết kế hiện đại, hệ thống chống rò rỉ nước an toàn, không dùng điện, không tạo nước thải." },
    ],
    description:
      "Máy lọc nước Cleansui EU201 lắp đặt tích hợp dưới bồn rửa, vòi xoay 120°. Công suất lọc 8.000L, lưu lượng 3L/phút.",
    specs: [
      "Công suất lọc 8.000 lít / 12 tháng (~22 lít/ngày)",
      "Lưu lượng 3 lít/phút",
      "Vòi xoay 120°, kích thước 217 x 382mm, hợp kim đồng/nhựa ABS mạ chrome",
      "Lọc tới 0,01 micromet bằng màng sợi rỗng, vẫn giữ khoáng tự nhiên",
      "Áp suất hoạt động 0,07-0,35 MPa, nước đầu vào dưới 35°C",
      "Không dùng điện, không tạo nước thải",
      "Bảo hành vòi 5 năm, lõi lọc đổi mới trong 6 tháng nếu lỗi kỹ thuật — DigiSmart hỗ trợ đăng ký bảo hành",
    ],
    inStock: true,
    warranty_years: 5,
  },
  {
    id: "cleansui-eu202",
    name: "Máy Lọc Nước Tích Hợp Dưới Bồn Rửa Cleansui EU202",
    brand: "Cleansui",
    category: "Máy lọc nước",
    price: 25990000,
    originalPrice: 25990000,
    icon: "💧",
    features: [
      { image: "/images/tech/chan-vi-khuan-sem.jpg", caption: "Công nghệ màng lọc sợi rỗng loại bỏ vi khuẩn, tạp chất nhỏ tới 0,01 micromet, vẫn giữ khoáng tự nhiên." },
      { image: "/images/tech/cau-truc-soi-rong.jpg", caption: "Thiết kế hiện đại, thanh lịch, hệ thống chống rò rỉ nước an toàn." },
      { image: "/images/tech/cong-nghe-mang-soi-rong.jpg", caption: "Chỉ dùng một bộ lọc tích hợp duy nhất, không cần tiền lọc cồng kềnh, không dùng điện." },
    ],
    description:
      "Máy lọc nước Cleansui EU202 lắp đặt tích hợp dưới bồn rửa, vòi xoay 100°, giá tốt hơn EU201. Công suất lọc 8.000L, lưu lượng 3L/phút.",
    specs: [
      "Công suất lọc 8.000 lít / 12 tháng, phù hợp gia đình 4-6 người",
      "Lưu lượng 3 lít/phút",
      "Vòi xoay 100°, kích thước 267 x 282mm, hợp kim đồng/nhựa ABS mạ chrome",
      "Lọc tới 0,01 micromet bằng màng sợi rỗng, vẫn giữ khoáng tự nhiên",
      "Áp suất hoạt động 0,07-0,35 MPa, nước đầu vào dưới 35°C",
      "Không dùng điện, không tạo nước thải, rẻ hơn EU201",
      "Bảo hành vòi 5 năm, lõi lọc đổi mới trong 6 tháng nếu lỗi kỹ thuật — DigiSmart hỗ trợ đăng ký bảo hành",
    ],
    inStock: true,
    warranty_years: 5,
  },
  {
    id: "cleansui-eu103",
    name: "Máy Lọc Nước Lắp Dưới Bồn Rửa Cleansui EU103",
    brand: "Cleansui",
    category: "Máy lọc nước",
    price: 11690000,
    originalPrice: 11690000,
    icon: "💧",
    imageUrl: "/images/products/cleansui-eu103.jpg",
    images: [
      "/images/products/cleansui-eu103.jpg",
      "/images/products/cleansui-eu103-gallery-2.jpg",
      "/images/products/cleansui-eu103-gallery-3.jpg",
      "/images/products/cleansui-eu103-gallery-4.jpg",
    ],
    features: [
      { image: "/images/products/cleansui-eu103.jpg", caption: "Sản xuất và nhập khẩu nguyên chiếc từ Nhật Bản, mẫu rẻ nhất dòng lắp dưới bồn rửa." },
      { image: "/images/tech/chan-vi-khuan-sem.jpg", caption: "Công nghệ màng lọc sợi rỗng loại bỏ vi khuẩn, tạp chất nhỏ tới 0,01 micromet, vẫn giữ khoáng tự nhiên." },
      { image: "/images/tech/cau-truc-soi-rong.jpg", caption: "Thiết kế hiện đại, chống rò rỉ an toàn, chỉ dùng một bộ lọc tích hợp, không dùng điện." },
    ],
    description:
      "Máy lọc nước Cleansui EU103, mẫu rẻ nhất dòng lắp dưới bồn rửa của Cleansui. Công suất lọc 8.000L, lưu lượng 3L/phút.",
    specs: [
      "Công suất lọc 8.000 lít / 12 tháng",
      "Lưu lượng 3 lít/phút",
      "Kích thước vòi 165 x 291mm, hợp kim đồng/nhựa ABS mạ chrome",
      "Lọc tới 0,01 micromet bằng màng sợi rỗng, vẫn giữ khoáng tự nhiên",
      "Áp suất hoạt động 0,07-0,35 MPa, nước đầu vào dưới 35°C",
      "Rẻ nhất dòng dưới bồn rửa Cleansui, không dùng điện, không tạo nước thải",
      "Bảo hành vòi 5 năm, dây kết nối 2 năm, lõi lọc đổi mới trong 6 tháng nếu lỗi kỹ thuật — DigiSmart hỗ trợ đăng ký bảo hành",
    ],
    inStock: true,
    warranty_years: 5,
  },
  {
    id: "cleansui-cwmf-500e",
    name: "Máy Lọc Nước Tích Hợp Nóng Lạnh Cleansui CWMF-500E",
    brand: "Cleansui",
    category: "Máy lọc nước",
    price: 20490000,
    originalPrice: 20490000,
    icon: "💧",
    imageUrl: "/images/products/cleansui-cwmf-500e.jpg",
    videoId: "XuLfCXsFuHI",
    features: [
      { image: "/images/products/cleansui-cwmf-500e.jpg", caption: "Sử dụng bộ lọc EUC3000 sản xuất 100% tại Nhật Bản, nóng 80-90°C / lạnh 4-10°C." },
      { image: "/images/tech/chan-vi-khuan-sem.jpg", caption: "Màng lọc sợi rỗng loại bỏ tạp chất nhỏ tới 0,01 micromet, vẫn giữ khoáng tự nhiên." },
      { image: "/images/tech/cau-truc-soi-rong.jpg", caption: "Thiết kế nhỏ gọn nhất thị trường, có khóa trẻ em và van chống rò rỉ an toàn." },
    ],
    description:
      "Máy lọc nước Cleansui CWMF-500E tích hợp nóng lạnh, nước nóng 80-90°C, nước lạnh 4-10°C. Công suất lọc 8.000L, lưu lượng 3L/phút.",
    specs: [
      "Công suất lọc 8.000 lít / 12 tháng, lưu lượng 3 lít/phút",
      "Dung tích nước nóng 2L (80-90°C), nước lạnh 3,2L (4-10°C)",
      "Công suất tiêu thụ 100W (làm lạnh) / 350W (làm nóng)",
      "Kích thước 260 x 462 x 1120mm, nặng ~22kg (đầy nước), thân thép EGI + nhựa ABS",
      "An toàn: khóa trẻ em, chống quá nhiệt bimetal, phao cơ chống tràn, van chống rò rỉ",
      "Áp suất hoạt động 0,07-0,35 MPa",
      "Bảo hành thân máy 2 năm, lõi lọc EUC3000 4.000 lít hoặc 6 tháng (tùy điều kiện đến trước) — DigiSmart hỗ trợ đăng ký bảo hành",
    ],
    inStock: true,
    has_hot: true,
    has_cold: true,
    warranty_years: 2,
  },
  {
    id: "cleansui-mp02-3",
    name: "Máy Lọc Nước Thương Mại Cleansui MP02-3",
    brand: "Cleansui",
    category: "Máy lọc nước",
    price: 15590000,
    originalPrice: 15590000,
    icon: "💧",
    imageUrl: "/images/products/cleansui-mp02-3.jpg",
    images: [
      "/images/products/cleansui-mp02-3.jpg",
      "/images/products/cleansui-mp02-3-gallery-2.jpg",
      "/images/products/cleansui-mp02-3-gallery-3.jpg",
    ],
    features: [
      { image: "/images/products/cleansui-mp02-3.jpg", caption: "Sản xuất và nhập khẩu nguyên chiếc từ Nhật Bản, thân thép không gỉ cao cấp." },
      { image: "/images/tech/chan-vi-khuan-sem.jpg", caption: "Bộ lọc UMC2150 2 cấp loại bỏ tạp chất, vi khuẩn, kim loại nặng, mùi Clo dư." },
      { image: "/images/tech/cong-nghe-mang-soi-rong.jpg", caption: "Thiết kế nhỏ gọn, lắp đặt linh hoạt, không dùng điện, không tạo nước thải." },
    ],
    description:
      "Máy lọc nước thương mại Cleansui MP02-3, kèm bộ lọc UMC2150 đầu tiên. Công suất lọc 150.000L, lưu lượng 10L/phút.",
    specs: [
      "Công suất lọc 150.000 lít / 12 tháng (~410 lít/ngày)",
      "Lưu lượng định mức 10 lít/phút",
      "Kích thước 160 x 300mm, thân thép không gỉ cao cấp",
      "Bộ lọc công nghệ cao UMC2150, 2 cấp lọc loại bỏ tạp chất, vi khuẩn, kim loại nặng, Clo dư",
      "Áp suất hoạt động 0,07-0,35 MPa, nước đầu vào dưới 35°C",
      "Không dùng điện, không tạo nước thải — phù hợp văn phòng, nhà hàng, khách sạn",
      "Bảo hành thân máy 1 năm, lõi lọc UMC2150 đổi mới trong 1 tháng nếu lỗi kỹ thuật — DigiSmart hỗ trợ đăng ký bảo hành",
    ],
    inStock: true,
    warranty_years: 2,
  },
  {
    id: "cleansui-mp02-4",
    name: "Máy Lọc Nước Thương Mại Cleansui MP02-4",
    brand: "Cleansui",
    category: "Máy lọc nước",
    price: 15590000,
    originalPrice: 15590000,
    icon: "💧",
    imageUrl: "/images/products/cleansui-mp02-4.jpg",
    images: [
      "/images/products/cleansui-mp02-4.jpg",
      "/images/products/cleansui-mp02-4-gallery-2.jpg",
      "/images/products/cleansui-mp02-4-gallery-3.jpg",
    ],
    features: [
      { image: "/images/products/cleansui-mp02-4.jpg", caption: "Sản xuất và nhập khẩu nguyên chiếc từ Nhật Bản, thân thép không gỉ cao cấp." },
      { image: "/images/tech/chan-vi-khuan-sem.jpg", caption: "Công nghệ màng lọc sợi rỗng loại bỏ vi khuẩn, tạp chất nhỏ tới 0,01 micromet." },
      { image: "/images/tech/cong-nghe-mang-soi-rong.jpg", caption: "Thiết kế nhỏ gọn, tiết kiệm không gian, không dùng điện, không tạo nước thải." },
    ],
    description:
      "Máy lọc nước thương mại Cleansui MP02-4, kèm bộ lọc UMC2050 đầu tiên. Công suất lọc 50.000L, lưu lượng 8L/phút.",
    specs: [
      "Công suất lọc 50.000 lít / 12 tháng",
      "Lưu lượng định mức 8 lít/phút",
      "Kích thước 160 x 300mm, thân thép không gỉ cao cấp",
      "Công nghệ màng lọc sợi rỗng loại bỏ vi khuẩn, tạp chất nhỏ tới 0,01 micromet",
      "Áp suất hoạt động 0,07-0,35 MPa, nước đầu vào dưới 35°C",
      "Không dùng điện, không tạo nước thải — phù hợp gia đình lớn, nhà hàng, spa",
      "Bảo hành thân máy 1 năm, lõi lọc UMC2050 đổi mới trong 1 tháng nếu lỗi kỹ thuật — DigiSmart hỗ trợ đăng ký bảo hành",
    ],
    inStock: true,
    warranty_years: 2,
  },
  {
    id: "cleansui-mpoe-s4",
    name: "Hệ Thống Lọc Tổng Đầu Nguồn Cleansui MPOE-S4",
    brand: "Cleansui",
    category: "Máy lọc nước",
    price: 233690000,
    originalPrice: 233690000,
    icon: "💧",
    imageUrl: "/images/products/cleansui-mpoe-s4.jpg",
    images: [
      "/images/products/cleansui-mpoe-s4.jpg",
      "/images/products/cleansui-mpoe-s4-gallery-2.jpg",
      "/images/products/cleansui-mpoe-s4-gallery-3.jpg",
    ],
    videoId: "TSZDa0qC-eY",
    features: [
      { image: "/images/products/cleansui-mpoe-s4.jpg", caption: "Bao gồm 4 bộ lọc MPOE050E sản xuất 100% tại Nhật Bản, tuổi thọ tới 500.000 lít/bộ lọc." },
      { image: "/images/tech/chan-vi-khuan-sem.jpg", caption: "Màng lọc sợi rỗng loại bỏ vi khuẩn tới 0,01 micromet, giữ khoáng tự nhiên cho toàn bộ ngôi nhà." },
      { image: "/images/tech/cau-truc-soi-rong.jpg", caption: "Công nghệ tự động làm sạch bộ lọc, tăng tuổi thọ và giảm chi phí vận hành." },
    ],
    description:
      "Hệ thống lọc tổng đầu nguồn Cleansui MPOE-S4, kèm 4 bộ lọc MPOE050E đầu tiên. Lưu lượng 40L/phút. Cần khảo sát kỹ thuật trước khi lắp đặt, nước đầu vào cần đạt QCVN 01-1:2018/BYT.",
    specs: [
      "Kèm 4 bộ lọc MPOE050E sản xuất 100% tại Nhật Bản, tuổi thọ tới 500.000 lít/bộ lọc",
      "Lưu lượng gần như không giới hạn",
      "Tủ lọc: 820 x 350 x 1000mm, nặng 60kg, inox 304 dày 1,2mm mạ PVD, nguồn 24VAC/06W",
      "Tủ điện: 400 x 200 x 400mm, nặng 16,5kg, nguồn 220/240VAC-50/60Hz/120W",
      "Nước đầu vào theo QCVN 01-1:2024/BYT, nhiệt độ 5-40°C, áp suất 0,2-0,4 MPa",
      "Tự động làm sạch bộ lọc, tăng tuổi thọ và độ bền hệ thống",
      "Cần khảo sát kỹ thuật trước khi lắp đặt",
      "Bảo hành tủ lọc/tủ điện 2 năm, linh phụ kiện 12 tháng — DigiSmart hỗ trợ đăng ký bảo hành",
    ],
    inStock: true,
    warranty_years: 2,
  },
  {
    id: "cleansui-mpoe-p",
    name: "Hệ Thống Lọc Tổng Đầu Nguồn Cleansui MPOE-P",
    brand: "Cleansui",
    category: "Máy lọc nước",
    price: 194490000,
    originalPrice: 194490000,
    icon: "💧",
    imageUrl: "/images/products/cleansui-mpoe-p.jpg",
    videoId: "TSZDa0qC-eY",
    features: [
      { image: "/images/products/cleansui-mpoe-p.jpg", caption: "Màn hình điều khiển cảm ứng TFT 8,4 inch, dễ điều khiển ở mọi vị trí." },
      { image: "/images/tech/chan-vi-khuan-sem.jpg", caption: "Màng lọc sợi rỗng loại bỏ vi khuẩn tới 0,01 micromet, giữ khoáng tự nhiên và Clo kháng khuẩn." },
      { image: "/images/tech/cau-truc-soi-rong.jpg", caption: "Công suất lọc gần như không giới hạn, tự động làm sạch bộ lọc, tăng độ bền hệ thống." },
    ],
    description:
      "Hệ thống lọc tổng đầu nguồn Cleansui MPOE-P, kèm 2 bộ lọc MPOE050E, màn hình cảm ứng. Lưu lượng 30L/phút. Cần khảo sát kỹ thuật trước khi lắp đặt.",
    specs: [
      "Kèm 2 bộ lọc MPOE050E, tuổi thọ tới 500.000 lít/bộ lọc",
      "Lưu lượng gần như không giới hạn, màn hình cảm ứng TFT 8,4 inch điều khiển",
      "Tủ lọc: 645 x 345 x 885mm, nặng 45kg, inox 304 dày 1,2mm, nguồn 24VAC/06W",
      "Tủ điện: 400 x 200 x 400mm, nặng 16,5kg, nguồn 220/240VAC-50/60Hz/120W",
      "Nước đầu vào theo QCVN 01-1:2024/BYT, nhiệt độ dưới 40°C, áp suất 0,18-0,4 MPa",
      "Giữ khoáng tự nhiên và Clo kháng khuẩn nước trong bồn chứa, tự động làm sạch bộ lọc",
      "Cần khảo sát kỹ thuật trước khi lắp đặt",
      "Bảo hành tủ lọc/tủ điện/màn hình 2 năm — DigiSmart hỗ trợ đăng ký bảo hành",
    ],
    inStock: true,
    warranty_years: 2,
  },
  {
    id: "cleansui-mpoe-s",
    name: "Hệ Thống Lọc Tổng Đầu Nguồn Cleansui MPOE-S",
    brand: "Cleansui",
    category: "Máy lọc nước",
    price: 145290000,
    originalPrice: 145290000,
    icon: "💧",
    imageUrl: "/images/products/cleansui-mpoe-s.jpg",
    videoId: "TSZDa0qC-eY",
    features: [
      { image: "/images/products/cleansui-mpoe-s.jpg", caption: "Thiết kế tinh gọn, nhỏ nhất thị trường trong dòng MPOE, tiết kiệm không gian lắp đặt." },
      { image: "/images/tech/chan-vi-khuan-sem.jpg", caption: "Màng lọc sợi rỗng loại bỏ vi khuẩn tới 0,01 micromet, giữ khoáng tự nhiên." },
      { image: "/images/tech/cau-truc-soi-rong.jpg", caption: "Công suất lọc gần như không giới hạn, đáp ứng nhu cầu nước sạch liên tục cho cả nhà." },
    ],
    description:
      "Hệ thống lọc tổng đầu nguồn Cleansui MPOE-S, kèm 2 bộ lọc MPOE050E, kích thước nhỏ nhất trong dòng MPOE. Lưu lượng 30L/phút. Cần khảo sát kỹ thuật trước khi lắp đặt.",
    specs: [
      "Kèm 2 bộ lọc MPOE050E, tuổi thọ tới 500.000 lít/bộ lọc",
      "Lưu lượng gần như không giới hạn, kích thước nhỏ nhất dòng MPOE",
      "Tủ lọc: 645 x 345 x 885mm, nặng 45kg, inox 304 dày 1,2mm, nguồn 24VAC/06W",
      "Tủ điện: 400 x 200 x 400mm, nặng 16,5kg, sắt sơn tĩnh điện, nguồn 220/240VAC-50/60Hz/120W",
      "Nước đầu vào theo QCVN 01-1:2024/BYT, nhiệt độ dưới 40°C, áp suất 0,18-0,4 MPa",
      "Giữ khoáng tự nhiên, tối ưu cho lọc nước kiềm, tiết kiệm không gian lắp đặt",
      "Cần khảo sát kỹ thuật trước khi lắp đặt",
      "Bảo hành tủ lọc/tủ điện 2 năm — DigiSmart hỗ trợ đăng ký bảo hành",
    ],
    inStock: true,
    warranty_years: 2,
  },
  // ------- Máy lọc nước: Kitz Micro Filter -------
  // Nguồn: leaflet 9 sản phẩm Kitz Micro Filter (giá bán lẻ), cập nhật 27/06/2026
  // Bảo hành (theo chính sách hãng Kitz): thiết bị 24 tháng, lõi lọc 12 tháng. Tiêu chuẩn nước đầu vào: nước máy.
  // Lắp đặt và bảo hành do kỹ thuật DigiSmart thực hiện trực tiếp — liên hệ hotline DigiSmart 0778 886 758.
  {
    id: "kitz-purifree",
    name: "Máy Lọc Nước Lắp Tại Vòi Kitz Purifree",
    brand: "Kitz",
    category: "Máy lọc nước",
    price: 5200000,
    originalPrice: 5200000,
    icon: "💧",
    imageUrl: "/images/products/kitz-purifree.jpg",
    images: [
      "/images/products/kitz-purifree.jpg",
      "/images/products/kitz-purifree-gallery-2.jpg",
    ],
    features: [
      { image: "/images/products/kitz-purifree.jpg", caption: "Sản xuất 100% tại Nhật Bản bởi Kitz Group, lắp trực tiếp tại vòi." },
      { image: "/images/tech/chan-vi-khuan-sem.jpg", caption: "Lọc 4 cấp qua màng sợi rỗng, loại bỏ tạp chất mà vẫn giữ khoáng tự nhiên." },
      { image: "/images/tech/cau-truc-soi-rong.jpg", caption: "Không dùng điện, không tạo nước thải — vòi 3 chế độ nước tiện lợi." },
    ],
    description:
      "Máy lọc nước Kitz Purifree lắp trực tiếp tại vòi, made in Japan. Công suất lọc 8.000L, lưu lượng 3.5L/phút. Giá thay lõi lọc: 3.600.000đ.",
    specs: [
      "Công suất lọc 8.000 lít, lưu lượng 3,5 lít/phút",
      "Lọc 4 cấp: vải không dệt, than hoạt tính dạng hạt, than hoạt tính dạng sợi, màng sợi rỗng",
      "Vòi 3 chế độ nước: 2 chế độ nước thường + 1 chế độ nước đã lọc",
      "Kích thước 109 x 176mm, nặng 1kg (1,6kg khi đầy nước)",
      "Áp suất hoạt động 0,07-0,35 MPa",
      "Không dùng điện, không tạo nước thải, giữ khoáng tự nhiên",
      "Made in Japan — Kitz Group",
      "Bảo hành thiết bị 24 tháng — lắp đặt và bảo hành do DigiSmart thực hiện",
    ],
    inStock: true,
    warranty_years: 2,
  },
  {
    id: "kitz-oas-nts9",
    name: "Máy Lọc Nước Âm Tủ Kitz OAS-NTS9",
    brand: "Kitz",
    category: "Máy lọc nước",
    price: 8000000,
    originalPrice: 8000000,
    icon: "💧",
    imageUrl: "/images/products/kitz-oas-nts9.jpg",
    images: [
      "/images/products/kitz-oas-nts9.jpg",
      "/images/products/kitz-oas-nts9-gallery-2.jpg",
    ],
    features: [
      { image: "/images/products/kitz-oas-nts9.jpg", caption: "Sản xuất 100% tại Nhật Bản, lắp linh hoạt tại vòi hoặc âm tủ." },
      { image: "/images/tech/chan-vi-khuan-sem.jpg", caption: "Công nghệ màng lọc sợi rỗng tiên tiến, đạt chuẩn ISO 9001:2015 và ISO 14001:2015." },
      { image: "/images/tech/cau-truc-soi-rong.jpg", caption: "Lưu lượng 5 lít/phút, không dùng điện, không tạo nước thải." },
    ],
    description:
      "Máy lọc nước Kitz OAS-NTS9 lắp âm tủ, made in Japan. Công suất lọc 7.500L, lưu lượng 5.0L/phút. Giá thay lõi lọc: 3.200.000đ.",
    specs: [
      "Công suất lọc 7.500 lít (~12 tháng sử dụng), lưu lượng 5 lít/phút",
      "Lọc 4 cấp: vải không dệt, than hoạt tính dạng hạt, than hoạt tính dạng sợi, màng sợi rỗng",
      "Lắp tại vòi hoặc âm tủ, kích thước 10-15 x 20cm, nặng 1,3kg (1,9kg khi đầy nước)",
      "Áp suất hoạt động 0,07-0,35 MPa",
      "Đạt chuẩn JIS S 3201, JWPAS B 100, ISO 9001:2015, ISO 14001:2015",
      "Made in Japan — Kitz Group",
      "Bảo hành thiết bị 24 tháng — lắp đặt và bảo hành do DigiSmart thực hiện",
    ],
    inStock: true,
    warranty_years: 2,
  },
  {
    id: "kitz-oss-t7",
    name: "Máy Lọc Nước Lắp Tại Vòi Kitz OSS-T7",
    brand: "Kitz",
    category: "Máy lọc nước",
    price: 7700000,
    originalPrice: 7700000,
    icon: "💧",
    imageUrl: "/images/products/kitz-oss-t7.jpg",
    features: [
      { image: "/images/products/kitz-oss-t7.jpg", caption: "Sản xuất 100% tại Nhật Bản, lắp trực tiếp tại vòi." },
      { image: "/images/tech/chan-vi-khuan-sem.jpg", caption: "Lọc 4 cấp qua màng sợi rỗng, công suất lọc 11.000 lít." },
      { image: "/images/tech/cau-truc-soi-rong.jpg", caption: "Tiết kiệm đáng kể so với mua nước bình đóng chai, không dùng điện." },
    ],
    description:
      "Máy lọc nước Kitz OSS-T7 lắp trực tiếp tại vòi, made in Japan. Công suất lọc 11.000L, lưu lượng 5.0L/phút. Giá thay lõi lọc: 4.000.000đ.",
    specs: [
      "Công suất lọc 11.000 lít, lưu lượng 5 lít/phút",
      "Lọc 4 cấp: vải không dệt, sợi than hoạt tính, than hoạt tính dạng hạt, màng sợi rỗng",
      "Lõi lọc OSSC-7, kích thước máy 13 x 13 x 25cm, nặng 1,1kg",
      "Áp suất hoạt động tối thiểu 0,07-0,35 MPa",
      "Made in Japan — Kitz Group",
      "Bảo hành thiết bị 24 tháng — lắp đặt và bảo hành do DigiSmart thực hiện",
    ],
    inStock: true,
    warranty_years: 2,
  },
  {
    id: "kitz-oss-g4-e",
    name: "Máy Lọc Nước Âm Tủ Kitz OSS-G4-E",
    brand: "Kitz",
    category: "Máy lọc nước",
    price: 11500000,
    originalPrice: 11500000,
    icon: "💧",
    imageUrl: "/images/products/kitz-oss-g4-e.jpg",
    images: [
      "/images/products/kitz-oss-g4-e.jpg",
      "/images/products/kitz-oss-g4-e-gallery-2.jpg",
    ],
    features: [
      { image: "/images/products/kitz-oss-g4-e.jpg", caption: "Sản xuất 100% tại Nhật Bản, lắp âm tủ, vòi chính hãng bảo hành chống gỉ 5 năm." },
      { image: "/images/tech/chan-vi-khuan-sem.jpg", caption: "Công nghệ màng lọc sợi rỗng loại bỏ tạp chất, vi khuẩn mà vẫn giữ khoáng tự nhiên." },
      { image: "/images/tech/cau-truc-soi-rong.jpg", caption: "Không dùng điện, không tạo nước thải, dễ lắp đặt." },
    ],
    description:
      "Máy lọc nước Kitz OSS-G4-E lắp âm tủ, made in Japan. Công suất lọc 8.000L, lưu lượng 3.5L/phút.",
    specs: [
      "Công suất lọc 8.000 lít, lưu lượng 3,5 lít/phút",
      "Lọc 4 cấp: vải không dệt, than hoạt tính dạng hạt, than hoạt tính dạng sợi, màng sợi rỗng",
      "Lõi lọc OSSC-4, vòi cao 204mm, hợp kim đồng, thân máy 132 x 170mm, nặng 1kg",
      "Áp suất hoạt động 0,07-0,35 MPa",
      "Vòi sản xuất tại Nhật, bảo hành chống gỉ vòi 5 năm",
      "Made in Japan — Kitz Group",
      "Bảo hành thiết bị 24 tháng — lắp đặt và bảo hành do DigiSmart thực hiện",
    ],
    inStock: true,
    warranty_years: 2,
  },
  {
    id: "kitz-oas-9",
    name: "Máy Lọc Nước Âm Tủ Kitz OAS-9",
    brand: "Kitz",
    category: "Máy lọc nước",
    price: 8800000,
    originalPrice: 8800000,
    icon: "💧",
    imageUrl: "/images/products/kitz-oas-9.jpg",
    images: [
      "/images/products/kitz-oas-9.jpg",
      "/images/products/kitz-oas-9-gallery-2.jpg",
    ],
    features: [
      { image: "/images/products/kitz-oas-9.jpg", caption: "Sản xuất 100% tại Nhật Bản, thân thép không gỉ SUS304 lắp âm tủ." },
      { image: "/images/tech/chan-vi-khuan-sem.jpg", caption: "Màng lọc sợi rỗng tiên tiến loại bỏ vi khuẩn, tạp chất nhỏ tới 0,1 micromet." },
      { image: "/images/tech/cau-truc-soi-rong.jpg", caption: "Công suất lọc 11.000 lít, không dùng điện, không tạo nước thải." },
    ],
    description:
      "Máy lọc nước Kitz OAS-9 lắp âm tủ, made in Japan. Công suất lọc 11.000L, lưu lượng 5.0L/phút. Giá thay lõi lọc: 3.800.000đ.",
    specs: [
      "Công suất lọc 11.000 lít, lưu lượng 5 lít/phút",
      "Lọc 4 cấp: vải không dệt, than hoạt tính dạng hạt, than hoạt tính dạng sợi, màng sợi rỗng",
      "Lõi lọc OASC-9, kích thước 10-15 x 24cm, nặng 1,6kg, thân thép không gỉ SUS304",
      "Áp suất hoạt động 0,07-0,35 MPa",
      "Lọc tạp chất, vi khuẩn nhỏ tới 0,1 micromet",
      "Made in Japan — Kitz Group",
      "Bảo hành thiết bị 24 tháng — lắp đặt và bảo hành do DigiSmart thực hiện",
    ],
    inStock: true,
    warranty_years: 2,
  },
  {
    id: "kitz-micro-filter-10inch",
    name: "Bộ Lọc Tổng Kitz Micro Filter 10 Inch",
    brand: "Kitz",
    category: "Máy lọc nước",
    price: 5000000,
    originalPrice: 5000000,
    icon: "💧",
    imageUrl: "/images/products/kitz-micro-filter-10inch.jpg",
    description:
      "Bộ lọc tổng Kitz Micro Filter 10 inch, công nghệ màng lọc sợi rỗng, lắp đầu nguồn đường ống nước sinh hoạt.",
    specs: [
      "Lõi lọc màng sợi rỗng 10 inch",
      "Lắp đầu nguồn đường ống nước",
      "Loại bỏ cặn, gỉ sét, vi khuẩn lớn",
      "Bảo hành thiết bị 24 tháng, lõi lọc 12 tháng — lắp đặt và bảo hành do DigiSmart thực hiện",
    ],
    inStock: true,
    warranty_years: 2,
  },
  {
    id: "kitz-bo-loc-tong-2-coc",
    name: "Bộ Lọc Tổng Kitz 2 Cốc (Lõi PP và Lõi Than Nén)",
    brand: "Kitz",
    category: "Máy lọc nước",
    price: 9800000,
    originalPrice: 9800000,
    icon: "💧",
    imageUrl: "/images/products/kitz-bo-loc-tong-2-coc.jpg",
    description:
      "Bộ lọc tổng Kitz 2 cốc, kết hợp lõi PP lọc cặn thô và lõi than hoạt tính nén khử mùi, clo dư. Lắp đầu nguồn đường ống nước sinh hoạt.",
    specs: [
      "2 cốc lọc: lõi PP + lõi than hoạt tính nén Kitz",
      "Lắp đầu nguồn đường ống nước",
      "Khử mùi, clo dư, cặn thô",
      "Bảo hành thiết bị 24 tháng, lõi lọc 12 tháng — lắp đặt và bảo hành do DigiSmart thực hiện",
    ],
    inStock: true,
    warranty_years: 2,
  },
  {
    id: "kitz-dong-ho-do-nuoc-thong-minh",
    name: "Đồng Hồ Đo Nước Thông Minh (dòng Kitz Group)",
    brand: "Kitz",
    category: "Máy lọc nước",
    price: 1500000,
    originalPrice: 1500000,
    icon: "💧",
    imageUrl: "/images/products/kitz-dong-ho-do-nuoc-thong-minh.jpg",
    description:
      "Đồng hồ đo nước thông minh, theo dõi lượng nước sử dụng qua smartphone, cảnh báo mức nước, lưu lượng sử dụng theo thời gian thực. Phân phối và lắp đặt bởi DigiSmart.",
    specs: [
      "Theo dõi lượng nước qua smartphone",
      "Cảnh báo mức nước",
      "Lưu lượng sử dụng thời gian thực",
    ],
    inStock: true,
    isAccessory: true,
  },
  // ------- Điều hòa -------
  {
    id: "dieu-hoa-mitsubishi-inverter-1hp",
    name: "Điều Hòa Mitsubishi Inverter 1HP (9.000 BTU)",
    brand: "Mitsubishi",
    category: "Điều hòa",
    price: 8990000,
    originalPrice: 10490000,
    icon: "❄️",
    description:
      "Điều hòa Mitsubishi Inverter 1HP tiết kiệm điện, làm lạnh nhanh, vận hành êm ái, phù hợp phòng 9-15m². Công nghệ lọc không khí kháng khuẩn, điều khiển từ xa thông minh.",
    specs: [
      "Công suất lạnh 9.000 BTU",
      "Inverter tiết kiệm điện đến 60%",
      "Phù hợp phòng 9-15m²",
      "Lọc không khí kháng khuẩn",
      "Vận hành êm chỉ từ 19dB",
    ],
    inStock: true,
    btu: 9000,
    power_kw: 0.85,
    inverter: true,
    price_install: 1200000,
    warranty_years: 3,
  },
  {
    id: "dieu-hoa-daikin-inverter-1.5hp",
    name: "Điều Hòa Daikin Inverter 1.5HP (12.000 BTU)",
    brand: "Daikin",
    category: "Điều hòa",
    price: 12990000,
    originalPrice: 14990000,
    icon: "❄️",
    description:
      "Điều hòa Daikin Inverter 1.5HP công nghệ Nhật Bản, làm lạnh sâu, độ bền cao, tiết kiệm điện vượt trội. Phù hợp phòng khách, phòng ngủ 15-20m².",
    specs: [
      "Công suất lạnh 12.000 BTU",
      "Inverter công nghệ Nhật Bản",
      "Phù hợp phòng 15-20m²",
      "Gas R32 thân thiện môi trường",
      "Cánh đảo gió 3D linh hoạt",
    ],
    inStock: true,
    btu: 12000,
    power_kw: 1.15,
    inverter: true,
    price_install: 1500000,
    warranty_years: 5,
  },
  {
    id: "dieu-hoa-mitsubishi-inverter-2hp",
    name: "Điều Hòa Mitsubishi Inverter 2HP (18.000 BTU)",
    brand: "Mitsubishi",
    category: "Điều hòa",
    price: 17990000,
    originalPrice: 20490000,
    icon: "❄️",
    description:
      "Điều hòa Mitsubishi Inverter 2HP công suất lớn, làm lạnh nhanh cho không gian rộng 20-30m², tiết kiệm điện, độ bền cao, bảo hành chính hãng.",
    specs: [
      "Công suất lạnh 18.000 BTU",
      "Inverter tiết kiệm điện",
      "Phù hợp phòng 20-30m²",
      "Chế độ ngủ thông minh",
      "Tự làm sạch dàn lạnh",
    ],
    inStock: true,
    btu: 18000,
    power_kw: 1.7,
    inverter: true,
    price_install: 1800000,
    warranty_years: 3,
  },
  {
    id: "dieu-hoa-daikin-thuong-1hp",
    name: "Điều Hòa Daikin Thường 1HP (9.000 BTU)",
    brand: "Daikin",
    category: "Điều hòa",
    price: 6990000,
    originalPrice: 7990000,
    icon: "❄️",
    description:
      "Điều hòa Daikin 1HP dòng phổ thông, giá tốt, làm lạnh ổn định, phù hợp phòng nhỏ 9-12m². Lựa chọn kinh tế cho gia đình.",
    specs: [
      "Công suất lạnh 9.000 BTU",
      "Block thường, giá tốt",
      "Phù hợp phòng 9-12m²",
      "Chế độ làm lạnh nhanh",
      "Lưới lọc bụi mịn",
    ],
    inStock: true,
    btu: 9000,
    power_kw: 0.95,
    inverter: false,
    price_install: 1200000,
    warranty_years: 2,
  },
];
