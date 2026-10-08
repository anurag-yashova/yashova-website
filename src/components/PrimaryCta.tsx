"use client";

import Link from "next/link";
import { track } from "@/lib/track";
import { whatsappUrl } from "@/lib/region";

/** The main "talk to us" button.
 *  Both versions are in the page; a tiny script in the layout stamps the
 *  visitor's country on <html data-ctry>, and CSS (globals.css, .cta-wa and
 *  .cta-default) shows only the right one. That means India sees WhatsApp from
 *  the very first paint, with no flash and no hydration mismatch.
 *  India: opens WhatsApp. Everywhere else, and with JavaScript off: goes to
 *  /strategy-call, which shows the booking calendar. The page content itself
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
  return (
    <>
      <Link href="/strategy-call" onClick={onClick} className={`cta-default ${className ?? ""}`}>
        {children}
      </Link>
      <a
        href={whatsappUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          track("Contact", { content_name: "WhatsApp Primary CTA" });
          onClick?.();
        }}
        className={`cta-wa ${className ?? ""}`}
      >
        {whatsappLabel}
      </a>
    </>
  );
}
