import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Why Yashova exists, and the person behind it.",
};

const differentiators = [
  "Full-service execution — strategy, social, ads, funnels, all in one place",
  "No cookie-cutter packages — every engagement is built around your business goals",
  "Senior-level attention on every account, not junior handoffs",
  "Weekly updates and transparent reporting — you always know what's happening",
  "We focus on business outcomes — revenue, leads, admissions — not vanity metrics",
  "Long-term partnerships over short-term contracts",
];

const process = [
  { n: "01", title: "Understand the Business", body: "Deep dive into your market, audience, and current positioning to build a foundation of clarity." },
  { n: "02", title: "Define Scope & Strategy", body: "Craft a tailored roadmap with clear objectives, timelines, and measurable milestones." },
  { n: "03", title: "Execute with a Dedicated Team", body: "Your campaigns are managed by specialists who understand your brand inside and out." },
  { n: "04", title: "Optimise & Scale", body: "Continuous refinement based on data, with a focus on sustainable, long-term growth." },
];

export default function About() {
  return (
    <>
      <section className="border-b border-surface-line/60">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            We build marketing systems that drive real business growth
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
            From strategy to execution — social media, paid ads, funnels, and
            brand building — all under one roof.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="chevron text-xs font-semibold uppercase tracking-[0.25em] text-gold">Why We Exist</p>
        <div className="mt-5 space-y-5 text-base leading-relaxed text-ink-muted">
          <p>
            Most business owners have been burned — by agencies that
            overpromise, disappear after onboarding, and send reports full of
            numbers that don&apos;t explain outcomes.
          </p>
          <p>
            Yashova was built out of frustration with that model. We&apos;re a
            full-service digital marketing agency covering everything from
            brand strategy and social to paid acquisition and funnel design.
          </p>
          <p>
            We work with coaches, healthcare brands, D2C businesses, and
            educational institutions who are serious about structured,
            long-term growth — not quick fixes.
          </p>
        </div>

        <h3 className="mt-14 text-xl font-semibold text-ink">How We&apos;re Different</h3>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {differentiators.map((d) => (
            <li key={d} className="flex gap-3 rounded-xl border border-surface-line/60 bg-surface p-5 text-sm leading-relaxed text-ink-muted">
              <span className="text-gold">»</span>
              {d}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-surface-line/60 bg-surface/40">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="flex flex-col items-start gap-8 sm:flex-row">
            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border border-surface-line/60">
              <Image
                src="/images/anurag-profile.png"
                alt="Anurag Sharma, founder of Yashova"
                fill
                sizes="128px"
                className="object-contain object-top"
              />
            </div>
            <div>
              <p className="chevron text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                The Person Behind Yashova
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                I&apos;m Anurag Sharma, founder of Yashova. I&apos;ve spent
                years helping businesses across multiple industries build
                marketing that actually works — from brand strategy to
                full-funnel execution.
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                Every client we take on gets my personal involvement in
                strategy. You won&apos;t be handed off to someone learning on
                the job with your budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="chevron text-xs font-semibold uppercase tracking-[0.25em] text-gold">How We Work</p>
        <ol className="mt-10 grid gap-8 sm:grid-cols-2">
          {process.map((p) => (
            <li key={p.n} className="rounded-xl border border-surface-line/60 bg-surface p-6">
              <div className="font-mono-num text-sm text-gold">{p.n}</div>
              <h3 className="mt-2 text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
        <h2 className="text-2xl font-semibold text-ink">
          If you value clarity, consistency, and long-term partnerships — let&apos;s talk.
        </h2>
        <Link
          href="/strategy-call"
          className="mt-8 inline-block rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-void transition-colors hover:bg-gold-bright focus-ring"
        >
          Book a Strategy Call
        </Link>
      </section>
    </>
  );
}
