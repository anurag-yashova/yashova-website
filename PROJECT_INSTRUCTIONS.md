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
| Blog | Markdown files in `content/blog/` (NOT a CMS — Sanity was removed) |
| Meta Pixel | `2060709664860383` (browser only — server-side CAPI was removed, see below) |
| Lead handling | Client-side FormSubmit direct to both inboxes. No API keys, no server route, nothing to configure. |
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

### Case study pages use the same document language
`/case-studies/[slug]` is a **case file**: numbered file header with the index numeral
bleeding off the right edge, particulars set as a bordered document header, headline
figures in a hairline grid, then the full metrics table rendered through `CaseLedger.tsx`
— the same printing statement as the hero, with dotted leaders, a signature and a
Verified stamp. Proof screenshots are "Exhibits". Keep this language when adding pages.

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
Buyernest · TheAudioLearning · CvolvePro · **Knowledge Prism** (was "Fundraising") ·
**Bebrainteaser** (was "Life Coach") · Student NGO

Each card shows the company name and the **engagement type only — never a person's name**.
Anurag was explicit about this. Roles in use:
Buyernest = B2B lead generation, automation & nurture ·
Knowledge Prism = end-to-end marketing ·
Bebrainteaser = B2C funnels, WhatsApp marketing ·
TheAudioLearning = webinar funnel, admissions ·
CvolvePro = LinkedIn growth marketing · Student NGO = donor acquisition

**Client logos** live in `public/images/clients/` (greyscale, colour on hover in the trust
strip): theaudiolearning, cvolvepro, helping-hands, buyernest, knowledge-prism, investmate,
tradebazarr, digital-riches, merhba-boutique. Bebrainteaser and Digiraag are wordmarks
pending logo files. Earthling Trust was removed at Anurag's request.

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


## 11. Demographic currency localisation

Every ₹ figure on the site can show a secondary, localised conversion beside it —
"₹30.1L ≈ AED 132,440" — for visitors outside India. Zero configuration: no API key,
no signup, no Vercel env var.

**Trust rule, non-negotiable:** the original ₹ figure is ALWAYS the primary, verified
number. A conversion is only ever appended beside it as a small "≈" note — never a
replacement. This is what keeps the site's "every figure traces to a verified source"
claim (see the self-audit teardown) true even with localisation on.

### How detection works
- `middleware.ts` reads Vercel's automatic `x-vercel-ip-country` header (no geo-IP
  service, nothing to configure — this header exists on every Vercel request) and sets
  a `ccy` cookie **only if one doesn't already exist**. India → `INR` (no notes shown
  anywhere). No header (local dev, or Vercel ever stops sending it) → no cookie is set,
  which safely defaults everything to INR.
- The nav currency switcher (`CurrencySwitcher.tsx`) lets a visitor override the guess
  manually (VPN, travelling, corporate network). Their choice is written to the same
  cookie and is never overwritten by geo-detection again.
- Supported currencies: INR, USD, GBP, AED, AUD, NGN, CAD, SGD, EUR — see
  `COUNTRY_TO_CCY` in `src/lib/currency.ts` to add more.

### How conversion works
- Rates come from `https://open.er-api.com/v6/latest/INR` — free, no key, 161
  currencies, updated daily. Cached 12h via Next's fetch cache
  (`getRates()` in `currency-server.ts`). If the API is ever unreachable,
  `FALLBACK_RATES` (a static approximate table) keeps the feature working rather than
  breaking the page.
- `buildNote(raw, ccy, rates)` parses a ₹-prefixed display string ("₹1.02Cr+", "₹30.1L",
  "₹85.48") and returns a formatted note, or `null` if there's nothing to convert
  (INR visitor, or the string isn't money — percentages and "5.5X" multipliers are
  correctly left alone). Ranges like "₹80–₹100" are deliberately skipped rather than
  converting only the first number and mislabelling it.
- `buildNoteForBareAmount(raw, ccy, rates)` is for values that ARE money but are shown
  without a ₹ prefix because the surrounding UI already implies it — currently only
  `LedgerHero.tsx`'s rows, which sit under an "Amount (₹)" column header. Each money row
  in that component is explicitly tagged `money: true` in the data; **do not use this
  helper to guess** — only ever apply it to a field you've confirmed is currency.
- `localizeInrInHtml(html, ccy, rates)` runs server-side over already-rendered article
  HTML (blog posts, teardowns) and appends a note after every ₹ figure it finds. This is
  how all 30+ articles get localisation without editing a single one by hand.

### ⚠️ CRITICAL: module split — do not recombine
`src/lib/currency.ts` is **pure logic only** (constants, parsing, formatting) and is
safe to import from `middleware.ts` (Edge Runtime), Client Components, AND Server
Components. `src/lib/currency-server.ts` holds `getCurrency()` and `getRates()`, which
use `next/headers`/`fetch` and **must only be imported from Server Components**
(page.tsx files). This split exists because of a real build failure: `next/headers`
transitively broke the Edge Middleware bundle and every client component that touched
the file. If you add a new currency helper, put pure functions in `currency.ts` and
anything touching cookies/fetch in `currency-server.ts` — never merge them back into
one file.

### Wired into
Homepage hero stats, `LedgerHero.tsx` (props: `ccy`, `rates`), `BeforeAfter.tsx` (props:
`ccy`, `rates`), case study preview cards, the full case study pages (headline stats +
`CaseLedger.tsx`, via a `note` field added per metric), every blog post body, every
teardown body + its `spend` field. **Not** wired: ROI Calculator (it's a user-input
tool modelling the visitor's own numbers, not a verified claim — converting it would be
misleading rather than helpful) and teardown `findings[].detail` text (rendered as
plain React text, not HTML, so the injected `<span>` note wouldn't work without changing
that render path — left as a known gap).

## 8c. Imagery policy

**No stock photography, ever.** It is the fastest way back to the AI-template look Anurag
rejected repeatedly. The site currently contains zero stock imagery and that is deliberate.

Engagement comes from data, not decoration:
- **Per-post OG cards** are generated at build time via `opengraph-image.tsx` in both
  `blog/[slug]/` and `teardowns/[slug]/`. Teardown cards render the severity chips.
- **Exhibits**: proof-led blog posts carry real dashboard screenshots from the case study
  PDFs, declared in frontmatter as `exhibits: [{src, caption}]` and rendered through the
  same lightbox as case studies, captioned "Fig. 1 — ...".
- **Inline data visuals**: articles place charts with a `[[figure:key]]` marker in the
  markdown. Keys are defined in `src/lib/figures.ts` (delta bars, ranked bars, funnels,
  big stats) and rendered by `PostBody.tsx`, which splits the HTML on the marker.
  Add a figure by defining the key, then dropping the marker in the post. Every number
  in `figures.ts` must trace to a verified source.
- **Never screenshot the subject of a teardown** — it de-anonymises the brand. Reconstruct
  as a diagram instead.

## 9. Blog system

- 30 posts in `content/blog/`, scheduled Aug 6 – Nov 14 2026, ~2 per week
- **Scheduled publishing is automatic — but ONLY because of ISR.** `src/lib/posts.ts`
  hides any post whose `publishedAt` is in the future. That filter runs when the page is
  generated, so `/blog`, `/blog/[slug]`, `/teardowns`, `/teardowns/[slug]` and
  `sitemap.ts` all export `revalidate = 3600`. **Never remove those** — without ISR the
  date filter is frozen at build time and nothing new ever appears. This was a real bug,
  shipped and caught: 29 posts and 8 teardowns were silently unreachable.
- A **Vercel Cron job** (`vercel.json` → `/api/cron/revalidate`) runs daily at 01:00 UTC
  (06:30 IST) and force-revalidates `/blog`, `/teardowns`, the sitemap and every live
  detail page. This guarantees a post dated today appears in the morning even with zero
  traffic. Optional `CRON_SECRET` env var allows manual triggering.
- Sanity was removed entirely (`src/lib/sanity.ts` deleted, `@sanity/client` uninstalled).
  The `NEXT_PUBLIC_SANITY_*` env vars in Vercel are dead and can be deleted.
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

### Lead form and tracking

**Deliberately the simplest possible setup — Anurag asked for zero configuration.**
The strategy-call form (`ContactForm.tsx`) and the AI audit tool
(`public/audit/growth-audit.js`) each fire a direct browser `fetch()` to
`https://formsubmit.co/ajax/<email>` for BOTH `anurag@yashova.com` and
`akhil.sharma323@gmail.com`, in parallel. No API key, no account, no Vercel env var,
no server route — there is no `/api/lead` route, it was deliberately removed.

**The one unavoidable step, done once per address:** FormSubmit emails a confirmation
link the very first time it sends to a new address, and delivers nothing until that
link is clicked. This is FormSubmit's own spam gate, not something we can code around
without adding back an account-based service. If leads ever stop arriving, this
confirmation is the first thing to check — not the code.

A history worth knowing: this route briefly went through a server-side proxy with
Brevo + FormSubmit + CAPI mirroring, all behind Vercel env vars. It was more robust
but added exactly the setup burden Anurag explicitly rejected ("don't make things
complicated, I won't touch anything"). It was reverted in favour of this version.
**Do not reintroduce server-side email routing or ask for new API keys/env vars
without being asked** — that goes against a standing instruction.

Both forms still fire the Meta Pixel client-side (`Schedule` for the strategy call,
`Lead` for the audit) — that part is unaffected and needs no setup either, since the
Pixel ID is hardcoded.

### Case study pages use the same document language
`/case-studies/[slug]` is a **case file**: numbered file header with the index numeral
bleeding off the right edge, particulars set as a bordered document header, headline
figures in a hairline grid, then the full metrics table rendered through `CaseLedger.tsx`
— the same printing statement as the hero, with dotted leaders, a signature and a
Verified stamp. Proof screenshots are "Exhibits". Keep this language when adding pages.

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
Buyernest · TheAudioLearning · CvolvePro · **Knowledge Prism** (was "Fundraising") ·
**Bebrainteaser** (was "Life Coach") · Student NGO

Each card shows the company name and the **engagement type only — never a person's name**.
Anurag was explicit about this. Roles in use:
Buyernest = B2B lead generation, automation & nurture ·
Knowledge Prism = end-to-end marketing ·
Bebrainteaser = B2C funnels, WhatsApp marketing ·
TheAudioLearning = webinar funnel, admissions ·
CvolvePro = LinkedIn growth marketing · Student NGO = donor acquisition

**Client logos** live in `public/images/clients/` (greyscale, colour on hover in the trust
strip): theaudiolearning, cvolvepro, helping-hands, buyernest, knowledge-prism, investmate,
tradebazarr, digital-riches, merhba-boutique. Bebrainteaser and Digiraag are wordmarks
pending logo files. Earthling Trust was removed at Anurag's request.

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


## 11. Demographic currency localisation

Every ₹ figure on the site can show a secondary, localised conversion beside it —
"₹30.1L ≈ AED 132,440" — for visitors outside India. Zero configuration: no API key,
no signup, no Vercel env var.

**Trust rule, non-negotiable:** the original ₹ figure is ALWAYS the primary, verified
number. A conversion is only ever appended beside it as a small "≈" note — never a
replacement. This is what keeps the site's "every figure traces to a verified source"
claim (see the self-audit teardown) true even with localisation on.

### How detection works
- `middleware.ts` reads Vercel's automatic `x-vercel-ip-country` header (no geo-IP
  service, nothing to configure — this header exists on every Vercel request) and sets
  a `ccy` cookie **only if one doesn't already exist**. India → `INR` (no notes shown
  anywhere). No header (local dev, or Vercel ever stops sending it) → no cookie is set,
  which safely defaults everything to INR.
- The nav currency switcher (`CurrencySwitcher.tsx`) lets a visitor override the guess
  manually (VPN, travelling, corporate network). Their choice is written to the same
  cookie and is never overwritten by geo-detection again.
- Supported currencies: INR, USD, GBP, AED, AUD, NGN, CAD, SGD, EUR — see
  `COUNTRY_TO_CCY` in `src/lib/currency.ts` to add more.

### How conversion works
- Rates come from `https://open.er-api.com/v6/latest/INR` — free, no key, 161
  currencies, updated daily. Cached 12h via Next's fetch cache
  (`getRates()` in `currency-server.ts`). If the API is ever unreachable,
  `FALLBACK_RATES` (a static approximate table) keeps the feature working rather than
  breaking the page.
- `buildNote(raw, ccy, rates)` parses a ₹-prefixed display string ("₹1.02Cr+", "₹30.1L",
  "₹85.48") and returns a formatted note, or `null` if there's nothing to convert
  (INR visitor, or the string isn't money — percentages and "5.5X" multipliers are
  correctly left alone). Ranges like "₹80–₹100" are deliberately skipped rather than
  converting only the first number and mislabelling it.
- `buildNoteForBareAmount(raw, ccy, rates)` is for values that ARE money but are shown
  without a ₹ prefix because the surrounding UI already implies it — currently only
  `LedgerHero.tsx`'s rows, which sit under an "Amount (₹)" column header. Each money row
  in that component is explicitly tagged `money: true` in the data; **do not use this
  helper to guess** — only ever apply it to a field you've confirmed is currency.
- `localizeInrInHtml(html, ccy, rates)` runs server-side over already-rendered article
  HTML (blog posts, teardowns) and appends a note after every ₹ figure it finds. This is
  how all 30+ articles get localisation without editing a single one by hand.

### ⚠️ CRITICAL: module split — do not recombine
`src/lib/currency.ts` is **pure logic only** (constants, parsing, formatting) and is
safe to import from `middleware.ts` (Edge Runtime), Client Components, AND Server
Components. `src/lib/currency-server.ts` holds `getCurrency()` and `getRates()`, which
use `next/headers`/`fetch` and **must only be imported from Server Components**
(page.tsx files). This split exists because of a real build failure: `next/headers`
transitively broke the Edge Middleware bundle and every client component that touched
the file. If you add a new currency helper, put pure functions in `currency.ts` and
anything touching cookies/fetch in `currency-server.ts` — never merge them back into
one file.

### Wired into
Homepage hero stats, `LedgerHero.tsx` (props: `ccy`, `rates`), `BeforeAfter.tsx` (props:
`ccy`, `rates`), case study preview cards, the full case study pages (headline stats +
`CaseLedger.tsx`, via a `note` field added per metric), every blog post body, every
teardown body + its `spend` field. **Not** wired: ROI Calculator (it's a user-input
tool modelling the visitor's own numbers, not a verified claim — converting it would be
misleading rather than helpful) and teardown `findings[].detail` text (rendered as
plain React text, not HTML, so the injected `<span>` note wouldn't work without changing
that render path — left as a known gap).

## 8c. Imagery policy

**No stock photography, ever.** It is the fastest way back to the AI-template look Anurag
rejected repeatedly. The site currently contains zero stock imagery and that is deliberate.

Engagement comes from data, not decoration:
- **Per-post OG cards** are generated at build time via `opengraph-image.tsx` in both
  `blog/[slug]/` and `teardowns/[slug]/`. Teardown cards render the severity chips.
- **Exhibits**: proof-led blog posts carry real dashboard screenshots from the case study
  PDFs, declared in frontmatter as `exhibits: [{src, caption}]` and rendered through the
  same lightbox as case studies, captioned "Fig. 1 — ...".
- **Inline data visuals**: articles place charts with a `[[figure:key]]` marker in the
  markdown. Keys are defined in `src/lib/figures.ts` (delta bars, ranked bars, funnels,
  big stats) and rendered by `PostBody.tsx`, which splits the HTML on the marker.
  Add a figure by defining the key, then dropping the marker in the post. Every number
  in `figures.ts` must trace to a verified source.
- **Never screenshot the subject of a teardown** — it de-anonymises the brand. Reconstruct
  as a diagram instead.

## 9. Blog system

- 30 posts in `content/blog/`, scheduled Aug 6 – Nov 14 2026, ~2 per week
- **Scheduled publishing is automatic — but ONLY because of ISR.** `src/lib/posts.ts`
  hides any post whose `publishedAt` is in the future. That filter runs when the page is
  generated, so `/blog`, `/blog/[slug]`, `/teardowns`, `/teardowns/[slug]` and
  `sitemap.ts` all export `revalidate = 3600`. **Never remove those** — without ISR the
  date filter is frozen at build time and nothing new ever appears. This was a real bug,
  shipped and caught: 29 posts and 8 teardowns were silently unreachable.
- A **Vercel Cron job** (`vercel.json` → `/api/cron/revalidate`) runs daily at 01:00 UTC
  (06:30 IST) and force-revalidates `/blog`, `/teardowns`, the sitemap and every live
  detail page. This guarantees a post dated today appears in the morning even with zero
  traffic. Optional `CRON_SECRET` env var allows manual triggering.
- Sanity was removed entirely (`src/lib/sanity.ts` deleted, `@sanity/client` uninstalled).
  The `NEXT_PUBLIC_SANITY_*` env vars in Vercel are dead and can be deleted.
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

### Lead form and tracking
**Email delivery is dual-channel**, because FormSubmit's `/ajax/` endpoint is designed
for direct browser submissions and silently under-delivers when called server-to-server
(no browser Referer, and/or the recipient never clicked FormSubmit's one-time
confirmation link) — this caused a real incident where zero lead emails arrived for
days with no visible error. Brevo's transactional REST API (`BREVO_API_KEY`) is now
primary and returns real HTTP errors; FormSubmit still runs as a backup. The response
JSON reports `brevo`, `formsubmit` and `capi` status individually plus a combined
`emailDelivered` boolean — check Vercel function logs (`console.error` lines prefixed
`[lead]`) if delivery ever silently fails again, do not assume success from `ok: true`.
`LEAD_FROM_EMAIL` must be a sender verified in Brevo → Senders, Domains & Dedicated IPs,
or Brevo will reject the send.

**The AI audit tool also posts through `/api/lead`**, so audit requests and strategy-call
requests arrive by the same route and both fire CAPI. The audit's old direct
`formsubmit.co` fire-and-forget call was replaced.

The strategy-call form posts to `/api/lead`, which does two things: forwards the lead to
FormSubmit for email delivery (no account needed — but **each recipient address must
click a one-time confirmation link** FormSubmit emails on the first submission, or
nothing is delivered), and mirrors a `Lead` event to Meta's Conversions API.

**Two distinct events, deliberately.** A strategy-call request fires **`Schedule`**
(`content_name: "Strategy Call Request"`); an AI audit submission fires **`Lead`**
(`content_name: "AI Growth Audit"`). Both carry `lead_type` in custom_data and both
arrive by email with a subject prefixed `STRATEGY CALL —` or `AUDIT —`. Do not merge
them back into one event: the audit is far easier to get, so a single blended "Lead"
makes Meta optimise toward curiosity instead of buying intent.

**Deduplication is the critical detail.** The browser generates one `eventId` per
submission, passes it to `fbq` as the **fourth argument** (`{ eventID }`, NOT inside
params — a common and silent mistake), and sends the same id to the server, which
includes it as `event_id` in the CAPI payload. Meta then counts one lead, not two.

CAPI also forwards hashed email/phone/name, client IP, user agent, and the `_fbp`/`_fbc`
cookies — those cookies materially improve match quality. A hidden honeypot field blocks
bots. Never log or commit `META_CAPI_TOKEN`.

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

---

## 12. Standing rules from Anurag (added Oct 2026)

- Never invent numbers, clients, reviews or logos. If a fact is missing, ask him.
- One task at a time. After each task, say what changed and how he can check it, in simple words.
- Keep the design and the tone: "No hype. Just revenue."
- Facts he has supplied: hero ad spend is **₹4Cr+** (was ₹2.5Cr+); founder is Anurag Sharma, **8 years in performance marketing**; new clients in the logo strip: **Chote News** and **Angels for Animals** (logo files in `public/images/clients/`).
- Founder photo: `public/images/anurag-founder.webp` (cutout baked onto a studio-black backdrop so it looks right in both themes). Component: `src/components/FounderBlock.tsx`, used on the homepage before the final CTA.
- Open items waiting on him: real brand count to replace "150+", legal business details for Privacy/Terms/footer, About page story and numbers, a Cal.com/Calendly link for the booking CTA, and what to include in the UAE/UK market pages.

### Added Oct 2026: SEO, trust, country behaviour, speed

- **SEO**: every page gets its own canonical, title, description and Open Graph title through `pageMeta()` in `src/lib/seo.ts`. NEVER put `alternates.canonical` in `layout.tsx` (children inherit it and every page ends up pointing at the homepage). Structured data: Organization/WebSite in `SiteSchema`, Article + Breadcrumb on blog and teardown pages, WebPage + Breadcrumb on case studies (`JsonLd` component). No FAQ schema yet: there is no real FAQ content on the site.
- **Old WordPress**: all 13 old page slugs are covered (same slug or redirect in `next.config.ts`), plus old sitemap, feed, category, tag and author URLs. The old WordPress case-studies page (850+ leads, ₹42 CPL, 4.2x ROAS) is NOT in this repo; if it still appears, the cause is DNS/CDN (old hosting still answering), not code.
- **Teardown ad spend** is always shown as "Est. ad spend ..." via `spendLabel()` in `src/lib/teardowns.ts`.
- **Privacy Policy and Terms** pages exist (`/privacy-policy`, `/terms`, shared `LegalDoc` layout) and are linked in the footer. They describe only what the site actually does.
- **Country behaviour** (`middleware.ts`): sets `ccy` (India INR, US USD, UK GBP, UAE AED, Australia AUD, everywhere else USD; the nav switcher always wins) and `ctry` (country code). `PrimaryCta` shows WhatsApp for India and the strategy-call button elsewhere. The strategy-call page shows the booking calendar for non-India visitors once a link is pasted into `src/lib/booking.ts` (`BOOKING_URL`). `CcyFootnote` shows "approx., billed in INR" whenever figures are converted.
- **Speed**: testimonial videos are not requested until Play is pressed; each card shows a ~15 KB poster from `public/videos/posters/` (name must match the video file). If a video is replaced, regenerate its poster with ffmpeg. The page transition is slide-only (no fade) so text is never invisible at first paint.

### Added Oct 2026 (round 2)

- **Booking link**: `BOOKING_URL` in `src/lib/booking.ts` is set to the Calendly link. Non-India visitors see it embedded on `/strategy-call`; India sees WhatsApp first.
- **Number rules resolved** (use these, do not reintroduce the old figures): the ₹80–₹100 to ₹25–₹35 claim and the "2.7x conversions" claim were removed (no source). The 4.1% CTR was removed (12.4M impressions and 186,000 clicks do not give 4.1%). ₹126 is the 120-day average cost per lead; ₹11.40 and ₹41.16 are single webinar campaigns (12 Jan and 20 Dec). 5.5X is the ROAS of the whole 120-day programme, not a best campaign. Every before/after row says what it measures.
- **About page** is written from verified facts only: in performance marketing since 2018, started as a freelancer, ₹4Cr+ ad spend, 5.5X programme, 51% lower cost per donation. Footer carries the business name and address.
- **Market pages**: `/performance-marketing-agency-for-coaches-uae` and `-uk`, built from one template (`MarketPage`). They use only the real TheAudioLearning case study and say plainly that it ran for an India audience. Never add UAE or UK results unless Anurag provides real ones.
- Testimonial captions on the homepage are written summaries; the TheAudioLearning and CvolvePro captions now use only verified figures. Other captions (Buyernest 120 to 340+, Knowledge Prism 200 to 600+, Bebrainteaser nearly 60%) have no source in the repo; check them against the videos.
