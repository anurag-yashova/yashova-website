import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // /ai-audit serves the standalone Website Growth Audit app
        { source: "/ai-audit", destination: "/growth-audit.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
