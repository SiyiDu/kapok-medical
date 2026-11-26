import NextLink from "next/link";
import { footerNav, site, whatsappUrl } from "@/site.config";
import { LogoMark } from "./Logo";
import { Container } from "./ui";

const legal = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/disclaimer", label: "Disclaimer" },
];

/* Contact has a column of its own. */
const explore = footerNav.filter((l) => l.href !== "/contact");

const linkClass = "link-line text-ivory/85";

/* On phones each link is a 44px row; the hairline stays tight under the words. */
const rowClass = "group inline-block py-2.5 md:py-0";

export function Footer() {
  const contact = [
    { href: `mailto:${site.email}`, label: site.email },
    ...(whatsappUrl ? [{ href: whatsappUrl, label: "WhatsApp" }] : []),
    ...(site.tiktok ? [{ href: site.tiktok, label: "TikTok" }] : []),
  ];

  return (
    <footer className="overflow-hidden border-t border-ivory/15 bg-ink text-ivory">
      <Container className="pt-20 sm:pt-28">
        <div className="grid gap-x-12 gap-y-12 md:grid-cols-12">
          <div className="flex flex-col items-start gap-6 md:col-span-5">
            <LogoMark className="size-6 text-kapok" />
            {/* Colophon: true of the kapok tree. Rewrite or remove it if the placeholder name changes. */}
            <p className="display max-w-md text-3xl leading-[1.15] tracking-[-0.012em] text-balance lg:text-4xl">
              <em>Kapok</em>{" "}
              <span lang="zh-Hans" className="zh -me-[0.2em] text-[0.5em] tracking-[0.2em] text-ivory/60">
                木棉
              </span>{" "}
              is the city flower of Guangzhou, in bloom each spring.
            </p>
            <p className="max-w-xs text-ivory/65">Independent support for international patients in {site.regionProse}.</p>
          </div>
          <nav aria-label="Footer" className="md:col-span-3 md:col-start-6 lg:col-start-7">
            <p className="eyebrow text-ivory/50">Explore</p>
            <ul className="mt-2.5 grid grid-cols-2 gap-x-6 md:mt-5 md:flex md:flex-col md:gap-3">
              {explore.map((l) => (
                <li key={l.href}>
                  <NextLink href={l.href} className={rowClass}>
                    <span className={linkClass}>{l.label}</span>
                  </NextLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4 lg:col-span-3">
            <p className="eyebrow text-ivory/50">Contact</p>
            <ul className="mt-2.5 flex flex-col md:mt-5 md:gap-3">
              {contact.map((l) => (
                <li key={l.href} className="[overflow-wrap:anywhere]">
                  <a href={l.href} className={rowClass} rel="noopener noreferrer">
                    <span className={linkClass}>{l.label}</span>
                  </a>
                </li>
              ))}
              <li>
                <NextLink href="/contact" className={rowClass}>
                  <span className={linkClass}>Start an Inquiry</span>
                </NextLink>
              </li>
            </ul>
            <p className="mt-2.5 text-sm text-ivory/50 md:mt-5">We reply within {site.replyTime}.</p>
          </div>
        </div>

        {/*
          The name, very large and very quiet: set to the full measure and cropped by the hairline below.
          41.58cqw is a hair under 100 / 2.403, the ink width of the name in em as it is rendered (Cormorant 400
          at -0.022em, measured to the arm of the k: its foot is wider, but falls below the cut); retune that one
          number if the name changes. The margins take off the K's side bearing and put the cut just above the
          baseline, and the padding keeps the k's ascender inside the clip.
        */}
        <div aria-hidden="true" className="@container mt-16 overflow-hidden">
          <p className="display pointer-events-none -mb-[0.14em] -ml-[0.032em] pt-[0.03em] text-[length:41.58cqw] leading-[0.8] whitespace-nowrap text-ivory/[0.07] select-none">
            {site.name}
          </p>
        </div>
      </Container>
      <div className="border-t border-ivory/15">
        <Container className="flex flex-col pt-6 pb-2.5 text-xs text-ivory/55 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-2.5">
          {/* The emergency sentence stays whole when the line has to break. */}
          <p>
            © {new Date().getFullYear()} {site.fullName}. Not a medical provider.{" "}
            <span className="inline-block">In an emergency in mainland China, call 120.</span>
          </p>
          <ul className="flex shrink-0 gap-6">
            {legal.map((l) => (
              <li key={l.href}>
                <NextLink href={l.href} className="group inline-block py-3.5">
                  <span className="link-line">{l.label}</span>
                </NextLink>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
