import type { Metadata } from "next";
import { FaqAccordion } from "@/components/blocks";
import { CtaPanel } from "@/components/sections";
import { Container, PageHeader } from "@/components/ui";
import { faqs } from "@/content/site-content";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Costs, payment, insurance, language, visas and what we can and can't do: answers for international patients planning care in China.",
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
      <PageHeader title="Questions" lead="If yours isn't here, send it to us." />
      <section className="pt-4 pb-12 sm:pb-16">
        <Container>
          <div className="max-w-3xl">
            <FaqAccordion items={faqs} />
          </div>
        </Container>
      </section>
      <CtaPanel title="Still Have a Question?" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
