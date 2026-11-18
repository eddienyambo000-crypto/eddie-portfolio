"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Fades [data-reveal] elements up as they arrive.
 *
 * Only elements that start below the fold are ever hidden, and only after this
 * runs, so a failed script can never leave content invisible and nothing
 * already on screen flickers. A scroll sweep backs up the observer: a jump to
 * the end, a scrollbar drag or a hard fling can carry an element straight past
 * the viewport without it ever "intersecting", and it must not stay hidden.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const pending = new Set<Element>();
    const show = (el: Element) => {
      el.classList.remove("rv-pre");
      el.classList.add("rv-in");
      pending.delete(el);
      io.unobserve(el);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) show(e.target);
      },
      { rootMargin: "0px 0px -8% 0px" }
    );

    let frame = 0;
    const sweep = () => {
      frame = 0;
      const limit = window.innerHeight;
      // read every position first, then write, so the sweep never thrashes layout
      const due = [...pending].filter((el) => el.getBoundingClientRect().top < limit);
      due.forEach(show);
      if (pending.size === 0) window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sweep);
    };

    for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add("rv-pre");
        pending.add(el);
        io.observe(el);
      }
    }
    if (pending.size) window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
      document.querySelectorAll(".rv-pre").forEach((el) => el.classList.remove("rv-pre"));
    };
  }, [pathname]);

  return null;
}
