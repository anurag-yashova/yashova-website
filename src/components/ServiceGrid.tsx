import Reveal from "@/components/Reveal";
import {
  TargetIcon,
  FunnelIcon,
  StrategyIcon,
  RocketIcon,
  SearchInsightIcon,
  TeamIcon,
} from "@/components/icons";

/** The full service list, in the order a client actually meets it:
 *  think first, build second, run ads as one part of the system. */
export const services = [
  {
    icon: StrategyIcon,
    title: "Strategy and Ideation",
    body: "We start with your offer, your audience and your numbers, then plan what to build, test and scale. Campaign ideas come from the buyer's worry, not from a template.",
    tags: ["Offer and positioning", "Roadmaps", "Campaign ideas"],
  },
  {
    icon: FunnelIcon,
    title: "Funnels",
    body: "A free session, a lead magnet or a direct sale. We design the whole path from first click to paying customer, and fix the leaks between the steps.",
    tags: ["Webinar funnels", "Lead funnels", "Lead qualification"],
  },
  {
    icon: RocketIcon,
    title: "Landing Pages",
    body: "Fast, clear pages written and built to convert, with Meta Pixel and Conversion API tracking installed before a single rupee is spent.",
    tags: ["Landing pages", "Websites", "Pixel and CAPI"],
  },
  {
    icon: SearchInsightIcon,
    title: "AI Integration",
    body: "AI placed inside your marketing and operations where it saves real time: faster replies, smarter lead handling and less manual follow-up.",
    tags: ["AI workflows", "Automation", "AI audit"],
  },
  {
    icon: TeamIcon,
    title: "WhatsApp Automation",
    body: "Confirmations, reminders and follow-ups that go out automatically, so the lead you paid for is contacted while they still remember you.",
    tags: ["WhatsApp automation", "CRM", "Follow-ups"],
  },
  {
    icon: TargetIcon,
    title: "Performance Marketing",
    body: "Meta, Google and LinkedIn campaigns, run as one part of the system and never the whole of it. Budget moves only to what returns revenue.",
    tags: ["Meta Ads", "Google Ads", "LinkedIn Ads"],
  },
];

export default function ServiceGrid() {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {services.map((c, i) => (
        <Reveal key={c.title} delay={(i % 3) * 90} className="h-full">
          <div className="card-hover h-full rounded-lg border border-surface-line/60 bg-void p-7">
            <div className="flex items-start justify-between">
              <c.icon className="text-gold" />
              <span className="index-num text-3xl" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-ink">{c.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{c.body}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {c.tags.map((t) => (
                <span key={t} className="pill px-3 py-1 text-xs text-ink-muted">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
