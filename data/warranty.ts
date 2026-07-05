export type WarrantyPolicy = {
  brand: string;
  // Câu ngắn gọn, chính xác — dùng nguyên văn trong system prompt chatbot, không diễn giải thêm
  chatbotSummary: string;
  // Chi tiết đầy đủ cho trang chính sách bảo hành
  details: string[];
  note?: string;
  sourceLabel: string;
  sourceUrl: string;
};

// Nguồn: tra cứu trực tiếp từ trang chính sách bảo hành chính hãng mỗi hãng, 05/07/2026.
// Khi cập nhật, luôn đối chiếu lại URL nguồn — không suy diễn hoặc áp dụng chính sách của hãng này cho hãng khác.
export const warrantyPolicies: WarrantyPolicy[] = [
  {
    brand: "Cleansui",
    chatbotSummary:
      "Cleansui: vòi lọc dòng CM (EU301/EU201/EU202/EU101/EU103) bảo hành 5 năm; thân máy/bo mạch bảo hành 2 năm; lõi lọc đổi mới trong 6 tháng nếu lỗi kỹ thuật từ nhà sản xuất.",
    details: [
      "Vòi lọc dòng CM (EU301, EU201, EU202, EU101, EU103): bảo hành 5 năm",
      "Thân máy / bo mạch: bảo hành 2 năm",
      "Lõi lọc: đổi mới trong 6 tháng nếu có lỗi kỹ thuật từ nhà sản xuất",
    ],
    sourceLabel: "Mitsubishi Cleansui Việt Nam",
    sourceUrl: "https://mitsubishicleansui.vn/",
  },
  {
    brand: "Kitz",
    chatbotSummary: "Kitz Micro Filter: thiết bị bảo hành 24 tháng; lõi lọc bảo hành 12 tháng.",
    details: [
      "Thiết bị: bảo hành 24 tháng",
      "Lõi lọc: bảo hành 12 tháng",
    ],
    sourceLabel: "Kitz Micro Filter Việt Nam",
    sourceUrl: "https://kitzmf.vn/",
  },
  {
    brand: "Mitsubishi Electric",
    chatbotSummary:
      "Mitsubishi Electric (điều hòa): thân máy bảo hành 24 tháng kể từ ngày mua; riêng máy nén (block) bảo hành 60 tháng (5 năm).",
    details: [
      "Thân máy / linh kiện: bảo hành 24 tháng kể từ ngày mua hàng",
      "Máy nén (block/compressor): bảo hành 60 tháng (5 năm) kể từ ngày mua hàng",
      "Không áp dụng nếu: hư hỏng do rơi vỡ, va đập, cháy nổ, thiên tai, lắp đặt/sửa chữa sai kỹ thuật hoặc không đúng hướng dẫn sử dụng",
    ],
    sourceLabel: "Mitsubishi Electric Việt Nam — Chính sách bảo hành",
    sourceUrl: "https://ewarranty.mitsubishi-electric.vn/Home/WarrantyPolicy",
  },
  {
    brand: "Daikin",
    chatbotSummary:
      "Daikin (điều hòa): bảo hành cơ bản 12 tháng cho thân máy/linh kiện kể từ ngày lắp đặt, riêng máy nén (block) bảo hành 60 tháng (5 năm). Một số dòng treo tường (FTKY, FTKF, FTKB, FTF, FTHF, FTHB...) đang có chương trình bảo hành mở rộng thêm 1 năm (tổng 3 năm) nếu khách tự đăng ký qua app Daikin Vietnam trong 12 tháng đầu — DigiSmart hỗ trợ hướng dẫn đăng ký khi lắp đặt, không tự động áp dụng cho mọi model.",
    details: [
      "Thân máy / linh kiện: bảo hành 12 tháng kể từ ngày lắp đặt (hoặc từ ngày mua hàng trên hoá đơn nếu không có ngày lắp đặt)",
      "Máy nén (block/compressor): bảo hành 60 tháng (5 năm) kể từ cùng mốc thời gian trên",
      "Chương trình mở rộng bảo hành lên 3 năm (áp dụng từ 01/03/2026): dành cho một số dòng điều hòa treo tường sản xuất tại nhà máy Daikin Việt Nam (FTKY, FTKF, FTKB, FTF, ATKF, ATF, FTHF, ATHF, FTHB, ATKB); khách cần tự đăng ký qua app Daikin Vietnam trong vòng 12 tháng kể từ ngày kích hoạt bảo hành",
      "Không áp dụng nếu: dùng phụ tùng không chính hãng, sửa chữa không phải bởi kỹ thuật viên Trung tâm Dịch vụ Daikin, thiên tai, lũ lụt, hoả hoạn, côn trùng xâm nhập",
    ],
    note: "Danh sách dòng máy được hưởng chương trình 3 năm có thể thay đổi theo thông báo mới của Daikin — DigiSmart xác nhận lại tình trạng cụ thể của model khi tư vấn/lắp đặt.",
    sourceLabel: "Daikin Việt Nam — Chính sách bảo hành",
    sourceUrl: "https://www.daikin.com.vn/dich-vu/dich-vu-dan-dung/chinh-sach-bao-hanh",
  },
];
