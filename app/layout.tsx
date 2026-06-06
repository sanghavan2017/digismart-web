import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "DigiSmart — Phụ kiện điện tử chính hãng",
  description: "DigiSmart cung cấp phụ kiện điện tử chính hãng tại Việt Nam. Chuột, bàn phím, tai nghe, SSD, sạc nhanh — bảo hành đầy đủ, giao toàn quốc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full">
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
