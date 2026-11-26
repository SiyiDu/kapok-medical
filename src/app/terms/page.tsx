import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { legalName, site } from "@/site.config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms on which ${site.fullName} provides its coordination service.`,
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <p>
        These terms apply when you use this website or ask {site.fullName} (“{site.name}”, “we”)
        to arrange something for you. The service is operated by {legalName}.
      </p>

      <h2>What We Do</h2>
      <p>
        We are a coordination service. We book appointments in your name, plan travel and provide in-person,
        non-medical support. We are not a hospital, a clinic or a medical provider, and we don’t give medical
        advice. See the <Link href="/disclaimer">medical disclaimer</Link>.
      </p>

      <h2>Hospitals and Other Providers</h2>
      <p>
        Medical care is provided by the hospital or clinic you attend, under its own terms. Transport and
        accommodation are provided by the companies that operate them. We are not responsible for their services,
        their decisions or their charges. Hospitals control their own schedules, so we can’t guarantee a
        particular doctor, date or outcome.
      </p>

      <h2>Fees and Payment</h2>
      <ul>
        <li>Our coordination fee is confirmed to you in writing before you pay it.</li>
        <li>Hospital and clinic charges are paid by you, directly to the hospital or clinic.</li>
        <li>Travel costs we book for you are passed on at cost, with receipts.</li>
        <li>If we receive a referral fee from a clinic, we tell you in writing before you book.</li>
      </ul>

      <h2>Cancellations and Refunds</h2>
      <p>[Cancellation and refund terms to be confirmed before launch.]</p>

      <h2>Your Part</h2>
      <p>
        Give us accurate information, including your name exactly as it appears in your passport. Check the entry
        rules for your nationality and arrange your own travel and medical insurance. Tell us promptly if your plans
        change.
      </p>

      <h2>Liability</h2>
      <p>
        We take care in arranging your visit. To the extent the law allows, we are not liable for the acts or
        omissions of hospitals, clinics, doctors or travel providers, or for losses that we could not reasonably
        have foreseen.
      </p>

      <h2>Governing Law</h2>
      <p>[Governing law and dispute resolution to be confirmed before launch.]</p>

      <h2>Changes</h2>
      <p>
        We may update these terms. The date at the top of this page shows the latest version. Changes don’t
        apply to bookings already confirmed.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
