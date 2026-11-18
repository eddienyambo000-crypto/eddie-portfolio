import Image from "next/image";
import { shot, type Project } from "@/lib/projects";

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10m0 0L8.5 3.5M13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4.5 11.5l7-7m0 0H5.5m6 0v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowLeft({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M13 8H3m0 0l4.5-4.5M3 8l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A browser window around the desktop capture, with the real domain in the bar. */
export function Browser({ p, sizes, priority = false }: { p: Project; sizes: string; priority?: boolean }) {
  const s = shot(p.slug, "desktop");
  return (
    <div className="browser" data-walk-from="desktop">
      <div className="browser__bar">
        <span className="browser__url">{p.domain}</span>
      </div>
      <Image
        src={s.src}
        width={s.width}
        height={s.height}
        sizes={sizes}
        priority={priority}
        alt={`${p.name} on a laptop: the live site at ${p.domain}`}
      />
    </div>
  );
}

/** A phone around the mobile capture. */
export function Phone({
  p,
  sizes,
  priority = false,
  walk = true,
}: {
  p: Project;
  sizes: string;
  priority?: boolean;
  walk?: boolean;
}) {
  const s = shot(p.slug, "phone");
  return (
    <div className="phone" data-walk-from={walk ? "phone" : undefined}>
      <Image
        src={s.src}
        width={s.width}
        height={s.height}
        sizes={sizes}
        priority={priority}
        alt={`${p.name} on a phone`}
      />
    </div>
  );
}

/** Desktop and phone together, the phone leaning on the laptop's corner. */
export function Duo({ p, priority = false }: { p: Project; priority?: boolean }) {
  return (
    <div className="duo">
      <Browser p={p} priority={priority} sizes="(min-width: 1320px) 760px, (min-width: 900px) 58vw, 100vw" />
      <Phone p={p} walk={false} sizes="(min-width: 900px) 180px, 25vw" />
    </div>
  );
}

/**
 * The name, set edge to edge. An SVG with textLength fills the width exactly at
 * every screen size, with no measuring script. Decorative: the name is also in
 * the copyright line, so screen readers don't hear it twice.
 */
export function WideName({ text, className }: { text: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1000 158" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMax meet">
      <text
        x="0"
        y="150"
        textLength="1000"
        lengthAdjust="spacingAndGlyphs"
        fill="currentColor"
        style={{ fontFamily: "var(--font-anton), 'Arial Narrow', sans-serif", fontSize: "190px" }}
      >
        {text}
      </text>
    </svg>
  );
}
