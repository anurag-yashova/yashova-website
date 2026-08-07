import { ImageResponse } from "next/og";
import { getAllTeardownSlugs, getTeardown } from "@/lib/teardowns";

export const alt = "Yashova teardown";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllTeardownSlugs().map((slug) => ({ slug }));
}

const sevColor = { critical: "#e06450", major: "#d7af37", minor: "#9a9aa2" } as const;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getTeardown(slug);
  const title = t?.title ?? "Teardown";

  const counts = (["critical", "major", "minor"] as const).map((sev) => ({
    sev,
    n: t?.findings.filter((f) => f.severity === sev).length ?? 0,
  }));

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0c",
          padding: "62px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 54, height: 3, background: "#d7af37" }} />
          <div style={{ display: "flex", marginTop: 20, alignItems: "center", gap: 16 }}>
            <span style={{ color: "#fafaf8", fontSize: 21, letterSpacing: 6, fontWeight: 700 }}>
              YASHOVA
            </span>
            <span style={{ color: "#5f5f66", fontSize: 19 }}>·</span>
            <span style={{ color: "#9a9aa2", fontSize: 19, letterSpacing: 4 }}>
              TEARDOWN{t ? `  ·  ${t.category.toUpperCase()}` : ""}
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            color: "#fafaf8",
            fontSize: title.length > 74 ? 50 : 60,
            lineHeight: 1.1,
            fontWeight: 700,
            letterSpacing: -1.5,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        {/* severity chips — the thing that makes a teardown card unmistakable */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", gap: 14 }}>
            {counts
              .filter((c) => c.n > 0)
              .map((c) => (
                <div
                  key={c.sev}
                  style={{
                    display: "flex",
                    border: `2px solid ${sevColor[c.sev]}`,
                    color: sevColor[c.sev],
                    fontSize: 20,
                    letterSpacing: 3,
                    padding: "8px 16px",
                    fontWeight: 700,
                  }}
                >
                  {c.n} {c.sev.toUpperCase()}
                </div>
              ))}
          </div>
          <div style={{ display: "flex", width: "100%", height: 1, background: "#2a2a2e", marginTop: 26 }} />
          <div style={{ display: "flex", marginTop: 20, justifyContent: "space-between" }}>
            <span style={{ color: "#9a9aa2", fontSize: 21, letterSpacing: 2, maxWidth: 800 }}>
              {t ? t.verdict : ""}
            </span>
            <span style={{ color: "#d7af37", fontSize: 21, letterSpacing: 3 }}>yashova.com</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
