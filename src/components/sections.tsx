import NextLink from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight } from "@gravity-ui/icons";
import { buttonVariants } from "@heroui/styles";
import type { Service } from "@/content/services";
import { site, whatsappUrl } from "@/site.config";
import { Blossom, BlossomFlat, PetalGradient } from "./art/Kapok";
import { Ridges } from "./art/Landscape";
import { Spot } from "./art/Spots";
import { LogoMark } from "./Logo";
import { cx, DisplayHeading } from "./ui";

/** The illustrated, server-rendered sections of the site. */

const itinerary = [
  { when: "Before you fly", what: "Appointment Confirmed", detail: "Booked in your name." },
  { when: "Day 1 · 14:20", what: "Airport Meet-Up", detail: "Then a ride to your hotel." },
  { when: "Day 2 · 09:30", what: "Consultation", detail: "With an English-speaking companion." },
  { when: "Day 3", what: "Reports Collected", detail: "Follow-up booked if needed." },
];

/** A sample trip, laid out as a boarding pass. */
export function ItineraryTicket() {
  return (
    <div className="ticket-shadow">
      <div className="ticket grid bg-surface md:grid-cols-[15rem_1fr]">
        <div className="flex flex-row items-center justify-between gap-6 bg-ink p-6 text-cream md:flex-col md:items-start md:p-8">
          <div className="flex flex-col gap-3">
            <p className="text-sm text-sage">Sample Plan</p>
            <p className="font-display text-3xl leading-none">
              Three Days
              <br />
              in Shenzhen
            </p>
          </div>
          <LogoMark className="size-9 shrink-0 text-coral" heart="fill-ink" />
        </div>
        <ol className="grid gap-6 border-dashed border-border p-6 max-md:border-t-2 sm:grid-cols-2 md:border-l-2 md:p-8 lg:grid-cols-4">
          {itinerary.map((item) => (
            <li key={item.when} className="flex flex-col gap-3">
              <div aria-hidden="true" className="hidden items-center gap-2 lg:flex">
                <span className="size-2.5 shrink-0 rounded-full bg-kapok" />
                <span className="h-0 flex-1 border-t-2 border-dotted border-border" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs text-muted tabular-nums">{item.when}</p>
                <p className="font-medium">{item.what}</p>
                <p className="text-sm text-muted">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function ServiceArtCard({ service, style }: { service: Service; style?: CSSProperties }) {
  return (
    <NextLink
      href={`/services/${service.slug}`}
      style={style}
      className="group on-scroll flex flex-col overflow-hidden rounded-3xl bg-surface shadow-surface outline-offset-2 outline-accent transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgb(18_48_43/0.14)] focus-visible:outline-2"
    >
      <div className="overflow-hidden">
        <Spot
          name={service.icon}
          className="block aspect-[5/3] w-full transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <h3 className="flex items-center justify-between gap-3 font-medium">
          {service.name}
          <ArrowRight
            aria-hidden="true"
            className="size-4 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent"
          />
        </h3>
        <p className="text-sm text-muted">{service.summary}</p>
      </div>
    </NextLink>
  );
}

/** A wide rounded panel that carries its own colour and artwork. */
function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-3 sm:px-6">
      <div className={cx("grain relative isolate overflow-hidden rounded-[2rem]", className)}>{children}</div>
    </div>
  );
}

export function ProcessPanel({
  steps,
  action,
}: {
  steps: { title: string; body: string }[];
  action?: { href: string; label: string };
}) {
  return (
    <section className="py-12 sm:py-16">
      <Panel className="bg-ink text-cream">
        <Ridges
          seed={5}
          height={200}
          colors={["#163B35", "#19443D", "#1D4E45"]}
          className="art inset-x-0 bottom-0 h-48 w-full"
        />
        <svg viewBox="0 0 200 200" aria-hidden="true" className="art -top-40 -right-32 w-80 opacity-70 sm:w-[30rem]">
          <circle cx="100" cy="100" r="72" fill="none" stroke="#2A5E54" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="96" fill="none" stroke="#2A5E54" strokeWidth="1" strokeDasharray="2 7" />
          <circle cx="100" cy="100" r="46" fill="#19443D" />
        </svg>
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <DisplayHeading size="lg">How It Works</DisplayHeading>
            {action ? (
              <NextLink
                href={action.href}
                className="group flex items-center gap-1 text-sm font-medium text-apricot hover:text-cream"
              >
                {action.label}
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
              </NextLink>
            ) : null}
          </div>
          <ol className="relative mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            <li aria-hidden="true" className="absolute inset-x-0 top-7 hidden border-t-2 border-dotted border-cream/25 md:block" />
            {steps.map((step, i) => (
              <li key={step.title} className="on-scroll relative flex flex-col items-start gap-4" style={{ "--i": i } as CSSProperties}>
                <span className="grid size-14 place-items-center rounded-full bg-ink font-display text-2xl text-apricot ring-1 ring-cream/30">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-medium">{step.title}</h3>
                  <p className="max-w-xs text-sage">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Panel>
    </section>
  );
}

/** The three kinds of money, on a till receipt. */
export function FeeReceipt({ items }: { items: { label: string; value: string; body: string }[] }) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div aria-hidden="true" className="absolute -top-10 -right-6 size-56 rounded-full bg-apricot/70 sm:-right-12" />
      <svg viewBox="-50 -50 100 100" aria-hidden="true" className="absolute -bottom-8 -left-10 z-10 w-28 sm:-left-14 sm:w-32">
        <defs>
          <PetalGradient id="fee-petal" />
        </defs>
        <Blossom gradient="fee-petal" x={0} y={0} r={44} rot={18} />
      </svg>
      <div className="ticket-shadow relative -rotate-2">
        <div className="receipt flex flex-col gap-6 bg-surface px-7 pt-8 sm:px-9">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <LogoMark className="size-5 text-kapok" />
              <span className="font-display text-xl leading-none">{site.name}</span>
            </span>
            <span className="text-xs text-muted">Sample Trip</span>
          </div>
          <dl className="flex flex-col">
            {items.map((fee) => (
              <div key={fee.label} className="flex flex-col gap-1 border-t-2 border-dotted border-border py-4">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-muted">{fee.label}</dt>
                  <dd className="font-display text-2xl leading-none whitespace-nowrap tabular-nums">{fee.value}</dd>
                </div>
                <dd className="text-sm text-muted">{fee.body}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col gap-2 border-t-2 border-dotted border-border pt-5">
            <div aria-hidden="true" className="barcode text-ink/80" />
            <p className="text-center text-xs text-muted">Agreed in writing before you pay.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CtaPanel({
  title = "Not Sure Where to Start?",
  lead = `Send us a short note. We reply within ${site.replyTime}.`,
}: {
  title?: string;
  lead?: string;
}) {
  const light = cx(buttonVariants(), "bg-cream text-ink hover:bg-white");
  return (
    <section className="py-12 sm:py-16">
      <Panel className="bg-kapok text-cream">
        <svg viewBox="0 0 400 400" aria-hidden="true" className="art -bottom-28 -left-24 w-80 sm:w-[26rem]">
          <g className="art-turn">
            <BlossomFlat x={200} y={200} r={190} fill="#D5512F" heart="#B5371D" edge="#C93F23" />
          </g>
        </svg>
        <svg viewBox="0 0 400 400" aria-hidden="true" className="art -top-24 -right-16 w-64 sm:w-80">
          <g className="art-turn">
            <BlossomFlat x={200} y={200} r={190} rot={36} fill="#B8391E" heart="#D5512F" edge="#C93F23" />
          </g>
        </svg>
        <svg viewBox="0 0 200 200" aria-hidden="true" className="art top-10 left-[18%] hidden w-16 md:block">
          <BlossomFlat x={100} y={100} r={92} rot={12} fill="#DD5C3A" heart="#B5371D" edge="#C93F23" />
        </svg>
        <div className="relative z-10 flex flex-col items-center gap-5 px-6 py-20 text-center sm:py-28">
          <DisplayHeading size="lg" className="max-w-xl">
            {title}
          </DisplayHeading>
          <p className="max-w-md text-lg text-cream/90">{lead}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <NextLink href="/contact" className={light}>
              Start an Inquiry
            </NextLink>
            {whatsappUrl ? (
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={cx(buttonVariants({ variant: "outline" }), "border-cream/50 text-cream hover:bg-cream/10")}>
                WhatsApp
              </a>
            ) : null}
          </div>
        </div>
      </Panel>
    </section>
  );
}
