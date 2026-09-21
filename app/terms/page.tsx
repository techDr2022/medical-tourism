import type { Metadata } from "next";
import Link from "next/link";
import {
  company,
  companyLegalLine,
  companySignatoryLine,
} from "@/lib/company";

export const metadata: Metadata = {
  title: `Terms of Service | ${company.brand}`,
  description: `Terms of service for ${company.brand}, operated by ${company.legalEntity}.`,
};

export default function TermsPage() {
  return (
    <main className="legalPage">
      <div className="container legalInner">
        <p className="legalBack">
          <Link href="/">← Back to {company.brand}</Link>
        </p>
        <h1>Terms of Service</h1>
        <p className="legalMeta">
          Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <section>
          <h2>Contracting party</h2>
          <p>
            These terms apply to use of {company.website} and related services
            offered under the brand {company.brand}. The contracting party is{" "}
            {companyLegalLine}. Authorized Signatory: {companySignatoryLine}.
          </p>
          <p>
            Registered address: {company.registeredAddress}. GSTIN:{" "}
            {company.gstin} · PAN: {company.pan} · TAN: {company.tan}.
          </p>
        </section>

        <section>
          <h2>Nature of services</h2>
          <p>
            {company.brand} provides international patient coordination and
            information about joint replacement treatment options in India.
            Package figures shown on the website are approximate estimates only
            and are not a final quotation, diagnosis, or medical advice.
          </p>
        </section>

        <section>
          <h2>Medical confirmation</h2>
          <p>
            Final treatment plans, implant selection, clinical suitability, and
            pricing require specialist consultation and hospital confirmation.
            Additional stay, investigations, or treatment beyond an agreed
            package may be charged separately by the treating facility.
          </p>
        </section>

        <section>
          <h2>No doctor–patient relationship by enquiry alone</h2>
          <p>
            Submitting an enquiry or uploading reports does not by itself create
            a doctor–patient relationship. Clinical care is provided by the
            treating hospital and specialists after appropriate assessment.
          </p>
        </section>

        <section>
          <h2>Accuracy of information you provide</h2>
          <p>
            You are responsible for ensuring that personal, contact, and medical
            information submitted through the site is accurate and complete to
            the best of your knowledge.
          </p>
        </section>

        <section>
          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, {company.legalEntity}{" "}
            ({company.tradeName}) is not liable for clinical outcomes, travel
            decisions, or third-party hospital/provider services based solely on
            website estimates or preliminary coordination.
          </p>
        </section>

        <section>
          <h2>Advertising &amp; healthcare claims</h2>
          <p>
            Marketing materials and this website must be read with our{" "}
            <Link href="/advertising-disclosure">Advertising Disclosure</Link>.
            Prices are estimates; outcomes are not guaranteed; and clinical care
            is delivered by treating facilities and licensed specialists.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions about these terms:{" "}
            <a href={`mailto:${company.contactEmail}`}>{company.contactEmail}</a>{" "}
            · {companySignatoryLine}.
          </p>
        </section>
      </div>
    </main>
  );
}
