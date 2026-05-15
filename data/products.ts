export type Product = {
  id: string;
  name: string;
  brand: string;
  sku: string;
  price: number;
  originalPrice: number;
  category: string;
  shortDesc: string;
  specs: string;
  icon: string;
  status: string;
  shopeeLink?: string;
  lazadaLink?: string;
};

export const products: Product[] = [
  {
    id: "DS-001",
    name: "Máy xay đa năng 500W 2L",
    brand: "Zimmerman",
    sku: "ZMC-7058SG",
    price: 590000,
    originalPrice: 643000,
    category: "Thiết bị nhà bếp",
    shortDesc: "Máy xay đa năng 2L, động cơ 500W mạnh mẽ. Phù hợp xay sinh tố, xay thịt, làm nhuyễn thức ăn cho bé.",
    specs: "Công suất: 500W | Dung tích: 2L | Điện áp: 220V-50Hz",
    icon: "🥤",
    status: "Đang bán",
    shopeeLink: "#",
    lazadaLink: "#",
  },
  {
    id: "DS-002",
    name: "Ấm đun siêu tốc 1500W 1.8L",
    brand: "Living Sense",
    sku: "LSK-1800",
    price: 149000,
    originalPrice: 226000,
    category: "Thiết bị nhà bếp",
    shortDesc: "Ấm đun siêu tốc inox 1.8L, công suất 1500W sôi nhanh, tự ngắt an toàn.",
    specs: "Công suất: 1500W | Dung tích: 1.8L | Tự ngắt khi sôi",
    icon: "☕",
    status: "Đang bán",
    shopeeLink: "#",
    lazadaLink: "#",
  },
  {
    id: "DS-003",
    name: "Máy sấy tóc BLDC 1400W",
    brand: "Unimax",
    sku: "UM-8001HDC",
    price: 990000,
    originalPrice: 1101000,
    category: "Chăm sóc cá nhân",
    shortDesc: "Máy sấy tóc công nghệ BLDC tiết kiệm điện, 1400W. Có 2 màu Xanh/Hồng.",
    specs: "Công suất: 1400W | Công nghệ: BLDC | Màu: Xanh/Hồng",
    icon: "💨",
    status: "Đang bán",
    shopeeLink: "#",
    lazadaLink: "#",
  },
  {
    id: "DS-004",
    name: "Máy hút bụi đa năng 600W",
    brand: "Unimax",
    sku: "UVC-2394",
    price: 1090000,
    originalPrice: 1253000,
    category: "Thiết bị nhà bếp",
    shortDesc: "Máy hút bụi gia đình 600W, lực hút mạnh ≥15kPa. 2 màu Xanh/Đỏ.",
    specs: "Công suất: 600W | Lực hút: ≥15kPa | Màu: Xanh/Đỏ",
    icon: "🌀",
    status: "Đang bán",
    shopeeLink: "#",
    lazadaLink: "#",
  },
  {
    id: "DS-005",
    name: "Đèn diệt côn trùng LED 8W",
    brand: "Unimax",
    sku: "UMB-8WL",
    price: 179000,
    originalPrice: 307000,
    category: "Diệt côn trùng",
    shortDesc: "Thiết bị diệt côn trùng đèn LED 8W, hiệu quả trong phòng đến 30m². Tuổi thọ 20.000h.",
    specs: "Công suất: 8W | Phạm vi: 30m² | Tuổi thọ: 20.000h",
    icon: "🦟",
    status: "Đang bán",
    shopeeLink: "#",
    lazadaLink: "#",
  },
];

export const categories = ["Tất cả", "Thiết bị nhà bếp", "Chăm sóc cá nhân", "Diệt côn trùng"];
