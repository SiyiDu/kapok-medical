import type { Metadata } from "next";
import { EmergencyAlert } from "@/components/blocks";
import { InquiryForm } from "@/components/InquiryForm";
import { Container, PageHeader, Row, TextLink } from "@/components/ui";
import { site, whatsappUrl } from "@/site.config";

export const metadata: Metadata = {
  title: "Start an inquiry",
  description: `Tell ${site.name} what you need. We reply within ${site.replyTime} and tell you plainly whether we can help. It costs nothing to ask.`,
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Start an Inquiry"
        lead={`We reply within ${site.replyTime}. Asking is free, and you are not committing to anything.`}
      />
      <section className="pt-6 pb-16 sm:pb-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[2fr_1fr]">
          <InquiryForm />
          <aside className="flex flex-col gap-8">
            <Row title="Other Ways to Reach Us">
              <div className="flex flex-col items-start gap-1">
                <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>
                {whatsappUrl ? <TextLink href={whatsappUrl}>WhatsApp</TextLink> : null}
              </div>
            </Row>
            <Row title="Your Information">
              Used only to answer this inquiry. Keep medical records, ID numbers and card details out of the form.
            </Row>
            <EmergencyAlert />
          </aside>
        </Container>
      </section>
    </>
  );
}
