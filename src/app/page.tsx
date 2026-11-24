import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { KapokBranch } from "@/components/art/Kapok";
import { Landscape } from "@/components/art/Landscape";
import { CtaPanel, FeeReceipt, ItineraryTicket, ProcessPanel, ServiceArtCard } from "@/components/sections";
import { ButtonLink, Container, DisplayHeading } from "@/components/ui";
import { services } from "@/content/services";
import { fees, steps } from "@/content/site-content";
import { site } from "@/site.config";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

export default function HomePage() {
  return (
    <>
      <section className="sky grain under-header relative isolate overflow-hidden">
        <KapokBranch className="art art-sway top-10 right-0 w-[44vw] max-w-[520px] sm:top-6 sm:w-[36vw]" />
        <Container className="relative z-10 flex flex-col items-start pt-24 sm:pt-28 lg:pt-32">
          <DisplayHeading as="h1" size="xl" className="enter max-w-3xl">
            See a doctor in China, <em>without the guesswork.</em>
          </DisplayHeading>
          <p className="enter mt-6 max-w-md text-lg text-foreground/75" style={delay(1)}>
            Hospital appointments, airport pickup and an English-speaking companion in {site.region}.
          </p>
          <div className="enter mt-8 flex flex-wrap items-center gap-x-5 gap-y-3" style={delay(2)}>
            <ButtonLink href="/contact">Start an Inquiry</ButtonLink>
            <p className="text-sm text-foreground/75">Free to ask. One flat fee, {site.feeLabel}.</p>
          </div>
        </Container>
        <div className="relative mt-4 h-[clamp(300px,38vw,640px)]">
          <Landscape className="absolute inset-0 size-full" />
        </div>
      </section>

      <div className="relative z-10 -mt-14 sm:-mt-20">
        <Container>
          <ItineraryTicket />
        </Container>
      </div>

      <section className="pt-20 pb-12 sm:pt-28 sm:pb-16">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
            <DisplayHeading size="lg">Services</DisplayHeading>
            <p className="max-w-sm text-muted">
              We don&apos;t practise medicine. We handle the booking, the logistics and the language.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <ServiceArtCard key={s.slug} service={s} style={delay(i)} />
            ))}
          </div>
        </Container>
      </section>

      <ProcessPanel steps={steps} action={{ href: "/how-it-works", label: "The Full Process" }} />

      <section id="fees" className="py-16 sm:py-24">
        <Container className="grid items-center gap-16 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-4">
            <DisplayHeading size="lg">What You Pay</DisplayHeading>
            <p className="max-w-sm text-lg text-muted">
              Three kinds of money, kept apart. You always know which goes to us, to the hospital and to the trip.
            </p>
          </div>
          <FeeReceipt items={fees} />
        </Container>
      </section>

      <CtaPanel />
    </>
  );
}
