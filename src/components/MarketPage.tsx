import Link from "next/link";
import PageHero from "@/components/PageHero";
import PrimaryCta from "@/components/PrimaryCta";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { MarkCase } from "@/components/icons";
import { breadcrumbLd, SITE_URL } from "@/lib/seo";
import { buildNote, type Currency } from "@/lib/currency";
import { getRates } from "@/lib/currency-server";

export type Market = {
  path: string;
  pageTitle: string;
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  currency: Currency; // market currency used for the secondary "≈" notes
  intro: string[];
  timeZone: { heading: string; body: string };
  currencyFaq: { q: string; a: string };
};

/** Real figures from the TheAudioLearning case study. Nothing else is claimed. */
const proof = [
  { value: "₹18.6L", label: "Ad spend, 120 days" },
  { value: "15,000+", label: "Leads from free live webinars" },
  { value: "5,800+", label: "Qualified leads" },
  { value: "780+", label: "Paid admissions" },
  { value: "₹1.02Cr+", label: "Revenue generated" },
  { value: "5.5X", label: "Return on ad spend" },
];

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

export default async function MarketPage({ m }: { m: Market }) {
  const rates = await getRates();

  const faqs = [
    {
      q: "Is the proof on this page from this market?",
      a: "No. The case study below was run and reported in rupees. We show it because it documents the whole mechanism with verified numbers. We will not present results from other markets until we can show them the same way.",
    },
    {
      q: "What do I need before we start?",
      a: "An offer people can say yes to, a credible person to front it, a page or form we can track, and a way to follow leads up, such as WhatsApp or email.",
    },
    {
      q: "How is Yashova billed?",
      a: "In Indian rupees. A monthly retainer covers funnels, ads and branding direction. Builds such as websites and automations are quoted separately. Any amounts shown here in another currency are approximate conversions.",
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
      url: `${SITE_URL}${m.path}`,
    },
    breadcrumbLd([[m.pageTitle, m.path]]),
  ];

  return (
    <>
      <JsonLd data={ld} />
      <PageHero eyebrow={m.eyebrow} icon={MarkCase} index="10" title={m.title} lead={m.lead} />

      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="eyebrow text-gold">The problem in this category</p>
        <div className="mt-5 space-y-5 text-base leading-relaxed text-ink-muted">
          {m.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className="border-y border-surface-line bg-surface/40">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="eyebrow text-gold">What we build</p>
          <ol className="mt-10 space-y-8">
            {steps.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 60}>
                  <div className="grid gap-3 md:grid-cols-[3rem_1fr]">
                    <span className="font-mono-num text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-ink">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="eyebrow text-gold">The proof: one certification programme</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          ₹18.6L became <span className="hl">₹1.02Cr</span> in 120 days
        </h2>
        <dl className="mt-10 grid grid-cols-2 gap-px border border-surface-line bg-surface-line md:grid-cols-3">
          {proof.map((p) => {
            const note = buildNote(p.value, m.currency, rates);
            return (
              <div key={p.label} className="flex flex-col-reverse justify-end bg-void px-5 py-7">
                <dt className="mt-2 text-xs leading-relaxed text-ink-muted">{p.label}</dt>
                <dd className="font-mono-num text-2xl font-semibold text-ink md:text-3xl">
                  {p.value}
                  {note && <span className="ccy-note text-sm">{note}</span>}
                </dd>
              </div>
            );
          })}
        </dl>
        <p className="ccy-foot">
          Figures marked ≈ are approx., converted to {m.currency}. Billed in INR. The rupee amount is the verified one.
        </p>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-muted">
          The funnel behind these numbers: a free live webinar with the instructor, automatic WhatsApp confirmation,
          four qualification questions, then a sales team that worked only the qualified list. This programme ran for
          an audience in India, and we say so because the mechanism is what we are showing you.
        </p>
        <Link
          href="/case-studies/theaudiolearning"
          className="mt-6 inline-block border-b border-gold pb-0.5 font-mono-num text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:text-gold focus-ring"
        >
          Read the full case study
        </Link>
      </section>

      <section className="border-y border-surface-line bg-surface/40">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="eyebrow text-gold">{m.timeZone.heading}</p>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">{m.timeZone.body}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="eyebrow text-gold">Questions, answered plainly</p>
        <div className="mt-8 divide-y divide-surface-line border-y border-surface-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="cursor-pointer list-none text-base font-medium text-ink focus-ring">
                {f.q}
              </summary>
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

      <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
        <h2 className="text-2xl font-semibold text-ink">
          Selling a course or coaching programme? Let&apos;s look at your funnel together.
        </h2>
        <PrimaryCta className="cta-pulse mt-8 inline-block rounded-md bg-ink px-8 py-3.5 text-sm font-medium text-void transition-colors hover:bg-gold focus-ring">
          Book a Free Strategy Call
        </PrimaryCta>
      </section>
    </>
  );
}
