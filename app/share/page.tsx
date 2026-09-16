"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { cmsReady, supabase } from "@/lib/supabase";
import { WHATSAPP_PRETTY } from "@/lib/site";

/**
 * Private testimonial capture. Everything lands as published=false; it only
 * goes on the site if the client ticks consent AND Eddie flips it in /admin.
 */
export default function Share() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [consent, setConsent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    try {
      if (!cmsReady) throw new Error("offline");
      const { error } = await supabase.from("pf_testimonials").insert([
        {
          name: fd.get("name"),
          role: fd.get("role"),
          quote: fd.get("quote"),
          consent_public: consent,
          published: false,
          sort: 99,
        },
      ]);
      if (error) throw error;
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
    }
  }

  return (
    <section className="mx-auto max-w-[640px] px-5 pb-28 pt-28 sm:pt-32">
      <span className="eyebrow">Client stories</span>
      <h1 className="mt-5 text-[clamp(2rem,6vw,2.9rem)] leading-[1.04]">
        Tell people what we <span className="tail">built together.</span>
      </h1>
      <p className="mt-5 leading-[1.75]">
        If I built something for your business, a few honest lines about how it is going help
        more than anything. It only goes public if <span className="text-ivory">you</span> say
        it can.
      </p>

      {status === "ok" ? (
        <div role="status" className="panel-raised edge-top mt-8 p-8 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-live/12 text-live">
            <Check size={20} aria-hidden />
          </span>
          <h2 className="mt-5 font-display text-[1.5rem]">Thank you.</h2>
          <p className="mt-2">
            Your story is with Eddie.{" "}
            {consent ? "He may feature it on the site." : "It stays private."}
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="panel mt-8 space-y-5 p-6 lg:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Your name" name="name" placeholder="Jean de Dieu" autoComplete="name" />
            <Field
              label="Business / role"
              name="role"
              placeholder="StepIn Coaching"
              autoComplete="organization"
            />
          </div>

          <div>
            <label htmlFor="quote" className="mb-2 block text-[0.88rem] text-ivory">
              What did we build, and what changed? <span className="text-amber">*</span>
            </label>
            <textarea
              id="quote"
              name="quote"
              rows={5}
              required
              placeholder="What was the problem before, what got built, and what is different now?"
              className="w-full resize-y rounded-xl border border-line bg-ink px-4 py-3 text-[0.94rem] text-ivory outline-none transition-colors duration-200 placeholder:text-faint focus:border-amber-dim"
            />
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-ink-2 p-4 text-[0.88rem] text-ivory">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-4 w-4 flex-none accent-[#F0A64B]"
            />
            <span>
              Eddie can feature this publicly with my name and business. Leave unticked to keep it
              private.
            </span>
          </label>

          {status === "err" && (
            <p role="alert" className="text-[0.88rem] text-alert">
              Could not send that. Please WhatsApp Eddie instead on {WHATSAPP_PRETTY}.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn btn-primary w-full disabled:opacity-60"
          >
            {status === "sending" && <Loader2 size={16} className="animate-spin" aria-hidden />}
            {status === "sending" ? "Sending…" : "Send my story"}
          </button>

          <p className="text-center font-mono text-[0.66rem] text-faint">
            Private by default. Nothing appears unless you tick the box and Eddie approves it.
          </p>
        </form>
      )}
    </section>
  );
}

function Field({
  label,
  name,
  ...rest
}: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-[0.88rem] text-ivory">
        {label} <span className="text-amber">*</span>
      </label>
      <input
        id={name}
        name={name}
        required
        {...rest}
        className="h-12 w-full rounded-xl border border-line bg-ink px-4 text-[0.94rem] text-ivory outline-none transition-colors duration-200 placeholder:text-faint focus:border-amber-dim"
      />
    </div>
  );
}
