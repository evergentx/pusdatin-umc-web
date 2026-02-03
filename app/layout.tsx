import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const aspekta = localFont({
  src: [
    {
      path: "../font/Aspekta-400-UM06k1s8.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font/Aspekta-500-B69WzXln.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../font/Aspekta-600-DjfkJVWL.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s | Pusdatin UMC",
    default: "Pusdatin - Universitas Muhammadiyah Cirebon",
  },
  description:
    "Pusat Data dan Teknologi Informasi Universitas Muhammadiyah Cirebon. Layanan sistem informasi, jaringan, dan infrastruktur IT kampus.",
  keywords: [
    "Pusdatin",
    "UMC",
    "Universitas Muhammadiyah Cirebon",
    "Helpdesk",
    "Sistem Informasi",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  icons: {
    icon: "/favicon.ico",
    apple: "/logo-umc.png",
  },
  openGraph: {
    title: "Pusdatin UMC",
    description: "Pusat Data dan Teknologi Informasi Universitas Muhammadiyah Cirebon",
    url: "https://pusdatin.umc.ac.id",
    siteName: "Pusdatin UMC",
    images: [
      {
        url: "/kampus-umc.webp",
        width: 1200,
        height: 630,
        alt: "Kampus UMC",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${aspekta.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <NextTopLoader
          color="#E30613"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #E30613,0 0 5px #E30613"
        />
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
