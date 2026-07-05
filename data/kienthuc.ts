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
  image?: { src: string; alt: string; caption?: string };
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
      "Chọn thiếu công suất thì phòng không bao giờ mát hẳn, chọn dư quá thì vừa tốn tiền vừa ẩm khó chịu. Đây là cách tính đúng, và hậu quả thật của việc chọn sai.",
    category: "Điều hòa",
    date: "2026-07-05",
    readMinutes: 5,
    sections: [
      {
        paragraphs: [
          "Nhiều người đi mua điều hòa chỉ hỏi \"máy này bao nhiêu tiền\" mà quên mất câu hỏi quan trọng hơn: phòng mình bao nhiêu mét vuông thì hợp với máy bao nhiêu BTU? BTU (British Thermal Unit) là đơn vị đo công suất làm lạnh — con số càng lớn, máy càng làm mát được không gian rộng hơn. Chọn sai công suất, dù thiếu hay thừa, đều khiến bạn tốn tiền hơn mức cần thiết về lâu dài.",
        ],
        image: {
          src: "/images/products/mitsubishi-msy-jy25vf.jpg",
          alt: "Điều hòa Mitsubishi Electric MSY-JY 1HP treo tường",
          caption: "Máy 1HP (9.000 BTU) — công suất phổ biến nhất cho phòng ngủ dưới 15m²",
        },
      },
      {
        heading: "Bảng tham khảo nhanh",
        paragraphs: [
          "Theo khuyến nghị của Daikin, phòng dưới 15m² hợp với máy 9.000 BTU (1HP); phòng 16–22m² cần khoảng 12.000 BTU (1.5HP); phòng 22–30m² lên 18.000 BTU (2HP); còn phòng 31–35m² thì cần 22.000–24.000 BTU (2.5HP). Nếu phòng bạn không rơi đúng vào các mốc này, công thức nhanh Daikin đưa ra là: lấy diện tích phòng (m²) nhân với 600, ra số BTU cần thiết — áp dụng cho trần nhà cao khoảng 3m. Ví dụ phòng 20m² thì cần chừng 12.000 BTU.",
        ],
      },
      {
        heading: "Chọn thiếu công suất — máy chạy cực nhọc mà phòng vẫn không mát",
        paragraphs: [
          "Đây là lỗi phổ biến nhất khi cố tiết kiệm tiền mua máy nhỏ hơn nhu cầu thực tế. Máy thiếu công suất phải chạy hết công suất liên tục, gần như không bao giờ được nghỉ, vì nhiệt lượng sinh ra trong phòng luôn lớn hơn khả năng máy hút ra. Hậu quả rõ nhất là buổi trưa nắng gắt, dù bật máy cả tiếng đồng hồ, nhiệt độ phòng vẫn lì lợm không xuống được mức mong muốn.",
          "Về lâu dài, máy chạy full tải liên tục tốn điện hơn hẳn so với một máy đúng công suất chạy nhàn nhã — vì máy nén không bao giờ có cơ hội giảm tải để tiết kiệm điện (đặc biệt phí phạm nếu đó là máy Inverter, vì bạn trả thêm tiền cho công nghệ tiết kiệm điện nhưng nó không phát huy tác dụng). Máy nén cũng xuống cấp nhanh hơn vì không có thời gian nghỉ giữa các chu kỳ, dẫn tới hỏng hóc sớm hơn tuổi thọ thiết kế.",
        ],
      },
      {
        heading: "Chọn dư quá nhiều công suất — mát nhanh nhưng ẩm khó chịu",
        paragraphs: [
          "Ngược lại, nhiều người nghĩ \"mua máy to cho chắc, mát nhanh hơn\" — nhưng dư quá nhiều công suất cũng có cái giá riêng. Máy quá mạnh so với phòng sẽ làm nhiệt độ giảm xuống mức cài đặt rất nhanh, sau đó tắt hẳn hoặc giảm tải mạnh (với máy Inverter) chỉ sau vài phút. Chu kỳ bật/tắt liên tục và ngắn này gọi là \"short cycling\" — mỗi lần khởi động lại là một lần dòng điện tăng vọt, khiến máy nén hao mòn nhanh hơn so với chạy ổn định.",
          "Điều đáng nói hơn là hơi ẩm trong phòng: máy điều hòa hút ẩm dần dần trong lúc làm lạnh, cần thời gian chạy liên tục để làm việc này hiệu quả. Máy quá mạnh tắt/giảm tải quá sớm nên chưa kịp hút hết ẩm, kết quả là phòng đã mát nhưng không khí vẫn ẩm dính, dễ sinh nấm mốc trên tường và đồ nội thất về lâu dài. Đó là lý do một chiếc máy 2HP lắp cho phòng 15m² thường tạo cảm giác \"lạnh mà không dễ chịu\" so với đúng máy 1HP.",
        ],
      },
      {
        heading: "Khi nào nên chọn dư công suất một chút?",
        list: [
          "Phòng hướng Tây, nhiều cửa kính, cách nhiệt kém — nắng chiếu trực tiếp làm tải nhiệt tăng đáng kể so với phòng bình thường cùng diện tích.",
          "Phòng đông người thường xuyên (phòng khách, phòng ăn) — mỗi người có mặt trong phòng cũng là một nguồn tỏa nhiệt.",
          "Phòng có nhiều thiết bị tỏa nhiệt như tủ lạnh, máy tính, bếp — nên cộng thêm khoảng 10–20% công suất so với bảng tham khảo.",
          "Trần nhà cao hơn 3m hoặc tầng áp mái — lúc này nên tính theo thể tích phòng thay vì diện tích: BTU cần thiết ≈ thể tích phòng (m³) nhân 200.",
        ],
      },
      {
        heading: "Áp dụng vào thực tế khi chọn máy tại DigiSmart",
        paragraphs: [
          "Toàn bộ điều hòa Mitsubishi Electric và Daikin tại DigiSmart đều ghi rõ công suất BTU và diện tích phòng phù hợp ngay trong phần thông số của từng máy — bạn chỉ cần đo phòng thực tế rồi lọc theo dải công suất tương ứng là xong. Nếu phòng bạn thuộc dạng \"khó tính\" như hướng nắng gắt hay nhiều cửa kính, cứ gọi thẳng 0778 886 758 để kỹ thuật DigiSmart tư vấn miễn phí trước khi chốt máy — tránh trường hợp mua rồi mới phát hiện chọn sai công suất.",
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
          "Điều hòa thường (non-inverter) chỉ có đúng 2 trạng thái: chạy hết công suất hoặc tắt hẳn. Khi phòng đạt nhiệt độ cài đặt, máy nén tắt phựt; một lúc sau phòng nóng dần lên, máy lại bật lại từ đầu. Mỗi lần khởi động lại như vậy là một lần dòng điện tăng vọt trong tích tắc — tốn điện và cũng là nguyên nhân hao mòn máy nén nhanh hơn.",
          "Điều hòa Inverter giải quyết đúng vấn đề này bằng máy nén biến tần: khi phòng đã đủ mát, máy không tắt hẳn mà chỉ giảm tốc độ xuống mức vừa đủ để giữ nhiệt độ ổn định. Nhờ tránh được chu kỳ bật/tắt liên tục, máy chạy êm hơn và tiêu thụ điện ít hơn hẳn khi dùng trong thời gian dài.",
        ],
        image: {
          src: "/images/products/daikin-ftky25zvmv.png",
          alt: "Điều hòa Daikin FTKY Inverter",
          caption: "Daikin FTKY — dòng Inverter, máy nén biến tần điều chỉnh công suất linh hoạt",
        },
      },
      {
        heading: "Vậy tiết kiệm được bao nhiêu thật sự?",
        paragraphs: [
          "Theo công bố của Daikin và Mitsubishi Electric, công nghệ Inverter giúp tiết kiệm khoảng 30% điện năng so với máy thường khi chạy trong thời gian dài; một số dòng có thêm chế độ tiết kiệm riêng (Econo, Econo Cool) còn tiết kiệm hơn nữa. Nhưng con số này không cố định — nó phụ thuộc rất nhiều vào việc bạn dùng máy bao nhiêu tiếng mỗi ngày và cài nhiệt độ bao nhiêu độ, nên đừng kỳ vọng một con số phần trăm chính xác cho mọi trường hợp.",
        ],
      },
      {
        heading: "Vậy khi nào Inverter thật sự đáng tiền?",
        paragraphs: [
          "Nếu nhà bạn dùng điều hòa từ 6–8 tiếng mỗi ngày trở lên — kiểu phòng ngủ bật xuyên đêm hoặc văn phòng làm việc cả ngày — thì phần tiền điện tiết kiệm được mỗi tháng sẽ bù lại phần chênh giá máy chỉ sau khoảng 1–2 mùa nóng. Ngoài chuyện tiền điện, Inverter còn chạy ổn định ở tốc độ thấp nên êm hơn hẳn, không có kiểu nhiệt độ dao động lúc lạnh buốt lúc hầm như máy thường.",
          "Ngược lại, nếu phòng khách nhà bạn chỉ bật vài tiếng cuối tuần, hoặc dùng rất ít trong ngày, thì một máy thường như dòng Daikin FTF (dòng tiêu chuẩn giá tốt trong catalog DigiSmart) vẫn làm lạnh tốt và rẻ hơn đáng kể — Inverter trong trường hợp này khó \"hoàn vốn\" vì bạn dùng không đủ lâu để phần tiết kiệm điện bù lại chênh lệch giá máy.",
        ],
      },
      {
        heading: "Một lưu ý quan trọng khi mua",
        paragraphs: [
          "Inverter chỉ phát huy hết lợi thế khi máy đúng công suất với phòng (xem thêm bài chọn BTU theo diện tích ở trên) và được vệ sinh định kỳ. Máy thiếu công suất sẽ luôn phải chạy tốc độ cao gần như liên tục — lúc đó bạn mất luôn lợi thế tiết kiệm điện mà mình đã trả thêm tiền để có. Trong catalog DigiSmart hiện tại, 64/68 máy là Inverter (Mitsubishi Electric dòng MSY/MSZ, Daikin dòng FTKB/FTKF/FTKY/FTKM/FTKZ/FTHB/FTHF/FTXV/FTXM); riêng dòng Daikin FTF là lựa chọn tiêu chuẩn non-inverter phù hợp cho nhu cầu dùng ít.",
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
      "Nhãn năng lượng dán trên điều hòa ghi số sao và chỉ số CSPF. Hiểu đúng 2 thông tin này giúp bạn ước lượng tiền điện trước khi mua, thay vì chỉ nhìn giá bán.",
    category: "Điều hòa",
    date: "2026-07-05",
    readMinutes: 4,
    sections: [
      {
        heading: "CSPF là gì và vì sao nó quan trọng hơn số sao",
        paragraphs: [
          "CSPF (Cooling Seasonal Performance Factor) là chỉ số hiệu suất lạnh toàn mùa: với mỗi 1 kWh điện tiêu thụ, máy tạo ra được bao nhiêu năng lượng làm lạnh, tính trung bình theo cả mùa nóng thay vì chỉ đo ở một điều kiện phòng thí nghiệm cố định. Hiểu đơn giản, CSPF càng cao thì cùng một lượng điện, máy làm lạnh được nhiều hơn — tức là tiết kiệm điện hơn.",
          "Đây cũng chính là chỉ số được dùng trong chương trình dán nhãn năng lượng bắt buộc của Bộ Công Thương cho điều hòa gia dụng tại Việt Nam. Số sao trên nhãn (từ 1 đến 5 sao) thực chất được xếp hạng dựa trên CSPF — máy 5 sao là nhóm hiệu suất cao nhất trong cùng phân khúc công suất.",
        ],
        image: {
          src: "/images/products/daikin-ftxm25xvmv.png",
          alt: "Điều hòa Daikin FTXM Inverter cao cấp",
          caption: "Daikin FTXM — CSPF 7.6, cao nhất trong catalog điều hòa Daikin tại DigiSmart",
        },
      },
      {
        heading: "Đọc nhãn thế nào cho nhanh, không bị rối",
        paragraphs: [
          "Nếu dùng máy nhiều, ưu tiên chọn 4–5 sao; nhãn cũng ghi rõ con số CSPF cụ thể để bạn so sánh chi tiết hơn giữa hai máy cùng số sao. Nhưng lưu ý quan trọng: chỉ nên so sánh CSPF giữa các máy cùng công suất — so một máy 1HP với một máy 2HP là không có ý nghĩa gì, vì bản chất chúng phục vụ nhu cầu khác nhau.",
          "Chênh lệch CSPF tưởng nhỏ nhưng dồn lại theo thời gian sẽ ra một khoản tiền điện không nhỏ. Ví dụ trong catalog DigiSmart, dòng tiêu chuẩn (non-inverter) có CSPF khoảng 3.3, trong khi các dòng Inverter cao cấp như Daikin FTKM/FTKZ đạt CSPF 5.7–6.0 — nghĩa là cùng chạy 1 giờ, máy CSPF cao tạo ra lượng lạnh gần gấp đôi so với máy CSPF thấp trên mỗi số điện tiêu thụ.",
        ],
      },
      {
        heading: "Xem CSPF ở đâu khi chọn máy trên web DigiSmart?",
        paragraphs: [
          "Tất cả điều hòa Daikin tại DigiSmart đều ghi rõ CSPF ngay trong bảng thông số của từng sản phẩm, lấy trực tiếp từ tab thông số kỹ thuật trên Daikin E-Shop. Cách làm đơn giản nhất: mở 2–3 máy cùng công suất bạn đang cân nhắc, so trực tiếp chỉ số này trước khi quyết định — đừng chỉ nhìn giá bán ban đầu mà bỏ qua chi phí điện phải trả suốt vòng đời sử dụng máy.",
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
        heading: "Khác nhau đúng một chức năng: sưởi ấm",
        paragraphs: [
          "Điều hòa 1 chiều chỉ có một việc: làm lạnh. Điều hòa 2 chiều có thêm chế độ bơm nhiệt để sưởi ấm vào những ngày lạnh. Về khả năng làm lạnh, hai loại này hoàn toàn không khác nhau — bạn sẽ không mát hơn chút nào chỉ vì bỏ thêm tiền mua máy 2 chiều, phần chênh lệch giá hoàn toàn nằm ở chức năng sưởi mà thôi.",
        ],
      },
      {
        heading: "Ở TPHCM và miền Nam, 1 chiều là đủ dùng",
        paragraphs: [
          "TPHCM nóng quanh năm, nhiệt độ hiếm khi xuống dưới 20°C, nên chức năng sưởi trên máy 2 chiều gần như không bao giờ được dùng đến trong thực tế. Với đa số gia đình ở miền Nam, chọn máy 1 chiều giúp tiết kiệm một khoản chi phí đầu tư ban đầu mà không mất đi bất kỳ trải nghiệm sử dụng nào.",
          "Máy 2 chiều chỉ thật sự hợp lý khi bạn ở vùng có mùa lạnh rõ rệt như Đà Lạt hay miền Bắc, nhà có người già hoặc trẻ sơ sinh nhạy cảm với những đợt lạnh bất thường trong năm, hoặc đơn giản là bạn muốn phòng xa một chiếc máy dùng được cả khi chuyển ra Bắc sinh sống sau này.",
        ],
      },
      {
        heading: "Các lựa chọn cụ thể trong catalog DigiSmart",
        list: [
          "1 chiều Inverter — phổ biến nhất cho TPHCM: Mitsubishi Electric dòng MSY-JY/JA/GR, MS-JS; Daikin dòng FTKB/FTKF/FTKY/FTKM/FTKZ.",
          "1 chiều có sưởi dịu nhẹ: Daikin FTHB — lai giữa hai loại, thêm chút sưởi nhẹ cho những ngày trở gió se lạnh.",
          "2 chiều đầy đủ: Daikin FTHF/FTXV/FTXM, Mitsubishi Electric MSZ-HT — dành cho ai thật sự có nhu cầu sưởi ấm rõ ràng.",
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
        paragraphs: [
          "Rất nhiều người chỉ nghĩ đến việc vệ sinh điều hòa khi máy đã có mùi hôi hoặc làm lạnh yếu hẳn — nhưng lúc đó bụi bẩn đã tích tụ khá lâu rồi. Máy điều hòa vận hành bằng cách trao đổi nhiệt qua dàn lạnh; khi dàn này phủ đầy bụi, khả năng trao đổi nhiệt giảm, máy phải chạy lâu hơn và tốn điện hơn để đạt cùng một mức nhiệt độ mát như trước.",
        ],
        image: {
          src: "/images/products/mitsubishi-msy-jy25vf-gallery-2.jpg",
          alt: "Dàn lạnh điều hòa Mitsubishi Electric",
          caption: "Dàn lạnh và lưới lọc — nơi bụi bẩn tích tụ nhiều nhất, cần vệ sinh định kỳ",
        },
      },
      {
        heading: "Lịch vệ sinh khuyến nghị",
        paragraphs: [
          "Với lưới lọc dàn lạnh, nếu dùng hằng ngày thì nên tự tháo rửa mỗi 1–2 tháng một lần — công việc này khá đơn giản, chỉ cần rửa nước, phơi khô rồi lắp lại, không cần gọi thợ. Còn với bảo dưỡng tổng thể (cả dàn lạnh, dàn nóng, kiểm tra gas), gia đình dùng thường xuyên nên làm 3–6 tháng một lần; văn phòng hoặc nơi nhiều bụi bặm thì nên rút ngắn xuống 2–3 tháng; và dù dùng ít đến đâu cũng nên bảo dưỡng tối thiểu 1 năm một lần.",
        ],
      },
      {
        heading: "Máy bẩn gây hại thế nào, không chỉ là tốn điện",
        paragraphs: [
          "Ngoài chuyện tốn điện do bụi cản trở trao đổi nhiệt, máy bẩn còn ảnh hưởng trực tiếp đến sức khỏe: bụi và nấm mốc tích tụ trong dàn lạnh bị luồng gió thổi thẳng vào không khí bạn hít thở mỗi ngày, khiến phòng có mùi ẩm mốc và làm lạnh yếu đi rõ rệt. Về lâu dài, máy nén phải hoạt động quá tải kéo dài do dàn lạnh kém hiệu quả cũng chính là nguyên nhân gây ra những hỏng hóc đắt tiền nhất trên điều hòa.",
        ],
      },
      {
        heading: "Dấu hiệu cho thấy máy đang cần vệ sinh ngay",
        list: [
          "Máy chạy nhưng lâu mát hơn hẳn trước đây, dù vẫn cài cùng một mức nhiệt độ.",
          "Có mùi hôi hoặc ẩm mốc ngay khi vừa bật máy.",
          "Dàn lạnh nhỏ giọt nước ra ngoài, hoặc máy phát ra tiếng ồn to bất thường.",
          "Tiền điện tăng rõ rệt dù thói quen sử dụng không hề thay đổi.",
        ],
        paragraphs: [
          "DigiSmart lắp đặt điều hòa tận nơi tại TPHCM và cũng hỗ trợ tư vấn lịch bảo dưỡng phù hợp với môi trường cụ thể nhà bạn — cứ gọi 0778 886 758 hoặc đặt lịch ngay trên web khi cần.",
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
        heading: "TDS thực chất đang đo cái gì?",
        paragraphs: [
          "TDS (Total Dissolved Solids — tổng chất rắn hòa tan) là tổng lượng khoáng chất, muối và ion hòa tan trong nước, tính bằng mg/L hoặc ppm. Chiếc bút đo TDS nhỏ gọn mà nhiều nhà bán không cắm thẳng vào ly nước để \"chứng minh\" máy lọc tốt, thực chất chỉ ước lượng con số này thông qua độ dẫn điện của nước — nước càng nhiều ion hòa tan thì càng dẫn điện tốt, bút đo được và quy đổi ra TDS.",
          "Theo tài liệu của Tổ chức Y tế Thế giới (WHO), TDS trong ngưỡng thông thường chủ yếu ảnh hưởng đến vị của nước chứ không phải là một chỉ số sức khỏe trực tiếp: dưới 300 mg/L được xem là rất ngon, 300–600 mg/L là tốt, 600–900 mg/L ở mức trung bình, 900–1.200 mg/L kém, còn trên 1.200 mg/L thì gần như không uống nổi.",
        ],
        image: {
          src: "/images/products/cleansui-eu201.jpg",
          alt: "Máy lọc nước Cleansui EU201 lắp dưới bồn rửa",
          caption: "Máy lọc nước Cleansui — giữ lại khoáng chất tự nhiên thay vì loại bỏ hoàn toàn TDS",
        },
      },
      {
        heading: "Những điều mà bút TDS không hề nói cho bạn biết",
        paragraphs: [
          "Vấn đề lớn nhất là TDS thấp không đồng nghĩa với nước an toàn: vi khuẩn và virus không hề làm tăng chỉ số TDS, nên một nguồn nước nhiễm khuẩn hoàn toàn có thể cho ra kết quả đo TDS rất đẹp. Bút đo cũng không phân biệt được khoáng chất tốt và chất độc hại — 200 mg/L canxi-magie có lợi cho sức khỏe và 200 mg/L có lẫn kim loại nặng đều hiển thị ra cùng một con số như nhau trên màn hình bút đo. Thậm chí TDS cao chưa chắc đã xấu, vì nước khoáng thiên nhiên vốn có TDS cao do giàu khoáng chất tự nhiên.",
          "Vì những lý do đó, đừng bao giờ dùng bút TDS làm thước đo duy nhất để đánh giá nước có an toàn hay không. Muốn biết chắc nguồn nước nhà mình có đạt chuẩn không, cần nhìn vào các chỉ số vi sinh (Coliform, E.coli), kim loại nặng, clo dư... theo đúng quy chuẩn nước sinh hoạt QCVN 01-1:2018/BYT của Bộ Y tế.",
        ],
      },
      {
        heading: "Lọc nước mà vẫn giữ được khoáng chất tự nhiên",
        paragraphs: [
          "Một số công nghệ lọc như RO loại bỏ gần như mọi chất hòa tan trong nước, khiến TDS sau lọc gần về 0 — sạch nhưng cũng mất luôn khoáng chất có lợi. Ngược lại, công nghệ màng sợi rỗng (hollow fiber) của Mitsubishi Cleansui lọc vi khuẩn và tạp chất đến kích thước 0,01 micron nhưng vẫn giữ lại các khoáng chất tự nhiên như Na⁺, K⁺, Ca²⁺, Mg²⁺ — nước sau lọc vẫn có vị ngon tự nhiên và TDS ở mức phù hợp với nguồn nước ban đầu. Xem chi tiết hơn trong bài viết riêng về công nghệ màng sợi rỗng bên dưới.",
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
        heading: "Màng sợi rỗng thực chất là gì?",
        paragraphs: [
          "Màng sợi rỗng (hollow fiber membrane) là những ống polyetylen siêu mảnh, trên thành ống có hàng triệu lỗ lọc kích thước chỉ 0,01–0,1 micromet — nhỏ hơn vi khuẩn hàng chục đến hàng trăm lần. Nước đi xuyên qua thành ống này, còn vi khuẩn, tảo, rỉ sét và các tạp chất lớn hơn bị giữ lại bên ngoài, không thể lọt qua.",
          "Công nghệ này được Mitsubishi Rayon (nay thuộc Mitsubishi Chemical) phát triển từ những năm 1970, ban đầu dùng cho xử lý nước công nghiệp và y tế, sau đó mới được thu nhỏ lại để đưa vào các máy lọc gia đình Cleansui. Nhờ cấu trúc bó nhiều sợi nhỏ, diện tích lọc thực tế lớn gấp khoảng 4 lần so với một màng phẳng cùng kích thước, nên dù máy nhỏ gọn lắp ngay tại vòi vẫn đạt lưu lượng khoảng 3 lít/phút, dùng uống trực tiếp không cần bình chứa.",
        ],
        image: {
          src: "/images/tech/cau-truc-soi-rong.jpg",
          alt: "Cấu trúc màng lọc sợi rỗng Cleansui phóng to",
          caption: "Cấu trúc màng sợi rỗng — hàng triệu lỗ lọc kích thước 0,01–0,1 micromet trên mỗi sợi",
        },
      },
      {
        heading: "4 lớp lọc gói gọn trong một lõi Cleansui",
        list: [
          "Lớp vải lưới không dệt: giữ lại cặn bẩn và tạp chất thô ngay từ đầu.",
          "Sợi trao đổi ion: xử lý chì hòa tan và một số kim loại nặng còn sót lại.",
          "Than hoạt tính: khử clo dư — chính là nguyên nhân gây mùi hắc quen thuộc của nước máy — đồng thời cải thiện mùi vị chung.",
          "Màng sợi rỗng 0,01 micron: đóng vai trò \"gác cổng\" cuối cùng, chặn vi khuẩn và làm giảm độ đục của nước.",
        ],
      },
      {
        heading: "Khác gì so với lọc RO đang phổ biến?",
        paragraphs: [
          "Máy RO dùng màng thẩm thấu ngược, loại bỏ gần như mọi thứ hòa tan trong nước — kể cả khoáng chất có lợi cho cơ thể — và cần dùng điện, phát sinh nước thải trong quá trình lọc. Màng sợi rỗng của Cleansui thì hoạt động hoàn toàn bằng áp lực nước máy sẵn có: không dùng điện, không có nước thải, đồng thời giữ lại khoáng chất tự nhiên như Na⁺, K⁺, Ca²⁺, Mg²⁺ nên nước sau lọc vẫn giữ được vị ngon tự nhiên chứ không nhạt như nước lọc RO.",
        ],
      },
      {
        heading: "Một lưu ý thật lòng trước khi bạn quyết định",
        paragraphs: [
          "Màng sợi rỗng phù hợp nhất với nguồn nước máy đô thị đã qua xử lý sẵn, như ở TPHCM. Nếu nguồn nước nhà bạn là giếng khoan nhiễm mặn, nhiễm phèn nặng hoặc có kim loại nặng vượt chuẩn, cần có giải pháp xử lý chuyên biệt trước khi dùng máy lọc tại vòi — cứ mô tả rõ tình trạng nguồn nước khi liên hệ, DigiSmart sẽ tư vấn đúng giải pháp, thay vì bán một chiếc máy không phù hợp với nhu cầu thực tế của bạn.",
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
        paragraphs: [
          "Lõi lọc hoạt động bằng cách giữ lại tạp chất trong nước — nghĩa là càng dùng lâu, chất bẩn càng tích tụ dần bên trong lõi theo thời gian, giống như một miếng bọt biển hút bụi vậy. Khi lượng tạp chất này vượt ngưỡng, hai chuyện xấu xảy ra cùng lúc: khả năng lọc giảm hẳn (nước chảy yếu, một số chất bẩn bắt đầu lọt qua được), và bản thân chiếc lõi lúc này lại trở thành môi trường lý tưởng cho vi khuẩn phát triển. Nói không ngoa, dùng lõi đã quá hạn nhiều khi còn tệ hơn là không lọc gì cả.",
        ],
        image: {
          src: "/images/products/cleansui-eu301.jpg",
          alt: "Máy lọc nước tạo ion kiềm Cleansui EU301",
          caption: "Cleansui EU301 — mỗi model có chu kỳ thay lõi riêng, ghi rõ trong thông số sản phẩm",
        },
      },
      {
        heading: "Chu kỳ thay lõi tham khảo cho từng loại",
        paragraphs: [
          "Với máy lọc tại vòi Cleansui (dòng EU/MP), tùy từng model mà lõi lọc được khoảng vài trăm đến vài nghìn lít nước — ví dụ lõi của các dòng cao cấp đạt khoảng 8.000 lít, tương đương chừng 12 tháng sử dụng liên tục theo công bố của hãng. Con số chính xác cho model bạn đang dùng luôn được ghi rõ trong trang sản phẩm hoặc sách hướng dẫn đi kèm máy.",
          "Với bộ lọc thô/lọc tổng Kitz Micro Filter, do lõi sơ cấp phải xử lý toàn bộ nước đầu nguồn nên chu kỳ thay phụ thuộc khá nhiều vào chất lượng nước từng khu vực — cách an toàn nhất là kiểm tra trực quan định kỳ mỗi 3–6 tháng thay vì chỉ dựa vào một con số cố định. Nguyên tắc chung dễ nhớ: nước đầu vào càng bẩn thì nên thay sớm hơn hạn ghi trên hộp, vì hạn sử dụng của nhà sản xuất vốn được tính trên điều kiện nước tiêu chuẩn, không phải nước thực tế nhà bạn.",
        ],
      },
      {
        heading: "4 dấu hiệu cho thấy lõi cần thay ngay, đừng chờ đến hạn",
        list: [
          "Nước chảy yếu hẳn so với lúc mới lắp máy — dấu hiệu lõi đã tắc do đầy cặn bẩn.",
          "Nước bắt đầu có mùi hoặc vị lạ trở lại — nghĩa là lớp than hoạt tính bên trong đã bão hòa, hết khả năng khử mùi.",
          "Nước có màu hoặc vẩn đục có thể nhìn thấy bằng mắt thường.",
          "Đã dùng quá hạn ghi trên hộp (theo số lít hoặc số tháng), kể cả khi nhìn bằng mắt thấy nước \"vẫn ổn\" — vì vi khuẩn tích tụ bên trong lõi thì mắt thường không thấy được.",
        ],
        paragraphs: [
          "Một mẹo nhỏ hữu ích: ghi luôn ngày lắp lõi mới lên thân máy bằng bút lông, để không phải nhớ nhẩm. Khách mua máy lọc tại DigiSmart đều được hướng dẫn đúng chu kỳ thay lõi theo từng model ngay lúc lắp đặt, và có thể gọi 0778 886 758 bất cứ khi nào cần đặt lõi thay chính hãng.",
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
        heading: "Hai vị trí lọc, hai nhiệm vụ hoàn toàn khác nhau",
        paragraphs: [
          "Bộ lọc tổng (hay lọc thô đầu nguồn) được lắp ngay sau đồng hồ nước, xử lý toàn bộ lượng nước chảy vào nhà: giữ lại cặn bẩn, rỉ sét, bùn đất tích tụ trong đường ống. Nhiệm vụ chính của nó là bảo vệ — bảo vệ các thiết bị như máy giặt, bình nóng lạnh, vòi sen khỏi cặn bẩn, và bảo vệ làn da khi tắm rửa hằng ngày. Nước sau khi qua lọc tổng đã sạch hơn nhiều, nhưng chưa hẳn nhắm đến mục đích uống trực tiếp.",
        ],
        image: {
          src: "/images/products/kitz-micro-filter-10inch.jpg",
          alt: "Bộ lọc tổng đầu nguồn Kitz Micro Filter",
          caption: "Bộ lọc tổng — lắp đầu nguồn, bảo vệ toàn bộ đường ống và thiết bị trong nhà",
        },
      },
      {
        paragraphs: [
          "Máy lọc tại vòi như Cleansui thì lắp ngay tại vòi bếp, lọc tinh đến 0,01 micron ngay trước khi nước chảy vào ly uống — chặn vi khuẩn, khử clo, đồng thời giữ lại khoáng chất tự nhiên. Đây mới chính là lớp lọc dành riêng cho nước uống và nấu ăn hằng ngày.",
        ],
        image: {
          src: "/images/products/cleansui-eu201.jpg",
          alt: "Máy lọc nước tại vòi Cleansui EU201",
          caption: "Máy lọc tại vòi — lọc tinh ngay trước khi nước vào ly uống, giữ khoáng chất tự nhiên",
        },
      },
      {
        heading: "Vậy nhà bạn nên chọn loại nào?",
        list: [
          "Chung cư hoặc nhà phố có nước máy ổn định, chủ yếu chỉ cần nước uống ngon: một máy lọc tại vòi Cleansui là đủ — lắp trong 15 phút, không cần dùng điện.",
          "Nhà thường xuyên gặp tình trạng nước đục sau mưa, đường ống cũ, thiết bị hay đóng cặn nhanh: nên đầu tư thêm bộ lọc tổng Kitz Micro Filter trước, để bảo vệ toàn bộ hệ thống trong nhà.",
          "Muốn giải pháp trọn vẹn nhất: kết hợp cả lọc tổng đầu nguồn lẫn lọc tinh tại vòi — đây là mô hình khá phổ biến ở Nhật Bản, hai lớp lọc bổ trợ cho nhau, và lõi lọc tại vòi cũng bền hơn hẳn vì nước vào đã được lọc bớt cặn thô từ trước.",
        ],
      },
      {
        heading: "Cần khảo sát thực tế nhà bạn trước khi quyết định?",
        paragraphs: [
          "Cách lắp đặt và kích cỡ bộ lọc tổng phù hợp phụ thuộc khá nhiều vào tình trạng đường ống của từng nhà, nên khó có một công thức chung cho mọi trường hợp. DigiSmart nhận khảo sát và lắp đặt tận nơi tại TPHCM — bạn có thể đặt lịch qua giỏ hàng trên web hoặc gọi thẳng 0778 886 758, kỹ thuật sẽ tư vấn đúng cấu hình phù hợp trước khi bạn quyết định mua.",
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
