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

## Design system — "THE INDEX"
Defined once in `app/globals.css` under `@theme`. See DESIGN_RATIONALE.md for the why.
Do not introduce raw hex in components.

- Surfaces: `paper` #EFECE5, `paper-2` (recessed), `ink` #1D2725 (type + the one inverse panel)
- Text: `ink` / `ink-80` (body) / `meta` (small labels)
- Accent: `vermilion` #D34F2D for large text only, `vermilion-ink` for anything small
- `stone` is DECORATIVE ONLY — it measures 1.9:1 on paper. Never use it for text.
- Fonts: Archivo (structure: masthead, labels, meta) + Newsreader (voice: statement,
  titles, quotes). `.display` and `.structural` set the two roles.
- Utilities: `.label`, `.italic-accent`, `.btn` / `.btn-primary` / `.btn-quiet`,
  `.rule-link`, `.surface-ink`, `.hairline`, `.tnum`

### Rules
- Animate `transform` / `opacity` / `clip-path` only. Never `transition-all`.
- Contrast: body + small text >= 4.5:1, large text >= 3:1. Check before shipping a colour.
- Every interactive element needs hover, `focus-visible` and active states.
- Touch targets >= 44px. Respect `prefers-reduced-motion` (`useReducedMotion()`).
- The public pages use type and rules, not icons. lucide-react stays only for the
  demo, the forms and /admin, where an icon is doing real work.
- Nothing on this site may assert an unverified fact. No invented metrics,
  testimonials, or scarcity. See the "What was removed" section of the rationale.
- Project images in `public/work/` are real captures. A project with no honest
  capture gets the typographic ink panel instead.

## Structure
```
app/
  page.tsx            the index: masthead, statement, four rows, image stage
  work/               editorial index + /work/[slug] case studies
  services/           four services, the offer, process, leak estimate
  about/  contact/    the person, and how to start
  system/             the interactive demo (strongest piece of evidence)
  admin/              Eddie's CMS (Supabase Auth)
  share/              private client testimonial capture
components/
  IndexHome           the homepage index + the hover image stage
  Chrome              header (hidden on the index) + footer
  Page                Wrap / Band / PageIntro / NextStep
  SystemDemo          scripted WhatsApp flow + rule-based free typing
  LeakCalculator      the visitor's own numbers, conservatively estimated
  ContactForm         save-first lead capture with WhatsApp fallback
lib/
  site.ts             copy, offer, index rows, seed content
  content.ts          one Supabase fetch with per-table seed fallback
  supabase.ts         env-only keys
public/work/          real WebP captures of the live projects
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
