import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { MarkSearch } from "@/components/icons";
import { getAllTeardowns, spendLabel } from "@/lib/teardowns";
import { pageMeta } from "@/lib/seo";
import PrimaryCta from "@/components/PrimaryCta";

/* Scheduled publishing: content is filtered by publishedAt at request time, so this
   page must not be frozen at build. Re-generates hourly; future-dated posts appear
   on their own date without a deploy. */
export const revalidate = 3600;

export const metadata: Metadata = pageMeta({
  title: "Ad and Funnel Teardowns",
  description:
    "Public audits of live ads, landing pages and funnels: what is leaking, why, and what we would change first. Real diagnoses, brands anonymised.",
  path: "/teardowns",
});

const severityLabel = { critical: "Critical", major: "Major", minor: "Minor" } as const;

export default function Teardowns() {
  const items = getAllTeardowns();

  return (
    <>
      <PageHero
        eyebrow="Nothing here is a client"
        icon={MarkSearch}
        index="02"
        title={<>We audit ads <span className="hl">in public.</span></>}
        lead="Live campaigns, real landing pages, honest diagnoses. We do not publish our clients' creative — we publish the thinking. Brands are anonymised; the failures are not."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        {items.length === 0 ? (
          <p className="text-ink-muted">First teardown lands shortly.</p>
        ) : (
          <div className="border-t border-surface-line">
            {items.map((t, i) => (
              <Reveal key={t.slug} delay={(i % 3) * 80}>
                <Link
                  href={`/teardowns/${t.slug}`}
                  className="group grid gap-5 border-b border-surface-line py-9 focus-ring md:grid-cols-[1fr_1.6fr] md:gap-12"
                >
                  <div>
                    <span className="font-mono-num text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                      {t.category}
                    </span>
                    <p className="mt-2 text-sm text-ink-muted">{t.subject}</p>
                    <p className="mt-3 font-mono-num text-xs text-ink">{spendLabel(t.spend)}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {(["critical", "major", "minor"] as const).map((sev) => {
                        const n = t.findings.filter((f) => f.severity === sev).length;
                        if (!n) return null;
                        return (
                          <span key={sev} className={`sev sev-${sev}`}>
                            {n} {severityLabel[sev]}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold leading-[1.12] tracking-tight text-ink transition-colors group-hover:text-gold md:text-3xl">
                      {t.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
                      {t.excerpt}
                    </p>
                    <p className="mt-4 font-mono-num text-xs uppercase tracking-[0.14em] text-gold">
                      Verdict: {t.verdict}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal>
          <div className="mt-16 border border-surface-line p-8">
            <p className="eyebrow">Want yours done</p>
            <h2 className="mt-4 max-w-xl text-2xl font-bold tracking-tight text-ink md:text-3xl">
              We will run the same teardown on your account.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-muted">
              Privately, with account access, and with the numbers we cannot see from
              outside. Nothing gets published.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/ai-audit"
                className="cta-pulse rounded-md bg-ink px-6 py-3 text-sm font-medium text-void transition-colors hover:bg-gold focus-ring"
              >
                Run the free scan
              </Link>
              <PrimaryCta
          whatsappLabel="Ask for a teardown on WhatsApp"
          message="Hi, I would like a teardown of my ads or funnel."
                className="pill px-6 py-3 text-ink transition-colors hover:border-gold hover:text-gold focus-ring"
              >
                Book a teardown call
              </PrimaryCta>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
