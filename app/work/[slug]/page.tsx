import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { slugify, type Project } from "@/lib/site";
import { Band, NextStep, Wrap } from "@/components/Page";
import { Reveal } from "@/components/ui";

export const revalidate = 60;
export const dynamicParams = true;

type Params = { params: Promise<{ slug: string }> };

async function find(slug: string): Promise<{ p: Project; all: Project[] } | null> {
  const d = await getContent();
  const p = d.projects.find((x) => slugify(x.title) === slug);
  return p ? { p, all: d.projects } : null;
}

export async function generateStaticParams() {
  const d = await getContent();
  return d.projects.map((p) => ({ slug: slugify(p.title) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const hit = await find(slug);
  if (!hit) return { title: "Not found" };
  return {
    title: hit.p.title,
    description: hit.p.blurb,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: hit.p.title,
      description: hit.p.blurb,
      images: hit.p.cover_url ? [hit.p.cover_url] : undefined,
    },
  };
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const hit = await find(slug);
  if (!hit) notFound();

  const { p, all } = hit;
  const idx = all.findIndex((x) => x.id === p.id);
  const next = all[(idx + 1) % all.length];
  const tall = p.shape === "tall";

  const story = [
    { k: "The challenge", v: p.problem },
    { k: "The solution", v: p.solution },
    { k: "The result", v: p.result },
  ].filter((s) => s.v);

  return (
    <>
      {/* ── masthead ── */}
      <Wrap className="pt-14 lg:pt-20">
        <Link href="/work" className="label rule-link">
          &#8592; Selected Work
        </Link>

        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h1 className="display text-[clamp(2.5rem,7.6vw,5.2rem)] text-ink">{p.title}</h1>
            <p className="mt-5 max-w-[48ch] text-[1.08rem] leading-relaxed">{p.blurb}</p>
          </div>

          <dl className="lg:col-span-4 lg:justify-self-end lg:text-right">
            {p.client && (
              <div className="mb-4">
                <dt className="label">Client</dt>
                <dd className="mt-1 text-[0.98rem] text-ink">{p.client}</dd>
              </div>
            )}
            {p.year && (
              <div className="mb-4">
                <dt className="label">Year</dt>
                <dd className="tnum mt-1 text-[0.98rem] text-ink">{p.year}</dd>
              </div>
            )}
            {!!p.tags?.length && (
              <div>
                <dt className="label">Built with</dt>
                <dd className="mt-1 text-[0.98rem] text-ink">{p.tags.join(", ")}</dd>
              </div>
            )}
          </dl>
        </div>

        {p.live_url && (
          <a
            href={p.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-9"
          >
            Open the live system
            <span aria-hidden>&#8599;</span>
          </a>
        )}
      </Wrap>

      {/* ── the capture ── */}
      {p.cover_url && (
        <Band tight>
          <Wrap>
            <Reveal>
              <figure>
                <div
                  className={`relative w-full overflow-hidden bg-paper-2 ${
                    tall ? "mx-auto aspect-[9/15] max-w-[380px]" : "aspect-[16/9]"
                  }`}
                >
                  <Image
                    src={p.cover_url}
                    alt={`${p.title} — screenshot of the live system`}
                    fill
                    sizes="(max-width: 1440px) 100vw, 1440px"
                    priority
                    className={tall ? "object-contain" : "object-cover object-top"}
                  />
                </div>
                <figcaption className="label mt-3">
                  Screenshot of the live system, {p.year}
                </figcaption>
              </figure>
            </Reveal>
          </Wrap>
        </Band>
      )}

      {/* ── challenge / solution / result ── */}
      {story.length > 0 && (
        <Band>
          <Wrap>
            <div className="grid gap-10 lg:grid-cols-12">
              {story.map((s, i) => (
                <Reveal
                  key={s.k}
                  delay={i * 0.08}
                  className={`lg:col-span-4 ${i === 0 ? "lg:col-start-1" : ""}`}
                >
                  <div className="border-t border-ink pt-5">
                    <h2 className="label text-ink">{s.k}</h2>
                    <p className="mt-4 text-[1.02rem] leading-[1.75]">{s.v}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Wrap>
        </Band>
      )}

      {/* ── verifiable facts only ── */}
      {!!p.metrics?.length && (
        <Band tight>
          <Wrap>
            <dl className="hairline grid grid-cols-2 gap-8 pt-10 lg:grid-cols-4">
              {p.metrics.slice(0, 4).map((m, i) => (
                <Reveal key={m.label + i} delay={i * 0.06}>
                  <dt className="display text-[clamp(1.6rem,3.4vw,2.4rem)] text-ink">
                    {m.value}
                  </dt>
                  <dd className="label mt-2">{m.label}</dd>
                </Reveal>
              ))}
            </dl>
          </Wrap>
        </Band>
      )}

      {next && next.id !== p.id && (
        <Band tight>
          <Wrap>
            <Link href={`/work/${slugify(next.title)}`} className="group block hairline pt-10">
              <span className="label">Next project</span>
              <span className="display mt-2 flex items-baseline gap-4 text-[clamp(1.8rem,4.4vw,3rem)] text-ink">
                {next.title}
                <span
                  aria-hidden
                  className="text-meta transition-[transform,color] duration-[520ms] [transition-timing-function:var(--ease-out-soft)] group-hover:translate-x-2 group-hover:text-vermilion-ink"
                >
                  &#8594;
                </span>
              </span>
            </Link>
          </Wrap>
        </Band>
      )}

      <NextStep
        title="Have a problem worth solving?"
        lead="Tell me what is breaking and I will tell you whether it is worth automating."
      />
    </>
  );
}
