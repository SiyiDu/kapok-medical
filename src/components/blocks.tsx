"use client";

import { Check, ChevronDown, Minus, Xmark } from "@gravity-ui/icons";
import { Accordion, Alert, Card } from "@heroui/react";
import type { Faq } from "@/content/site-content";

export function FaqAccordion({ items }: { items: Faq[] }) {
  return (
    <Accordion className="w-full">
      {items.map((item) => (
        <Accordion.Item key={item.q} id={item.q}>
          <Accordion.Heading>
            <Accordion.Trigger>
              {item.q}
              <Accordion.Indicator>
                <ChevronDown />
              </Accordion.Indicator>
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body>{item.a}</Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

const listIcons = {
  check: { Icon: Check, className: "text-success" },
  cross: { Icon: Xmark, className: "text-muted" },
  minus: { Icon: Minus, className: "text-muted" },
} as const;

export function IconList({
  title,
  items,
  icon,
}: {
  title?: string;
  items: string[];
  icon: keyof typeof listIcons;
}) {
  const { Icon, className } = listIcons[icon];
  return (
    <div className="flex flex-col gap-4">
      {title ? <h3 className="font-medium">{title}</h3> : null}
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-muted">
            <Icon aria-hidden="true" className={`mt-1 size-4 shrink-0 ${className}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function InfoCard({ title, subtitle, children }: { title: string; subtitle?: string; children: string }) {
  return (
    <Card className="h-full p-6">
      <Card.Header className="gap-1">
        <Card.Title className="text-base">{title}</Card.Title>
        {subtitle ? <Card.Description>{subtitle}</Card.Description> : null}
      </Card.Header>
      <Card.Content>
        <p className="text-sm text-muted">{children}</p>
      </Card.Content>
    </Card>
  );
}

export function EmergencyAlert() {
  return (
    <Alert status="danger">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>In an Emergency</Alert.Title>
        <Alert.Description>
          Don&apos;t use this form. In mainland China call 120. Elsewhere, call your local emergency number.
        </Alert.Description>
      </Alert.Content>
    </Alert>
  );
}
