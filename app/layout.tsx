import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  variable: "--font-geo",
  display: "swap",
});
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { CartProvider } from "@/components/CartContext";

const GA_MEASUREMENT_ID = "G-YNQSD9M50Q";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.digismartvn.com"),
  title: "DigiSmart — Điều hòa & Máy lọc nước chính hãng",
  description: "DigiSmart cung cấp & lắp đặt Điều hòa, Máy lọc nước chính hãng tại TPHCM. Cleansui, Kitz Micro Filter, Mitsubishi Electric, Daikin — bảo hành đầy đủ.",
  openGraph: {
    type: "website",
    siteName: "DigiSmart",
    locale: "vi_VN",
    title: "DigiSmart — Điều hòa & Máy lọc nước chính hãng",
    description: "Cung cấp & lắp đặt Điều hòa, Máy lọc nước chính hãng tại TPHCM. Cleansui, Kitz, Mitsubishi Electric, Daikin — bảo hành đầy đủ.",
    images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: "DigiSmart — Điều hòa & Máy lọc nước chính hãng" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`h-full ${montserrat.variable}`}>
      <head>
        {/* Đặt trực tiếp trong <head> (không dùng next/script) để Google Search Console xác minh được qua Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
      </head>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <CartProvider>
          <Navbar />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
          <Chatbot />
        </CartProvider>
      </body>
    </html>
  );
}
