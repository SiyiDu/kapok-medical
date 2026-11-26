import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { EmergencyNote } from "@/components/blocks";
import { InquiryForm } from "@/components/InquiryForm";
import { Container, PageHeader, Row, TextLink } from "@/components/ui";
import { site, whatsappUrl } from "@/site.config";

export const metadata: Metadata = {
  title: "Start an Inquiry",
  description: `Tell ${site.name} what you need. We reply within ${site.replyTime} and tell you plainly whether we can help. It costs nothing to ask.`,
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Start an Inquiry"
        lead={`We reply within ${site.replyTime}. Asking is free and commits you to nothing.`}
      />
      <section className="pb-24 sm:pb-32">
        <Container>
          {/* The same columns as the page header: the form under the title, the aside under the lead. */}
          <div className="rule grid items-start gap-x-12 gap-y-16 pt-10 lg:grid-cols-12">
            <div className="enter lg:col-span-7" style={{ "--i": 2 } as CSSProperties}>
              <InquiryForm />
            </div>
            <aside
              className="enter flex flex-col gap-8 lg:col-span-4 lg:col-start-9"
              style={{ "--i": 3 } as CSSProperties}
            >
              {/* The one thing to act on in the aside: body size, in ink. */}
              <Row title={whatsappUrl ? "Other Ways to Reach Us" : "Prefer Email?"} as="h2">
                <div className="flex flex-col items-start gap-1 text-ink">
                  <TextLink href={`mailto:${site.email}`} size="base">
                    {site.email}
                  </TextLink>
                  {whatsappUrl ? (
                    <TextLink href={whatsappUrl} size="base">
                      WhatsApp
                    </TextLink>
                  ) : null}
                </div>
              </Row>
              <Row title="Your Information" as="h2">
                Used only to answer this inquiry.
              </Row>
              <EmergencyNote />
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
