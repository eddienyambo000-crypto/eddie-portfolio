import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getContent } from "@/lib/content";
import { Launcher } from "@/components/Launcher";
import { SystemDemo } from "@/components/SystemDemo";
import { LeakCalculator } from "@/components/LeakCalculator";
import { Reveal, SectionHead } from "@/components/ui";
import {
  AboutStrip,
  FinalCTA,
  Footer,
  Marquee,
  Offer,
  Problem,
  Process,
  Section,
  Services,
  StatsBar,
  Testimonials,
  WorkStrip,
} from "@/components/sections";

export const revalidate = 60; // content edited in /admin appears within a minute

export default async function Home() {
  const d = await getContent();

  return (
    <>
      <Launcher profile={d.profile} />
      <Marquee />
      <StatsBar profile={d.profile} />
      <Problem />

      {/* the demo does the selling */}
      <Section id="demo">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="Watch it happen"
            title={
              <>
                A customer at 22:41. <span className="tail">You are asleep.</span>
              </>
            }
            lead="This is the whole product in forty seconds. Let it play, then type your own message and see what it does with it."
          />
          <Reveal delay={0.1}>
            <Link href="/system" className="btn btn-ghost">
              Open the full demo
              <ArrowRight size={15} aria-hidden />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 lg:mt-14">
          <SystemDemo />
        </div>
      </Section>

      <Services services={d.services} />
      <WorkStrip projects={d.projects} />

      {/* quantify the pain before quoting the price */}
      <Section id="leak">
        <SectionHead
          eyebrow="Your numbers"
          title={
            <>
              What silence is <span className="tail">already costing you.</span>
            </>
          }
          lead="Three sliders. Your own figures. Most owners find out they are funding a competitor."
        />
        <div className="mt-12 lg:mt-14">
          <LeakCalculator />
        </div>
      </Section>

      <Process />
      <Offer />
      <Testimonials testimonials={d.testimonials} />
      <AboutStrip profile={d.profile} skills={d.skills} />
      <FinalCTA promise={d.profile.hero_promise} />
      <Footer projects={d.projects} />
    </>
  );
}
