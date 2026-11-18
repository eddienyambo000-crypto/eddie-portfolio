"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Chapter } from "@/lib/story";

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/**
 * The story, scrolled backwards in time. The chapter nearest the middle of the
 * screen is the current one: its month rolls onto the counter, and a dot
 * travels the rail to it. Measured on scroll inside one rAF, never in a loop.
 */
export function StoryTrack({ chapters }: { chapters: Chapter[] }) {
  const list = useRef<HTMLOListElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ol = list.current;
    const track = rail.current;
    if (!ol || !track) return;
    const items = Array.from(ol.querySelectorAll<HTMLElement>("[data-chapter]"));
    let raf = 0;

    const update = () => {
      raf = 0;
      const mid = window.innerHeight * 0.5;
      const top = track.getBoundingClientRect().top;
      const marks = items.map((el) => el.getBoundingClientRect().top + 14 - top);
      const first = marks[0] ?? 0;
      const last = marks[marks.length - 1] ?? 0;
      const y = Math.min(last, Math.max(first, mid - top));
      const p = last > first ? (y - first) / (last - first) : 0;
      track.style.setProperty("--y", `${y - first}px`);
      track.style.setProperty("--p", p.toFixed(4));

      let i = 0;
      items.forEach((el, k) => {
        if (el.getBoundingClientRect().top < mid + 40) i = k;
      });
      setActive(i);
      setProgress(items.length > 1 ? i / (items.length - 1) : 1);
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, []);

  const ch = chapters[active] ?? chapters[0]!;

  return (
    <div className="story__grid">
      <div className="story__panel" aria-hidden="true">
        <div className="odo">
          {ch.month.split("").map((d, k) => (
            <span className="odo__digit" key={k}>
              <span className="odo__col" style={{ ["--d" as string]: Number(d) }}>
                {DIGITS.map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </span>
            </span>
          ))}
        </div>
        <p className="story__when">{ch.when}</p>
        <div className="story__meter">
          <span>
            <b>{String(active + 1).padStart(2, "0")}</b> / {String(chapters.length).padStart(2, "0")}
          </span>
          <span className="story__bar" style={{ ["--p" as string]: progress }}>
            <i />
          </span>
        </div>
        <p className="label mt-10 hidden max-w-[16rem] leading-relaxed lg:block">
          Every date on this timeline comes from the projects&apos; git history.
        </p>
      </div>

      <div className="chapters" ref={rail}>
        <div className="chapters__rail" aria-hidden="true">
          <span className="chapters__fill" />
        </div>
        <span className="chapters__dot" aria-hidden="true" />
        <ol ref={list}>
          {chapters.map((c, k) => (
            <li key={c.when} className={`chapter${k === active ? " is-on" : ""}`} data-chapter>
              <p className="label">{c.when}</p>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              {c.project && (
                <Link className="uline" href={`/work/${c.project}`}>
                  Read how it was built
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
