"use client";

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK;

/** Renders a real booking calendar once NEXT_PUBLIC_CAL_LINK is set in Vercel
 *  (e.g. "yashova/strategy-call"). Until then, the WhatsApp form is used. */
export default function BookingEmbed({ fallback }: { fallback: React.ReactNode }) {
  if (!CAL_LINK) return <>{fallback}</>;

  return (
    <div className="overflow-hidden rounded-lg border border-surface-line">
      <iframe
        src={`https://cal.com/${CAL_LINK}?theme=dark&hideEventTypeDetails=false`}
        title="Book a strategy call"
        loading="lazy"
        className="h-[660px] w-full"
      />
    </div>
  );
}
