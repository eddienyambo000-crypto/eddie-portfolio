"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingDown } from "lucide-react";
import { wa } from "@/lib/site";

/**
 * The money-leak estimate.
 *
 * Nobody buys "automation". They buy back the customers they are already
 * losing. This turns the visitor's own three numbers into a figure they feel,
 * then hands that figure to WhatsApp so the first message is already a
 * qualified conversation instead of "hi".
 *
 * The capture rates below are deliberate, conservative round numbers and the
 * UI says out loud that it is an estimate — this is a thinking tool, not a
 * promise.
 */

const SPEEDS = [
  { key: "instant", label: "Within minutes", rate: 0.3 },
  { key: "hour", label: "Within an hour", rate: 0.2 },
  { key: "day", label: "Later the same day", rate: 0.12 },
  { key: "late", label: "Next day or later", rate: 0.06 },
] as const;

/** What a system that answers instantly and always follows up can hold on to. */
const SYSTEM_RATE = 0.3;

const rwf = (n: number) =>
  "RWF " + Math.round(n).toLocaleString("en-US", { maximumFractionDigits: 0 });

export function LeakCalculator() {
  const [leads, setLeads] = useState(20);
  const [value, setValue] = useState(60000);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]["key"]>("day");

  const out = useMemo(() => {
    const current = SPEEDS.find((s) => s.key === speed)!;
    const monthlyLeads = leads * 4.33;
    const nowCustomers = monthlyLeads * current.rate;
    const systemCustomers = monthlyLeads * SYSTEM_RATE;
    const extra = Math.max(0, systemCustomers - nowCustomers);
    const monthly = extra * value;
    const build = 450_000;
    const paybackDays = monthly > 0 ? Math.ceil(build / (monthly / 30)) : null;
    return {
      monthly,
      yearly: monthly * 12,
      extra,
      nowCustomers,
      systemCustomers,
      paybackDays,
      isCurrentBest: current.key === "instant",
    };
  }, [leads, value, speed]);

  const waText = wa(
    `Hi Eddie. I ran the numbers on your site: about ${leads} people ask about my business each week, a customer is worth around ${rwf(
      value
    )} to me, and right now I reply ${SPEEDS.find((s) => s.key === speed)!.label.toLowerCase()}. It says I'm leaving roughly ${rwf(
      out.monthly
    )} a month on the table. Can you look at my setup?`
  );

  return (
    <div className="border border-stone-2 bg-paper grid gap-0 overflow-hidden lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]">
      {/* ── inputs ── */}
      <div className="border-b border-stone-2 p-6 lg:border-b-0 lg:border-r lg:p-8">
        <span className="font-grotesk text-[0.66rem] uppercase tracking-[0.18em] text-stone">
          Your three numbers
        </span>

        <div className="mt-7 space-y-8">
          <Field
            id="leads"
            label="People who ask about your business each week"
            display={`${leads}${leads >= 200 ? "+" : ""}`}
          >
            <input
              id="leads"
              type="range"
              min={5}
              max={200}
              step={5}
              value={leads}
              onChange={(e) => setLeads(+e.target.value)}
              className="range"
            />
          </Field>

          <Field id="value" label="What one customer is worth to you" display={rwf(value)}>
            <input
              id="value"
              type="range"
              min={10000}
              max={1000000}
              step={10000}
              value={value}
              onChange={(e) => setValue(+e.target.value)}
              className="range"
            />
          </Field>

          <fieldset>
            <legend className="text-[0.92rem] text-ink">How fast do you usually reply?</legend>
            <div className="mt-3.5 grid grid-cols-2 gap-2">
              {SPEEDS.map((s) => {
                const on = s.key === speed;
                return (
                  <button
                    key={s.key}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setSpeed(s.key)}
                    className={`min-h-[46px] rounded-xl border px-3 py-2 text-left text-[0.84rem] transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98] ${
                      on
                        ? "border-ink bg-paper-2 text-ink"
                        : "border-stone-2 bg-paper text-ink-80 hover:border-ink hover:text-ink"
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>
      </div>

      {/* ── the number that hurts ── */}
      <div className="relative flex flex-col justify-between bg-paper-2 p-6 lg:p-8">
        <div>
          <span className="flex items-center gap-2 font-grotesk text-[0.66rem] uppercase tracking-[0.18em] text-vermilion-ink">
            <TrendingDown size={12} aria-hidden />
            Estimated leak
          </span>

          {out.isCurrentBest ? (
            <>
              <p className="mt-6 display text-[clamp(1.7rem,4vw,2.3rem)] leading-tight text-ink">
                You already reply fast. Respect.
              </p>
              <p className="mt-4 text-[0.95rem]">
                Then the money is not in speed, it is in follow-up and in the hours you spend
                being the machine. That is the next thing to fix, and it is the cheaper half.
              </p>
            </>
          ) : (
            <>
              <motion.p
                key={Math.round(out.monthly)}
                initial={{ opacity: 0.55, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="tnum mt-6 display text-[clamp(2.2rem,6.4vw,3.6rem)] leading-none text-ink"
              >
                {rwf(out.monthly)}
              </motion.p>
              <p className="mt-2.5 text-[0.95rem]">
                walking away every month, on your own numbers. That is{" "}
                <span className="tnum text-ink">{rwf(out.yearly)}</span> a year.
              </p>

              <dl className="mt-7 space-y-2.5 border-t border-stone-2 pt-5 text-[0.87rem]">
                <Row
                  k="Customers you close now"
                  v={`${out.nowCustomers.toFixed(0)} / month`}
                />
                <Row
                  k="With instant replies + follow-up"
                  v={`${out.systemCustomers.toFixed(0)} / month`}
                  accent
                />
                {out.paybackDays !== null && out.paybackDays < 400 && (
                  <Row
                    k="A RWF 450,000 build pays for itself in"
                    v={`${out.paybackDays} days`}
                    accent
                  />
                )}
              </dl>
            </>
          )}
        </div>

        <div className="mt-8">
          <a href={waText} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
            Show Eddie these numbers
            <ArrowRight size={16} aria-hidden />
          </a>
          <p className="mt-3 text-center font-grotesk text-[0.64rem] leading-relaxed text-stone">
            An estimate from your inputs, not a promise. It opens WhatsApp with your numbers
            already written.
          </p>
        </div>
      </div>

      <style jsx>{`
        .range {
          width: 100%;
          height: 28px;
          background: transparent;
          -webkit-appearance: none;
          appearance: none;
          cursor: pointer;
        }
        .range::-webkit-slider-runnable-track {
          height: 4px;
          border-radius: 99px;
          background: var(--color-stone-2);
        }
        .range::-moz-range-track {
          height: 4px;
          border-radius: 99px;
          background: var(--color-stone-2);
        }
        .range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          margin-top: -10px;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: var(--color-ink);
          border: 4px solid var(--color-paper);
          box-shadow: 0 0 0 1px var(--color-ink);
          transition: transform 180ms var(--ease-spring);
        }
        .range::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: var(--color-ink);
          border: 4px solid var(--color-paper);
          box-shadow: 0 0 0 1px var(--color-ink);
        }
        .range:active::-webkit-slider-thumb {
          transform: scale(1.12);
        }
      `}</style>
    </div>
  );
}

function Field({
  id,
  label,
  display,
  children,
}: {
  id: string;
  label: string;
  display: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[0.92rem] text-ink">
          {label}
        </label>
        <span className="tnum flex-none whitespace-nowrap font-grotesk text-[0.95rem] text-vermilion-ink">{display}</span>
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Row({ k, v, accent = false }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt>{k}</dt>
      <dd className={`tnum flex-none font-grotesk ${accent ? "text-vermilion-ink" : "text-ink"}`}>{v}</dd>
    </div>
  );
}
