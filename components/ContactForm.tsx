"use client";

import { useId, useRef, useState } from "react";
import { EMAIL, waLink } from "@/lib/site";

const WHEN = ["This month", "In 1 to 3 months", "Just exploring"] as const;

type Errors = Partial<Record<"name" | "reach" | "project", string>>;

/**
 * No server, nothing to fail: the form writes the message for you and opens
 * WhatsApp or your email app with it ready to send. Both buttons say exactly
 * what they do.
 */
export function ContactForm() {
  const id = useId();
  const form = useRef<HTMLFormElement>(null);
  const [when, setWhen] = useState<(typeof WHEN)[number] | "">("");
  const [errors, setErrors] = useState<Errors>({});

  function read() {
    const d = new FormData(form.current!);
    return {
      name: String(d.get("name") ?? "").trim(),
      reach: String(d.get("reach") ?? "").trim(),
      project: String(d.get("project") ?? "").trim(),
    };
  }

  function validate(v: ReturnType<typeof read>): Errors {
    const e: Errors = {};
    if (v.name.length < 2) e.name = "Tell me what to call you.";
    if (v.reach.length < 6) e.reach = "Add an email or a phone number so I can reply.";
    if (v.project.length < 15) e.project = "A sentence or two about the project, please.";
    return e;
  }

  function compose(v: ReturnType<typeof read>) {
    return [
      `Hi Eddie, I'm ${v.name}.`,
      "",
      v.project,
      "",
      when ? `Timing: ${when}` : "",
      `Reach me at: ${v.reach}`,
    ]
      .filter((line, i, all) => line !== "" || all[i - 1] !== "")
      .join("\n")
      .trim();
  }

  function send(via: "whatsapp" | "email") {
    const v = read();
    const e = validate(v);
    setErrors(e);
    const firstBad = (["name", "reach", "project"] as const).find((k) => e[k]);
    if (firstBad) {
      form.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }
    const body = compose(v);
    if (via === "whatsapp") {
      window.open(waLink(body), "_blank", "noopener,noreferrer");
    } else {
      const subject = `Project enquiry from ${v.name}`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  }

  const field = (name: keyof Errors) => ({
    id: `${id}-${name}`,
    name,
    "aria-invalid": errors[name] ? (true as const) : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-err` : undefined,
    onBlur: () => errors[name] && setErrors((o) => ({ ...o, [name]: validate(read())[name] })),
  });

  return (
    <form
      ref={form}
      className="form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        send("whatsapp");
      }}
    >
      <div className="field">
        <label htmlFor={`${id}-name`}>Your name</label>
        <input className="input" type="text" autoComplete="name" maxLength={80} {...field("name")} />
        {errors.name && (
          <p className="err" id={`${id}-name-err`}>
            {errors.name}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor={`${id}-reach`}>
          Email or phone <span className="hint">so I can reply</span>
        </label>
        <input className="input" type="text" autoComplete="email" inputMode="email" maxLength={120} {...field("reach")} />
        {errors.reach && (
          <p className="err" id={`${id}-reach-err`}>
            {errors.reach}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor={`${id}-project`}>What are you building?</label>
        <textarea
          className="input"
          maxLength={1500}
          placeholder="What it is, who uses it, and what's not working today."
          {...field("project")}
        />
        {errors.project && (
          <p className="err" id={`${id}-project-err`}>
            {errors.project}
          </p>
        )}
      </div>

      <fieldset className="field">
        <legend className="mb-2 text-[0.95rem] font-semibold">
          When do you need it? <span className="hint font-normal">optional</span>
        </legend>
        <div className="opts">
          {WHEN.map((w) => (
            <button
              key={w}
              type="button"
              className="opt"
              aria-pressed={when === w}
              onClick={() => setWhen((cur) => (cur === w ? "" : w))}
            >
              {w}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-2 flex flex-wrap gap-3">
        <button type="submit" className="btn btn-primary">
          Send on WhatsApp
          <Arrow />
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => send("email")}>
          Send by email
        </button>
      </div>
      <p className="text-[0.9rem] text-ink-2">
        Either button opens the app with your message already written. Nothing is stored on this site.
      </p>
    </form>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10m0 0L8.5 3.5M13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
