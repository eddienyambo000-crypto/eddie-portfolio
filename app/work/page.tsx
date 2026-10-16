import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/lib/content";
import { slugify, type Project } from "@/lib/site";
import { Band, PageIntro, Wrap, NextStep } from "@/components/Page";
import { Reveal } from "@/components/ui";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Live systems built for businesses in Rwanda: a guest house site, a kitchenware shop, a livestock marketplace, a hotel booking agent and a WhatsApp sales system.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const d = await getContent();

  return (
    <>
      <PageIntro
        no="01"
        title="Five systems, each one|running right now."
        lead="Every project below belongs to a real business. Where the system is public you can open it and use it yourself — that is the only kind of proof worth putting on a page."
      />

      <Band tight>
        <Wrap>
          <ol>
            {d.projects.map((p, i) => (
              <ProjectRow key={p.id} p={p} i={i} />
            ))}
          </ol>
        </Wrap>
      </Band>

      <Band tight>
        <Wrap>
          <div className="hairline flex flex-wrap items-baseline justify-between gap-5 pt-10">
            <p className="max-w-[44ch] text-[1.02rem] leading-relaxed">
              Want to see one of these working rather than read about it? The booking flow is
              replayed end to end on the live demo.
            </p>
            <Link href="/system" className="btn btn-quiet">
              Open the live demo
              <span aria-hidden>&#8594;</span>
            </Link>
          </div>
        </Wrap>
      </Band>

      <NextStep
        title="Your business could be the next one on this page."
        lead="Tell me how customers reach you today and I will map where they fall out."
      />
    </>
  );
}

/**
 * Alternating composition: odd rows put the capture on the right, even rows on
 * the left. A project with no honest capture is set typographically instead of
 * being given a fabricated one.
 */
function ProjectRow({ p, i }: { p: Project; i: number }) {
  const href = `/work/${slugify(p.title)}`;
  const flip = i % 2 === 1;
  const tall = p.shape === "tall";

  return (
    <li className="border-t border-stone-2 first:border-t-0">
      <Reveal>
        <Link
          href={href}
          className="group grid gap-6 py-10 lg:grid-cols-12 lg:gap-10 lg:py-16"
        >
          {/* capture */}
          <div
            className={`lg:col-span-7 ${flip ? "lg:order-2 lg:col-start-6" : ""}`}
          >
            {p.cover_url ? (
              <div
                className={`relative w-full overflow-hidden bg-paper-2 ${
                  tall ? "mx-auto aspect-[9/14] max-w-[340px]" : "aspect-[16/10]"
                }`}
              >
                <Image
                  src={p.cover_url}
                  alt={`${p.title} — screenshot of the live system`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  priority={i === 0}
                  className={`${
                    tall ? "object-contain" : "object-cover object-top"
                  } transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-soft)] group-hover:scale-[1.02]`}
                />
              </div>
            ) : (
              <div className="flex aspect-[16/10] w-full items-end bg-ink p-7 lg:p-10">
                <p className="display max-w-[20ch] text-[clamp(1.4rem,2.6vw,2rem)] text-paper">
                  Private system. No public screen to show —{" "}
                  <span className="italic-accent">the proof is the client.</span>
                </p>
              </div>
            )}
          </div>

          {/* caption */}
          <div
            className={`flex flex-col lg:col-span-4 lg:justify-end ${
              flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"
            }`}
          >
            <div className="label tnum">{String(i + 1).padStart(2, "0")}</div>
            <h2 className="display mt-3 text-[clamp(1.8rem,3.6vw,2.6rem)] text-ink">
              <span className="rule-link">{p.title}</span>
            </h2>
            {p.client && <p className="label mt-2">{p.client}</p>}
            <p className="mt-4 max-w-[42ch] text-[0.98rem] leading-relaxed">{p.blurb}</p>
            {!!p.tags?.length && (
              <p className="label mt-5">{p.tags.slice(0, 3).join(" · ")}</p>
            )}
          </div>
        </Link>
      </Reveal>
    </li>
  );
}
