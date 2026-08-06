import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on performance marketing, funnels, and growth.",
};

export const revalidate = 60;

export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <p className="chevron text-xs font-semibold uppercase tracking-[0.25em] text-gold">Blog</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
        Notes on growth
      </h1>

      {posts.length === 0 ? (
        <div className="mt-14 rounded-2xl border border-dashed border-surface-line bg-surface p-10 text-center">
          <p className="text-ink-muted">
            No posts yet — new writing on performance marketing, funnels, and
            case studies will show up here as soon as it&apos;s published in
            the CMS.
          </p>
          <Link href="/case-studies" className="mt-4 inline-block text-sm font-semibold text-gold hover:text-gold-bright">
            See case studies in the meantime →
          </Link>
        </div>
      ) : (
        <div className="mt-12 space-y-6">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="block rounded-xl border border-surface-line/60 bg-surface p-6 transition-colors hover:border-gold/60 focus-ring"
            >
              <h2 className="text-lg font-semibold text-ink">{post.title}</h2>
              {post.excerpt && <p className="mt-2 text-sm text-ink-muted">{post.excerpt}</p>}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
