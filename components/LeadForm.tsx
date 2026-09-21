"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { company } from "@/lib/company";

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

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

type LeadFormProps = {
  defaultTreatment?: string;
};

type AttachmentItem = {
  id: string;
  file: File;
  previewUrl: string | null;
};

const MAX_FILES = 8;
const MAX_BYTES_PER_FILE = 8 * 1024 * 1024;

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileKey(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

export function LeadForm({ defaultTreatment = "" }: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [attachments, setAttachments] = useState<AttachmentItem[]>([]);
  const attachmentsRef = useRef(attachments);
  attachmentsRef.current = attachments;

  useEffect(() => {
    return () => {
      attachmentsRef.current.forEach((item) => {
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      });
    };
  }, []);

  function clearAttachments() {
    setAttachments((prev) => {
      prev.forEach((item) => {
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      });
      return [];
    });
  }

  function onReportsChange(e: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files || []);
    e.target.value = "";
    if (!selected.length) return;

    const existingKeys = new Set(attachments.map((item) => fileKey(item.file)));
    const next = [...attachments];
    let error = "";

    for (const file of selected) {
      if (next.length >= MAX_FILES) {
        error = `You can upload up to ${MAX_FILES} files.`;
        break;
      }
      if (file.size > MAX_BYTES_PER_FILE) {
        error = `Each file must be under 8MB. "${file.name}" is too large.`;
        continue;
      }
      if (existingKeys.has(fileKey(file))) continue;

      existingKeys.add(fileKey(file));
      next.push({
        id: `${fileKey(file)}-${Math.random().toString(36).slice(2, 8)}`,
        file,
        previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
      });
    }

    setFormError(error);
    setAttachments(next);
  }

  function removeAttachment(id: string) {
    setAttachments((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((item) => item.id !== id);
    });
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    const form = e.currentTarget;

    try {
      const formData = new FormData(form);
      formData.delete("reports");
      for (const item of attachments) {
        formData.append("reports", item.file, item.file.name);
      }

      if (recaptchaSiteKey) {
        const token = await getRecaptchaToken("lead_submit");
        if (!token) {
          setFormError("Security check failed to load. Please refresh and try again.");
          return;
        }
        formData.set("recaptchaToken", token);
      }

      const res = await fetch("/api/lead", {
        method: "POST",
        body: formData,
      });

      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!res.ok || !data?.ok) {
        setFormError(data?.error || "Could not submit your enquiry. Please try again.");
        return;
      }

      track("joint_replacement_lead");
      clearAttachments();
      setSubmitted(true);
      form.reset();
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="leadForm" onSubmit={submit}>
      {submitted ? (
        <div className="success">
          <div className="successIcon">✓</div>
          <h3>Request received</h3>
          <p>
            Thank you. A confirmation has been sent to your email. Our team will review
            your details and contact you regarding the next steps.
          </p>
          <button type="button" onClick={() => setSubmitted(false)}>
            Submit another enquiry
          </button>
        </div>
      ) : (
        <>
          <h3>Get a free treatment review</h3>
          <p className="formSub">Tell us a little about the patient.</p>
          <input name="name" placeholder="Patient / caregiver name" required />
          <input
            name="email"
            type="email"
            placeholder="Email address"
            required
            autoComplete="email"
          />
          <div className="two">
            <input name="country" placeholder="Country" required />
            <input name="whatsapp" placeholder="WhatsApp number" required />
          </div>
          <select name="treatment" defaultValue={defaultTreatment} required>
            <option value="" disabled>
              Select treatment
            </option>
            <option>Single knee replacement</option>
            <option>Bilateral knee replacement</option>
            <option>Single hip replacement</option>
            <option>Bilateral hip replacement</option>
            <option>Not sure — need guidance</option>
          </select>
          <select name="travel_timeline" defaultValue="" required>
            <option value="" disabled>
              When are you planning to travel to India?
            </option>
            <option>As soon as possible</option>
            <option>Within 1 month</option>
            <option>1–3 months</option>
            <option>3–6 months</option>
            <option>6+ months</option>
            <option>Not sure yet</option>
          </select>
          <textarea
            name="message"
            placeholder="Briefly describe the condition or treatment history"
            rows={3}
          />
          <label className={`upload${attachments.length ? " hasFile" : ""}`}>
            <span aria-hidden="true">📎</span>
            <div>
              <b>Medical reports</b>
              <small>
                {attachments.length
                  ? `${attachments.length} of ${MAX_FILES} selected • Click to add more`
                  : `Optional • PDF/JPG/PNG • Up to ${MAX_FILES} files`}
              </small>
            </div>
            <input
              type="file"
              name="reports"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              onChange={onReportsChange}
            />
          </label>
          {attachments.length ? (
            <ul className="uploadList">
              {attachments.map((item) => (
                <li key={item.id} className="uploadItem">
                  {item.previewUrl ? (
                    <img className="uploadThumb" src={item.previewUrl} alt="" />
                  ) : (
                    <span className="uploadDoc" aria-hidden="true">
                      PDF
                    </span>
                  )}
                  <div>
                    <b>{item.file.name}</b>
                    <small>{formatFileSize(item.file.size)}</small>
                  </div>
                  <button
                    type="button"
                    className="uploadClear"
                    onClick={() => removeAttachment(item.id)}
                    aria-label={`Remove ${item.file.name}`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          {formError ? <p className="formError">{formError}</p> : null}
          <button className="submitBtn" type="submit" disabled={submitting}>
            {submitting ? "Sending…" : "Request My Treatment Plan →"}
          </button>
          <small className="formFine">
            By submitting, you agree to be contacted about your enquiry and accept our{" "}
            <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Service</a>.
            Package figures are estimates only and do not constitute medical advice.
            {recaptchaSiteKey ? (
              <>
                {" "}
                This site is protected by reCAPTCHA and the Google{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">
                  Terms of Service
                </a>{" "}
                apply.
              </>
            ) : null}
          </small>
        </>
      )}
    </form>
  );
}

export function trackClick(eventName: string) {
  track(eventName);
}

export function getWhatsappHref() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const whatsappMessage = `Hello ${company.brand}, I am interested in joint replacement treatment.`;
  return whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappMessage)}`
    : `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
}
