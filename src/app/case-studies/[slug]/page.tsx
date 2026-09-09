import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import CountUp from "@/components/CountUp";
import ProofGallery from "@/components/ProofGallery";
import Reveal from "@/components/Reveal";
import CaseLedger from "@/components/CaseLedger";
import { buildNote } from "@/lib/currency";
import { getCurrency, getRates } from "@/lib/currency-server";

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

  const ccy = await getCurrency();
  const rates = await getRates();
  const localizedMetrics = cs.metrics.map((m) => ({
    ...m,
    note: buildNote(m.value, ccy, rates),
  }));

  const fileNo = String(caseStudies.findIndex((c) => c.slug === cs.slug) + 1).padStart(3, "0");

  return (
    <>
      {/* ===== File header ===== */}
      <section className="relative overflow-hidden border-b border-surface-line">
        <div className="dot-grid pointer-events-none absolute inset-0" />
        <span className="index-num pointer-events-none absolute -right-4 top-6 hidden text-[11rem] md:block lg:text-[15rem]" aria-hidden>
          {fileNo}
        </span>

        <div className="relative mx-auto max-w-4xl px-6 py-16 md:py-24">
          <Link href="/case-studies" className="link-line font-mono-num text-xs uppercase tracking-[0.14em] text-ink-muted">
            Back to all case studies
          </Link>

          <div className="mt-8 flex items-center gap-4">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-white">
              <Image src={cs.logo} alt={`${cs.name} logo`} fill sizes="48px" className="object-contain p-1.5" />
            </div>
            <div>
              <span className="eyebrow">Case file {fileNo}</span>
              <span className="mt-1 block font-mono-num text-xs uppercase tracking-[0.16em] text-ink">
                {cs.name}
              </span>
            </div>
          </div>

          <h1 className="mt-8 max-w-3xl text-4xl font-bold leading-[1.06] tracking-tighter text-ink md:text-6xl">
            <span className="clip-line">
              <span>{cs.headline}</span>
            </span>
          </h1>

          <p className="rise-3 mt-7 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
            {cs.summary}
          </p>

          {/* file particulars, set like a document header */}
          <dl className="rise-4 mt-10 grid gap-px border border-surface-line bg-surface-line sm:grid-cols-3">
            {[
              { t: "Client", d: cs.client },
              { t: "Industry", d: cs.industry },
              { t: "Engagement", d: cs.program },
            ].map((row) => (
              <div key={row.t} className="bg-void p-5">
                <dt className="font-mono-num text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                  {row.t}
                </dt>
                <dd className="mt-2 text-sm leading-snug text-ink">{row.d}</dd>
              </div>
            ))}
          </dl>

          <a
            href={cs.pdfUrl}
            download
            className="pill rise-4 mt-8 inline-flex items-center gap-2 px-6 py-3 text-ink transition-colors hover:border-gold hover:text-gold focus-ring"
          >
            Download the signed PDF
          </a>
        </div>
      </section>

      {/* ===== Headline figures ===== */}
      <section className="scan-top border-b border-surface-line">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <div className="grid gap-px border border-surface-line bg-surface-line sm:grid-cols-3">
            {cs.stats.map((s) => (
              <div key={s.label} className="min-w-0 bg-void p-6">
                <div className="font-mono-num text-3xl font-semibold text-gold md:text-4xl">
                  <CountUp value={s.value} />
                  {buildNote(s.value, ccy, rates) && (
                    <span className="ccy-note text-sm md:text-base">{buildNote(s.value, ccy, rates)}</span>
                  )}
                </div>
                <div className="mt-2 text-sm leading-snug text-ink-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== The statement ===== */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <Reveal>
          <p className="eyebrow">Every figure, itemised</p>
          <h2 className="mt-5 max-w-xl text-3xl font-bold leading-[1.08] tracking-tighter text-ink md:text-4xl">
            The account, <span className="hl">line by line.</span>
          </h2>
        </Reveal>
        <div className="mt-10">
          <CaseLedger
            metrics={localizedMetrics}
            fileNo={fileNo}
            client={cs.client}
            period={cs.program}
          />
        </div>

        {cs.proofImages.length > 0 && (
          <Reveal className="mt-16">
            <p className="eyebrow">Exhibits</p>
            <h2 className="mt-5 max-w-xl text-3xl font-bold leading-[1.08] tracking-tighter text-ink md:text-4xl">
              Straight from the <span className="hl">dashboards.</span>
            </h2>
            <ProofGallery images={cs.proofImages} name={cs.name} />
            <p className="mt-3 text-xs text-ink-muted">
              Screenshots from the actual Meta Ads, LinkedIn and Razorpay dashboards for this
              campaign. Click any image to view it full size.
            </p>
          </Reveal>
        )}

        {/* ===== The narrative ===== */}
        <div className="mt-20">
          <Reveal>
            <p className="eyebrow">How it was built</p>
          </Reveal>
          <div className="mt-8 border-t border-surface-line">
            {cs.details.map((d, i) => (
              <Reveal key={d.title} delay={i * 90}>
                <div className="grid gap-4 border-b border-surface-line py-9 md:grid-cols-[auto_1fr] md:gap-10">
                  <span className="font-mono-num text-xs text-ink-muted md:pt-1.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold leading-snug tracking-tight text-ink md:text-2xl">
                      {d.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
                      {d.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 font-mono-num text-xs uppercase tracking-[0.14em] text-ink-muted">
            Strategy: {cs.strategy}
          </p>
        </div>
      </section>

      {/* ===== Next file / CTA ===== */}
      <section className="border-t border-surface-line">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <p className="eyebrow">Your turn</p>
          <h2 className="mt-5 max-w-xl text-3xl font-bold leading-[1.08] tracking-tighter text-ink md:text-4xl">
            We would open a file <span className="hl">like this on your account.</span>
          </h2>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/strategy-call"
              className="cta-pulse rounded-md bg-ink px-7 py-3 text-sm font-medium text-void transition-colors hover:bg-gold focus-ring"
            >
              Book a strategy call
            </Link>
            <Link
              href="/case-studies"
              className="pill px-7 py-3 text-ink transition-colors hover:border-gold hover:text-gold focus-ring"
            >
              Read the other files
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
