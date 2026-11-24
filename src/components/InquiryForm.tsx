"use client";

import { useState, type FormEvent } from "react";
import {
  Alert,
  Button,
  Card,
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
import { TextLink } from "./ui";

type Status = "idle" | "sending" | "sent" | "email" | "error";

const serviceOptions = [...services.map((s) => s.name), "Not sure yet"];
const cityOptions = ["No preference", "Shenzhen", "Guangzhou", "Another city in China"];

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
      <Alert status="success">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Thank You. We Have Your Inquiry.</Alert.Title>
          <Alert.Description>
            We reply by email within {site.replyTime}. If it is urgent, please don&apos;t wait for us: contact a
            doctor or your local emergency service.
          </Alert.Description>
        </Alert.Content>
      </Alert>
    );
  }

  return (
    <Card className="p-6 sm:p-8">
      <Form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="grid gap-6 sm:grid-cols-2">
          <TextField fullWidth isRequired autoComplete="name" name="name" variant="secondary">
            <Label>Full Name</Label>
            <Input />
            <FieldError />
          </TextField>
          <TextField fullWidth isRequired autoComplete="email" name="email" type="email" variant="secondary">
            <Label>Email</Label>
            <Input />
            <FieldError />
          </TextField>
          <TextField fullWidth autoComplete="country-name" name="country" variant="secondary">
            <Label>Travelling From</Label>
            <Input placeholder="Country" />
          </TextField>
          <TextField fullWidth name="dates" variant="secondary">
            <Label>Approximate Dates</Label>
            <Input placeholder="Mid-March, about 5 days" />
          </TextField>
          <Select fullWidth isRequired name="service" placeholder="Choose one" variant="secondary">
            <Label>What You Need</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <Options items={serviceOptions} />
            </Select.Popover>
            <FieldError />
          </Select>
          <Select fullWidth defaultValue={cityOptions[0]} name="city" variant="secondary">
            <Label>Preferred City</Label>
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
          <Label>What You Would Like to Arrange</Label>
          <TextArea rows={5} />
          <Description>
            A sentence or two is enough. Leave out medical records, ID numbers and payment details.
          </Description>
          <FieldError />
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
          <FieldError />
        </Checkbox>

        <div className="flex gap-3">
          <Button isPending={status === "sending"} type="submit">
            Send Inquiry
          </Button>
          <Button type="reset" variant="ghost">
            Clear
          </Button>
        </div>

        {status === "email" ? (
          <Alert>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Your Email App Should Have Opened</Alert.Title>
              <Alert.Description>
                The message is ready to send. If nothing opened, copy it and email {site.email}.
              </Alert.Description>
              <Button className="mt-2" size="sm" variant="outline" onPress={copyMessage}>
                {copied ? "Copied" : "Copy Message"}
              </Button>
            </Alert.Content>
          </Alert>
        ) : null}

        {status === "error" ? (
          <Alert status="danger">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>That Didn&apos;t Send</Alert.Title>
              <Alert.Description>Please try again, or email us at {site.email}.</Alert.Description>
            </Alert.Content>
          </Alert>
        ) : null}
      </Form>
    </Card>
  );
}
