import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Script from "next/script";
import AuditBoot from "./AuditBoot";
import "./audit.css";

export const metadata: Metadata = {
  title: "Free Growth Audit",
  description:
    "A real analyst-grade breakdown of your site — speed, SEO, conversion and the revenue you're leaving on the table.",
};

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
