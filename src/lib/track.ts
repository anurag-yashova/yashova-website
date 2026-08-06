type Fbq = (...args: unknown[]) => void;

/** Fire a Meta Pixel standard event. Safe no-op if the pixel hasn't loaded. */
export function track(event: string, params?: Record<string, unknown>) {
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  fbq?.("track", event, params);
}
