import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { site } from "@/site.config";

export const dynamic = "force-static";

const paths = [
  "/",
  "/services/",
  ...services.map((s) => `/services/${s.slug}/`),
  "/how-it-works/",
  "/hospitals/",
  "/faq/",
  "/about/",
  "/contact/",
  "/privacy/",
  "/terms/",
  "/disclaimer/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
