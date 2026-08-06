"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const links = [
  { href: "/about", label: "About" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/for-colleges", label: "For Colleges" },
  { href: "/roi-calculator", label: "ROI Calculator" },
  { href: "/blog", label: "Blog" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-glass-border bg-void/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 focus-ring rounded">
          <Image
            src="/images/logo.jpg"
            alt="Yashova"
            width={132}
            height={40}
            className="h-8 w-auto rounded-sm"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-link text-sm font-medium text-ink-muted transition-colors hover:text-ink focus-ring rounded"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/strategy-call"
          className="hidden rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-void transition-colors hover:bg-gold-bright md:inline-block focus-ring"
        >
          Book a Strategy Call
        </Link>

        <button
          className="text-ink md:hidden focus-ring rounded p-1"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-surface-line/60 bg-void px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-ink-muted hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/strategy-call"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gold px-5 py-2.5 text-center text-sm font-semibold text-void"
            >
              Book a Strategy Call
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
