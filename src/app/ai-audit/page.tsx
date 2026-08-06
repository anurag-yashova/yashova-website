import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Growth Audit",
  description: "Find what's blocking your growth — a free 30-minute ads, funnel, and conversion breakdown.",
};

const points = [
  "Why your current marketing isn't converting",
  "Where your funnel is leaking revenue",
  "What to fix to scale consistently",
];

export default function AiAudit() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center">
      <p className="eyebrow text-gold">
        Limited Audit Slots Available
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
        Find What&apos;s Blocking Your Growth
      </h1>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {points.map((p) => (
          <div key={p} className="glass rounded-2xl p-6">
            <h3 className="text-base font-semibold text-ink">{p}</h3>
          </div>
        ))}
      </div>

      <a
        href="https://wa.me/919818086846?text=Hi%2C%20I%20saw%20your%20Growth%20Audit.%20Can%20you%20review%20my%20marketing%20setup%3F"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-block rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-void hover:bg-gold-bright focus-ring"
      >
        Audit My Growth →
      </a>
      <p className="mt-4 text-sm text-ink-muted">
        &ldquo;Ads. Funnel. Conversion — Full breakdown in 30 mins&rdquo;
      </p>
    </section>
  );
}
