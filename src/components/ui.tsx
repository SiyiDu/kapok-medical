import NextLink from "next/link";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import type { Photo as PhotoData } from "@/content/photos";
import { Photo } from "./Photo";

/**
 * Layout primitives and link helpers. Everything here is server-safe.
 * The look is editorial: a wide column, hairlines, a large serif for display
 * and a small sans for everything else.
 */

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("mx-auto w-full max-w-[86rem] px-6 sm:px-10 lg:px-14", className)}>{children}</div>;
}

type ButtonVariant = "primary" | "light" | "outline";

/* Shape, fill, hover and focus come from .btn in globals.css. */
const buttonBase =
  "btn inline-flex h-12 items-center justify-center px-8 text-[0.8125rem] font-medium tracking-[0.04em] whitespace-nowrap";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  light: "btn-light",
  outline: "btn-outline",
};

/** A link that looks like a button. `light` is for dark backgrounds. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  fullWidth = false,
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}) {
  const className = cx(buttonBase, buttonStyles[variant], fullWidth && "w-full");
  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <NextLink href={href} className={className} onClick={onClick}>
      {children}
    </NextLink>
  );
}

const linkSizes = { sm: "text-sm", base: "text-base", inherit: "" };

/**
 * An underlined text link. With `arrow` the underline only appears on hover and an arrow leads the way,
 * on the underline's own 600ms. `size="inherit"` takes the size of the text it sits in.
 */
export function TextLink({
  href,
  children,
  className,
  arrow = false,
  size = "sm",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
  size?: keyof typeof linkSizes;
}) {
  const external = /^(https?:|mailto:)/.test(href);
  const cls = cx("group inline-flex items-baseline gap-2", linkSizes[size], className);
  const content = (
    <>
      <span className={arrow ? "link-line" : "link-under"}>{children}</span>
      {arrow ? (
        <span aria-hidden="true" className="transition-transform duration-600 motion-safe:group-hover:translate-x-1">
          →
        </span>
      ) : null}
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

/** Sets the ampersand of a display title in italic and keeps it with the word that follows. */
export function withAmp(text: string): ReactNode {
  return text.split(" & ").flatMap((part, i) =>
    i === 0
      ? [part]
      : [
          " ",
          <span key={i} className="amp">
            &amp;
          </span>,
          `\u00a0${part}`,
        ],
  );
}

/** Keeps each sentence of a short note whole, so a line breaks between two sentences and not inside one. */
export function bySentence(text: string): ReactNode {
  return text.split(/(?<=\.)\s+/).map((sentence, i) => (
    <Fragment key={sentence}>
      {i > 0 ? " " : null}
      <span className="inline-block">{sentence}</span>
    </Fragment>
  ));
}

/**
 * Serif display heading. Each size carries the leading and tracking of the house rule in globals.css.
 * The two largest are pulled left by the face's side bearing, so their stems sit on the edge the rules and pictures share.
 */
export function DisplayHeading({
  as: Tag = "h2",
  size = "md",
  children,
  className,
  style,
}: {
  as?: "h1" | "h2" | "h3";
  size?: "sm" | "md" | "lg" | "xl";
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const sizes = {
    sm: "text-3xl leading-[1.06] tracking-[-0.012em] sm:text-4xl",
    md: "text-4xl leading-[1.06] tracking-[-0.012em] sm:text-5xl sm:leading-[1.02] sm:tracking-[-0.018em]",
    lg: "-ml-[0.03em] text-[clamp(2.75rem,7.8vw,3.75rem)] lg:text-[clamp(3.5rem,4.6vw,4.25rem)]",
    xl: "-ml-[0.035em] text-[clamp(3rem,8.6vw,4.75rem)] lg:text-[clamp(3rem,6.2vw,6rem)]",
  };
  return (
    <Tag className={cx("display", sizes[size], className)} style={style}>
      {children}
    </Tag>
  );
}

/**
 * The inner pages' rhythm: a hairline, a heading in the left third, content in the rest.
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
    <section id={id} className="after-title">
      <Container>
        <div className="rule grid gap-x-12 gap-y-8 pt-10 pb-20 sm:pb-28 lg:grid-cols-12">
          <div className="on-scroll flex flex-col items-start gap-4 lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <DisplayHeading>{title}</DisplayHeading>
            {description ? <p className="max-w-xs text-stone">{description}</p> : null}
            {action ? <div className="mt-2">{action}</div> : null}
          </div>
          <div className="on-scroll min-w-0 lg:col-span-7 lg:col-start-6" style={{ "--i": 1 } as CSSProperties}>
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Inner-page header: a very large title, the lead hung from its first baseline, and a photograph below
 * (full-bleed and tall on phones, 16:9 on tablets, a wide plate on desktop), with its caption if it has one.
 */
export function PageHeader({
  title,
  lead,
  kicker,
  children,
  photo,
}: {
  title: string;
  lead: string;
  kicker?: ReactNode;
  children?: ReactNode;
  photo?: PhotoData;
}) {
  return (
    <section className="pt-16 pb-16 sm:pt-24 sm:pb-24">
      <Container>
        {kicker ? <div className="enter mb-6">{kicker}</div> : null}
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-baseline">
          <DisplayHeading as="h1" size="xl" className="enter lg:col-span-7">
            {withAmp(title)}
          </DisplayHeading>
          <div
            className="enter flex flex-col items-start gap-6 lg:col-span-4 lg:col-start-9"
            style={{ "--i": 1 } as CSSProperties}
          >
            <p className="text-lg text-stone">{lead}</p>
            {children}
          </div>
        </div>
        {photo ? (
          <figure className="mt-12 sm:mt-20">
            <div className="enter-unveil plate -mx-6 sm:mx-0">
              <Photo
                photo={photo}
                priority
                ratio={4 / 5}
                crops={[
                  { media: "(min-width: 1024px)", ratio: 21 / 9, sizes: "(min-width: 1400px) 88vw, 100vw" },
                  { media: "(min-width: 640px)", ratio: 16 / 9 },
                ]}
                className="grade block aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[21/9]"
              />
            </div>
            {/* Arrives as the picture finishes unveiling. */}
            {photo.caption ? (
              <figcaption
                className="enter-fade eyebrow mt-3 text-balance text-stone"
                style={{ "--i": 6 } as CSSProperties}
              >
                {photo.caption}
              </figcaption>
            ) : null}
          </figure>
        ) : null}
      </Container>
    </section>
  );
}

/** The serif title of a row, and of the form's status notes: the 26 to 28px tier of the house rule. */
export const rowTitle = "display text-[1.625rem] leading-[1.1] font-medium tracking-[-0.01em] sm:text-[1.75rem]";

/**
 * A titled row. With `index` it is a step: a bronze numeral and a sans title, as in the home process.
 * Without, it names a thing (a provider type, a principle), and the name is set in the serif.
 * From 1440 the step titles share the left edge of the figures in the fee table that follows them on How It Works.
 */
export function Row({
  index,
  title,
  as: Title = "h3",
  children,
}: {
  index?: number;
  title: string;
  as?: "h2" | "h3";
  children: ReactNode;
}) {
  if (index === undefined) {
    return (
      <div className="flex flex-col gap-2">
        <Title className={rowTitle}>{title}</Title>
        <div className="max-w-[32rem] text-pretty text-stone">{children}</div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 sm:grid-cols-[5rem_1fr] sm:gap-x-8 min-[90rem]:grid-cols-[5.5rem_1fr]">
      <span aria-hidden="true" className="display text-3xl text-bronze italic sm:text-[2.5rem]">
        {String(index).padStart(2, "0")}
      </span>
      <div className="flex flex-col gap-2">
        <Title className="text-xl font-medium">{title}</Title>
        <div className="max-w-[34rem] text-pretty text-stone">{children}</div>
      </div>
    </div>
  );
}
