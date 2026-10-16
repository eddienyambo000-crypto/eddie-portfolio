import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/lib/content";
import { OFFER, PROCESS } from "@/lib/site";
import { Band, NextStep, PageIntro, Wrap } from "@/components/Page";
import { Reveal } from "@/components/ui";
import { LeakCalculator } from "@/components/LeakCalculator";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites, WhatsApp AI agents, automated follow-up and custom business automation. One build fee, built in 14 days, and you own everything.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const d = await getContent();

  return (
    <>
      <PageIntro
        no="02"
        title="Four things I build,|and what each one is for."
        lead="Take one or take all four. Each is useful on its own, and each exists because a business I worked with was losing something without it."
      />

      {/* ── the four services, as an index not a card grid ── */}
      <Band tight>
        <Wrap>
          <ol className="border-t border-stone-2">
            {d.services.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.05}>
                <li className="grid gap-3 border-b border-stone-2 py-9 lg:grid-cols-12 lg:gap-10 lg:py-12">
                  <div className="label tnum lg:col-span-2">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h2 className="display text-[clamp(1.6rem,3.4vw,2.4rem)] text-ink lg:col-span-5">
                    {s.title}
                  </h2>
                  <p className="max-w-[46ch] text-[1.02rem] leading-relaxed lg:col-span-5">
                    {s.outcome}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Wrap>
      </Band>

      {/* ── the offer ── */}
      <Band>
        <Wrap>
          <div className="surface-ink px-7 py-12 lg:px-14 lg:py-16">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="label">The offer</span>
                <h2 className="display mt-5 text-[clamp(2rem,4.6vw,3.2rem)]">{OFFER.name}</h2>
                <p className="mt-5 max-w-[42ch] text-[1.02rem] leading-relaxed">
                  {OFFER.promise}
                </p>

                <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3">
                  <span className="display text-[clamp(1.8rem,3.6vw,2.6rem)] text-paper">
                    {OFFER.price}
                  </span>
                  <span className="label">{OFFER.timeline}</span>
                </div>
                <p className="mt-3 text-[0.95rem]">{OFFER.priceNote}</p>
              </div>

              <div className="lg:col-span-5 lg:col-start-8">
                <span className="label">What it includes</span>
                <ul className="mt-5">
                  {OFFER.includes.map((item) => (
                    <li
                      key={item}
                      className="flex gap-4 border-b border-[#36413e] py-3.5 text-[0.98rem] last:border-0"
                    >
                      <span aria-hidden className="text-vermilion">
                        &#47;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Wrap>
      </Band>

      {/* ── how it runs ── */}
      <Band tight>
        <Wrap>
          <h2 className="display max-w-[16ch] text-[clamp(1.9rem,4.4vw,2.9rem)] text-ink">
            Fourteen days, and six questions from you.
          </h2>
          <ol className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-10">
            {PROCESS.map((s, i) => (
              <Reveal key={s.no} delay={i * 0.08}>
                <li className="border-t border-ink pt-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="label tnum text-ink">{s.no}</span>
                    <span className="label">{s.time}</span>
                  </div>
                  <h3 className="display mt-4 text-[1.5rem] text-ink">{s.title}</h3>
                  <p className="mt-3 text-[0.98rem] leading-relaxed">{s.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Wrap>
      </Band>

      {/* ── see it before you buy it ── */}
      <Band tight>
        <Wrap>
          <div className="hairline flex flex-wrap items-baseline justify-between gap-5 pt-10">
            <p className="max-w-[46ch] text-[1.02rem] leading-relaxed">
              The WhatsApp agent is easier to understand by watching one work. The demo replays a
              real booking, and you can type at it yourself.
            </p>
            <Link href="/system" className="btn btn-quiet">
              Open the live demo
              <span aria-hidden>&#8594;</span>
            </Link>
          </div>
        </Wrap>
      </Band>

      {/* ── the estimate, kept off the homepage ── */}
      <Band>
        <Wrap>
          <div className="max-w-[52ch]">
            <span className="label">Before you decide</span>
            <h2 className="display mt-5 text-[clamp(1.9rem,4.4vw,2.9rem)] text-ink">
              Work out whether this is worth it for you.
            </h2>
            <p className="mt-5 text-[1.02rem] leading-relaxed">
              Three of your own numbers, and a deliberately conservative estimate of what slow
              replies cost. If the figure is smaller than the build, do not hire me.
            </p>
          </div>
          <div className="mt-10">
            <LeakCalculator />
          </div>
        </Wrap>
      </Band>

      <NextStep
        title="Tell me what you need."
        lead="If I am not the right person for it, I will say so on the first call."
      />
    </>
  );
}
