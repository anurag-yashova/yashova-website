import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTeardownSlugs, getTeardown } from "@/lib/teardowns";
import PostBody from "@/components/PostBody";
import { localizeInrInHtml, buildNote } from "@/lib/currency";
import { getCurrency, getRates } from "@/lib/currency-server";
import { pageMeta, breadcrumbLd, SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

/* Scheduled publishing: content is filtered by publishedAt at request time, so this
   page must not be frozen at build. Re-generates hourly; future-dated posts appear
   on their own date without a deploy. */
export const revalidate = 3600;

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
  return pageMeta({
    title: t.title,
    description: t.excerpt,
    path: `/teardowns/${t.slug}`,
    keywords: t.keywords,
    type: "article",
    defaultImage: false, // each teardown has its own opengraph-image
  });
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

  const ccy = await getCurrency();
  const rates = await getRates();
  const localizedBody = localizeInrInHtml(t.body, ccy, rates);
  const spendNote = buildNote(t.spend, ccy, rates);

  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: t.title,
      description: t.excerpt,
      datePublished: t.publishedAt,
      dateModified: t.publishedAt,
      mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/teardowns/${t.slug}` },
      image: `${SITE_URL}/teardowns/${t.slug}/opengraph-image`,
      author: { "@type": "Organization", name: "Yashova", url: SITE_URL },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    breadcrumbLd([["Teardowns", "/teardowns"], [t.title, `/teardowns/${t.slug}`]]),
  ];

  return (
    <article className="mx-auto max-w-4xl px-6 py-20">
      <JsonLd data={ld} />
      <Link href="/teardowns" className="link-line font-mono-num text-xs uppercase tracking-[0.14em] text-ink-muted">
        Back to teardowns
      </Link>

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono-num text-[11px] uppercase tracking-[0.18em] text-ink-muted">
        <span>{t.category}</span>
        <span className="inline-flex flex-col">
          {t.spend}
          {spendNote && <span className="ccy-note">{spendNote}</span>}
        </span>
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

      <div className="mt-14">
        <PostBody html={localizedBody} />
      </div>

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
