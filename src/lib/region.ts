/** Pure region helpers — safe in middleware, server and client code. */

/** Cookie holding the visitor's detected country (2-letter code). Written by
 *  middleware.ts from Vercel's x-vercel-ip-country header. Separate from the
 *  `ccy` currency cookie on purpose: choosing a different currency in the
 *  switcher must NOT change which contact button a visitor sees. */
export const COUNTRY_COOKIE = "ctry";

export const WHATSAPP_NUMBER = "919818086846";

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
