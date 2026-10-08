import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Script from "next/script";
import AuditBoot from "./AuditBoot";
import "./audit.css";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Free Website Growth Audit",
  description:
    "A free breakdown of your website: speed, SEO, conversion and the revenue you may be leaving on the table.",
  path: "/ai-audit",
});

export default function AiAudit() {
  const markup = fs.readFileSync(
    path.join(process.cwd(), "src/app/ai-audit/markup.html"),
    "utf-8"
  );

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: markup }} />
      <Script src="/audit/growth-audit.js" strategy="afterInteractive" />
      <AuditBoot />
    </>
  );
}
