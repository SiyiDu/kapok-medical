import type { Metadata } from "next";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaPanel } from "@/components/sections";
import { PageHeader, Section } from "@/components/ui";
import { faqGroups, faqs } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Questions",
  description:
    "Costs, payment, insurance, language, visas and what we can and can’t do: answers for international patients planning care in China.",
  alternates: { canonical: "/faq/" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <PageHeader title="Questions" lead="If yours isn’t here, send it to us." />
      {faqGroups.map((group) => (
        <Section key={group.title} title={group.title}>
          <FaqAccordion items={group.items} />
        </Section>
      ))}
      <CtaPanel title="Still Have a Question?" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
