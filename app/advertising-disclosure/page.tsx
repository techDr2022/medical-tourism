import type { Metadata } from "next";
import Link from "next/link";
import {
  company,
  companyLegalLine,
  companySignatoryLine,
} from "@/lib/company";

export const metadata: Metadata = {
  title: `Advertising Disclosure | ${company.brand}`,
  description: `Healthcare advertising disclosures for ${company.brand} Google Ads and marketing destinations.`,
};

export default function AdvertisingDisclosurePage() {
  return (
    <main className="legalPage">
      <div className="container legalInner">
        <p className="legalBack">
          <Link href="/">← Back to {company.brand}</Link>
        </p>
        <h1>Advertising Disclosure</h1>
        <p className="legalMeta">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <section>
          <h2>Advertiser identity</h2>
          <p>
            Ads and this website promote services offered under the brand{" "}
            {company.brand}. The advertiser / business operator is{" "}
            {companyLegalLine}. Authorized Signatory: {companySignatoryLine}.
          </p>
          <p>
            Registered address: {company.registeredAddress}. Website:{" "}
            <a href={company.websiteUrl}>{company.website}</a>. Contact:{" "}
            <a href={`mailto:${company.contactEmail}`}>{company.contactEmail}</a>.
            GSTIN: {company.gstin} · PAN: {company.pan} · TAN: {company.tan}.
          </p>
        </section>

        <section>
          <h2>Nature of the advertised service</h2>
          <p>
            {company.brand} provides international patient coordination and
            information about joint replacement treatment options in India. We
            are a medical tourism facilitation / coordination service. Clinical
            diagnosis, surgery, and hospital care are provided by treating
            hospitals and licensed specialists after appropriate assessment.
          </p>
          <p>
            This site does not operate an online pharmacy, does not sell
            prescription medicines online, and does not provide remote
            prescribing. Any pharmacy or consumables referenced in package
            descriptions relate only to in-hospital treatment under a confirmed
            clinical plan.
          </p>
        </section>

        <section>
          <h2>Pricing &amp; package statements</h2>
          <p>
            Package prices shown in ads or on this website are approximate
            estimates for planning purposes only. They are not final quotations,
            guaranteed prices, or offers of medical treatment. Final package
            confirmation depends on specialist consultation, clinical assessment,
            implant selection, investigations, and hospital policy. Additional
            stay or treatment beyond an agreed package may be charged separately.
          </p>
        </section>

        <section>
          <h2>No guaranteed medical outcomes</h2>
          <p>
            Individual results vary. Nothing on this website or in related ads
            guarantees pain elimination, surgical success, recovery time, or any
            specific clinical outcome. Suitability for joint replacement and
            expected results can be determined only by a qualified clinician.
          </p>
        </section>

        <section>
          <h2>Not medical advice</h2>
          <p>
            Content on this site is general information for international
            patients exploring treatment options. It is not medical advice,
            diagnosis, or a substitute for consultation with a licensed
            healthcare professional.
          </p>
        </section>

        <section>
          <h2>Privacy &amp; contact</h2>
          <p>
            Our <Link href="/privacy">Privacy Policy</Link> explains how enquiry
            data is used. Our <Link href="/terms">Terms of Service</Link>{" "}
            describe the contractual relationship. For advertising or compliance
            questions, contact {companySignatoryLine} at{" "}
            <a href={`mailto:${company.contactEmail}`}>{company.contactEmail}</a>.
          </p>
        </section>

        <section>
          <h2>Google Ads note</h2>
          <p>
            Campaigns for in-person healthcare facilitation are subject to
            Google Ads policies, including Healthcare and medicines (where
            applicable), Misrepresentation, and Destination requirements.
            Restricted categories such as online pharmacies, telemedicine
            prescribing, or prescription-drug advertising may require separate
            Google certification and are outside the scope of this site’s
            advertised service.
          </p>
        </section>
      </div>
    </main>
  );
}
