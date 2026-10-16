"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CITY, INDEX_ROWS, NAME, ROLE, type Profile } from "@/lib/site";
import { Headline } from "@/components/ui";

/**
 * The index.
 *
 * Four numbered rows and one image stage. At rest the stage holds the
 * portrait; hovering or keyboard-focusing a row clips in a capture of the
 * relevant real project and releases back to the portrait on leave.
 *
 * Touch devices never fire hover, so the portrait simply stays and the rows
 * behave as ordinary links — nothing is hidden behind an interaction a phone
 * cannot perform.
 */
export function IndexHome({ profile }: { profile: Profile }) {
  const [active, setActive] = useState<number | null>(null);
  const still = useReducedMotion();

  const row = active !== null ? INDEX_ROWS[active] : null;
  const preview = row?.preview ?? null;
  const portrait = profile.photo_url || "/eddie.jpg";

  return (
    <section className="mx-auto max-w-[1440px] px-[var(--gutter)] pb-[var(--space-section-tight)] pt-8 lg:pt-10">
      <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:grid-rows-[auto_auto_1fr] lg:items-start lg:gap-x-16 lg:gap-y-0">
        {/* ─────────────────────── masthead ─────────────────────── */}
        <div className="order-1 lg:order-none lg:col-start-1 lg:row-start-1">
          <div className="animate-rise">
            <h1 className="structural text-[clamp(2.1rem,7vw,4.1rem)] text-ink">{NAME}</h1>
            <p className="label mt-3">
              {ROLE} / {CITY}
            </p>
          </div>
        </div>

        {/* ─────────────────── statement + index ─────────────────── */}
        <div className="order-3 lg:order-none lg:col-start-1 lg:row-start-2">
          <div
            className="animate-rise lg:mt-11"
            style={{ animationDelay: "90ms" }}
          >
            <p className="display text-balance text-[clamp(1.75rem,4.1vw,2.85rem)] text-ink">
              <Headline text={profile.hero_h1} />
            </p>
            <p className="mt-6 max-w-[46ch] text-[1.02rem] leading-relaxed">{profile.hero_sub}</p>
          </div>

          {/* ── the four choices ── */}
          <nav
            aria-label="Index"
            className="animate-rise mt-10 border-t border-stone-2 lg:mt-12"
            style={{ animationDelay: "180ms" }}
            onMouseLeave={() => setActive(null)}
          >
            {INDEX_ROWS.map((r, i) => (
              <Link
                key={r.no}
                href={r.href}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="group relative flex items-baseline gap-4 border-b border-stone-2 py-4 sm:gap-6 sm:py-5"
              >
                {/* the rule that draws itself across the row */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-vermilion transition-transform duration-[520ms] [transition-timing-function:var(--ease-out-soft)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <span
                  className={`label tnum transition-colors duration-300 ${
                    active === i ? "text-vermilion-ink" : ""
                  }`}
                >
                  {r.no}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block transition-transform duration-[520ms] [transition-timing-function:var(--ease-out-soft)] group-hover:translate-x-2 group-focus-visible:translate-x-2">
                    <span className="display block text-[clamp(1.65rem,4.6vw,2.5rem)] text-ink">
                      {r.label}
                    </span>
                    <span className="mt-1 block text-[0.92rem] text-ink-80">{r.line}</span>
                  </span>
                </span>

                <span
                  aria-hidden
                  className={`shrink-0 self-center text-[1.1rem] transition-[transform,color] duration-[520ms] [transition-timing-function:var(--ease-out-soft)] ${
                    active === i
                      ? "translate-x-1 text-vermilion-ink"
                      : "text-stone"
                  }`}
                >
                  &#8594;
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* ─────────────────────── the image stage ─────────────────────── */}
        <div
          className="animate-rise order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:pt-2"
          style={{ animationDelay: "60ms" }}
        >
          <figure className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-2 sm:aspect-[16/10] lg:aspect-[4/5]">
              {/* portrait: the resting state */}
              <Image
                src={portrait}
                alt={`${NAME}, ${ROLE}, ${CITY}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover object-[50%_57%] grayscale contrast-[1.08] brightness-[1.04] lg:object-[50%_46%]"
              />
              {/* duotone: warms the grayscale into the paper/ink palette */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-paper mix-blend-lighten opacity-[0.16]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-ink mix-blend-multiply opacity-[0.10]"
              />

              {/* project capture clips in over it */}
              <AnimatePresence>
                {preview && (
                  <motion.div
                    key={preview}
                    className="absolute inset-0 bg-paper-2"
                    initial={still ? { opacity: 1 } : { clipPath: "inset(0 0 100% 0)" }}
                    animate={still ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
                    exit={still ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
                    transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image
                      src={preview}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 46vw"
                      className={
                        preview.includes("hotel-eza")
                          ? "object-contain object-center p-6"
                          : "object-cover object-left-top"
                      }
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <figcaption className="label mt-3 flex items-baseline justify-between gap-4">
              <span>{row ? row.label : NAME}</span>
              <span className="text-right">
                {row?.preview ? "Live project" : "Kigali"}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
