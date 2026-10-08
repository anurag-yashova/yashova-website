"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { track } from "@/lib/track";
import { COUNTRY_COOKIE, whatsappUrl } from "@/lib/region";

function readCountry(): string {
  const m = document.cookie.match(new RegExp(`(?:^|; )${COUNTRY_COOKIE}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : "";
}

/** The main "talk to us" button.
 *  India: opens WhatsApp. Everywhere else (and until the country is known, and
 *  with JavaScript off): goes to /strategy-call, which shows the booking
 *  calendar once a link is set in src/lib/booking.ts. The page content itself
 *  never changes by country. */
export default function PrimaryCta({
  className,
  children,
  whatsappLabel = "Chat on WhatsApp",
  message = "Hi, I saw yashova.com and want to discuss growth.",
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  whatsappLabel?: string;
  message?: string;
  onClick?: () => void;
}) {
  const country = useSyncExternalStore(
    () => () => {},
    readCountry,
    () => "" // server snapshot: the neutral strategy-call button
  );

  if (country === "IN") {
    return (
      <a
        href={whatsappUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          track("Contact", { content_name: "WhatsApp Primary CTA" });
          onClick?.();
        }}
        className={className}
      >
        {whatsappLabel}
      </a>
    );
  }
  return (
    <Link href="/strategy-call" onClick={onClick} className={className}>
      {children}
    </Link>
  );
}
