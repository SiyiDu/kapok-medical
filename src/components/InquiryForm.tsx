"use client";

import { useState, type FormEvent } from "react";
import {
  Alert,
  Button,
  Checkbox,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
  TextField,
} from "@heroui/react";
import { services } from "@/content/services";
import { site } from "@/site.config";
import { rowTitle, TextLink } from "./ui";

type Status = "idle" | "sending" | "sent" | "email" | "error";

const serviceOptions = [...services.map((s) => s.name), "Not sure yet"];
const cityOptions = ["No preference", "Shenzhen", "Guangzhou", "Another city in China"];

/* Status messages are ruled notes on the paper, set like the rows beside the form. */
const note = "gap-0 rounded-none bg-transparent shadow-none";
const ruledNote = `${note} border-t border-ink px-0 pt-6 pb-0`;

/**
 * Brings a message into view when it appears. The thank-you note replaces the form, so without this it would be
 * left above the fold.
 */
function reveal(node: HTMLElement | null) {
  node?.scrollIntoView({ block: "nearest" });
}

function compose(data: Record<string, string>) {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Travelling from: ${data.country || "-"}`,
    `Needs help with: ${data.service}`,
    `Preferred city: ${data.city}`,
    `Approximate dates: ${data.dates || "-"}`,
    "",
    data.message || "",
  ].join("\n");
}

function Options({ items }: { items: string[] }) {
  return (
    <ListBox>
      {items.map((item) => (
        <ListBox.Item key={item} id={item} textValue={item}>
          {item}
          <ListBox.ItemIndicator />
        </ListBox.Item>
      ))}
    </ListBox>
  );
}

export function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data: Record<string, string> = {};
    new FormData(form).forEach((value, key) => {
      data[key] = value.toString();
    });

    // Bots fill hidden fields; people never see this one.
    if (data.company) return;
    delete data.company;

    const text = compose(data);
    setMessage(text);

    if (site.formEndpoint) {
      setStatus("sending");
      try {
        const res = await fetch(site.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        form.reset();
        setStatus("sent");
      } catch {
        setStatus("error");
      }
      return;
    }

    const subject = encodeURIComponent(`Inquiry from ${data.name}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${encodeURIComponent(text)}`;
    setStatus("email");
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (status === "sent") {
    return (
      <Alert ref={reveal} role="status" className={`${note} p-0`}>
        <Alert.Content>
          <Alert.Title className="display text-4xl leading-[1.06] tracking-[-0.012em] sm:text-5xl sm:leading-[1.02] sm:tracking-[-0.018em]">
            Thank You
          </Alert.Title>
          <Alert.Description className="mt-5 max-w-md text-base text-pretty">
            We have your inquiry and will reply by email within {site.replyTime}. If it is urgent, please don’t wait
            for us: contact a doctor or your local emergency service.
          </Alert.Description>
        </Alert.Content>
      </Alert>
    );
  }

  return (
    <Form className="inquiry flex flex-col gap-9" onSubmit={onSubmit}>
      <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
        <TextField fullWidth isRequired autoComplete="name" name="name" variant="secondary">
          <Label>Full name</Label>
          <Input />
          <FieldError>Please enter your name.</FieldError>
        </TextField>
        <TextField fullWidth isRequired autoComplete="email" name="email" type="email" variant="secondary">
          <Label>Email</Label>
          <Input />
          <FieldError>
            {({ validationDetails }) =>
              validationDetails.valueMissing ? "Please enter your email address." : "Please enter a valid email address."
            }
          </FieldError>
        </TextField>
        <TextField fullWidth autoComplete="country-name" name="country" variant="secondary">
          <Label>Travelling from (optional)</Label>
          <Input placeholder="Country" />
        </TextField>
        <TextField fullWidth name="dates" variant="secondary">
          <Label>Approximate dates (optional)</Label>
          <Input placeholder="Mid-March, about 5 days" />
        </TextField>
        <Select fullWidth isRequired name="service" placeholder="Choose one" variant="secondary">
          <Label>Service</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <Options items={serviceOptions} />
          </Select.Popover>
          <FieldError>Please choose one.</FieldError>
        </Select>
        <Select fullWidth defaultValue={cityOptions[0]} name="city" variant="secondary">
          <Label>Preferred city</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <Options items={cityOptions} />
          </Select.Popover>
        </Select>
      </div>

      <TextField fullWidth isRequired name="message" variant="secondary">
        <Label>Your message</Label>
        <TextArea rows={4} />
        <Description>A sentence or two is enough. Leave out medical records, ID numbers and payment details.</Description>
        <FieldError>Please tell us what you need, in a sentence or two.</FieldError>
      </TextField>

      {/* Honeypot */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="company">Company</label>
        <input autoComplete="off" id="company" name="company" tabIndex={-1} type="text" />
      </div>

      <Checkbox isRequired name="consent" value="yes" variant="secondary">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          I agree to be contacted about this inquiry
        </Checkbox.Content>
        <Description>
          See how we handle your details in the <TextLink href="/privacy">privacy policy</TextLink>.
        </Description>
        <FieldError>Please tick this so we can reply.</FieldError>
      </Checkbox>

      {/* w-fit, not w-auto: the form is a flex column and would stretch the button. The minimum holds its width while it says "Sending…". */}
      <Button
        isPending={status === "sending"}
        type="submit"
        className="btn btn-primary h-12 w-full rounded-none px-8 text-[0.8125rem] tracking-[0.04em] sm:w-fit sm:min-w-38"
      >
        {({ isPending }) => (isPending ? "Sending…" : "Send Inquiry")}
      </Button>

      {status === "email" ? (
        <Alert ref={reveal} role="status" className={ruledNote}>
          <Alert.Content>
            <Alert.Title className={rowTitle}>Check Your Email App</Alert.Title>
            <Alert.Description className="mt-2 text-base text-pretty">
              The message is ready to send. If nothing opened, copy it and email {site.email}.
            </Alert.Description>
            <Button
              variant="ghost"
              className="link-under mt-4 h-auto rounded-none px-0 text-sm font-normal"
              onPress={copyMessage}
            >
              {copied ? "Copied" : "Copy Message"}
            </Button>
          </Alert.Content>
        </Alert>
      ) : null}

      {status === "error" ? (
        <Alert ref={reveal} role="alert" status="danger" className={ruledNote}>
          <Alert.Content>
            <Alert.Title className={rowTitle}>Not Sent</Alert.Title>
            <Alert.Description className="mt-2 text-base text-pretty">
              Please try again, or email us at {site.email}.
            </Alert.Description>
          </Alert.Content>
        </Alert>
      ) : null}
    </Form>
  );
}
