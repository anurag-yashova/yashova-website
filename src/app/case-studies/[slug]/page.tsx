import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return { title: cs.name, description: cs.summary };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  return (
    <>
      <section className="border-b border-glass-border">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <Link href="/case-studies" className="text-sm font-semibold text-gold hover:text-gold-bright">
            ← All case studies
          </Link>
          <h1 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
            {cs.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted">
            {cs.summary}
          </p>

          <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-wide text-ink-muted">Client</dt>
              <dd className="mt-1 text-sm text-ink">{cs.client}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-ink-muted">Industry</dt>
              <dd className="mt-1 text-sm text-ink">{cs.industry}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-ink-muted">Program</dt>
              <dd className="mt-1 text-sm text-ink">{cs.program}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Campaign Performance</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {cs.stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-surface-line/60 bg-surface p-5">
              <div className="font-mono-num text-2xl font-semibold text-gold">{s.value}</div>
              <div className="mt-1 text-sm text-ink-muted">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-14 space-y-10">
          {cs.details.map((d) => (
            <div key={d.title}>
              <h3 className="text-lg font-semibold text-ink">{d.title}</h3>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">{d.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-ink-muted">Strategy: {cs.strategy}</p>
      </section>

      <section className="border-t border-surface-line/60 bg-surface/40">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold text-ink">Want results like this?</h2>
          <Link
            href="/strategy-call"
            className="mt-6 inline-block rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-void hover:bg-gold-bright focus-ring"
          >
            Book My Free Strategy Call →
          </Link>
        </div>
      </section>
    </>
  );
}
