import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { getPostBySlug } from "@/lib/sanity";

export const revalidate = 60;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <Link href="/blog" className="text-sm font-semibold text-gold hover:text-gold-bright">
        ← Blog
      </Link>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        {post.title}
      </h1>
      <div className="prose prose-invert mt-8 max-w-none text-ink-muted">
        {Array.isArray(post.body) ? <PortableText value={post.body as never} /> : null}
      </div>
    </article>
  );
}
