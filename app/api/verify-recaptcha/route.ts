import { NextResponse } from "next/server";

type RecaptchaResponse = {
  success: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
};

export async function POST(request: Request) {
  try {
    const { token, action } = (await request.json()) as {
      token?: string;
      action?: string;
    };

    if (!token) {
      return NextResponse.json({ ok: false, error: "Missing token" }, { status: 400 });
    }

    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      return NextResponse.json(
        { ok: false, error: "reCAPTCHA is not configured" },
        { status: 500 }
      );
    }

    const body = new URLSearchParams({
      secret,
      response: token,
    });

    const googleRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    const data = (await googleRes.json()) as RecaptchaResponse;
    const scoreOk = (data.score ?? 0) >= 0.5;
    const actionOk = !action || data.action === action;

    if (!data.success || !scoreOk || !actionOk) {
      return NextResponse.json(
        {
          ok: false,
          error: "reCAPTCHA verification failed",
          score: data.score,
          codes: data["error-codes"],
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true, score: data.score });
  } catch {
    return NextResponse.json({ ok: false, error: "Verification error" }, { status: 500 });
  }
}
