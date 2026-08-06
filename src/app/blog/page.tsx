import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/sanity";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on performance marketing, funnels, and growth.",
};

export const revalidate = 60;

export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <>
    <PageHero
      eyebrow="Blog"
      index="05"
      title={<>Notes on <span className="hl">growth</span></>}
      lead="Playbooks, teardowns, and lessons from running real performance campaigns."
    />
    <section className="mx-auto max-w-4xl px-6 py-16">

      {posts.length === 0 ? (
        <div className="glass rounded-lg p-10 text-center">
          <p className="text-ink-muted">
            No posts yet — new writing on performance marketing, funnels, and
            case studies will show up here as soon as it&apos;s published in
            the CMS.
          </p>
          <Link href="/case-studies" className="link-line mt-4 inline-block font-mono-num text-xs uppercase tracking-[0.14em] text-ink">
            See case studies in the meantime
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="block rounded-md border border-surface-line/60 bg-surface p-6 transition-colors hover:border-gold/60 focus-ring"
            >
              <h2 className="text-lg font-semibold text-ink">{post.title}</h2>
              {post.excerpt && <p className="mt-2 text-sm text-ink-muted">{post.excerpt}</p>}
            </Link>
          ))}
        </div>
      )}
    </section>
    </>
  );
}
