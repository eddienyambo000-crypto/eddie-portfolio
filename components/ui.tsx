"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ───────────────────────────── scroll reveal ───────────────────────────── */

export function Reveal({
  children,
  delay = 0,
  y = 22,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px -8% 0px" });
  const still = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={still ? false : { opacity: 0, y }}
      animate={inView || still ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.62, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────── count-up for the stat numbers ─────────────────── */

/**
 * Animates the leading number inside a string, keeping whatever wraps it
 * ("12+", "5 sec", "<5s", "24/7" -> only the first number moves).
 */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const still = useReducedMotion();
  // "24/7" or "9:00" are not quantities — counting them up reads like a score
  const countable = !/[/:]/.test(value);
  const match = countable ? value.match(/\d+/) : null;
  const target = match ? parseInt(match[0], 10) : null;
  const [n, setN] = useState(target ?? 0);

  useEffect(() => {
    if (target === null || !inView || still) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1100;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      // ease-out cubic
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setN(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, still]);

  if (target === null) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={`tnum ${className}`}>
      {value.replace(/\d+/, String(n))}
    </span>
  );
}

/* ─────────────────────────── magnetic hover CTA ────────────────────────── */

export function Magnetic({
  children,
  className = "",
  strength = 0.28,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const still = useReducedMotion();

  function move(e: React.MouseEvent) {
    const el = ref.current;
    if (!el || still) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }
  function leave() {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  }

  return (
    <span
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className={`inline-block transition-transform duration-500 [transition-timing-function:var(--ease-spring)] ${className}`}
    >
      {children}
    </span>
  );
}

/* ─────────────────────── headline with the "|" accent tail ─────────────── */

export function Headline({ text, className = "" }: { text: string; className?: string }) {
  const [head, ...rest] = text.split("|");
  const tail = rest.join("|");
  return (
    <span className={className}>
      {head}
      {tail ? (
        <>
          {" "}
          <span className="tail">{tail}</span>
        </>
      ) : null}
    </span>
  );
}

/* ─────────────────────────── live Kigali clock ─────────────────────────── */

/** Renders nothing until mounted, so the server HTML never disagrees. */
export function KigaliClock() {
  const [t, setT] = useState<string | null>(null);
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Africa/Kigali",
      }).format(new Date());
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 20_000);
    return () => clearInterval(id);
  }, []);
  if (!t) return null;
  return <span className="tnum">{t} in Kigali</span>;
}

/* ───────────────────────────── section header ──────────────────────────── */

export function SectionHead({
  eyebrow,
  title,
  lead,
  center = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-5 text-[clamp(2rem,5.4vw,3.4rem)]">{title}</h2>
      {lead ? <p className="mt-5 text-[1.02rem] leading-[1.75]">{lead}</p> : null}
    </Reveal>
  );
}
