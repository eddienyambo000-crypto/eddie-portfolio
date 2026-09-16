import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { WorkGrid } from "@/components/WorkGrid";
import { FinalCTA, Footer, Section } from "@/components/sections";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "The work",
  description:
    "Live systems built for Rwandan businesses — WhatsApp AI agents, marketplaces, CRMs and sites that sell. Every one of them is running right now.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const d = await getContent();

  return (
    <>
      <PageHero
        eyebrow="Receipts"
        title="Every one of these|is live right now."
        lead="No concepts, no mockups, no case studies for work that never shipped. Each of these has a real owner in Rwanda using it today — open them and check."
      />

      <Section tight>
        <WorkGrid projects={d.projects} />
      </Section>

      <FinalCTA promise={d.profile.hero_promise} />
      <Footer projects={d.projects} />
    </>
  );
}
