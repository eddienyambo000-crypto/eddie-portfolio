"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/lib/site";

/** Filter chips are built from whatever tags Eddie typed in /admin — no hardcoded list. */
export function WorkGrid({ projects }: { projects: Project[] }) {
  const [tag, setTag] = useState<string | null>(null);
  const still = useReducedMotion();

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p) => (p.tags || []).forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);
  }, [projects]);

  const shown = useMemo(
    () => (tag ? projects.filter((p) => (p.tags || []).includes(tag)) : projects),
    [projects, tag]
  );

  return (
    <>
      {tags.length > 1 && (
        <div className="no-bar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          <Chip on={tag === null} onClick={() => setTag(null)}>
            Everything
            <span className="ml-2 font-mono text-[0.68rem] opacity-60">{projects.length}</span>
          </Chip>
          {tags.map((t) => (
            <Chip key={t} on={tag === t} onClick={() => setTag(t)}>
              {t}
            </Chip>
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => (
            <motion.div
              key={p.id}
              layout={!still}
              initial={still ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={still ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.42, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard p={p} priority={i < 3} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!shown.length && (
        <p className="mt-10 text-center text-muted">Nothing tagged {tag} yet.</p>
      )}
    </>
  );
}

function Chip({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`min-h-[40px] flex-none whitespace-nowrap rounded-full border px-4 text-[0.84rem] transition-[background-color,border-color,color,transform] duration-200 active:scale-95 ${
        on
          ? "border-amber-dim bg-amber/12 text-ivory"
          : "border-line bg-ink-2 text-muted hover:border-amber-dim hover:text-ivory"
      }`}
    >
      {children}
    </button>
  );
}
