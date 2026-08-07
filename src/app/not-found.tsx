import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="dot-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-4xl px-6 py-28 md:py-36">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-6 text-5xl font-bold leading-[1.06] tracking-tighter text-ink md:text-7xl">
          <span className="clip-line">
            <span>This page did not</span>
          </span>
          <span className="clip-line">
            <span>
              convert. <span className="hl">Neither do most.</span>
            </span>
          </span>
        </h1>
        <p className="rise-3 mt-8 max-w-lg text-base leading-relaxed text-ink-muted">
          Somewhere between the link and this screen, something leaked. That is
          usually true of ad spend as well &mdash; which is roughly what we do
          about it for a living.
        </p>

        <div className="rise-4 mt-10 flex flex-wrap gap-4">
          <Link
            href="/"
            className="cta-pulse rounded-md bg-ink px-6 py-3 text-sm font-medium text-void transition-colors hover:bg-gold focus-ring"
          >
            Back to the homepage
          </Link>
          <Link
            href="/case-studies"
            className="pill px-6 py-3 text-ink transition-colors hover:border-gold hover:text-gold focus-ring"
          >
            See what did work
          </Link>
        </div>

        <div className="rule mt-16" />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            { href: "/teardowns", label: "Teardowns", note: "Public audits of live funnels" },
            { href: "/blog", label: "Blog", note: "Field notes from real accounts" },
            { href: "/ai-audit", label: "Free growth audit", note: "Scan your own site" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="group focus-ring">
              <span className="font-mono-num text-xs uppercase tracking-[0.14em] text-ink transition-colors group-hover:text-gold">
                {l.label}
              </span>
              <span className="mt-1.5 block text-sm text-ink-muted">{l.note}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
