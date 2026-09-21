"use client";

import Link from "next/link";
import {
  company,
  companyLegalLine,
  companySignatoryLine,
} from "@/lib/company";
import { getWhatsappHref, trackClick } from "@/components/LeadForm";

export function MarketingShell({ children }: { children: React.ReactNode }) {
  const whatsappHref = getWhatsappHref();

  return (
    <main>
      <header className="siteHeader">
        <div className="topbar">
          {company.website} • International Patient Care • {company.cityLabel}
        </div>
        <nav className="nav container">
          <Link className="brand" href="/">
            <img className="brandLogo" src="/logo.png" alt={company.brand} />
          </Link>
          <Link
            className="navCta"
            href="/consultation"
            onClick={() => trackClick("cta_click")}
          >
            Get Treatment Plan
          </Link>
        </nav>
      </header>

      {children}

      <footer>
        <div className="container footerInner">
          <div className="footerBrand">
            <img className="brandLogo footerLogo" src="/logo.png" alt={company.brand} />
            <p>
              International patient coordination for joint replacement treatment in
              Hyderabad, India.
            </p>
            <p className="footerLegal">
              {companyLegalLine}
              <br />
              Authorized Signatory: {companySignatoryLine}
            </p>
            <p className="footerAddress">{company.registeredAddress}</p>
            <p className="footerIds">
              GSTIN: {company.gstin} · PAN: {company.pan} · TAN: {company.tan}
            </p>
          </div>
          <div className="footerMeta">
            <strong>Ready to start?</strong>
            <Link href="/consultation" onClick={() => trackClick("footer_cta_click")}>
              Get Treatment Plan →
            </Link>
            <span>{company.cityLabel}</span>
            <a href={`mailto:${company.contactEmail}`}>{company.contactEmail}</a>
            <div className="footerLinks">
              <Link href="/packages">Packages</Link>
              <Link href="/knee-replacement">Knee</Link>
              <Link href="/hip-replacement">Hip</Link>
              <Link href="/patient-support">Patient Support</Link>
              <Link href="/how-it-works">How It Works</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/advertising-disclosure">Advertising Disclosure</Link>
            </div>
          </div>
        </div>
        <div className="adsDisclaimer">
          <div className="container">
            <p>
              <strong>Healthcare advertising notice:</strong> {company.brand} is a medical
              tourism coordination service operated by {company.legalEntity} (
              {company.tradeName}). Package prices are estimates only. Content is not medical
              advice and does not guarantee clinical outcomes. Treatment is provided by
              hospitals and licensed specialists after assessment. See our{" "}
              <Link href="/advertising-disclosure">Advertising Disclosure</Link>.
            </p>
          </div>
        </div>
        <div className="footerBase">
          <div className="container footerBaseInner">
            <span>
              © {new Date().getFullYear()} {company.brand} · {company.tradeName} ·{" "}
              {company.website}
            </span>
            <span>
              Package estimates only • Specialist confirmation required • No outcome guarantees
            </span>
          </div>
        </div>
      </footer>

      <a
        className="floatingWhatsApp"
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackClick("whatsapp_click")}
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path
            fill="currentColor"
            d="M19.11 17.4c-.28-.14-1.64-.81-1.9-.9-.25-.1-.44-.14-.62.14-.18.28-.71.9-.87 1.08-.16.18-.32.2-.6.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.38-1.64-1.54-1.92-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.1-.18.05-.35-.02-.49-.07-.14-.62-1.49-.85-2.04-.22-.53-.45-.46-.62-.47h-.53c-.18 0-.48.07-.73.35-.25.28-.96.94-.96 2.3s.98 2.67 1.12 2.85c.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.57.65.21 1.25.18 1.72.11.52-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.11-.25-.18-.53-.32z"
          />
          <path
            fill="currentColor"
            d="M16.04 3C9.4 3 4 8.4 4 15.04c0 2.12.56 4.18 1.63 6L4 29l8.12-1.6a12 12 0 0 0 5.92 1.52C25.68 28.92 31 23.52 31 16.88 31 10.24 25.68 3 16.04 3zm0 23.4a10.4 10.4 0 0 1-5.3-1.45l-.38-.22-4.82.95.98-4.7-.25-.4a10.4 10.4 0 1 1 9.77 5.82z"
          />
        </svg>
        <span>WhatsApp</span>
      </a>
    </main>
  );
}
