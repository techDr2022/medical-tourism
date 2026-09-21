import type { Metadata } from "next";
import Link from "next/link";
import {
  company,
  companyLegalLine,
  companySignatoryLine,
} from "@/lib/company";

export const metadata: Metadata = {
  title: `Privacy Policy | ${company.brand}`,
  description: `Privacy policy for ${company.brand}, operated by ${company.legalEntity}.`,
};

export default function PrivacyPage() {
  return (
    <main className="legalPage">
      <div className="container legalInner">
        <p className="legalBack">
          <Link href="/">← Back to {company.brand}</Link>
        </p>
        <h1>Privacy Policy</h1>
        <p className="legalMeta">
          Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <section>
          <h2>Who we are</h2>
          <p>
            {company.brand} is operated by {companyLegalLine}. Authorized
            Signatory: {companySignatoryLine}. Registered address:{" "}
            {company.registeredAddress}. Website: {company.website}. Contact:{" "}
            <a href={`mailto:${company.contactEmail}`}>{company.contactEmail}</a>.
          </p>
          <p>
            GSTIN: {company.gstin} · PAN: {company.pan} · TAN: {company.tan}
          </p>
        </section>

        <section>
          <h2>Information we collect</h2>
          <p>
            When you submit an enquiry, we may collect your name, country,
            WhatsApp number, preferred treatment, travel timeline, message, and
            any medical reports you choose to upload. We also use Google
            reCAPTCHA to help protect the form from abuse.
          </p>
        </section>

        <section>
          <h2>How we use your information</h2>
          <p>
            We use enquiry details to respond to treatment requests, coordinate
            international patient support, and communicate about package
            estimates and next steps. We do not sell personal information.
          </p>
        </section>

        <section>
          <h2>Sharing</h2>
          <p>
            Relevant clinical and contact details may be shared with partner
            hospitals, specialists, or service providers only as needed to
            evaluate or coordinate your treatment request.
          </p>
        </section>

        <section>
          <h2>Data retention &amp; security</h2>
          <p>
            We retain enquiry information for as long as reasonably necessary to
            handle your request and related follow-up. Reasonable administrative
            and technical safeguards are used to protect submitted information.
          </p>
        </section>

        <section>
          <h2>Your choices</h2>
          <p>
            To access, correct, or request deletion of enquiry information, email{" "}
            <a href={`mailto:${company.contactEmail}`}>{company.contactEmail}</a>.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            For privacy questions, contact {companySignatoryLine} at{" "}
            <a href={`mailto:${company.contactEmail}`}>{company.contactEmail}</a>{" "}
            or write to the registered address above.
          </p>
        </section>
      </div>
    </main>
  );
}
