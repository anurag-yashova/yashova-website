import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Growth Audit",
  description: "Book a free growth audit call with Yashova.",
};

export default function AiAudit() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center">
      <p className="chevron text-xs font-semibold uppercase tracking-[0.25em] text-gold">Limited Slots Available</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
        Free Growth Audit
      </h1>
      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        <div className="rounded-xl border border-surface-line/60 bg-surface p-6">
          <h3 className="text-base font-semibold text-ink">What&apos;s Not Working</h3>
        </div>
        <div className="rounded-xl border border-surface-line/60 bg-surface p-6">
          <h3 className="text-base font-semibold text-ink">Where You&apos;re Losing Money</h3>
        </div>
        <div className="rounded-xl border border-surface-line/60 bg-surface p-6">
          <h3 className="text-base font-semibold text-ink">How To Scale Profitably</h3>
        </div>
      </div>
      <a
        href="/strategy-call"
        className="mt-10 inline-block rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-void hover:bg-gold-bright focus-ring"
      >
        Book Free Audit Call →
      </a>
    </section>
  );
}
