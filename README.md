# yashova.com

Performance marketing agency site for [Yashova](https://yashova.com) — Faridabad, Delhi NCR.

Next.js 16 · TypeScript · Tailwind v4 · deployed on Vercel.

## Working on this project

**Read [`PROJECT_INSTRUCTIONS.md`](./PROJECT_INSTRUCTIONS.md) first.** It contains the design
system, content sources, known gotchas, and the standard workflow. It is the single source
of truth for this project and should be updated whenever anything changes.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npx tsc --noEmit     # typecheck
npx eslint src       # lint
```

## Blog

Posts are markdown files in `content/blog/`. A post with a `publishedAt` date in the
future is hidden automatically and goes live on its own date — no action needed.
