import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { legalName, site } from "@/site.config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `What ${site.fullName} collects, why, and how to have it corrected or deleted.`,
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This policy explains what {site.fullName} (“{site.name}”, “we”) collects when you use this
        website or ask us to arrange a visit, and what we do with it. The service is operated by {legalName}.
      </p>

      <h2>What We Collect</h2>
      <ul>
        <li>
          <strong>Inquiry details.</strong> What you type into the inquiry form or send us by email or message: your
          name, email address, where you are travelling from, your dates and a short description of what you need.
        </li>
        <li>
          <strong>Booking details.</strong> If you decide to go ahead, the details a hospital needs to register you,
          such as your name as it appears in your passport, your date of birth and your passport number.
        </li>
        <li>
          <strong>Health information.</strong> Only what you choose to share so that we can book the right
          department. We don’t ask for full medical records unless a hospital or clinic requires them for your
          booking.
        </li>
      </ul>

      <h2>How We Use It</h2>
      <ul>
        <li>To reply to your inquiry.</li>
        <li>To book appointments, transport and accommodation that you ask us to arrange.</li>
        <li>To keep basic records of what we arranged and what you paid us.</li>
      </ul>
      <p>We don’t sell your information, and we don’t use it for advertising.</p>

      <h2>Who We Share It With</h2>
      <p>
        Only the hospitals, clinics, drivers and hotels involved in the visit you asked us to arrange, and only what
        each of them needs. We ask you before sharing health information or identity documents with anyone.
      </p>

      <h2>Cookies and Tracking</h2>
      <p>
        This website doesn’t use advertising or analytics cookies. If that changes, we will update this page
        and ask for your consent where the law requires it.
      </p>
      <p>
        The photographs on this site are loaded from Unsplash’s image servers, which receive your IP address when a
        page loads.
      </p>

      <h2>How Long We Keep It</h2>
      <p>
        Inquiries that don’t lead to a booking are deleted within 12 months. Booking records are kept for as
        long as the law requires us to keep business records, and then deleted.
      </p>

      <h2>Your Choices</h2>
      <p>
        You can ask us for a copy of the information we hold about you, ask us to correct it, or ask us to delete
        it. Email <a href={`mailto:${site.email}`}>{site.email}</a> and we will act on your request.
      </p>

      <h2>Sending Information Across Borders</h2>
      <p>
        We are based in mainland China, and the hospitals we book are in China. Using the service means your
        information is handled there.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy: <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
