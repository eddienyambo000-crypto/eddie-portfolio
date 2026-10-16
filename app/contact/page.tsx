import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Band, PageIntro, Wrap } from "@/components/Page";
import { Reveal } from "@/components/ui";
import { CALENDAR, EMAIL, WA_DEFAULT, WHATSAPP_PRETTY } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell me what you need. WhatsApp is fastest, or book a thirty-minute call, or send the form and I will come back to you.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        no="04"
        title="Have a problem|worth solving?"
        lead="Tell me how customers reach you today and what keeps breaking. If it is worth building I will quote it, and if it is not I will tell you that instead."
      >
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={WA_DEFAULT}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            WhatsApp me
            <span aria-hidden>&#8599;</span>
          </a>
          <a
            href={CALENDAR}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-quiet"
          >
            Book 30 minutes
          </a>
        </div>
        <p className="label mt-5">
          {WHATSAPP_PRETTY} &nbsp;/&nbsp;{" "}
          <a href={`mailto:${EMAIL}`} className="rule-link">
            {EMAIL}
          </a>
        </p>
      </PageIntro>

      <Band tight>
        <Wrap>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <h2 className="label">Or send it in writing</h2>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>

            <Reveal className="lg:col-span-4 lg:col-start-9">
              <h2 className="label">What happens next</h2>
              <ol className="mt-6">
                {[
                  "I reply, usually the same day, with three questions about how customers reach you.",
                  "We talk for thirty minutes. I map where enquiries fall out of your process.",
                  "If it is worth building, you get a quote and a date. If not, you keep the map.",
                ].map((s, i) => (
                  <li
                    key={s}
                    className="flex gap-5 border-b border-stone-2 py-5 last:border-0"
                  >
                    <span className="label tnum shrink-0 text-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.98rem] leading-relaxed">{s}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Wrap>
      </Band>
    </>
  );
}
