import type { Metadata } from "next";
import { InfoRow } from "@/components/blocks";
import { CtaPanel } from "@/components/sections";
import { PageHeader, Row, Section } from "@/components/ui";
import { hospitalExamples, hospitalTypes } from "@/content/site-content";
import { photos } from "@/content/photos";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "Hospitals and Clinics",
  description: `The kinds of hospitals and clinics ${site.name} can book for international patients in ${site.regionProse}, and how international departments work.`,
  alternates: { canonical: "/hospitals/" },
};

export default function HospitalsPage() {
  return (
    <>
      <PageHeader
        title="Hospitals & Clinics"
        photo={photos.bay}
        lead="We book through each hospital’s own channels, in your name, and shortlist once we know what you need."
      />

      <Section title="What We Can Book">
        <ul className="grid gap-x-12 gap-y-12 sm:grid-cols-2">
          {hospitalTypes.map((type) => (
            <li key={type.title}>
              <Row title={type.title}>{type.body}</Row>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Why Guangdong">
        <div className="flex flex-col gap-8">
          <p className="display statement">
            In March 2026 Guangdong named its first 25 pilot hospitals for international medical services.
          </p>
          <p className="max-w-[34rem] text-stone">
            Their international departments set their own prices and are self-pay. In return you usually get a longer
            consultation, a shorter wait and more English spoken.
          </p>
        </div>
      </Section>

      <Section
        title="Examples"
        description={`${site.name} is independent and not affiliated with any hospital named here.`}
      >
        <div className="divide-y divide-line">
          {hospitalExamples.map((h) => (
            <InfoRow key={h.name} title={h.name} subtitle={h.city}>
              {h.note}
            </InfoRow>
          ))}
        </div>
      </Section>

      <CtaPanel />
    </>
  );
}
