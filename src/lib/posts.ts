import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  keywords: string[];
  readingTime: number;
  exhibits: { src: string; caption: string }[];
  body: string;
};

function parse(file: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).length;
  return {
    slug: file.replace(/\.md$/, ""),
    title: data.title ?? "",
    excerpt: data.excerpt ?? "",
    publishedAt: data.publishedAt ?? "1970-01-01",
    keywords: data.keywords ?? [],
    readingTime: Math.max(1, Math.round(words / 220)),
    exhibits: data.exhibits ?? [],
    body: marked.parse(content, { async: false }) as string,
  };
}

/** Posts dated in the future stay hidden until their date arrives —
 *  scheduled publishing without a CMS. */
function isLive(p: Post) {
  return new Date(p.publishedAt).getTime() <= Date.now();
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parse)
    .filter(isLive)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(BLOG_DIR, file))) return null;
  const post = parse(file);
  return isLive(post) ? post : null;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
