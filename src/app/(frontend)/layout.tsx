import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://indiaisraelcentre.org"
  ),
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.ico", sizes: "any" },
    ],
    apple: "/favicon/apple-touch-icon.png",
    other: [
      { rel: "android-chrome", url: "/favicon/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "android-chrome", url: "/favicon/android-chrome-512x512.png", sizes: "512x512" },
    ],
  },
  title: {
    default: "India Israel Centre",
    template: "%s | India Israel Centre",
  },
  description:
    "The India Israel Centre is an independent forum dedicated to rigorous academic inquiry, substantive policy engagement, and the informed public dissemination of knowledge concerning the bilateral relationship between India and Israel.",
  openGraph: {
    type: "website",
    siteName: "India Israel Centre",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} scroll-smooth`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="aQWNhgRdLx45GPF7CtY3OEL10wHUa6y9Ef1JM3Pwl4Y"
        />
      </head>
      <body className="bg-white text-stone-900 antialiased font-serif selection:bg-iic-saffron/30 selection:text-iic-navy">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-25RRV76HP1" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-25RRV76HP1');`}</Script>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
