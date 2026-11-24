import type { Metadata } from "next";
import { CtaPanel, FeeReceipt } from "@/components/sections";
import { PageHeader, Row, Section } from "@/components/ui";
import { fees } from "@/content/site-content";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "How it works",
  description: `From first message to hospital visit: how ${site.name} plans, books and supports a medical trip to China, and what each part costs.`,
  alternates: { canonical: "/how-it-works/" },
};

const stages = [
  {
    title: "Tell Us What You Need",
    body: "Use the form or email us: what you want to be seen for, which city and roughly when. No medical records at this stage.",
  },
  {
    title: "We Check It's a Fit",
    body: `We reply within ${site.replyTime}. If planned care in China doesn't suit your situation, we say so.`,
  },
  {
    title: "You Get a Written Plan",
    body: "Hospital options, the earliest realistic dates, our fee and the other costs to expect.",
  },
  {
    title: "We Book It",
    body: "Once you say go, you pay the coordination fee and we book in your name through the hospital's own channels.",
  },
  {
    title: "We Meet You",
    body: "At the airport or border crossing, and at the hospital if you booked a companion. Before you leave, we make sure you have your reports, prescriptions and receipts.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        title="How It Works"
        lead="You see the plan and the price in writing before anything is booked or charged."
      />

      <Section title="The Process">
        <ol className="flex flex-col gap-8">
          {stages.map((stage, i) => (
            <li key={stage.title}>
              <Row index={i + 1} title={stage.title}>
                {stage.body}
              </Row>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="fees"
        title="What You Pay"
        description="International departments set their own prices and are generally self-pay."
      >
        <FeeReceipt items={fees} />
      </Section>

      <CtaPanel title="Ready to Start?" />
    </>
  );
}
