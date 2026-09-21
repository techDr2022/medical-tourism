import { NextResponse } from "next/server";
import { Resend } from "resend";
import { company } from "@/lib/company";

export const runtime = "nodejs";

type RecaptchaResponse = {
  success: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function verifyRecaptcha(token: string, action: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { ok: false as const, error: "reCAPTCHA is not configured" };

  const body = new URLSearchParams({ secret, response: token });
  const googleRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = (await googleRes.json()) as RecaptchaResponse;
  const scoreOk = (data.score ?? 0) >= 0.5;
  const actionOk = !action || data.action === action;

  if (!data.success || !scoreOk || !actionOk) {
    return { ok: false as const, error: "reCAPTCHA verification failed" };
  }

  return { ok: true as const, score: data.score };
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = String(formData.get("name") || "").trim();
    const country = String(formData.get("country") || "").trim();
    const whatsapp = String(formData.get("whatsapp") || "").trim();
    const treatment = String(formData.get("treatment") || "").trim();
    const travelTimeline = String(formData.get("travel_timeline") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const recaptchaToken = String(formData.get("recaptchaToken") || "").trim();
    const file = formData.get("reports");

    if (!name || !country || !whatsapp || !treatment || !travelTimeline) {
      return NextResponse.json({ ok: false, error: "Please fill in all required fields." }, { status: 400 });
    }

    if (process.env.RECAPTCHA_SECRET_KEY) {
      if (!recaptchaToken) {
        return NextResponse.json({ ok: false, error: "Security check missing." }, { status: 400 });
      }
      const captcha = await verifyRecaptcha(recaptchaToken, "lead_submit");
      if (!captcha.ok) {
        return NextResponse.json({ ok: false, error: captcha.error }, { status: 400 });
      }
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.LEAD_TO_EMAIL;
    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      `${company.brand} <${company.noreplyEmail}>`;

    if (!apiKey || !toEmail) {
      return NextResponse.json(
        { ok: false, error: "Email delivery is not configured." },
        { status: 500 }
      );
    }

    const attachments: { filename: string; content: Buffer }[] = [];
    if (file instanceof File && file.size > 0) {
      const maxBytes = 8 * 1024 * 1024;
      if (file.size > maxBytes) {
        return NextResponse.json(
          { ok: false, error: "Medical report must be under 8MB." },
          { status: 400 }
        );
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name || "medical-report",
        content: buffer,
      });
    }

    const submittedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#10243b">
        <h2 style="margin:0 0 12px">New joint replacement enquiry</h2>
        <p style="margin:0 0 16px;color:#64748b">Submitted from ${company.website} · ${escapeHtml(submittedAt)} IST</p>
        <table style="border-collapse:collapse;width:100%;max-width:640px">
          <tr><td style="padding:8px 0;font-weight:700;width:180px">Name</td><td style="padding:8px 0">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700">Country</td><td style="padding:8px 0">${escapeHtml(country)}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700">WhatsApp</td><td style="padding:8px 0">${escapeHtml(whatsapp)}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700">Treatment</td><td style="padding:8px 0">${escapeHtml(treatment)}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700">Travel timeline</td><td style="padding:8px 0">${escapeHtml(travelTimeline)}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700;vertical-align:top">Message</td><td style="padding:8px 0">${escapeHtml(message || "—")}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700">Attachment</td><td style="padding:8px 0">${attachments.length ? escapeHtml(attachments[0].filename) : "None"}</td></tr>
        </table>
      </div>
    `;

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `New lead: ${treatment} — ${name}`,
      html,
      text: [
        "New joint replacement enquiry",
        `Name: ${name}`,
        `Country: ${country}`,
        `WhatsApp: ${whatsapp}`,
        `Treatment: ${treatment}`,
        `Travel timeline: ${travelTimeline}`,
        `Message: ${message || "—"}`,
        `Attachment: ${attachments.length ? attachments[0].filename : "None"}`,
        `Submitted: ${submittedAt} IST`,
      ].join("\n"),
      attachments: attachments.length
        ? attachments.map((a) => ({ filename: a.filename, content: a.content }))
        : undefined,
      tags: [
        { name: "source", value: "joint_replacement_landing" },
        { name: "treatment", value: treatment.slice(0, 50).replace(/[^a-zA-Z0-9_-]/g, "_") },
      ],
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Failed to send enquiry email." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}
