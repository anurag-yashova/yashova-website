import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { caseStudies } from "@/lib/case-studies";
import CountUp from "@/components/CountUp";
import PageHero from "@/components/PageHero";
import { MarkCase } from "@/components/icons";
import Reveal from "@/components/Reveal";
import { buildNote } from "@/lib/currency";
import { getCurrency, getRates } from "@/lib/currency-server";
import { pageMeta } from "@/lib/seo";


export const metadata: Metadata = pageMeta({
  title: "Performance Marketing Case Studies",
  description:
    "Real campaigns with real numbers from Yashova: medical coding admissions, an AI resume tool and an NGO donation funnel. Spend, leads, revenue and what drove them.",
  path: "/case-studies",
});

export default async function CaseStudiesIndex() {
  const ccy = await getCurrency();
  const rates = await getRates();
  return (
    <>
    <PageHero
      eyebrow="Receipts, not adjectives"
        icon={MarkCase}
      index="03"
      title={<>Real campaigns. <span className="hl">Real numbers.</span></>}
      lead="We partner with ambitious businesses ready to scale profitably. No manufactured results."
    />
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-6 lg:grid-cols-3">
        {caseStudies.map((cs, i) => (
          <Reveal key={cs.slug} delay={i * 110}>
          <Link
            href={`/case-studies/${cs.slug}`}
            className="card-hover group flex flex-col rounded-lg border border-surface-line/60 bg-surface p-7 focus-ring"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md bg-white/90">
                <Image src={cs.logo} alt={`${cs.name} logo`} fill sizes="44px" className="object-contain p-1" />
              </div>
              <h2 className="text-xl font-semibold text-ink group-hover:text-gold">{cs.name}</h2>
            </div>
            <p className="mt-2 text-sm text-ink-muted">{cs.industry}</p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {cs.stats.slice(0, 3).map((s) => (
                <div key={s.label} className="min-w-0">
                  <div className="font-mono-num text-lg font-semibold text-gold">
                    <CountUp value={s.value} />
                    {buildNote(s.value, ccy, rates) && (
                      <span className="ccy-note">{buildNote(s.value, ccy, rates)}</span>
                    )}
                  </div>
                  <div className="text-[11px] leading-tight text-ink-muted">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-ink-muted">Strategy: {cs.strategy}</p>
            <span className="link-line mt-5 self-start font-mono-num text-xs uppercase tracking-[0.14em] text-ink">Read case study</span>
          </Link>
          </Reveal>
        ))}
      </div>
    </section>
    </>
  );
}
