import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { getAllPosts } from "@/lib/posts";

const BASE = "https://yashova.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/case-studies", priority: 0.9 },
    { path: "/for-colleges", priority: 0.7 },
    { path: "/roi-calculator", priority: 0.7 },
    { path: "/ai-audit", priority: 0.8 },
    { path: "/blog", priority: 0.8 },
    { path: "/strategy-call", priority: 0.9 },
    { path: "/refund-policy", priority: 0.3 },
  ].map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: new Date(),
    priority: r.priority,
  }));

  const caseRoutes = caseStudies.map((cs) => ({
    url: `${BASE}/case-studies/${cs.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  const postRoutes = getAllPosts().map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    priority: 0.6,
  }));

  return [...staticRoutes, ...caseRoutes, ...postRoutes];
}
