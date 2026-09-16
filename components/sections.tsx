import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  Globe,
  MessageSquare,
  Quote,
  Repeat,
  ShieldCheck,
  Zap,
} from "lucide-react";
import {
  CALENDAR,
  CITY,
  EMAIL,
  NAME,
  OFFER,
  PROBLEMS,
  PROCESS,
  ROLE,
  WA_DEFAULT,
  WHATSAPP_PRETTY,
  slugify,
  type Profile,
  type Project,
  type Service,
  type Skill,
  type Testimonial,
} from "@/lib/site";
import { CountUp, Reveal, SectionHead } from "@/components/ui";
import { ProjectCard } from "@/components/ProjectCard";

/* ─────────────────────────── layout primitives ─────────────────────────── */

export function Section({
  id,
  children,
  className = "",
  tight = false,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  tight?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative px-5 sm:px-8 ${tight ? "py-16 sm:py-20" : "py-20 sm:py-28 lg:py-32"} ${className}`}
    >
      <div className="mx-auto max-w-[1240px]">{children}</div>
    </section>
  );
}

/* ───────────────────────────── proof ticker ────────────────────────────── */

const TICKER = [
  "WhatsApp agents that answer in 5 seconds",
  "Live in 14 days",
  "Built in Kigali",
  "You own everything",
  "No monthly lock-in",
  "Follow-up that never forgets",
  "Systems running today, not demos",
];

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-line bg-ink-2 py-3.5">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex gap-10" aria-hidden={dup === 1}>
            {TICKER.map((t) => (
              <span
                key={t}
                className="flex items-center gap-10 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-faint"
              >
                {t}
                <span className="h-1 w-1 rounded-full bg-amber-dim" aria-hidden />
              </span>
            ))}
          </div>
        ))}
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-ink-2 to-transparent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-ink-2 to-transparent"
      />
    </div>
  );
}

/* ──────────────────────────────── stats ────────────────────────────────── */

export function StatsBar({ profile }: { profile: Profile }) {
  return (
    <Section tight>
      <div className="panel grid grid-cols-2 divide-line lg:grid-cols-4">
        {profile.stats.map((s, i) => (
          <Reveal
            key={s.label + i}
            delay={i * 0.06}
            className={`border-line p-6 lg:p-8 ${i % 2 === 0 ? "border-r" : ""} ${
              i === 1 ? "lg:border-r" : ""
            } ${i < 2 ? "border-b lg:border-b-0" : ""}`}
          >
            <div className="font-display text-[clamp(2rem,4.6vw,2.9rem)] leading-none text-ivory">
              <CountUp value={s.value} />
            </div>
            <div className="mt-2.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-faint">
              {s.label}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────── problem ───────────────────────────────── */

export function Problem() {
  return (
    <Section id="problem">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-16">
        <SectionHead
          eyebrow="The real problem"
          title={
            <>
              You are not short of customers.{" "}
              <span className="tail">You are short of answers.</span>
            </>
          }
          lead="Most Rwandan businesses do not lose to a competitor with a better product. They lose to the one who replied first. Every one of these is costing you money this week."
        />

        <div className="space-y-px overflow-hidden rounded-2xl border border-line">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p} delay={i * 0.07}>
              <div className="group flex items-start gap-4 bg-ink-2 p-5 transition-colors duration-300 hover:bg-ink-3 sm:p-6">
                <span className="mt-0.5 font-mono text-[0.72rem] text-alert">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[0.98rem] leading-[1.65] text-ivory">{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────── services ──────────────────────────────── */

const ICONS: Record<string, typeof Globe> = {
  globe: Globe,
  chat: MessageSquare,
  repeat: Repeat,
  chart: BarChart3,
};

export function Services({ services }: { services: Service[] }) {
  return (
    <Section id="services">
      <SectionHead
        eyebrow="What I install"
        title={
          <>
            Four machines. <span className="tail">One business that runs itself.</span>
          </>
        }
        lead="You can take one or all four. Each one works on its own, and each one is built to pay for itself before the next quarter."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16">
        {services.map((s, i) => {
          const Icon = ICONS[s.icon || "globe"] || Zap;
          return (
            <Reveal key={s.id} delay={i * 0.07}>
              <article className="edge-top group panel h-full p-6 transition-[transform,border-color] duration-500 [transition-timing-function:var(--ease-spring)] hover:-translate-y-1 hover:border-amber-dim lg:p-8">
                <div className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-ink-3 text-amber transition-colors duration-300 group-hover:border-amber-dim">
                    <Icon size={18} strokeWidth={1.7} aria-hidden />
                  </span>
                  <span className="font-mono text-[0.72rem] text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-[1.45rem] leading-tight">{s.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-[1.7]">{s.outcome}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ──────────────────────────────── work ─────────────────────────────────── */

export function WorkStrip({ projects }: { projects: Project[] }) {
  return (
    <Section id="work">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead
          eyebrow="Receipts"
          title={
            <>
              Systems running <span className="tail">right now.</span>
            </>
          }
          lead="Not mockups. Every one of these is live, has a real owner, and you can open it yourself."
        />
        <Reveal delay={0.1}>
          <Link href="/work" className="btn btn-ghost">
            All work
            <ArrowRight size={15} aria-hidden />
          </Link>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {projects.slice(0, 3).map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <ProjectCard p={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────── process ───────────────────────────────── */

export function Process() {
  return (
    <Section id="process">
      <SectionHead
        eyebrow="How it goes"
        title={
          <>
            Fourteen days. <span className="tail">Six questions from you.</span>
          </>
        }
        lead="You are busy running the business. Building the system is my job, not yours."
      />

      <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-3">
        {PROCESS.map((s, i) => (
          <Reveal key={s.no} delay={i * 0.1}>
            <div className="panel relative h-full p-6 lg:p-8">
              <span
                aria-hidden
                className="pointer-events-none absolute right-5 top-4 font-display text-[4.6rem] leading-none text-ink-4"
              >
                {s.no}
              </span>
              <span className="relative font-mono text-[0.66rem] uppercase tracking-[0.16em] text-amber">
                {s.time}
              </span>
              <h3 className="relative mt-4 font-display text-[1.5rem]">{s.title}</h3>
              <p className="relative mt-3 text-[0.94rem] leading-[1.7]">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ──────────────────────────────── offer ────────────────────────────────── */

export function Offer() {
  const total = OFFER.stack.reduce(
    (sum, s) => sum + Number(s.worth.replace(/[^\d]/g, "")),
    0
  );

  return (
    <Section id="offer">
      <div className="panel-raised edge-top overflow-hidden">
        <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          {/* the stack */}
          <div className="border-b border-line p-7 lg:border-b-0 lg:border-r lg:p-11">
            <span className="eyebrow">The offer</span>
            <h2 className="mt-5 text-[clamp(1.9rem,4.6vw,2.9rem)]">{OFFER.name}</h2>
            <p className="mt-4 max-w-lg text-[1rem] leading-[1.7]">{OFFER.promise}</p>

            <ul className="mt-9 space-y-0 divide-y divide-line-soft">
              {OFFER.stack.map((s, i) => (
                <Reveal key={s.item} delay={i * 0.05}>
                  <li className="flex items-center justify-between gap-5 py-3.5">
                    <span className="flex items-start gap-3 text-[0.94rem] text-ivory">
                      <Check size={15} className="mt-1 flex-none text-live" aria-hidden />
                      {s.item}
                    </span>
                    <span className="tnum flex-none whitespace-nowrap font-mono text-[0.78rem] text-faint line-through">
                      {s.worth}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
              <span className="text-[0.94rem] text-ivory">Total value, bought piece by piece</span>
              <span className="tnum flex-none whitespace-nowrap font-mono text-[0.95rem] text-ivory">
                RWF {total.toLocaleString("en-US")}
              </span>
            </div>
          </div>

          {/* the price + risk reversal */}
          <div className="flex flex-col justify-between bg-[radial-gradient(520px_360px_at_60%_0%,rgba(240,166,75,0.12),transparent_70%)] p-7 lg:p-11">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="flex items-center gap-2 rounded-full border border-line bg-ink px-3 py-1 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-live">
                  <span className="dot-live" aria-hidden />
                  {OFFER.slots} slots left
                </span>
                <span className="rounded-full border border-line bg-ink px-3 py-1 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-faint">
                  {OFFER.timeline}
                </span>
              </div>

              <div className="mt-7 font-display text-[clamp(2.2rem,5.6vw,3.2rem)] leading-none text-ivory">
                {OFFER.price}
              </div>
              <p className="mt-3 text-[0.9rem]">{OFFER.priceNote}</p>

              <div className="mt-8 rounded-2xl border border-line bg-ink/60 p-5">
                <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-live">
                  <ShieldCheck size={13} aria-hidden />
                  The risk is mine
                </div>
                <p className="mt-2.5 text-[0.89rem] leading-[1.65]">{OFFER.guarantee}</p>
              </div>
            </div>

            <div className="mt-8 space-y-2.5">
              <a
                href={WA_DEFAULT}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full"
              >
                Claim a build slot
                <ArrowRight size={16} aria-hidden />
              </a>
              <Link href="/services" className="btn btn-ghost w-full">
                See what each piece does
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ───────────────────────── testimonials (inverted) ─────────────────────── */

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null;

  return (
    <div className="surface-paper">
      <Section>
        <SectionHead
          eyebrow="In their words"
          title={
            <>
              The people whose <span className="text-[#8a5420] italic">phones went quiet.</span>
            </>
          }
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-14">
          {testimonials.slice(0, 4).map((t, i) => (
            <Reveal key={t.id} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-2xl border border-[#d9d0bf] bg-white/60 p-6 lg:p-8">
                <Quote size={20} className="text-[#b57a35]" aria-hidden />
                <blockquote className="mt-4 flex-1 font-display text-[1.22rem] leading-[1.45] text-[#14110e]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-[#d9d0bf] pt-5">
                  {t.avatar_url ? (
                    <Image
                      src={t.avatar_url}
                      alt=""
                      width={40}
                      height={40}
                      className="h-10 w-10 flex-none rounded-full object-cover"
                    />
                  ) : (
                    <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-[#e2d7c4] font-mono text-[0.75rem] text-[#7a5326]">
                      {t.name
                        .split(/\s+/)
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  )}
                  <span className="text-[0.88rem] leading-tight">
                    <span className="block font-medium text-[#14110e]">{t.name}</span>
                    <span className="block text-[#6f6459]">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ──────────────────────────────── about ────────────────────────────────── */

export function AboutStrip({ profile, skills }: { profile: Profile; skills: Skill[] }) {
  const groups = Array.from(new Set(skills.map((s) => s.grp)));

  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <div className="relative">
            <span
              aria-hidden
              className="absolute -inset-3 rounded-[26px] border border-line"
              style={{ transform: "rotate(-2deg)" }}
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] border border-line bg-ink-3">
              <Image
                src={profile.photo_url || "/eddie.jpg"}
                alt={`${NAME}, ${ROLE}`}
                fill
                sizes="(max-width: 1024px) 88vw, 380px"
                className="object-cover object-[center_38%] grayscale-[0.35] transition-[filter] duration-700 hover:grayscale-0"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="font-display text-[1.3rem] text-ivory">{NAME}</div>
                <div className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-amber">
                  {ROLE} / {CITY}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHead
            eyebrow="Who builds it"
            title={
              <>
                One engineer. <span className="tail">No agency middlemen.</span>
              </>
            }
          />
          <Reveal delay={0.08}>
            <p className="mt-6 text-[1.02rem] leading-[1.8]">{profile.about_md}</p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {groups.map((g, i) => (
              <Reveal key={g} delay={0.1 + i * 0.06}>
                <div>
                  <div className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-amber">
                    {g}
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {skills
                      .filter((s) => s.grp === g)
                      .map((s) => (
                        <li key={s.id} className="text-[0.88rem]">
                          {s.label}
                        </li>
                      ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ───────────────────────────── the closer ──────────────────────────────── */

export function FinalCTA({ promise }: { promise?: string }) {
  return (
    <Section>
      <Reveal>
        <div className="panel-raised edge-top relative overflow-hidden px-6 py-16 text-center sm:px-10 lg:py-24">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(640px_320px_at_50%_0%,rgba(240,166,75,0.18),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-2xl">
            <span className="eyebrow">Last thing</span>
            <h2 className="mt-6 text-[clamp(2.1rem,6vw,3.6rem)]">
              Your competitor is replying <span className="tail">right now.</span>
            </h2>
            <p className="mt-6 text-[1.04rem] leading-[1.75]">
              {promise ||
                "Free teardown. Show me your business and I will map exactly where you are losing customers."}{" "}
              Thirty minutes, no pitch, and you keep the map either way.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={WA_DEFAULT}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full sm:w-auto"
              >
                WhatsApp me now
                <ArrowRight size={16} aria-hidden />
              </a>
              <a
                href={CALENDAR}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost w-full sm:w-auto"
              >
                Book the 30 minutes
                <ArrowUpRight size={15} aria-hidden />
              </a>
            </div>

            <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-faint">
              {WHATSAPP_PRETTY} / {CITY}
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ──────────────────────────────── footer ───────────────────────────────── */

export function Footer({ projects = [] }: { projects?: Project[] }) {
  return (
    <footer className="border-t border-line bg-ink-2 px-5 pb-28 pt-16 sm:px-8 md:pb-16">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-[10px] border border-line bg-ink-3 font-mono text-[0.72rem] text-amber">
                EN
              </span>
              <span className="font-display text-[1.1rem] text-ivory">{NAME}</span>
            </div>
            <p className="mt-4 max-w-sm text-[0.9rem] leading-[1.7]">
              {ROLE} in {CITY}. I build the systems that catch your customers, answer them and
              book them — so the business keeps earning when you put the phone down.
            </p>
            <div className="mt-5 flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-live">
              <span className="dot-live" aria-hidden />
              Taking {OFFER.slots} builds this month
            </div>
          </div>

          <nav aria-label="Site">
            <div className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-faint">
              Site
            </div>
            <ul className="mt-3 space-y-0.5 text-[0.9rem]">
              {[
                ["/system", "See it working"],
                ["/work", "The work"],
                ["/services", "What I build"],
                ["/about", "About"],
                ["/contact", "Start a build"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-block py-1 transition-colors duration-200 hover:text-ivory"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <div className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-faint">
              Reach me
            </div>
            <ul className="mt-3 space-y-0.5 text-[0.9rem]">
              <li>
                <a
                  href={WA_DEFAULT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1 transition-colors duration-200 hover:text-ivory"
                >
                  WhatsApp {WHATSAPP_PRETTY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-block py-1 transition-colors duration-200 hover:text-ivory"
                >
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={CALENDAR}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1 transition-colors duration-200 hover:text-ivory"
                >
                  Book a call
                </a>
              </li>
            </ul>

            {!!projects.length && (
              <>
                <div className="mt-7 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-faint">
                  Live builds
                </div>
                <ul className="mt-3 space-y-0.5 text-[0.9rem]">
                  {projects.slice(0, 3).map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/work/${slugify(p.title)}`}
                        className="inline-block py-1 transition-colors duration-200 hover:text-ivory"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[0.68rem] text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {NAME}. Built in Kigali.
          </span>
          <span>Every system on this page is live.</span>
        </div>
      </div>
    </footer>
  );
}
