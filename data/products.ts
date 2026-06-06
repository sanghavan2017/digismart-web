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
};

export const categories = [
  { name: "Cáp sạc", icon: "🔌", desc: "USB-C, Lightning, 3-in-1, sạc nhanh" },
  { name: "Tai nghe", icon: "🎧", desc: "Có dây, Bluetooth, True Wireless" },
  { name: "Sạc dự phòng", icon: "🔋", desc: "10.000–20.000mAh, sạc nhanh" },
  { name: "Phụ kiện điện thoại", icon: "📱", desc: "Củ sạc, đế sạc không dây" },
];

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
];
