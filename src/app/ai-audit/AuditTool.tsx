"use client";

import { useState } from "react";

type Metric = { id: string; label: string; score: number | null };

type AuditResult = {
  performanceScore: number;
  seoScore: number;
  accessibilityScore: number;
  metrics: Metric[];
  opportunities: string[];
};

function scoreColor(score: number) {
  if (score >= 90) return "text-signal";
  if (score >= 50) return "text-gold";
  return "text-red-400";
}

export default function AuditTool() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);

  async function runAudit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    let target = url.trim();
    if (!target) return;
    if (!/^https?:\/\//i.test(target)) target = `https://${target}`;

    setLoading(true);
    try {
      const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
        target
      )}&category=performance&category=seo&category=accessibility&strategy=mobile`;
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("PageSpeed API request failed");
      const data = await res.json();

      const cats = data.lighthouseResult?.categories;
      const audits = data.lighthouseResult?.audits;

      const opportunityIds = [
        "render-blocking-resources",
        "unused-css-rules",
        "uses-optimized-images",
        "uses-text-compression",
        "largest-contentful-paint",
        "first-contentful-paint",
        "cumulative-layout-shift",
      ];

      const metrics: Metric[] = opportunityIds
        .map((id) => ({
          id,
          label: audits?.[id]?.title ?? id,
          score:
            typeof audits?.[id]?.score === "number"
              ? Math.round(audits[id].score * 100)
              : null,
        }))
        .filter((m) => m.score !== null)
        .slice(0, 5);

      const opportunities: string[] = opportunityIds
        .filter((id) => audits?.[id] && typeof audits[id].score === "number" && audits[id].score < 0.9)
        .map((id) => audits[id].title)
        .slice(0, 4);

      setResult({
        performanceScore: Math.round((cats?.performance?.score ?? 0) * 100),
        seoScore: Math.round((cats?.seo?.score ?? 0) * 100),
        accessibilityScore: Math.round((cats?.accessibility?.score ?? 0) * 100),
        metrics,
        opportunities,
      });
    } catch {
      setError(
        "Couldn't fetch a live audit for that URL right now — the page may block automated scans, or the site may be unreachable. Try another URL, or book a manual audit call below."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-12">
      <form onSubmit={runAudit} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="yourwebsite.com"
          className="w-full max-w-sm rounded-full border border-glass-border bg-surface px-5 py-3 text-sm text-ink focus-ring sm:w-80"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-void transition-colors hover:bg-gold-bright focus-ring disabled:opacity-60"
        >
          {loading ? "Scanning…" : "Run Free Audit"}
        </button>
      </form>

      {error && (
        <p className="mx-auto mt-4 max-w-md text-sm text-ink-muted">{error}</p>
      )}

      {result && (
        <div className="mx-auto mt-10 max-w-2xl text-left">
          <div className="grid grid-cols-3 gap-4">
            <div className="glass rounded-2xl p-5 text-center">
              <div className={`font-mono-num text-3xl font-semibold ${scoreColor(result.performanceScore)}`}>
                {result.performanceScore}
              </div>
              <div className="mt-1 text-xs text-ink-muted">Performance</div>
            </div>
            <div className="glass rounded-2xl p-5 text-center">
              <div className={`font-mono-num text-3xl font-semibold ${scoreColor(result.seoScore)}`}>
                {result.seoScore}
              </div>
              <div className="mt-1 text-xs text-ink-muted">SEO</div>
            </div>
            <div className="glass rounded-2xl p-5 text-center">
              <div className={`font-mono-num text-3xl font-semibold ${scoreColor(result.accessibilityScore)}`}>
                {result.accessibilityScore}
              </div>
              <div className="mt-1 text-xs text-ink-muted">Accessibility</div>
            </div>
          </div>

          {result.opportunities.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-ink">Where you&apos;re losing money</h3>
              <ul className="mt-3 space-y-2">
                {result.opportunities.map((o) => (
                  <li key={o} className="flex gap-2 text-sm text-ink-muted">
                    <span className="text-gold">»</span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-6 text-xs text-ink-muted">
            This is an automated technical scan (via Google PageSpeed Insights)
            covering speed, SEO, and accessibility — not a full marketing audit
            of your funnel and ad targeting. Book a call below for that.
          </p>
        </div>
      )}
    </div>
  );
}
