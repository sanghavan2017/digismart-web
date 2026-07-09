import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geo",
  display: "swap",
});
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ContactWidget from "@/components/ContactWidget";
import { CartProvider } from "@/components/CartContext";

const GA_MEASUREMENT_ID = "G-YNQSD9M50Q";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "DigiSmart",
  legalName: "Hộ Kinh Doanh Digismart",
  url: "https://www.digismartvn.com",
  logo: "https://www.digismartvn.com/images/og-banner.png",
  image: "https://www.digismartvn.com/images/og-banner.png",
  telephone: "+84-778-886-758",
  address: {
    "@type": "PostalAddress",
    streetAddress: "606/145/3C Đường Ba Tháng Hai",
    addressLocality: "Phường Diên Hồng",
    addressRegion: "TP. Hồ Chí Minh",
    addressCountry: "VN",
  },
  openingHours: "Mo-Su 08:00-21:00",
  priceRange: "₫₫",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+84-778-886-758",
    contactType: "customer service",
    areaServed: "VN",
    availableLanguage: "Vietnamese",
  },
};

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
    <html lang="vi" className={`h-full ${notoSansJP.variable}`}>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <CartProvider>
          <Navbar />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
          <Chatbot />
          <ContactWidget />
        </CartProvider>
      </body>
    </html>
  );
}
