import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Hanken_Grotesk, Yellowtail } from "next/font/google";

import "./globals.css";
import { siteConfig } from "@/lib/site";
import { currentOccasion } from "@/lib/occasion";
import { bakerySchema, websiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { OrderProvider } from "@/components/site/order-provider";
import { AnnouncementBar } from "@/components/site/announcement-bar";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-hanken",
  display: "swap",
});

const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-yellowtail",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Maison Legit — Homemade Lapis Legit, Baked by Hand in Jakarta",
    template: "%s · Maison Legit",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "lapis legit",
    "spekkoek",
    "thousand layer cake",
    "kue lapis legit",
    "Indonesian layer cake",
    "homemade lapis legit",
    "lapis legit Jakarta",
    "pre-order lapis legit",
    "lapis legit prune",
    "lapis legit keju",
    "Maison Legit",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "food",
  icons: {
    icon: [
      { url: "/assets/logo/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/logo/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: { url: "/assets/logo/apple-touch-icon.png", sizes: "180x180" },
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: "Maison Legit — Homemade Lapis Legit, Baked by Hand in Jakarta",
    description: siteConfig.description,
    url: "/",
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: "Maison Legit — Homemade Lapis Legit in Jakarta",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: currentOccasion.themeColor,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-occasion={currentOccasion.theme ?? undefined}
      className={`${hanken.variable} ${cormorant.variable} ${yellowtail.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-canvas">
        <OrderProvider>
          <AnnouncementBar />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </OrderProvider>
        <JsonLd data={[bakerySchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
