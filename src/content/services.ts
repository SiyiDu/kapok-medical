export type ServiceIconName = "calendar" | "plane" | "comments" | "list";

export type Service = {
  slug: string;
  icon: ServiceIconName;
  name: string;
  summary: string;
  intro: string;
  includes: string[];
  notIncluded: string[];
  goodToKnow: { title: string; body: string }[];
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "hospital-appointments",
    icon: "calendar",
    name: "Hospital Appointments",
    summary:
      "Booked in your name, confirmed in English.",
    intro:
      "Chinese hospitals take bookings through Chinese-language apps tied to a local phone number. We make the booking for you, in your name.",
    includes: [
      "A shortlist of suitable hospitals and departments",
      "Booking in your name through the hospital’s official channels",
      "Written confirmation in English: date, time, building and what to bring",
      "Questions put to the hospital for you, such as languages, insurance and payment methods",
      "Rebooking help if your travel dates change",
    ],
    notIncluded: [
      "Medical advice, a diagnosis or a recommendation on treatment",
      "The hospital’s own charges, which you pay to the hospital directly",
      "A guarantee of a particular doctor or date, because availability is set by the hospital",
    ],
    goodToKnow: [
      {
        title: "International Departments",
        body: "Many large Chinese hospitals run a separate international or VIP department, with longer consultations, shorter waits and more English spoken. The hospital sets the prices, and they are higher than in its general clinics.",
      },
      {
        title: "Short Booking Windows",
        body: "Hospitals often release appointments only one to two weeks ahead. Contact us earlier than that, so we are ready when the slots open.",
      },
      {
        title: "What We Need from You",
        body: "Your name as printed in your passport, your date of birth and a short description of why you want to be seen. We ask for passport details only once you decide to go ahead, and never through the website form.",
      },
    ],
    metaDescription:
      "We book appointments for international patients at hospital international departments in Shenzhen and Guangzhou, and confirm everything in English.",
  },
  {
    slug: "arrival-and-travel",
    icon: "plane",
    name: "Arrival & Travel",
    summary:
      "Airport meet-up, hotel, trains and mobile payments.",
    intro:
      "We plan the trip around your appointment and meet you when you arrive.",
    includes: [
      "A meet-up at the airport or border crossing, and a ride to your hotel",
      "Hotel suggestions within easy reach of the hospital",
      "High-speed rail and flight bookings inside China",
      "A walkthrough for setting up Alipay or WeChat Pay with a foreign card",
      "A one-page trip sheet with every address in English and Chinese",
    ],
    notIncluded: [
      "The cost of the car, hotel and tickets, which is passed on at cost with receipts",
      "Visa or immigration advice (we point you to the official sources)",
      "Travel or medical insurance",
    ],
    goodToKnow: [
      {
        title: "Entry Rules",
        body: "China has widened visa-free entry and transit for many passports, but the rules differ by nationality and they change. Check the official guidance for your passport before you book.",
      },
      {
        title: "Paying in China",
        body: "Most everyday payments run through Alipay and WeChat Pay. Both can be linked to an international Visa or Mastercard, and we walk you through the setup before you travel.",
      },
      {
        title: "Coming via Hong Kong",
        body: "Many visitors to Shenzhen arrive through Hong Kong. We can meet you on the Shenzhen side of the crossing.",
      },
    ],
    metaDescription:
      "Airport pickup, hotel and train bookings, and mobile payment setup for international patients travelling to Shenzhen and Guangzhou for medical care.",
  },
  {
    slug: "visit-companion",
    icon: "comments",
    name: "Visit Companion",
    summary:
      "An English speaker with you, from registration to pharmacy.",
    intro:
      "Large Chinese hospitals are fast, busy and signposted in Chinese. A companion stays with you from registration to the pharmacy.",
    includes: [
      "Meeting you at the hospital entrance or your hotel",
      "Help with registration, payment counters and finding each department",
      "Everyday interpreting between you and hospital staff",
      "Collecting reports, prescriptions and receipts before you leave",
      "Booking a follow-up visit if the doctor asks for one",
    ],
    notIncluded: [
      "Certified medical interpreting or translation of records (we can help you arrange a certified service)",
      "Opinions on your diagnosis or treatment, which are for your doctor",
      "Nursing or personal care",
    ],
    goodToKnow: [
      {
        title: "Your Consultation Stays Yours",
        body: "Your companion interprets, and takes notes if you want them to. You can ask them to step out at any point.",
      },
      {
        title: "Quoted by the Half-Day",
        body: "Companion time is quoted by the half-day, separately from the coordination fee and before you travel.",
      },
      {
        title: "Privacy",
        body: "Companions don’t keep copies of your reports. Anything you share with us is used only to arrange your visit.",
      },
    ],
    metaDescription:
      "An English-speaking companion for your hospital visit in China: registration, interpreting, payment counters, pharmacy and paperwork.",
  },
  {
    slug: "dental-and-checkups",
    icon: "list",
    name: "Dental & Checkups",
    summary:
      "Written quotes from licensed clinics, compared side by side.",
    intro:
      "The easiest care to plan around a trip. We collect written quotes, lay them side by side and book the one you choose.",
    includes: [
      "Written quotes from licensed clinics, itemised where the clinic provides it",
      "A plain comparison: what is included, how many visits and how many days",
      "Booking and scheduling around your travel dates",
      "Checkup packages arranged for a single morning where possible",
      "Help getting your records and images to take home",
    ],
    notIncluded: [
      "A clinical assessment, because the dentist or doctor makes the treatment plan after examining you",
      "A guarantee of outcome (ask the clinic about its own warranty terms)",
      "Emergency dental care",
    ],
    goodToKnow: [
      {
        title: "Quotes Can Change",
        body: "A remote quote is an estimate based on what you send. The dentist confirms the plan and the price after seeing you in person.",
      },
      {
        title: "How We Are Paid",
        body: "You pay us the coordination fee. If a clinic pays us a referral fee, we tell you in writing before you book.",
      },
      {
        title: "Plan Enough Days",
        body: "Crowns, veneers and implants often need more than one visit. We tell you how many days the clinic expects before you buy tickets.",
      },
    ],
    metaDescription:
      "Compare written quotes from licensed dental clinics and health-checkup centres in Shenzhen and Guangzhou before you travel.",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
