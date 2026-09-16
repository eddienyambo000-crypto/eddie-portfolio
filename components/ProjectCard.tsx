import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { slugify, type Project } from "@/lib/site";

/**
 * Works with or without an uploaded cover. When Eddie has not added an image
 * yet the card draws its own: the project's accent colour, its initials and a
 * faint grid, so an image-less project still looks deliberate.
 */
export function ProjectCard({ p, priority = false }: { p: Project; priority?: boolean }) {
  const accent = p.accent || "#F0A64B";
  const initials = p.title
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <Link
      href={`/work/${slugify(p.title)}`}
      className="group panel flex h-full flex-col overflow-hidden transition-[transform,border-color,box-shadow] duration-500 [transition-timing-function:var(--ease-spring)] hover:-translate-y-1.5 hover:border-amber-dim hover:shadow-[var(--shadow-lift)] focus-visible:-translate-y-1.5"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-3">
        {p.cover_url ? (
          <Image
            src={p.cover_url}
            alt={`${p.title} — screenshot`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out-soft)] group-hover:scale-[1.045]"
          />
        ) : (
          <div
            className="absolute inset-0 grid place-items-center"
            style={{
              background: `radial-gradient(120% 120% at 20% 0%, ${accent}2e, transparent 60%), linear-gradient(160deg, #1a1816, #0a0908)`,
            }}
          >
            <span
              aria-hidden
              className="absolute inset-0 opacity-[0.09]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(246,242,234,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(246,242,234,.5) 1px,transparent 1px)",
                backgroundSize: "38px 38px",
              }}
            />
            <span
              className="relative font-display text-[3.2rem] leading-none"
              style={{ color: accent }}
            >
              {initials}
            </span>
          </div>
        )}

        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent"
        />

        {p.live_url && (
          <span className="absolute left-3.5 top-3.5 flex items-center gap-1.5 rounded-full border border-line bg-ink/85 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-live backdrop-blur">
            <span className="dot-live" aria-hidden />
            Live
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[1.28rem] leading-tight text-ivory">{p.title}</h3>
          <ArrowUpRight
            size={17}
            aria-hidden
            className="mt-1 flex-none text-faint transition-[color,transform] duration-400 [transition-timing-function:var(--ease-spring)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber"
          />
        </div>

        {p.client && (
          <span className="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-faint">
            {p.client}
          </span>
        )}

        <p className="mt-3 flex-1 text-[0.89rem] leading-[1.62]">{p.blurb}</p>

        {!!p.tags?.length && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.63rem] text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
