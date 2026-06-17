"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Share() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [consent, setConsent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    try {
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
      setConsent(false);
    } catch {
      setStatus("err");
    }
  }

  return (
    <main className="relative z-[1] mx-auto max-w-[620px] px-6 pb-20 pt-12">
      <a href="/" className="mb-8 inline-flex items-center gap-2.5 font-display text-[1.1rem] font-extrabold text-espresso">
        <span className="grid h-[34px] w-[34px] place-items-center rounded-[9px] bg-gradient-to-br from-caramel to-caramel-deep font-sans text-[0.85rem] font-bold text-white">EN</span>
        Eddie Nyambo
      </a>
      <span className="eyebrow">CLIENT STORIES</span>
      <h1 className="mb-3.5 mt-3 font-display text-[clamp(1.9rem,5vw,2.6rem)] leading-[1.08]">
        Tell the world what we <span className="serif-i">built together.</span>
      </h1>
      <p className="mb-7 text-coffee">
        If I built or improved something for your business, I'd love to hear how it's going. Write a few honest lines — it only goes public if <b>you</b> say it can.
      </p>

      <div className="rounded-[22px] border border-mocha-line bg-paper p-8 shadow-[var(--shadow-card)]">
        <form onSubmit={onSubmit}>
          <div className="mb-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <Field label="Your name" name="name" placeholder="e.g. Jean de Dieu" required />
            <Field label="Business / role" name="role" placeholder="e.g. StepIn Coaching" required />
          </div>
          <div className="mb-4">
            <label className="mb-1.5 block font-mono text-[0.7rem] uppercase tracking-wide text-coffee-soft">
              Your story — what did we build & how's it helping?
            </label>
            <textarea
              name="quote"
              rows={5}
              required
              placeholder="What was the problem, what did Eddie build, and what changed for your business since?"
              className="min-h-[130px] w-full resize-y rounded-xl border border-mocha-line bg-cream px-4 py-3.5 text-[0.95rem] text-espresso outline-none transition focus:border-caramel focus:shadow-[0_0_0_4px_rgba(176,122,75,0.14)]"
            />
          </div>
          <label className="mb-5 mt-1.5 flex items-start gap-2.5 rounded-xl border border-mocha-line bg-cream2 px-4 py-3.5 text-[0.9rem] text-espresso">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-[18px] w-[18px] flex-shrink-0 accent-[#9A6638]" />
            <span>Yes — Eddie can feature this (with my name &amp; business) publicly on his website. Leave unchecked to keep it private.</span>
          </label>
          <button
            type="submit"
            disabled={status === "sending"}
            className="flex w-full items-center justify-center gap-2 rounded-[13px] bg-gradient-to-br from-caramel to-caramel-deep px-6 py-4 font-semibold text-white shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send my story"}
          </button>
          {status === "ok" && (
            <p className="mt-4 rounded-xl border border-[rgba(47,170,90,0.25)] bg-[rgba(47,170,90,0.1)] px-4 py-3.5 text-[0.92rem] text-[#1f7a44]">
              ✓ Thank you! Your story is with Eddie. {consent ? "He may feature it publicly." : "It stays private."}
            </p>
          )}
          {status === "err" && (
            <p className="mt-4 rounded-xl border border-[rgba(200,60,40,0.22)] bg-[rgba(200,60,40,0.08)] px-4 py-3.5 text-[0.92rem] text-[#a8331f]">
              Could not send. Please WhatsApp Eddie instead: +250 791 811 234
            </p>
          )}
        </form>
      </div>
      <p className="mt-4.5 text-center text-[0.8rem] text-coffee-soft" style={{ marginTop: 18 }}>
        Private by default. Nothing appears on the site unless you tick the box and Eddie approves it. ·{" "}
        <a href="/" className="font-semibold text-caramel-deep">← Back to site</a>
      </p>
    </main>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-[0.7rem] uppercase tracking-wide text-coffee-soft">{label}</label>
      <input {...rest} className="w-full rounded-xl border border-mocha-line bg-cream px-4 py-3.5 text-[0.95rem] text-espresso outline-none transition focus:border-caramel focus:shadow-[0_0_0_4px_rgba(176,122,75,0.14)]" />
    </div>
  );
}
