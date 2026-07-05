export type Article = {
  videoId: string;
  title: string;
  desc: string;
};

export const articles: Article[] = [
  {
    videoId: "WiBF4sjVU9Y",
    title: "Đánh giá chất lượng nguồn nước qua những chỉ số nào?",
    desc: "Tìm hiểu các chỉ số quan trọng để đánh giá nước sinh hoạt có đạt chuẩn an toàn hay không.",
  },
  {
    videoId: "h2MnPGIEFYY",
    title: "Nước uống có TDS bao nhiêu là an toàn?",
    desc: "Giải thích chỉ số TDS (tổng chất rắn hòa tan) và mức TDS phù hợp cho nước uống hàng ngày.",
  },
  {
    videoId: "3mbNiH2zZQs",
    title: "Hướng dẫn khắc phục các vấn đề thường gặp với nguồn nước sinh hoạt",
    desc: "Nhận biết và xử lý các vấn đề phổ biến về nước sinh hoạt tại nhà.",
  },
];

export type PostSection = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Điều hòa" | "Máy lọc nước";
  date: string; // YYYY-MM-DD
  readMinutes: number;
  sections: PostSection[];
  sources: { label: string; url: string }[];
  relatedCategory: string; // link tới trang danh mục liên quan
};

export const posts: Post[] = [
  {
    slug: "chon-cong-suat-dieu-hoa-theo-dien-tich-phong",
    title: "Chọn điều hòa bao nhiêu BTU cho phòng bao nhiêu m²?",
    excerpt:
      "9.000, 12.000 hay 18.000 BTU? Bảng chọn công suất theo diện tích phòng do chính Daikin khuyến nghị, kèm các yếu tố khiến bạn nên chọn dư công suất.",
    category: "Điều hòa",
    date: "2026-07-05",
    readMinutes: 4,
    sections: [
      {
        paragraphs: [
          "BTU (British Thermal Unit) là đơn vị đo công suất làm lạnh của điều hòa. Chọn máy thiếu công suất thì phòng lâu mát, máy chạy quá tải và tốn điện; chọn dư quá nhiều lại lãng phí tiền mua máy. Vì vậy bước đầu tiên khi mua điều hòa luôn là đo diện tích phòng.",
        ],
      },
      {
        heading: "Bảng chọn công suất theo diện tích (khuyến nghị của Daikin)",
        list: [
          "Phòng dưới 15 m² → 9.000 BTU (1HP)",
          "Phòng 16–22 m² → 12.000 BTU (1.5HP)",
          "Phòng 22–30 m² → 18.000 BTU (2HP)",
          "Phòng 31–35 m² → 22.000–24.000 BTU (2.5HP)",
        ],
        paragraphs: [
          "Công thức nhanh Daikin đưa ra cho phòng trần cao khoảng 3m: Công suất (BTU) ≈ diện tích phòng (m²) × 600. Ví dụ phòng 20 m² cần khoảng 12.000 BTU.",
        ],
      },
      {
        heading: "Khi nào nên chọn dư công suất?",
        list: [
          "Phòng hướng Tây, nhiều cửa kính, cách nhiệt kém — nắng chiếu trực tiếp làm tải nhiệt tăng đáng kể.",
          "Phòng đông người (phòng khách, phòng ăn) — mỗi người là một nguồn nhiệt.",
          "Nhiều thiết bị tỏa nhiệt: tủ lạnh, máy tính, bếp — nên cộng thêm 10–20% công suất.",
          "Tầng áp mái hoặc trần thấp hơn/cao hơn 3m — tính theo thể tích: BTU ≈ thể tích phòng (m³) × 200.",
        ],
      },
      {
        heading: "Áp dụng vào thực tế",
        paragraphs: [
          "Toàn bộ điều hòa Mitsubishi Electric và Daikin tại DigiSmart đều ghi rõ công suất BTU và diện tích phòng phù hợp ngay trong phần thông số của từng máy — bạn chỉ cần đo phòng rồi lọc theo dải công suất tương ứng. Nếu phòng của bạn thuộc dạng \"khó\" (hướng nắng, kính nhiều), gọi 0778 886 758 để kỹ thuật DigiSmart tư vấn miễn phí trước khi chốt máy.",
        ],
      },
    ],
    sources: [
      {
        label: "Daikin Việt Nam — Lựa chọn công suất điều hòa hợp lý",
        url: "https://www.daikin.com.vn/truyen-thong/kinh-nghiem-hay/lua-chon-cong-suat-dieu-hoa-hop-ly-khong-lo-lang-phi-tien-dien",
      },
    ],
    relatedCategory: "/dieu-hoa",
  },
  {
    slug: "dieu-hoa-inverter-la-gi-co-dang-tien-khong",
    title: "Điều hòa Inverter là gì? Có đáng tiền hơn máy thường không?",
    excerpt:
      "Inverter đắt hơn máy thường vài triệu đồng. Bài này giải thích cơ chế tiết kiệm điện của Inverter và cách tính xem trường hợp của bạn có đáng đầu tư không.",
    category: "Điều hòa",
    date: "2026-07-05",
    readMinutes: 5,
    sections: [
      {
        heading: "Inverter hoạt động khác máy thường ở đâu?",
        paragraphs: [
          "Điều hòa thường (non-inverter) chỉ có 2 trạng thái: chạy hết công suất hoặc tắt hẳn. Khi phòng đạt nhiệt độ cài đặt, máy nén tắt; phòng nóng lên lại bật — mỗi lần khởi động lại đều ngốn dòng điện lớn.",
          "Điều hòa Inverter dùng máy nén biến tần: khi phòng đã mát, máy không tắt mà giảm tốc độ xuống mức vừa đủ duy trì nhiệt độ. Nhờ tránh được chu kỳ bật/tắt liên tục, máy tiêu thụ ít điện hơn hẳn khi chạy lâu — theo công bố của Daikin và Mitsubishi Electric, công nghệ Inverter giúp tiết kiệm đến khoảng 30% điện năng so với máy thường, một số dòng và chế độ tiết kiệm (Econo, Econo Cool) còn cao hơn. Con số thực tế phụ thuộc thời gian dùng và cách cài nhiệt độ.",
        ],
      },
      {
        heading: "Khi nào Inverter đáng tiền?",
        list: [
          "Dùng điều hòa từ 6–8 tiếng mỗi ngày trở lên (phòng ngủ bật qua đêm, văn phòng): tiền điện tiết kiệm mỗi tháng sẽ bù phần chênh giá máy sau 1–2 mùa nóng.",
          "Cần yên tĩnh: Inverter chạy ổn định ở tốc độ thấp nên êm hơn, nhiệt độ không dao động kiểu lúc lạnh buốt lúc hầm.",
          "Dùng ít (phòng khách chỉ bật vài tiếng cuối tuần): máy thường như dòng Daikin FTF (dòng tiêu chuẩn trong catalog DigiSmart) rẻ hơn đáng kể và vẫn làm lạnh tốt — Inverter khó \"hoàn vốn\" trong trường hợp này.",
        ],
      },
      {
        heading: "Lưu ý khi mua",
        paragraphs: [
          "Inverter chỉ phát huy tối đa khi máy đúng công suất với phòng (xem bài chọn BTU theo diện tích) và được vệ sinh định kỳ. Máy thiếu công suất sẽ luôn phải chạy tốc độ cao — mất luôn lợi thế tiết kiệm điện.",
          "Trong catalog DigiSmart, 64/68 máy là Inverter (Mitsubishi Electric MSY/MSZ, Daikin FTKB/FTKF/FTKY/FTKM/FTKZ/FTHB/FTHF/FTXV/FTXM); dòng Daikin FTF là lựa chọn tiêu chuẩn non-inverter cho nhu cầu dùng ít.",
        ],
      },
    ],
    sources: [
      {
        label: "Daikin Việt Nam — Kinh nghiệm hay về điều hòa Inverter",
        url: "https://www.daikin.com.vn/truyen-thong/kinh-nghiem-hay",
      },
      {
        label: "Mitsubishi Electric Việt Nam — thông tin sản phẩm điều hòa",
        url: "https://vietnam.mitsubishielectric.com/vi/products-solutions/ac/index.html",
      },
    ],
    relatedCategory: "/dieu-hoa",
  },
  {
    slug: "cspf-la-gi-cach-doc-nhan-nang-luong",
    title: "CSPF là gì? Cách đọc nhãn năng lượng khi mua điều hòa",
    excerpt:
      "Nhãn năng lượng dán trên điều hòa ghi số sao và chỉ số CSPF. Hiểu đúng 2 thông tin này giúp bạn ước lượng tiền điện trước khi mua.",
    category: "Điều hòa",
    date: "2026-07-05",
    readMinutes: 4,
    sections: [
      {
        heading: "CSPF — hiệu suất lạnh toàn mùa",
        paragraphs: [
          "CSPF (Cooling Seasonal Performance Factor) là chỉ số hiệu suất lạnh toàn mùa: với 1 kWh điện tiêu thụ, máy tạo ra được bao nhiêu năng lượng làm lạnh, tính trung bình theo cả mùa nóng thay vì chỉ đo ở một điều kiện cố định. CSPF càng cao, máy càng tiết kiệm điện.",
          "Đây là chỉ số được dùng trong chương trình dán nhãn năng lượng bắt buộc của Bộ Công Thương cho điều hòa gia dụng tại Việt Nam. Số sao trên nhãn (1–5 sao) được xếp dựa trên CSPF — máy 5 sao là nhóm hiệu suất cao nhất.",
        ],
      },
      {
        heading: "Đọc nhãn thế nào cho nhanh?",
        list: [
          "Số sao: chọn 4–5 sao nếu dùng nhiều; nhãn cũng ghi rõ CSPF để so sánh giữa hai máy cùng số sao.",
          "So sánh CSPF phải cùng công suất: so máy 1HP với 1HP, không so 1HP với 2HP.",
          "Chênh lệch CSPF lớn = chênh tiền điện rõ rệt khi dùng lâu dài: ví dụ trong catalog DigiSmart, dòng tiêu chuẩn có CSPF khoảng 3.3 trong khi các dòng Inverter cao cấp (Daikin FTKM/FTKZ) đạt CSPF 5.7–6.0 — cùng 1 giờ chạy, máy CSPF cao tạo ra lượng lạnh gần gấp đôi trên mỗi số điện.",
        ],
      },
      {
        heading: "Xem CSPF ở đâu trên web DigiSmart?",
        paragraphs: [
          "Tất cả điều hòa Daikin tại DigiSmart đều ghi CSPF trong bảng thông số của từng sản phẩm (lấy từ tab thông số kỹ thuật trên Daikin E-Shop). Bạn có thể mở 2–3 máy cùng công suất và so trực tiếp chỉ số này trước khi quyết định.",
        ],
      },
    ],
    sources: [
      {
        label: "Điện Máy Xanh — Chỉ số hiệu suất năng lượng CSPF là gì?",
        url: "https://www.dienmayxanh.com/kinh-nghiem-hay/chi-so-hieu-suat-nang-luong-cspf-la-gi-698722",
      },
      {
        label: "Daikin Việt Nam — thông số kỹ thuật sản phẩm",
        url: "https://www.daikin.com.vn/",
      },
    ],
    relatedCategory: "/dieu-hoa",
  },
  {
    slug: "dieu-hoa-1-chieu-hay-2-chieu-mien-nam",
    title: "Điều hòa 1 chiều hay 2 chiều — ở TPHCM có cần máy 2 chiều?",
    excerpt:
      "Máy 2 chiều vừa làm lạnh vừa sưởi ấm nhưng đắt hơn. Ở khí hậu miền Nam, câu trả lời cho đa số gia đình khá rõ ràng.",
    category: "Điều hòa",
    date: "2026-07-05",
    readMinutes: 3,
    sections: [
      {
        heading: "Khác nhau ở một chức năng: sưởi",
        paragraphs: [
          "Điều hòa 1 chiều chỉ làm lạnh. Điều hòa 2 chiều có thêm chế độ bơm nhiệt để sưởi ấm vào mùa lạnh. Về làm lạnh, hai loại không khác nhau — bạn không mát hơn khi mua máy 2 chiều.",
        ],
      },
      {
        heading: "TPHCM và miền Nam: 1 chiều là đủ",
        paragraphs: [
          "TPHCM nóng quanh năm, nhiệt độ hiếm khi xuống dưới 20°C nên chức năng sưởi gần như không bao giờ được dùng đến. Với đa số gia đình ở miền Nam, chọn máy 1 chiều giúp tiết kiệm chi phí đầu tư mà không mất gì về trải nghiệm.",
          "Máy 2 chiều hợp lý khi: bạn ở vùng có mùa lạnh thực sự (Đà Lạt, miền Bắc), nhà có người già hoặc trẻ sơ sinh nhạy cảm với những đợt lạnh bất thường, hoặc bạn muốn một máy dùng được nếu sau này chuyển ra Bắc.",
        ],
      },
      {
        heading: "Lựa chọn trong catalog DigiSmart",
        list: [
          "1 chiều Inverter (phổ biến nhất cho TPHCM): Mitsubishi Electric MSY-JY/JA/GR, MS-JS; Daikin FTKB/FTKF/FTKY/FTKM/FTKZ.",
          "1 chiều có sưởi dịu nhẹ: Daikin FTHB — lai giữa hai loại, thêm sưởi nhẹ cho những ngày se lạnh.",
          "2 chiều đầy đủ: Daikin FTHF/FTXV/FTXM, Mitsubishi Electric MSZ-HT — dành cho ai thật sự cần sưởi.",
        ],
      },
    ],
    sources: [
      {
        label: "Daikin Việt Nam — dòng sản phẩm điều hòa dân dụng",
        url: "https://www.daikin.com.vn/",
      },
    ],
    relatedCategory: "/dieu-hoa",
  },
  {
    slug: "ve-sinh-dieu-hoa-bao-lau-mot-lan",
    title: "Vệ sinh điều hòa bao lâu một lần? Vì sao máy bẩn tốn điện hơn",
    excerpt:
      "Điều hòa bẩn làm lạnh yếu, tốn điện và phả vi khuẩn vào phòng. Lịch vệ sinh hợp lý cho gia đình, văn phòng và những dấu hiệu máy đang \"kêu cứu\".",
    category: "Điều hòa",
    date: "2026-07-05",
    readMinutes: 4,
    sections: [
      {
        heading: "Lịch vệ sinh khuyến nghị",
        list: [
          "Lưới lọc dàn lạnh: tự tháo rửa 1–2 tháng/lần nếu dùng hằng ngày (chỉ cần rửa nước, phơi khô rồi lắp lại).",
          "Bảo dưỡng tổng thể (dàn lạnh + dàn nóng, kiểm tra gas): gia đình dùng thường xuyên nên làm 3–6 tháng/lần; văn phòng, nơi nhiều bụi nên 2–3 tháng/lần; tối thiểu 1 năm/lần kể cả khi dùng ít.",
        ],
      },
      {
        heading: "Máy bẩn gây hại thế nào?",
        list: [
          "Tốn điện: bụi phủ dàn trao đổi nhiệt khiến máy phải chạy lâu hơn, tải cao hơn để đạt cùng nhiệt độ.",
          "Làm lạnh yếu, có mùi: bụi và nấm mốc tích tụ trong dàn lạnh bị thổi thẳng vào không khí bạn hít mỗi ngày.",
          "Giảm tuổi thọ: máy nén hoạt động quá tải kéo dài là nguyên nhân hỏng hóc đắt tiền nhất.",
        ],
      },
      {
        heading: "Dấu hiệu cần vệ sinh ngay",
        list: [
          "Máy chạy nhưng lâu mát hơn hẳn trước đây dù cùng nhiệt độ cài đặt.",
          "Có mùi hôi/ẩm mốc khi mới bật máy.",
          "Dàn lạnh nhỏ nước, hoặc tiếng ồn to bất thường.",
          "Tiền điện tăng rõ dù thói quen dùng không đổi.",
        ],
        paragraphs: [
          "DigiSmart lắp đặt điều hòa tận nơi tại TPHCM và hỗ trợ tư vấn lịch bảo dưỡng phù hợp với môi trường nhà bạn — gọi 0778 886 758 hoặc đặt lịch ngay trên web.",
        ],
      },
    ],
    sources: [
      {
        label: "Meta.vn — Hướng dẫn vệ sinh điều hòa Daikin",
        url: "https://meta.vn/hotro/cach-ve-sinh-dieu-hoa-may-lanh-daikin-15003",
      },
    ],
    relatedCategory: "/dieu-hoa",
  },
  {
    slug: "tds-la-gi-nuoc-uong-tds-bao-nhieu-an-toan",
    title: "TDS là gì? Nước TDS bao nhiêu thì uống được — và giới hạn của con số này",
    excerpt:
      "Bút đo TDS giá rẻ được dùng tràn lan để \"kiểm tra nước sạch\". Nó đo được gì, không đo được gì, và ngưỡng nào là chấp nhận được theo WHO?",
    category: "Máy lọc nước",
    date: "2026-07-05",
    readMinutes: 5,
    sections: [
      {
        heading: "TDS đo cái gì?",
        paragraphs: [
          "TDS (Total Dissolved Solids — tổng chất rắn hòa tan) là tổng lượng khoáng chất, muối và ion hòa tan trong nước, tính bằng mg/L (hoặc ppm). Bút đo TDS ước lượng con số này qua độ dẫn điện của nước.",
          "Theo tài liệu của Tổ chức Y tế Thế giới (WHO), TDS trong ngưỡng thông thường chủ yếu ảnh hưởng đến vị của nước chứ không phải chỉ số sức khỏe trực tiếp: dưới 300 mg/L được đánh giá là rất tốt về vị, 300–600 mg/L là tốt, 600–900 mg/L trung bình, 900–1.200 mg/L kém và trên 1.200 mg/L gần như không uống được.",
        ],
      },
      {
        heading: "Điều bút TDS KHÔNG nói cho bạn biết",
        list: [
          "TDS thấp không có nghĩa nước an toàn: vi khuẩn, virus không làm tăng TDS — nước nhiễm khuẩn vẫn có thể đo ra TDS rất đẹp.",
          "TDS không phân biệt khoáng tốt hay chất độc: 200 mg/L canxi–magie (tốt) và 200 mg/L có lẫn kim loại nặng đều hiện cùng một con số.",
          "TDS cao chưa chắc xấu: nước khoáng thiên nhiên có TDS cao do giàu khoáng chất tự nhiên.",
        ],
        paragraphs: [
          "Vì vậy đừng dùng bút TDS làm thước đo duy nhất. Muốn biết nước nhà mình có an toàn không, cần nhìn cả các chỉ số vi sinh (Coliform, E.coli), kim loại nặng, clo dư... theo quy chuẩn nước sinh hoạt QCVN 01-1:2018/BYT của Bộ Y tế.",
        ],
      },
      {
        heading: "Lọc nước mà vẫn giữ khoáng",
        paragraphs: [
          "Một số công nghệ lọc (như RO) loại gần hết chất hòa tan nên TDS sau lọc gần về 0 — sạch nhưng mất luôn khoáng tự nhiên. Ngược lại, công nghệ màng sợi rỗng (hollow fiber) của Mitsubishi Cleansui lọc vi khuẩn và tạp chất đến 0,01 micron nhưng giữ lại các khoáng chất tự nhiên như Na⁺, K⁺, Ca²⁺, Mg²⁺ — nước sau lọc vẫn có vị ngon và TDS ở mức tự nhiên của nguồn nước. Xem chi tiết trong bài về công nghệ sợi rỗng.",
        ],
      },
    ],
    sources: [
      {
        label: "WHO — Total dissolved solids in Drinking-water (tài liệu kỹ thuật)",
        url: "https://www.who.int/publications/m/item/total-dissolved-solids-in-drinking-water",
      },
      {
        label: "Thư viện Pháp luật — QCVN 01-1:2018/BYT về chất lượng nước sạch sinh hoạt",
        url: "https://thuvienphapluat.vn/phap-luat/qcvn-0112018byt-quy-dinh-chat-luong-nuoc-sach-su-dung-cho-muc-dich-sinh-hoat-nuoc-sach-dung-cho-sin-114773.html",
      },
    ],
    relatedCategory: "/may-loc-nuoc",
  },
  {
    slug: "cong-nghe-mang-soi-rong-cleansui",
    title: "Công nghệ màng sợi rỗng Cleansui: lọc 0,01 micron mà vẫn giữ khoáng",
    excerpt:
      "Vì sao máy lọc Cleansui không cần điện, không nước thải mà vẫn chặn được vi khuẩn? Giải mã màng sợi rỗng — công nghệ Mitsubishi phát triển từ thập niên 1970.",
    category: "Máy lọc nước",
    date: "2026-07-05",
    readMinutes: 5,
    sections: [
      {
        heading: "Màng sợi rỗng là gì?",
        paragraphs: [
          "Màng sợi rỗng (hollow fiber membrane) là các ống polyetylen siêu mảnh, thành ống chứa hàng triệu lỗ lọc kích thước chỉ 0,01–0,1 micromet — nhỏ hơn vi khuẩn hàng chục đến hàng trăm lần. Nước đi xuyên qua thành ống, còn vi khuẩn, tảo, rỉ sét và tạp chất bị giữ lại bên ngoài.",
          "Công nghệ này được Mitsubishi Rayon (nay thuộc Mitsubishi Chemical) phát triển từ những năm 1970, ban đầu cho xử lý nước công nghiệp và y tế, sau đó thu nhỏ vào các máy lọc gia đình Cleansui. Cấu trúc bó sợi cho diện tích lọc gấp khoảng 4 lần màng phẳng cùng kích thước, nên máy nhỏ gọn lắp tại vòi vẫn đạt lưu lượng khoảng 3 lít/phút — dùng trực tiếp không cần bình chứa.",
        ],
      },
      {
        heading: "4 lớp lọc trong một lõi Cleansui",
        list: [
          "Lớp vải lưới không dệt: giữ cặn bẩn, tạp chất thô.",
          "Sợi trao đổi ion: xử lý chì hòa tan và một số kim loại nặng.",
          "Than hoạt tính: khử clo dư (nguyên nhân mùi hắc của nước máy), cải thiện mùi vị.",
          "Màng sợi rỗng 0,01 micron: chặn vi khuẩn, độ đục — lớp \"gác cổng\" cuối cùng.",
        ],
      },
      {
        heading: "Điểm khác biệt so với lọc RO",
        paragraphs: [
          "Máy RO dùng màng thẩm thấu ngược loại bỏ gần như mọi thứ hòa tan trong nước — kể cả khoáng chất có lợi — và cần điện, có nước thải. Màng sợi rỗng Cleansui hoạt động bằng áp lực nước máy sẵn có: không dùng điện, không nước thải, và giữ lại khoáng chất tự nhiên (Na⁺, K⁺, Ca²⁺, Mg²⁺) nên nước sau lọc có vị ngon tự nhiên.",
          "Lưu ý trung thực: màng sợi rỗng phù hợp với nước máy đô thị đã qua xử lý (như TPHCM). Nếu nguồn nước nhà bạn là giếng khoan nhiễm mặn, nhiễm phèn nặng hoặc kim loại nặng vượt chuẩn, cần giải pháp xử lý chuyên biệt trước — hãy mô tả nguồn nước khi liên hệ để DigiSmart tư vấn đúng, thay vì bán máy không phù hợp.",
        ],
      },
    ],
    sources: [
      {
        label: "Mitsubishi Cleansui Việt Nam — Công nghệ lọc",
        url: "https://mitsubishicleansui.vn/cong-nghe-loc/",
      },
    ],
    relatedCategory: "/may-loc-nuoc",
  },
  {
    slug: "bao-lau-thay-loi-loc-nuoc-dau-hieu-nhan-biet",
    title: "Bao lâu phải thay lõi lọc nước? 4 dấu hiệu lõi đã quá hạn",
    excerpt:
      "Lõi lọc hết hạn không chỉ hết tác dụng mà còn có thể thành ổ vi khuẩn. Chu kỳ thay lõi cho máy Cleansui, bộ lọc Kitz và cách nhận biết sớm.",
    category: "Máy lọc nước",
    date: "2026-07-05",
    readMinutes: 4,
    sections: [
      {
        heading: "Vì sao lõi lọc có \"hạn dùng\"?",
        paragraphs: [
          "Lõi lọc giữ lại tạp chất — nghĩa là chất bẩn tích tụ dần bên trong lõi theo thời gian. Khi vượt ngưỡng, hai điều xảy ra: khả năng lọc giảm (nước chảy yếu, chất bẩn lọt qua) và chính lõi trở thành môi trường cho vi khuẩn phát triển. Dùng lõi quá hạn có thể tệ hơn không lọc.",
        ],
      },
      {
        heading: "Chu kỳ thay lõi tham khảo",
        list: [
          "Máy lọc tại vòi Cleansui (EU/MP series): tùy model, lõi lọc được khoảng vài trăm đến vài nghìn lít — ví dụ lõi dòng cao cấp đạt khoảng 8.000 lít tương đương ~12 tháng dùng liên tục theo công bố của hãng. Xem đúng con số của model bạn dùng trong trang sản phẩm hoặc sách hướng dẫn.",
          "Bộ lọc thô/lọc tổng Kitz Micro Filter: lõi sơ cấp xử lý toàn bộ nước đầu nguồn nên chu kỳ phụ thuộc mạnh vào chất lượng nước khu vực — kiểm tra trực quan định kỳ 3–6 tháng.",
          "Nguyên tắc chung: nước bẩn hơn = thay sớm hơn hạn ghi trên hộp. Hạn của nhà sản xuất tính trên điều kiện nước tiêu chuẩn.",
        ],
      },
      {
        heading: "4 dấu hiệu lõi cần thay ngay",
        list: [
          "Nước chảy yếu hẳn so với lúc mới lắp (lõi tắc do đầy cặn).",
          "Nước có mùi hoặc vị lạ trở lại (than hoạt tính đã bão hòa).",
          "Nước có màu hoặc vẩn đục nhìn thấy được.",
          "Đã quá hạn theo số lít/số tháng của hãng — kể cả khi nước \"nhìn vẫn ổn\".",
        ],
        paragraphs: [
          "Mẹo nhỏ: ghi ngày lắp lõi lên thân máy bằng bút lông. Khách mua máy lọc tại DigiSmart được hướng dẫn chu kỳ thay lõi đúng model ngay khi lắp đặt, và có thể gọi 0778 886 758 đặt lõi thay chính hãng.",
        ],
      },
    ],
    sources: [
      {
        label: "Mitsubishi Cleansui Việt Nam — thông tin sản phẩm & lõi lọc",
        url: "https://mitsubishicleansui.vn/",
      },
      {
        label: "Kitz Micro Filter Việt Nam",
        url: "https://kitzmf.vn/",
      },
    ],
    relatedCategory: "/may-loc-nuoc",
  },
  {
    slug: "may-loc-nuoc-tai-voi-hay-bo-loc-tong",
    title: "Máy lọc tại vòi hay bộ lọc tổng đầu nguồn — nhà bạn cần loại nào?",
    excerpt:
      "Một loại lọc nước uống ngay tại vòi, một loại bảo vệ cả đường ống trong nhà. Hiểu đúng vai trò của từng loại để không mua thừa cũng không mua thiếu.",
    category: "Máy lọc nước",
    date: "2026-07-05",
    readMinutes: 4,
    sections: [
      {
        heading: "Hai vị trí lọc, hai nhiệm vụ khác nhau",
        paragraphs: [
          "Bộ lọc tổng (lọc thô đầu nguồn) lắp ngay sau đồng hồ nước, xử lý toàn bộ nước vào nhà: giữ cặn bẩn, rỉ sét, bùn đất từ đường ống. Nhiệm vụ của nó là bảo vệ — cho thiết bị (máy giặt, bình nóng lạnh, vòi sen) và cho da khi tắm rửa. Nước qua lọc tổng sạch hơn nhưng chưa nhằm mục đích uống trực tiếp.",
          "Máy lọc tại vòi (như Cleansui) lắp ở vòi bếp, lọc tinh đến 0,01 micron ngay trước khi nước vào ly — chặn vi khuẩn, khử clo, giữ khoáng. Đây mới là lớp lọc cho nước uống và nấu ăn.",
        ],
      },
      {
        heading: "Chọn theo tình huống thực tế",
        list: [
          "Chung cư/nhà phố nước máy ổn định, chủ yếu cần nước uống ngon: máy lọc tại vòi Cleansui là đủ — lắp 15 phút, không cần điện.",
          "Nhà hay gặp nước đục sau mưa, đường ống cũ, thiết bị đóng cặn nhanh: nên có bộ lọc tổng Kitz Micro Filter trước, bảo vệ cả hệ thống.",
          "Muốn trọn vẹn: lọc tổng đầu nguồn + lọc tinh tại vòi — mô hình phổ biến ở Nhật, hai lớp bổ trợ nhau, lõi vòi cũng bền hơn vì nước vào đã bớt cặn thô.",
        ],
      },
      {
        heading: "Cần xem thực tế nhà bạn?",
        paragraphs: [
          "Cách lắp và cỡ bộ lọc tổng phụ thuộc đường ống từng nhà. DigiSmart khảo sát và lắp đặt tận nơi tại TPHCM — đặt lịch qua giỏ hàng trên web hoặc gọi 0778 886 758, nhân viên kỹ thuật sẽ tư vấn cấu hình phù hợp trước khi bạn quyết định.",
        ],
      },
    ],
    sources: [
      {
        label: "Mitsubishi Cleansui Việt Nam",
        url: "https://mitsubishicleansui.vn/",
      },
      {
        label: "Kitz Micro Filter Việt Nam",
        url: "https://kitzmf.vn/",
      },
    ],
    relatedCategory: "/may-loc-nuoc",
  },
];
