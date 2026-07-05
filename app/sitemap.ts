import { MetadataRoute } from "next";
import { products } from "@/data/products";

const BASE_URL = "https://www.digismartvn.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: `${BASE_URL}/`, priority: 1 },
    { url: `${BASE_URL}/san-pham`, priority: 0.9 },
    { url: `${BASE_URL}/may-loc-nuoc`, priority: 0.9 },
    { url: `${BASE_URL}/dieu-hoa`, priority: 0.9 },
    { url: `${BASE_URL}/kien-thuc`, priority: 0.7 },
    { url: `${BASE_URL}/ve-chung-toi`, priority: 0.5 },
    { url: `${BASE_URL}/lien-he`, priority: 0.5 },
    { url: `${BASE_URL}/chinh-sach-bao-mat`, priority: 0.3 },
    { url: `${BASE_URL}/bao-hanh-dieu-khoan`, priority: 0.3 },
  ].map(p => ({ ...p, lastModified: new Date() }));

  const productPages = products.map(p => ({
    url: `${BASE_URL}/san-pham/${p.id}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
