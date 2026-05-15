import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export const metadata: Metadata = {
  title: "Digismart — Thiết bị gia dụng chất lượng cao",
  description: "Nhà phân phối chính thức BBG Unimax Vina. Thiết bị diệt côn trùng, quạt, thiết bị nhà bếp chất lượng cao.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
