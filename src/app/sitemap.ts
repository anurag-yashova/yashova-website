import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { getAllPosts } from "@/lib/posts";
import { getAllTeardowns } from "@/lib/teardowns";

/* Keep the sitemap in step with scheduled publishing. */
export const revalidate = 3600;

const BASE = "https://yashova.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/case-studies", priority: 0.9 },
    { path: "/teardowns", priority: 0.8 },
    { path: "/roi-calculator", priority: 0.7 },
    { path: "/ai-audit", priority: 0.8 },
    { path: "/blog", priority: 0.8 },
    { path: "/strategy-call", priority: 0.9 },
    { path: "/refund-policy", priority: 0.3 },
  ].map((r) => ({
    url: `${BASE}${r.path}`,
    priority: r.priority,
  }));

  const caseRoutes = caseStudies.map((cs) => ({
    url: `${BASE}/case-studies/${cs.slug}`,
    priority: 0.8,
  }));

  const teardownRoutes = getAllTeardowns().map((t) => ({
    url: `${BASE}/teardowns/${t.slug}`,
    lastModified: new Date(t.publishedAt),
    priority: 0.7,
  }));

  const postRoutes = getAllPosts().map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    priority: 0.6,
  }));

  return [...staticRoutes, ...caseRoutes, ...postRoutes, ...teardownRoutes];
}
