export type CaseStudy = {
  slug: string;
  name: string;
  headline: string;
  summary: string;
  client: string;
  industry: string;
  program: string;
  strategy: string;
  logo: string;
  stats: { value: string; label: string }[];
  metrics: { metric: string; value: string }[];
  details: { title: string; body: string }[];
  proofImages: string[];
  pdfUrl: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "theaudiolearning",
    name: "TheAudioLearning",
    headline:
      "₹1Cr+ Revenue Generated Using Performance Marketing for a Medical Coding Program",
    summary:
      "TheAudioLearning is a healthcare education platform offering medical coding programs with placement support. The objective was to build a scalable digital acquisition system that could consistently generate qualified leads, webinar registrations, and course enrollments.",
    client: "TheAudioLearning",
    industry: "Healthcare Education / Medical Coding Training",
    program: "CPC Medical Coding Certification with Placement Assistance",
    strategy: "Webinar funnel + WhatsApp follow-up",
    logo: "/images/case-studies/tal-logo.png",
    stats: [
      { value: "₹1.02Cr+", label: "Revenue Generated" },
      { value: "5.5X", label: "ROAS" },
      { value: "780+", label: "Admissions" },
    ],
    metrics: [
      { metric: "Ad Spend", value: "₹18.6L" },
      { metric: "Total Impressions", value: "12.4M" },
      { metric: "Total Clicks", value: "186,000" },
      { metric: "Average CPC", value: "₹10" },
      { metric: "Leads Generated", value: "15,000+" },
      { metric: "Cost Per Lead (overall average)", value: "₹126" },
      { metric: "Qualified Leads", value: "5,800+" },
      { metric: "Admissions", value: "780+" },
      { metric: "Revenue Generated", value: "₹1.02Cr+" },
      { metric: "Revenue Pipeline", value: "₹2.4Cr+" },
      { metric: "ROAS", value: "5.5X" },
    ],
    details: [
      {
        title: "The Approach",
        body: "The campaign combined a webinar funnel strategy with direct conversion campaigns targeting warm audiences over a 120-day window. Prospects registered for free live webinars with instructor Aparajita Sudarshan, received automated WhatsApp confirmations and follow-ups, and were qualified through structured lead forms covering background, language preference, and enrollment intent.",
      },
      {
        title: "Why It Worked",
        body: "By pairing a low-friction webinar entry point with WhatsApp-based follow-up automation, prospects were nurtured from first click to enrollment without manual intervention at every step. Campaign-level cost per lead ranged from ₹11.40 to ₹41.16 across webinar batches, with the funnel converting 5,800+ qualified leads into 780+ paid admissions.",
      },
    ],
    proofImages: [
      "/images/case-studies/tal-1.jpg",
      "/images/case-studies/tal-2.jpg",
      "/images/case-studies/tal-3.jpg",
      "/images/case-studies/tal-4.jpg",
      "/images/case-studies/tal-5.jpg",
      "/images/case-studies/tal-6.jpg",
    ],
    pdfUrl: "/downloads/case-study-theaudiolearning.pdf",
  },
  {
    slug: "cvolvepro",
    name: "CvolvePro",
    headline: "LinkedIn Growth Marketing Campaign (Initial Growth Phase)",
    summary:
      "CVolvePro is a career-tech platform helping professionals improve resumes, cover letters, ATS compatibility and interview preparation. The objective was to launch LinkedIn growth marketing during the initial phase and build awareness among job seekers and early-career professionals.",
    client: "CVolvePro",
    industry: "Career Tech / AI Resume Tools",
    program: "LinkedIn Growth Marketing — Initial Phase",
    strategy: "LinkedIn Sponsored Content + Video Campaigns",
    logo: "/images/case-studies/cvolvepro-logo.png",
    stats: [
      { value: "222,630+", label: "Professional Reach" },
      { value: "8,752", label: "Total Clicks" },
      { value: "₹4.69", label: "Average CPC" },
    ],
    metrics: [
      { metric: "Ad Spend", value: "₹41,010" },
      { metric: "Total Impressions", value: "386,438" },
      { metric: "Professional Reach", value: "222,630+" },
      { metric: "Total Clicks", value: "8,752" },
      { metric: "Average CPC", value: "₹4.69" },
      { metric: "CTR", value: "2.26%" },
    ],
    details: [
      {
        title: "Growth Strategy",
        body: "LinkedIn Sponsored Content and video campaigns targeting job seekers, early-career professionals, and tech professionals. Educational content focused on resume optimization and ATS compatibility, with authority-driven messaging positioning CVolvePro as a complete career toolkit.",
      },
      {
        title: "Key Results",
        body: "Reached 220K+ professionals on LinkedIn and generated 8,700+ clicks from career-focused audiences while maintaining CPC under ₹5 during the testing phase. Best-performing ad sets achieved CPC as low as ₹4.28 with CTR up to 3.88%, identifying the high-performing career education content themes that now anchor the scaling phase.",
      },
    ],
    proofImages: [
      "/images/case-studies/cvolvepro-1.jpg",
      "/images/case-studies/cvolvepro-2.jpg",
      "/images/case-studies/cvolvepro-3.jpg",
      "/images/case-studies/cvolvepro-4.jpg",
    ],
    pdfUrl: "/downloads/case-study-cvolvepro.pdf",
  },
  {
    slug: "helping-hands-foundation",
    name: "Helping Hands Foundation",
    headline: "₹30 Lakhs in 60 Days. 4.5X ROAS.",
    summary:
      "How Yashova built the fundraising infrastructure that turned ad spend into verified donation revenue. Helping Hands Foundation had a cause genuinely worth funding — but near-zero infrastructure to convert goodwill into actual donations. Over 60 days, we built that infrastructure from scratch.",
    client: "Helping Hands Foundation",
    industry: "Non-Profit / NGO",
    program: "Donation Funnel + Meta Ads (May – June 2026)",
    strategy: "Meta Ads + Website Optimization + Meta Pixel + CAPI + Funnel Optimization",
    logo: "/images/case-studies/hhf-logo.png",
    stats: [
      { value: "₹30.1L", label: "Donations — Razorpay verified" },
      { value: "4.5X", label: "Return on Ad Spend" },
      { value: "11,246", label: "Captured Payments" },
    ],
    metrics: [
      { metric: "Donations Collected (Razorpay)", value: "₹30,11,507 — verified" },
      { metric: "Total Donor Transactions", value: "11,246 captured payments" },
      { metric: "Return on Ad Spend (ROAS)", value: "4.5X" },
      { metric: "Total Unique Reach", value: "2,65,400 people" },
      { metric: "Click-Through Rate (CTR)", value: "2.8% (industry avg: 0.8–1.5%)" },
      { metric: "Cost Per Click (CPC)", value: "₹12.54" },
      { metric: "Best Cost Per Purchase", value: "₹85.48 (started at ₹175.61)" },
      { metric: "CPR Improvement", value: "51% reduction over campaign period" },
      { metric: "Payment Disputes", value: "₹0.00 — zero chargebacks" },
      { metric: "Dominant Payment Method", value: "UPI — 96.99% of transactions" },
      { metric: "Total Campaigns Tested", value: "13" },
      { metric: "Tracking Stack", value: "Meta Pixel + CAPI (dual attribution)" },
    ],
    details: [
      {
        title: "Most Donation Campaigns Fail Before the First Ad Runs",
        body: "Most people think donation campaigns fail because of budget. That assumption is wrong, and it is expensive. When we audited the setup, the website existed but was built like an about-us page — informational, not transactional. Meta Pixel was installed, but the Conversion API was absent, meaning campaigns were optimizing on roughly 40–70% of actual conversion data.",
      },
      {
        title: "What We Built",
        body: "We restructured the donor journey around a single question: what does a first-time visitor need to see, read, and feel before they are willing to enter their card details? Credibility signals first, then emotional resonance, then a frictionless ask. We implemented the full dual-tracking stack — server-side Conversion API alongside the browser-side Pixel — with custom events tied to every meaningful donor action.",
      },
      {
        title: "What the Data Showed",
        body: "The scaled Advantage+ campaign achieved ₹85.48 cost per purchase — less than half the first campaign's ₹175.61. That improvement is largely a data quality story: the algorithm trained on clean CAPI data. 96.99% of donors paid via UPI, telling us exactly who the audience is — mobile-first, deciding quickly. Zero disputes across 11,246 transactions means the donor journey was clear enough that nobody felt deceived.",
      },
    ],
    proofImages: [
      "/images/case-studies/hhf-1.jpg",
      "/images/case-studies/hhf-2.jpg",
      "/images/case-studies/hhf-3.jpg",
      "/images/case-studies/hhf-4.jpg",
      "/images/case-studies/hhf-5.jpg",
    ],
    pdfUrl: "/downloads/case-study-helping-hands-foundation.pdf",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
