import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/MarketingShell";
import { NeuroCards } from "@/components/NeuroCards";
import { company } from "@/lib/company";
import { spineCases } from "@/lib/focus";

export const metadata: Metadata = {
  title: `Spine Surgery in India | ${company.brand}`,
  description:
    "International coordination for spine surgery in India, including slipped disc, spinal stenosis, and spinal fusion. Plans follow specialist review of scans.",
  alternates: { canonical: "/spine-surgery" },
};

export default function SpineSurgeryPage() {
  return (
    <MarketingShell>
      <section className="hero">
        <div className="container heroGrid">
          <div className="heroCopy">
            <div className="eyebrow">SPINE SURGERY • INDIA</div>
            <h1>
              Spine surgery
              <br />
              <span>planned around your scans.</span>
            </h1>
            <p className="heroLead">
              Share your MRI when you are ready. A coordinator arranges a specialist review
              and explains the hospital plan before you travel. Clinical decisions stay with
              the treating surgeon.
            </p>
            <Link className="primaryBtn" href="/consultation">
              Send medical reports →
            </Link>
            <p className="microcopy">
              Hospital and cost details are confirmed after review. There is no fixed public
              package.
            </p>
          </div>
          <div className="heroVisual">
            <div className="imageCard">
              <img src="/neurology.jpg" alt="Spine surgery coordination in India" />
              <div className="visualBadge">
                <small>PERSONAL PLAN</small>
                <strong>On request</strong>
                <span>Spine surgery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionHead">
            <div>
              <div className="eyebrow">SPINE SURGERY</div>
              <h2>Procedures we coordinate</h2>
            </div>
            <p>Each case is planned individually after the treating specialist reviews it.</p>
          </div>
          <NeuroCards cases={spineCases} />
          <p style={{ marginTop: 28 }}>
            <Link className="primaryBtn" href="/consultation">
              Request a treatment plan →
            </Link>
          </p>
          <p style={{ marginTop: 16 }}>
            <Link href="/neurosurgery">Brain surgery is reviewed separately →</Link>
          </p>
        </div>
      </section>
    </MarketingShell>
  );
}
