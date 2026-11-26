import type { CSSProperties, ReactNode } from "react";
import { site } from "@/site.config";
import { Container, DisplayHeading } from "./ui";

/** Long-form legal text: the title holds the left third, the text runs down the content column. */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="pt-16 pb-24 sm:pt-24 sm:pb-32">
      <Container>
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <DisplayHeading as="h1" size="lg" className="enter">
              {title}
            </DisplayHeading>
            <p className="enter eyebrow text-stone" style={{ "--i": 1 } as CSSProperties}>
              Last updated {site.lastUpdated}
            </p>
          </div>
          <div
            className="enter legal min-w-0 lg:col-span-7 lg:col-start-6 lg:pt-1"
            style={{ "--i": 2 } as CSSProperties}
          >
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}
