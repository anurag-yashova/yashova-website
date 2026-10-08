import type { Metadata } from "next";

export const SITE_URL = "https://yashova.com";
const DEFAULT_OG_IMAGE = "/og-image.png";

type PageMetaInput = {
  /** Page title WITHOUT the "| Yashova" suffix (the layout template adds it). */
  title: string;
  description: string;
  /** Path of THIS page, starting with "/" (e.g. "/about"). Used for the canonical and og:url. */
  path: string;
  type?: "website" | "article";
  keywords?: string[];
  /** Pass false when the route has its own opengraph-image file. */
  defaultImage?: boolean;
  publishedTime?: string;
};

/** One place that gives every page its OWN canonical, title, description and
 *  Open Graph title. Next.js does not merge nested openGraph objects, so each
 *  page must provide the full set. */
export function pageMeta(p: PageMetaInput): Metadata {
  const ogTitle = `${p.title} | Yashova`;
  return {
    title: p.title,
    description: p.description,
    ...(p.keywords ? { keywords: p.keywords } : {}),
    alternates: { canonical: p.path },
    openGraph: {
      type: p.type ?? "website",
      locale: "en_IN",
      siteName: "Yashova",
      url: p.path,
      title: ogTitle,
      description: p.description,
      ...(p.publishedTime ? { publishedTime: p.publishedTime } : {}),
      ...(p.defaultImage === false
        ? {}
        : { images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Yashova — Not Loud. Unignorable." }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: p.description,
      ...(p.defaultImage === false ? {} : { images: [DEFAULT_OG_IMAGE] }),
    },
  };
}

/** JSON-LD breadcrumb trail. items: [name, path] in order, homepage excluded (added here). */
export function breadcrumbLd(items: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [["Home", "/"], ...items].map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE_URL}${path === "/" ? "" : path}`,
    })),
  };
}
