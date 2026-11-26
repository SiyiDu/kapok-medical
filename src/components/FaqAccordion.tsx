"use client";

import { Accordion } from "@heroui/react";
import type { Faq } from "@/content/site-content";

/**
 * Questions set as lines of serif on hairlines. The negative margin takes back the padding of the first and last
 * rows, so the list starts level with a section heading and ends on the spacing of the section.
 */
export function FaqAccordion({ items }: { items: Faq[] }) {
  return (
    <Accordion className="-my-6 w-full sm:-my-7">
      {items.map((item) => (
        <Accordion.Item key={item.q} id={item.q}>
          <Accordion.Heading>
            <Accordion.Trigger className="display gap-6 px-0 py-6 text-[1.625rem] leading-[1.1] font-medium tracking-[-0.01em] hover:bg-transparent sm:py-7 sm:text-3xl sm:leading-[1.06] sm:font-normal sm:tracking-[-0.012em]">
              {item.q}
              {/* The class goes on the indicator, which clones its child and overwrites any class set there. */}
              <Accordion.Indicator className="faq-mark">
                <span />
              </Accordion.Indicator>
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body className="max-w-xl px-0 pb-8 text-base text-pretty">{item.a}</Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
