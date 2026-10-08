"use client";

import { useSyncExternalStore } from "react";
import { bookingEmbedSrc } from "@/lib/booking";
import { COUNTRY_COOKIE, whatsappUrl } from "@/lib/region";
import { track } from "@/lib/track";

function readCountry(): string {
  const m = document.cookie.match(new RegExp(`(?:^|; )${COUNTRY_COOKIE}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : "";
}

/** India: WhatsApp first, then the form. US/UK/UAE/Australia: the booking
 *  calendar (once a link is set in src/lib/booking.ts). Anyone else, or while
 *  no calendar link exists: the form. */
export default function BookingEmbed({ fallback }: { fallback: React.ReactNode }) {
  const country = useSyncExternalStore(
    () => () => {},
    readCountry,
    () => ""
  );
  const src = bookingEmbedSrc();

  if (country === "IN") {
    return (
      <div className="space-y-6">
        <a
          href={whatsappUrl("Hi, I want to book a strategy call with Yashova.")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("Contact", { content_name: "WhatsApp Strategy Page" })}
          className="block rounded-md bg-ink px-6 py-4 text-center text-sm font-medium text-void transition-colors hover:bg-gold focus-ring"
        >
          Chat with us on WhatsApp
        </a>
        <p className="text-center text-xs text-ink-muted">Or leave your details and we will reach out.</p>
        {fallback}
      </div>
    );
  }

  if (!src) return <>{fallback}</>;

  return (
    <div className="overflow-hidden rounded-lg border border-surface-line">
      <iframe src={src} title="Book a strategy call" loading="lazy" className="h-[660px] w-full" />
    </div>
  );
}
