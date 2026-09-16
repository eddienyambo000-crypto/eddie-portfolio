"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BellRing, CalendarCheck, MessageCircle, Repeat2, UserCheck } from "lucide-react";

/**
 * The hero's right-hand side: what "your business makes money while you
 * sleep" looks like as a notification stream. Labelled as an example on
 * purpose — it illustrates the system, it is not a claim about live traffic.
 */

const EVENTS = [
  { Icon: MessageCircle, at: "22:41", title: "New enquiry answered", body: "Full service, RAV4 · replied in 4s" },
  { Icon: CalendarCheck, at: "22:44", title: "Booking confirmed", body: "Eric · tomorrow 09:00 · RWF 45,000" },
  { Icon: UserCheck, at: "01:12", title: "Lead qualified", body: "Room for 2, 3 nights · budget fits" },
  { Icon: Repeat2, at: "06:30", title: "Follow-up sent", body: "11 quiet leads nudged · 3 replied" },
  { Icon: BellRing, at: "07:00", title: "Morning report", body: "4 bookings while you slept" },
];

const VISIBLE = 3;

export function LiveFeed() {
  const [head, setHead] = useState(VISIBLE - 1);
  const still = useReducedMotion();

  useEffect(() => {
    if (still) return;
    const id = setInterval(() => setHead((h) => (h + 1) % EVENTS.length), 2800);
    return () => clearInterval(id);
  }, [still]);

  // oldest at the top, newest (the head) at the bottom — time reads downward
  const shown = Array.from({ length: VISIBLE }, (_, i) => {
    const idx = (head - (VISIBLE - 1 - i) + EVENTS.length * 2) % EVENTS.length;
    return { ...EVENTS[idx], key: `${idx}` };
  });

  return (
    <div aria-hidden className="pointer-events-none w-[340px] select-none">
      <div className="mb-3 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.16em] text-faint">
        <span>Tonight, while you sleep</span>
        <span>example</span>
      </div>

      <div className="relative flex flex-col gap-2.5">
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((e, i) => {
            const newest = i === shown.length - 1;
            return (
              <motion.div
                key={e.key}
                layout
                initial={{ opacity: 0, y: 26, scale: 0.96 }}
                animate={{ opacity: newest ? 1 : 0.42 + i * 0.18, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                className={`flex items-start gap-3 rounded-2xl border p-3.5 backdrop-blur ${
                  newest
                    ? "border-amber-dim bg-ink-3/90 shadow-[var(--shadow-lift)]"
                    : "border-line bg-ink-2/80"
                }`}
              >
                <span
                  className={`grid h-9 w-9 flex-none place-items-center rounded-xl ${
                    newest ? "bg-amber text-[#17110a]" : "bg-ink-4 text-muted"
                  }`}
                >
                  <e.Icon size={15} strokeWidth={1.9} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="truncate text-[0.86rem] text-ivory">{e.title}</span>
                    <span className="tnum flex-none font-mono text-[0.62rem] text-faint">
                      {e.at}
                    </span>
                  </span>
                  <span className="mt-0.5 block truncate text-[0.78rem] text-muted">{e.body}</span>
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
