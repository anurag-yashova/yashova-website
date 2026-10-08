"use client";

import { bookingEmbedSrc } from "@/lib/booking";
import { useEffect } from "react";
import { whatsappUrl } from "@/lib/region";
import { track } from "@/lib/track";

/** `country` is decided on the server (from Vercel's country header), so there is no flash
 *  of the wrong block. India: WhatsApp first, then the form. US/UK/UAE/Australia: the booking
 *  calendar (once a link is set in src/lib/booking.ts). Anyone else, or while
 *  no calendar link exists: the form. */
export default function BookingEmbed({ fallback, country }: { fallback: React.ReactNode; country: string }) {
  const src = bookingEmbedSrc();

  /* Calendly tells the parent page when a booking is completed. Count it as a
     Schedule event in Meta, so booked calls show up in ad reporting. */
  useEffect(() => {
    if (!src) return;
    function onMessage(e: MessageEvent) {
      if (typeof e.origin === "string" && e.origin.includes("calendly.com") && e.data?.event === "calendly.event_scheduled") {
        track("Schedule", { content_name: "Calendly Strategy Call" });
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [src]);

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
    <div className="space-y-6">
      <div className="overflow-hidden rounded-lg border border-surface-line">
        <iframe src={src} title="Book a strategy call" loading="lazy" className="h-[660px] w-full" />
      </div>
      <details className="rounded-lg border border-surface-line p-5">
        <summary className="cursor-pointer text-sm font-medium text-ink focus-ring">
          Prefer to write instead of booking a time?
        </summary>
        <div className="mt-5">{fallback}</div>
      </details>
    </div>
  );
}
