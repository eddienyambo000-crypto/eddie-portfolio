"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

const ARRIVED = "walk:arrived";
const TONES: Record<string, string> = {
  mint: "var(--color-mint)",
  burgundy: "var(--color-burgundy)",
  cloud: "var(--color-cloud-2)",
};

/**
 * Walking into a project: the screenshot you clicked grows until it fills the
 * screen, the case study loads underneath it, and the screenshot fades away.
 *
 * It's still a real link. Modified clicks, middle clicks, keyboard users who
 * prefer reduced motion and crawlers all get an ordinary navigation.
 */
export function WalkLink({
  href,
  tone,
  desktop,
  phone,
  className,
  children,
  ...rest
}: {
  href: string;
  tone: string;
  desktop: string;
  phone: string;
  className?: string;
  children: ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const router = useRouter();
  const ref = useRef<HTMLAnchorElement>(null);

  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // grow out of the picture inside this card, wherever the visitor clicked in it
    const card = ref.current?.closest("[data-walk]");
    const pic = card?.querySelector<HTMLElement>(
      window.innerWidth < 900 ? "[data-walk-from='phone']" : "[data-walk-from='desktop']"
    );
    if (!pic) return;
    e.preventDefault();

    const r = pic.getBoundingClientRect();
    const W = window.innerWidth;
    const s = r.width / W;

    const layer = document.createElement("div");
    layer.className = "walk";
    layer.style.background = TONES[tone] ?? TONES.cloud!;
    const img = document.createElement("img");
    // reuse the exact file already on screen, so nothing has to download mid-animation
    img.src = pic.querySelector("img")?.currentSrc || (W < 900 ? phone : desktop);
    img.alt = "";
    layer.appendChild(img);
    document.body.appendChild(layer);

    const grow = layer.animate(
      [
        { transform: `translate(${r.left}px, ${r.top}px) scale(${s})`, borderRadius: `${16 / s}px` },
        { transform: "none", borderRadius: "0px" },
      ],
      { duration: 680, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "forwards" }
    );

    let done = false;
    const finish = async () => {
      if (done) return;
      done = true;
      await grow.finished.catch(() => undefined);
      const fade = layer.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 380,
        easing: "ease-out",
        fill: "forwards",
      });
      fade.finished.finally(() => layer.remove());
    };
    window.addEventListener(ARRIVED, finish, { once: true });
    window.setTimeout(finish, 5000); // never leave the screen covered

    window.setTimeout(() => router.push(href), 420);
  }

  return (
    <Link
      ref={ref}
      href={href}
      className={className}
      onClick={onClick}
      onPointerEnter={() => router.prefetch(href)}
      {...rest}
    >
      {children}
    </Link>
  );
}

/** Placed on the case study: tells the walk layer the page underneath is ready. */
export function WalkArrival() {
  useEffect(() => {
    window.dispatchEvent(new Event(ARRIVED));
  }, []);
  return null;
}
