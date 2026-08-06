import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { MarkTalk } from "@/components/icons";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Strategy Call",
  description: "Book a free strategy call with Yashova.",
};

export default function StrategyCall() {
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
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
