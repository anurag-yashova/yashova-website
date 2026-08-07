import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTeardownSlugs, getTeardown } from "@/lib/teardowns";

export function generateStaticParams() {
  return getAllTeardownSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTeardown(slug);
  if (!t) return { title: "Not found" };
  return { title: t.title, description: t.excerpt, keywords: t.keywords };
}

const sevLabel = { critical: "Critical", major: "Major", minor: "Minor" } as const;

export default async function TeardownPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTeardown(slug);
  if (!t) notFound();

  return (
    <article className="mx-auto max-w-4xl px-6 py-20">
      <Link href="/teardowns" className="link-line font-mono-num text-xs uppercase tracking-[0.14em] text-ink-muted">
        Back to teardowns
      </Link>

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono-num text-[11px] uppercase tracking-[0.18em] text-ink-muted">
        <span>{t.category}</span>
        <span>{t.spend}</span>
        <span>{t.readingTime} min</span>
      </div>

      <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tighter text-ink md:text-5xl">
        {t.title}
      </h1>
      <p className="mt-4 text-sm text-ink-muted">{t.subject}</p>
      <p className="mt-6 text-lg leading-relaxed text-ink-muted">{t.excerpt}</p>

      <div className="mt-8 border-y border-surface-line py-5">
        <p className="font-mono-num text-[11px] uppercase tracking-[0.18em] text-ink-muted">Verdict</p>
        <p className="mt-2 text-xl font-semibold text-ink">{t.verdict}</p>
      </div>

      {/* findings sheet */}
      <div className="mt-12">
        <p className="eyebrow">Findings</p>
        <ol className="mt-6 border-t border-surface-line">
          {t.findings.map((f, i) => (
            <li key={f.title} className="grid gap-3 border-b border-surface-line py-6 md:grid-cols-[auto_1fr] md:gap-8">
              <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-2">
                <span className="font-mono-num text-xs text-ink-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`sev sev-${f.severity}`}>{sevLabel[f.severity]}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold leading-snug text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{f.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="post-body mt-14" dangerouslySetInnerHTML={{ __html: t.body }} />

      <div className="rule mt-14" />
      <div className="mt-10">
        <p className="eyebrow">Your turn</p>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink">
          Same teardown, your account, in private.
        </h2>
        <Link
          href="/strategy-call"
          className="cta-pulse mt-6 inline-block rounded-md bg-ink px-7 py-3 text-sm font-medium text-void transition-colors hover:bg-gold focus-ring"
        >
          Book a teardown call
        </Link>
      </div>
    </article>
  );
}
