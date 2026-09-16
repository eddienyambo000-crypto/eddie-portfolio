"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Command,
  Copy,
  Home,
  Layers,
  Mail,
  MessageCircle,
  PlayCircle,
  Search,
  Send,
  X,
} from "lucide-react";
import { CALENDAR, EMAIL, NAME, WA_DEFAULT, WHATSAPP_PRETTY } from "@/lib/site";

/** One nav model drives the desktop rail, the mobile dock and the palette. */
const NAV = [
  { href: "/", label: "Home", Icon: Home, keywords: "start launcher main" },
  { href: "/system", label: "Demo", Icon: PlayCircle, keywords: "see it working live system whatsapp agent chat" },
  { href: "/work", label: "Work", Icon: Briefcase, keywords: "projects portfolio case studies clients receipts" },
  { href: "/services", label: "Services", Icon: Layers, keywords: "pricing price cost offer packages what i build guarantee" },
  { href: "/contact", label: "Talk", Icon: MessageCircle, keywords: "contact hire start build teardown form" },
];

/** "⌘K" on Apple devices, "Ctrl K" everywhere else. Decided after mount. */
function useShortcutLabel() {
  const [label, setLabel] = useState("Ctrl K");
  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) setLabel("⌘K");
  }, []);
  return label;
}

function useActive() {
  const path = usePathname() || "/";
  return useCallback(
    (href: string) => (href === "/" ? path === "/" : path.startsWith(href)),
    [path]
  );
}

/* ───────────────────────────── desktop rail ────────────────────────────── */

export function TopRail({ onOpenPalette }: { onOpenPalette: () => void }) {
  const isActive = useActive();
  const shortcut = useShortcutLabel();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid ? "border-b border-line bg-ink/85 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label={`${NAME} — home`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-[10px] border border-line bg-ink-3 font-mono text-[0.72rem] font-medium tracking-tight text-amber transition-colors duration-300 group-hover:border-amber-dim">
            EN
          </span>
          <span className="font-display text-[1.06rem] text-ivory">{NAME}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.slice(1).map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-lg px-3.5 py-2 text-[0.9rem] transition-colors duration-200 ${
                  active ? "text-ivory" : "text-muted hover:text-ivory"
                }`}
              >
                {label}
                {active && (
                  <motion.span
                    layoutId="rail-active"
                    className="absolute inset-x-3 -bottom-px h-px bg-amber"
                    transition={{ type: "spring", stiffness: 420, damping: 38 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenPalette}
            className="hidden items-center gap-2 rounded-lg border border-line bg-ink-2 px-3 py-2 font-mono text-[0.72rem] text-faint transition-colors duration-200 hover:border-amber-dim hover:text-muted lg:flex"
            aria-label="Open command menu"
          >
            <Search size={13} aria-hidden />
            Jump to
            <kbd className="ml-1 rounded border border-line bg-ink px-1.5 py-0.5 text-[0.65rem]">
              {shortcut}
            </kbd>
          </button>
          <a
            href={WA_DEFAULT}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary !min-h-[42px] !px-4 !text-[0.87rem]"
          >
            Free teardown
          </a>
        </div>
      </div>
    </header>
  );
}

/* ──────────────────────────── mobile app dock ──────────────────────────── */

export function Dock() {
  const isActive = useActive();
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/92 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-between px-2">
        {NAV.map(({ href, label, Icon }) => {
          const active = isActive(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 transition-colors duration-200 ${
                  active ? "text-amber" : "text-faint"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="dock-active"
                    className="absolute inset-x-3 top-0 h-px bg-amber"
                    transition={{ type: "spring", stiffness: 420, damping: 38 }}
                  />
                )}
                <Icon size={19} strokeWidth={1.8} aria-hidden />
                <span className="text-[0.66rem] font-medium tracking-wide">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ──────────────────────────── command palette ──────────────────────────── */

type Action = {
  id: string;
  label: string;
  hint: string;
  keywords?: string;
  Icon: typeof Home;
  href?: string;
  external?: boolean;
  run?: () => void;
};

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const shortcut = useShortcutLabel();
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const [copied, setCopied] = useState(false);

  const actions: Action[] = useMemo(
    () => [
      ...NAV.map(({ href, label, Icon, keywords }) => ({
        id: href,
        label: label === "Home" ? "Home screen" : label,
        hint: "Go to",
        keywords,
        Icon,
        href,
      })),
      {
        id: "about",
        label: "About Eddie",
        hint: "Go to",
        keywords: "who bio engineer story",
        Icon: Home,
        href: "/about",
      },
      {
        id: "wa",
        label: "WhatsApp me now",
        hint: WHATSAPP_PRETTY,
        keywords: "chat message contact phone",
        Icon: Send,
        href: WA_DEFAULT,
        external: true,
      },
      {
        id: "call",
        label: "Book a free teardown call",
        hint: "30 minutes",
        keywords: "calendar meeting audit schedule",
        Icon: PlayCircle,
        href: CALENDAR,
        external: true,
      },
      {
        id: "mail",
        label: "Email me",
        hint: EMAIL,
        Icon: Mail,
        href: `mailto:${EMAIL}`,
        external: true,
      },
      {
        id: "copy",
        label: copied ? "Copied to clipboard" : "Copy my number",
        hint: WHATSAPP_PRETTY,
        Icon: Copy,
        run: () => {
          navigator.clipboard?.writeText(WHATSAPP_PRETTY);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        },
      },
    ],
    [copied]
  );

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return actions;
    return actions.filter((a) =>
      `${a.label} ${a.hint} ${a.keywords || ""}`.toLowerCase().includes(term)
    );
  }, [q, actions]);

  useEffect(() => setI(0), [q]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      setQ("");
    };
  }, [open]);

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setI((v) => (v + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setI((v) => (v - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const a = results[i];
      if (!a) return;
      if (a.run) return a.run();
      if (a.href) {
        if (a.external) window.open(a.href, "_blank", "noopener");
        else router.push(a.href);
        onClose();
      }
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div
            className="absolute inset-0 bg-ink/78 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="panel-raised relative w-full max-w-lg overflow-hidden"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search size={16} className="text-faint" aria-hidden />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKey}
                placeholder="Where do you want to go?"
                aria-label="Search"
                className="h-14 flex-1 bg-transparent text-[0.95rem] text-ivory outline-none placeholder:text-faint"
              />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="grid h-8 w-8 place-items-center rounded-lg text-faint transition-colors hover:text-ivory"
              >
                <X size={15} aria-hidden />
              </button>
            </div>

            <ul className="no-bar max-h-[52vh] overflow-y-auto p-2">
              {results.map((a, idx) => {
                const A = a.Icon;
                const sel = idx === i;
                const inner = (
                  <>
                    <A size={16} className={sel ? "text-amber" : "text-faint"} aria-hidden />
                    <span className={sel ? "text-ivory" : "text-muted"}>{a.label}</span>
                    <span className="ml-auto font-mono text-[0.68rem] text-faint">{a.hint}</span>
                    {a.external && <ArrowUpRight size={13} className="text-faint" aria-hidden />}
                  </>
                );
                const cls = `flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[0.9rem] transition-colors duration-150 ${
                  sel ? "bg-ink-4" : "hover:bg-ink-3"
                }`;
                return (
                  <li key={a.id} onMouseEnter={() => setI(idx)}>
                    {a.run ? (
                      <button className={cls} onClick={a.run}>
                        {inner}
                      </button>
                    ) : a.external ? (
                      <a
                        className={cls}
                        href={a.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                      >
                        {inner}
                      </a>
                    ) : (
                      <Link className={cls} href={a.href!} onClick={onClose}>
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
              {!results.length && (
                <li className="px-3 py-6 text-center text-[0.88rem] text-faint">
                  Nothing matches that. Try &ldquo;work&rdquo; or &ldquo;price&rdquo;.
                </li>
              )}
            </ul>

            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[0.66rem] text-faint">
              <span className="flex items-center gap-1.5">
                <Command size={11} aria-hidden /> {shortcut} to open
              </span>
              <span>↑↓ move</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ───────────────────────────── the whole shell ─────────────────────────── */

export function Shell() {
  const [open, setOpen] = useState(false);
  const inAdmin = (usePathname() || "").startsWith("/admin");

  useEffect(() => {
    if (inAdmin) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inAdmin]);

  // the admin has its own header; the public nav would sit on top of it
  if (inAdmin) return null;

  return (
    <>
      <TopRail onOpenPalette={() => setOpen(true)} />
      <Dock />
      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </>
  );
}
