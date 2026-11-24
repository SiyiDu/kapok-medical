import type { Metadata } from "next";
import { ButtonLink, Container, DisplayHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="flex flex-col items-center gap-4 text-center">
        <p className="text-sm text-muted tabular-nums">404</p>
        <DisplayHeading as="h1" size="lg">
          This Page Doesn&apos;t Exist
        </DisplayHeading>
        <p className="max-w-md text-muted">The link may be old or mistyped.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Home</ButtonLink>
          <ButtonLink href="/services" variant="outline">
            Services
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
