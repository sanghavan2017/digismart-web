// Cấu hình danh mục cho nhánh "Cửa hàng" (route /cua-hang/[category]).
// Khác với `categories` trong data/products.ts (dùng cho filter /san-pham và Footer,
// gồm cả Điều hòa) — danh sách này CHỈ chứa danh mục thuộc nhánh Cửa hàng (mua ngay,
// không qua flow khảo sát/lắp đặt). Điều hòa không có ở đây vì thuộc nhánh Dịch vụ.
// Thêm thương hiệu/nhóm sản phẩm mới vào Cửa hàng sau này: thêm 1 object vào đây,
// không cần đổi route (xem specs/002-url-cua-hang-dich-vu/research.md R4).
export type StoreCategory = {
  slug: string;
  label: string;
  productCategory: string;
  description: string;
};

export const storeCategories: StoreCategory[] = [
  {
    slug: "may-loc-nuoc",
    label: "Máy lọc nước",
    productCategory: "Máy lọc nước",
    description: "Cleansui (Mitsubishi Chemical), Kitz Micro Filter — công nghệ Nhật Bản, giữ khoáng tự nhiên.",
  },
];

export function getStoreCategory(slug: string): StoreCategory | undefined {
  return storeCategories.find(c => c.slug === slug);
}
