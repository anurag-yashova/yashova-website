import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { COUNTRY_COOKIE } from "@/lib/region";
import PageHero from "@/components/PageHero";
import { MarkTalk } from "@/components/icons";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import BookingEmbed from "@/components/BookingEmbed";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Book a Free Strategy Call",
  description:
    "Talk to Yashova about your ads, funnel and lead quality. A real conversation about what is leaking and what to fix first, not a sales pitch.",
  path: "/strategy-call",
});

export default async function StrategyCall() {
  const h = await headers();
  const jar = await cookies();
  const country = h.get("x-vercel-ip-country") ?? jar.get(COUNTRY_COOKIE)?.value ?? "";
  return (
    <>
      <PageHero
        eyebrow="A real conversation, not a pitch"
        icon={MarkTalk}
        index="06"
        title={<>Let&apos;s discuss your <span className="hl">growth</span></>}
        lead="Tell us where you're losing money on ads — we'll come back with a clear read on what to fix first."
      />

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-8">
              <div className="glass rounded-lg p-6">
                <h3 className="eyebrow">What happens next</h3>
                <ol className="mt-4 space-y-3 text-sm leading-relaxed text-ink-muted">
                  <li><span className="font-mono-num text-gold">01</span> You pick a 30-minute slot, or message us.</li>
                  <li><span className="font-mono-num text-gold">02</span> We look at your ads, page and follow-up before we talk, if you share your site.</li>
                  <li><span className="font-mono-num text-gold">03</span> You get a clear read on what is leaking and what to fix first.</li>
                </ol>
              </div>
              <div className="glass card-hover rounded-lg p-6">
                <h3 className="eyebrow">Call Anytime</h3>
                <a href="tel:+919818086846" className="mt-1 block text-xl font-medium text-ink hover:text-gold">
                  +91 981 808 6846
                </a>
              </div>
              <div className="glass card-hover rounded-lg p-6">
                <h3 className="eyebrow">E-Mail Us</h3>
                <a href="mailto:anurag@yashova.com" className="mt-1 block text-xl font-medium text-ink hover:text-gold">
                  anurag@yashova.com
                </a>
              </div>
              <div className="glass card-hover rounded-lg p-6">
                <h3 className="eyebrow">Visit Us. We&apos;re Here</h3>
                <p className="mt-1 text-xl font-medium text-ink">741, Sector-23, Faridabad</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <BookingEmbed fallback={<ContactForm />} country={country} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
