import type { Metadata } from "next";
import { CtaPanel, ServiceGrid } from "@/components/sections";
import { Container, PageHeader } from "@/components/ui";
import { services } from "@/content/services";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "Services",
  description: `Hospital appointments, airport pickup, in-person companions and clinic quotes for international patients in ${site.regionProse}.`,
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Services"
        lead="Take the whole trip, or only the part you need. Everything is quoted before you commit."
      />
      <section className="after-title pb-24 sm:pb-64 lg:pb-40">
        <Container>
          <ServiceGrid services={services} as="h2" className="rule pt-14" />
        </Container>
      </section>
      <CtaPanel />
    </>
  );
}
