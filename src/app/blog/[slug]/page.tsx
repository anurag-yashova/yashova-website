import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getPost } from "@/lib/posts";
import ProofGallery from "@/components/ProofGallery";
import PostBody from "@/components/PostBody";
import { localizeInrInHtml } from "@/lib/currency";
import { getCurrency, getRates } from "@/lib/currency-server";
import { pageMeta, breadcrumbLd, SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PrimaryCta from "@/components/PrimaryCta";
import CcyFootnote from "@/components/CcyFootnote";

/* Scheduled publishing: content is filtered by publishedAt at request time, so this
   page must not be frozen at build. Re-generates hourly; future-dated posts appear
   on their own date without a deploy. */
export const revalidate = 3600;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  return pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    type: "article",
    publishedTime: post.publishedAt,
    defaultImage: false, // each post has its own opengraph-image
  });
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const ccy = await getCurrency();
  const rates = await getRates();
  const localizedBody = localizeInrInHtml(post.body, ccy, rates);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    image: `${SITE_URL}/blog/${post.slug}/opengraph-image`,
    author: { "@type": "Organization", name: "Yashova", url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
  const crumbs = breadcrumbLd([["Blog", "/blog"], [post.title, `/blog/${post.slug}`]]);

  return (
    <>
      <JsonLd data={[jsonLd, crumbs]} />
      <article className="mx-auto max-w-3xl px-6 py-20">
        <Link href="/blog" className="link-line font-mono-num text-xs uppercase tracking-[0.14em] text-ink-muted">
          Back to blog
        </Link>
        <div className="mt-8 flex items-baseline gap-4">
          <span className="font-mono-num text-xs text-ink-muted">
            {new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
          </span>
          <span className="font-mono-num text-xs text-ink-muted">{post.readingTime} min read</span>
        </div>
        <h1 className="mt-3 text-4xl font-bold leading-[1.08] tracking-tighter text-ink md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-muted">{post.excerpt}</p>
        <div className="rule mt-10" />
        <CcyFootnote ccy={ccy} className="mb-6" />
        <PostBody html={localizedBody} />

        {post.exhibits.length > 0 && (
          <div className="mt-14">
            <p className="eyebrow">Exhibits</p>
            <ProofGallery
              images={post.exhibits.map((e) => e.src)}
              name={post.title}
            />
            <ul className="mt-4 space-y-1.5">
              {post.exhibits.map((e, i) => (
                <li key={e.src} className="text-xs leading-relaxed text-ink-muted">
                  <span className="font-mono-num text-ink">
                    Fig. {i + 1}
                  </span>{" "}
                  &mdash; {e.caption}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="rule mt-14" />
        <div className="mt-10">
          <p className="eyebrow">Work with us</p>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink">
            Want this run on your account?
          </h2>
          <PrimaryCta
            className="cta-pulse mt-6 inline-block rounded-md bg-ink px-7 py-3 text-sm font-medium text-void transition-colors hover:bg-gold focus-ring"
          >
            Book a free strategy call
          </PrimaryCta>
        </div>
      </article>
    </>
  );
}
