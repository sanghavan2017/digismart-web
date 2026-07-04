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
