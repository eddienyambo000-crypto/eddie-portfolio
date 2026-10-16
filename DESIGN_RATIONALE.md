# THE INDEX — design rationale

Eddie Nyambo's portfolio. Kigali, Rwanda.
Direction set 2026-10-16, replacing the dark "Operator" build.

---

## The problem with the previous version

The dark build worked as a sales page but read as a *product*, not as a person.
Its devices — a notification feed, a stat bar, a bottom dock, a command palette —
are the vocabulary of a SaaS dashboard. They are also the exact vocabulary a
generated template reaches for first. Worse, several of them were asserting
things nobody had verified: invented testimonials attributed to named real
people, a "12+ systems shipped" counter, and a "2 slots left this month" badge.

A portfolio's only real currency is evidence. Anything invented spends it.

## The direction

An independent studio's index page: Swiss editorial structure, an architecture
journal's restraint, and an engineer's filing instinct. Quiet, typographic,
confident. The work is the decoration.

**Precision. Independence. Originality. Authority. Restraint.**

### Three directions explored

1. **The Terminal** — monospace, rules, data-dense. Rejected: it flatters other
   engineers, not the Kigali business owner who is the actual buyer, and
   decorative terminal chrome is on the banned list for good reason.
2. **The Monograph** — full-bleed photography, minimal type. Rejected: it needs
   a library of great photography that does not exist yet. A direction that
   depends on assets you do not have is a direction that ships broken.
3. **The Index** — chosen. It is strongest where Eddie is actually strong: a
   small number of real, running systems, each worth a page. It degrades
   gracefully when a project has no usable image, and it scales as he ships more.

## Colour

| Role | Value | Use |
| --- | --- | --- |
| Paper | `#EFECE5` | the page |
| Ink | `#1D2725` | type, rules, inverse panels |
| Vermilion | `#D34F2D` | one accent per screen, never two |
| Stone | `#A9ADA1` | meta, captions, disabled |

Roughly 80% paper, 15% ink, 5% vermilion. The accent marks *where you are* —
the hovered index row, an italic word in a sentence, the primary action — and
is kept off everything else. Ink-on-paper is 11.5:1; vermilion-on-paper is
4.6:1 and so is used for text only at body size or larger, never for small
meta type.

## Typography

**Archivo** (grotesk) and **Newsreader** (editorial serif), both SIL OFL.
Neither is Inter, Geist, Poppins or Space Grotesk, and the pairing has real
tension: Archivo is square and industrial, Newsreader is warm with a true
italic.

- Archivo carries structure: the masthead, index numbers, labels, meta. Set
  uppercase with wide tracking at small sizes, very tight at large ones.
- Newsreader carries voice: the statement, the index row titles, pull quotes.
  Its italic is the accent, used on the one word that carries the sentence.

Large headings are set with explicit line breaks, not left to wrap where the
viewport happens to fall. That is the difference between typeset and generated.

## Composition

A 12-column grid with deliberately asymmetric placement. The homepage sits in
roughly one viewport: masthead, statement, four index rows, and an image stage.
Work alternates wide and narrow so the page has a pulse instead of a rhythm of
identical cards.

## The signature interaction

One idea, executed properly: **a single image stage**.

At rest it holds Eddie's portrait. Focusing or hovering an index row swaps in a
cropped capture of the relevant real project, revealed with an animated clip
rather than a fade, and returns to the portrait on leave. It gives the four
navigation rows something to *do*, keeps the face present by default, and uses
only real screenshots.

On touch there is no hover: the portrait simply stays and the rows are ordinary
links. Nothing is hidden behind an interaction that a phone cannot perform.
Under `prefers-reduced-motion` the swap becomes an instant cut.

## What was removed, and why

- **Invented testimonials** — quotes were attributed to real named clients that
  those clients never said. Removed. Testimonials now render only from the CMS,
  where `/share` captures them with explicit consent.
- **The stat bar** ("12+ systems shipped", "5 sec", "24/7") — unverifiable.
- **"2 slots left this month"** — manufactured scarcity.
- **The notification feed** — a fake activity stream.
- **The marquee** — an infinite loop of adjectives.
- **The bottom dock and ⌘K palette** — app furniture on a six-page site.
- **The money-leak calculator** — kept, but moved off the homepage to
  `/services`, where someone is actually pricing work. Conservative rates, and
  labelled an estimate.

## What was kept

The live interactive demo at `/system` is the single best piece of evidence on
the site, so it stays — reachable from Work and Services rather than competing
with the four homepage choices. The contact form still saves before it hands
off to WhatsApp. Every project link still points at a running system.

## Engineering

Tokens live in `app/globals.css` under `@theme`. Element defaults sit in
`@layer base` and component classes in `@layer components`, so Tailwind
utilities always win — this was a real bug in the previous build, where an
unlayered `*` rule silently defeated every `hover:border-*` on the site.

Images are real captures of live projects, resized and served as WebP
(6.6MB of PNG → 400KB). A project with no usable capture gets a typographic
treatment instead of a fabricated one.
