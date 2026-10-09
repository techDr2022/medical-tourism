import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/MarketingShell";
import { NeuroCards } from "@/components/NeuroCards";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: `Neurosurgery in India | ${company.brand}`,
  description:
    "International coordination for spine and brain surgery cases in India. Plans follow specialist review of scans and reports.",
  alternates: { canonical: "/neurosurgery" },
};

export default function NeurosurgeryPage() {
  return (
    <MarketingShell>
      <section className="hero">
        <div className="container heroGrid">
          <div className="heroCopy">
            <div className="eyebrow">NEUROSURGERY • INDIA</div>
            <h1>
              Neurosurgery care
              <br />
              <span>with someone beside you.</span>
            </h1>
            <p className="heroLead">
              Share your scans when you are ready. A coordinator arranges a specialist
              review and explains the plan before you travel. Clinical decisions stay with
              the treating neurosurgeon.
            </p>
            <Link className="primaryBtn" href="/consultation">
              Send medical reports →
            </Link>
            <p className="microcopy">
              Pricing is confirmed after review. There is no fixed public package.
            </p>
          </div>
          <div className="heroVisual">
            <div className="imageCard">
              <img src="/banner.png" alt="Neurosurgery case coordination in India" />
              <div className="visualBadge">
                <small>PERSONAL PLAN</small>
                <strong>On request</strong>
                <span>Spine and brain surgery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionHead">
            <div>
              <div className="eyebrow">NEUROSURGERY CASES</div>
              <h2>What we coordinate</h2>
            </div>
            <p>Each case is planned individually after the treating specialist reviews it.</p>
          </div>
          <NeuroCards />
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
