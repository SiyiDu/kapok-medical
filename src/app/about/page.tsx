import type { Metadata } from "next";
import { CtaPanel } from "@/components/sections";
import { PageHeader, Row, Section } from "@/components/ui";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "About",
  description: `${site.fullName} is a small, independent team in ${site.baseCity} that helps international patients book and attend hospital visits in China.`,
  alternates: { canonical: "/about/" },
};

const principles = [
  {
    title: "Independent",
    body: "We work for the patient. We are not owned by, or an agent of, any hospital or clinic.",
  },
  {
    title: "Clear About Money",
    body: "One coordination fee, fixed in writing. If a clinic pays us a referral fee, you hear about it before you book.",
  },
  {
    title: "Honest About Fit",
    body: "If your situation is urgent, or better handled at home, we say so and we don't take the booking.",
  },
  {
    title: "Careful with Your Information",
    body: "We ask only for what a booking needs, when it needs it. We don't sell it or use it for marketing.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About"
        lead={`A small bilingual team in ${site.baseCity}. We help people from outside China use hospitals that are open to them but hard to reach from abroad.`}
      />

      <Section title="Why We Do This">
        <div className="flex flex-col gap-4 text-muted">
          <p>
            Hospitals in {site.region} see patients quickly and are increasingly set up for international visitors.
            What stops most people is everything around the appointment: Chinese-language booking apps, a local phone
            number, unfamiliar payment apps and signs they can&apos;t read.
          </p>
          <p>None of that is medicine. All of it can be handled by someone local who speaks your language.</p>
        </div>
      </Section>

      <Section title="How We Work">
        <div className="grid gap-8 sm:grid-cols-2">
          {principles.map((p) => (
            <Row key={p.title} title={p.title}>
              {p.body}
            </Row>
          ))}
        </div>
      </Section>

      <CtaPanel title="Talk to Us" />
    </>
  );
}
