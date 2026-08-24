import { NextResponse } from "next/server";
import crypto from "node:crypto";

/** Receives a form submission, forwards it to Formspree for email delivery,
 *  and mirrors the conversion to Meta's Conversions API server-side. */

/* FormSubmit needs no account — it just emails the address you post to.
   Each address must confirm once, via a link it sends on the first submission. */
const LEAD_EMAILS = (process.env.LEAD_EMAILS ?? "anurag@yashova.com,akhil.sharma323@gmail.com")
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "2060709664860383";
const CAPI_TOKEN = process.env.META_CAPI_TOKEN;

const sha256 = (v: string) =>
  crypto.createHash("sha256").update(v.trim().toLowerCase()).digest("hex");

/** Meta requires E.164 without the leading +, digits only. */
function normalisePhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return digits.length === 10 ? `91${digits}` : digits;
}

export async function POST(request: Request) {
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad request" }, { status: 400 });
  }

  const name = (body.name ?? "").slice(0, 200);
  const email = (body.email ?? "").slice(0, 200);
  const phone = (body.phone ?? "").slice(0, 40);
  const message = (body.message ?? "").slice(0, 4000);
  const eventId = (body.eventId ?? crypto.randomUUID()).slice(0, 100);

  /* Two very different intents, so two different Meta events.
     Schedule = someone asking for a call. Lead = someone running the free audit.
     Optimising both as one "Lead" would push delivery toward the cheaper action. */
  const leadType = body.leadType === "audit" ? "audit" : "strategy-call";
  const eventName = leadType === "audit" ? "Lead" : "Schedule";
  const contentName =
    leadType === "audit" ? "AI Growth Audit" : "Strategy Call Request";
  const sourceUrl = (body.sourceUrl ?? "https://yashova.com/strategy-call").slice(0, 500);

  // honeypot: bots fill hidden fields, humans never see them
  if (body.company) {
    return NextResponse.json({ ok: true, skipped: "spam" });
  }

  if (!email && !phone) {
    return NextResponse.json({ ok: false, error: "email or phone required" }, { status: 400 });
  }

  const results: Record<string, unknown> = {};

  /* ---------- 1. Email the lead ---------- */
  const payload = {
    name,
    email,
    phone,
    message,
    page: sourceUrl,
    _subject: `New lead from yashova.com — ${name || email || phone}`,
    _template: "table",
    _captcha: "false",
  };

  const delivered = await Promise.all(
    LEAD_EMAILS.map(async (to) => {
      try {
        const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        return res.ok;
      } catch {
        return false;
      }
    })
  );
  results.email = delivered.some(Boolean) ? "sent" : "failed";
  results.recipients = LEAD_EMAILS.length;

  /* ---------- 2. Mirror to Meta Conversions API ---------- */
  if (CAPI_TOKEN) {
    const headers = request.headers;
    const forwarded = headers.get("x-forwarded-for") ?? "";
    const clientIp = forwarded.split(",")[0]?.trim();

    const userData: Record<string, string[] | string> = {};
    if (email) userData.em = [sha256(email)];
    const ph = normalisePhone(phone);
    if (ph) userData.ph = [sha256(ph)];
    if (name) {
      const [first, ...rest] = name.trim().split(/\s+/);
      if (first) userData.fn = [sha256(first)];
      if (rest.length) userData.ln = [sha256(rest.join(" "))];
    }
    if (clientIp) userData.client_ip_address = clientIp;
    const ua = headers.get("user-agent");
    if (ua) userData.client_user_agent = ua;
    // cookies set by the browser Pixel — these materially improve match quality
    const cookie = headers.get("cookie") ?? "";
    const fbp = cookie.match(/_fbp=([^;]+)/)?.[1];
    const fbc = cookie.match(/_fbc=([^;]+)/)?.[1];
    if (fbp) userData.fbp = fbp;
    if (fbc) userData.fbc = fbc;

    try {
      const res = await fetch(
        `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${CAPI_TOKEN}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: [
              {
                event_name: eventName,
                event_time: Math.floor(Date.now() / 1000),
                // same id the browser Pixel sends, so Meta deduplicates the pair
                event_id: eventId,
                event_source_url: sourceUrl,
                action_source: "website",
                user_data: userData,
                custom_data: { content_name: contentName, lead_type: leadType },
              },
            ],
          }),
        }
      );
      results.capi = res.ok ? "sent" : `failed:${res.status}`;
    } catch {
      results.capi = "failed";
    }
  } else {
    results.capi = "not configured";
  }

  return NextResponse.json({ ok: true, event: eventName, leadType, ...results });
}
