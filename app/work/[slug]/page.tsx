import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WalkArrival } from "@/components/Walk";
import { ArrowLeft, ArrowRight, ArrowUpRight, Browser, Duo, Phone } from "@/components/ui";
import { PROJECTS, getProject } from "@/lib/projects";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = `${p.name}: ${p.kind}`;
  return {
    title,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: {
      title,
      description: p.summary,
      images: [{ url: `/work/${p.slug}-desktop.webp`, width: 1600, height: 1000, alt: `${p.name}, the live site` }],
    },
  };
}

const TONE_BG: Record<string, string> = {
  mint: "bg-mint",
  burgundy: "bg-burgundy",
  cloud: "bg-cloud-2",
};

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = PROJECTS.findIndex((x) => x.slug === p.slug);
  const next = PROJECTS[(i + 1) % PROJECTS.length]!;

  return (
    <article>
      <WalkArrival />

      <header className="wrap case__head">
        <Link href="/#work" className="case__back">
          <ArrowLeft />
          All work
        </Link>
        <p className="label mt-6">
          {String(i + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")} · {p.kind}
        </p>
        <h1 className="case__h1">{p.name}</h1>
        <p className="lead mt-6 text-ink">{p.summary}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a className="btn btn-primary" href={p.url} target="_blank" rel="noopener noreferrer">
            Open {p.domain}
            <ArrowUpRight />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <dl className="case__meta">
          <div>
            <dt className="label">My part</dt>
            <dd>{p.hats.join(", ")}</dd>
          </div>
          <div>
            <dt className="label">Built with</dt>
            <dd>{p.stack.join(", ")}</dd>
          </div>
          <div>
            <dt className="label">When</dt>
            <dd>{p.when}</dd>
          </div>
        </dl>
        {p.status && (
          <p className="case__status">
            <span className="dot" aria-hidden="true" />
            {p.status}
          </p>
        )}
      </header>

      <div className="wrap">
        <div className={`case__stage ${TONE_BG[p.tone] ?? "bg-cloud-2"}`}>
          <Duo p={p} priority />
          {/* phones get the phone first, at a size you can actually read */}
          <div className="case__mobile">
            <Phone p={p} walk={false} priority sizes="72vw" />
            <Browser p={p} sizes="92vw" />
          </div>
        </div>
      </div>

      <div className="wrap section">
        <div className="case__body">
          <h2>The situation</h2>
          <p className="prose" data-reveal>
            {p.situation}
          </p>

          <h2>What I built</h2>
          <ol className="built" data-reveal>
            {p.built.map((b, k) => (
              <li key={b}>
                <span>{String(k + 1).padStart(2, "0")}</span>
                {b}
              </li>
            ))}
          </ol>

          <h2>What I learned</h2>
          <p className="prose" data-reveal>
            {p.learned}
          </p>

          <h2>By the numbers</h2>
          <dl className="facts" data-reveal>
            {p.facts.map((f) => (
              <div key={f.label} className="flex flex-col-reverse">
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="wrap">
        <Link href={`/work/${next.slug}`} className="next">
          <span className="label">Next project</span>
          <span className="next__name">
            {next.name}
            <ArrowRight />
          </span>
        </Link>
      </div>
    </article>
  );
}
