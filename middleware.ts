import { NextResponse, type NextRequest } from "next/server";
import { COUNTRY_TO_CCY } from "@/lib/currency";

/** Sets a currency cookie from the visitor's country on their first visit.
 *  Vercel adds `x-vercel-ip-country` to every request automatically — no
 *  geo-IP service, no API key, nothing to configure. If the person later
 *  picks a currency manually (nav switcher), that cookie is never overwritten. */
export function middleware(request: NextRequest) {
  const res = NextResponse.next();

  if (!request.cookies.get("ccy")) {
    const country = request.headers.get("x-vercel-ip-country");
    const ccy = (country && COUNTRY_TO_CCY[country]) || "USD";
    // India (and anywhere geo can't be read, e.g. local dev) stays on INR —
    // only set a non-INR cookie when we're reasonably sure it's warranted.
    if (country) {
      res.cookies.set("ccy", country === "IN" ? "INR" : ccy, {
        path: "/",
        maxAge: 60 * 60 * 24 * 180,
      });
    }
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|ico|mp4|pdf)).*)"],
};
