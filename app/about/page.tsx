import type { Metadata } from "next";
import Image from "next/image";
import { getContent } from "@/lib/content";
import { CITY, NAME, ROLE } from "@/lib/site";
import { Band, NextStep, PageIntro, Wrap } from "@/components/Page";
import { Reveal } from "@/components/ui";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About",
  description: `${NAME} is an independent systems engineer in ${CITY}. He builds and deploys the work himself and works directly with the owner from the first conversation to handover.`,
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  {
    title: "I will tell you not to buy",
    body: "If the numbers do not work for your business, I say so on the first call. A system that cannot pay for itself is a liability with a login screen.",
  },
  {
    title: "You own everything",
    body: "The code, the data, the accounts, the domain. If you ever want to work with somebody else, nothing important is held in my name.",
  },
  {
    title: "It ships or it does not count",
    body: "There are no concepts on this site. If a thing is not deployed and in use by somebody who is not me, it does not get a page.",
  },
  {
    title: "You talk to the person building it",
    body: "No account manager, no handover to a junior once the contract is signed. The person who writes it is the person who answers you.",
  },
];

export default async function AboutPage() {
  const d = await getContent();
  const { profile, skills } = d;
  const groups = Array.from(new Set(skills.map((s) => s.grp)));

  return (
    <>
      <PageIntro no="03" title="The person|behind the work." />

      <Band tight>
        <Wrap>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <figure>
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-2">
                  <Image
                    src={profile.photo_url || "/eddie.jpg"}
                    alt={`${NAME}, ${ROLE}, ${CITY}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-[50%_42%]"
                  />
                </div>
                <figcaption className="label mt-3">
                  {NAME} / {CITY}
                </figcaption>
              </figure>
            </Reveal>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                <p className="display text-[clamp(1.5rem,2.9vw,2.1rem)] leading-[1.25] text-ink">
                  {profile.about_md}
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="mt-12 grid gap-8 sm:grid-cols-3">
                  {groups.map((g) => (
                    <div key={g}>
                      <h2 className="label text-ink">{g}</h2>
                      <ul className="mt-3 space-y-1.5 text-[0.95rem]">
                        {skills
                          .filter((s) => s.grp === g)
                          .map((s) => (
                            <li key={s.id}>{s.label}</li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </Wrap>
      </Band>

      <Band>
        <Wrap>
          <h2 className="display max-w-[14ch] text-[clamp(1.9rem,4.4vw,2.9rem)] text-ink">
            How I work, in four lines.
          </h2>
          <ol className="mt-12 grid gap-y-10 sm:grid-cols-2 sm:gap-x-12">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <li className="border-t border-ink pt-5">
                  <span className="label tnum text-ink">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display mt-3 text-[1.45rem] text-ink">{p.title}</h3>
                  <p className="mt-3 max-w-[44ch] text-[0.98rem] leading-relaxed">{p.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Wrap>
      </Band>

      {/* real testimonials only — this stays empty until the CMS has consented ones */}
      {d.testimonials.length > 0 && (
        <Band>
          <Wrap>
            <h2 className="label">In their words</h2>
            <div className="mt-8 grid gap-10 md:grid-cols-2 lg:gap-14">
              {d.testimonials.slice(0, 4).map((t, i) => (
                <Reveal key={t.id} delay={i * 0.07}>
                  <figure className="border-t border-ink pt-6">
                    <blockquote className="display text-[clamp(1.3rem,2.4vw,1.75rem)] leading-[1.35] text-ink">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="label mt-5">
                      {t.name}
                      {t.role ? ` / ${t.role}` : ""}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </Wrap>
        </Band>
      )}

      <NextStep
        title="Still reading? Then we should probably talk."
        lead="Thirty minutes, no pitch. You keep whatever we work out."
      />
    </>
  );
}
