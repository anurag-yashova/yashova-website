import { ImageResponse } from "next/og";
import { getAllSlugs, getPost } from "@/lib/posts";

export const alt = "Yashova";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "Yashova";
  const date = post
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

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
          padding: "68px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* header: gold rule + wordmark + kicker */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 54, height: 3, background: "#d7af37" }} />
          <div style={{ display: "flex", marginTop: 22, alignItems: "center", gap: 18 }}>
            <span style={{ color: "#fafaf8", fontSize: 22, letterSpacing: 6, fontWeight: 700 }}>
              YASHOVA
            </span>
            <span style={{ color: "#5f5f66", fontSize: 20 }}>·</span>
            <span style={{ color: "#9a9aa2", fontSize: 20, letterSpacing: 4 }}>
              PERFORMANCE MARKETING
            </span>
          </div>
        </div>

        {/* the post title, doing the work */}
        <div
          style={{
            display: "flex",
            color: "#fafaf8",
            fontSize: title.length > 78 ? 54 : 66,
            lineHeight: 1.1,
            fontWeight: 700,
            letterSpacing: -1.5,
            maxWidth: 1010,
          }}
        >
          {title}
        </div>

        {/* footer rule + meta */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: "100%", height: 1, background: "#2a2a2e" }} />
          <div
            style={{
              display: "flex",
              marginTop: 22,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#9a9aa2", fontSize: 22, letterSpacing: 3 }}>
              {date}{post ? `  ·  ${post.readingTime} MIN READ` : ""}
            </span>
            <span style={{ color: "#d7af37", fontSize: 22, letterSpacing: 3 }}>
              yashova.com
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
