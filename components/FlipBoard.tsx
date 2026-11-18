"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const HOLD = 2200; // how long each role rests
const FLIP = 720; // how long the flap takes to fall

/**
 * A split-flap board. The top half of the current word falls forward on its
 * hinge to reveal the next one, the way a station departures board turns.
 *
 * The board is sized by an invisible stack of every role, so it never changes
 * width (no layout shift), and screen readers get the full list once in the
 * heading instead of a word that changes every two seconds.
 *
 * Every node is rendered once and only its text changes. The flap rests flat
 * over the top half between turns, so the browser paints the board a single
 * time instead of treating each new word as a fresh "largest paint".
 */
export function FlipBoard({ words }: { words: readonly string[] }) {
  const [cur, setCur] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const flap = useRef<HTMLSpanElement>(null);
  const anim = useRef<Animation | null>(null);
  const next = (cur + 1) % words.length;

  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    if (flipping) {
      const land = () => {
        if (cancelled) return;
        setCur((c) => (c + 1) % words.length);
        setFlipping(false);
      };
      const el = flap.current;
      if (still || !el || typeof el.animate !== "function") {
        land();
      } else {
        // hold the final frame until React has swapped the words, then reset
        anim.current = el.animate([{ transform: "rotateX(0deg)" }, { transform: "rotateX(-180deg)" }], {
          duration: FLIP,
          easing: "cubic-bezier(0.65, 0, 0.35, 1)",
          fill: "forwards",
        });
        anim.current.finished.then(land, () => {});
      }
    } else {
      // a hidden tab doesn't need to keep turning
      const go = () => (document.hidden ? (t = setTimeout(go, 800)) : setFlipping(true));
      t = setTimeout(go, still ? HOLD + 800 : HOLD);
    }
    return () => {
      cancelled = true;
      if (t) clearTimeout(t);
    };
  }, [flipping, words.length]);

  // the new word is in the DOM: drop the flap back flat in the same frame, so it never flashes
  useLayoutEffect(() => {
    anim.current?.cancel();
    anim.current = null;
  }, [cur]);

  useEffect(() => () => anim.current?.cancel(), []);

  // behind the flap the top half shows the next word as soon as a turn starts
  const top = flipping ? next : cur;

  return (
    <span className="flip" aria-hidden="true">
      <span className="flip__sizer">
        {words.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </span>

      <span className="flip__half flip__top">
        <span className="flip__ink">{words[top]}</span>
      </span>
      <span className="flip__half flip__bottom">
        <span className="flip__ink">{words[cur]}</span>
      </span>

      <span className="flip__flap" ref={flap}>
        <span className="flip__face flip__front">
          <span className="flip__ink">{words[cur]}</span>
        </span>
        <span className="flip__face flip__back">
          <span className="flip__ink">{words[next]}</span>
        </span>
      </span>

      <span className="flip__count">
        {String(top + 1).padStart(2, "0")} / {String(words.length).padStart(2, "0")}
      </span>
    </span>
  );
}
