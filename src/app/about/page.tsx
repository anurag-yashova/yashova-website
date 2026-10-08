import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import CountUp from "@/components/CountUp";
import PrimaryCta from "@/components/PrimaryCta";
import CcyFootnote from "@/components/CcyFootnote";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { MarkAbout } from "@/components/icons";
import { pageMeta, breadcrumbLd, SITE_URL } from "@/lib/seo";
import { buildNote } from "@/lib/currency";
import { getCurrency, getRates } from "@/lib/currency-server";

export const metadata: Metadata = pageMeta({
  title: "About Anurag Sharma and Yashova",
  description:
    "Yashova is a performance marketing agency in Faridabad, Delhi NCR, run by founder Anurag Sharma, in performance marketing since 2018. Meta Ads, funnels and WhatsApp automation measured by revenue, not reach.",
  path: "/about",
});

/** Every figure below is already published on a case study page. */
const numbers = [
  {
    value: "₹4Cr+",
    label: "Ad spend managed",
    note: "Managed across client accounts",
  },
  {
    value: "5.5X",
    label: "ROAS on one 120-day programme",
    note: "TheAudioLearning: ₹18.6L spent, ₹1.02Cr returned, 780 admissions",
    href: "/case-studies/theaudiolearning",
  },
  {
    value: "51%",
    label: "Lower cost per donation",
    note: "Helping Hands Foundation: ₹175.61 to ₹85.48",
    href: "/case-studies/helping-hands-foundation",
  },
  {
    value: "11,246",
    label: "Donations captured in 60 days",
    note: "Helping Hands Foundation: ₹30.1L, checked against Razorpay",
    href: "/case-studies/helping-hands-foundation",
  },
];

/** Where the work happens. Every figure is already on a case study page. */
const places = [
  {
    where: "India",
    name: "Helping Hands Foundation",
    logo: "/images/clients/helping-hands.jpg",
    figure: "₹30.1L",
    what: "raised in 60 days at 4.5X return on ad spend",
    href: "/case-studies/helping-hands-foundation",
    cta: "Read the case study",
  },
  {
    where: "United Kingdom",
    name: "TheAudioLearning",
    logo: "/images/clients/theaudiolearning.jpg",
    figure: "₹1.02Cr+",
    what: "revenue from ₹18.6L of ad spend, 780+ admissions",
    href: "/performance-marketing-agency-for-coaches-uk",
    cta: "See the UK page",
  },
  {
    where: "United Arab Emirates",
    name: "CvolvePro",
    logo: "/images/clients/cvolvepro.jpg",
    figure: "222,630+",
    what: "professionals reached on LinkedIn at ₹4.69 a click",
    href: "/performance-marketing-agency-for-coaches-uae",
    cta: "See the UAE page",
  },
];

const timeline = [
  {
    when: "2018",
    text: "Starts in performance marketing as a freelancer, running ad accounts one at a time.",
  },
  {
    when: "Then",
    text: "The freelance work grows into Yashova, an agency in Faridabad, Delhi NCR, with the founder still inside every account.",
  },
  {
    when: "May to June 2026",
    text: "Helping Hands Foundation: ₹30.1L in donations in 60 days, 11,246 payments, and cost per donation down 51%.",
  },
  {
    when: "Today",
    text: "Clients across India, the UAE, the UK, the US, Australia and Nigeria. The method is the same in every market.",
  },
];

const principles = [
  {
    title: "Tracking before spend",
    body: "Meta Pixel and Conversion API are set up and checked before an account is scaled. If the numbers are wrong, everything built on them is wrong.",
  },
  {
    title: "Leads are not customers",
    body: "We measure cost per qualified lead and cost per customer, not cost per lead. A cheap lead who never answers the phone is the most expensive lead there is.",
  },
  {
    title: "Follow-up is part of the ad",
    body: "WhatsApp confirmations, qualification and follow-ups run automatically, so the lead you paid for is contacted while they still remember you.",
  },
  {
    title: "Reports in rupees",
    body: "Weekly updates say what was spent, what came back and what we will change next. No vanity metrics, no jargon to hide behind.",
  },
  {
    title: "Plain pricing logic",
    body: "A monthly retainer covers funnels, ads and branding direction. Builds such as websites and automations are quoted separately, so you always know what you are paying for.",
  },
  {
    title: "The founder stays in",
    body: "Anurag is involved in the strategy of every account. Your budget is never handed to someone learning on the job.",
  },
];

const process = [
  { n: "01", title: "Diagnose", body: "We read your ad account, landing page and follow-up end to end, and find where money is leaking before we spend more of it." },
  { n: "02", title: "Build the system", body: "Tracking, funnel, creative and WhatsApp follow-up are built to work as one, not as four separate jobs." },
  { n: "03", title: "Launch and read the data", body: "We run structured tests, one hypothesis at a time, and let the numbers decide what scales." },
  { n: "04", title: "Scale what pays", body: "Budget moves only to what is returning revenue. Everything else is cut or rebuilt." },
];

export default async function About() {
  const ccy = await getCurrency();
  const rates = await getRates();

  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About Yashova",
      url: `${SITE_URL}/about`,
      about: { "@id": `${SITE_URL}/#organization` },
      mainEntity: {
        "@type": "Person",
        name: "Anurag Sharma",
        jobTitle: "Founder",
        worksFor: { "@id": `${SITE_URL}/#organization` },
        sameAs: ["https://www.linkedin.com/in/anuxbiz"],
        knowsAbout: ["Performance marketing", "Meta Ads", "Funnel building", "WhatsApp automation"],
      },
    },
    breadcrumbLd([["About", "/about"]]),
  ];

  return (
    <>
      <JsonLd data={ld} />
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden border-b border-surface-line">
        <div className="dot-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <p className="eyebrow has-icon rise-1">
              <MarkAbout className="eyebrow-icon" />
              About Anurag Sharma and Yashova
            </p>
            <h1 className="rise-2 mt-6 text-4xl font-bold leading-[1.05] tracking-tighter text-ink sm:text-5xl lg:text-6xl">
              I fix the part of marketing that <span className="hl">loses money.</span>
            </h1>
            <p className="rise-3 mt-6 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
              I am Anurag, founder of Yashova. I have worked in performance marketing since 2018, and today I build
              ads, funnels and WhatsApp follow-up for clients in six countries. Everything we do is judged by what it
              earns.
            </p>
            <dl className="rise-4 mt-9 grid max-w-xl grid-cols-3 gap-px border border-surface-line bg-surface-line">
              {[
                ["2018", "In performance marketing since"],
                ["6", "Countries our clients are based in"],
                ["Faridabad", "Delhi NCR, India"],
              ].map(([v, l]) => (
                <div key={l} className="bg-void px-4 py-4">
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-mono-num text-base font-semibold text-ink sm:text-xl md:text-2xl">{v}</dd>
                  <dd className="mt-1 text-[11px] leading-snug text-ink-muted">{l}</dd>
                </div>
              ))}
            </dl>
            <div className="rise-4 mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <PrimaryCta className="cta-pulse inline-block rounded-md bg-ink px-7 py-3.5 text-sm font-semibold text-void transition-colors hover:bg-gold hover:text-on-gold focus-ring">
                Talk to me directly
              </PrimaryCta>
              <Link
                href="/case-studies"
                className="border-b border-gold pb-0.5 font-mono-num text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:text-gold focus-ring"
              >
                See the case studies
              </Link>
            </div>
          </div>

          <div className="rise-3 relative mx-auto w-full max-w-[360px] lg:max-w-none">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-ink bg-void shadow-[10px_10px_0_0_var(--ink)]">
              <Image
                src="/images/anurag-founder.webp"
                alt="Anurag Sharma, founder of Yashova"
                fill
                priority
                sizes="(min-width: 1024px) 420px, 80vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-4 border border-ink bg-void px-4 py-3 md:left-6">
              <p className="text-sm font-semibold text-ink">Anurag Sharma</p>
              <p className="font-mono-num text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                Founder · 8 years in performance marketing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Numbers (inverted band) ===== */}
      <section className="bg-ink text-void">
        <div className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
          {numbers.map((n, i) => {
            const note = buildNote(n.value, ccy, rates);
            const body = (
              <div className="h-full border-b border-r border-void/20 px-5 py-9 lg:px-8 lg:py-12">
                <div className="font-mono-num text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
                  <CountUp value={n.value} />
                  {note && <span className="block text-xs font-normal text-void/60">{note}</span>}
                </div>
                <div className="mt-3 text-sm font-medium leading-snug">{n.label}</div>
                <div className="mt-1.5 text-xs leading-relaxed text-void/60">{n.note}</div>
              </div>
            );
            return (
              <Reveal key={n.label} delay={i * 70}>
                {n.href ? (
                  <Link href={n.href} className="block h-full focus-ring">
                    {body}
                  </Link>
                ) : (
                  body
                )}
              </Reveal>
            );
          })}
        </div>
        <div className="mx-auto max-w-6xl px-6 pb-6 pt-4 text-xs text-void/60">
          <CcyFootnote ccy={ccy} />
        </div>
      </section>

      {/* ===== Story ===== */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:gap-16">
          <Reveal>
            <p className="eyebrow text-gold">How it started</p>
            <blockquote className="mt-6 border-l-4 border-gold pl-6 text-2xl font-semibold leading-snug tracking-tight text-ink md:text-3xl">
              Most wasted ad spend does not come from bad ads. It comes from broken tracking, slow follow-up and leads
              nobody qualified.
            </blockquote>
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-5 text-base leading-relaxed text-ink-muted md:text-lg">
              <p>
                I have worked in performance marketing since 2018. I started as a freelancer, running ad accounts one
                at a time, and Yashova grew out of that work into an agency.
              </p>
              <p>
                Eight years of looking at ad accounts teaches you one thing above all: fix the tracking, the follow-up
                and the lead quality, and the same budget starts to behave very differently.
              </p>
              <p>
                That is how we work. We build the whole system around the ad, we measure it in revenue, and we show
                you every number, including the ones that are not flattering.
              </p>
              <p className="font-mono-num text-xs uppercase tracking-[0.14em] text-ink">Anurag Sharma, founder</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Timeline ===== */}
      <section className="border-y border-surface-line bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <p className="eyebrow text-gold">The short version</p>
          <ol className="mt-10 grid gap-px border border-surface-line bg-surface-line md:grid-cols-4">
            {timeline.map((t, i) => (
              <li key={t.when} className="bg-void">
                <Reveal delay={i * 70}>
                  <div className="h-full p-6 md:p-7">
                    <div className="font-mono-num text-lg font-semibold text-ink">{t.when}</div>
                    <div className="my-4 h-px w-10 bg-gold" />
                    <p className="text-sm leading-relaxed text-ink-muted">{t.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Where the work happens ===== */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="eyebrow text-gold">Where the work happens</p>
          <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.08] tracking-tighter text-ink md:text-5xl">
            Three markets. One <span className="hl">method.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted">
            Our clients are based across India, the UAE, the UK, the US, Australia and Nigeria. Here are three of them,
            with the figures that are already published on their case studies.
          </p>
        </Reveal>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {places.map((p, i) => {
            const note = buildNote(p.figure, ccy, rates);
            return (
              <li key={p.name}>
                <Reveal delay={i * 80} className="h-full">
                  <Link
                    href={p.href}
                    className="card-hover group flex h-full flex-col border border-surface-line bg-surface p-6 focus-ring"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="eyebrow !tracking-[0.16em]">{p.where}</span>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-surface-line bg-white p-1">
                        <Image src={p.logo} alt={`${p.name} logo`} width={40} height={40} className="h-full w-full object-contain" />
                      </span>
                    </div>
                    <p className="mt-8 text-sm font-semibold text-ink">{p.name}</p>
                    <p className="mt-2 font-mono-num text-4xl font-semibold tracking-tight text-ink">
                      {p.figure}
                      {note && <span className="ccy-note block !ml-0 text-xs">{note}</span>}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.what}</p>
                    <span className="mt-auto pt-6 font-mono-num text-[11px] uppercase tracking-[0.18em] text-ink group-hover:text-gold">
                      {p.cta}
                    </span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ===== Principles ===== */}
      <section className="border-y border-surface-line bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="eyebrow text-gold">What we believe</p>
          <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.08] tracking-tighter text-ink md:text-5xl">
            Six rules we do not <span className="hl">bend.</span>
          </h2>
          <ol className="mt-12 grid gap-x-12 border-t border-ink md:grid-cols-2">
            {principles.map((d, i) => (
              <li key={d.title} className="border-b border-surface-line">
                <Reveal delay={(i % 2) * 60}>
                  <div className="grid grid-cols-[3.5rem_1fr] gap-4 py-7">
                    <span className="index-num text-4xl" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-ink">{d.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{d.body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Process ===== */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="eyebrow text-gold">How we work</p>
        <ol className="mt-10 grid gap-px border border-surface-line bg-surface-line sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p) => (
            <li key={p.n} className="bg-void p-6">
              <div className="font-mono-num text-sm text-gold">{p.n}</div>
              <h3 className="mt-3 text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ===== Closing band ===== */}
      <section className="bg-ink text-void">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-24">
          <h2 className="text-3xl font-bold leading-[1.08] tracking-tighter md:text-5xl">
            Want to know where your ad money is going? Let&apos;s look at it together.
          </h2>
          <PrimaryCta className="cta-pulse mt-10 inline-block rounded-md bg-void px-8 py-4 text-sm font-semibold text-ink transition-colors hover:bg-gold hover:text-on-gold focus-ring">
            Book a Strategy Call
          </PrimaryCta>
          <p className="mt-5 font-mono-num text-xs uppercase tracking-[0.18em] text-void/60">
            A free 30-minute call · with the founder
          </p>
        </div>
      </section>
    </>
  );
}
