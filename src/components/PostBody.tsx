"use client";

import React from "react";
import { DeltaBar, RankBars, FunnelSteps, BigStat } from "@/components/PostFigures";
import { figures } from "@/lib/figures";

/** Renders article HTML, swapping any [[figure:key]] marker for a real
 *  data visual. Keeps markdown authoring simple while the charts stay code. */
export default function PostBody({ html }: { html: string }) {
  const parts = html.split(/\[\[figure:([a-z0-9-]+)\]\]/i);

  return (
    <div className="post-body mt-10">
      {parts.map((part, i) => {
        // odd indices are the captured figure keys
        if (i % 2 === 1) {
          const spec = figures[part];
          if (!spec) return null;
          if (spec.kind === "delta") return <DeltaBar key={i} {...spec.props} />;
          if (spec.kind === "rank") return <RankBars key={i} {...spec.props} />;
          if (spec.kind === "funnel") return <FunnelSteps key={i} {...spec.props} />;
          if (spec.kind === "stat") return <BigStat key={i} {...spec.props} />;
          return null;
        }
        return <div key={i} dangerouslySetInnerHTML={{ __html: part }} />;
      })}
    </div>
  );
}
