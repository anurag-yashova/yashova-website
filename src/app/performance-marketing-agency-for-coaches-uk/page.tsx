import type { Metadata } from "next";
import MarketPage, { type Market } from "@/components/MarketPage";
import { pageMeta } from "@/lib/seo";

const market: Market = {
  path: "/performance-marketing-agency-for-coaches-uk",
  pageTitle: "Performance Marketing Agency for Coaches and Course Creators in the UK",
  eyebrow: "For coaches and course creators in the UK",
  title: (
    <>
      Performance marketing for coaches and course creators in the <span className="hl">UK</span>
    </>
  ),
  lead: "Ads, a free-session funnel and WhatsApp follow-up that turn a cold audience into paid enrolments, reported in numbers you can check.",
  currency: "GBP",
  intro: [
    "Coaching and courses are trust purchases. The buyer is not asking whether the programme is good. They are asking whether they will be able to do it and whether it will change anything. Advertising cannot answer either question, which is why direct-sale ads to cold audiences usually fail here.",
    "If you coach or teach in the UK, you probably already know that claims about results, income or outcomes need care in an advert. We write claims you can back up, and we build the funnel so that a prospect meets you, and your proof, before they are ever asked to pay.",
  ],
  timeZone: {
    heading: "Working across the time difference",
    body: "India is 5 hours 30 minutes ahead of UK winter time and 4 hours 30 minutes ahead during British Summer Time. Strategy calls are booked in a 30-minute slot through a calendar that shows times in your own time zone, so your morning is our afternoon.",
  },
  currencyFaq: {
    q: "Will I see prices in pounds?",
    a: "Figures on this page are shown in rupees, which are the verified amounts, with an approximate GBP conversion beside them. Billing is in rupees.",
  },
};

export const metadata: Metadata = pageMeta({
  title: "Performance Marketing Agency for Coaches and Course Creators in the UK",
  description:
    "Ads, free-session funnels and WhatsApp follow-up for coaches and course creators in the UK. One real case study: ₹18.6L became ₹1.02Cr in 120 days, 780+ admissions, 5.5X ROAS.",
  path: market.path,
});

export default function Page() {
  return <MarketPage m={market} />;
}
