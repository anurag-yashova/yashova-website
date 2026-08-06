export type CaseStudy = {
  slug: string;
  name: string;
  headline: string;
  summary: string;
  client: string;
  industry: string;
  program: string;
  strategy: string;
  stats: { value: string; label: string }[];
  details: { title: string; body: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "theaudiolearning",
    name: "TheAudioLearning",
    headline: "₹1Cr+ Revenue Generated Using Performance Marketing for a Medical Coding Program",
    summary:
      "TheAudioLearning is a healthcare education platform that offers medical coding programs with placement support. The objective was to build a scalable digital acquisition system capable of consistently generating qualified leads.",
    client: "TheAudioLearning",
    industry: "Healthcare Education / Medical Coding Training",
    program: "CPC Medical Coding Certification with Placement Assistance",
    strategy: "Webinar funnel + WhatsApp follow-up",
    stats: [
      { value: "₹1.02Cr", label: "Revenue Generated" },
      { value: "5.5X", label: "ROAS" },
      { value: "850+", label: "Leads Generated" },
      { value: "₹42", label: "Cost per Lead" },
      { value: "12.5%", label: "Conversion Rate" },
    ],
    details: [
      {
        title: "The Approach",
        body: "The campaign combined a webinar funnel strategy with direct conversion campaigns targeting warm audiences, ensuring both engagement and higher conversion rates over a 120-day window.",
      },
      {
        title: "Why It Worked",
        body: "By pairing a low-friction webinar entry point with WhatsApp-based follow-up automation, prospects were nurtured from first click to enrollment without manual intervention at every step.",
      },
    ],
  },
  {
    slug: "cvolvepro",
    name: "CvolvePro",
    headline: "LinkedIn Growth Marketing Campaign (Initial Growth Phase)",
    summary:
      "CVolvePro is a career-tech platform that helps professionals improve their resumes, cover letters, ATS compatibility, and interview preparation.",
    client: "CVolvePro",
    industry: "Career Tech / AI Resume Tools",
    program: "LinkedIn Growth Marketing — Initial Phase",
    strategy: "Funnel optimization + retargeting",
    stats: [
      { value: "67%", label: "Conversion ↑" },
      { value: "45%", label: "CPL Reduction" },
      { value: "4.2x", label: "ROAS" },
      { value: "220K+", label: "Professionals Reached" },
      { value: "8,700+", label: "Clicks Generated" },
    ],
    details: [
      {
        title: "The Approach",
        body: "The objective of this campaign was to launch LinkedIn growth marketing during the initial phase and build awareness among job seekers and early-career professionals, using LinkedIn Sponsored Content and video campaigns targeted at job seekers, early-career and tech professionals.",
      },
      {
        title: "Growth Strategy",
        body: "Educational content focused on resume optimization and ATS compatibility, with authority-driven messaging positioning CVolvePro as a complete career toolkit. CPC was maintained under ₹5 during the testing phase.",
      },
    ],
  },
  {
    slug: "helping-hands-foundation",
    name: "Helping Hands Foundation",
    headline: "₹30L+ in Verified Donations Through Meta Ads and Funnel Optimization",
    summary:
      "Helping Hands Foundation is an NGO relying on online donations. The objective was to build a trustworthy, high-converting donation funnel and scale qualified donor acquisition through Meta Ads.",
    client: "Helping Hands Foundation",
    industry: "Non-Profit / NGO",
    program: "Donation Funnel + Meta Ads",
    strategy: "Meta Ads + Website Optimization + Meta Pixel + CAPI + Funnel Optimization",
    stats: [
      { value: "₹30.1L+", label: "Donations Collected" },
      { value: "4.5X", label: "Return on Ad Spend" },
      { value: "11,246", label: "Captured Payments" },
    ],
    details: [
      {
        title: "The Approach",
        body: "Donation tracking was rebuilt around Meta Pixel and Conversions API (CAPI) so every rupee of ad spend could be attributed to verified, Razorpay-confirmed donations rather than platform-reported clicks.",
      },
      {
        title: "Why It Worked",
        body: "Optimizing the donation page itself alongside the ad campaigns removed friction between click and completed payment, turning cold traffic into a reliably profitable acquisition channel for the foundation.",
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
