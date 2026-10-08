import type { NextConfig } from "next";

/** Old WordPress URLs → new routes.
 *  Kept as permanent (308) so Google transfers ranking signal at cutover. */
const wordpressRedirects = [
  { source: "/home", destination: "/" },
  { source: "/index.php", destination: "/" },
  { source: "/case-study-theaudiolearning", destination: "/case-studies/theaudiolearning" },
  { source: "/case-study-cvolvepro", destination: "/case-studies/cvolvepro" },
  { source: "/helping-hands-foundation", destination: "/case-studies/helping-hands-foundation" },
  // page retired — send its traffic to the closest live equivalent
  { source: "/for-colleges-institutions", destination: "/case-studies/theaudiolearning" },
  { source: "/for-colleges", destination: "/case-studies/theaudiolearning" },
  { source: "/design", destination: "/teardowns" },
  { source: "/successful", destination: "/strategy-call" },
  // Old WordPress/Rank Math sitemap and feed addresses that Google may still hold
  { source: "/sitemap_index.xml", destination: "/sitemap.xml" },
  { source: "/page-sitemap.xml", destination: "/sitemap.xml" },
  { source: "/post-sitemap.xml", destination: "/sitemap.xml" },
  { source: "/wp-sitemap.xml", destination: "/sitemap.xml" },
  { source: "/feed", destination: "/blog" },
  { source: "/comments/feed", destination: "/blog" },
  // Old WordPress archive pages
  { source: "/category/:path*", destination: "/blog" },
  { source: "/tag/:path*", destination: "/blog" },
  { source: "/author/:path*", destination: "/about" },
  { source: "/index.php/:path*", destination: "/" },
];

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return wordpressRedirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
