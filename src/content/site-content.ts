import { site } from "@/site.config";

export const steps = [
  {
    title: "Tell Us What You Need",
    body: "A short form. No medical records at this stage.",
  },
  {
    title: "Get a Written Plan",
    body: `We reply within ${site.replyTime} with hospital options, dates and every cost.`,
  },
  {
    title: "We Book and Meet You",
    body: "The appointment in your name, an airport meet-up and a companion if you want one.",
  },
];

export const fees = [
  {
    label: "Our fee",
    value: site.feeLabel.charAt(0).toUpperCase() + site.feeLabel.slice(1),
    body: "One flat fee per trip, agreed in writing first.",
  },
  {
    label: "Hospital bill",
    value: "Paid Directly",
    body: "You pay the hospital yourself. We add no markup.",
  },
  {
    label: "Travel costs",
    value: "At Cost",
    body: "Cars, hotels and tickets, with receipts. Companion time is quoted separately.",
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: `Is ${site.name} a hospital or a clinic?`,
    a: `No. ${site.name} is an independent coordination service. We book appointments, plan the trip and support you on the ground. All medical care is provided by licensed hospitals and doctors, and we don't give medical advice.`,
  },
  {
    q: "How much does it cost?",
    a: `Our coordination fee is ${site.feeLabel} per trip, confirmed in writing before you pay. The hospital's charges are separate and you pay them to the hospital directly. Travel costs such as cars, hotels and tickets are passed on at cost.`,
  },
  {
    q: "How do I pay the hospital?",
    a: "You pay the hospital yourself, at its own counters or in its app. Most hospitals accept Alipay and WeChat Pay, which can both be linked to an international Visa or Mastercard. We help you set that up before you travel and ask the hospital which other methods it accepts.",
  },
  {
    q: "Will my insurance cover it?",
    a: "International departments are generally self-pay, and China's public insurance does not apply. Some hospitals work with international commercial insurers. Ask your insurer what it covers abroad, and we will ask the hospital whether it can bill your insurer directly.",
  },
  {
    q: "Do the doctors speak English?",
    a: "It varies by hospital and by doctor. International departments usually have more English-speaking staff than general clinics. If you want to be sure nothing gets lost, book a visit companion and they will interpret for you.",
  },
  {
    q: "How far ahead should I contact you?",
    a: "Two to three weeks before you travel is ideal. Many hospitals only release appointments one to two weeks ahead, so the earlier we know your dates, the better placed we are when the slots open.",
  },
  {
    q: "Do I need a visa?",
    a: "It depends on your passport. China has widened visa-free entry and transit for many nationalities, but the rules change. Check the official guidance for your passport. We can't give immigration advice.",
  },
  {
    q: "Do clinics pay you commission?",
    a: "Our fee comes from you. If a clinic ever pays us a referral fee, we tell you in writing before you book, so you can weigh that when you choose.",
  },
  {
    q: "What if it's an emergency?",
    a: "Don't wait for us. In mainland China call 120 for an ambulance, or go to the nearest hospital emergency department. Outside China, call your local emergency number.",
  },
];

export const hospitalTypes = [
  {
    title: "International Departments",
    body: "Separate wings of large public hospitals: the same specialists, longer consultations, more English.",
  },
  {
    title: "International Hospitals",
    body: "Built around international patients, often with staff trained abroad.",
  },
  {
    title: "Private Dental Clinics",
    body: "Planned dental work. We check the clinic's licence before asking for a quote.",
  },
  {
    title: "Health-Checkup Centres",
    body: "A full screening, usually in a single morning.",
  },
];

export const hospitalExamples = [
  {
    name: "Shenzhen People's Hospital",
    city: "Shenzhen",
    note: "A major public hospital, on Guangdong's first list of pilot hospitals for international medical services (March 2026).",
  },
  {
    name: "The University of Hong Kong–Shenzhen Hospital",
    city: "Shenzhen",
    note: "Runs an International Medical Centre used by expatriates and visiting patients.",
  },
];
