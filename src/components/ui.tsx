import NextLink from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight } from "@gravity-ui/icons";
import { buttonVariants, linkVariants } from "@heroui/styles";
import { Ridges } from "./art/Landscape";

/**
 * Layout primitives and link helpers. Everything here is server-safe:
 * HeroUI button and link styles are applied to Next.js links through the
 * library's variant functions, as its docs recommend for routing libraries.
 */

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("mx-auto w-full max-w-6xl px-6", className)}>{children}</div>;
}

type ButtonVariant = "primary" | "secondary" | "tertiary" | "outline" | "ghost";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  fullWidth = false,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
  fullWidth?: boolean;
}) {
  const className = buttonVariants({ variant, fullWidth });
  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <NextLink href={href} className={className}>
      {children}
    </NextLink>
  );
}

export function TextLink({
  href,
  children,
  className,
  arrow = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  /** Show the link arrow. Use it where the link is the way onward, not inside running text. */
  arrow?: boolean;
}) {
  const external = /^(https?:|mailto:)/.test(href);
  const slots = linkVariants();
  const cls = cx(slots.base(), arrow && "gap-1", className);
  const content = (
    <>
      {children}
      {arrow ? <ArrowRight aria-hidden="true" className={slots.icon()} /> : null}
    </>
  );
  if (external) {
    return (
      <a href={href} className={cls}>
        {content}
      </a>
    );
  }
  return (
    <NextLink href={href} className={cls}>
      {content}
    </NextLink>
  );
}

/** Serif display heading. Instrument Serif has a single weight, so never bold it. */
export function DisplayHeading({
  as: Tag = "h2",
  size = "md",
  children,
  className,
}: {
  as?: "h1" | "h2";
  size?: "md" | "lg" | "xl";
  children: ReactNode;
  className?: string;
}) {
  const sizes = {
    md: "text-3xl sm:text-4xl",
    lg: "text-4xl sm:text-5xl",
    xl: "text-5xl sm:text-6xl lg:text-7xl",
  };
  return (
    <Tag className={cx("font-display leading-[1.05] font-normal tracking-[-0.01em]", sizes[size], className)}>
      {children}
    </Tag>
  );
}

/**
 * The page's main rhythm: a short heading in the left column, content in the right.
 * Sections are separated by whitespace only.
 */
export function Section({
  title,
  description,
  action,
  children,
  id,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="py-12 sm:py-16">
      <Container className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div className="flex flex-col items-start gap-3 lg:sticky lg:top-24 lg:self-start">
          <DisplayHeading>{title}</DisplayHeading>
          {description ? <p className="max-w-sm text-muted">{description}</p> : null}
          {action ? <div className="mt-3">{action}</div> : null}
        </div>
        <div className="min-w-0">{children}</div>
      </Container>
    </section>
  );
}

/** Stable number from a string, so each page gets its own hills. */
function seedFrom(text: string) {
  let h = 7;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) % 9973;
  return h;
}

/**
 * Inner-page header: a strip of morning sky that ends in a line of hills.
 * The nearest hill is the page colour, so the band tears into the page.
 */
export function PageHeader({
  title,
  lead,
  kicker,
  children,
  art,
}: {
  title: string;
  lead: string;
  kicker?: ReactNode;
  children?: ReactNode;
  /** Optional illustration shown beside the text on wide screens. */
  art?: ReactNode;
}) {
  return (
    <section className="sky-soft grain grain-fade under-header relative isolate overflow-hidden">
      {art ? null : (
        <div aria-hidden="true" className="art right-[14%] bottom-8 size-28 rounded-full bg-coral sm:bottom-12 sm:size-36" />
      )}
      <Ridges
        seed={seedFrom(title)}
        colors={["#CFE1D2", "#B2CFC0", "#F7F0E3"]}
        className="art inset-x-0 bottom-0 h-24 w-full sm:h-36"
      />
      <Container
        className={cx(
          "relative z-10 grid items-center gap-10 pt-16 pb-28 sm:pt-24 sm:pb-44",
          art ? "lg:grid-cols-[1.15fr_1fr]" : undefined,
        )}
      >
        <div className="flex flex-col items-start gap-5">
          {kicker}
          <DisplayHeading as="h1" size="lg" className="enter">
            {title}
          </DisplayHeading>
          <p className="enter max-w-xl text-lg text-foreground/75" style={{ "--i": 1 } as CSSProperties}>
            {lead}
          </p>
          {children}
        </div>
        {art ? <div className="ticket-shadow enter rotate-1 overflow-hidden rounded-3xl">{art}</div> : null}
      </Container>
    </section>
  );
}

/** A plain titled row: used for steps, provider types and principles. */
export function Row({
  index,
  title,
  children,
}: {
  index?: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={cx("grid gap-x-6 gap-y-1", index !== undefined && "grid-cols-[2rem_1fr]")}>
      {index !== undefined ? (
        <span className="pt-0.5 text-sm text-muted tabular-nums">{String(index).padStart(2, "0")}</span>
      ) : null}
      <div className="flex flex-col gap-1">
        <h3 className="font-medium">{title}</h3>
        <div className="text-muted">{children}</div>
      </div>
    </div>
  );
}
