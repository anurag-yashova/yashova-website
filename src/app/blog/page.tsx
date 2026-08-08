import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { MarkWrite } from "@/components/icons";
import Reveal from "@/components/Reveal";
import { getAllPosts } from "@/lib/posts";

/* Scheduled publishing: content is filtered by publishedAt at request time, so this
   page must not be frozen at build. Re-generates hourly; future-dated posts appear
   on their own date without a deploy. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Performance Marketing Blog",
  description:
    "Playbooks, teardowns and real campaign data on Meta Ads, Google Ads, funnels, WhatsApp automation and lead generation — from a Delhi NCR performance marketing agency.",
};

export default function Blog() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        eyebrow="Field notes from live accounts"
        icon={MarkWrite}
        index="05"
        title={<>Notes on <span className="hl">growth</span></>}
        lead="Playbooks, teardowns and lessons from campaigns we actually ran — with the numbers attached."
      />
      <section className="mx-auto max-w-4xl px-6 py-16">
        {posts.length === 0 ? (
          <div className="glass rounded-lg p-10 text-center">
            <p className="text-ink-muted">New writing lands here shortly.</p>
            <Link href="/case-studies" className="link-line mt-4 inline-block font-mono-num text-xs uppercase tracking-[0.14em] text-ink">
              See case studies in the meantime
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-surface-line border-t border-surface-line">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 70}>
                <Link href={`/blog/${p.slug}`} className="group block py-8 focus-ring">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono-num text-xs text-ink-muted">
                      {new Date(p.publishedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </span>
                    <span className="font-mono-num text-xs text-ink-muted">{p.readingTime} min</span>
                  </div>
                  <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-ink transition-colors group-hover:text-gold md:text-3xl">
                    {p.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">{p.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
