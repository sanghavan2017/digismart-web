import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export const metadata: Metadata = {
  title: "DigiSmart — Điều hòa & Máy lọc nước chính hãng",
  description: "DigiSmart cung cấp & lắp đặt Điều hòa, Máy lọc nước chính hãng tại TPHCM. Cleansui, Kitz Micro Filter, Mitsubishi, Daikin — bảo hành đầy đủ.",
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
        <Chatbot />
      </body>
    </html>
  );
}
