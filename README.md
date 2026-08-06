# Yashova — yashova.com

Next.js + Tailwind rebuild of the Yashova performance-marketing agency site,
migrated from WordPress content (site copy, images, and case study numbers
pulled from the original WP export).

## Stack

- **Next.js 15 (App Router)** + TypeScript
- **Tailwind CSS v4** — design tokens in `src/app/globals.css`
- **Sanity** (headless CMS) for the `/blog` section — project ID `ee6fwzzp`
- Deploys on **Vercel**

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Sanity dataset/project if different
npm run dev
```

## Structure

- `src/app/` — pages (App Router)
- `src/components/` — shared UI (Nav, Footer, Stat)
- `src/lib/case-studies.ts` — case study content (Home, TheAudioLearning, CvolvePro, Helping Hands Foundation)
- `src/lib/sanity.ts` — Sanity client + blog queries

## Known follow-ups

- **Strategy Call form** (`/strategy-call`) currently submits via `mailto:`,
  which is unreliable on mobile. Wire it to Formspree, Resend, or a Next.js
  API route before launch.
- **AI Audit tool** (`/ai-audit`) is currently a lead-capture page. The
  original site's live PageSpeed-API-powered audit tool was not rebuilt —
  that's a separate scoped task.
- **Sanity blog schema** hasn't been created yet in the Sanity Studio — the
  `/blog` route will show an empty state until a `post` document type (with
  `title`, `slug`, `excerpt`, `publishedAt`, `body`) exists and has entries.
- Point `yashova.com` DNS at Vercel once the project is deployed there.
