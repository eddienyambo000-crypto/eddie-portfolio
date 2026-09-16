import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import {
  AboutStrip,
  FinalCTA,
  Footer,
  Section,
  StatsBar,
  Testimonials,
} from "@/components/sections";
import { Reveal, SectionHead } from "@/components/ui";
import { getContent } from "@/lib/content";
import { CITY, NAME } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About",
  description: `${NAME} is an automation systems engineer in ${CITY}. He builds and ships the systems himself — no agency layer, no account managers, no handover to a junior.`,
  alternates: { canonical: "/about" },
};

const RULES = [
  {
    title: "I will tell you not to buy",
    body: "If the maths does not work for your business, I say so on the first call. A system that cannot pay for itself is a liability dressed as progress.",
  },
  {
    title: "You own everything",
    body: "The code, the data, the accounts, the numbers. If you ever want to walk away from me, you can — nothing important lives in my name.",
  },
  {
    title: "It ships or it does not count",
    body: "There is no portfolio of concepts here. If a thing is not deployed and being used by somebody who is not me, it does not go on this site.",
  },
  {
    title: "No jargon on the invoice",
    body: "You will never get a line item you cannot explain to your accountant. I describe what it does for you, not what it is called.",
  },
];

export default async function AboutPage() {
  const d = await getContent();

  return (
    <>
      <PageHero
        eyebrow="Who builds it"
        title="The person who builds it|is the person you talk to."
        lead="No agency layer, no account manager, no quiet handover to a junior once the contract is signed. You message me, I build it, I hand it over, I keep it running."
      />

      <StatsBar profile={d.profile} />
      <AboutStrip profile={d.profile} skills={d.skills} />

      <Section>
        <SectionHead
          eyebrow="How I work"
          title={
            <>
              Four rules <span className="tail">I do not bend.</span>
            </>
          }
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14">
          {RULES.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.07}>
              <div className="panel h-full p-6 lg:p-8">
                <span className="font-mono text-[0.72rem] text-amber">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-[1.4rem] leading-tight">{r.title}</h3>
                <p className="mt-3 text-[0.94rem] leading-[1.7]">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Testimonials testimonials={d.testimonials} />
      <FinalCTA promise={d.profile.hero_promise} />
      <Footer projects={d.projects} />
    </>
  );
}
