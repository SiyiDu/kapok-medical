import type { Metadata } from "next";
import { CtaPanel, ServiceArtCard } from "@/components/sections";
import { Container, PageHeader } from "@/components/ui";
import { services } from "@/content/services";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "Services",
  description: `Hospital appointments, airport pickup, in-person companions and clinic quotes for international patients in ${site.region}.`,
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Services"
        lead="Take the whole trip or only the part you need. Everything is quoted before you commit."
      />
      <section className="pt-4 pb-12 sm:pb-16">
        <Container className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <ServiceArtCard key={s.slug} service={s} />
          ))}
        </Container>
      </section>
      <CtaPanel />
    </>
  );
}
