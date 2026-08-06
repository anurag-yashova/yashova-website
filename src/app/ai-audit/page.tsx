import type { Metadata } from "next";
import AuditTool from "./AuditTool";

export const metadata: Metadata = {
  title: "Free Growth Audit",
  description: "Find what's blocking your growth — a free automated site audit plus a 30-minute ads, funnel, and conversion breakdown.",
};

const points = [
  "Why your current marketing isn't converting",
  "Where your funnel is leaking revenue",
  "What to fix to scale consistently",
];

export default function AiAudit() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center">
      <p className="eyebrow text-gold">Limited Audit Slots Available</p>
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

      <AuditTool />

      <div className="mt-14 border-t border-glass-border pt-10">
        <a
          href="https://wa.me/919818086846?text=Hi%2C%20I%20saw%20your%20Growth%20Audit.%20Can%20you%20review%20my%20marketing%20setup%3F"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-gold px-8 py-3.5 text-sm font-medium text-void hover:bg-gold-bright focus-ring"
        >
          Audit My Growth →
        </a>
        <p className="mt-4 text-sm text-ink-muted">
          &ldquo;Ads. Funnel. Conversion — Full breakdown in 30 mins&rdquo;
        </p>
      </div>
    </section>
  );
}
