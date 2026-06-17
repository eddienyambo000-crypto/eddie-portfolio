"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import type { Stat } from "@/lib/site";

function Counter({ value }: { value: string }) {
  const m = value.match(/^(\d+)(.*)$/);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!m || !inView) return;
    const target = parseInt(m[1], 10);
    const step = Math.max(1, Math.ceil(target / 40));
    let cur = 0;
    const id = setInterval(() => {
      cur += step;
      if (cur >= target) {
        cur = target;
        clearInterval(id);
      }
      setN(cur);
    }, 22);
    return () => clearInterval(id);
  }, [inView, m]);

  return (
    <div ref={ref} className="font-display text-[clamp(2.2rem,4vw,3rem)] font-black leading-none text-espresso">
      {m ? `${n}${m[2]}` : value}
    </div>
  );
}

export function Stats({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-mocha-line bg-paper p-1.5 shadow-[var(--shadow-soft)] md:grid-cols-4">
      {stats.map((s, i) => (
        <div key={i} className="px-4 py-7 text-center">
          <Counter value={s.value} />
          <div className="mt-2.5 font-mono text-[0.72rem] uppercase tracking-wide text-coffee-soft">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
