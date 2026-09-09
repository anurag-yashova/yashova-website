import { cookies } from "next/headers";
import { SUPPORTED_CCY, FALLBACK_RATES, type Currency } from "@/lib/currency";

/** Server-only currency reads. Import this ONLY from Server Components
 *  (page.tsx files) — never from middleware.ts or any "use client" file,
 *  both of which must import from "@/lib/currency" instead. */

/** The visitor's currency for this request: their manual choice (cookie) if
 *  set, otherwise the geo-detected default middleware.ts wrote, otherwise INR. */
export async function getCurrency(): Promise<Currency> {
  const store = await cookies();
  const c = store.get("ccy")?.value;
  if (c && (SUPPORTED_CCY as readonly string[]).includes(c)) return c as Currency;
  return "INR";
}

/** open.er-api.com is a free, no-key, no-signup endpoint (161 currencies,
 *  updated daily). Cached for 12h via Next's fetch cache. If it is ever
 *  unreachable, FALLBACK_RATES keeps the feature working with approximate,
 *  clearly-secondary figures rather than breaking. */
export async function getRates(): Promise<Record<string, number>> {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/INR", {
      next: { revalidate: 43200 },
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const data = await res.json();
    if (data.result !== "success" || !data.rates) throw new Error("bad payload");
    return data.rates as Record<string, number>;
  } catch {
    return FALLBACK_RATES;
  }
}
