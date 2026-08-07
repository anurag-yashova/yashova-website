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
];

const nextConfig: NextConfig = {
  async redirects() {
    return wordpressRedirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
