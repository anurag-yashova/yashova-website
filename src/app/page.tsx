import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import HeroChart from "@/components/HeroChart";
import VideoTestimonial from "@/components/VideoTestimonial";
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
  NoEqualIcon,
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
      { value: "67%", label: "Conversion ↑" },
      { value: "45%", label: "CPL Reduction" },
      { value: "4.2x", label: "ROAS" },
    ],
    strategy: "Funnel optimization + retargeting",
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

const beliefs = ["More ads ≠ more profit", "Traffic ≠ sales", "Cheap leads ≠ good leads"];

const testimonials = [
  { video: "/videos/buyernest.mp4", label: "Buyernest", quote: "We started with zero expectations… but in just 4 weeks, our leads went from 120 to 340+. What surprised us more? The quality — people were actually ready to buy." },
  { video: "/videos/theaudiolearning.mp4", label: "TheAudioLearning", quote: "Earlier, we were paying ₹80–₹100 per lead. Now it's consistently around ₹25–₹35. But the real win? Conversions almost doubled within a month." },
  { video: "/videos/cvolvepro.mp4", label: "CvolvePro", quote: "We saw a 2.7x increase in conversions in 30 days. Same budget, but much better targeting and creatives. It finally felt like ads were working with us, not against us." },
  { video: "/videos/fundraising.mp4", label: "Fundraising Campaign", quote: "In less than 30 days, our leads jumped from 200 to 600+. But what really changed was the intent — we started getting people who were genuinely interested, not just clicking." },
  { video: "/videos/life_coach.mp4", label: "Life Coach", quote: "We reduced our cost per lead by nearly 60% and increased qualified leads by 3x in one month. Sales calls became easier because we were speaking to the right audience." },
  { video: "/videos/student_ngo.mp4", label: "Student NGO", quote: "Before this, we were struggling to get even 5–6 quality leads a day. Now we consistently get 20–25+ — and a good percentage of them actually convert." },
];

const clients = ["Buyernest", "TheAudioLearning", "CvolvePro", "Digital Africa", "Investmate", "Tradebazar", "Earthling Trust", "Helping Hands", "Digiraag"];

export default function Home() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden border-b border-glass-border">
        <div className="dot-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(215,175,55,0.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid items-center gap-14 md:grid-cols-2">
            <div>
              <h1 className="rise-1 text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-6xl">
                No Hype.
                <br />
                Just <span className="hl">Revenue.</span>
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
                  className="cta-pulse rounded-full bg-gold px-6 py-3 text-sm font-medium text-on-gold transition-colors hover:bg-gold-bright focus-ring"
                >
                  Get My Free Audit →
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
                  </div>
                  <div className="text-xs text-ink-muted">ad spend managed profitably</div>
                </div>
              </div>
            </div>

            <div className="rise-3 relative">
              <div className="glass rounded-3xl p-6 md:p-8">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
                    Campaign Revenue
                  </span>
                  <span className="rounded-full bg-signal/10 px-2.5 py-0.5 text-xs font-semibold text-signal">
                    ▲ Live systems
                  </span>
                </div>
                <HeroChart />
                <div className="mt-5 grid grid-cols-3 gap-3 border-t border-glass-border pt-5 text-center">
                  <div>
                    <div className="font-mono-num text-lg font-semibold text-gold"><CountUp value="₹1.02Cr" /></div>
                    <div className="text-[10px] text-ink-muted">Revenue (TAL)</div>
                  </div>
                  <div>
                    <div className="font-mono-num text-lg font-semibold text-gold"><CountUp value="5.5X" /></div>
                    <div className="text-[10px] text-ink-muted">ROAS</div>
                  </div>
                  <div>
                    <div className="font-mono-num text-lg font-semibold text-gold"><CountUp value="11,246" /></div>
                    <div className="text-[10px] text-ink-muted">Payments Captured</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 -right-3 hidden md:block">
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-[3px] border-gold bg-surface shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                  <Image
                    src="/images/anurag-profile.png"
                    alt="Anurag from Yashova"
                    fill
                    sizes="96px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <div className="glass card-hover h-full rounded-2xl p-6">
                <a.icon className="text-gold" />
                <h3 className="mt-4 text-lg font-semibold text-ink">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{a.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== What we do ===== */}
      <section className="border-y border-glass-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              What We Actually Do <span className="hl">(That Gets Results)</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 110}>
                <div className="card-hover h-full rounded-2xl border border-surface-line/60 bg-void p-7">
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
            <Link href="/case-studies" className="text-sm font-semibold text-gold hover:text-gold-bright">
              View all case studies →
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.slug} delay={i * 110}>
              <Link
                href={`/case-studies/${cs.slug}`}
                className="card-hover group block h-full rounded-2xl border border-surface-line/60 bg-surface p-7 focus-ring"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-white/90 p-1">
                    <Image src={cs.logo} alt={`${cs.name} logo`} fill sizes="44px" className="object-contain p-1" />
                  </div>
                  <h3 className="text-lg font-semibold text-ink group-hover:text-gold">{cs.name}</h3>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {cs.stats.map((s) => (
                    <div key={s.label}>
                      <div className="font-mono-num text-lg font-semibold text-gold">
                        <CountUp value={s.value} />
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

      {/* ===== How we work ===== */}
      <section className="border-y border-glass-border bg-surface/40">
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
              <VideoTestimonial src={t.video} label={t.label} quote={t.quote} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Why most marketing advice is wrong ===== */}
      <section className="border-y border-glass-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Why Most <span className="hl">Marketing</span> Advice is Wrong
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {beliefs.map((b, i) => (
              <Reveal key={b} delay={i * 100}>
                <div className="glass card-hover flex h-full items-center gap-4 rounded-2xl p-6">
                  <NoEqualIcon className="shrink-0 text-gold" />
                  <p className="text-lg font-medium text-ink">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={150}>
            <p className="mt-10 max-w-2xl text-xl font-medium leading-snug text-ink">
              Hacks expire. Systems compound. If you&apos;re done chasing
              shortcuts, let&apos;s build something that actually scales.
            </p>
          </Reveal>
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
            className="cta-pulse mt-8 inline-block rounded-full bg-gold px-8 py-3.5 text-sm font-medium text-on-gold transition-colors hover:bg-gold-bright focus-ring"
          >
            Book My Free Strategy Call →
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
          <div className="marquee-track gap-3 pr-3">
            {[...clients, ...clients].map((c, i) => (
              <span
                key={`${c}-${i}`}
                className="whitespace-nowrap rounded-full border border-glass-border px-5 py-2 text-sm font-bold italic text-ink-muted"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
