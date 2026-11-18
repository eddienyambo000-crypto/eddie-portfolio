"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAME, NAV, WA_HELLO } from "@/lib/site";
import { KigaliClock } from "@/components/KigaliClock";

export function Header() {
  const pathname = usePathname();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) menuBtn.current?.focus();
  }, []);

  // while the menu is open the page behind it is inert and doesn't scroll
  useEffect(() => {
    const page = document.querySelectorAll<HTMLElement>("main, footer");
    page.forEach((el) => (el.inert = open));
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      page.forEach((el) => (el.inert = false));
      document.documentElement.style.overflow = "";
    };
  }, [open, close]);

  // a link inside the menu navigates: close without stealing focus back
  useEffect(() => close(false), [pathname, close]);

  return (
    <>
      <header className={`hdr${stuck ? " is-stuck" : ""}`}>
        <div className="wrap hdr__in">
          <Link href="/" className="brand" aria-label={`${NAME}, home`}>
            <span className="brand__mark" aria-hidden="true">
              EN
            </span>
            <span>{NAME}</span>
          </Link>

          <nav className="nav" aria-label="Main">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={n.href === pathname ? "page" : undefined}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <KigaliClock />
            <button
              ref={menuBtn}
              type="button"
              className="menu-btn"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen(true)}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        className="sheet on-dark"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
      >
        <div className="sheet__top">
          <span className="brand">
            <span className="brand__mark" aria-hidden="true" style={{ background: "var(--color-mint)", color: "var(--color-burgundy-ink)" }}>
              EN
            </span>
            {NAME}
          </span>
          <button type="button" className="sheet__close" onClick={() => close()}>
            Close
          </button>
        </div>
        <nav className="sheet__nav" aria-label="Menu">
          {NAV.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              ref={i === 0 ? firstLink : undefined}
              style={{ ["--i" as string]: i }}
              onClick={() => close(false)}
            >
              <small>{String(i + 1).padStart(2, "0")}</small>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="sheet__foot">
          <a className="btn btn-primary" href={WA_HELLO} target="_blank" rel="noopener noreferrer">
            WhatsApp me
          </a>
        </div>
      </div>
    </>
  );
}
