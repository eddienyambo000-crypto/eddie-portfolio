import Image from "next/image";
import Link from "next/link";
import { FlipBoard } from "@/components/FlipBoard";
import { KigaliClock } from "@/components/KigaliClock";
import { StoryTrack } from "@/components/StoryTrack";
import { WalkLink } from "@/components/Walk";
import { ArrowRight, ArrowUpRight, Duo, Phone } from "@/components/ui";
import { PROJECTS, SMALLER, getProject, shot } from "@/lib/projects";
import { CHAPTERS, HATS, PRINCIPLES } from "@/lib/story";
import { NAME, ROLES, SINCE } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <Work />
      <WhatIDo />
      <Story />
      <Principles />
    </>
  );
}

/* ─────────────────────────────── hero ─────────────────────────────── */

function Hero() {
  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero__grid">
        <div>
          <p className="label hero__eyebrow enter-fade" style={{ ["--d" as string]: "60ms" }}>
            <span className="dot" aria-hidden="true" />
            Independent · Kigali, Rwanda
          </p>
          <h1 className="hero__h1 enter" id="hero-title" style={{ ["--d" as string]: "120ms" }}>
            Hi, I&apos;m Eddie.
            <span className="soft">Some days I&apos;m the</span>
            <span className="sr-only">{ROLES.join(", ")}.</span>
          </h1>
          <div className="flip-wrap enter" style={{ ["--d" as string]: "200ms" }}>
            <FlipBoard words={ROLES} />
          </div>
          <p className="hero__sub enter-fade" style={{ ["--d" as string]: "360ms" }}>
            I design, build and run software for businesses in Kigali, from online shops to a
            livestock marketplace. You talk to the person doing the work.
          </p>
          <div className="hero__ctas enter-fade" style={{ ["--d" as string]: "460ms" }}>
            <Link className="btn btn-primary" href="/contact">
              Start a project
              <ArrowRight />
            </Link>
            <Link className="btn btn-ghost" href="/#work">
              See the work
            </Link>
          </div>
        </div>

        <figure className="portrait enter-fade" style={{ ["--d" as string]: "160ms" }}>
          <div className="portrait__panel" aria-hidden="true" />
          <Image
            src="/eddie/portrait.webp"
            width={607}
            height={520}
            priority
            quality={90}
            sizes="(min-width: 1024px) 34rem, (min-width: 640px) 34rem, 100vw"
            alt={`${NAME}, in a striped white shirt`}
          />
          <figcaption className="portrait__tag">
            <span className="dot" aria-hidden="true" />
            Taking on new work
          </figcaption>
        </figure>
      </div>

      <div className="hero__bar label">
        <KigaliClock variant="plain" />
        <span className="mid">Remote, worldwide</span>
        <a href="#work" className="uline">
          Scroll to the work
        </a>
      </div>
    </section>
  );
}

function ProofStrip() {
  return (
    <nav className="proof" aria-label="Projects live in production">
      <div className="wrap proof__in">
        <span className="label">Live in production</span>
        {PROJECTS.map((p) => (
          <Link key={p.slug} href={`/work/${p.slug}`} className="uline">
            {p.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

/* ─────────────────────────────── work ─────────────────────────────── */

function Work() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="wrap">
        <div data-reveal>
          <p className="label">01 · Work</p>
          <h2 className="h2 mt-4 max-w-[16ch]" id="work-title">
            Six things I built that are running right now.
          </h2>
          <p className="lead mt-5">
            Shops, a marketplace, a guest house, a support company and an agency. Each one is live:
            open it, use it, then read how it was built.
          </p>
        </div>

        <ol className="pcards">
          {PROJECTS.map((p, i) => (
            <li
              key={p.slug}
              className={`pcard pcard--${p.tone}${p.tone === "burgundy" ? " on-dark" : ""}`}
              style={{ ["--i" as string]: i }}
              data-walk
            >
              <div className="pcard__text">
                <p className="label">
                  {String(i + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")} · {p.kind}
                </p>
                <h3 className="pcard__name">{p.name}</h3>
                <p className="pcard__summary">{p.summary}</p>
                <ul className="chips" aria-label="What it needed">
                  {p.hats.map((h) => (
                    <li key={h} className="chip">
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="pcard__actions">
                  <WalkLink
                    href={`/work/${p.slug}`}
                    tone={p.tone}
                    desktop={shot(p.slug, "desktop").src}
                    phone={shot(p.slug, "phone").src}
                    className="btn btn-primary"
                  >
                    How it was built
                    <ArrowRight />
                  </WalkLink>
                  <a className="pcard__ext uline" href={p.url} target="_blank" rel="noopener noreferrer">
                    {p.domain}
                    <ArrowUpRight />
                    <span className="sr-only">(opens the live site in a new tab)</span>
                  </a>
                </div>
              </div>

              <WalkLink
                href={`/work/${p.slug}`}
                tone={p.tone}
                desktop={shot(p.slug, "desktop").src}
                phone={shot(p.slug, "phone").src}
                className="pcard__media"
                tabIndex={-1}
                aria-hidden="true"
              >
                <Duo p={p} />
                <div className="solo">
                  <Phone p={p} sizes="(max-width: 899px) 62vw, 1px" />
                </div>
              </WalkLink>
            </li>
          ))}
        </ol>

        <div className="smaller" data-reveal>
          <p className="label">Smaller builds, also live</p>
          <p className="mt-2 max-w-[40rem] text-ink-2">
            One-page sites, each designed and shipped in a day, each taking orders over WhatsApp.
          </p>
          <ul className="smaller__list">
            {SMALLER.map((s) => {
              const img = shot(s.slug, "phone");
              return (
                <li key={s.slug}>
                  <a className="smaller__item group" href={s.url} target="_blank" rel="noopener noreferrer">
                    <span className="smaller__thumb">
                      <Image src={img.src} width={img.width} height={img.height} sizes="64px" alt="" />
                    </span>
                    <span>
                      <span className="inline-flex items-center gap-1.5 font-semibold">
                        <span className="uline group-hover:bg-[length:100%_1.5px]">{s.name}</span>
                        <ArrowUpRight />
                      </span>
                      <span className="mt-1 block text-[0.95rem] leading-snug text-ink-2">{s.note}</span>
                      <span className="sr-only">(opens in a new tab)</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── what I do ─────────────────────────────── */

function WhatIDo() {
  return (
    <section id="what-i-do" className="section pt-0" aria-labelledby="hats-title">
      <div className="wrap hats">
        <div className="hats__head" data-reveal>
          <p className="label">02 · What I do</p>
          <h2 className="h2 mt-4" id="hats-title">
            Seven jobs, one person.
          </h2>
          <p className="lead mt-5">
            On a small team someone has to be all of these. On most of my projects, that&apos;s me.
            Each one links to where you can see it working.
          </p>
        </div>
        <ol>
          {HATS.map((h, i) => (
            <li key={h.title} className="hat" data-reveal>
              <span className="hat__no">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{h.title}</h3>
                <p>{h.body}</p>
                <ul className="chips" aria-label="Seen in">
                  {h.seen.map((slug) => {
                    const p = getProject(slug);
                    return p ? (
                      <li key={slug}>
                        <Link className="chip" href={`/work/${slug}`}>
                          {p.name}
                        </Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─────────────────────────────── story ─────────────────────────────── */

function Story() {
  return (
    <section id="story" className="story section on-dark" aria-labelledby="story-title">
      <div className="wrap">
        <div data-reveal>
          <p className="label">03 · Story</p>
          <h2 className="h2 mt-4" id="story-title">
            Let&apos;s rewind.
          </h2>
          <p className="lead mt-5">
            Everything on this page happened in 2026. First commit: {SINCE.firstCommit}. Since then,{" "}
            {SINCE.repositories} repositories and {SINCE.commits} commits. Here it is, newest first.
          </p>
        </div>
        <StoryTrack chapters={CHAPTERS} />
      </div>
    </section>
  );
}

/* ─────────────────────────────── principles ─────────────────────────────── */

function Principles() {
  return (
    <section className="section" aria-labelledby="rules-title">
      <div className="wrap">
        <div data-reveal>
          <p className="label">04 · How I work</p>
          <h2 className="h2 mt-4 max-w-[18ch]" id="rules-title">
            Four things you can hold me to.
          </h2>
        </div>
        <ul className="rules">
          {PRINCIPLES.map((r) => (
            <li key={r.title} className="rule" data-reveal>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
