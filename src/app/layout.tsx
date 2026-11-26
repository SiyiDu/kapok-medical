import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import type { ReactNode } from "react";
import { preconnect } from "react-dom";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/site.config";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const description = `Independent, English-speaking help for international patients in ${site.regionProse}: hospital appointments, airport pickup and a companion at your visit.`;

// Lives in /public and is resolved against `site.url`, so it also works when the site is served from a sub-path.
const shareImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  // The words set on the picture.
  alt: `${site.fullName}. See a doctor in China, without the guesswork.`,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} | See a Doctor in ${site.region}`,
    template: `%s | ${site.fullName}`,
  },
  description,
  openGraph: {
    type: "website",
    siteName: site.fullName,
    locale: "en_GB",
    // Resolved against each page's own path. With no description here, every page shares its own.
    url: "./",
    images: [shareImage],
  },
  twitter: { card: "summary_large_image", images: [shareImage] },
  robots: site.indexable ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f3eee4",
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
  // Every photograph comes from this one host.
  preconnect("https://images.unsplash.com");

  return (
    <html
      lang="en"
      data-theme="light"
      data-scroll-behavior="smooth"
      className={`light ${geist.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        {/* Drops in just under the bar, on the content edge, clear of the wordmark. */}
        <a
          href="#main"
          className="btn btn-primary sr-only text-[0.8125rem] font-medium tracking-[0.04em] focus:not-sr-only focus:fixed focus:top-[calc(var(--header)+0.75rem)] focus:left-6 focus:z-50 focus:px-6 focus:py-3 sm:focus:left-10 lg:focus:left-[max(3.5rem,calc((100vw-86rem)/2+3.5rem))]"
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
