import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getPost } from "@/lib/posts";
import ProofGallery from "@/components/ProofGallery";

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
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: "Yashova" },
    publisher: { "@type": "Organization", name: "Yashova" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
        <div
          className="post-body mt-10"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

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
          <Link
            href="/strategy-call"
            className="cta-pulse mt-6 inline-block rounded-md bg-ink px-7 py-3 text-sm font-medium text-void transition-colors hover:bg-gold focus-ring"
          >
            Book a free strategy call
          </Link>
        </div>
      </article>
    </>
  );
}
