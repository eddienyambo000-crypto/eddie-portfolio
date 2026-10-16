import type { Metadata } from "next";
import Link from "next/link";
import { SystemDemo } from "@/components/SystemDemo";
import { Band, NextStep, PageIntro, Wrap } from "@/components/Page";
import { Reveal } from "@/components/ui";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Live demo",
  description:
    "A customer messages a Kigali garage at 22:41 while the owner is asleep. Watch the agent answer, quote, book and record it — then type your own question.",
  alternates: { canonical: "/system" },
};

const TRUTHS = [
  {
    title: "Five seconds, not five hours",
    body: "The business that replies first usually wins. This replies before a person could have finished reading the message.",
  },
  {
    title: "The night shift nobody pays for",
    body: "A lot of enquiries arrive after closing. That is exactly when your competitor is asleep too.",
  },
  {
    title: "It writes everything down",
    body: "Every exchange leaves a record with the name, the number and what was agreed, so nothing depends on remembering.",
  },
];

export default function SystemPage() {
  return (
    <>
      <PageIntro
        no="05"
        title="A customer at 22:41.|You are asleep."
        lead="This is a booking flow from a garage in Kimironko, replayed. Let it run, watch the panel on the right fill itself in, then type your own question at the bottom and see how it answers."
      />

      <Band tight>
        <Wrap>
          <SystemDemo />
          <p className="label mt-4">
            A demonstration using a fictional garage. No real customer data is shown.
          </p>
        </Wrap>
      </Band>

      <Band>
        <Wrap>
          <h2 className="display max-w-[15ch] text-[clamp(1.9rem,4.4vw,2.9rem)] text-ink">
            It is not clever. It is just never late.
          </h2>
          <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-10">
            {TRUTHS.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.07}>
                <div className="border-t border-ink pt-5">
                  <h3 className="display text-[1.45rem] text-ink">{t.title}</h3>
                  <p className="mt-3 text-[0.98rem] leading-relaxed">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/work" className="btn btn-quiet">
              See it running for real businesses
            </Link>
            <Link href="/services" className="btn btn-quiet">
              What it costs
            </Link>
          </div>
        </Wrap>
      </Band>

      <NextStep
        title="Want one answering for your business?"
        lead="Tell me what your customers usually ask and I will show you how it would handle them."
      />
    </>
  );
}
