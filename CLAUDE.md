# CLAUDE.md: eddie-portfolio (v5)

Eddie Nyambo's personal portfolio. Next.js 16 + React 19 + TypeScript (strict) + Tailwind 4.
Every page is static. No CMS, no database, no analytics script, no animation library.
Live: https://eddie-portfolio-gamma.vercel.app. Pushing `master` deploys to Vercel.

## Non-negotiables

- **Nothing invented.** Every number, date and claim must be checkable on the live project or
  in its git history. No testimonials, client counts or "slots left" unless Eddie supplies them.
- **No "AI-looking" design.** No gradients-on-everything, glows, glassmorphism, emoji, sparkle
  icons, purple, or generic SaaS sections. The look is printed matter: cloud paper, burgundy ink,
  mint panels, a split-flap board.
- **Phones first.** Check 320, 360 and 390 before desktop. No horizontal scroll, tap targets
  at least 44px, the face must show on the first screen at 360×740.
- **Only StepIn and Hotel Eza are excluded** from the work list (Eddie's call, 2026-11-17).
- Use they/them or "I" in copy; the site speaks in Eddie's first person.

## Brand (from Eddie's "COMBO 04" card, plus cloud white)

| Token | Hex | Use |
| --- | --- | --- |
| cloud | #F7F5F0 | page background |
| cloud-2 / line | #EFEBE3 / #E2DCD2 | raised surfaces, rules |
| ink / ink-2 | #1E1517 / #5E5254 | text |
| burgundy | #6D1A2A | primary, buttons, flip board |
| burgundy-deep / -ink | #561422 / #2B0A12 | dark sections, footer |
| mint | #BDE6D1 | panels behind people and screenshots; text ON burgundy only |
| rose | #D9B7BE | muted text on dark |

Mint is never text on cloud (fails contrast). Fonts are self-hosted in `app/fonts/`:
Schibsted Grotesk (everything), Anton (flip board, story counter, footer name), IBM Plex Mono
500 (small labels).

## Where things live

- `lib/projects.ts`: projects and their case-study copy. `lib/story.ts`: timeline, the seven
  roles, principles. `lib/site.ts`: name, contacts, flip-board roles.
- `public/work/<slug>-desktop.webp` (1600×1000) and `<slug>-phone.webp` (600×1298).
- `app/globals.css`: tokens (`@theme`) and all component styles (`@layer components`).
- Signature pieces: `FlipBoard` (stable DOM, Web Animations API, so it is never a late LCP),
  `Walk` (screenshot grows into the case page), `StoryTrack` (rewind counter), `Reveal`
  (IntersectionObserver plus a scroll sweep so fast jumps never leave content hidden).

## Building (OneDrive gotcha)

`next build` inside OneDrive dies with `UNKNOWN -4094`. Mirror the source to a local folder
(`robocopy <repo> C:\Users\hi\portfolio-v5 /MIR /XD .next .git node_modules`), run
`npm install` there, then `node node_modules\next\dist\bin\next build` and `next start -p 3001`.
Copy `package-lock.json` back if dependencies change.

## Motion rules

Animate `transform` and `opacity` only. Everything honours `prefers-reduced-motion`. Sticky
stacked project cards only engage at `min-width: 900px and min-height: 700px`.
