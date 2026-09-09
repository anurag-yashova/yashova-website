"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import CurrencySwitcher from "@/components/CurrencySwitcher";

const links = [
  { href: "/about", label: "About" },
  { href: "/teardowns", label: "Teardowns" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/roi-calculator", label: "ROI Calculator" },
  { href: "/blog", label: "Blog" },
];

function Wordmark({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <>
      <Image
        src="/images/yashova-wordmark.png"
        alt="Yashova — Not Loud. Unignorable."
        width={660}
        height={220}
        className={`logo-light ${className}`}
        priority
      />
      <Image
        src="/images/yashova-wordmark-dark.png"
        alt="Yashova — Not Loud. Unignorable."
        width={660}
        height={220}
        className={`logo-dark ${className}`}
        priority
      />
    </>
  );
}

export { Wordmark };

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-glass-border bg-void/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link href="/" className="focus-ring rounded" aria-label="Yashova home">
          <Wordmark className="h-11 w-auto md:h-12" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) =>
            "external" in l && l.external ? (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link font-mono-num text-xs uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-ink focus-ring rounded"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className="nav-link font-mono-num text-xs uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-ink focus-ring rounded"
              >
                {l.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <CurrencySwitcher />
          <ThemeToggle />
          <Link
            href="/strategy-call"
            className="rounded-md bg-ink px-5 py-2.5 text-sm font-medium text-void transition-colors hover:bg-gold focus-ring"
          >
            Book a Strategy Call
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <CurrencySwitcher />
          <ThemeToggle />
          <button
            className="text-ink focus-ring rounded p-1"
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
      </div>

      {open && (
        <div className="border-t border-glass-border bg-void px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((l) =>
              "external" in l && l.external ? (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="font-mono-num text-xs uppercase tracking-[0.14em] text-ink-muted hover:text-ink"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-mono-num text-xs uppercase tracking-[0.14em] text-ink-muted hover:text-ink"
                >
                  {l.label}
                </Link>
              )
            )}
            <Link
              href="/strategy-call"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-ink px-5 py-2.5 text-center text-sm font-medium text-void"
            >
              Book a Strategy Call
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
