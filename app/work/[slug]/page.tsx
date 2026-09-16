import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getContent } from "@/lib/content";
import { slugify, type Project } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { FinalCTA, Footer, Section } from "@/components/sections";
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
  if (!hit) return { title: "Project not found" };
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
  const story = [
    { k: "The problem", v: p.problem },
    { k: "What I built", v: p.solution },
    { k: "What changed", v: p.result },
  ].filter((s) => s.v);

  return (
    <>
      <PageHero
        eyebrow={[p.client, p.year].filter(Boolean).join(" / ") || "Case study"}
        title={p.title}
        lead={p.blurb}
        back={{ href: "/work", label: "All work" }}
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {p.live_url && (
            <a
              href={p.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Open it live
              <ArrowUpRight size={15} aria-hidden />
            </a>
          )}
          {!!p.tags?.length && (
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line px-3 py-1.5 font-mono text-[0.68rem] text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </PageHero>

      {p.cover_url && (
        <Section tight>
          <Reveal>
            <div className="panel relative aspect-[16/9] overflow-hidden">
              <Image
                src={p.cover_url}
                alt={`${p.title} — screenshot`}
                fill
                sizes="(max-width: 1240px) 100vw, 1240px"
                priority
                className="object-cover"
              />
            </div>
          </Reveal>
        </Section>
      )}

      {!!p.metrics?.length && (
        <Section tight>
          {/* one column per metric on sm+, however many Eddie entered */}
          <div
            className="panel grid grid-cols-1 sm:[grid-template-columns:repeat(var(--n),minmax(0,1fr))]"
            style={{ ["--n" as string]: Math.min(p.metrics.length, 4) }}
          >
            {p.metrics.slice(0, 4).map((m, i) => (
              <Reveal
                key={m.label + i}
                delay={i * 0.06}
                className={`border-line p-6 lg:p-8 ${i > 0 ? "border-t sm:border-l sm:border-t-0" : ""}`}
              >
                <div className="font-display text-[clamp(1.8rem,4vw,2.6rem)] leading-none text-ivory">
                  {m.value}
                </div>
                <div className="mt-2.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-faint">
                  {m.label}
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {story.length > 0 && (
        <Section>
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {story.map((s, i) => (
              <Reveal key={s.k} delay={i * 0.08}>
                <div className="border-t border-amber-dim pt-6">
                  <div className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-amber">
                    {s.k}
                  </div>
                  <p className="mt-4 text-[1rem] leading-[1.78]">{s.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {next && next.id !== p.id && (
        <Section tight>
          <Reveal>
            <Link
              href={`/work/${slugify(next.title)}`}
              className="panel group flex items-center justify-between gap-6 p-6 transition-[border-color,transform] duration-400 [transition-timing-function:var(--ease-spring)] hover:-translate-y-1 hover:border-amber-dim lg:p-8"
            >
              <div>
                <div className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-faint">
                  Next build
                </div>
                <div className="mt-2 font-display text-[1.6rem] text-ivory">{next.title}</div>
              </div>
              <ArrowRight
                size={20}
                aria-hidden
                className="flex-none text-faint transition-[color,transform] duration-400 group-hover:translate-x-1 group-hover:text-amber"
              />
            </Link>
          </Reveal>
        </Section>
      )}

      <FinalCTA />
      <Footer projects={all} />
    </>
  );
}
