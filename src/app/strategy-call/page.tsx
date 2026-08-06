import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strategy Call",
  description: "Book a free strategy call with Yashova.",
};

export default function StrategyCall() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <p className="eyebrow text-gold">Get In Touch</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
        Let&apos;s discuss your growth
      </h1>
      <p className="mt-4 max-w-lg text-ink-muted">
        Tell us where you&apos;re losing money on ads — we&apos;ll come back
        with a clear read on what to fix first.
      </p>

      <div className="mt-14 grid gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Call Anytime</h3>
            <a href="tel:+919818086846" className="mt-1 block text-xl font-medium text-ink hover:text-gold">
              +91 981 808 6846
            </a>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">E-Mail Us</h3>
            <a href="mailto:anurag@yashova.com" className="mt-1 block text-xl font-medium text-ink hover:text-gold">
              anurag@yashova.com
            </a>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Visit Us. We&apos;re Here</h3>
            <p className="mt-1 text-xl font-medium text-ink">741, Sector-23, Faridabad</p>
          </div>
        </div>

        <form
          action="mailto:anurag@yashova.com"
          method="POST"
          encType="text/plain"
          className="space-y-5 rounded-2xl border border-surface-line/60 bg-surface p-8"
        >
          <div>
            <label htmlFor="name" className="text-sm font-medium text-ink-muted">Name</label>
            <input
              id="name"
              name="Name"
              required
              className="mt-1.5 w-full rounded-lg border border-surface-line bg-void px-4 py-2.5 text-ink focus-ring"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-ink-muted">Email</label>
            <input
              id="email"
              name="Email"
              type="email"
              required
              className="mt-1.5 w-full rounded-lg border border-surface-line bg-void px-4 py-2.5 text-ink focus-ring"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium text-ink-muted">What are you looking to grow?</label>
            <textarea
              id="message"
              name="Message"
              rows={4}
              className="mt-1.5 w-full rounded-lg border border-surface-line bg-void px-4 py-2.5 text-ink focus-ring"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-gold px-6 py-3 text-sm font-semibold text-void transition-colors hover:bg-gold-bright focus-ring"
          >
            Request My Strategy Call →
          </button>
          <p className="text-xs text-ink-muted">
            Note: replace this form with a proper endpoint (e.g. Formspree) before launch — mailto forms are unreliable on mobile.
          </p>
        </form>
      </div>
    </section>
  );
}
