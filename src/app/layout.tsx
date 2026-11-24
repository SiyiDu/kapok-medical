import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/site.config";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const description = `Independent, English-speaking help for international patients in ${site.regionLong}: hospital appointments, airport pickup and in-person support, for one flat fee.`;

// Lives in /public and is resolved against `site.url`, so it also works when the site is served from a sub-path.
const shareImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: `${site.fullName}: hospital appointments in China for international patients`,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} | Hospital appointments in China for international patients`,
    template: `%s | ${site.fullName}`,
  },
  description,
  openGraph: {
    type: "website",
    siteName: site.fullName,
    locale: "en",
    description,
    images: [shareImage],
  },
  twitter: { card: "summary_large_image", images: [shareImage] },
  robots: site.indexable ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f7f0e3",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.fullName,
  url: site.url,
  email: site.email,
  description,
  areaServed: ["Shenzhen", "Guangzhou"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`light ${geist.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
