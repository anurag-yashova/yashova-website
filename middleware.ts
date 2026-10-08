import { NextResponse, type NextRequest } from "next/server";
import { COUNTRY_TO_CCY } from "@/lib/currency";
import { COUNTRY_COOKIE } from "@/lib/region";

const SIX_MONTHS = 60 * 60 * 24 * 180;

/** Runs once per visitor and remembers two things in cookies:
 *   ccy  - default currency: India INR, USA USD, UK GBP, UAE AED, Australia AUD,
 *          everywhere else USD. If the person later picks a currency in the nav
 *          switcher, that choice is never overwritten.
 *   ctry - the country code, used only to choose the main contact button
 *          (WhatsApp for India, booking calendar elsewhere).
 *  Vercel adds `x-vercel-ip-country` to every request automatically: no geo-IP
 *  service, no API key, nothing to configure. With no header (local dev) nothing
 *  is set and the site behaves as India/INR. */
export function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const country = request.headers.get("x-vercel-ip-country");

  if (country) {
    if (!request.cookies.get("ccy")) {
      res.cookies.set("ccy", COUNTRY_TO_CCY[country] ?? "USD", { path: "/", maxAge: SIX_MONTHS });
    }
    if (!request.cookies.get(COUNTRY_COOKIE)) {
      res.cookies.set(COUNTRY_COOKIE, country, { path: "/", maxAge: SIX_MONTHS });
    }
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|ico|mp4|pdf)).*)"],
};
