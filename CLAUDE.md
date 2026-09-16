# CLAUDE.md — Eddie Nyambo portfolio

Eddie's **personal** site (separate from ai7optivaro.com, which belongs to his boss).
It exists to win him direct clients as an independent automation engineer.

## Stack
Next.js 15 App Router · TypeScript · Tailwind v4 (`@theme` in `app/globals.css`) ·
Framer Motion · lucide-react · Supabase (content + leads) · Vercel.

- Dev: `npm run dev` → http://localhost:3001
- Build: `npm run build`
- Deploy: push to `master`, Vercel auto-deploys. Keep root `vercel.json` (`framework: nextjs`)
  or the project reverts to a static build and 404s.

## Design system — "OPERATOR"
Defined once in `app/globals.css` under `@theme`. Do not introduce raw hex in components.

- Surfaces: `ink` → `ink-2` → `ink-3` → `ink-4` (warm blacks, never blue-grey)
- Text: `ivory` / `muted` / `faint`
- Signal: `amber` (primary), `amber-deep`, `live` (green), `alert` (red)
- One light inversion surface: `.surface-paper` (used for testimonials only)
- Fonts: Instrument Serif (display) · Inter (UI) · JetBrains Mono (labels/numbers)
- Utilities: `.panel`, `.panel-raised`, `.edge-top`, `.eyebrow`, `.btn`, `.dot-live`, `.tnum`

### Rules
- Animate `transform` and `opacity` only. Never `transition-all`.
- Every interactive element needs hover, `focus-visible` and active states.
- Touch targets ≥ 44px. The mobile dock is capped at 5 items.
- Numbers that change in place get `.tnum` so the layout does not jitter.
- Icons come from lucide-react. No emoji as icons, ever.
- Respect `prefers-reduced-motion` — `useReducedMotion()` in client components.

## Structure
```
app/
  page.tsx            home: Launcher + the full conversion spine
  system/             the interactive demo (the strongest sales asset)
  work/               grid + /work/[slug] case studies
  services/           offer + pricing + process
  about/  contact/    trust + lead capture
  admin/              Eddie's CMS (Supabase Auth)
  share/              private client testimonial capture
components/
  Launcher            the "choose a door" home screen
  Shell               top rail + mobile dock + ⌘K command palette
  SystemDemo          scripted WhatsApp flow + rule-based free typing
  LeakCalculator      turns the visitor's numbers into money lost
  sections.tsx        server-rendered page sections
lib/
  site.ts             all copy, offer, destinations, seed content
  content.ts          one Supabase fetch with seed fallback
  supabase.ts         env-only keys
```

## Content
Live content is in Supabase `pf_*` tables, edited at `/admin`.
`lib/site.ts` holds the seed fallback — the site renders fully even with no DB.
`getContent()` falls back per-table, so a half-filled CMS never yields a half-empty page.

`hero_h1` uses a `|` to split the headline: everything after it renders amber italic.

## ⚠️ Keys
Supabase keys are **env-only** (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
Never hardcode them again — the old `eyJ…` anon key was hardcoded here and Supabase disabled
it on 2026-08-02, which silently killed the CMS for weeks. Use the `sb_publishable_` key.

## Hard rules
- Do not push to GitHub until Eddie says so.
- Test on localhost:3001 before any push.
- Check 375px width as well as desktop — most of his traffic is phones.
