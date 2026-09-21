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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

function buildLeadNotificationHtml(params: {
  name: string;
  email: string;
  country: string;
  whatsapp: string;
  treatment: string;
  travelTimeline: string;
  message: string;
  attachmentName: string | null;
  submittedAt: string;
}) {
  const {
    name,
    email,
    country,
    whatsapp,
    treatment,
    travelTimeline,
    message,
    attachmentName,
    submittedAt,
  } = params;

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Country", country],
    ["WhatsApp", whatsapp],
    ["Treatment", treatment],
    ["Travel timeline", travelTimeline],
    ["Message", message || "—"],
    ["Attachments", attachmentName || "None"],
  ];

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.5;color:#10243b">
      <h2 style="margin:0 0 12px">New joint replacement enquiry</h2>
      <p style="margin:0 0 16px;color:#64748b">Submitted from ${company.website} · ${escapeHtml(submittedAt)} IST</p>
      <table style="border-collapse:collapse;width:100%;max-width:640px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px 0;font-weight:700;width:180px;vertical-align:top">${escapeHtml(label)}</td>
            <td style="padding:8px 0">${escapeHtml(value)}</td>
          </tr>`
          )
          .join("")}
      </table>
    </div>
  `;
}

function buildConfirmationHtml(params: {
  name: string;
  email: string;
  country: string;
  whatsapp: string;
  treatment: string;
  travelTimeline: string;
  message: string;
  attachmentName: string | null;
  submittedAt: string;
  siteUrl: string;
}) {
  const {
    name,
    email,
    country,
    whatsapp,
    treatment,
    travelTimeline,
    message,
    attachmentName,
    submittedAt,
    siteUrl,
  } = params;

  const firstName = name.split(/\s+/)[0] || name;
  const detailRows: [string, string][] = [
    ["Treatment interest", treatment],
    ["Travel timeline", travelTimeline],
    ["Country", country],
    ["WhatsApp", whatsapp],
    ["Email", email],
    ["Message", message || "—"],
    ["Reports attached", attachmentName || "None"],
  ];

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>We received your enquiry</title>
</head>
<body style="margin:0;padding:0;background:#eef3f6;font-family:Arial,Helvetica,sans-serif;color:#10243b">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef3f6;padding:28px 12px">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 18px 40px rgba(9,40,75,0.08)">
          <tr>
            <td style="background:linear-gradient(135deg,#09284b 0%,#0d3a63 100%);padding:28px 28px 24px">
              <p style="margin:0 0 8px;font-size:12px;letter-spacing:1.4px;text-transform:uppercase;color:#72dc99;font-weight:700">
                ${escapeHtml(company.brand)}
              </p>
              <h1 style="margin:0;font-size:26px;line-height:1.25;color:#ffffff;font-weight:700">
                We received your enquiry
              </h1>
              <p style="margin:12px 0 0;font-size:14px;line-height:1.55;color:#c7d3df">
                Joint replacement care coordination · Hyderabad, India
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px">
              <p style="margin:0 0 14px;font-size:16px;line-height:1.6">
                Dear ${escapeHtml(firstName)},
              </p>
              <p style="margin:0 0 18px;font-size:15px;line-height:1.65;color:#506174">
                Thank you for contacting ${escapeHtml(company.brand)}. Our coordination team has
                received your request and will review your details shortly. When suitable, we may
                follow up for reports, a preliminary review, or a video consultation option.
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f8f7;border:1px solid #e3eaf0;border-radius:14px;margin:0 0 22px">
                <tr>
                  <td style="padding:18px 20px">
                    <p style="margin:0 0 12px;font-size:12px;letter-spacing:1.2px;text-transform:uppercase;color:#148a45;font-weight:700">
                      Your submission summary
                    </p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      ${detailRows
                        .map(
                          ([label, value], index) => `
                        <tr>
                          <td style="padding:${index === 0 ? "0" : "10px"} 0 ${index === detailRows.length - 1 ? "0" : "10px"};border-bottom:${index === detailRows.length - 1 ? "0" : "1px solid #e3eaf0"};width:42%;vertical-align:top;font-size:13px;color:#64748b;font-weight:700">
                            ${escapeHtml(label)}
                          </td>
                          <td style="padding:${index === 0 ? "0" : "10px"} 0 ${index === detailRows.length - 1 ? "0" : "10px"};border-bottom:${index === detailRows.length - 1 ? "0" : "1px solid #e3eaf0"};vertical-align:top;font-size:14px;color:#10243b">
                            ${escapeHtml(value)}
                          </td>
                        </tr>`
                        )
                        .join("")}
                    </table>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 22px">
                <tr>
                  <td style="padding:14px 16px;background:#fff7f3;border:1px solid #ffd7c6;border-radius:12px;font-size:13px;line-height:1.55;color:#5f6874">
                    <strong style="color:#c34220">Please note:</strong>
                    Package figures on our website are estimates only. Final plans and pricing follow
                    specialist consultation and clinical assessment. This email is not medical advice.
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 18px;font-size:14px;line-height:1.6;color:#506174">
                Submitted ${escapeHtml(submittedAt)} IST. If you need to share more reports, reply to
                this email or write to
                <a href="mailto:${escapeHtml(company.contactEmail)}" style="color:#148a45;font-weight:700;text-decoration:none">${escapeHtml(company.contactEmail)}</a>.
              </p>

              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 8px">
                <tr>
                  <td style="border-radius:10px;background:#148a45">
                    <a href="${escapeHtml(siteUrl)}" style="display:inline-block;padding:13px 20px;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700">
                      Visit ${escapeHtml(company.website)}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px 26px;background:#f8fafb;border-top:1px solid #e3eaf0">
              <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#09284b">${escapeHtml(company.brand)}</p>
              <p style="margin:0 0 4px;font-size:12px;line-height:1.5;color:#8492a0">${escapeHtml(company.cityLabel)}</p>
              <p style="margin:0;font-size:11px;line-height:1.5;color:#8492a0">
                ${escapeHtml(company.legalEntity)} (Trade Name: ${escapeHtml(company.tradeName)})
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const country = String(formData.get("country") || "").trim();
    const whatsapp = String(formData.get("whatsapp") || "").trim();
    const treatment = String(formData.get("treatment") || "").trim();
    const travelTimeline = String(formData.get("travel_timeline") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const recaptchaToken = String(formData.get("recaptchaToken") || "").trim();
    const reportEntries = formData.getAll("reports");

    if (!name || !email || !country || !whatsapp || !treatment || !travelTimeline) {
      return NextResponse.json({ ok: false, error: "Please fill in all required fields." }, { status: 400 });
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
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
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || company.websiteUrl;

    if (!apiKey || !toEmail) {
      return NextResponse.json(
        { ok: false, error: "Email delivery is not configured." },
        { status: 500 }
      );
    }

    const maxFiles = 8;
    const maxBytes = 8 * 1024 * 1024;
    const files = reportEntries.filter(
      (entry): entry is File => entry instanceof File && entry.size > 0
    );

    if (files.length > maxFiles) {
      return NextResponse.json(
        { ok: false, error: `Please upload up to ${maxFiles} medical reports.` },
        { status: 400 }
      );
    }

    const attachments: { filename: string; content: Buffer }[] = [];
    for (const file of files) {
      if (file.size > maxBytes) {
        return NextResponse.json(
          { ok: false, error: `Each medical report must be under 8MB. "${file.name}" is too large.` },
          { status: 400 }
        );
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name || `medical-report-${attachments.length + 1}`,
        content: buffer,
      });
    }

    const submittedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const attachmentName = attachments.length
      ? attachments.map((a) => a.filename).join(", ")
      : null;
    const leadPayload = {
      name,
      email,
      country,
      whatsapp,
      treatment,
      travelTimeline,
      message,
      attachmentName,
      submittedAt,
    };

    const leadHtml = buildLeadNotificationHtml(leadPayload);
    const confirmationHtml = buildConfirmationHtml({ ...leadPayload, siteUrl });

    const resend = new Resend(apiKey);

    const { error: leadError } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New lead: ${treatment} — ${name}`,
      html: leadHtml,
      text: [
        "New joint replacement enquiry",
        `Name: ${name}`,
        `Email: ${email}`,
        `Country: ${country}`,
        `WhatsApp: ${whatsapp}`,
        `Treatment: ${treatment}`,
        `Travel timeline: ${travelTimeline}`,
        `Message: ${message || "—"}`,
        `Attachment${attachments.length === 1 ? "" : "s"}: ${attachmentName || "None"}`,
        `Submitted: ${submittedAt} IST`,
      ].join("\n"),
      attachments: attachments.length
        ? attachments.map((a) => ({ filename: a.filename, content: a.content }))
        : undefined,
      tags: [
        { name: "source", value: "joint_replacement_landing" },
        { name: "type", value: "lead_notification" },
        { name: "treatment", value: treatment.slice(0, 50).replace(/[^a-zA-Z0-9_-]/g, "_") },
      ],
    });

    if (leadError) {
      console.error("Resend lead error:", leadError);
      const detail =
        process.env.NODE_ENV !== "production" && leadError.message
          ? ` ${leadError.message}`
          : "";
      return NextResponse.json(
        { ok: false, error: `Failed to send enquiry email.${detail}` },
        { status: 502 }
      );
    }

    const { error: confirmationError } = await resend.emails.send({
      from: fromEmail,
      to: [email],
      replyTo: company.contactEmail,
      subject: `We received your enquiry — ${company.brand}`,
      html: confirmationHtml,
      text: [
        `Dear ${name.split(/\s+/)[0] || name},`,
        "",
        `Thank you for contacting ${company.brand}. We have received your joint replacement enquiry.`,
        "",
        `Treatment interest: ${treatment}`,
        `Travel timeline: ${travelTimeline}`,
        `Country: ${country}`,
        `WhatsApp: ${whatsapp}`,
        `Email: ${email}`,
        `Message: ${message || "—"}`,
        `Reports attached: ${attachmentName || "None"}`,
        `Submitted: ${submittedAt} IST`,
        "",
        "Our team will review your details and contact you regarding next steps.",
        `If you need to share more reports, email ${company.contactEmail}.`,
        "",
        `${company.brand} · ${company.cityLabel}`,
        siteUrl,
      ].join("\n"),
      tags: [
        { name: "source", value: "joint_replacement_landing" },
        { name: "type", value: "lead_confirmation" },
      ],
    });

    if (confirmationError) {
      // Lead notification already sent — don't fail the enquiry over confirmation delivery.
      console.error("Resend confirmation error:", confirmationError);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}
