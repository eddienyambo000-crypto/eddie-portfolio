import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, MoonStar, Repeat2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SystemDemo } from "@/components/SystemDemo";
import { FinalCTA, Footer, Section } from "@/components/sections";
import { Reveal, SectionHead } from "@/components/ui";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "See the system working",
  description:
    "A customer messages a Kigali garage at 22:41 while the owner sleeps. Watch the system answer, quote, book and remember — then type your own message and test it.",
  alternates: { canonical: "/system" },
};

const TRUTHS = [
  {
    Icon: Clock,
    title: "Five seconds, not five hours",
    body: "The first business to reply usually wins. Your system replies before a human could have read the message.",
  },
  {
    Icon: MoonStar,
    title: "The night shift you never paid for",
    body: "Most enquiries in Rwanda land after hours. That is exactly when your competitor is also asleep — and you are not.",
  },
  {
    Icon: Repeat2,
    title: "It never forgets to follow up",
    body: "People go quiet because they got busy, not because they said no. The system chases politely until they answer.",
  },
];

export default async function SystemPage() {
  const d = await getContent();

  return (
    <>
      <PageHero
        eyebrow="Live demo"
        title="This is what you are|actually buying."
        lead="Below is a real conversation flow from a garage in Kimironko, replayed. Let it run, watch the machine on the right do its work, then type your own question at the bottom and see how it handles you."
      />

      <Section tight>
        <SystemDemo />
      </Section>

      <Section>
        <SectionHead
          eyebrow="Why it works"
          title={
            <>
              It is not clever. <span className="tail">It is just never late.</span>
            </>
          }
          lead="There is no magic in this. The system wins because it does three boring things perfectly, every single time, forever."
        />

        <div className="mt-12 grid gap-4 lg:mt-14 lg:grid-cols-3">
          {TRUTHS.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.08}>
              <div className="panel h-full p-6 lg:p-8">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-ink-3 text-amber">
                  <t.Icon size={18} strokeWidth={1.7} aria-hidden />
                </span>
                <h3 className="mt-6 font-display text-[1.4rem] leading-tight">{t.title}</h3>
                <p className="mt-3 text-[0.94rem] leading-[1.7]">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/services" className="btn btn-ghost">
              What each piece costs
              <ArrowRight size={15} aria-hidden />
            </Link>
            <Link href="/work" className="btn btn-ghost">
              See it running for real businesses
              <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </Reveal>
      </Section>

      <FinalCTA promise={d.profile.hero_promise} />
      <Footer projects={d.projects} />
    </>
  );
}
