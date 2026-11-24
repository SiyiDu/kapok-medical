import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IconList } from "@/components/blocks";
import { CtaPanel } from "@/components/sections";
import { Spot } from "@/components/art/Spots";
import { ButtonLink, PageHeader, Row, Section, TextLink } from "@/components/ui";
import { getService, services } from "@/content/services";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}/` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <PageHeader
        title={service.name}
        lead={service.intro}
        art={<Spot name={service.icon} className="block aspect-[5/3] w-full" />}
        kicker={
          <TextLink href="/services" className="text-sm text-muted">
            Services
          </TextLink>
        }
      >
        <ButtonLink href="/contact">Start an Inquiry</ButtonLink>
      </PageHeader>

      <Section title="What We Do">
        <IconList items={service.includes} icon="check" />
      </Section>

      <Section title="Not Covered">
        <IconList items={service.notIncluded} icon="minus" />
      </Section>

      <Section title="Good to Know">
        <div className="flex flex-col gap-8">
          {service.goodToKnow.map((item) => (
            <Row key={item.title} title={item.title}>
              {item.body}
            </Row>
          ))}
        </div>
      </Section>

      <CtaPanel />
    </>
  );
}
