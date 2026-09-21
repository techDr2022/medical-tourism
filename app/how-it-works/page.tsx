import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/MarketingShell";
import { company } from "@/lib/company";
import { journeySteps } from "@/lib/packages";

export const metadata: Metadata = {
  title: `How It Works | ${company.brand}`,
  description:
    "From medical reports to treatment: how international patients plan knee or hip replacement in Hyderabad with Medical Tours India.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <MarketingShell>
      <section className="journey section">
        <div className="container">
          <div className="sectionHead centered">
            <div>
              <div className="eyebrow">HOW IT WORKS</div>
              <h1>From medical reports to treatment</h1>
            </div>
          </div>
          <div className="steps">
            {journeySteps.map(([n, t, d]) => (
              <div className="step" key={n}>
                <b>{n}</b>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 36, textAlign: "center" }}>
            <Link className="primaryBtn" href="/consultation">
              Send your reports →
            </Link>
          </p>
        </div>
      </section>
    </MarketingShell>
  );
}
