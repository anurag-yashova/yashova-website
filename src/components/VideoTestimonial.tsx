"use client";

import { useRef, useState } from "react";

export default function VideoTestimonial({
  src,
  label,
  quote,
}: {
  src: string;
  label: string;
  quote: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  return (
    <figure className="glass card-hover flex h-full flex-col overflow-hidden rounded-lg">
      <button
        type="button"
        onClick={toggle}
        className="group relative aspect-[9/16] max-h-80 w-full overflow-hidden bg-black focus-ring"
        aria-label={playing ? `Pause testimonial from ${label}` : `Play testimonial from ${label}`}
      >
        <video
          ref={videoRef}
          src={src}
          preload="metadata"
          playsInline
          onEnded={() => setPlaying(false)}
          className="h-full w-full object-cover"
        />
        {!playing && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/20">
            <span className="flex h-14 w-14 items-center justify-center rounded-md bg-ink shadow-lg">
              <svg viewBox="0 0 24 24" fill="var(--void)" className="ml-1 h-6 w-6" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        )}
      </button>
      <figcaption className="flex flex-1 flex-col p-5">
        <blockquote className="flex-1 text-sm leading-relaxed text-ink-muted">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <span className="mt-3 text-sm font-semibold text-gold">— {label}</span>
      </figcaption>
    </figure>
  );
}
