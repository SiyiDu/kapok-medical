import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { LedgerList } from "@/components/blocks";
import { CtaPanel, servicePhotos } from "@/components/sections";
import { ButtonLink, Container, DisplayHeading, PageHeader, Row, Section, TextLink, withAmp } from "@/components/ui";
import { getService, services } from "@/content/services";

type Props = { params: Promise<{ slug: string }> };

const two = (n: number) => String(n).padStart(2, "0");

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

  const index = services.indexOf(service);
  const next = services[(index + 1) % services.length];

  return (
    <>
      <PageHeader
        title={service.name}
        lead={service.intro}
        photo={servicePhotos[service.icon]}
        kicker={
          <p className="eyebrow flex items-baseline gap-3 text-stone">
            <TextLink href="/services" size="inherit">
              Services
            </TextLink>
            <span aria-hidden="true" className="h-px w-8 -translate-y-1 bg-bronze" />
            <span className="tabular-nums">
              {two(index + 1)} of {two(services.length)}
            </span>
          </p>
        }
      >
        <ButtonLink href="/contact">Start an Inquiry</ButtonLink>
      </PageHeader>

      <Section title="What We Do">
        <LedgerList items={service.includes} numbered />
      </Section>

      <Section title="Not Covered">
        <LedgerList items={service.notIncluded} />
      </Section>

      <Section title="Good to Know">
        <div className="divide-y divide-line">
          {service.goodToKnow.map((item) => (
            <div key={item.title} className="py-7 first:pt-0 last:pb-0">
              <Row title={item.title}>{item.body}</Row>
            </div>
          ))}
        </div>
      </Section>

      {/* The four pages read as a series: the last leads back to the first. */}
      <section>
        <Container>
          <div className="rule pt-10 pb-20 sm:pb-28">
            <NextLink href={`/services/${next.slug}`} className="group on-scroll flex items-end justify-between gap-8">
              <div className="flex flex-col gap-5">
                <p className="eyebrow text-stone">Next service</p>
                <DisplayHeading size="lg">{withAmp(next.name)}</DisplayHeading>
              </div>
              <span
                aria-hidden="true"
                className="pb-2 text-2xl transition-transform duration-700 motion-safe:group-hover:translate-x-2 sm:text-3xl"
              >
                →
              </span>
            </NextLink>
          </div>
        </Container>
      </section>

      <CtaPanel />
    </>
  );
}
