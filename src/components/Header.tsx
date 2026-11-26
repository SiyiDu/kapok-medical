"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { type CSSProperties, useLayoutEffect, useState } from "react";
import { Button, Drawer } from "@heroui/react";
import { nav, site } from "@/site.config";
import { Wordmark } from "./Logo";
import { ButtonLink, cx } from "./ui";

/** Pages whose first section is a dark photograph the header should sit on top of. */
const DARK_TOPS = ["/"];

/** Up to this scroll offset the page counts as being at its top. */
const TOP = 24;

/** The phone menu lists what the bar has no room for. Contact is its closing button. */
const menu = [...nav, { href: "/about", label: "About" }];

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

function usePath() {
  return (usePathname() || "/").replace(/\/$/, "") || "/";
}

/**
 * Fixed header. Over a dark hero it is transparent with light text;
 * once the page scrolls, or on any other page, it is a sheet of paper with a hairline.
 * It steps aside while the page is read downwards and returns on the first scroll up.
 */
export function Header() {
  const path = usePath();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // A layout effect: the first reading lands in the same frame that takes the bar's state over from the stylesheet.
  useLayoutEffect(() => {
    document.documentElement.dataset.hydrated = "";
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > TOP);
      // Away on the way down, back on the way up, always there at the top.
      // Past the top, jitter and the bounce at the page end change nothing.
      const end = document.documentElement.scrollHeight - window.innerHeight;
      if (y > TOP && last > TOP && (y >= end || Math.abs(y - last) <= 8)) return;
      setHidden(y > TOP && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onPhoto = DARK_TOPS.includes(path);
  const overPhoto = onPhoto && !scrolled;
  const away = hidden && !menuOpen;
  const isActive = (href: string) => path === href || path.startsWith(`${href}/`);
  const onContact = isActive("/contact");
  const close = () => setMenuOpen(false);

  return (
    <header
      data-over-photo={onPhoto ? "" : undefined}
      className={cx(
        "fixed inset-x-0 top-0 z-40 border-b transition-[translate,background-color,color,border-color] duration-500 motion-reduce:transition-none",
        overPhoto ? "border-transparent text-ivory" : "border-line bg-ivory text-ink",
        // Never away while the keyboard is inside it. The colours hold until the bar has left:
        // it goes as it was and comes back as paper.
        away &&
          "motion-safe:not-has-[:focus-visible]:-translate-y-full motion-safe:[--hold:0.5s] motion-safe:[transition-delay:0s,var(--hold),var(--hold),var(--hold)]",
      )}
    >
      <div className="mx-auto flex h-18 w-full max-w-[86rem] items-center justify-between gap-8 px-6 sm:px-10 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-4 lg:gap-8 lg:px-14">
        <NextLink
          href="/"
          aria-label={`${site.fullName}, home`}
          className="-my-2 flex items-center py-2 md:justify-self-start"
        >
          <Wordmark />
        </NextLink>

        <nav aria-label="Main" className="hidden items-center gap-6 md:flex lg:gap-9">
          {nav.map((item) => (
            <NextLink
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              // The top padding balances the room .link-line keeps under the words, so they sit on the bar's centre line.
              className="link-line pt-1 text-[0.8125rem] tracking-[0.04em] whitespace-nowrap"
            >
              {item.label}
            </NextLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:justify-self-end">
          {/* Phones have no room for the button; the padding makes the words a full-size target. */}
          <NextLink
            href="/contact"
            aria-current={onContact ? "page" : undefined}
            className="group -my-3 mr-1 py-3 text-[0.8125rem] tracking-[0.04em] sm:hidden"
          >
            <span className="link-under">Inquire</span>
          </NextLink>
          <NextLink
            href="/contact"
            aria-current={onContact ? "page" : undefined}
            className={cx(
              "btn btn-header hidden h-10 items-center px-5 text-[0.8125rem] font-medium tracking-[0.04em] whitespace-nowrap sm:inline-flex",
              !overPhoto && "on-paper",
            )}
          >
            Start an Inquiry
          </NextLink>
          {/* Pulled into the gutter so the icon, not its 44px target, ends on the content edge. */}
          <div className="-mr-2.5 md:hidden">
            <Button
              isIconOnly
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              variant="ghost"
              className="size-11 rounded-none bg-transparent text-current"
              onPress={() => setMenuOpen(true)}
            >
              <span aria-hidden="true" className="flex w-6 flex-col gap-[7px]">
                <span className="h-px bg-current" />
                <span className="h-px bg-current" />
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* The phone menu: a full sheet of paper. Its logo and its cross sit exactly where the bar's logo and icon were. */}
      <Drawer.Backdrop variant="transparent" isOpen={menuOpen} onOpenChange={setMenuOpen}>
        <Drawer.Content placement="right" className="[--drawer-enter-duration:600ms] [--drawer-enter-ease:var(--ease)]">
          <Drawer.Dialog className="w-full max-w-none bg-ivory px-6 pt-0 pb-6 shadow-none sm:px-10">
            <Drawer.CloseTrigger
              aria-label="Close menu"
              className="end-3.5 top-3.5 size-11 rounded-none bg-transparent text-ink sm:end-7.5"
            >
              <span aria-hidden="true" className="relative block size-6">
                <span className="absolute inset-x-0 top-1/2 h-px rotate-45 bg-current" />
                <span className="absolute inset-x-0 top-1/2 h-px -rotate-45 bg-current" />
              </span>
            </Drawer.CloseTrigger>
            <Drawer.Header className="h-18 shrink-0 flex-row items-center">
              <Drawer.Heading className="sr-only">Menu</Drawer.Heading>
              <NextLink href="/" onClick={close} aria-label={`${site.fullName}, home`}>
                <Wordmark />
              </NextLink>
            </Drawer.Header>
            {/* The list takes only its own height, so the bare paper under it belongs to the sheet and can be swiped. */}
            <Drawer.Body className="mt-0 flex-initial pt-0">
              {/* On a phone held sideways the five lines stand in two columns and draw closer, so none is cut off. */}
              <nav
                aria-label="Main"
                className="grid border-t border-line short:min-[30rem]:grid-cols-2 short:min-[30rem]:gap-x-10"
              >
                {menu.map((item, i) => (
                  <NextLink
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    style={delay(i)}
                    className="enter display border-b border-line py-[clamp(0.375rem,2.2svh,1.25rem)] text-[clamp(2rem,5.6svh,2.75rem)] leading-[1.1] tracking-[-0.016em] text-foreground aria-[current=page]:italic"
                  >
                    {item.label}
                  </NextLink>
                ))}
              </nav>
            </Drawer.Body>
            <Drawer.Footer className="mt-auto flex-col flex-nowrap items-stretch gap-6 pt-5">
              {/* The signature gives its room to the list when the phone is on its side. */}
              <div
                className="enter flex flex-col items-start gap-3 short:hidden"
                style={delay(menu.length)}
              >
                <p
                  aria-hidden="true"
                  lang="zh-Hans"
                  className="zh flex items-center gap-2.5 text-xs leading-none tracking-[0.5em] text-stone"
                >
                  {/* Each word gives back the tracking after its last character, so the hairlines sit midway. */}
                  <span className="-me-[0.5em]">深圳</span>
                  <span className="h-px w-4 bg-ink/25" />
                  <span className="-me-[0.5em]">广州</span>
                  <span className="h-px w-4 bg-ink/25" />
                  <span className="-me-[0.5em]">就医礼宾</span>
                </p>
                <a href={`mailto:${site.email}`} className="link-under text-sm text-ink">
                  {site.email}
                </a>
              </div>
              <div className="enter" style={delay(menu.length + 1)}>
                <ButtonLink href="/contact" fullWidth onClick={close}>
                  Start an Inquiry
                </ButtonLink>
              </div>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </header>
  );
}
