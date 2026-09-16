"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { DESTINATIONS, OFFER, type Profile } from "@/lib/site";
import { Headline, KigaliClock } from "@/components/ui";
import { LiveFeed } from "@/components/LiveFeed";

/**
 * The home screen. A visitor lands and picks a door, the way you pick a tile
 * when you open an app — mouse, thumb, or keys 1-4. Everything below it is the
 * long story for people who would rather just scroll.
 */
export function Launcher({ profile }: { profile: Profile }) {
  const [focus, setFocus] = useState(-1);
  const tiles = useRef<(HTMLAnchorElement | null)[]>([]);
  const still = useReducedMotion();

  // number keys jump straight to a door; arrows walk them
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= DESTINATIONS.length) {
        e.preventDefault();
        tiles.current[n - 1]?.focus();
        tiles.current[n - 1]?.click();
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        if (focus < 0) return;
        e.preventDefault();
        const next = (focus + 1) % DESTINATIONS.length;
        tiles.current[next]?.focus();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (focus < 0) return;
        e.preventDefault();
        const prev = (focus - 1 + DESTINATIONS.length) % DESTINATIONS.length;
        tiles.current[prev]?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focus]);

  return (
    <section className="relative px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:pb-24 lg:pt-40">
      <div className="relative mx-auto max-w-[1240px]">
        {/* ── the proof, animated, on wide screens only ── */}
        <motion.div
          initial={still ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-0 top-12 hidden xl:block"
        >
          <LiveFeed />
        </motion.div>

        {/* ── live status rail ── */}
        <motion.div
          initial={still ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-faint"
        >
          <span className="flex items-center gap-2 text-live">
            <span className="dot-live" aria-hidden />
            Available
          </span>
          <span className="hidden text-line sm:inline" aria-hidden>
            /
          </span>
          <span>
            {OFFER.slots} build {OFFER.slots === 1 ? "slot" : "slots"} left this month
          </span>
          <span className="hidden text-line sm:inline" aria-hidden>
            /
          </span>
          <span className="hidden sm:inline">
            <KigaliClock />
          </span>
        </motion.div>

        {/* ── the pitch ── */}
        <motion.h1
          initial={still ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-[15ch] text-[clamp(2.6rem,8.4vw,5.6rem)] leading-[0.98] text-balance sm:max-w-[22ch]"
        >
          <Headline text={profile.hero_h1} />
        </motion.h1>

        <motion.p
          initial={still ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-xl text-[1.04rem] leading-[1.75] sm:text-[1.1rem]"
        >
          {profile.hero_sub}
        </motion.p>

        {/* ── the doors ── */}
        <motion.div
          initial={still ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.26 }}
          className="mt-10 grid grid-cols-2 gap-2.5 sm:gap-3 lg:mt-14 lg:grid-cols-4"
        >
          {DESTINATIONS.map((d, idx) => (
            <motion.div
              key={d.key}
              initial={still ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3 + idx * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={d.href}
                ref={(el) => {
                  tiles.current[idx] = el;
                }}
                onFocus={() => setFocus(idx)}
                onBlur={() => setFocus(-1)}
                className="edge-top group panel relative flex h-full min-h-[150px] flex-col overflow-hidden p-4 sm:min-h-[172px] sm:p-5 transition-[transform,border-color,box-shadow] duration-400 [transition-timing-function:var(--ease-spring)] hover:-translate-y-1.5 hover:border-amber-dim hover:shadow-[var(--shadow-lift)] focus-visible:-translate-y-1.5 focus-visible:border-amber-dim lg:min-h-[228px] lg:p-6"
              >
                {/* amber wash on approach */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_180px_at_50%_-10%,rgba(240,166,75,0.16),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                />

                <div className="relative flex items-start justify-between">
                  <span className="font-mono text-[0.72rem] tracking-[0.18em] text-faint transition-colors duration-300 group-hover:text-amber group-focus-visible:text-amber">
                    {d.no}
                  </span>
                  <ArrowRight
                    size={16}
                    aria-hidden
                    className="text-faint transition-[color,transform] duration-400 [transition-timing-function:var(--ease-spring)] group-hover:translate-x-1 group-hover:text-amber group-focus-visible:translate-x-1 group-focus-visible:text-amber"
                  />
                </div>

                <div className="relative mb-4 mt-6 sm:mb-5 sm:mt-8">
                  <h2 className="font-display text-[1.22rem] leading-tight text-ivory sm:text-[1.38rem] lg:text-[1.5rem]">
                    {d.label}
                  </h2>
                  <p className="mt-2.5 hidden text-[0.88rem] leading-[1.6] text-muted sm:block">
                    {d.line}
                  </p>
                </div>

                <div className="relative mt-auto flex items-center justify-between border-t border-line-soft pt-3 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-faint sm:pt-3.5 sm:text-[0.66rem] sm:tracking-[0.14em]">
                  <span className="flex items-center gap-2">
                    {d.key === "system" && <span className="dot-live" aria-hidden />}
                    {d.hint}
                  </span>
                  <kbd className="hidden rounded border border-line bg-ink px-1.5 py-0.5 text-[0.62rem] lg:inline">
                    {idx + 1}
                  </kbd>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* ── affordance hints ── */}
        <motion.div
          initial={still ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.68rem] text-faint"
        >
          <span className="hidden lg:inline">Press 1-4 to open a door</span>
          <span className="flex items-center gap-1.5">
            <ChevronDown size={12} aria-hidden className="text-amber" />
            Or scroll — the whole story is below
          </span>
        </motion.div>
      </div>
    </section>
  );
}
