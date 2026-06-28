export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  icon: string;
  imageUrl?: string;
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
    description:
      "Máy lọc nước tạo ion kiềm Cleansui EU301, công nghệ Nhật Bản, kèm bộ lọc EUC3000 đầu tiên. Công suất lọc 8.000L, lưu lượng 3L/phút.",
    specs: [
      "Công suất lọc 8.000 lít trước khi thay lõi",
      "Lưu lượng 3 lít/phút",
      "Tạo nước ion kiềm",
      "Kèm bộ lọc EUC3000 đầu tiên",
      "Bảo hành vòi 5 năm, thân máy 2 năm — DigiSmart hỗ trợ đăng ký bảo hành",
    ],
    inStock: true,
    stages: 1,
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
    description:
      "Máy lọc nước Cleansui EU201 lắp đặt tích hợp dưới bồn rửa, vòi xoay 120°. Công suất lọc 8.000L, lưu lượng 3L/phút.",
    specs: [
      "Công suất lọc 8.000 lít trước khi thay lõi",
      "Lưu lượng 3 lít/phút",
      "Vòi xoay 120°",
      "Lắp tích hợp dưới bồn rửa",
      "Bảo hành vòi 5 năm, thân máy 2 năm — DigiSmart hỗ trợ đăng ký bảo hành",
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
    description:
      "Máy lọc nước Cleansui EU202 lắp đặt tích hợp dưới bồn rửa, vòi xoay 100°, giá tốt hơn EU201. Công suất lọc 8.000L, lưu lượng 3L/phút.",
    specs: [
      "Công suất lọc 8.000 lít trước khi thay lõi",
      "Lưu lượng 3 lít/phút",
      "Vòi xoay 100°",
      "Rẻ hơn EU201",
      "Bảo hành vòi 5 năm, thân máy 2 năm — DigiSmart hỗ trợ đăng ký bảo hành",
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
    description:
      "Máy lọc nước Cleansui EU103, mẫu rẻ nhất dòng lắp dưới bồn rửa của Cleansui. Công suất lọc 8.000L, lưu lượng 3L/phút.",
    specs: [
      "Công suất lọc 8.000 lít trước khi thay lõi",
      "Lưu lượng 3 lít/phút",
      "Rẻ nhất dòng dưới bồn rửa Cleansui",
      "Bảo hành vòi 5 năm, thân máy 2 năm — DigiSmart hỗ trợ đăng ký bảo hành",
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
    description:
      "Máy lọc nước Cleansui CWMF-500E tích hợp nóng lạnh, nước nóng 80-90°C, nước lạnh 4-10°C. Công suất lọc 8.000L, lưu lượng 3L/phút.",
    specs: [
      "Công suất lọc 8.000 lít trước khi thay lõi",
      "Lưu lượng 3 lít/phút",
      "Nước nóng 80-90°C",
      "Nước lạnh 4-10°C",
      "Bảo hành thân máy 2 năm — DigiSmart hỗ trợ đăng ký bảo hành",
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
    description:
      "Máy lọc nước thương mại Cleansui MP02-3, kèm bộ lọc UMC2150 đầu tiên. Công suất lọc 150.000L, lưu lượng 10L/phút.",
    specs: [
      "Công suất lọc 150.000 lít trước khi thay lõi",
      "Lưu lượng 10 lít/phút",
      "Kèm bộ lọc UMC2150 đầu tiên",
      "Phù hợp quy mô thương mại",
      "Bảo hành thân máy 2 năm — DigiSmart hỗ trợ đăng ký bảo hành",
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
    description:
      "Máy lọc nước thương mại Cleansui MP02-4, kèm bộ lọc UMC2050 đầu tiên. Công suất lọc 50.000L, lưu lượng 8L/phút.",
    specs: [
      "Công suất lọc 50.000 lít trước khi thay lõi",
      "Lưu lượng 8 lít/phút",
      "Kèm bộ lọc UMC2050 đầu tiên",
      "Phù hợp quy mô thương mại",
      "Bảo hành thân máy 2 năm — DigiSmart hỗ trợ đăng ký bảo hành",
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
    description:
      "Hệ thống lọc tổng đầu nguồn Cleansui MPOE-S4, kèm 4 bộ lọc MPOE050E đầu tiên. Lưu lượng 40L/phút. Cần khảo sát kỹ thuật trước khi lắp đặt, nước đầu vào cần đạt QCVN 01-1:2018/BYT.",
    specs: [
      "Lưu lượng 40 lít/phút",
      "Kèm 4 bộ lọc MPOE050E đầu tiên",
      "Lọc tổng đầu nguồn cho toàn nhà",
      "Cần khảo sát kỹ thuật trước khi lắp đặt",
      "Bảo hành thân máy 2 năm — DigiSmart hỗ trợ đăng ký bảo hành",
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
    description:
      "Hệ thống lọc tổng đầu nguồn Cleansui MPOE-P, kèm 2 bộ lọc MPOE050E, màn hình cảm ứng. Lưu lượng 30L/phút. Cần khảo sát kỹ thuật trước khi lắp đặt.",
    specs: [
      "Lưu lượng 30 lít/phút",
      "Kèm 2 bộ lọc MPOE050E đầu tiên",
      "Màn hình cảm ứng điều khiển",
      "Cần khảo sát kỹ thuật trước khi lắp đặt",
      "Bảo hành thân máy 2 năm — DigiSmart hỗ trợ đăng ký bảo hành",
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
    description:
      "Hệ thống lọc tổng đầu nguồn Cleansui MPOE-S, kèm 2 bộ lọc MPOE050E, kích thước nhỏ nhất trong dòng MPOE. Lưu lượng 30L/phút. Cần khảo sát kỹ thuật trước khi lắp đặt.",
    specs: [
      "Lưu lượng 30 lít/phút",
      "Kèm 2 bộ lọc MPOE050E đầu tiên",
      "Kích thước nhỏ nhất dòng MPOE",
      "Cần khảo sát kỹ thuật trước khi lắp đặt",
      "Bảo hành thân máy 2 năm — DigiSmart hỗ trợ đăng ký bảo hành",
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
    description:
      "Máy lọc nước Kitz Purifree lắp trực tiếp tại vòi, made in Japan. Công suất lọc 8.000L, lưu lượng 3.5L/phút. Giá thay lõi lọc: 3.600.000đ.",
    specs: [
      "Công suất lọc 8.000 lít trước khi thay lõi",
      "Lưu lượng 3.5 lít/phút",
      "Lắp trực tiếp tại vòi, không cần khoan tủ",
      "Made in Japan",
      "Bảo hành thiết bị 24 tháng, lõi lọc 12 tháng — lắp đặt và bảo hành do DigiSmart thực hiện",
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
    description:
      "Máy lọc nước Kitz OAS-NTS9 lắp âm tủ, made in Japan. Công suất lọc 7.500L, lưu lượng 5.0L/phút. Giá thay lõi lọc: 3.200.000đ.",
    specs: [
      "Công suất lọc 7.500 lít trước khi thay lõi",
      "Lưu lượng 5.0 lít/phút",
      "Lắp âm tủ, vòi riêng trên bồn rửa",
      "Made in Japan",
      "Bảo hành thiết bị 24 tháng, lõi lọc 12 tháng — lắp đặt và bảo hành do DigiSmart thực hiện",
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
    description:
      "Máy lọc nước Kitz OSS-T7 lắp trực tiếp tại vòi, made in Japan. Công suất lọc 11.000L, lưu lượng 5.0L/phút. Giá thay lõi lọc: 4.000.000đ.",
    specs: [
      "Công suất lọc 11.000 lít trước khi thay lõi",
      "Lưu lượng 5.0 lít/phút",
      "Lắp trực tiếp tại vòi",
      "Made in Japan",
      "Bảo hành thiết bị 24 tháng, lõi lọc 12 tháng — lắp đặt và bảo hành do DigiSmart thực hiện",
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
    description:
      "Máy lọc nước Kitz OSS-G4-E lắp âm tủ, made in Japan. Công suất lọc 8.000L, lưu lượng 3.5L/phút.",
    specs: [
      "Công suất lọc 8.000 lít trước khi thay lõi",
      "Lưu lượng 3.5 lít/phút",
      "Lắp âm tủ",
      "Made in Japan",
      "Bảo hành thiết bị 24 tháng, lõi lọc 12 tháng — lắp đặt và bảo hành do DigiSmart thực hiện",
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
    description:
      "Máy lọc nước Kitz OAS-9 lắp âm tủ, made in Japan. Công suất lọc 11.000L, lưu lượng 5.0L/phút. Giá thay lõi lọc: 3.800.000đ.",
    specs: [
      "Công suất lọc 11.000 lít trước khi thay lõi",
      "Lưu lượng 5.0 lít/phút",
      "Lắp âm tủ",
      "Made in Japan",
      "Bảo hành thiết bị 24 tháng, lõi lọc 12 tháng — lắp đặt và bảo hành do DigiSmart thực hiện",
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
