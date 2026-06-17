"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { wa } from "@/lib/site";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-[100] backdrop-blur-md transition-[box-shadow,border-color] duration-300 ${
        scrolled ? "border-b border-mocha-line shadow-[var(--shadow-soft)]" : "border-b border-transparent"
      }`}
      style={{ background: "rgba(250,247,241,0.78)" }}
    >
      <div className="mx-auto flex h-[70px] max-w-[1140px] items-center justify-between px-6">
        <a href="#home" className="flex items-center gap-2.5 font-display text-[1.16rem] font-extrabold text-espresso">
          <span className="grid h-[34px] w-[34px] place-items-center rounded-[10px] bg-gradient-to-br from-caramel to-caramel-deep font-sans text-[0.85rem] font-bold text-white shadow-[0_6px_16px_rgba(176,122,75,0.25)]">
            EN
          </span>
          Eddie Nyambo
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-[0.92rem] font-medium text-coffee transition-colors hover:text-espresso"
            >
              {l.label}
              <span className="absolute -bottom-[5px] left-0 h-[2px] w-0 bg-caramel transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#offer"
            className="rounded-[11px] bg-gradient-to-br from-caramel to-caramel-deep px-5 py-2.5 text-[0.88rem] font-semibold text-white shadow-[0_12px_28px_rgba(176,122,75,0.18)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Get a Free Teardown
          </a>
        </div>

        <button
          className="grid place-items-center p-2 text-espresso md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-b border-mocha-line bg-cream px-6 pb-5 pt-3.5 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-mocha-line py-2.5 font-medium text-coffee">
              {l.label}
            </a>
          ))}
          <a href="#offer" onClick={() => setOpen(false)} className="border-b border-mocha-line py-2.5 font-medium text-coffee">
            The Offer
          </a>
          <a href={wa("Hi Eddie, I want an automated system for my business.")} target="_blank" rel="noopener" onClick={() => setOpen(false)} className="py-2.5 font-medium text-coffee">
            WhatsApp Me
          </a>
        </div>
      )}
    </nav>
  );
}
