import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/MarketingShell";
import { company } from "@/lib/company";
import { packages } from "@/lib/packages";

export const metadata: Metadata = {
  title: `Knee Replacement in India | ${company.brand}`,
  description:
    "Single and bilateral knee replacement package estimates in Hyderabad, India with international patient coordination.",
  alternates: { canonical: "/knee-replacement" },
};

const kneePackages = packages.filter((p) => p.joint === "knee");

export default function KneeReplacementPage() {
  return (
    <MarketingShell>
      <section className="hero">
        <div className="container heroGrid">
          <div className="heroCopy">
            <div className="eyebrow">KNEE REPLACEMENT • HYDERABAD, INDIA</div>
            <h1>
              Knee replacement
              <br />
              <span>options for international patients.</span>
            </h1>
            <p className="heroLead">
              Explore single and bilateral knee replacement package estimates with coordinated
              care in Hyderabad. Outcomes vary; specialist assessment required.
            </p>
            <Link className="primaryBtn" href="/consultation">
              Send medical reports →
            </Link>
            <p className="microcopy">
              Get a preliminary review, video consult option &amp; treatment plan.
            </p>
          </div>
          <div className="heroVisual">
            <div className="imageCard">
              <img
                src="/Single-Knee-Replacement.png"
                alt="Knee replacement treatment in Hyderabad"
              />
              <div className="visualBadge">
                <small>PACKAGE ESTIMATES FROM</small>
                <strong>USD 2,900</strong>
                <span>Single knee replacement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionHead">
            <div>
              <div className="eyebrow">KNEE PACKAGES</div>
              <h2>Knee replacement estimates</h2>
            </div>
            <p>Approximate figures only. Final confirmation follows specialist consultation.</p>
          </div>
          <div className="packageGrid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {kneePackages.map((p) => (
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
    </MarketingShell>
  );
}
