import type { Metadata } from "next";
import AuditTool from "./AuditTool";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

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
    <>
      <PageHero
        eyebrow="Limited Audit Slots Available"
        title={<>Find what&apos;s <span className="hl">blocking your growth</span></>}
        lead="Run an instant automated scan of your site, then get the full ads + funnel breakdown on a free call."
      />
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <div className="grid gap-5 sm:grid-cols-3">
          {points.map((p, i) => (
            <Reveal key={p} delay={i * 100}>
              <div className="glass card-hover h-full rounded-2xl p-6">
                <h3 className="text-base font-semibold text-ink">{p}</h3>
              </div>
            </Reveal>
          ))}
        </div>

        <AuditTool />

        <div className="mt-14 border-t border-glass-border pt-10">
          <a
            href="https://wa.me/919818086846?text=Hi%2C%20I%20saw%20your%20Growth%20Audit.%20Can%20you%20review%20my%20marketing%20setup%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-pulse inline-block rounded-full bg-gold px-8 py-3.5 text-sm font-medium text-on-gold hover:bg-gold-bright focus-ring"
          >
            Audit My Growth →
          </a>
          <p className="mt-4 text-sm text-ink-muted">
            &ldquo;Ads. Funnel. Conversion — Full breakdown in 30 mins&rdquo;
          </p>
        </div>
      </section>
    </>
  );
}
