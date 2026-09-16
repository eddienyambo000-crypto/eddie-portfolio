import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { LeakCalculator } from "@/components/LeakCalculator";
import {
  FinalCTA,
  Footer,
  Offer,
  Process,
  Section,
  Services,
} from "@/components/sections";
import { SectionHead } from "@/components/ui";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "What I build and what it costs",
  description:
    "Four systems: a website that sells, a WhatsApp AI agent, automatic follow-up and operations on autopilot. One build fee, live in 14 days, you own everything.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const d = await getContent();

  return (
    <>
      <PageHero
        eyebrow="The offer"
        title="One fee. Fourteen days.|You own all of it."
        lead="No retainers you cannot cancel, no platform that holds your customers hostage, no agency layer marking up my time. You pay once, the system is yours, and I stay on for 30 days to tune it."
      />

      <Services services={d.services} />
      <Offer />
      <Process />

      <Section id="leak">
        <SectionHead
          eyebrow="Before you decide"
          title={
            <>
              Check the maths <span className="tail">on your own business.</span>
            </>
          }
          lead="If the leak is smaller than the build, do not hire me. Here is the honest way to find out."
        />
        <div className="mt-12 lg:mt-14">
          <LeakCalculator />
        </div>
      </Section>

      <FinalCTA promise={d.profile.hero_promise} />
      <Footer projects={d.projects} />
    </>
  );
}
