import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import CountUp from "@/components/CountUp";
import ProofGallery from "@/components/ProofGallery";
import Reveal from "@/components/Reveal";

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
          <Link href="/case-studies" className="link-line font-mono-num text-xs uppercase tracking-[0.14em] text-ink-muted">
            Back to all case studies
          </Link>
          <div className="mt-6 flex items-center gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white/90">
              <Image src={cs.logo} alt={`${cs.name} logo`} fill sizes="56px" className="object-contain p-1.5" />
            </div>
            <span className="text-sm font-semibold uppercase tracking-widest text-ink-muted">{cs.name}</span>
          </div>
          <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
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

          <a
            href={cs.pdfUrl}
            download
            className="pill mt-8 inline-flex items-center gap-2 px-6 py-3 text-sm text-ink transition-colors hover:border-gold hover:text-gold focus-ring"
          >
            Download Case Study (PDF) ↓
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="eyebrow text-gold">Campaign Performance</p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {cs.stats.map((s) => (
            <div key={s.label} className="card-hover rounded-md border border-surface-line/60 bg-surface p-5">
              <div className="font-mono-num text-2xl font-semibold text-gold"><CountUp value={s.value} /></div>
              <div className="mt-1 text-sm text-ink-muted">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-x-auto rounded-lg border border-glass-border">
          <table className="w-full min-w-[420px] text-sm">
            <thead>
              <tr className="bg-surface text-left">
                <th className="px-5 py-3 font-semibold text-ink">Metric</th>
                <th className="px-5 py-3 font-semibold text-ink">Value</th>
              </tr>
            </thead>
            <tbody>
              {cs.metrics.map((m, i) => (
                <tr key={m.metric} className={i % 2 ? "bg-surface/40" : ""}>
                  <td className="px-5 py-2.5 text-ink-muted">{m.metric}</td>
                  <td className="font-mono-num px-5 py-2.5 font-medium text-gold">{m.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {cs.proofImages.length > 0 && (
          <Reveal className="mt-10">
            <p className="eyebrow text-gold">Proof of Results</p>
            <ProofGallery images={cs.proofImages} name={cs.name} />
            <p className="mt-3 text-xs text-ink-muted">
              Screenshots from actual Meta Ads / LinkedIn / Razorpay dashboards for this campaign. Click any image to view full size.
            </p>
          </Reveal>
        )}

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

      <section className="border-t border-glass-border bg-surface/40">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold text-ink">Want results like this?</h2>
          <Link
            href="/strategy-call"
            className="mt-6 inline-block rounded-md bg-ink px-8 py-3.5 text-sm font-medium text-void hover:bg-gold focus-ring"
          >
            Book My Free Strategy Call
          </Link>
        </div>
      </section>
    </>
  );
}
