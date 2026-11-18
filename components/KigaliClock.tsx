"use client";

import { useSyncExternalStore } from "react";
import { TIMEZONE } from "@/lib/site";

const fmt = new Intl.DateTimeFormat("en-GB", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: TIMEZONE,
});

// one shared ticker for every clock on the page
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;
let now = "";

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (!timer) {
    now = fmt.format(new Date()).replace(" ", "\u202f");
    timer = setInterval(() => {
      const next = fmt.format(new Date()).replace(" ", "\u202f");
      if (next !== now) {
        now = next;
        listeners.forEach((l) => l());
      }
    }, 10_000);
  }
  return () => {
    listeners.delete(cb);
    if (!listeners.size && timer) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}

/**
 * The time in Kigali. Renders an empty slot on the server, so the first paint
 * never disagrees with the visitor's clock.
 */
export function KigaliClock({ variant = "chip" }: { variant?: "chip" | "plain" }) {
  const time = useSyncExternalStore(
    subscribe,
    () => now || fmt.format(new Date()).replace(" ", "\u202f"),
    () => ""
  );

  if (variant === "plain") {
    return (
      <span>
        Kigali <span className="tabular-nums">{time || "\u00a0"}</span>
      </span>
    );
  }

  return (
    <span className="clock hidden sm:inline-flex" aria-label={time ? `Local time in Kigali: ${time}` : "Local time in Kigali"}>
      <span>Kigali</span>
      <b aria-hidden="true">{time || "\u00a0"}</b>
    </span>
  );
}
