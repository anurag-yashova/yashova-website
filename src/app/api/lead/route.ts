import { NextResponse } from "next/server";
import crypto from "node:crypto";

/** Receives a form submission (strategy call or AI audit), delivers it by
 *  email via Brevo's transactional API (primary) and FormSubmit (backup),
 *  and mirrors the conversion to Meta's Conversions API server-side. */

const LEAD_EMAILS = (process.env.LEAD_EMAILS ?? "anurag@yashova.com,akhil.sharma323@gmail.com")
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);

const BREVO_API_KEY = process.env.BREVO_API_KEY;
// Must be a sender verified in Brevo → Senders, Domains & Dedicated IPs.
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL ?? "anurag@yashova.com";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "2060709664860383";
const CAPI_TOKEN = process.env.META_CAPI_TOKEN;

const sha256 = (v: string) =>
  crypto.createHash("sha256").update(v.trim().toLowerCase()).digest("hex");

function normalisePhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return digits.length === 10 ? `91${digits}` : digits;
}

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
  const sourceUrl = (body.sourceUrl ?? "https://yashova.com/strategy-call").slice(0, 500);

  const leadType = body.leadType === "audit" ? "audit" : "strategy-call";
  const eventName = leadType === "audit" ? "Lead" : "Schedule";
  const contentName = leadType === "audit" ? "AI Growth Audit" : "Strategy Call Request";
  const subjectTag = leadType === "audit" ? "AUDIT" : "STRATEGY CALL";

  // honeypot
  if (body.company) {
    return NextResponse.json({ ok: true, skipped: "spam" });
  }
  if (!email && !phone) {
    return NextResponse.json({ ok: false, error: "email or phone required" }, { status: 400 });
  }

  const results: Record<string, unknown> = {};

  /* ---------- 1a. Brevo transactional email (primary) ---------- */
  if (BREVO_API_KEY) {
    const html = `
      <h2>${subjectTag} — yashova.com</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        <tr><td><b>Name</b></td><td>${esc(name || "—")}</td></tr>
        <tr><td><b>Email</b></td><td>${esc(email || "—")}</td></tr>
        <tr><td><b>Phone</b></td><td>${esc(phone || "—")}</td></tr>
        <tr><td><b>Message</b></td><td>${esc(message || "—")}</td></tr>
        <tr><td><b>Page</b></td><td>${esc(sourceUrl)}</td></tr>
      </table>`;
    try {
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "api-key": BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: { email: FROM_EMAIL, name: "Yashova website" },
          to: LEAD_EMAILS.map((e) => ({ email: e })),
          replyTo: email ? { email, name: name || undefined } : undefined,
          subject: `${subjectTag} — ${name || email || phone}`,
          htmlContent: html,
        }),
      });
      if (res.ok) {
        results.brevo = "sent";
      } else {
        const errText = await res.text().catch(() => "");
        results.brevo = `failed:${res.status}`;
        console.error("[lead] Brevo send failed", res.status, errText);
      }
    } catch (e) {
      results.brevo = "failed";
      console.error("[lead] Brevo send threw", e);
    }
  } else {
    results.brevo = "not configured";
  }

  /* ---------- 1b. FormSubmit (backup channel) ---------- */
  const formsubmitPayload = {
    name,
    email,
    phone,
    message,
    page: sourceUrl,
    _subject: `${subjectTag} — ${name || email || phone}`,
    _template: "table",
    _captcha: "false",
  };
  const fsResults = await Promise.all(
    LEAD_EMAILS.map(async (to) => {
      try {
        const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(formsubmitPayload),
        });
        const text = await res.text().catch(() => "");
        if (!res.ok) console.error("[lead] FormSubmit failed", to, res.status, text);
        return res.ok;
      } catch (e) {
        console.error("[lead] FormSubmit threw", to, e);
        return false;
      }
    })
  );
  results.formsubmit = fsResults.some(Boolean) ? "sent" : "failed";

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
      if (res.ok) {
        results.capi = "sent";
      } else {
        const errText = await res.text().catch(() => "");
        results.capi = `failed:${res.status}`;
        console.error("[lead] CAPI failed", res.status, errText);
      }
    } catch (e) {
      results.capi = "failed";
      console.error("[lead] CAPI threw", e);
    }
  } else {
    results.capi = "not configured";
  }

  const emailDelivered = results.brevo === "sent" || results.formsubmit === "sent";
  return NextResponse.json({
    ok: true,
    emailDelivered,
    event: eventName,
    leadType,
    ...results,
  });
}
