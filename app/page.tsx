"use client";

import { FormEvent, useState } from "react";

const packages = [
  {
    name: "Single Knee Replacement",
    price: "USD 2,900",
    stay: "3 days",
    note: "single room",
    image: "/Single-Knee-Replacement.png",
  },
  {
    name: "Bilateral Knee Replacement",
    price: "USD 5,000",
    stay: "6 days total",
    note: "single room • two stages",
    image: "/Bilateral-Knee-Replacement.png",
  },
  {
    name: "Single Hip Replacement",
    price: "USD 3,500",
    stay: "4 days",
    note: "single room",
    image: "/Single-Hip-Replacement.png",
  },
  {
    name: "Bilateral Hip Replacement",
    price: "USD 6,500",
    stay: "6 days total",
    note: "single room • two stages",
    image: "/Bilateral-Hip-Replacement.png",
  },
];

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
const whatsappHref = whatsappNumber
  ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
      "Hello Medical Tourism, I am interested in joint replacement treatment."
    )}`
  : `https://wa.me/?text=${encodeURIComponent(
      "Hello Medical Tourism, I am interested in joint replacement treatment."
    )}`;

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
    gtag?: (...args: unknown[]) => void;
  }
}

function track(eventName: string) {
  if (typeof window !== "undefined") {
    window.gtag?.("event", eventName);
  }
}

async function getRecaptchaToken(action: string) {
  if (!recaptchaSiteKey || !window.grecaptcha) return null;

  return new Promise<string>((resolve, reject) => {
    window.grecaptcha!.ready(() => {
      window
        .grecaptcha!.execute(recaptchaSiteKey, { action })
        .then(resolve)
        .catch(reject);
    });
  });
}

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    try {
      if (recaptchaSiteKey) {
        const token = await getRecaptchaToken("lead_submit");
        if (!token) {
          setFormError("Security check failed to load. Please refresh and try again.");
          return;
        }

        const verify = await fetch("/api/verify-recaptcha", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, action: "lead_submit" }),
        });

        if (!verify.ok) {
          setFormError("Security verification failed. Please try again.");
          return;
        }
      }

      track("joint_replacement_lead");
      setSubmitted(true);
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <header className="siteHeader">
        <div className="topbar">Medical Tourism • International Patient Care • Hyderabad, India</div>
        <nav className="nav container">
          <a className="brand" href="#">
            <img className="brandLogo" src="/logo.png" alt="Medical Tourism by TechDr" />
          </a>
          <a
            className="navCta"
            href="#consultation"
            onClick={() => track("cta_click")}
          >
            Get Treatment Plan
          </a>
        </nav>
      </header>

      <section className="hero">
        <div className="container heroGrid">
          <div className="heroCopy">
            <div className="eyebrow">JOINT REPLACEMENT • HYDERABAD, INDIA</div>
            <h1>Move better.<br /><span>Live without joint pain.</span></h1>
            <p className="heroLead">
              Explore knee and hip replacement treatment options in India with coordinated
              care for international patients.
            </p>

            <div className="urgency">
              <strong>First 50 patients only</strong>
              <span>Priority treatment planning & international-patient coordination</span>
            </div>

            <div className="heroBullets">
              <div><i>✓</i> Experienced orthopaedic specialists</div>
              <div><i>✓</i> International-brand implant options</div>
              <div><i>✓</i> Single-room package estimates</div>
              <div><i>✓</i> Travel & medical visa guidance</div>
            </div>

            <a
              className="primaryBtn"
              href="#consultation"
              onClick={() => track("hero_cta_click")}
            >
              Send Medical Reports →
            </a>
            <p className="microcopy">Get a preliminary review & treatment plan.</p>
          </div>

          <div className="heroVisual">
            <div className="imageCard">
              <img src="/banner.png" alt="Joint replacement medical tourism in Hyderabad" />
              <div className="visualBadge">
                <small>PACKAGE ESTIMATES FROM</small>
                <strong>USD 2,900</strong>
                <span>Knee replacement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trust">
        <div className="container trustGrid">
          <span>✓ International patient coordination</span>
          <span>✓ Transparent package estimates</span>
          <span>✓ Travel & stay assistance</span>
          <span>✓ Multi-language support</span>
        </div>
      </section>

      <section className="section" id="packages">
        <div className="container">
          <div className="sectionHead">
            <div>
              <div className="eyebrow">ESTIMATED PACKAGE PRICES</div>
              <h2>Joint replacement packages</h2>
            </div>
            <p>Approximate estimates. Final confirmation follows specialist consultation and clinical assessment.</p>
          </div>

          <div className="packageGrid">
            {packages.map((p) => (
              <article className="package" key={p.name}>
                <div className="jointArt">
                  <img src={p.image} alt={p.name} />
                </div>
                <h3>{p.name}</h3>
                <div className="price">{p.price}</div>
                <div className="stay">Hospital stay: <b>{p.stay}</b> in {p.note}</div>
                <a href="#consultation" onClick={() => track("package_cta_click")}>Check eligibility →</a>
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
            {[
              ["01", "Joint replacement surgery", "As specified in the selected package above."],
              ["02", "International-brand implant(s)", "Implants selected as part of the clinical plan."],
              ["03", "Pharmacy & medical consumables", "Used during the included hospital stay."],
              ["04", "Single-room accommodation", "For the stated package duration."],
              ["05", "Patient meals", "During the included hospital stay."],
            ].map(([n, t, d]) => (
              <div className="include" key={n}>
                <span>{n}</span><div><h3>{t}</h3><p>{d}</p></div>
              </div>
            ))}
          </div>

          <div className="packageNotes">
            <div className="packageNote">
              <h3>Bilateral surgery packages</h3>
              <p>
                The bilateral packages cover both joints, with surgery performed in two separate stages.
                The stated hospital stay is the total included across both stages. The interval between
                surgeries will be determined by the treating orthopaedic surgeon.
              </p>
            </div>
            <div className="packageNote warn">
              <h3>Please note</h3>
              <p>
                These are approximate package estimates. The final treatment plan, implant selection,
                and package confirmation will follow specialist consultation, clinical assessment, and
                review of all relevant investigations. Any additional hospital stay or treatment beyond
                the agreed package will be charged separately.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="journey section">
        <div className="container">
          <div className="sectionHead centered">
            <div>
              <div className="eyebrow">HOW IT WORKS</div>
              <h2>From medical reports to treatment</h2>
            </div>
          </div>
          <div className="steps">
            {[
              ["1", "Send reports", "Share your scans, reports and treatment history."],
              ["2", "Specialist review", "We coordinate a preliminary clinical review."],
              ["3", "Receive options", "Get hospital, doctor and package options."],
              ["4", "Plan your trip", "Coordinate appointments, travel and stay."],
            ].map(([n, t, d]) => (
              <div className="step" key={n}>
                <b>{n}</b><h3>{t}</h3><p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="leadSection" id="consultation">
        <div className="container leadGrid">
          <div>
            <div className="eyebrow light">START YOUR CASE REVIEW</div>
            <h2>Know your treatment options before you travel.</h2>
            <p>
              Send your medical details and our patient coordination team can help you
              understand the next steps, expected stay and package options.
            </p>
            <div className="secure">🔒 Your information is used for patient coordination and enquiry handling.</div>
          </div>

          <form className="leadForm" onSubmit={submit}>
            {submitted ? (
              <div className="success">
                <div className="successIcon">✓</div>
                <h3>Request received</h3>
                <p>Thank you. Our team will review the information you submitted and contact you regarding the next steps.</p>
                <button type="button" onClick={() => setSubmitted(false)}>Submit another enquiry</button>
              </div>
            ) : (
              <>
                <h3>Get a free treatment review</h3>
                <p className="formSub">Tell us a little about the patient.</p>
                <input name="name" placeholder="Patient / caregiver name" required />
                <div className="two">
                  <input name="country" placeholder="Country" required />
                  <input name="whatsapp" placeholder="WhatsApp number" required />
                </div>
                <select name="treatment" defaultValue="" required>
                  <option value="" disabled>Select treatment</option>
                  <option>Single knee replacement</option>
                  <option>Bilateral knee replacement</option>
                  <option>Single hip replacement</option>
                  <option>Bilateral hip replacement</option>
                  <option>Not sure — need guidance</option>
                </select>
                <textarea name="message" placeholder="Briefly describe the condition or treatment history" rows={3} />
                <label className="upload">
                  <span>📎</span>
                  <div><b>Medical reports</b><small>Optional • PDF/JPG/PNG</small></div>
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" />
                </label>
                {formError ? <p className="formError">{formError}</p> : null}
                <button className="submitBtn" type="submit" disabled={submitting}>
                  {submitting ? "Verifying…" : "Request My Treatment Plan →"}
                </button>
                <small className="formFine">
                  By submitting, you agree to be contacted about your enquiry.
                  {recaptchaSiteKey ? (
                    <>
                      {" "}This site is protected by reCAPTCHA and the Google{" "}
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>
                      {" "}and{" "}
                      <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms of Service</a>
                      {" "}apply.
                    </>
                  ) : null}
                </small>
              </>
            )}
          </form>
        </div>
      </section>

      <section className="faq section">
        <div className="container narrow">
          <div className="eyebrow">COMMON QUESTIONS</div>
          <h2>Before you plan your treatment</h2>
          {[
            ["Are these final treatment prices?", "No. These are approximate package estimates. The final treatment plan, implant selection, and package confirmation will follow specialist consultation, clinical assessment, and review of all relevant investigations. Any additional hospital stay or treatment beyond the agreed package will be charged separately."],
            ["Can international patients get travel support?", "Medical Tours India can coordinate support related to appointments, medical visa guidance, accommodation and local travel arrangements."],
            ["Can I send reports before travelling?", "Yes. You can submit your reports and treatment history through the enquiry form so the case can be reviewed before you make travel arrangements."],
            ["What is included in the package?", "Package inclusions cover joint replacement surgery as specified, international-brand implant(s), pharmacy and medical consumables used during the included hospital stay, single-room accommodation for the stated duration, and patient meals during the included hospital stay."],
            ["How do bilateral packages work?", "Bilateral packages cover both joints, with surgery performed in two separate stages. The stated hospital stay is the total included across both stages. The interval between surgeries will be determined by the treating orthopaedic surgeon."],
          ].map(([q, a]) => (
            <details key={q}><summary>{q}</summary><p>{a}</p></details>
          ))}
        </div>
      </section>

      <footer>
        <div className="container footerInner">
          <div className="footerBrand">
            <img className="brandLogo footerLogo" src="/logo.png" alt="Medical Tourism by TechDr" />
            <p>International patient coordination for joint replacement treatment in Hyderabad, India.</p>
          </div>
          <div className="footerMeta">
            <strong>Ready to start?</strong>
            <a href="#consultation" onClick={() => track("footer_cta_click")}>Get Treatment Plan →</a>
            <span>Hyderabad, India</span>
          </div>
        </div>
        <div className="footerBase">
          <div className="container footerBaseInner">
            <span>© {new Date().getFullYear()} Medical Tourism by TechDr</span>
            <span>Package estimates only • Specialist confirmation required</span>
          </div>
        </div>
      </footer>

      <a
        className="floatingWhatsApp"
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        onClick={() => track("whatsapp_click")}
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
