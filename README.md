# eddie-portfolio

The portfolio of Eddie Nyambo, a full-stack developer and AI engineer in Kigali.
Live at <https://eddie-portfolio-gamma.vercel.app>.

## Stack

Next.js 16 (App Router, every page statically generated), React 19, TypeScript in
strict mode, Tailwind CSS 4. There are no other runtime dependencies: no CMS, no
database, no analytics script, no animation library.

```bash
npm install
npm run dev        # http://localhost:3001
npm run typecheck
npm run build
```

Pushing to `master` deploys to Vercel.

## Where things live

| Path | What it is |
| --- | --- |
| `lib/projects.ts` | Every project, its copy and its facts. Edit here to add or change work. |
| `lib/story.ts` | The timeline, the seven roles and the four principles. |
| `lib/site.ts` | Name, contact details, the roles on the flip board. |
| `public/work/` | Screenshots of each live site: `<slug>-desktop.webp` (1600×1000) and `<slug>-phone.webp` (600×1298). |
| `app/globals.css` | Design tokens and every component style. |

### Adding a project

1. Add an entry to `PROJECTS` in `lib/projects.ts`. Every fact must be checkable.
2. Capture the live site at 1440×900 and 390×844 and save the two WebP files above.
3. Its case study at `/work/<slug>` is generated automatically.

## Decisions worth knowing

- **Nothing on the site is invented.** Numbers come from the projects themselves; dates
  come from git history. If it can't be checked, it isn't on the page.
- **Motion only where it means something:** the split-flap board, the walk into a
  project, the story counter. Everything respects `prefers-reduced-motion`.
- **The contact form has no backend.** It writes the message and hands it to WhatsApp or
  the visitor's email app, so there is nothing to fail and nothing stored.
- **Reveal-on-scroll never hides content that's already on screen,** and nothing is
  hidden at all if JavaScript doesn't run.
- **Stacked project cards only stick when they fit the screen whole.** On phones and
  short windows they scroll normally, so no content can end up trapped under the next card.
