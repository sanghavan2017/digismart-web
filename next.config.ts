import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Redirect vĩnh viễn URL cũ -> URL mới sau khi tách 2 cổng Cửa hàng/Dịch vụ
  // (specs/002-url-cua-hang-dich-vu/). permanent: true => Next.js trả mã 308,
  // tương đương 301 về mặt SEO (Google chuyển toàn bộ ranking signal sang URL mới).
  async redirects() {
    return [
      { source: "/may-loc-nuoc", destination: "/cua-hang/may-loc-nuoc", permanent: true },
      { source: "/may-loc-nuoc/cleansui", destination: "/cua-hang/may-loc-nuoc/cleansui", permanent: true },
      { source: "/dieu-hoa", destination: "/dich-vu/dieu-hoa", permanent: true },
    ];
  },
};

export default nextConfig;
