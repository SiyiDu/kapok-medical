import type { ReactNode } from "react";
import { site } from "@/site.config";
import { Container, DisplayHeading } from "./ui";

/** Long-form legal text, set with HeroUI's prose styles at a comfortable measure. */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="pt-16 pb-16 sm:pt-24 sm:pb-24">
      <Container>
        <div className="flex max-w-2xl flex-col gap-4">
          <DisplayHeading as="h1" size="lg">
            {title}
          </DisplayHeading>
          <p className="text-sm text-muted">Last updated {site.lastUpdated}</p>
          <div className="typography-prose mt-4 flex flex-col gap-4 text-muted [&_h2]:mt-6 [&_h2]:text-lg [&_h2]:font-medium [&_h2]:tracking-normal [&_h2]:text-foreground [&_ul]:my-0">
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}
