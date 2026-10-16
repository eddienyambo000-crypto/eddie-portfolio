"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

/** Scroll reveal. Deliberately small movement — editorial, not bouncy. */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -6% 0px" });
  const still = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={still ? false : { opacity: 0, y }}
      animate={inView || still ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Splits an editable headline on "|" and sets the tail in the accent italic. */
export function Headline({
  text,
  className = "",
  breakBefore = false,
}: {
  text: string;
  className?: string;
  /** set the accent clause on its own line — typeset, not left to wrap */
  breakBefore?: boolean;
}) {
  const [head, ...rest] = text.split("|");
  const tail = rest.join("|");
  return (
    <span className={className}>
      {head}
      {tail ? (
        <>
          {breakBefore ? <br className="hidden sm:block" /> : null}{" "}
          <span className="italic-accent">{tail}</span>
        </>
      ) : null}
    </span>
  );
}
