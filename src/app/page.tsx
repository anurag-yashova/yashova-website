import Link from "next/link";
import Image from "next/image";

const audiences = [
  { title: "Coaches & Course Creators", body: "Scale your knowledge business with high-converting funnels." },
  { title: "Healthcare & Medical Institutes", body: "Generate qualified patient leads consistently." },
  { title: "Real Estate & Local Businesses", body: "Fill your pipeline with ready-to-buy prospects." },
  { title: "Startups & D2C Brands", body: "Accelerate growth with data-driven acquisition." },
];

const capabilities = [
  {
    title: "Performance Marketing",
    body: "We don't run ads. We build systems that convert clicks into paying customers.",
    tags: ["Meta Ads", "Google Ads", "Programmatic"],
  },
  {
    title: "Lead Generation Funnels",
    body: "Landing pages + WhatsApp automation + follow-ups = higher conversions.",
    tags: ["Landing Pages", "WhatsApp Automation", "CRM"],
  },
  {
    title: "Growth Strategy",
    body: "We don't guess. We analyze, test, and scale what works.",
    tags: ["A/B Testing", "Analytics", "Scaling"],
  },
];

const caseStudies = [
  {
    slug: "theaudiolearning",
    name: "TheAudioLearning",
    stats: [
      { value: "850+", label: "Leads Generated" },
      { value: "₹42", label: "Cost per Lead" },
      { value: "12.5%", label: "Conversion Rate" },
    ],
    strategy: "Webinar funnel + WhatsApp follow-up",
  },
  {
    slug: "cvolvepro",
    name: "CvolvePro",
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
    stats: [
      { value: "₹30.1L+", label: "Donations Collected" },
      { value: "4.5X", label: "ROAS" },
      { value: "11,246", label: "Captured Payments" },
    ],
    strategy: "Meta Ads + Pixel/CAPI + Funnel Optimization",
  },
];

const process = [
  { n: "01", title: "Understand the Business", body: "Deep dive into your market, audience, and current positioning to build a foundation of clarity." },
  { n: "02", title: "Define Scope & Strategy", body: "Craft a tailored roadmap with clear objectives, timelines, and measurable milestones." },
  { n: "03", title: "Execute with a Dedicated Team", body: "Your campaigns are managed by specialists who understand your brand inside and out." },
  { n: "04", title: "Optimise & Scale", body: "Continuous refinement based on data, with a focus on sustainable, long-term growth." },
];

const beliefs = [
  "More ads ≠ more profit",
  "Traffic ≠ sales",
  "Cheap leads ≠ good leads",
];

const testimonials = [
  { quote: "We started with zero expectations… but in just 4 weeks, our leads went from 120 to 340+. What surprised us more? The quality — people were actually ready to buy.", attribution: "Puru" },
  { quote: "Earlier, we were paying ₹80–₹100 per lead. Now it's consistently around ₹25–₹35. But the real win? Conversions almost doubled within a month.", attribution: "Client testimonial" },
  { quote: "We saw a 2.7x increase in conversions in 30 days. Same budget, but much better targeting and creatives. It finally felt like ads were working with us, not against us.", attribution: "Nisar" },
  { quote: "In less than 30 days, our leads jumped from 200 to 600+. But what really changed was the intent — we started getting people who were genuinely interested, not just clicking.", attribution: "Nitin" },
  { quote: "We reduced our cost per lead by nearly 60% and increased qualified leads by 3x in one month. Sales calls became easier because we were speaking to the right audience.", attribution: "Apara" },
  { quote: "Before this, we were struggling to get even 5–6 quality leads a day. Now we consistently get 20–25+ — and a good percentage of them actually convert.", attribution: "Ashish" },
];

const clients = [
  "Buyernest", "TheAudioLearning", "CvolvePro", "Digital Africa",
  "Investmate", "Tradebazar", "Earthling Trust", "Helping Hands", "Digiraag",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-glass-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(215,175,55,0.08),transparent_60%)]" />
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-6xl">
                No Hype.
                <br />
                Just <span className="hl">Revenue.</span>
              </h1>
              <p className="mt-5 text-lg font-medium text-ink">
                Trusted by 150+ brands globally to cut ad waste.
              </p>
              <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">
                Most ad spend gets wasted on non-converting clicks. We design
                end-to-end marketing systems that track spend, qualify leads,
                and maximize ROI.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/ai-audit"
                  className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-void transition-colors hover:bg-gold-bright focus-ring"
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
              <ul className="mt-10 flex flex-col gap-2 text-sm text-ink-muted">
                <li className="flex items-center gap-2">
                  <span className="text-gold">●</span> 150+ brands scaled
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold">●</span> ₹2.5 Cr+ ad spend managed profitably
                </li>
              </ul>
            </div>
            <div className="relative mx-auto aspect-square w-full max-w-sm">
              <Image
                src="/images/anurag-profile.png"
                alt="Anurag from Yashova, performance marketing expert"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Who We <span className="hl">Work With</span>
        </h2>
        <p className="mt-3 max-w-lg text-ink-muted">
          If you&apos;re spending money on ads and not getting predictable
          returns, you&apos;re in the right place.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <div key={a.title} className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-ink">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What we do */}
      <section className="border-y border-glass-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            What We Actually Do <span className="hl">(That Gets Results)</span>
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {capabilities.map((c) => (
              <div key={c.title} className="rounded-2xl border border-surface-line/60 bg-void p-7">
                <h3 className="text-xl font-semibold text-ink">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{c.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span key={t} className="pill px-3 py-1 text-xs text-ink-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="mx-auto max-w-6xl px-6 py-20">
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
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              href={`/case-studies/${cs.slug}`}
              className="group rounded-2xl border border-surface-line/60 bg-surface p-7 transition-colors hover:border-gold/60 focus-ring"
            >
              <h3 className="text-xl font-semibold text-ink group-hover:text-gold">{cs.name}</h3>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {cs.stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-mono-num text-lg font-semibold text-gold">{s.value}</div>
                    <div className="text-[11px] leading-tight text-ink-muted">{s.label}</div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs text-ink-muted">Strategy: {cs.strategy}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* How we work */}
      <section className="border-y border-glass-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            How We <span className="hl">Work</span>
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-4">
            {process.map((p, i) => (
              <li key={p.n} className="relative pl-0">
                <div className="font-mono-num text-sm text-gold">{p.n}</div>
                <h3 className="mt-2 text-lg font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.body}</p>
                {i < process.length - 1 && (
                  <div className="mt-6 hidden h-px w-full bg-surface-line md:block" aria-hidden />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          What Clients <span className="hl">Say</span>
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.attribution + t.quote.slice(0, 10)} className="glass flex flex-col rounded-2xl p-6">
              <blockquote className="flex-1 text-sm leading-relaxed text-ink-muted">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-gold">— {t.attribution}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Why most marketing advice is wrong */}
      <section className="border-y border-glass-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Why Most <span className="hl">Marketing</span> Advice is Wrong
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {beliefs.map((b) => (
              <div key={b} className="glass rounded-2xl p-6">
                <p className="text-lg font-medium text-ink">{b}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-xl font-medium leading-snug text-ink">
            Hacks expire. Systems compound. If you&apos;re done chasing
            shortcuts, let&apos;s build something that actually scales.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Your ads should be making you money, <span className="hl">Let&apos;s make that happen.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-ink-muted">
          If you are looking for structured marketing execution rather than
          shortcuts, let&apos;s start with a discussion.
        </p>
        <Link
          href="/strategy-call"
          className="mt-8 inline-block rounded-full bg-gold px-8 py-3.5 text-sm font-medium text-void transition-colors hover:bg-gold-bright focus-ring"
        >
          Book My Free Strategy Call →
        </Link>
      </section>

      {/* Trusted by */}
      <section className="border-t border-glass-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-center text-2xl font-semibold text-ink">
            Trusted by businesses <span className="hl">worldwide</span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {clients.map((c) => (
              <span key={c} className="rounded-full border border-glass-border px-4 py-1.5 text-sm italic font-bold text-ink-muted">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
