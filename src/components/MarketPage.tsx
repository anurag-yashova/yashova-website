import Image from "next/image";
import Link from "next/link";
import PrimaryCta from "@/components/PrimaryCta";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import CaseLedger from "@/components/CaseLedger";
import ProofGallery from "@/components/ProofGallery";
import TimeClock from "@/components/TimeClock";
import { MarkCase } from "@/components/icons";
import { caseStudies } from "@/lib/case-studies";
import { breadcrumbLd, SITE_URL } from "@/lib/seo";
import { buildNote, type Currency } from "@/lib/currency";
import { getRates } from "@/lib/currency-server";

export type Market = {
  path: string;
  pageTitle: string;
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  /** market currency used for the secondary "≈" notes */
  currency: Currency;
  /** "UK" | "UAE" */
  short: string;
  /** schema.org areaServed name */
  country: string;
  tz: string;
  city: string;
  /** slug in src/lib/case-studies.ts: the real client from this market */
  clientSlug: string;
  clientLogo: string;
  /** one line under the client name, e.g. "Medical coding certification" */
  clientKind: string;
  /** shown on the ledger header */
  period: string;
  proofTitle: React.ReactNode;
  proofNote: string;
  intro: string[];
  timeZone: { heading: string; body: string };
  currencyFaq: { q: string; a: string };
  clientFaq: { q: string; a: string };
  other: { text: string; href: string; cta: string };
};

const steps = [
  {
    title: "A free session as the entry offer",
    body: "Cold audiences are never asked to buy the course. They are invited to a free live session with the person who teaches it, so they judge a teacher instead of a purchase.",
  },
  {
    title: "Ads that show the teacher",
    body: "In a trust purchase, the person is the product. Creative leads with the buyer's worry, not the syllabus, and puts the instructor's face and credentials up front.",
  },
  {
    title: "WhatsApp follow-up that closes the attendance gap",
    body: "Most coaching funnels leak between registration and attendance. An automatic confirmation that names the session, the time and the instructor does more for attendance than any creative change.",
  },
  {
    title: "Four questions before a sales call",
    body: "Background, timeline, language and whether they have attended before. The timeline question sorts the pipeline, so your team talks to ready buyers first.",
  },
  {
    title: "Retargeting attendees with a real deadline",
    body: "People who attended and did not buy are your warmest audience. Direct-sale campaigns go to them, never to cold traffic, and they carry a real batch deadline.",
  },
];

const compare = [
  ["Ads ask a cold audience to buy the course", "Ads invite people to a free session with the teacher"],
  ["Success is cost per lead", "Success is cost per registration, attendance and enrolment"],
  ["New leads wait hours for a reply", "A WhatsApp confirmation goes out automatically"],
  ["Reports full of reach and impressions", "A weekly update in revenue and plain words"],
  ["The sales team calls everyone", "The sales team calls the ready buyers first"],
];

export default async function MarketPage({ m }: { m: Market }) {
  const rates = await getRates();
  const cs = caseStudies.find((c) => c.slug === m.clientSlug)!;
  const [lead, ...rest] = cs.stats;

  const faqs = [
    m.clientFaq,
    {
      q: "What do I need before we start?",
      a: "An offer people can say yes to, a credible person to front it, a page or form we can track, and a way to follow leads up, such as WhatsApp or email.",
    },
    {
      q: "How is Yashova billed?",
      a: "In Indian rupees. Pricing is set per client after a call, because every programme needs different work. A monthly retainer covers funnels, ads and branding direction. Builds such as websites and automations are quoted separately. Any amounts shown here in another currency are approximate conversions.",
    },
    m.currencyFaq,
    {
      q: "What should I measure?",
      a: "Cost per registration, the registration-to-attendance rate, and cost per enrolment. Cost per lead on its own tells you very little in this category.",
    },
    {
      q: "What if it is not a fit?",
      a: "Refunds can be requested within 7 days of signing or of the service starting. After that, payments are non-refundable. The full terms are on the refund policy page.",
    },
  ];

  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: m.pageTitle,
      serviceType: "Performance marketing for coaches and course creators",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: m.country },
      url: `${SITE_URL}${m.path}`,
    },
    breadcrumbLd([[m.pageTitle, m.path]]),
  ];

  const ledgerMetrics = cs.metrics.map((x) => ({ ...x, note: buildNote(x.value, m.currency, rates) }));
  const fileNo = String(caseStudies.findIndex((c) => c.slug === cs.slug) + 1).padStart(3, "0");
  const leadNote = buildNote(lead.value, m.currency, rates);

  return (
    <>
      <JsonLd data={ld} />

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden border-b border-surface-line">
        <div className="dot-grid pointer-events-none absolute inset-0" />
        <span
          className="index-num pointer-events-none absolute -bottom-10 -left-3 hidden text-[16rem] leading-none md:block lg:text-[22rem]"
          aria-hidden
        >
          {m.short}
        </span>
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="eyebrow has-icon rise-1">
              <MarkCase className="eyebrow-icon" />
              {m.eyebrow}
            </p>
            <h1 className="rise-2 mt-6 text-4xl font-bold leading-[1.05] tracking-tighter text-ink sm:text-5xl lg:text-6xl">
              {m.title}
            </h1>
            <p className="rise-3 mt-6 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">{m.lead}</p>
            <div className="rise-4 mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <PrimaryCta className="cta-pulse inline-block rounded-md bg-ink px-7 py-3.5 text-sm font-semibold text-void transition-colors hover:bg-gold hover:text-on-gold focus-ring">
                Book a Free Strategy Call
              </PrimaryCta>
              <a
                href="#proof"
                className="border-b border-gold pb-0.5 font-mono-num text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:text-gold focus-ring"
              >
                See the {m.short} client proof
              </a>
            </div>
          </div>

          {/* proof card: the real client from this market */}
          <div className="rise-3 relative border border-ink bg-surface p-6 shadow-[8px_8px_0_0_var(--ink)] md:p-8">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-surface-line bg-white p-1.5">
                <Image src={m.clientLogo} alt={`${cs.name} logo`} width={52} height={52} className="h-full w-full object-contain" />
              </span>
              <div className="min-w-0">
                <p className="eyebrow !tracking-[0.16em]">{m.short}-based client</p>
                <p className="mt-1.5 truncate text-lg font-semibold text-ink">{cs.name}</p>
                <p className="text-xs text-ink-muted">{m.clientKind}</p>
              </div>
            </div>
            <div className="rule my-6" />
            <p className="text-xs uppercase tracking-[0.16em] text-ink-muted">{lead.label}</p>
            <p className="mt-2 font-mono-num text-5xl font-semibold tracking-tight text-ink md:text-6xl">
              <CountUp value={lead.value} />
            </p>
            {leadNote && <p className="ccy-note !ml-0 mt-1 text-sm">{leadNote}</p>}
            <dl className="mt-6 grid grid-cols-2 gap-px border border-surface-line bg-surface-line">
              {rest.map((s) => (
                <div key={s.label} className="min-w-0 bg-surface px-4 py-4">
                  <dd className="font-mono-num text-xl font-semibold text-ink">
                    {s.value}
                    {buildNote(s.value, m.currency, rates) && (
                      <span className="ccy-note block !ml-0 text-xs">{buildNote(s.value, m.currency, rates)}</span>
                    )}
                  </dd>
                  <dt className="mt-1 text-xs leading-snug text-ink-muted">{s.label}</dt>
                </div>
              ))}
            </dl>
            <Link
              href={`/case-studies/${cs.slug}`}
              className="mt-6 inline-block border-b border-gold pb-0.5 font-mono-num text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:text-gold focus-ring"
            >
              Read the full case study
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Live clock ===== */}
      <section className="border-b border-surface-line">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <TimeClock a={{ label: m.city, tz: m.tz }} b={{ label: "Faridabad", tz: "Asia/Kolkata" }} />
        </div>
      </section>

      {/* ===== The problem ===== */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
          <Reveal>
            <p className="eyebrow text-gold">The problem in this category</p>
            <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tighter text-ink md:text-5xl">
              Coaching is a <span className="hl">trust</span> purchase.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-5 text-base leading-relaxed text-ink-muted md:text-lg">
              {m.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== What we build ===== */}
      <section className="border-y border-surface-line bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="eyebrow text-gold">What we build</p>
          <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.08] tracking-tighter text-ink md:text-5xl">
            Five parts. One system. <span className="hl">Measured in enrolments.</span>
          </h2>
          <ol className="mt-12 border-t border-ink">
            {steps.map((s, i) => (
              <li key={s.title} className="border-b border-surface-line">
                <Reveal delay={i * 50}>
                  <div className="grid gap-4 py-8 md:grid-cols-[6rem_1fr_1.2fr] md:items-baseline md:gap-8">
                    <span className="index-num text-6xl md:text-7xl" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-semibold leading-snug text-ink md:text-2xl">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-muted md:text-base">{s.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Typical vs Yashova (inverted band) ===== */}
      <section className="bg-ink text-void">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="font-mono-num text-xs uppercase tracking-[0.22em] text-void/60">The difference</p>
          <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.08] tracking-tighter md:text-5xl">
            Most coaching ads sell the course. We sell the <u className="decoration-void/50 decoration-2 underline-offset-8">first conversation.</u>
          </h2>
          <div className="mt-12 grid gap-px bg-void/20 md:grid-cols-2">
            <div className="bg-ink p-6 md:p-8">
              <p className="font-mono-num text-xs uppercase tracking-[0.2em] text-void/60">The usual way</p>
              <ul className="mt-6 space-y-4">
                {compare.map(([a]) => (
                  <li key={a} className="border-b border-void/20 pb-4 text-sm leading-relaxed text-void/70 line-through decoration-void/30 md:text-base">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-ink p-6 md:p-8">
              <p className="font-mono-num text-xs uppercase tracking-[0.2em] text-void">The Yashova way</p>
              <ul className="mt-6 space-y-4">
                {compare.map(([, b]) => (
                  <li key={b} className="border-b border-void/20 pb-4 text-sm font-medium leading-relaxed text-void md:text-base">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Proof ===== */}
      <section id="proof" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-20 md:py-28">
        <Reveal>
          <p className="eyebrow text-gold">The proof: a {m.short}-based client</p>
          <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.08] tracking-tighter text-ink md:text-5xl">
            {m.proofTitle}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted">{m.proofNote}</p>
          <p className="ccy-foot">
            Figures marked ≈ are approx., converted to {m.currency}. Billed in INR. The rupee amount is the verified one.
          </p>
        </Reveal>
        <div className="mt-10">
          <CaseLedger metrics={ledgerMetrics} fileNo={fileNo} client={cs.client} period={m.period} />
        </div>
        {cs.proofImages.length > 0 && (
          <div className="mt-14">
            <p className="eyebrow">Straight from the dashboards</p>
            <ProofGallery images={cs.proofImages} name={cs.name} />
            <p className="mt-3 text-xs text-ink-muted">Screenshots from the actual campaign dashboards. Click any image to view it full size.</p>
          </div>
        )}
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link
            href={`/case-studies/${cs.slug}`}
            className="border-b border-gold pb-0.5 font-mono-num text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:text-gold focus-ring"
          >
            Read the full case study
          </Link>
          <Link href={m.other.href} className="link-line text-sm text-ink">
            {m.other.text} {m.other.cta}
          </Link>
        </div>
      </section>

      {/* ===== Time zone ===== */}
      <section className="border-y border-surface-line bg-surface/40">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-20 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <div>
            <p className="eyebrow text-gold">{m.timeZone.heading}</p>
            <h2 className="mt-5 text-3xl font-bold leading-[1.08] tracking-tighter text-ink md:text-4xl">
              Your morning is our <span className="hl">working day.</span>
            </h2>
          </div>
          <p className="text-base leading-relaxed text-ink-muted md:text-lg">{m.timeZone.body}</p>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="eyebrow text-gold">Questions, answered plainly</p>
        <div className="mt-8 divide-y divide-surface-line border-y border-surface-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="cursor-pointer list-none text-base font-medium text-ink focus-ring">{f.q}</summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-xs text-ink-muted">
          Terms are on the{" "}
          <Link href="/refund-policy" className="link-line text-ink">
            refund policy
          </Link>{" "}
          page.
        </p>
      </section>

      {/* ===== Closing band ===== */}
      <section className="bg-ink text-void">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-24">
          <h2 className="text-3xl font-bold leading-[1.08] tracking-tighter md:text-5xl">
            Selling a course or coaching programme? Let&apos;s look at your funnel together.
          </h2>
          <PrimaryCta className="cta-pulse mt-10 inline-block rounded-md bg-void px-8 py-4 text-sm font-semibold text-ink transition-colors hover:bg-gold hover:text-on-gold focus-ring">
            Book a Free Strategy Call
          </PrimaryCta>
          <p className="mt-5 font-mono-num text-xs uppercase tracking-[0.18em] text-void/60">
            A free 30-minute call · booked in your own time zone
          </p>
        </div>
      </section>
    </>
  );
}
