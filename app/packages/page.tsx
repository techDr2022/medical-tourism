import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/MarketingShell";
import { company } from "@/lib/company";
import { packageInclusions, packages } from "@/lib/packages";

export const metadata: Metadata = {
  title: `Joint Replacement Packages | ${company.brand}`,
  description:
    "Approximate knee and hip replacement package estimates in Hyderabad, India for international patients. Final confirmation follows specialist assessment.",
  alternates: { canonical: "/packages" },
};

export default function PackagesPage() {
  return (
    <MarketingShell>
      <section className="section">
        <div className="container">
          <div className="sectionHead">
            <div>
              <div className="eyebrow">ESTIMATED PACKAGE PRICES</div>
              <h1>Joint replacement packages</h1>
            </div>
            <p>
              Approximate estimates. Final confirmation follows specialist consultation and
              clinical assessment.
            </p>
          </div>

          <div className="packageGrid">
            {packages.map((p) => (
              <article className="package" key={p.name}>
                <div className="jointArt">
                  <img src={p.image} alt={p.name} />
                </div>
                <h3>{p.name}</h3>
                <div className="price">{p.price}</div>
                <div className="stay">
                  Hospital stay: <b>{p.stay}</b> in {p.note}
                </div>
                <Link href="/consultation">Check eligibility →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <div className="sectionHead">
            <div>
              <div className="eyebrow">PACKAGE DETAILS</div>
              <h2>Package inclusions</h2>
            </div>
          </div>
          <div className="includeGrid">
            {packageInclusions.map(([n, t, d]) => (
              <div className="include" key={n}>
                <span>{n}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="packageNotes">
            <div className="packageNote">
              <h3>Bilateral surgery packages</h3>
              <p>
                Bilateral packages cover both joints, with surgery performed in two separate
                stages. The stated hospital stay is the total included across both stages.
              </p>
            </div>
            <div className="packageNote warn">
              <h3>Please note</h3>
              <p>
                These are approximate package estimates. Final treatment plan and package
                confirmation follow specialist consultation and clinical assessment.
              </p>
            </div>
          </div>
          <p style={{ marginTop: 28 }}>
            <Link className="primaryBtn" href="/consultation">
              Request a treatment plan →
            </Link>
          </p>
        </div>
      </section>
    </MarketingShell>
  );
}
