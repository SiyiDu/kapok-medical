import type { Metadata } from "next";
import { ButtonLink, Container, DisplayHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page Not Found",
  // Next marks a missing page noindex by itself; the site-wide tag would only repeat it.
  robots: null,
  // A missing page has no address to share.
  openGraph: null,
  twitter: null,
};

export default function NotFound() {
  return (
    <section className="py-32 sm:py-48">
      <Container className="flex flex-col items-center gap-6 text-center">
        <p aria-hidden="true" className="display text-7xl text-bronze italic sm:text-8xl">
          404
        </p>
        <DisplayHeading as="h1" size="xl">
          This Page Doesn’t Exist
        </DisplayHeading>
        <p className="max-w-md text-stone">The link may be old or mistyped.</p>
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
