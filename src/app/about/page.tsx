import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import FounderBlock from "@/components/FounderBlock";
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
      <PageHero
        eyebrow="The people behind the numbers"
        icon={MarkAbout}
        index="01"
        title={<>Performance marketing that answers to <span className="hl">revenue</span></>}
        lead="Yashova is a performance marketing agency in Faridabad. We build ads, funnels and WhatsApp follow-up, and we judge them by what they earn."
      />

      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="eyebrow text-gold">How it started</p>
        <div className="mt-5 space-y-5 text-base leading-relaxed text-ink-muted">
          <p>
            I have worked in performance marketing since 2018. I started as a
            freelancer, running ad accounts one at a time, and Yashova grew out
            of that work into an agency.
          </p>
          <p>
            Eight years of looking at ad accounts teaches you one thing above
            all: most wasted spend does not come from bad ads. It comes from
            broken tracking, slow follow-up and leads nobody qualified. Fix
            those and the same budget starts to behave very differently.
          </p>
          <p>
            That is how we work. We build the whole system around the ad, we
            measure it in revenue, and we show you every number, including the
            ones that are not flattering.
          </p>
          <p className="font-mono-num text-xs uppercase tracking-[0.14em] text-ink">
            Anurag Sharma, founder
          </p>
        </div>
      </section>

      <section className="border-y border-surface-line">
        <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-3">
          {numbers.map((n, i) => {
            const note = buildNote(n.value, ccy, rates);
            const body = (
              <div className="h-full border-b border-surface-line px-6 py-10 md:border-b-0 md:border-r md:last:border-r-0 lg:px-8 lg:py-14">
                <div className="font-mono-num text-4xl font-semibold tracking-tight text-ink">
                  {n.value}
                  {note && <span className="ccy-note text-sm">{note}</span>}
                </div>
                <div className="mt-3 text-sm font-medium leading-snug text-ink">{n.label}</div>
                <div className="mt-1.5 text-xs leading-relaxed text-ink-muted">{n.note}</div>
                {n.href && (
                  <span className="mt-4 inline-block border-b border-gold pb-0.5 font-mono-num text-[11px] uppercase tracking-[0.18em] text-ink">
                    Read the case study
                  </span>
                )}
              </div>
            );
            return (
              <Reveal key={n.label} delay={i * 80}>
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
        <div className="mx-auto max-w-6xl px-6 pb-6">
          <CcyFootnote ccy={ccy} />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="eyebrow text-gold">Who we work with</p>
        <p className="mt-5 text-base leading-relaxed text-ink-muted">
          Coaches and course creators, healthcare and education brands, D2C
          businesses and NGOs. Our clients are based across India, the UAE, the
          UK, the US, Australia and Nigeria, and the work is the same everywhere:
          find the leak, build the system, measure it in revenue. If you coach or
          teach from the{" "}
          <Link href="/performance-marketing-agency-for-coaches-uae" className="link-line text-ink">
            UAE
          </Link>{" "}
          or the{" "}
          <Link href="/performance-marketing-agency-for-coaches-uk" className="link-line text-ink">
            UK
          </Link>
          , start there.
        </p>

        <h2 className="mt-14 text-xl font-semibold text-ink">What we believe</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {principles.map((d) => (
            <li key={d.title} className="glass card-hover rounded-lg p-5">
              <h3 className="text-sm font-semibold text-ink">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{d.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <FounderBlock showLink={false} />

      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="eyebrow text-gold">How we work</p>
        <ol className="mt-10 grid gap-8 sm:grid-cols-2">
          {process.map((p) => (
            <li key={p.n} className="rounded-md border border-surface-line/60 bg-surface p-6">
              <div className="font-mono-num text-sm text-gold">{p.n}</div>
              <h3 className="mt-2 text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
        <h2 className="text-2xl font-semibold text-ink">
          Want to know where your ad money is going? Let&apos;s look at it together.
        </h2>
        <PrimaryCta className="mt-8 inline-block rounded-md bg-ink px-8 py-3.5 text-sm font-semibold text-void transition-colors hover:bg-gold focus-ring">
          Book a Strategy Call
        </PrimaryCta>
      </section>
    </>
  );
}
