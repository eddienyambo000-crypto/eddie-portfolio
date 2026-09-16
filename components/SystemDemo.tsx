"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import {
  BellRing,
  Brain,
  CalendarCheck,
  Database,
  Inbox,
  RotateCcw,
  Send,
} from "lucide-react";

/**
 * The demo that replaces a sales pitch.
 *
 * A real customer message arrives at 22:41 and the system handles it end to
 * end: answers, qualifies, quotes, books, stores the record and schedules the
 * reminder — while the owner is asleep. The visitor can also type their own
 * question; a small rule-based brain answers so the demo never needs an API
 * key or a backend to stay alive.
 */

type Msg = { id: number; from: "customer" | "agent"; text: string; at: string };

const STAGES = [
  { key: "capture", label: "Capture", note: "Message received", Icon: Inbox },
  { key: "understand", label: "Understand", note: "Intent + vehicle read", Icon: Brain },
  { key: "quote", label: "Quote", note: "Price and slots offered", Icon: CalendarCheck },
  { key: "book", label: "Book", note: "Slot locked", Icon: Database },
  { key: "remember", label: "Remember", note: "Reminder scheduled", Icon: BellRing },
] as const;

/** [delay before showing, who, text, stage index this step completes] */
const SCRIPT: [number, Msg["from"], string, string, number][] = [
  [600, "customer", "Muraho, do you do full car service? How much?", "22:41", 0],
  [1500, "agent", "Muraho! Yes — a full service is RWF 45,000 and takes about 3 hours. We're in Kimironko, open 8am to 6pm. Which car do you drive?", "22:41", 1],
  [1800, "customer", "Toyota RAV4, 2018", "22:42", 1],
  [1500, "agent", "Perfect. For a 2018 RAV4 that's RWF 45,000 — oil, filters, brakes and a 20-point check. I have tomorrow 9:00 or Thursday 14:00 open. Which suits you?", "22:42", 2],
  [1900, "customer", "Tomorrow 9am", "22:43", 2],
  [1400, "agent", "Locked in. Tomorrow 9:00, full service, RAV4 2018. What name and number should I put on the booking?", "22:43", 3],
  [2000, "customer", "Eric — 0788 123 456", "22:44", 3],
  [1500, "agent", "Thanks Eric, you're booked. I'll send you a reminder tonight and again an hour before. See you at 9:00.", "22:44", 4],
];

const CRM_STEPS = [
  { at: 2, field: "Service", value: "Full service" },
  { at: 3, field: "Vehicle", value: "Toyota RAV4 2018" },
  { at: 5, field: "Slot", value: "Tomorrow 09:00" },
  { at: 7, field: "Customer", value: "Eric · 0788 123 456" },
  { at: 8, field: "Value", value: "RWF 45,000" },
];

/** Tiny keyword brain so a visitor's own question still gets a real answer. */
function reply(input: string): string {
  const t = input.toLowerCase();
  // whole-word match, so "hi" does not fire on "which" or "this"
  const has = (...w: string[]) =>
    w.some((x) => new RegExp(`(^|[^a-z])${x}([^a-z]|$)`).test(t));

  if (has("price", "prices", "how much", "cost", "costs", "amafaranga", "angahe"))
    return "A full service is RWF 45,000 and takes about 3 hours. Brake pads, tyres and diagnostics are quoted separately — tell me what the car is doing and I'll price it.";
  if (has("open", "hours", "time", "close"))
    return "We're open 8:00 to 18:00, Monday to Saturday. This chat answers any hour — I book you in and the team sees it when they open.";
  if (has("where", "location", "address", "aho"))
    return "We're in Kimironko, just behind the market. I can send you a pin on WhatsApp once you're booked.";
  if (has("book", "booking", "appointment", "tomorrow", "today", "slot", "come"))
    return "I can do tomorrow 09:00 or Thursday 14:00. Tell me which one and your name, and it's locked.";
  if (has("hello", "hi", "muraho", "hey", "bite"))
    return "Muraho! I'm the garage's assistant — I run all night. What does your car need?";
  if (has("thanks", "thank", "murakoze", "ok", "cool"))
    return "Murakoze! You'll get a reminder tonight and an hour before. Anything else?";
  if (has("tow", "stuck", "broken", "won't start", "battery"))
    return "That sounds urgent. I'm flagging this to the owner right now and he'll call you — meanwhile, where is the car?";
  return "Good question. I've noted it and flagged the owner so he replies with the exact answer in the morning — and I've kept your details so nothing gets lost. Anything else you need tonight?";
}

export function SystemDemo() {
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { once: true, margin: "-18% 0px" });
  const still = useReducedMotion();

  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [step, setStep] = useState(0);
  const [stage, setStage] = useState(-1);
  const [typing, setTyping] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [input, setInput] = useState("");
  const [interrupted, setInterrupted] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const nextId = useRef(0);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const push = useCallback((from: Msg["from"], text: string, at: string) => {
    setMsgs((m) => [...m, { id: nextId.current++, from, text, at }]);
  }, []);

  /* play the script, one beat at a time */
  useEffect(() => {
    if (!playing || step >= SCRIPT.length) return;

    // only this beat's timers get cleaned up — a reply the visitor triggered
    // must survive the re-render that cancels playback
    const mine: ReturnType<typeof setTimeout>[] = [];
    const [delay, from, text, at, st] = SCRIPT[step];

    if (from === "agent") mine.push(setTimeout(() => setTyping(true), 260));
    mine.push(
      setTimeout(
        () => {
          setTyping(false);
          push(from, text, at);
          setStage((s) => Math.max(s, st));
          setStep((s) => s + 1);
        },
        still ? 120 : delay
      )
    );

    timers.current.push(...mine);
    return () => mine.forEach(clearTimeout);
  }, [playing, step, push, still]);

  /* never leave a timer running behind an unmounted demo */
  useEffect(() => () => clearTimers(), []);

  useEffect(() => {
    if (inView && !playing && step === 0) setPlaying(true);
  }, [inView, playing, step]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  function restart() {
    clearTimers();
    setMsgs([]);
    setStep(0);
    setStage(-1);
    setTyping(false);
    setInterrupted(false);
    nextId.current = 0;
    setPlaying(true);
  }

  function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    clearTimers();
    if (step < SCRIPT.length) setInterrupted(true);
    setPlaying(false);
    setStep(SCRIPT.length);
    setStage(4);
    setInput("");
    const now = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());
    push("customer", text, now);
    setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      push("agent", reply(text), now);
    }, 900);
    timers.current.push(t);
  }

  const done = step >= SCRIPT.length;

  return (
    <div ref={wrap} className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-6">
      {/* ─────────────────── the conversation ─────────────────── */}
      <div className="panel flex h-[540px] flex-col overflow-hidden lg:h-auto lg:min-h-[580px]">
        <div className="flex items-center gap-3 border-b border-line bg-ink-3 px-4 py-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-amber font-mono text-[0.7rem] font-semibold text-[#17110a]">
            KA
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[0.9rem] font-medium text-ivory">Kivu Auto Garage</div>
            <div className="flex items-center gap-1.5 font-mono text-[0.66rem] text-live">
              <span className="dot-live" aria-hidden />
              online · replies in 5s
            </div>
          </div>
          <button
            onClick={restart}
            className="flex min-h-[38px] items-center gap-1.5 rounded-lg border border-line px-2.5 font-mono text-[0.66rem] text-muted transition-colors duration-200 hover:border-amber-dim hover:text-ivory"
          >
            <RotateCcw size={12} aria-hidden />
            Replay
          </button>
        </div>

        {/* absolute scroller inside a relative flex child: the only pattern that
            scrolls reliably everywhere while letting the panel stretch */}
        <div className="relative min-h-0 flex-1">
        <div
          ref={scroller}
          className="no-bar absolute inset-0 space-y-2.5 overflow-y-auto bg-[linear-gradient(180deg,#0f0d0c,#0a0908)] px-4 py-4"
          aria-live="polite"
        >
          <div className="mx-auto w-max rounded-full bg-ink-3 px-3 py-1 font-mono text-[0.62rem] text-faint">
            Tonight · 22:41 · the owner is asleep
          </div>

          <AnimatePresence initial={false}>
            {msgs.map((m) => (
              <motion.div
                key={m.id}
                initial={still ? false : { opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                className={`flex ${m.from === "customer" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[0.87rem] leading-[1.55] ${
                    m.from === "customer"
                      ? "rounded-tl-sm bg-ink-3 text-ivory"
                      : "rounded-tr-sm bg-amber text-[#17110a]"
                  }`}
                >
                  {m.text}
                  <span
                    className={`mt-1 block text-right font-mono text-[0.6rem] ${
                      m.from === "customer" ? "text-faint" : "text-[#6b4a1d]"
                    }`}
                  >
                    {m.at}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {typing && (
            <div className="flex justify-end">
              <div className="flex gap-1 rounded-2xl rounded-tr-sm bg-amber/25 px-3.5 py-3">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-amber"
                    animate={still ? {} : { opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.16 }}
                  />
                ))}
              </div>
            </div>
          )}

          {done && !interrupted && (
            <div className="mx-auto w-max rounded-full border border-line bg-ink-2 px-3 py-1 font-mono text-[0.62rem] text-live">
              Booked in 3 minutes. The owner found out in the morning.
            </div>
          )}
        </div>
        </div>

        <form onSubmit={send} className="flex items-center gap-2 border-t border-line bg-ink-2 p-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Your turn — ask it anything"
            aria-label="Send a message to the demo agent"
            className="h-11 min-w-0 flex-1 rounded-xl border border-line bg-ink px-3.5 text-[0.88rem] text-ivory outline-none transition-colors duration-200 placeholder:text-faint focus:border-amber-dim"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-amber text-[#17110a] transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <Send size={16} aria-hidden />
          </button>
        </form>
      </div>

      {/* ─────────────────── the machine behind it ─────────────────── */}
      <div className="flex flex-col gap-4">
        <div className="panel p-5 lg:p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-faint">
              What the system is doing
            </span>
            <span className="font-mono text-[0.66rem] text-faint">
              {Math.max(0, stage + 1)}/{STAGES.length}
            </span>
          </div>

          <ol className="mt-5 space-y-1">
            {STAGES.map((s, i) => {
              const active = i <= stage;
              const current = i === stage;
              const S = s.Icon;
              return (
                <li key={s.key} className="relative flex gap-3.5 pb-4 last:pb-0">
                  {/* connector */}
                  {i < STAGES.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute left-[17px] top-9 h-[calc(100%-22px)] w-px overflow-hidden bg-line"
                    >
                      <span
                        className={`block h-full w-full origin-top bg-amber transition-transform duration-700 [transition-timing-function:var(--ease-out-soft)] ${
                          i < stage ? "scale-y-100" : "scale-y-0"
                        }`}
                      />
                    </span>
                  )}
                  <span
                    className={`relative z-10 grid h-[35px] w-[35px] flex-none place-items-center rounded-xl border transition-colors duration-500 ${
                      active
                        ? "border-amber-dim bg-amber/12 text-amber"
                        : "border-line bg-ink-2 text-faint"
                    }`}
                  >
                    <S size={15} strokeWidth={1.8} aria-hidden />
                    {current && !still && (
                      <motion.span
                        className="absolute inset-0 rounded-xl border border-amber"
                        animate={{ opacity: [0.9, 0.15, 0.9] }}
                        transition={{ duration: 1.9, repeat: Infinity }}
                      />
                    )}
                  </span>
                  <div className="min-w-0 pt-1">
                    <div
                      className={`text-[0.92rem] transition-colors duration-500 ${
                        active ? "text-ivory" : "text-faint"
                      }`}
                    >
                      {s.label}
                    </div>
                    <div className="font-mono text-[0.68rem] text-faint">{s.note}</div>
                  </div>
                  {active && (
                    <span className="ml-auto self-start pt-1.5 font-mono text-[0.62rem] text-live">
                      done
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        {/* the record it wrote by itself */}
        <div className="panel flex-1 p-5 lg:p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-faint">
              The record it wrote for you
            </span>
            <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[0.6rem] text-faint">
              CRM
            </span>
          </div>

          <dl className="mt-4 divide-y divide-line-soft">
            {CRM_STEPS.map((row) => {
              const filled = step >= row.at;
              return (
                <div key={row.field} className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-faint">
                    {row.field}
                  </dt>
                  <dd className="text-right text-[0.88rem]">
                    {filled ? (
                      <motion.span
                        initial={still ? false : { opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-ivory"
                      >
                        {row.value}
                      </motion.span>
                    ) : (
                      <span className="font-mono text-faint">
                        <span className="animate-caret">_</span>
                      </span>
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>

          <AnimatePresence>
            {stage >= 4 && (
              <motion.div
                initial={still ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="edge-top mt-4 rounded-xl border border-line bg-ink-3 p-3.5"
              >
                <div className="flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-live">
                  <BellRing size={12} aria-hidden />
                  Sent to the owner · 07:00
                </div>
                <p className="mt-1.5 text-[0.86rem] text-ivory">
                  New booking while you slept: Eric, RAV4 2018, full service, today 09:00, RWF
                  45,000. Reminder already sent to him.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
