import NextLink from "next/link";
import { site } from "@/site.config";
import { Wordmark } from "./Logo";
import { DesktopNav, MobileNav } from "./Nav";
import { ButtonLink } from "./ui";

/** Floats over the page so the artwork can run to the very top. Height is mirrored by `.under-header`. */
export function Header() {
  return (
    <header className="sticky top-3 z-40 mt-3 px-3">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-6 rounded-full bg-surface/80 pr-2 pl-5 shadow-[0_8px_28px_rgb(18_48_43/0.1)] ring-1 ring-foreground/5 backdrop-blur-xl">
        <NextLink href="/" aria-label={`${site.fullName}, home`}>
          <Wordmark />
        </NextLink>
        <DesktopNav />
        <div className="flex items-center gap-1">
          <div className="hidden sm:block">
            <ButtonLink href="/contact">Start an Inquiry</ButtonLink>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
