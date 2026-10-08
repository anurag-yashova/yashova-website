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
  lead: "Ads, a free-session funnel and WhatsApp follow-up that turn a cold audience into paid enrolments. We run LinkedIn growth campaigns for a UAE-based client, and report every number.",
  currency: "AED",
  short: "UAE",
  country: "United Arab Emirates",
  tz: "Asia/Dubai",
  city: "Dubai",
  clientSlug: "cvolvepro",
  clientLogo: "/images/clients/cvolvepro.jpg",
  clientKind: "Career-tech platform",
  period: "LinkedIn · initial growth phase",
  proofTitle: (
    <>
      222,630+ professionals reached at <span className="hl">₹4.69</span> a click
    </>
  ),
  proofNote:
    "CvolvePro is a UAE-based career-tech platform. We launched its LinkedIn growth marketing in the initial phase, to build awareness among job seekers and early-career professionals. It is an awareness-phase campaign, so it reports reach, clicks and cost per click, not revenue. We label it that way on purpose.",
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
  clientFaq: {
    q: "Do you have a client in the UAE?",
    a: "Yes. CvolvePro, a career-tech platform, is a UAE-based client, and its LinkedIn campaign results are on this page. They are early-phase awareness numbers (reach, clicks, cost per click), not revenue, and we say so. For a full enrolment funnel with revenue, see the TheAudioLearning case study.",
  },
  other: {
    text: "For a full enrolment funnel with revenue, see TheAudioLearning, a UK-based client.",
    href: "/case-studies/theaudiolearning",
    cta: "Read the case study",
  },
};

export const metadata: Metadata = pageMeta({
  title: "Performance Marketing Agency for Coaches and Course Creators in the UAE",
  description:
    "Ads, free-session funnels and WhatsApp follow-up for coaches and course creators in the UAE. Proof from a UAE-based client: 222,630+ professionals reached on LinkedIn at ₹4.69 a click.",
  path: market.path,
});

export default function Page() {
  return <MarketPage m={market} />;
}
