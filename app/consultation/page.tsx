import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { MarketingShell } from "@/components/MarketingShell";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: `Free Consultation | ${company.brand}`,
  description:
    "Request a free joint replacement treatment review for international patients. Send reports for preliminary options in Hyderabad, India.",
  alternates: { canonical: "/consultation" },
};

export default function ConsultationPage() {
  return (
    <MarketingShell>
      <section className="leadSection">
        <div className="container leadGrid">
          <div>
            <div className="eyebrow light">START YOUR CASE REVIEW</div>
            <h1>Know your treatment options before you travel.</h1>
            <p>
              Send your medical details and your dedicated coordinator can help with next
              steps, expected stay, package options and — when suitable — a video consultation
              before travel.
            </p>
            <div className="secure">
              🔒 Your information is used for patient coordination and enquiry handling.
            </div>
          </div>
          <LeadForm />
        </div>
      </section>
    </MarketingShell>
  );
}
