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
  { name: "Cáp sạc", icon: "🔌", desc: "USB-C, Lightning, 3-in-1, sạc nhanh" },
  { name: "Tai nghe", icon: "🎧", desc: "Có dây, Bluetooth, True Wireless" },
  { name: "Sạc dự phòng", icon: "🔋", desc: "10.000–20.000mAh, sạc nhanh" },
  { name: "Phụ kiện điện thoại", icon: "📱", desc: "Củ sạc, đế sạc không dây" },
  { name: "Điều hòa", icon: "❄️", desc: "Điều hòa Inverter chính hãng, lắp đặt tận nơi", slug: "dieu-hoa" },
  { name: "Máy lọc nước", icon: "💧", desc: "Máy lọc nước RO, nóng lạnh, nhiều cấp lọc", slug: "may-loc-nuoc" },
];

export const brands = ["Remax", "Mitsubishi", "Daikin", "AoSmith"];

export const products: Product[] = [
  {
    id: "cap-remax-rc-c015-65w",
    name: "Cáp Sạc Nhanh Remax RC-C015 65W USB-C to USB-C",
    brand: "Remax",
    category: "Cáp sạc",
    price: 119000,
    originalPrice: 159000,
    icon: "🔌",
    description:
      "Cáp USB-C to USB-C 65W hỗ trợ sạc nhanh PD, dây dù bện chắc chắn, đầu nối kẽm chống gãy. Phù hợp laptop, điện thoại Android, iPad Pro.",
    specs: [
      "Công suất 65W (PD)",
      "USB-C to USB-C",
      "Dây dù bện chống rối",
      "Đầu kẽm chống gãy 10.000 lần uốn",
      "Dài 1m",
    ],
    inStock: true,
  },
  {
    id: "cap-remax-rc-c035-lightning",
    name: "Cáp Lightning Remax RC-C035 cho iPhone/iPad",
    brand: "Remax",
    category: "Cáp sạc",
    price: 89000,
    originalPrice: 129000,
    icon: "🔌",
    description:
      "Cáp Lightning sạc nhanh 20W cho iPhone, iPad. Dây dù bện mềm mại, đầu nối bọc nhôm chống oxi hóa, dài 1m.",
    specs: [
      "Sạc nhanh 20W",
      "Cổng Lightning (iPhone/iPad)",
      "Dây dù bện chống xoắn",
      "Đầu nhôm chống oxi hóa",
      "Dài 1m",
    ],
    inStock: true,
  },
  {
    id: "cap-remax-rc-c006-3in1",
    name: "Cáp Sạc 3-in-1 Remax RC-C006 (USB-C + Lightning + Micro USB)",
    brand: "Remax",
    category: "Cáp sạc",
    price: 99000,
    originalPrice: 149000,
    icon: "🔌",
    description:
      "Cáp 3 đầu tiện lợi dùng cho mọi thiết bị: USB-C (Android/iPad), Lightning (iPhone), Micro USB (thiết bị cũ). Sạc đồng thời hoặc dùng riêng từng đầu.",
    specs: [
      "3 đầu: USB-C + Lightning + Micro USB",
      "Sạc nhanh 18W",
      "Dây silicon mềm, bền",
      "Dài 1.2m",
      "Tương thích mọi thiết bị",
    ],
    inStock: true,
  },
  {
    id: "tai-nghe-remax-rm-512",
    name: "Tai Nghe Có Dây Remax RM-512 Bass Stereo",
    brand: "Remax",
    category: "Tai nghe",
    price: 179000,
    originalPrice: 249000,
    icon: "🎧",
    description:
      "Tai nghe in-ear có mic tích hợp, âm bass mạnh mẽ, khử tiếng ồn, jack 3.5mm tương thích điện thoại, máy tính. Nút điều khiển nhạc trên dây.",
    specs: [
      "Driver 10mm bass mạnh",
      "Jack 3.5mm",
      "Mic tích hợp HD",
      "Nút điều khiển on-dây",
      "Trở kháng 32Ω",
    ],
    inStock: true,
  },
  {
    id: "tai-nghe-bt-remax-rb-m47",
    name: "Tai Nghe Bluetooth Remax RB-M47 Over-Ear",
    brand: "Remax",
    category: "Tai nghe",
    price: 390000,
    originalPrice: 520000,
    icon: "🎧",
    description:
      "Tai nghe chụp tai Bluetooth 5.0, pin 40 giờ nghe nhạc, gập gọn bỏ túi, âm bass sâu, mic đàm thoại rõ ràng. Đệm tai da PU êm ái.",
    specs: [
      "Bluetooth 5.0",
      "Pin 40 giờ nghe nhạc",
      "Driver 40mm âm bass sâu",
      "Gập gọn tiết kiệm không gian",
      "Đệm tai da PU mềm",
    ],
    inStock: true,
  },
  {
    id: "tai-nghe-tws-remax-tws10i",
    name: "Tai Nghe True Wireless Remax TWS-10i ANC",
    brand: "Remax",
    category: "Tai nghe",
    price: 490000,
    originalPrice: 650000,
    icon: "🎵",
    description:
      "Tai nghe TWS chống ồn chủ động ANC, Bluetooth 5.1, pin 6h + 24h hộp sạc, IPX4 chống nước, cảm ứng chạm điều khiển nhạc và cuộc gọi.",
    specs: [
      "Chống ồn ANC",
      "Bluetooth 5.1",
      "Pin 6h + 24h (hộp sạc)",
      "IPX4 chống nước, mồ hôi",
      "Cảm ứng chạm",
    ],
    inStock: true,
  },
  {
    id: "pin-remax-rpp316-10000mah",
    name: "Pin Dự Phòng Remax RPP-316 10.000mAh 22.5W",
    brand: "Remax",
    category: "Sạc dự phòng",
    price: 350000,
    originalPrice: 469000,
    icon: "🔋",
    description:
      "Pin sạc dự phòng 10.000mAh sạc nhanh 22.5W, màn hình LED hiển thị dung lượng, nhỏ gọn bỏ túi, 2 cổng ra USB-A + USB-C, sạc đầy điện thoại 2 lần.",
    specs: [
      "10.000mAh",
      "Sạc nhanh 22.5W (đầu vào + ra)",
      "USB-A + USB-C",
      "Màn hình LED dung lượng",
      "Nhỏ gọn 160g",
    ],
    inStock: true,
  },
  {
    id: "pin-remax-rpp145-20000mah",
    name: "Pin Dự Phòng Remax RPP-145 20.000mAh 65W",
    brand: "Remax",
    category: "Sạc dự phòng",
    price: 649000,
    originalPrice: 849000,
    icon: "🔋",
    description:
      "Pin dự phòng 20.000mAh công suất 65W, sạc được cả laptop MacBook và điện thoại cùng lúc, 3 cổng ra (USB-C PD + 2x USB-A), hiển thị % pin.",
    specs: [
      "20.000mAh",
      "65W — sạc được laptop",
      "USB-C PD + 2x USB-A",
      "Hiển thị % pin LED",
      "Sạc MacBook/iPad/điện thoại",
    ],
    inStock: true,
  },
  {
    id: "sac-remax-rp-u43-65w",
    name: "Củ Sạc Nhanh Remax RP-U43 65W GaN 3 Cổng",
    brand: "Remax",
    category: "Phụ kiện điện thoại",
    price: 290000,
    originalPrice: 390000,
    icon: "⚡",
    description:
      "Củ sạc GaN 65W siêu gọn nhẹ, 3 cổng đồng thời (USB-C PD 65W + USB-C 18W + USB-A 18W), thông minh tự phân phối điện, an toàn chống quá nhiệt.",
    specs: [
      "65W tổng công suất",
      "Công nghệ GaN nhỏ gọn",
      "USB-C PD 65W + USB-C + USB-A",
      "Tự phân phối điện thông minh",
      "Chống quá nhiệt, quá áp",
    ],
    inStock: true,
  },
  {
    id: "de-sac-khong-day-remax-rp-w37",
    name: "Đế Sạc Không Dây Remax RP-W37 15W",
    brand: "Remax",
    category: "Phụ kiện điện thoại",
    price: 199000,
    originalPrice: 279000,
    icon: "📱",
    description:
      "Đế sạc không dây Qi 15W tương thích iPhone, Samsung, Xiaomi. Mặt silicon chống trượt, đèn LED báo sạc, mỏng chỉ 7mm, thiết kế tối giản.",
    specs: [
      "Sạc không dây 15W",
      "Tương thích Qi (iPhone/Android)",
      "Mặt silicon chống trượt",
      "Dày 7mm siêu mỏng",
      "Đèn LED báo trạng thái sạc",
    ],
    inStock: true,
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
