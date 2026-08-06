"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function ProofGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? null : (i + images.length - 1) % images.length)),
    [images.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, prev, next]);

  return (
    <>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            className="card-hover group relative overflow-hidden rounded-md border border-glass-border bg-white focus-ring"
            aria-label={`Expand proof screenshot ${i + 1} for ${name}`}
          >
            <Image
              src={src}
              alt={`${name} campaign dashboard proof ${i + 1}`}
              width={800}
              height={500}
              className="h-auto w-full object-contain"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity group-hover:bg-black/25 group-hover:opacity-100">
              <span className="rounded-md bg-ink px-3.5 py-1.5 text-xs font-semibold text-void">
                Click to expand
              </span>
            </span>
          </button>
        ))}
      </div>

      {index !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${name} proof screenshot viewer`}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-md bg-white/10 text-white transition-colors hover:bg-white/20 focus-ring"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous image"
            className="lightbox-nav absolute left-4 flex h-11 w-11 items-center justify-center rounded-md bg-white/10 text-white transition-colors hover:bg-white/20 focus-ring"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <div className="max-h-[78vh] w-full max-w-6xl overflow-auto rounded-md bg-white md:max-h-[88vh]" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[index]} alt={`${name} proof full view`} className="h-auto w-full" />
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next image"
            className="lightbox-nav absolute right-4 flex h-11 w-11 items-center justify-center rounded-md bg-white/10 text-white transition-colors hover:bg-white/20 focus-ring"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
          <span className="absolute bottom-5 rounded-md bg-white/10 px-3 py-1 font-mono-num text-xs text-white">
            {index + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}
