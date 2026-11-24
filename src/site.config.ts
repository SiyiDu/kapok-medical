/**
 * Everything brand- or business-specific lives here.
 * Values marked PLACEHOLDER must be replaced before the site goes live.
 */

type SiteConfig = {
  name: string;
  descriptor: string;
  fullName: string;
  url: string;
  email: string;
  whatsapp: string;
  tiktok: string;
  baseCity: string;
  region: string;
  regionLong: string;
  feeLabel: string;
  replyTime: string;
  formEndpoint: string;
  indexable: boolean;
  legalEntity: string;
  lastUpdated: string;
};

export const site: SiteConfig = {
  // PLACEHOLDER brand. Check the name and domain are free before using it.
  name: "Kapok",
  descriptor: "Medical Concierge",
  fullName: "Kapok Medical Concierge",

  // The site's public address, no trailing slash. Used for canonical URLs, the sitemap and the share image.
  // The GitHub Pages workflow fills this in at build time. Replace the fallback once you have a domain.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com",

  // Keep this false while the brand, email and other placeholders are still here:
  // every page then asks search engines not to index it. Set it to true for the real launch.
  indexable: false,

  // PLACEHOLDER. Inquiries are sent here.
  email: "hello@example.com",

  // Digits only, with country code (e.g. "8613800000000"). Leave empty to hide WhatsApp buttons.
  whatsapp: "",

  // Full profile URL. Leave empty to hide.
  tiktok: "",

  // Where the team is and where it works.
  baseCity: "Shenzhen",
  region: "Shenzhen & Guangzhou",
  regionLong: "Shenzhen, Guangzhou and the wider Greater Bay Area",

  // Shown wherever the coordination fee is mentioned.
  feeLabel: "under US$100",

  // How quickly inquiries are answered. Only promise what you can keep.
  replyTime: "two business days",

  // Optional form backend (Formspree, Web3Forms, your own API). It receives a JSON POST.
  // Leave empty and the form opens the visitor's email app with the message filled in.
  formEndpoint: "",

  // PLACEHOLDER. Registered business name for the legal pages. Empty shows a bracketed note.
  legalEntity: "",

  lastUpdated: "24 November 2026",
};

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/hospitals", label: "Hospitals" },
  { href: "/faq", label: "FAQ" },
];

export const footerNav = [...nav, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }];

export const whatsappUrl = site.whatsapp ? `https://wa.me/${site.whatsapp}` : "";

export const legalName = site.legalEntity || `[registered business name of ${site.fullName}]`;
