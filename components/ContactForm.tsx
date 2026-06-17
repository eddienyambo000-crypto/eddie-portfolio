"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const { error } = await supabase.from("pf_leads").insert([data]);
      if (error) throw error;
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
    }
  }

  return (
    <div className="rounded-[22px] border border-mocha-line bg-paper p-8 shadow-[var(--shadow-soft)]">
      <form onSubmit={onSubmit}>
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Name" name="name" placeholder="Your name" required />
          <Field label="Email" name="email" type="email" placeholder="you@email.com" required />
        </div>
        <div className="mb-4">
          <Field label="Subject" name="subject" placeholder="What do you need built?" required />
        </div>
        <div className="mb-5">
          <label className="mb-1.5 block font-mono text-[0.7rem] uppercase tracking-wide text-coffee-soft">Message</label>
          <textarea
            name="message"
            rows={4}
            required
            placeholder="Tell me about your business & where you're losing time or sales..."
            className="min-h-[120px] w-full resize-y rounded-xl border border-mocha-line bg-paper px-4 py-3.5 text-[0.95rem] text-espresso outline-none transition focus:border-caramel focus:shadow-[0_0_0_4px_rgba(176,122,75,0.14)]"
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="flex w-full items-center justify-center gap-2 rounded-[13px] bg-gradient-to-br from-caramel to-caramel-deep px-6 py-3.5 font-semibold text-white shadow-[0_12px_28px_rgba(176,122,75,0.18)] transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send Message"} <Send size={17} />
        </button>
        {status === "ok" && (
          <p className="mt-3.5 rounded-[10px] border border-[rgba(47,170,90,0.25)] bg-[rgba(47,170,90,0.1)] px-3.5 py-3 text-[0.9rem] text-[#1f7a44]">
            ✓ Message sent. I'll get back to you fast — usually same day.
          </p>
        )}
        {status === "err" && (
          <p className="mt-3.5 rounded-[10px] border border-[rgba(200,60,40,0.22)] bg-[rgba(200,60,40,0.08)] px-3.5 py-3 text-[0.9rem] text-[#a8331f]">
            Something went wrong. WhatsApp me instead: +250 791 811 234
          </p>
        )}
      </form>
    </div>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-[0.7rem] uppercase tracking-wide text-coffee-soft">{label}</label>
      <input
        {...rest}
        className="w-full rounded-xl border border-mocha-line bg-paper px-4 py-3.5 text-[0.95rem] text-espresso outline-none transition focus:border-caramel focus:shadow-[0_0_0_4px_rgba(176,122,75,0.14)]"
      />
    </div>
  );
}
