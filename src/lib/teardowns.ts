import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const DIR = path.join(process.cwd(), "content/teardowns");

export type Finding = { severity: "critical" | "major" | "minor"; title: string; detail: string };

export type Teardown = {
  slug: string;
  title: string;
  subject: string;
  category: string;
  spend: string;
  excerpt: string;
  publishedAt: string;
  verdict: string;
  findings: Finding[];
  keywords: string[];
  readingTime: number;
  body: string;
};

function parse(file: string): Teardown {
  const raw = fs.readFileSync(path.join(DIR, file), "utf-8");
  const { data, content } = matter(raw);
  return {
    slug: file.replace(/\.md$/, ""),
    title: data.title ?? "",
    subject: data.subject ?? "",
    category: data.category ?? "",
    spend: data.spend ?? "",
    excerpt: data.excerpt ?? "",
    publishedAt: data.publishedAt ?? "1970-01-01",
    verdict: data.verdict ?? "",
    findings: data.findings ?? [],
    keywords: data.keywords ?? [],
    readingTime: Math.max(1, Math.round(content.split(/\s+/).length / 220)),
    body: marked.parse(content, { async: false }) as string,
  };
}

const isLive = (t: Teardown) => new Date(t.publishedAt).getTime() <= Date.now();

export function getAllTeardowns(): Teardown[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parse)
    .filter(isLive)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getTeardown(slug: string): Teardown | null {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(DIR, file))) return null;
  const t = parse(file);
  return isLive(t) ? t : null;
}

export function getAllTeardownSlugs(): string[] {
  return getAllTeardowns().map((t) => t.slug);
}

/** Teardown ad-spend figures are outside-in estimates, never client data.
 *  Any figure with digits is labelled as such; plain-text values pass through. */
export function spendLabel(spend: string): string {
  return /\d/.test(spend) ? `Est. ad spend ${spend}` : spend;
}
