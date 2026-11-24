import type { Metadata } from "next";
import { InfoCard } from "@/components/blocks";
import { CtaPanel } from "@/components/sections";
import { PageHeader, Row, Section } from "@/components/ui";
import { hospitalExamples, hospitalTypes } from "@/content/site-content";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "Hospitals and clinics",
  description: `The kinds of hospitals and clinics ${site.name} can book for international patients in ${site.region}, and how international departments work.`,
  alternates: { canonical: "/hospitals/" },
};

export default function HospitalsPage() {
  return (
    <>
      <PageHeader
        title="Hospitals and Clinics"
        lead="We book through each hospital's own channels, in your name, and shortlist once we know what you need."
      />

      <Section title="What We Can Book">
        <ul className="grid gap-8 sm:grid-cols-2">
          {hospitalTypes.map((type) => (
            <li key={type.title}>
              <Row title={type.title}>{type.body}</Row>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Why Guangdong">
        <p className="text-muted">
          In March 2026 Guangdong named its first 25 pilot hospitals for international medical services. Their
          international departments set their own prices and are self-pay. In return you usually get a longer
          consultation, a shorter wait and more English spoken.
        </p>
      </Section>

      <Section
        title="Examples"
        description={`${site.name} is independent and not affiliated with any hospital named here.`}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {hospitalExamples.map((h) => (
            <InfoCard key={h.name} title={h.name} subtitle={h.city}>
              {h.note}
            </InfoCard>
          ))}
        </div>
      </Section>

      <CtaPanel />
    </>
  );
}
