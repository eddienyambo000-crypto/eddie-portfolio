"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CITY, EMAIL, NAME, ROLE, WA_DEFAULT, WHATSAPP_PRETTY } from "@/lib/site";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * A single rule across the top with the masthead and four words. No dock, no
 * palette, no sticky CTA — on a six-page site they are furniture.
 *
 * The homepage is its own masthead, so the header hides there and appears as
 * you leave it.
 */
export function SiteHeader() {
  const path = usePathname() || "/";
  const onIndex = path === "/";
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);

  if (onIndex) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-stone-2 bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-[var(--gutter)] py-4">
        <Link href="/" className="group flex items-baseline gap-3" aria-label={`${NAME} — index`}>
          <span className="structural text-[1.05rem] text-ink">{NAME}</span>
          <span className="label hidden sm:inline">Index</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => {
            const active = path.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-1 text-[0.95rem] transition-colors duration-200 ${
                  active ? "text-ink" : "text-ink-80 hover:text-ink"
                }`}
              >
                {n.label}
                {active && (
                  <span aria-hidden className="absolute inset-x-0 -bottom-px h-px bg-vermilion" />
                )}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="label -mr-2 min-h-[44px] px-2 text-ink md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-stone-2 px-[var(--gutter)] pb-5 pt-2 md:hidden"
        >
          {NAV.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              className="flex items-baseline gap-4 border-b border-stone-2 py-4 last:border-0"
            >
              <span className="label tnum">{String(i + 1).padStart(2, "0")}</span>
              <span className="display text-[1.6rem] text-ink">{n.label}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-[var(--space-section)] border-t border-stone-2">
      <div className="mx-auto max-w-[1440px] px-[var(--gutter)] py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="structural text-[1.3rem] text-ink">{NAME}</div>
            <p className="label mt-2">
              {ROLE} / {CITY}
            </p>
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed">
              Available for new work. The fastest way to reach me is WhatsApp.
            </p>
          </div>

          <nav aria-label="Site">
            <div className="label">Index</div>
            <ul className="mt-4 space-y-1.5 text-[0.95rem]">
              {[...NAV, { href: "/system", label: "Live demo" }].map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="rule-link py-1">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <div className="label">Contact</div>
            <ul className="mt-4 space-y-1.5 text-[0.95rem]">
              <li>
                <a
                  href={WA_DEFAULT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rule-link py-1"
                >
                  {WHATSAPP_PRETTY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="rule-link py-1">
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="label mt-14 flex flex-col gap-2 border-t border-stone-2 pt-6 sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {NAME}
          </span>
          <span>Built in Kigali</span>
        </div>
      </div>
    </footer>
  );
}
