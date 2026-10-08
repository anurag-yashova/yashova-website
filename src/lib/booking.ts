/** Booking calendar for visitors outside India (US, UK, UAE, Australia).
 *
 *  Paste the public booking link here, e.g.
 *    "https://cal.com/yashova/strategy-call"  or  "https://calendly.com/yashova/strategy-call"
 *  While this is empty, those visitors see the normal strategy-call form
 *  instead, so nothing breaks. NEXT_PUBLIC_CAL_LINK (a Cal.com path such as
 *  "yashova/strategy-call") still works as a fallback. */
export const BOOKING_URL = "";

export function bookingEmbedSrc(): string | null {
  const envPath = process.env.NEXT_PUBLIC_CAL_LINK;
  const raw = BOOKING_URL || (envPath ? `https://cal.com/${envPath}` : "");
  if (!raw) return null;
  try {
    const u = new URL(raw);
    if (u.hostname.includes("calendly.com")) {
      u.searchParams.set("embed_domain", "yashova.com");
      u.searchParams.set("embed_type", "Inline");
    } else {
      u.searchParams.set("embed", "true");
    }
    return u.toString();
  } catch {
    return null;
  }
}
