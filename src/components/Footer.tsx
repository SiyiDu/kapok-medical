import NextLink from "next/link";
import { footerNav, site, whatsappUrl } from "@/site.config";
import { Wordmark } from "./Logo";
import { Ridges } from "./art/Landscape";
import { Container } from "./ui";

const legal = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/disclaimer", label: "Disclaimer" },
];

const linkClass = "text-muted hover:text-foreground";

export function Footer() {
  const external = [
    ...(whatsappUrl ? [{ href: whatsappUrl, label: "WhatsApp" }] : []),
    ...(site.tiktok ? [{ href: site.tiktok, label: "TikTok" }] : []),
  ];

  return (
    <footer className="relative isolate overflow-hidden pt-16 pb-28 sm:pb-36">
      <Ridges
        seed={41}
        colors={["#E6EEDF", "#D3E4D6", "#BCD6C8"]}
        className="art inset-x-0 bottom-0 -z-10 h-24 w-full sm:h-32"
      />
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Wordmark />
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {footerNav.map((l) => (
                <li key={l.href}>
                  <NextLink href={l.href} className={linkClass}>
                    {l.label}
                  </NextLink>
                </li>
              ))}
              {external.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkClass} target="_blank" rel="noopener noreferrer">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-col gap-3 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.fullName}. Not a medical provider. In an emergency in mainland China,
            call 120.
          </p>
          <ul className="flex shrink-0 gap-4">
            {legal.map((l) => (
              <li key={l.href}>
                <NextLink href={l.href} className="hover:text-foreground">
                  {l.label}
                </NextLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
