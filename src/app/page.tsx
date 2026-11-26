import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Photo } from "@/components/Photo";
import { CtaPanel, FeeTable, ProcessSection, ServiceGrid } from "@/components/sections";
import { ButtonLink, Container, cx, DisplayHeading, TextLink } from "@/components/ui";
import { photos } from "@/content/photos";
import { services } from "@/content/services";
import { fees, steps } from "@/content/site-content";
import { site } from "@/site.config";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

const facts = [
  { value: "In Your Name", label: "Every appointment, booked through the hospital’s own channels." },
  { value: "In Writing", label: "The plan and every cost, before anything is booked." },
  { value: "In Person", label: "A bilingual team in Shenzhen, with you at the airport and the hospital." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero: one photograph, the headline low on the left, the invitation low on the right. */}
      <section className="under-header relative isolate flex min-h-[min(100svh,max(62rem,56.25vw))] flex-col justify-end overflow-hidden bg-ink text-ivory [--photo-caption:transparent] [--photo-ground:#0f1513]">
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <Photo
            photo={photos.hero}
            priority
            sizes="(max-aspect-ratio: 3/2) 150vh, 100vw"
            className="hero-photo size-full object-[66%_60%] sm:object-[50%_92%]"
          />
        </div>
        {/* A scrim for the header only. The one behind the words travels with them. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(8_14_12/0.5)_0%,rgb(8_14_12/0)_14rem)]"
        />
        {/*
          The two cities, hung from the top right corner: on the content edge, and in the page margin from lg.
          Hidden where a short window would bring the words up beside it.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-24 mx-auto flex w-full max-w-[86rem] justify-end px-6 sm:px-10 lg:px-[1.3125rem] max-sm:[@media(max-height:41rem)]:hidden lg:[@media(max-height:42rem)]:hidden"
        >
          <p
            lang="zh-Hans"
            style={delay(5)}
            className="vertical zh enter-fade flex items-center gap-2 text-xs leading-none tracking-[0.5em] text-ivory/80 sm:gap-3 sm:text-[0.8125rem]"
          >
            {/* Each word gives back the tracking after its last character, so the hairlines sit midway. */}
            <span className="-me-[0.5em]">深圳</span>
            <span className="h-4 w-px bg-ivory/40 sm:h-6" />
            <span className="-me-[0.5em]">广州</span>
            <span className="h-6 w-px bg-ivory/40 max-sm:hidden" />
            <span className="-me-[0.5em] max-sm:hidden">就医礼宾</span>
          </p>
        </div>
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(8_14_12/0)_0,rgb(8_14_12/0.66)_9.5rem,rgb(8_14_12/0.94)_100%)]"
          />
          <Container className="pt-40 pb-10">
            <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="enter eyebrow text-ivory/85">Medical concierge in {site.region}</p>
                <DisplayHeading
                  as="h1"
                  size="xl"
                  className="enter lines mt-5 max-lg:text-[length:clamp(min(14.4vw,3.75rem),8.6vw,4.75rem)]"
                  style={delay(1)}
                >
                  <span className="line">
                    <span style={delay(1)}>See a Doctor in China,</span>
                  </span>{" "}
                  <span className="line">
                    <span style={delay(2)}>
                      <em>Without the Guesswork.</em>
                    </span>
                  </span>
                </DisplayHeading>
              </div>
              {/* The padding is the headline's last baseline to its box bottom (0.186 of the xl size), so the button stands on that baseline. */}
              <div
                className="enter flex flex-col items-start gap-6 lg:col-span-4 lg:pb-[calc(clamp(3rem,6.2vw,6rem)*0.186)]"
                style={delay(2)}
              >
                <p className="text-ivory/85 lg:max-w-xs">
                  We book the hospital, meet you at the airport and stay with you through the visit.
                </p>
                <ButtonLink href="/contact" variant="light">
                  Start an Inquiry
                </ButtonLink>
                <p className="eyebrow text-ivory/70 sm:hidden">Free to ask. One flat fee, {site.feeLabel}.</p>
              </div>
            </div>
            <ul
              className="enter eyebrow mt-12 hidden gap-x-8 border-t border-ivory/25 pt-5 text-ivory/75 sm:flex sm:justify-between lg:grid lg:grid-cols-3 lg:gap-x-12"
              style={delay(3)}
            >
              <li>Free to ask</li>
              <li>One flat fee, {site.feeLabel}</li>
              <li>A reply within {site.replyTime}</li>
            </ul>
          </Container>
        </div>
      </section>

      {/* What we are, in one sentence, and the three ways we work. */}
      <section className="py-24 sm:py-40">
        <Container className="grid gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-baseline">
          <p className="eyebrow text-stone lg:col-span-3">What we do</p>
          <div className="lg:col-span-9">
            {/* Below lg it has the full measure and grows faster, so it stays the largest line of the section. */}
            <p className="display on-scroll text-[clamp(2rem,6vw,3.25rem)] leading-[1.06] lg:text-[clamp(2rem,4.3vw,4.25rem)]">
              We don’t practise medicine. We take care of everything around it:{" "}
              <em>the booking, the{"\u00a0"}journey and the{"\u00a0"}language.</em>
            </p>
            <dl className="@container rule mt-16 grid gap-x-12 gap-y-10 pt-8 sm:mt-24 sm:grid-cols-3">
              {facts.map((fact, i) => (
                <div key={fact.value} className="on-scroll flex flex-col gap-3" style={delay(i)}>
                  <dt className="display text-3xl sm:text-[length:clamp(1.75rem,5cqw,3rem)] sm:whitespace-nowrap">
                    {fact.value}
                  </dt>
                  {/* All but the last borrow a little of the gutter, so each note keeps to two lines at 1280. */}
                  <dd className={cx("max-w-[17rem] text-balance text-stone", i < facts.length - 1 && "lg:-mr-3")}>
                    {fact.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Services: four photographs set as a spread. */}
      <section className="pb-24 sm:pb-72 lg:pb-40">
        <Container>
          {/* From sm the same two tracks as the tiles below, so the lead starts on the right-hand picture's edge. */}
          <div className="rule flex flex-wrap items-baseline-last justify-between gap-x-12 gap-y-6 pt-10 sm:grid sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-12 lg:gap-x-12">
            <DisplayHeading size="lg" className="on-scroll lg:col-span-8">
              Services
            </DisplayHeading>
            <div className="on-scroll flex max-w-xs flex-col items-start gap-4 lg:col-span-4" style={delay(1)}>
              <p className="text-stone">Take the whole trip, or only the part you need.</p>
              <TextLink arrow href="/services">
                All Services
              </TextLink>
            </div>
          </div>
          <ServiceGrid services={services} className="mt-14 sm:mt-20" />
        </Container>
      </section>

      <ProcessSection steps={steps} action={{ href: "/how-it-works", label: "The Full Process" }} />

      {/* Fees: one rule, with the heading and the first fee on one baseline. */}
      <section id="fees" className="py-24 sm:py-40">
        <Container>
          <div className="rule grid gap-x-12 gap-y-10 pt-10 lg:grid-cols-12 lg:items-baseline">
            <div className="on-scroll flex flex-col items-start gap-5 lg:col-span-4">
              <DisplayHeading size="lg">What You Pay</DisplayHeading>
              <p className="max-w-xs text-stone">
                Three costs, kept apart. You always know what you pay us, what you pay the hospital and what the trip costs.
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <FeeTable items={fees} flush />
              <p className="on-scroll mt-6 text-sm text-stone" style={delay(fees.length)}>
                All agreed in writing before you pay anything.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <CtaPanel />
    </>
  );
}
