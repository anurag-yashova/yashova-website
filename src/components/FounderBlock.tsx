import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

/** Founder introduction. Only facts supplied by Anurag: name, role, and
 *  8 years in performance marketing. No invented numbers or claims. */
export default function FounderBlock() {
  return (
    <section className="border-y border-surface-line bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <div className="grid items-center gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-md border border-surface-line bg-void">
              <Image
                src="/images/anurag-founder.webp"
                alt="Anurag Sharma, founder of Yashova"
                fill
                sizes="(min-width: 768px) 320px, 80vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="eyebrow text-gold">The person behind Yashova</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                Anurag Sharma
              </h2>
              <p className="mt-2 font-mono-num text-sm text-ink-muted">
                Founder · 8 years in performance marketing
              </p>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted">
                I run Yashova myself. Every account gets my personal
                involvement in strategy, so your budget is never handed to
                someone learning on the job.
              </p>
              <Link
                href="/about"
                className="mt-8 inline-block border-b border-gold pb-0.5 font-mono-num text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:text-gold focus-ring"
              >
                Read my story
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
