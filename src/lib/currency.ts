/** Pure currency logic — safe to import from Edge Middleware, Server
 *  Components, AND Client Components. No next/headers here; that lives in
 *  currency-server.ts and must never be imported from this file or from
 *  middleware.ts / any client component. */

/** Default currency by country. Anywhere not listed gets USD. The nav switcher
 *  (any currency in SUPPORTED_CCY) always overrides this. */
export const COUNTRY_TO_CCY: Record<string, string> = {
  IN: "INR",
  US: "USD",
  GB: "GBP",
  AE: "AED",
  AU: "AUD",
};

export const SUPPORTED_CCY = ["INR", "USD", "GBP", "AED", "AUD", "NGN", "CAD", "SGD", "EUR"] as const;
export type Currency = (typeof SUPPORTED_CCY)[number];

export const CCY_META: Record<Currency, { symbol: string; locale: string; label: string }> = {
  INR: { symbol: "₹", locale: "en-IN", label: "INR — India" },
  USD: { symbol: "$", locale: "en-US", label: "USD — US Dollar" },
  GBP: { symbol: "£", locale: "en-GB", label: "GBP — British Pound" },
  AED: { symbol: "AED ", locale: "en-AE", label: "AED — UAE Dirham" },
  AUD: { symbol: "A$", locale: "en-AU", label: "AUD — Australian Dollar" },
  NGN: { symbol: "₦", locale: "en-NG", label: "NGN — Nigerian Naira" },
  CAD: { symbol: "C$", locale: "en-CA", label: "CAD — Canadian Dollar" },
  SGD: { symbol: "S$", locale: "en-SG", label: "SGD — Singapore Dollar" },
  EUR: { symbol: "€", locale: "de-DE", label: "EUR — Euro" },
};

/** Emergency-only approximate rates (INR base), used solely if the live API
 *  is unreachable. Never the primary source. */
export const FALLBACK_RATES: Record<string, number> = {
  INR: 1,
  USD: 0.012,
  GBP: 0.0095,
  AED: 0.044,
  AUD: 0.018,
  NGN: 18.5,
  CAD: 0.0163,
  SGD: 0.0161,
  EUR: 0.011,
};

export function currencyForCountry(country: string | null | undefined): Currency {
  const c = country ? COUNTRY_TO_CCY[country] : undefined;
  return (c as Currency) ?? "USD";
}

/** Parses "₹1.02Cr+", "₹30.1L", "₹18,60,000", "₹85.48" etc. into a raw INR
 *  number. Returns null for anything that isn't a rupee figure (percentages,
 *  multipliers like "5.5X", plain counts) — those are left alone everywhere. */
export function parseInrAmount(raw: string): number | null {
  const m = raw.match(/₹\s?([\d,]+(?:\.\d+)?)\s*(Cr(?:ore)?|L(?:akh|ac)?|K)?/i);
  if (!m) return null;
  let n = parseFloat(m[1].replace(/,/g, ""));
  if (Number.isNaN(n)) return null;
  const unit = (m[2] ?? "").toLowerCase();
  if (unit.startsWith("cr")) n *= 1e7;
  else if (unit.startsWith("l")) n *= 1e5;
  else if (unit === "k") n *= 1e3;
  return n;
}

export function convertInr(amountInr: number, ccy: Currency, rates: Record<string, number>): number {
  if (ccy === "INR") return amountInr;
  const rate = rates[ccy];
  if (!rate) return amountInr;
  return amountInr * rate;
}

export function formatAmount(amount: number, ccy: Currency): string {
  const meta = CCY_META[ccy];
  const rounded = amount >= 1000 ? Math.round(amount) : Math.round(amount * 100) / 100;
  return meta.symbol + rounded.toLocaleString(meta.locale);
}

/** Given a display string that may contain a ₹ figure, returns a short
 *  "≈ AED 458,000" note for the visitor's currency — or null if there is
 *  nothing to convert (INR visitor, or the string isn't a rupee amount). */
export function buildNote(raw: string, ccy: Currency, rates: Record<string, number>): string | null {
  if (ccy === "INR") return null;
  // "₹80–₹100" is a range — converting only the first figure would mislabel
  // a partial number as if it were the whole range. Skip ranges entirely.
  if (/₹[^₹]*[–-][^₹]*₹/.test(raw)) return null;
  const inr = parseInrAmount(raw);
  if (inr === null) return null;
  const converted = convertInr(inr, ccy, rates);
  return `≈ ${formatAmount(converted, ccy)}`;
}

/** For values that are known to be rupee amounts but are displayed without a
 *  ₹ prefix (e.g. a ledger table under an "Amount (₹)" column header). Strips
 *  commas/parentheses and converts directly — use only where the caller has
 *  already confirmed the field is money, since there is no ₹ to detect. */
export function buildNoteForBareAmount(
  raw: string,
  ccy: Currency,
  rates: Record<string, number>
): string | null {
  if (ccy === "INR") return null;
  const cleaned = raw.replace(/[(),]/g, "");
  const n = parseFloat(cleaned);
  if (Number.isNaN(n)) return null;
  const converted = convertInr(n, ccy, rates);
  return `≈ ${formatAmount(converted, ccy)}`;
}

/** Server-side pass over already-rendered article HTML: appends a subtle
 *  conversion note after every ₹ figure it finds, without touching anything
 *  else. Safe to run on marked() output — it only matches ₹-prefixed text. */
export function localizeInrInHtml(html: string, ccy: Currency, rates: Record<string, number>): string {
  if (ccy === "INR") return html;
  return html.replace(
    /₹\s?[\d,]+(?:\.\d+)?\s*(?:Cr(?:ore)?|L(?:akh|ac)?|K)?\+?/gi,
    (match) => {
      const inr = parseInrAmount(match);
      if (inr === null) return match;
      const converted = convertInr(inr, ccy, rates);
      return `${match}<span class="ccy-note">≈ ${formatAmount(converted, ccy)}</span>`;
    }
  );
}
