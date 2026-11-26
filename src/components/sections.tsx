import NextLink from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { photos } from "@/content/photos";
import type { Service, ServiceIconName } from "@/content/services";
import { site, whatsappUrl } from "@/site.config";
import { Photo } from "./Photo";
import { ButtonLink, bySentence, Container, cx, DisplayHeading, TextLink, withAmp } from "./ui";

/** The larger, server-rendered sections of the site. */

/** The photograph that stands for each service, on its tile and its own page. */
export const servicePhotos = {
  calendar: photos.clinic,
  plane: photos.airport,
  comments: photos.corridor,
  list: photos.waiting,
} satisfies Record<ServiceIconName, unknown>;

const two = (n: number) => String(n).padStart(2, "0");

/** The colour of a drawn hairline on the ink ground. */
const ruleOnInk = { "--rule": "rgb(243 238 228 / 0.2)" } as CSSProperties;

/** One service: a photograph with a numbered caption. The whole tile is the link. */
function ServiceTile({
  service,
  index,
  wide = false,
  as: Title = "h3",
  className,
}: {
  service: Service;
  index: number;
  /** A landscape photograph instead of a tall one. Between phone and desktop every tile is tall. */
  wide?: boolean;
  as?: "h2" | "h3";
  className?: string;
}) {
  return (
    <NextLink href={`/services/${service.slug}`} className={cx("group flex flex-col gap-6", className)}>
      {/* The right-hand tile of a row trails the left by a beat. */}
      <div className="unveil plate" style={{ "--i": (index + 1) % 2 } as CSSProperties}>
        <Photo
          photo={servicePhotos[service.icon]}
          decorative
          ratio={wide ? 5 / 4 : 4 / 5}
          crops={wide ? [{ media: "(min-width: 640px) and (max-width: 1023px)", ratio: 4 / 5 }] : undefined}
          sizes={`(min-width: 1024px) ${wide ? "50vw" : "35vw"}, (min-width: 640px) 46vw, 100vw`}
          className={cx("grade zoomable block w-full", wide ? "aspect-[5/4] sm:max-lg:aspect-[4/5]" : "aspect-[4/5]")}
        />
      </div>
      <div className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-2 sm:grid-cols-[2.5rem_1fr_auto]">
        <span aria-hidden="true" className="col-span-2 text-sm text-stone tabular-nums sm:col-span-1">
          {two(index)}
        </span>
        <Title className="display text-3xl leading-[1.06] tracking-[-0.012em] sm:text-4xl">
          {withAmp(service.name)}
        </Title>
        <span
          aria-hidden="true"
          className="text-lg transition-transform duration-700 motion-safe:group-hover:translate-x-2"
        >
          →
        </span>
        <p className="col-span-2 max-w-sm text-stone sm:col-span-1 sm:col-start-2">{service.summary}</p>
      </div>
    </NextLink>
  );
}

/* Where each tile of the spread sits. From lg the second tile of a row is dropped by a margin, so the grid's height is real. */
const spread = [
  "lg:col-span-5",
  "sm:translate-y-32 lg:col-span-7 lg:col-start-6 lg:mt-32 lg:translate-y-0",
  "lg:col-span-7 lg:mt-24",
  "sm:translate-y-32 lg:col-span-5 lg:col-start-8 lg:mt-56 lg:translate-y-0",
];

/** The four services as a spread: tall, wide, wide, tall. Two staggered columns on tablets, one column on phones. */
export function ServiceGrid({
  services,
  as,
  className,
}: {
  services: Service[];
  as?: "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={cx("grid gap-y-16 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-0", className)}>
      {services.map((s, i) => (
        <ServiceTile
          key={s.slug}
          service={s}
          index={i + 1}
          as={as}
          wide={i % 4 === 1 || i % 4 === 2}
          className={spread[i % 4]}
        />
      ))}
    </div>
  );
}

const itinerary = [
  { when: "Before you fly", what: "Appointment Confirmed", detail: "Date, time and building, in English." },
  { when: "Day 1 · 14:20", what: "Airport Meet-Up", detail: "Then a ride to your hotel." },
  { when: "Day 2 · 09:30", what: "Consultation", detail: "With an English-speaking companion." },
  { when: "Day 3", what: "Reports Collected", detail: "Follow-up booked if needed." },
];

/** How it works, on ink: three steps, then what a real visit looks like day by day. */
export function ProcessSection({
  steps,
  action,
}: {
  steps: { title: string; body: string }[];
  action?: { href: string; label: string };
}) {
  return (
    <section className="bg-ink py-24 text-ivory [--photo-caption:rgb(243_238_228/0.6)] [--photo-ground:#1b2621] sm:py-36">
      <Container>
        <div className="on-scroll flex flex-wrap items-baseline justify-between gap-6">
          <DisplayHeading size="lg">How It Works</DisplayHeading>
          {action ? (
            <TextLink arrow href={action.href} className="text-ivory/85">
              {action.label}
            </TextLink>
          ) : null}
        </div>

        {/* Ruled rows below lg, numeral beside the text. From lg three columns on the page grid, each divider in the gutter. */}
        <ol className="rule mt-14 grid lg:grid-cols-3 lg:gap-x-12" style={ruleOnInk}>
          {steps.map((step, i) => (
            <li
              key={step.title}
              style={{ "--i": i } as CSSProperties}
              className="on-scroll grid grid-cols-[4.5rem_1fr] items-baseline gap-x-5 border-ivory/20 py-8 max-lg:border-b sm:grid-cols-[9rem_1fr] sm:gap-x-10 sm:py-10 lg:-ml-12 lg:flex lg:flex-col lg:items-stretch lg:gap-10 lg:border-l lg:pl-[calc(3rem-1px)] lg:first:ml-0 lg:first:border-l-0 lg:first:pl-0"
            >
              {/* Pulled back so the italic numeral's ink starts on the same edge as the text. */}
              <span className="display -ml-[0.05em] text-6xl text-bronze italic sm:text-7xl lg:text-8xl">
                {two(i + 1)}
              </span>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-medium">{step.title}</h3>
                <p className="max-w-xs text-ivory/65">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-24 grid gap-x-12 gap-y-12 sm:mt-36 lg:grid-cols-12 lg:items-end">
          <div className="unveil plate lg:col-span-5">
            <Photo
              photo={photos.terminal}
              ratio={4 / 5}
              crops={[{ media: "(min-width: 640px) and (max-width: 1023px)", ratio: 3 / 2 }]}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="grade block aspect-[4/5] w-full sm:aspect-[3/2] lg:aspect-[4/5]"
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow text-ivory/60">A sample visit</p>
            <DisplayHeading as="h3" className="mt-4 lg:whitespace-nowrap">
              Three Days in Shenzhen
            </DisplayHeading>
            <ol className="rule mt-10" style={ruleOnInk}>
              {itinerary.map((item, i) => (
                <li
                  key={item.when}
                  style={{ "--i": i } as CSSProperties}
                  className="on-scroll grid items-baseline gap-x-6 gap-y-1.5 border-b border-ivory/20 py-5 sm:grid-cols-[10rem_1fr] lg:grid-cols-6 lg:gap-x-12"
                >
                  <span className="eyebrow text-ivory/60 tabular-nums lg:col-span-2">{item.when}</span>
                  <div className="flex flex-col gap-1.5 lg:col-span-4">
                    <p className="display text-[1.625rem] leading-[1.1] font-medium tracking-[-0.01em] xl:text-[1.75rem]">
                      {item.what}
                    </p>
                    <p className="text-ivory/65">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * The three kinds of money, as a plain typographic table: every row shares one set of column tracks.
 * From sm the label stands beside the figure, on the 11.5rem edge the steps and the itinerary also use.
 * From 1440 the note moves up beside the figure, where the column has room for its longest sentence.
 */
export function FeeTable({
  items,
  flush = false,
  open = false,
}: {
  items: { label: string; value: string; body: string }[];
  /** Inside a block that already draws a rule above it: from lg the table gives up its own top rule and starts on the block's first line. */
  flush?: boolean;
  /** No rule under the last row: whatever follows the table closes it. */
  open?: boolean;
}) {
  return (
    <dl
      className={cx(
        "rule sm:grid sm:grid-cols-[10rem_1fr] sm:gap-x-6 min-[90rem]:grid-cols-[5.5rem_max-content_1fr] min-[90rem]:gap-x-8",
        flush && "lg:-mt-px lg:[--rule:transparent]",
      )}
    >
      {items.map((fee, i) => (
        <div
          key={fee.label}
          style={{ "--i": i } as CSSProperties}
          className={cx(
            "on-scroll grid items-baseline gap-y-2 border-b border-line py-7 sm:col-span-full sm:grid-cols-subgrid",
            flush && "lg:first:pt-0",
            open && "last:border-b-0 last:pb-0",
          )}
        >
          <dt className="eyebrow text-stone">{fee.label}</dt>
          <dd className="display text-4xl leading-[1.06] tracking-[-0.012em] whitespace-nowrap sm:text-5xl sm:leading-[1.02] sm:tracking-[-0.018em]">
            {fee.value}
          </dd>
          <dd className="text-stone sm:col-start-2 min-[90rem]:col-start-3">{bySentence(fee.body)}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Closing invitation over a photograph. */
export function CtaPanel({
  title = "Not Sure Where to Start?",
  lead = (
    <>
      Send us a short note. <span className="inline-block">We reply within {site.replyTime}.</span>
    </>
  ),
}: {
  title?: string;
  lead?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-clip bg-ink text-ivory [--photo-caption:transparent] [--photo-ground:#0f1513]">
      {/* A 3:2 picture covering the panel is drawn 1.5 times the panel's height wide. */}
      <Photo
        photo={photos.guangzhou}
        decorative
        sizes="(max-width: 639px) 93vh, (max-aspect-ratio: 7/6) 117vh, 100vw"
        className="grade-night absolute inset-0 -z-20 size-full object-[50%_60%]"
      />
      {/* Ends on the footer's ink, so the picture melts into it and the footer's hairline is the only divider. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(15_21_19/0.55)_0%,rgb(15_21_19/0.3)_45%,rgb(15_21_19/0.75)_82%,#0f1513_100%)]"
      />
      <Container className="flex min-h-[min(62svh,46rem)] flex-col items-center justify-center gap-7 py-24 text-center sm:min-h-[min(78svh,46rem)] sm:py-28">
        <DisplayHeading size="xl" className="on-scroll max-w-4xl">
          {title}
        </DisplayHeading>
        <p className="on-scroll max-w-xl text-lg text-ivory/85" style={{ "--i": 1 } as CSSProperties}>
          {lead}
        </p>
        <div className="on-scroll mt-2 flex flex-wrap justify-center gap-3" style={{ "--i": 2 } as CSSProperties}>
          <ButtonLink href="/contact" variant="light">
            Start an Inquiry
          </ButtonLink>
          {whatsappUrl ? (
            <ButtonLink href={whatsappUrl} variant="outline" external>
              WhatsApp
            </ButtonLink>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
