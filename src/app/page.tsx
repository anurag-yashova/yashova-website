import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import VideoTestimonial from "@/components/VideoTestimonial";
import LedgerHero from "@/components/LedgerHero";
import ProofBar from "@/components/ProofBar";
import FunnelDiagram from "@/components/FunnelDiagram";
import LeakFunnel from "@/components/LeakFunnel";
import BeforeAfter from "@/components/BeforeAfter";
import { buildNote } from "@/lib/currency";
import { getCurrency, getRates } from "@/lib/currency-server";
import {
  CoachIcon,
  HealthIcon,
  BuildingIcon,
  RocketIcon,
  TargetIcon,
  FunnelIcon,
  StrategyIcon,
  SearchInsightIcon,
  MapIcon,
  TeamIcon,
  ScaleUpIcon,
  MarkSignal,
  MarkCase,
  MarkTool,
} from "@/components/icons";

const audiences = [
  { icon: CoachIcon, title: "Coaches & Course Creators", body: "Scale your knowledge business with high-converting funnels." },
  { icon: HealthIcon, title: "Healthcare & Medical Institutes", body: "Generate qualified patient leads consistently." },
  { icon: BuildingIcon, title: "Real Estate & Local Businesses", body: "Fill your pipeline with ready-to-buy prospects." },
  { icon: RocketIcon, title: "Startups & D2C Brands", body: "Accelerate growth with data-driven acquisition." },
];

const capabilities = [
  {
    icon: TargetIcon,
    title: "Performance Marketing",
    body: "We don't run ads. We build systems that convert clicks into paying customers.",
    tags: ["Meta Ads", "Google Ads", "Programmatic"],
  },
  {
    icon: FunnelIcon,
    title: "Lead Generation Funnels",
    body: "Landing pages + WhatsApp automation + follow-ups = higher conversions.",
    tags: ["Landing Pages", "WhatsApp Automation", "CRM"],
  },
  {
    icon: StrategyIcon,
    title: "Growth Strategy",
    body: "We don't guess. We analyze, test, and scale what works.",
    tags: ["A/B Testing", "Analytics", "Scaling"],
  },
];

const caseStudies = [
  {
    slug: "theaudiolearning",
    name: "TheAudioLearning",
    logo: "/images/case-studies/tal-logo.png",
    stats: [
      { value: "₹1.02Cr+", label: "Revenue Generated" },
      { value: "5.5X", label: "ROAS" },
      { value: "780+", label: "Admissions" },
    ],
    strategy: "Webinar funnel + WhatsApp follow-up",
  },
  {
    slug: "cvolvepro",
    name: "CvolvePro",
    logo: "/images/case-studies/cvolvepro-logo.png",
    stats: [
      { value: "222,630+", label: "Professional Reach" },
      { value: "8,752", label: "Total Clicks" },
      { value: "₹4.69", label: "Average CPC" },
    ],
    strategy: "LinkedIn Sponsored Content + Video Campaigns",
  },
  {
    slug: "helping-hands-foundation",
    name: "Helping Hands Foundation",
    logo: "/images/case-studies/hhf-logo.png",
    stats: [
      { value: "₹30.1L+", label: "Donations Collected" },
      { value: "4.5X", label: "ROAS" },
      { value: "11,246", label: "Captured Payments" },
    ],
    strategy: "Meta Ads + Pixel/CAPI + Funnel Optimization",
  },
];

const process = [
  { icon: SearchInsightIcon, n: "01", title: "Understand the Business", body: "Deep dive into your market, audience, and current positioning to build a foundation of clarity." },
  { icon: MapIcon, n: "02", title: "Define Scope & Strategy", body: "Craft a tailored roadmap with clear objectives, timelines, and measurable milestones." },
  { icon: TeamIcon, n: "03", title: "Execute with a Dedicated Team", body: "Your campaigns are managed by specialists who understand your brand inside and out." },
  { icon: ScaleUpIcon, n: "04", title: "Optimise & Scale", body: "Continuous refinement based on data, with a focus on sustainable, long-term growth." },
];

const testimonials = [
  {
    video: "/videos/buyernest.mp4",
    label: "Buyernest",
    role: "B2B lead generation · automation & nurture",
    quote: "We started with zero expectations. In four weeks our leads went from 120 to 340+ — and the quality changed more than the number. People were actually ready to buy.",
  },
  {
    video: "/videos/theaudiolearning.mp4",
    label: "TheAudioLearning",
    role: "Webinar funnel · admissions",
    quote: "We were paying ₹80–₹100 per lead. It settled around ₹25–₹35. The real win was conversions almost doubling in the same month.",
  },
  {
    video: "/videos/cvolvepro.mp4",
    label: "CvolvePro",
    role: "LinkedIn growth marketing",
    quote: "2.7x more conversions in 30 days on the same budget. Better targeting, better creative. It finally felt like the ads were working with us instead of against us.",
  },
  {
    video: "/videos/fundraising.mp4",
    label: "Knowledge Prism",
    role: "End-to-end marketing",
    quote: "In under 30 days our leads went from 200 to 600+. What actually changed was intent — we started hearing from people who genuinely wanted this, not just clickers.",
  },
  {
    video: "/videos/life_coach.mp4",
    label: "Bebrainteaser",
    role: "B2C funnels · WhatsApp marketing",
    quote: "Cost per lead dropped by nearly 60% and qualified leads tripled in a month. Sales calls got easier because we were finally speaking to the right audience.",
  },
  {
    video: "/videos/student_ngo.mp4",
    label: "Student NGO",
    role: "Donor acquisition",
    quote: "We used to struggle for five or six decent leads a day. Now it is consistently 20–25, and a good share of them actually convert.",
  },
];

const clients: { name: string; logo?: string }[] = [
  { name: "TheAudioLearning", logo: "/images/clients/theaudiolearning.jpg" },
  { name: "CvolvePro", logo: "/images/clients/cvolvepro.jpg" },
  { name: "Helping Hands Foundation", logo: "/images/clients/helping-hands.jpg" },
  { name: "Buyernest", logo: "/images/clients/buyernest.jpg" },
  { name: "Knowledge Prism", logo: "/images/clients/knowledge-prism.jpg" },
  { name: "Investmate", logo: "/images/clients/investmate.jpg" },
  { name: "Tradebazarr", logo: "/images/clients/tradebazarr.jpg" },
  { name: "Digital Riches", logo: "/images/clients/digital-riches.jpg" },
  { name: "Merhba Boutique", logo: "/images/clients/merhba-boutique.jpg" },
  { name: "Bebrainteaser" },
  { name: "Digiraag" },
];

export default async function Home() {
  const ccy = await getCurrency();
  const rates = await getRates();
  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden border-b border-glass-border">
        <div className="dot-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(215,175,55,0.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid items-center gap-14 md:grid-cols-2">
            <div>
              <h1 className="text-5xl font-bold leading-[1.06] tracking-tighter text-ink md:text-7xl lg:text-8xl">
                <span className="clip-line"><span>No Hype.</span></span>
                <span className="clip-line"><span>Just <span className="hl">Revenue.</span></span></span>
              </h1>
              <p className="rise-2 mt-5 text-lg font-medium text-ink">
                Trusted by 150+ brands globally to cut ad waste.
              </p>
              <p className="rise-2 mt-4 max-w-md text-base leading-relaxed text-ink-muted">
                Most ad spend gets wasted on non-converting clicks. We design
                end-to-end marketing systems that track spend, qualify leads,
                and maximize ROI.
              </p>
              <div className="rise-3 mt-8 flex flex-wrap gap-4">
                <Link
                  href="/ai-audit"
                  className="cta-pulse rounded-md bg-ink px-6 py-3 text-sm font-medium text-void transition-colors hover:bg-gold focus-ring"
                >
                  Get My Free Audit
                </Link>
                <Link
                  href="/case-studies"
                  className="pill px-6 py-3 text-sm text-ink transition-colors hover:border-gold hover:text-gold focus-ring"
                >
                  See Real Results
                </Link>
              </div>
              <div className="rise-4 mt-10 flex gap-10">
                <div>
                  <div className="font-mono-num text-2xl font-semibold text-ink">
                    <CountUp value="150+" />
                  </div>
                  <div className="text-xs text-ink-muted">brands scaled</div>
                </div>
                <div>
                  <div className="font-mono-num text-2xl font-semibold text-ink">
                    <CountUp value="₹2.5Cr+" />
                    {buildNote("₹2.5Cr+", ccy, rates) && (
                      <span className="ccy-note text-sm">{buildNote("₹2.5Cr+", ccy, rates)}</span>
                    )}
                  </div>
                  <div className="text-xs text-ink-muted">ad spend managed profitably</div>
                </div>
              </div>
            </div>

            <div className="rise-3 relative">
              <LedgerHero ccy={ccy} rates={rates} />
            </div>
          </div>
        </div>
      </section>

      <ProofBar />

      {/* ===== Who we work with ===== */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Who We <span className="hl">Work With</span>
          </h2>
          <p className="mt-3 max-w-lg text-ink-muted">
            If you&apos;re spending money on ads and not getting predictable returns, you&apos;re in the right place.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => (
            <Reveal key={a.title} delay={i * 90}>
              <div className="glass card-hover h-full rounded-lg p-6">
                <a.icon className="text-gold" />
                <h3 className="mt-4 text-lg font-semibold text-ink">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{a.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== What we do ===== */}
      <section className="scan-top border-y border-glass-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              What We Actually Do <span className="hl">(That Gets Results)</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 110} from={i === 0 ? "left" : i === 2 ? "right" : "up"}>
                <div className="card-hover h-full rounded-lg border border-surface-line/60 bg-void p-7">
                  <c.icon className="text-gold" />
                  <h3 className="mt-4 text-xl font-semibold text-ink">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{c.body}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span key={t} className="pill px-3 py-1 text-xs text-ink-muted">{t}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Case studies ===== */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                Case <span className="hl">studies</span>
              </h2>
              <p className="mt-3 text-ink-muted">Real campaigns. Real numbers. No manufactured results.</p>
            </div>
            <Link href="/case-studies" className="link-line font-mono-num text-xs uppercase tracking-[0.14em] text-ink">
              View all case studies
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.slug} delay={i * 110} from="zoom">
              <Link
                href={`/case-studies/${cs.slug}`}
                className="card-hover group block h-full rounded-lg border border-surface-line/60 bg-surface p-7 focus-ring"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md bg-white/90 p-1">
                    <Image src={cs.logo} alt={`${cs.name} logo`} fill sizes="44px" className="object-contain p-1" />
                  </div>
                  <h3 className="text-lg font-semibold text-ink group-hover:text-gold">{cs.name}</h3>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-3 xs:grid-cols-3 sm:grid-cols-3">
                  {cs.stats.map((s) => (
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
                <p className="mt-5 text-xs text-ink-muted">Strategy: {cs.strategy}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Before / after ===== */}
      <section className="border-y border-surface-line">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <Reveal>
            <p className="eyebrow has-icon"><MarkSignal className="eyebrow-icon" />Before we touched it / after</p>
            <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.08] tracking-tighter text-ink md:text-5xl">
              Same budget. <span className="hl">Different arithmetic.</span>
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-muted">
              Cost per result on accounts we took over &mdash; before and after
              the tracking, funnel and follow-up were rebuilt.
            </p>
          </Reveal>
          <div className="mt-12">
            <BeforeAfter ccy={ccy} rates={rates} />
          </div>
        </div>
      </section>

      {/* ===== How we work ===== */}
      <section className="scan-top border-y border-glass-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              How We <span className="hl">Work</span>
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-10 md:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.n} delay={i * 120}>
                <li className="relative h-full">
                  <div className="flex items-center gap-3">
                    <p.icon className="text-gold" />
                    <span className="font-mono-num text-sm text-gold/70">{p.n}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            What Clients <span className="hl">Say</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.label} delay={(i % 3) * 100}>
              <VideoTestimonial src={t.video} label={t.label} role={t.role} quote={t.quote} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Where the money leaks ===== */}
      <section className="scan-top border-y border-surface-line">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <Reveal>
            <p className="eyebrow has-icon"><MarkCase className="eyebrow-icon" />The diagnosis</p>
            <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.08] tracking-tighter text-ink md:text-5xl">
              Your ads aren&apos;t the problem. <span className="hl">The leak is after the click.</span>
            </h2>
          </Reveal>
          <div className="mt-12">
            <LeakFunnel />
          </div>
          <Reveal delay={100}>
            <p className="mt-12 max-w-2xl text-lg font-medium leading-snug text-ink md:text-xl">
              More ads never fixed a leaking funnel. Hacks expire, systems
              compound &mdash; and the system is the part nobody sells you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== One real funnel, to scale ===== */}
      <section className="scan-top border-y border-surface-line">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal from="left">
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow has-icon"><MarkTool className="eyebrow-icon" />One campaign, taken to scale</p>
                <h2 className="mt-5 text-3xl font-bold leading-[1.08] tracking-tighter text-ink md:text-5xl">
                  Where the money <span className="hl">actually goes</span>
                </h2>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
                  Every stage below is drawn to scale from one real account &mdash;
                  120 days, ₹18.6L spent, ₹1.02Cr returned. Most agencies show you
                  the first line. The business is decided by the last one.
                </p>
                <Link
                  href="/case-studies/theaudiolearning"
                  className="link-line mt-8 inline-block font-mono-num text-xs uppercase tracking-[0.14em] text-ink"
                >
                  Read the full breakdown
                </Link>
              </div>
            </Reveal>
            <Reveal from="right" delay={120}>
              <FunnelDiagram />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="relative mx-auto max-w-6xl overflow-hidden px-6 py-20 text-center">
        <div className="dot-grid pointer-events-none absolute inset-0" />
        <Reveal className="relative">
          <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Your ads should be making you money, <span className="hl">Let&apos;s make that happen.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-ink-muted">
            If you are looking for structured marketing execution rather than
            shortcuts, let&apos;s start with a discussion.
          </p>
          <Link
            href="/strategy-call"
            className="cta-pulse mt-8 inline-block rounded-md bg-ink px-8 py-3.5 text-sm font-medium text-void transition-colors hover:bg-gold focus-ring"
          >
            Book My Free Strategy Call
          </Link>
        </Reveal>
      </section>

      {/* ===== Trusted by (marquee) ===== */}
      <section className="border-t border-glass-border bg-surface/40 py-14">
        <Reveal>
          <h2 className="text-center text-2xl font-semibold text-ink">
            Trusted by businesses <span className="hl">worldwide</span>
          </h2>
        </Reveal>
        <div className="mt-8 overflow-hidden" aria-label="Client list">
          <div className="marquee-track items-center gap-8 pr-8">
            {[...clients, ...clients].map((c, i) =>
              c.logo ? (
                <span key={`${c.name}-${i}`} className="client-mark" title={c.name}>
                  <Image
                    src={c.logo}
                    alt={c.name}
                    width={120}
                    height={120}
                    className="h-full w-full object-contain"
                  />
                </span>
              ) : (
                <span key={`${c.name}-${i}`} className="client-word">
                  {c.name}
                </span>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}
