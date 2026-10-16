"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2, Send } from "lucide-react";
import { cmsReady, supabase } from "@/lib/supabase";
import { wa } from "@/lib/site";

/**
 * Save first, then hand off.
 *
 * The lead is written down before the visitor is sent anywhere, so a failed
 * WhatsApp hop or a closed tab never costs Eddie the enquiry. If Supabase is
 * not configured the same payload goes to Formspree instead.
 */

const FORMSPREE = "https://formspree.io/f/xyknykdz";

const NEEDS = [
  "A website that actually sells",
  "A WhatsApp agent that answers for me",
  "Follow-up so leads stop going cold",
  "Automate my daily operations",
  "Not sure yet — show me the teardown",
];

type State = "idle" | "saving" | "done" | "error";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [err, setErr] = useState("");
  const [bad, setBad] = useState<{ name?: string; phone?: string }>({});
  const [form, setForm] = useState({
    name: "",
    business: "",
    phone: "",
    email: "",
    need: NEEDS[4],
    message: "",
  });

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (k === "name" || k === "phone") setBad((b) => ({ ...b, [k]: undefined }));
  };

  function validate() {
    const next: typeof bad = {};
    if (form.name.trim().length < 2) next.name = "Tell me what to call you.";
    if (form.phone.replace(/\D/g, "").length < 9)
      next.phone = "I need a WhatsApp number I can reply on — at least 9 digits.";
    setBad(next);
    const first = (Object.keys(next) as (keyof typeof next)[])[0];
    if (first) document.getElementById(first)?.focus();
    return !first;
  }

  const waHandoff = wa(
    `Hi Eddie, I'm ${form.name || "…"}${form.business ? ` from ${form.business}` : ""}. I just sent the form on your site. What I need: ${form.need}.${
      form.message ? ` ${form.message}` : ""
    }`
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "saving") return;
    if (!validate()) return;
    setState("saving");
    setErr("");

    // Composed into the existing pf_leads columns so this works with no migration.
    const payload = {
      name: form.name,
      email: form.email || null,
      subject: form.need,
      message: [
        form.business && `Business: ${form.business}`,
        form.phone && `WhatsApp: ${form.phone}`,
        form.message,
      ]
        .filter(Boolean)
        .join("\n"),
    };

    try {
      if (cmsReady) {
        const { error } = await supabase.from("pf_leads").insert([payload]);
        if (error) throw new Error(error.message);
      } else {
        const r = await fetch(FORMSPREE, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!r.ok) throw new Error("Could not send that. Try WhatsApp instead.");
      }
      setState("done");
    } catch {
      // never show a visitor a raw database error — give them the way through
      setErr("That did not go through on my side.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="border border-stone-2 bg-paper-2 p-8 text-center lg:p-12"
        role="status"
      >
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-stone-2 bg-paper-2 text-vermilion">
          <Check size={22} aria-hidden />
        </span>
        <h3 className="mt-6 display text-[1.7rem]">Got it, {form.name.split(" ")[0]}.</h3>
        <p className="mx-auto mt-3 max-w-md text-[0.98rem] leading-[1.7]">
          It is written down — I will come back to you within a few hours. If you want the
          teardown today, jump straight onto WhatsApp and we start now.
        </p>
        <a
          href={waHandoff}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-8"
        >
          Continue on WhatsApp
          <ArrowRight size={16} aria-hidden />
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="border border-stone-2 bg-paper p-6 lg:p-9" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" id="name" required error={bad.name}>
          <Input
            id="name"
            value={form.name}
            onChange={(v) => set("name", v)}
            autoComplete="name"
            required
            aria-invalid={!!bad.name}
            aria-describedby={bad.name ? "name-error" : undefined}
          />
        </Field>

        <Field label="Business name" id="business" hint="Optional">
          <Input
            id="business"
            value={form.business}
            onChange={(v) => set("business", v)}
            autoComplete="organization"
          />
        </Field>

        <Field label="WhatsApp number" id="phone" required error={bad.phone}>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            placeholder="078…"
            value={form.phone}
            onChange={(v) => set("phone", v)}
            autoComplete="tel"
            required
            aria-invalid={!!bad.phone}
            aria-describedby={bad.phone ? "phone-error" : undefined}
          />
        </Field>

        <Field label="Email" id="email" hint="Optional">
          <Input
            id="email"
            type="email"
            inputMode="email"
            value={form.email}
            onChange={(v) => set("email", v)}
            autoComplete="email"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="What do you need most?" id="need">
          <div className="grid gap-2 sm:grid-cols-2">
            {NEEDS.map((n) => {
              const on = n === form.need;
              return (
                <button
                  key={n}
                  type="button"
                  aria-pressed={on}
                  onClick={() => set("need", n)}
                  className={`min-h-[46px] rounded-xl border px-3.5 py-2.5 text-left text-[0.86rem] transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98] ${
                    on
                      ? "border-ink bg-paper-2 text-ink"
                      : "border-stone-2 bg-paper text-ink-80 hover:border-ink hover:text-ink"
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Anything else I should know?" id="message" hint="Optional">
          <textarea
            id="message"
            rows={4}
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            className="w-full resize-y rounded-xl border border-stone-2 bg-paper-2 px-4 py-3 text-[0.94rem] text-ink outline-none transition-colors duration-200 placeholder:text-meta focus:border-ink"
            placeholder="How customers reach you today, what keeps breaking, what you want gone."
          />
        </Field>
      </div>

      {state === "error" && (
        <p role="alert" className="mt-4 text-[0.88rem] text-vermilion-ink">
          {err}{" "}
          <a href={waHandoff} target="_blank" rel="noopener noreferrer" className="underline">
            Send it on WhatsApp instead
          </a>
          .
        </p>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={state === "saving"}
          className="btn btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "saving" ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              Send it to Eddie
              <Send size={15} aria-hidden />
            </>
          )}
        </button>
        <p className="text-[0.8rem] leading-relaxed text-stone">
          No newsletter, no list. Your details are used to reply to you and nothing else.
        </p>
      </div>
    </form>
  );
}

/* ── field primitives ── */

function Field({
  label,
  id,
  hint,
  required,
  error,
  children,
}: {
  label: string;
  id: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-baseline gap-2 text-[0.88rem] text-ink"
      >
        {label}
        {required && (
          <span className="text-vermilion" aria-hidden>
            *
          </span>
        )}
        {hint && <span className="font-grotesk text-[0.66rem] text-stone">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[0.8rem] text-vermilion-ink">
          {error}
        </p>
      )}
    </div>
  );
}

function Input({
  id,
  value,
  onChange,
  type = "text",
  ...rest
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "id" | "type">) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-12 w-full rounded-xl border border-stone-2 bg-paper-2 px-4 text-[0.94rem] text-ink outline-none transition-colors duration-200 placeholder:text-meta focus:border-ink aria-[invalid=true]:border-vermilion"
      {...rest}
    />
  );
}
