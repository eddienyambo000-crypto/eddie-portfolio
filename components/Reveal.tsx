"use client";
import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
  style,
  y = 30,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// Splits a headline on "|" — text after the pipe renders caramel-italic.
export function Headline({ text, className }: { text: string; className?: string }) {
  const [head, tail] = text.split("|");
  return (
    <h1 className={className}>
      {head?.trim()}
      {tail ? (
        <>
          {" "}
          <span className="serif-i">{tail.trim()}</span>
        </>
      ) : null}
    </h1>
  );
}
