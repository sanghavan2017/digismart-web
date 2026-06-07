export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  icon: string;
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
};

export const categories = [
  { name: "Điều hòa", icon: "❄️", desc: "Điều hòa Inverter chính hãng, lắp đặt tận nơi", slug: "dieu-hoa" },
  { name: "Máy lọc nước", icon: "💧", desc: "Máy lọc nước RO, nóng lạnh, nhiều cấp lọc", slug: "may-loc-nuoc" },
];

export const brands = ["Mitsubishi", "Daikin", "AoSmith"];

export const products: Product[] = [
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
  // ------- Máy lọc nước -------
  {
    id: "may-loc-nuoc-aosmith-ro-g2",
    name: "Máy Lọc Nước AO Smith RO G2 10 Lít/Giờ",
    brand: "AoSmith",
    category: "Máy lọc nước",
    price: 6490000,
    originalPrice: 7490000,
    icon: "💧",
    description:
      "Máy lọc nước RO AO Smith công nghệ Mỹ, 8 cấp lọc, loại bỏ vi khuẩn và tạp chất, giữ khoáng chất có lợi. Vòi nước trực tiếp tiện lợi, tủ đứng sang trọng.",
    specs: [
      "Công suất lọc 10 lít/giờ",
      "8 cấp lọc RO",
      "Màng lọc Mỹ chính hãng",
      "Vòi nước trực tiếp",
      "Tủ đứng cao cấp",
    ],
    inStock: true,
    capacity_lph: 10,
    stages: 8,
    has_hot: false,
    has_cold: false,
    price_install: 500000,
    warranty_years: 2,
  },
  {
    id: "may-loc-nuoc-aosmith-nong-lanh",
    name: "Máy Lọc Nước AO Smith Nóng Lạnh G3 12 Lít/Giờ",
    brand: "AoSmith",
    category: "Máy lọc nước",
    price: 9990000,
    originalPrice: 11490000,
    icon: "💧",
    description:
      "Máy lọc nước RO AO Smith tích hợp nóng - lạnh - nguội 3 trong 1, 9 cấp lọc, công nghệ lọc ngược thẩm thấu RO, an toàn cho cả gia đình. Tiết kiệm thời gian đun nước.",
    specs: [
      "Công suất lọc 12 lít/giờ",
      "9 cấp lọc RO",
      "Tích hợp nóng - lạnh - nguội",
      "Vòi an toàn chống bỏng",
      "Tủ đứng chống ẩm mốc",
    ],
    inStock: true,
    capacity_lph: 12,
    stages: 9,
    has_hot: true,
    has_cold: true,
    price_install: 600000,
    warranty_years: 3,
  },
  {
    id: "may-loc-nuoc-mitsubishi-ro-cleansui",
    name: "Máy Lọc Nước Mitsubishi Cleansui RO 10 Lít/Giờ",
    brand: "Mitsubishi",
    category: "Máy lọc nước",
    price: 8290000,
    originalPrice: 9290000,
    icon: "💧",
    description:
      "Máy lọc nước Mitsubishi Cleansui công nghệ Nhật Bản, lọc RO 8 cấp, loại bỏ clo dư và kim loại nặng, giữ vi khoáng tự nhiên, thiết kế nhỏ gọn hiện đại.",
    specs: [
      "Công suất lọc 10 lít/giờ",
      "8 cấp lọc RO công nghệ Nhật",
      "Loại bỏ clo dư, kim loại nặng",
      "Giữ vi khoáng có lợi",
      "Thiết kế nhỏ gọn, hiện đại",
    ],
    inStock: true,
    capacity_lph: 10,
    stages: 8,
    has_hot: false,
    has_cold: true,
    price_install: 500000,
    warranty_years: 2,
  },
];
