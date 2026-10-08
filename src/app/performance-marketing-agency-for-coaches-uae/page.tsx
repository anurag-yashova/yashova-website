import type { Metadata } from "next";
import MarketPage, { type Market } from "@/components/MarketPage";
import { pageMeta } from "@/lib/seo";

const market: Market = {
  path: "/performance-marketing-agency-for-coaches-uae",
  pageTitle: "Performance Marketing Agency for Coaches and Course Creators in the UAE",
  eyebrow: "For coaches and course creators in the UAE",
  title: (
    <>
      Performance marketing for coaches and course creators in the <span className="hl">UAE</span>
    </>
  ),
  lead: "Ads, a free-session funnel and WhatsApp follow-up that turn a cold audience into paid enrolments, reported in numbers you can check.",
  currency: "AED",
  intro: [
    "Coaching and courses are trust purchases. The buyer is not asking whether the programme is good. They are asking whether they will be able to do it and whether it will change anything. Advertising cannot answer either question, which is why direct-sale ads to cold audiences usually fail here.",
    "If you coach or teach from the UAE, you are often selling to people who have never met you, sometimes in more than one language and from more than one country. That makes the entry offer, the follow-up speed and the quality of your leads matter more than the ad itself.",
  ],
  timeZone: {
    heading: "Working across the time difference",
    body: "The UAE runs on UTC+4 and India on UTC+5:30, so our working day is only 90 minutes ahead of yours. Strategy calls are booked in a 30-minute slot through a calendar that shows times in your own time zone, and weekly updates arrive in time to act on them.",
  },
  currencyFaq: {
    q: "Will I see prices in dirhams?",
    a: "Figures on this page are shown in rupees, which are the verified amounts, with an approximate AED conversion beside them. Billing is in rupees.",
  },
};

export const metadata: Metadata = pageMeta({
  title: "Performance Marketing Agency for Coaches and Course Creators in the UAE",
  description:
    "Ads, free-session funnels and WhatsApp follow-up for coaches and course creators in the UAE. One real case study: ₹18.6L became ₹1.02Cr in 120 days, 780+ admissions, 5.5X ROAS.",
  path: market.path,
});

export default function Page() {
  return <MarketPage m={market} />;
}
