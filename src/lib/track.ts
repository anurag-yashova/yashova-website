type Fbq = (...args: unknown[]) => void;

/** Fire a Meta Pixel standard event. Safe no-op if the pixel hasn't loaded.
 *
 *  `eventId` must be passed as fbq's fourth argument, NOT inside params —
 *  that is what lets Meta deduplicate this browser event against the
 *  matching server-side Conversions API event carrying the same id. */
export function track(
  event: string,
  params?: Record<string, unknown>,
  eventId?: string
) {
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (!fbq) return;
  if (eventId) {
    fbq("track", event, params ?? {}, { eventID: eventId });
  } else {
    fbq("track", event, params);
  }
}
