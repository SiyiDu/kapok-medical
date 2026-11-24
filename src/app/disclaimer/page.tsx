import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "Medical disclaimer",
  description: `${site.fullName} is a coordination service, not a medical provider. Nothing on this site is medical advice.`,
  alternates: { canonical: "/disclaimer/" },
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Medical Disclaimer">
      <p>
        <strong>{site.fullName} is not a medical provider.</strong> We are an independent coordination service. We
        don&apos;t employ doctors, and we don&apos;t diagnose, treat or advise on any medical condition.
      </p>

      <h2>No medical advice</h2>
      <p>
        Nothing on this website, and nothing our team says or writes, is medical advice. Information here is general
        and may not apply to you. Decisions about your health should be made with a licensed doctor who has examined
        you.
      </p>

      <h2>Emergencies</h2>
      <p>
        Don&apos;t use this website or contact us in an emergency. In mainland China call <strong>120</strong> for an
        ambulance, or go to the nearest hospital emergency department. Elsewhere, call your local emergency number.
      </p>

      <h2>Hospitals and clinics</h2>
      <p>
        We are not affiliated with, endorsed by or an agent of any hospital or clinic named on this website. Care is
        provided by the hospital or clinic you attend, which is responsible for it. We don&apos;t guarantee the
        result of any consultation, test or treatment.
      </p>

      <h2>Prices and availability</h2>
      <p>
        Hospital prices, appointment availability and entry rules change. Anything we tell you about them is given
        in good faith from what the hospital or official source has published, and should be confirmed before you
        travel.
      </p>

      <h2>Travel</h2>
      <p>
        Travelling for medical care carries its own risks. Speak to your own doctor before you travel, and make sure
        your insurance covers the trip and the care you plan to receive.
      </p>
    </LegalPage>
  );
}
