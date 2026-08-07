# Yashova Website — Project Instructions

**Paste this file (or point Claude at it) at the start of any new chat.**
It contains everything needed to resume work without re-explaining the project.

---

## 0. How to start a new chat

Send this:

> Repo: https://github.com/anurag-yashova/yashova-website
> Read `PROJECT_INSTRUCTIONS.md` in the repo root — it has the full project context.
> My GitHub token: `<paste a fresh fine-grained PAT here>`
> Today's task: <what you want done>

**Token rules (important):**
- Generate at github.com → Settings → Developer settings → Fine-grained tokens
- Permissions: **Contents: Read and write**, repository access: this repo (or All repositories)
- Never commit the token to the repo. Claude scrubs it from the git remote after each push.
- Revoke it when the work session ends.

---

## 1. Who this is for

**Anurag Sharma**, founder of **Yashova** — a performance marketing agency in Faridabad, Haryana (Delhi NCR).
Specialisms: Meta Ads, Google Ads, funnel building, WhatsApp automation, lead generation.
Clients across coaching, healthcare, edtech, D2C and NGO verticals, in India and internationally.

**Working relationship:** Anurag is the founder and lead designer. Claude is the developer.
Anurag gives design direction and visual feedback (he can see the deployed site; Claude cannot).
Claude implements, tests, and pushes.

**Contact details used across the site:**
- Phone / WhatsApp: +91 981 808 6846
- Email: anurag@yashova.com
- Address: 741, Sector-23, Faridabad
- Tagline: *Not Loud. Unignorable.* / footer: *Systems over shortcuts.*
- Socials: linkedin.com/company/yashova · instagram.com/yashova.in · facebook.com/yashova.in
- Portfolio ("Our Work"): Google Drive folder linked in nav + footer

---

## 2. Stack and infrastructure

| Thing | Value |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind v4 (CSS-variable theme, no config file) |
| Hosting | Vercel — auto-deploys from `main` |
| Live preview | https://yashova-website.vercel.app |
| Production domain | yashova.com (DNS **not yet** pointed at Vercel) |
| Repo | github.com/anurag-yashova/yashova-website |
| Blog | Markdown files in `content/blog/` (NOT a CMS) |
| Meta Pixel | `2060709664860383` |
| Analytics | GA4 scaffolded — set `NEXT_PUBLIC_GA_ID` in Vercel to activate |
| Booking | Cal.com scaffolded — set `NEXT_PUBLIC_CAL_LINK` (e.g. `yashova/strategy-call`) |

---

## 3. Design system — READ BEFORE CHANGING ANYTHING VISUAL

The site went through several redesigns. The **current and final** direction is
**editorial minimalism** — think Pentagram / Instrument, not a SaaS template.

### Non-negotiable rules
- **Monochrome.** Near-black `#0b0b0c` / near-white `#fafaf8`. Gold `#d7af37` is a *marker only* —
  one highlighted word per heading, the rule before a kicker, the data line in a chart,
  link underlines. Gold is never a surface or a button background at rest.
- **Sharp edges.** 8px radius maximum. Cards `rounded-lg`, chips `rounded-md`.
- **No glassmorphism.** `.glass` is a legacy class name that now renders a flat hairline panel.
  `backdrop-blur` survives only on the sticky nav and the lightbox overlay (both functional).
- **No arrows in UI.** No `→` or `←` in buttons, links or labels. Text links use an animated
  underline (`.link-line`) instead. *Exception:* arrows inside blog prose that carry meaning
  (`Events Manager → Test Events`, funnel stages) are intentional and stay.
- **Huge type.** Headlines up to `text-8xl`, `tracking-tighter`.
- **Asymmetric but balanced.** Swiss grid, lots of whitespace.

### The hero is a LIVE DESK, not a dashboard
Anurag explicitly rejected the glass-card + line-chart + floating-avatar hero as
"the design every AI website has." The homepage hero is now `LedgerHero.tsx`: a
statement of account that prints itself line by line, with dotted leaders, a debit
column, a ruled total, a signature and a "Verified" stamp. **Do not reintroduce a
dashboard-style chart hero.** If a new visual is needed, it must come from the
language of documents, print and accounting — not SaaS analytics UI.

`LedgerHero.tsx` cycles three real client statements (TAL → Helping Hands → CvolvePro).
Each one prints line by line, then **SVG pen strokes draw themselves** over the figures
(a loose circle round the ratio, an underline, an arrow) with a **handwritten margin note**
in Caveat (`--font-hand`), a signature, and a stamp — then the sheet lifts away and the next
prints. The handwriting is the point: it is the human hand on the page. Fonts in use are
Space Grotesk / Inter / IBM Plex Mono / **Caveat**.

### Typography
- Display: **Space Grotesk** (`--font-display`) — 700 weight for headings
- Body: **Inter** (`--font-body`) — 400
- Numbers & UI labels: **IBM Plex Mono** (`--font-mono`) — uppercase, wide tracking

### Two themes (both matter equally)
- **Dark = "the campaign room"** (default). Motion on: cursor spotlight, live-ops KPI chips,
  scan lines, drifting dot grids, breathing glow, kinetic headline masks, directional reveals.
- **Light = "the printed report"**. A *different design language*, not an inverted dark mode.
  Every decoration is switched off (`html.light` rules in globals.css): no chips, no glow,
  no grids, no scan lines, no hover lifts. Hairlines on paper, lighter heading weight,
  motion reduced to fades.

Theme toggle lives in the nav, persists via `localStorage` key `yashova-theme`,
with a no-flash restore script in `layout.tsx`.

---

## 4. Repo map

```
content/blog/*.md          30 SEO posts (frontmatter: title, excerpt, publishedAt, keywords)
src/app/
  layout.tsx               fonts, metadata, icons, Nav/Footer/Pixel/CursorGlow/WhatsAppFloat
  template.tsx             per-route page transition (see GOTCHA #2)
  globals.css              THE design system — tokens, motion, light-mode overrides, article styles
  page.tsx                 homepage
  about|teardowns|case-studies|roi-calculator|strategy-call|blog|refund-policy/
  ai-audit/                markup.html + audit.css + page.tsx (see §6)
src/components/
  Nav, Footer, PageHero, Reveal, CountUp, LedgerHero, ProofBar, FunnelDiagram,
  LeakFunnel, BeforeAfter, VideoTestimonial, ProofGallery, ContactForm,
  ThemeToggle, CursorGlow, MetaPixel, WhatsAppFloat, icons.tsx
  (HeroChart / LiveOpsFeed are retired — see the hero rule below)
src/lib/
  case-studies.ts          all case study data + metrics (source of truth)
  posts.ts                 markdown loader + scheduled publishing
  track.ts                 Meta Pixel event helper
public/
  images/ videos/ downloads/ audit/ icon-512.png apple-touch-icon.png
```

---

## 5. Content sources (all real — never invent numbers)

Case study data lives in `src/lib/case-studies.ts`, taken from Anurag's own branded PDFs.

**TheAudioLearning** (healthcare education / CPC medical coding)
₹18.6L spend · 12.4M impressions · 4.1% CTR · 15,000+ leads · ₹126 CPL ·
5,800+ qualified · 780+ admissions · ₹1.02Cr+ revenue · ₹2.4Cr pipeline · **5.5X ROAS**
Instructor: Aparajita Sudarshan (publicly named on their own creatives — safe to use)

**CvolvePro** (career tech / LinkedIn)
₹41,010 spend · 386,438 impressions · 222,630+ reach · 8,752 clicks · ₹4.69 CPC · 2.26% CTR

**Helping Hands Foundation** (NGO / Meta Ads, May–June 2026)
₹30,11,507 Razorpay-verified · 11,246 payments · **4.5X ROAS** · 265.4K reach · 2.8% CTR ·
CPR ₹175.61 → ₹85.48 (51% reduction) · ₹0 disputes · 96.99% UPI · 13 campaigns · Pixel + CAPI

**Testimonial videos** (6, in `public/videos/`, compressed 395MB → 12MB):
Buyernest · TheAudioLearning · CvolvePro · **Knowledgeprisp** (was "Fundraising") ·
**Bebrainteaser** (was "Life Coach") · Student NGO
*Remaining names still to be confirmed by Anurag.*

---

## 6. The AI Audit tool (`/ai-audit`)

A standalone 88KB app **recovered from the old WordPress database** (it was buried in
Elementor widget data, triple-escaped — not in the page content export).

- Markup: `src/app/ai-audit/markup.html`, wrapped in `.ga-app`
- Styles: `src/app/ai-audit/audit.css` — its tokens are **remapped onto the site's CSS variables**,
  so it inherits the theme and follows the dark/light toggle
- Logic: `public/audit/growth-audit.js` — untouched original; intake form → live Lighthouse
  scan → analyst report → lead emailed to anurag@yashova.com via formsubmit
- `AuditBoot.tsx` re-wires the form after client-side navigation

**Do not rewrite this app.** Restyle only.

---

## 7. GOTCHAS — hard-won, do not rediscover these

1. **Google Fonts are unreachable in the sandbox.** Every production build test requires
   temporarily stripping the `next/font/google` imports from `layout.tsx`, building, then
   restoring the real file. Vercel builds fine with fonts. Always restore before committing.

2. **A transformed ancestor breaks `position: fixed`.** `template.tsx` animates pages with
   a transform. If its `animation-fill-mode` is `both`, the retained `transform: translateY(0)`
   makes fixed children (lightbox, modals) anchor to the page instead of the viewport.
   It is set to `backwards` for this reason. The lightbox also renders through a
   **React portal to `document.body`** as a second line of defence.

3. **Scoping element selectors raises specificity.** Turning `button { background: none }`
   into `.ga-app button {…}` made it outrank `.btn-primary`, so every audit button went invisible.
   Scoped element resets must be wrapped in `:where()` to keep zero specificity.

4. **`overflow: hidden` masks clip descenders.** The kinetic headline masks need
   `padding-bottom: 0.14em; margin-bottom: -0.14em`, and heading `line-height` must stay ≥ 1.06,
   or the tail of "y", "g", "p" is cut off.

5. **Animated pseudo-elements cause phantom horizontal scrollbars.** `.scan-top::before`
   travels `translateX(1300%)` and pushed past the viewport, spawning a scrollbar every 7s.
   `.scan-top` now has `overflow: hidden`, plus a global `html, body { overflow-x: clip }`
   guard (`clip`, not `hidden` — `hidden` would break the sticky nav).

6. **Never hardcode colours in components.** Use `var(--void)`, `var(--ink)` etc.
   A hardcoded dark hex on the play button made it invisible in light mode.

7. **Claude cannot see the deployed site.** No screenshots, no headless browser.
   Visual QA depends entirely on Anurag sending screenshots. Always ask for them
   after visual changes — especially **light mode**, where the failure mode is
   elements *vanishing* rather than looking ugly.

8. **`pip` needs `--break-system-packages`.**

---

## 8. Standard workflow for every change

```bash
# 1. edit files
npx tsc --noEmit && npx eslint src        # must both be clean
# 2. build test (strip fonts first — GOTCHA #1), then restore layout.tsx
rm -rf .next && npm run build
# 3. smoke test every route returns 200
npx next start -p 3000
# 4. commit + push
git remote set-url origin https://anurag-yashova:<TOKEN>@github.com/anurag-yashova/yashova-website.git
git push origin main
git remote set-url origin https://github.com/anurag-yashova/yashova-website.git   # scrub token
```

Vercel auto-deploys `main`. **Update this file whenever anything here changes.**

---

## 8b. Teardowns (`/teardowns`)

Replaced "Our Work" in the nav. Anurag does **not** want client creatives or campaign
ideas published — those are the product. Teardowns prove competence without exposing
anything: public audits of live ads, landing pages and funnels.

- Content: `content/teardowns/*.md`, loader `src/lib/teardowns.ts`, same scheduled
  publishing as the blog (future `publishedAt` stays hidden)
- Frontmatter carries `subject`, `category`, `spend`, `verdict` and a `findings` array
  (each with `severity: critical | major | minor`), rendered as a findings sheet
- **Brands are always anonymised** ("a Delhi NCR coaching institute, ₹4L/month").
  Naming a real non-client brand in a critical audit is a defamation and reputation risk
  in India. Every teardown also carries an honest caveat that it is an outside view.
- The Google Drive portfolio link now lives in the footer only, labelled "Portfolio"

## 9. Blog system

- 30 posts in `content/blog/`, scheduled Aug 6 – Nov 14 2026, ~2 per week
- **Scheduled publishing is automatic**: `src/lib/posts.ts` hides any post whose
  `publishedAt` is in the future — it 404s and stays out of the index until its date
- Keyword clusters: local intent (Faridabad / Delhi / Gurgaon), proof-led case studies,
  high-volume commercial (Meta vs Google, costs, Pixel/CAPI), funnels & automation, verticals
- Every post carries Article structured data and links internally to case studies / the audit tool
- **Never publish duplicate titles or near-duplicate posts** — it splits rankings

---

## 10. Status

### Done
- Full editorial redesign, dark + light themes, motion system
- All pages: home, about, case studies (3 detail pages), for colleges, ROI calculator,
  strategy call, blog, AI audit, refund policy
- Real logos, real branded case study PDFs as downloads, PDF-extracted proof galleries with lightbox
- 6 video testimonials (single-playback, named, with roles)
- Meta Pixel + Lead/Contact events
- 30 blog posts with auto-scheduling
- Favicon set from the real logo
- Mobile responsive pass

### Env vars (set in Vercel → Settings → Environment Variables)
`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` (legacy),
`NEXT_PUBLIC_GA_ID` (optional — GA4 renders nothing without it),
`NEXT_PUBLIC_CAL_LINK` (optional — falls back to the WhatsApp form without it)

### Open / next
- **Phase 1 (blocking):** full visual QA by Anurag — light mode on every page, phone check,
  one complete audit-tool run
- **Phase 2:** on-site "Our Work" gallery (needs 8–12 creative images), OG share image, custom 404
- **Phase 3:** Cal.com booking link, GA4 ID, client logo files, remaining testimonial names/roles
- **Phase 4:** sitemap.xml, robots.txt, LocalBusiness schema, WordPress URL redirects,
  video lazy-loading, Lighthouse 90+
- **Phase 5:** DNS cutover to Vercel, then **revoke the GitHub token**
- **Phase 6 (optional polish):** scroll-linked case study storytelling, second wave of case studies

---

*Last updated: commit following `033c6c4`.*
