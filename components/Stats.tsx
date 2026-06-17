"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";
import type { Stat } from "@/lib/site";

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  // parse once & keep stable so the effect doesn't restart every render
  const { target, suffix, numeric } = useMemo(() => {
    const m = value.match(/^(\d+)(.*)$/);
    return m ? { target: parseInt(m[1], 10), suffix: m[2], numeric: true } : { target: 0, suffix: "", numeric: false };
  }, [value]);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!numeric || !inView) return;
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const id = setInterval(() => {
      cur += step;
      if (cur >= target) {
        cur = target;
        clearInterval(id);
      }
      setN(cur);
    }, 24);
    return () => clearInterval(id);
  }, [inView, numeric, target]);

  return (
    <div ref={ref} className="font-display text-[clamp(2.2rem,4vw,3rem)] font-black leading-none text-espresso tabular-nums">
      {numeric ? `${n}${suffix}` : value}
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
