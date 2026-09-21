import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/MarketingShell";
import { company } from "@/lib/company";
import { supportServices } from "@/lib/packages";

export const metadata: Metadata = {
  title: `International Patient Support | ${company.brand}`,
  description:
    "Dedicated coordinator, airport transfers, interpreters and video consultation support for international joint replacement patients in Hyderabad.",
  alternates: { canonical: "/patient-support" },
};

export default function PatientSupportPage() {
  return (
    <MarketingShell>
      <section className="section">
        <div className="container">
          <div className="sectionHead">
            <div>
              <div className="eyebrow">INTERNATIONAL PATIENT SUPPORT</div>
              <h1>Coordinated care beyond the hospital</h1>
            </div>
            <p>
              Support services arranged by {company.brand} for international patients.
              Availability of video consultation depends on case suitability and specialist
              schedule.
            </p>
          </div>
          <div className="includeGrid supportGrid">
            {supportServices.map(([n, t, d]) => (
              <div className="include" key={n}>
                <span>{n}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="supportNote">
            *Video consultation is offered when appropriate after review of your reports and
            subject to specialist availability. It does not replace in-person clinical
            assessment before surgery.
          </p>
          <p style={{ marginTop: 28 }}>
            <Link className="primaryBtn" href="/consultation">
              Start your case review →
            </Link>
          </p>
        </div>
      </section>
    </MarketingShell>
  );
}
