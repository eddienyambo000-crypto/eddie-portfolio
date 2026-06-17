import Image from "next/image";
import {
  Clock, AlertTriangle, Power, Globe, MessageCircle, LineChart, Zap,
  ArrowRight, Check, ShieldCheck, Database, ServerCog, Mail, MapPin,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { Stats } from "./Stats";
import { ContactForm } from "./ContactForm";
import { WaIcon } from "./icons";
import { Linkedin, Instagram, Github } from "lucide-react";
import {
  wa, type Profile, type Project, type Service, type Skill, type Testimonial,
} from "@/lib/site";

const wrap = "mx-auto max-w-[1140px] px-6";
const card =
  "rounded-[20px] border border-mocha-line bg-paper shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(176,122,75,0.4)] hover:shadow-[var(--shadow-card)]";

/* ── PROBLEM ── */
const pains = [
  { I: Clock, t: "Hours lost chasing leads", p: "You're stuck replying to the same WhatsApp messages all day instead of closing the big deals that actually grow the business." },
  { I: AlertTriangle, t: "Orders slip through the cracks", p: "Bookings, orders and shipments get missed or mixed up — because it all depends on a human remembering. Every mistake costs you a customer." },
  { I: Power, t: "It all stops when you do", p: "The second you put your phone down, the business stops — no follow-ups, no bookings, no sales. You can't scale what can't run without you." },
];
export function Problem() {
  return (
    <section className={`relative z-[1] py-[104px]`}>
      <div className={wrap}>
        <Reveal className="mx-auto mb-14 max-w-[640px] text-center">
          <span className="eyebrow">THE REAL COST</span>
          <h2 className="mt-3.5 text-[clamp(2rem,4.6vw,3.4rem)]">
            You're the bottleneck — and it's <span className="serif-i">capping your growth.</span>
          </h2>
          <p className="mt-4 text-[1.06rem] text-coffee">
            Right now your business runs on your phone, your memory and your hands. The moment you step away, it stalls. Here's what that's quietly costing you every day:
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-5.5 md:grid-cols-3" style={{ gap: "22px" }}>
          {pains.map((x, i) => (
            <Reveal key={i} delay={i * 0.08} className={`${card} p-[30px]`}>
              <div className="mb-4 grid h-[46px] w-[46px] place-items-center rounded-xl bg-[rgba(154,102,56,0.1)] text-caramel-deep">
                <x.I size={22} />
              </div>
              <h3 className="mb-2 font-sans text-[1.05rem] font-bold text-espresso">{x.t}</h3>
              <p className="text-[0.92rem]">{x.p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── OUTCOME + STATS ── */
export function Outcome({ profile }: { profile: Profile }) {
  return (
    <section className={`relative z-[1] pb-[104px]`}>
      <div className={wrap}>
        <Reveal className="mx-auto mb-14 max-w-[640px] text-center">
          <span className="eyebrow">THE OUTCOME</span>
          <h2 className="mt-3.5 text-[clamp(2rem,4.6vw,3.4rem)]">
            Now imagine it running <span className="serif-i">without you.</span>
          </h2>
          <p className="mt-4 text-[1.06rem] text-coffee">
            Leads captured and qualified, customers followed up and booked, orders and admin handled — automatically, around the clock. You wake up to a business that ran itself. That's what I install — and it's live for real businesses:
          </p>
        </Reveal>
        <Reveal>
          <Stats stats={profile.stats} />
        </Reveal>
      </div>
    </section>
  );
}

/* ── SERVICES ── */
const svcIcons = [Globe, MessageCircle, LineChart, Zap];
export function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className={`relative z-[1] py-[104px]`}>
      <div className={wrap}>
        <Reveal className="mb-14 max-w-[640px]">
          <span className="eyebrow">WHAT I INSTALL</span>
          <h2 className="mt-3.5 text-[clamp(2rem,4.6vw,3.4rem)]">
            Everything your engine <span className="serif-i">does for you.</span>
          </h2>
          <p className="mt-4 text-[1.06rem] text-coffee">
            Not a website — a complete system that captures, follows up, books and runs your operations on autopilot.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const I = svcIcons[i % svcIcons.length];
            return (
              <Reveal key={s.id} delay={i * 0.07} className={`${card} relative overflow-hidden p-[30px]`}>
                <div className="absolute right-5 top-4 font-display text-[2.4rem] font-black text-cream2">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mb-4 grid h-[54px] w-[54px] place-items-center rounded-[15px] border border-[rgba(176,122,75,0.18)] bg-gradient-to-br from-[rgba(176,122,75,0.16)] to-[rgba(154,102,56,0.08)] text-caramel-deep">
                  <I size={24} />
                </div>
                <h3 className="mb-2.5 font-sans text-[1.12rem] font-bold text-espresso">{s.title}</h3>
                <p className="text-[0.92rem]">{s.outcome}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── PROJECTS ── */
export function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className={`relative z-[1] pb-[104px]`}>
      <div className={wrap}>
        <Reveal className="mb-14 max-w-[640px]">
          <span className="eyebrow">PROOF OF WORK</span>
          <h2 className="mt-3.5 text-[clamp(2rem,4.6vw,3.4rem)]">
            Real systems. <span className="serif-i">Real businesses.</span>
          </h2>
          <p className="mt-4 text-[1.06rem] text-coffee">Shipped and running right now — not mockups.</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-[22px] md:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08} className={`${card} group flex flex-col overflow-hidden`}>
              <div
                className="relative grid h-[178px] place-items-center overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${p.accent || "#B07A4B"}, #5e3d28)` }}
              >
                {p.cover_url ? (
                  <Image src={p.cover_url} alt={p.title} fill className="object-cover" sizes="380px" />
                ) : (
                  <span className="px-4 text-center font-display text-[2rem] font-black text-white/90">{p.title}</span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {(p.tags || []).map((t) => (
                    <span key={t} className="rounded-lg border border-[rgba(176,122,75,0.22)] bg-[rgba(176,122,75,0.1)] px-3 py-1 font-mono text-[0.68rem] text-caramel-deep">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="mb-2 font-sans text-[1.16rem] font-bold text-espresso">{p.title}</h3>
                <p className="mb-4.5 flex-1 text-[0.9rem]" style={{ marginBottom: 18 }}>{p.blurb}</p>
                {p.live_url && (
                  <a href={p.live_url} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 font-semibold text-caramel-deep transition-all group-hover:gap-2.5">
                    View live <ArrowRight size={15} />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── WANT-ONE BAND ── */
export function WantBand() {
  return (
    <section className={`relative z-[1] pb-[104px]`}>
      <div className={wrap}>
        <Reveal className="flex flex-col items-start justify-between gap-6 rounded-[22px] border border-mocha-line bg-paper p-8 shadow-[var(--shadow-soft)] md:flex-row md:items-center md:px-9">
          <div>
            <h3 className="max-w-[560px] font-display text-[clamp(1.25rem,2.4vw,1.7rem)] font-extrabold text-espresso">
              Want a system like this running <span className="serif-i">your</span> business 24/7?
            </h3>
            <p className="mt-1 text-[0.92rem] text-coffee">
              Tell me about your business on WhatsApp — I'll map the exact engine I'd install and what it'd do for your sales.
            </p>
          </div>
          <a
            href={wa("Hi Eddie, I saw your work — I want one for my business.")}
            target="_blank"
            rel="noopener"
            className="inline-flex w-full items-center justify-center gap-2 rounded-[13px] bg-[#25D366] px-9 py-4 text-[1.02rem] font-semibold text-[#063d22] shadow-[0_12px_28px_rgba(37,211,102,0.32)] transition-transform duration-300 hover:-translate-y-0.5 md:w-auto"
          >
            <WaIcon className="h-5 w-5" /> Want one? WhatsApp me
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ── PROCESS ── */
const steps = [
  { n: "// TEARDOWN", t: "Free teardown call", p: "We hop on WhatsApp or a 20-min call. I look at your business and show you exactly what's losing you customers and time." },
  { n: "// BUILD", t: "I design & build it", p: "A custom system — site, WhatsApp agent, follow-up and operations wired together. You review, I refine until it's right." },
  { n: "// LAUNCH", t: "It runs without you", p: "We go live. It captures, books and follows up 24/7, I monitor it, and you get customers — not a headache." },
];
export function Process() {
  return (
    <section id="process" className={`relative z-[1] pb-[104px]`}>
      <div className={wrap}>
        <Reveal className="mx-auto mb-14 max-w-[640px] text-center">
          <span className="eyebrow">HOW IT WORKS</span>
          <h2 className="mt-3.5 text-[clamp(2rem,4.6vw,3.4rem)]">
            From overwhelmed to <span className="serif-i">automated</span> in 3 steps.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-[22px] md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 0.08} className={`${card} relative p-[30px]`}>
              <div className="absolute right-6 top-4 font-display text-[3rem] font-black leading-none text-cream2">{i + 1}</div>
              <div className="font-mono text-[0.78rem] font-medium tracking-[0.1em] text-caramel-deep">{s.n}</div>
              <h3 className="mb-2.5 mt-3.5 font-sans text-[1.16rem] font-bold text-espresso">{s.t}</h3>
              <p className="text-[0.92rem]">{s.p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CASE STUDY ── */
export function CaseStudy() {
  return (
    <section className={`relative z-[1] pb-[104px]`}>
      <div className={wrap}>
        <Reveal className="relative overflow-hidden rounded-[26px] p-[clamp(28px,5vw,54px)] text-cream shadow-[var(--shadow-lg)]" style={{ background: "linear-gradient(140deg,#2e1c12,#3f2818)" }}>
          <div className="pointer-events-none absolute -right-16 -top-24 h-[340px] w-[340px]" style={{ background: "radial-gradient(circle,rgba(176,122,75,0.4),transparent 65%)" }} />
          <span className="eyebrow" style={{ color: "#E6C9A8" }}>CASE STUDY · STEPIN COACHING</span>
          <h2 className="mt-3.5 max-w-[620px] text-white">A WhatsApp AI agent that sells while the owner sleeps.</h2>
          <p className="mt-3.5 max-w-[620px] text-white/80">
            Built "Amina" — an AI sales agent that qualifies every lead, books calls, and runs a 7-day follow-up sequence into a live CRM. The owner stopped manually chasing leads entirely.
          </p>
          <div className="mt-7 flex flex-wrap gap-9">
            {[["24/7", "Always-on replies"], ["7-day", "Auto follow-up drip"], ["0", "Manual lead chasing"]].map(([v, l]) => (
              <div key={l}>
                <div className="font-display text-[2.4rem] font-black leading-none text-white">{v}</div>
                <div className="mt-1.5 font-mono text-[0.8rem]" style={{ color: "#E6C9A8" }}>{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── TESTIMONIALS ── */
export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null;
  return (
    <section className={`relative z-[1] pb-[104px]`}>
      <div className={wrap}>
        <Reveal className="mx-auto mb-14 max-w-[640px] text-center">
          <span className="eyebrow">WHAT CLIENTS SAY</span>
          <h2 className="mt-3.5 text-[clamp(2rem,4.6vw,3.4rem)]">Trusted to <span className="serif-i">deliver.</span></h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-[22px] md:grid-cols-3">
          {testimonials.map((t, i) => {
            const q = (t.quote || "").replace(/^["“”\s]+|["“”\s]+$/g, "");
            return (
              <Reveal key={t.id} delay={i * 0.08} className={`${card} p-[30px]`}>
                <p className="mb-5.5 font-display text-[1.12rem] font-medium italic leading-[1.5] text-espresso" style={{ marginBottom: 22 }}>
                  “{q}”
                </p>
                <div className="flex items-center gap-3.5">
                  <div className="grid h-[46px] w-[46px] flex-shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-mocha to-caramel font-bold text-espresso">
                    {t.avatar_url ? <Image src={t.avatar_url} alt={t.name} width={46} height={46} className="h-full w-full object-cover" /> : (t.name || "?")[0]}
                  </div>
                  <div>
                    <div className="text-[0.92rem] font-bold text-espresso">{t.name}</div>
                    <div className="text-[0.8rem] text-coffee-soft">{t.role}</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── ABOUT / CAPABILITIES ── */
const grpIcons: Record<number, typeof MessageCircle> = { 0: MessageCircle, 1: Database, 2: ShieldCheck };
export function About({ profile, skills }: { profile: Profile; skills: Skill[] }) {
  const groups: { grp: string; labels: string[] }[] = [];
  for (const s of skills) {
    let g = groups.find((x) => x.grp === s.grp);
    if (!g) { g = { grp: s.grp, labels: [] }; groups.push(g); }
    g.labels.push(s.label);
  }
  return (
    <section id="about" className={`relative z-[1] pb-[104px]`}>
      <div className={wrap}>
        <Reveal className="mb-14 max-w-[700px]">
          <span className="eyebrow">WHAT YOUR ENGINE DOES</span>
          <h2 className="mt-3.5 text-[clamp(2rem,4.6vw,3.4rem)]">Built to run your business <span className="serif-i">without you.</span></h2>
          <p className="mt-4 text-[1.06rem] text-coffee">{profile.about_md}</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-[22px] md:grid-cols-3">
          {groups.map((g, i) => {
            const I = grpIcons[i] || ServerCog;
            return (
              <Reveal key={g.grp} delay={i * 0.08} className={`${card} p-[30px]`}>
                <div className="mb-5 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-[11px] bg-[rgba(176,122,75,0.12)] text-caramel-deep">
                    <I size={20} />
                  </div>
                  <h3 className="font-sans text-[1.02rem] font-bold leading-tight text-espresso">{g.grp}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.labels.map((l) => (
                    <span key={l} className="rounded-full border border-mocha-line bg-cream2 px-3.5 py-1.5 font-mono text-[0.74rem] text-coffee transition-all hover:-translate-y-0.5 hover:border-caramel">
                      {l}
                    </span>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── THE OFFER ── */
const stack = [
  "A conversion-built website — your 24/7 salesperson",
  "A WhatsApp AI agent that captures, qualifies & books leads on autopilot",
  "Automated follow-up so no lead ever goes cold",
  "A smart database that remembers every customer, order & booking",
  "Live dashboards & auto-reports — your whole business at a glance",
  "Runs 24/7 on a 99.9%-uptime engine — and you own all of it",
];
export function Offer() {
  return (
    <section id="offer" className={`relative z-[1] pb-[104px]`}>
      <div className={wrap}>
        <Reveal className="relative grid grid-cols-1 overflow-hidden rounded-[28px] text-cream shadow-[var(--shadow-lg)] md:grid-cols-[1.05fr_0.95fr]" >
          <div className="pointer-events-none absolute -right-24 -top-24 z-0 h-[380px] w-[380px]" style={{ background: "radial-gradient(circle,rgba(176,122,75,0.45),transparent 65%)" }} />
          <div className="relative z-[1] p-[clamp(32px,4vw,52px)]" style={{ background: "linear-gradient(150deg,#34200f,#2e1c12)" }}>
            <span className="eyebrow" style={{ color: "#E6C9A8" }}>THE OFFER</span>
            <h2 className="mt-3.5 text-[clamp(1.9rem,3.6vw,2.8rem)] text-white">
              The 24/7 Automated <span className="serif-i" style={{ color: "#E6C9A8" }}>Business Engine.</span>
            </h2>
            <p className="mt-4 text-[1.02rem] text-white/80">
              I install a complete system that captures customers, follows them up, books them, and runs your operations — 24/7, without you lifting a finger. Done-for-you, start to finish.
            </p>
            <div className="mt-6 flex flex-wrap gap-6.5" style={{ gap: 26 }}>
              {[["2–3 wks", "START TO LIVE"], ["24/7", "RUNS ITSELF"], ["30-day", "GUARANTEE"]].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display text-[1.5rem] font-black leading-none text-white">{v}</div>
                  <div className="mt-1.5 font-mono text-[0.72rem]" style={{ color: "#E6C9A8" }}>{l}</div>
                </div>
              ))}
            </div>
            <div className="mt-5.5 flex items-start gap-2.5 rounded-[14px] border border-[rgba(230,201,168,0.22)] bg-[rgba(230,201,168,0.1)] p-4 text-[0.88rem] text-[#F3E9DC]" style={{ marginTop: 22 }}>
              <ShieldCheck size={20} className="mt-0.5 flex-shrink-0" style={{ color: "#E6C9A8" }} />
              <span><b>The 30-Day Automation Guarantee.</b> If your engine isn't noticeably automating your customer-getting or operations within 30 days of launch, I work for free until it is — or you get a full refund. The risk is 100% mine.</span>
            </div>
            <div className="mt-6.5 flex flex-wrap gap-3" style={{ marginTop: 26 }}>
              <a href={wa("Hi Eddie, I want the Automated Business Engine.")} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-[13px] bg-[#25D366] px-9 py-4 text-[1.02rem] font-semibold text-[#063d22] shadow-[0_12px_28px_rgba(37,211,102,0.32)] transition-transform duration-300 hover:-translate-y-0.5">
                <WaIcon className="h-5 w-5" /> Message Me on WhatsApp
              </a>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-[13px] border border-[rgba(230,201,168,0.3)] bg-transparent px-9 py-4 text-[1.02rem] font-semibold text-[#F3E9DC] transition-transform duration-300 hover:-translate-y-0.5">
                or use the form ↓
              </a>
            </div>
          </div>
          <div className="relative z-[1] border-t border-[rgba(230,201,168,0.14)] p-[clamp(32px,4vw,52px)] md:border-l md:border-t-0" style={{ background: "rgba(0,0,0,0.16)" }}>
            <div className="eyebrow mb-5" style={{ color: "#E6C9A8" }}>WHAT YOU GET</div>
            <ul className="flex flex-col gap-3.5">
              {stack.map((s) => (
                <li key={s} className="flex items-start gap-3 text-[0.96rem] text-[#F3E9DC]">
                  <span className="mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-[7px] bg-[rgba(230,201,168,0.16)] text-[#E6C9A8]">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── CONTACT ── */
export function Contact() {
  return (
    <section id="contact" className={`relative z-[1] pb-[104px]`}>
      <div className={wrap}>
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <span className="eyebrow">GET IN TOUCH</span>
            <h2 className="mt-3.5 text-[clamp(2rem,4.6vw,3.4rem)]">Let's build your engine.</h2>
            <p className="mb-6.5 mt-4 text-[1.06rem] text-coffee" style={{ marginBottom: 26 }}>
              WhatsApp is fastest — but the form works too. Either way, I reply same day.
            </p>
            <div className="flex flex-col gap-3">
              <a href="mailto:eddienyambo000@gmail.com" className="inline-flex items-center gap-2.5 rounded-[14px] border border-mocha-line bg-paper py-3.5 text-[0.92rem] font-medium text-espresso shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:border-caramel" style={{ paddingLeft: 18, paddingRight: 18 }}>
                <Mail size={18} className="text-caramel-deep" /> eddienyambo000@gmail.com
              </a>
              <a href={wa("Hi Eddie, I want an automated system for my business.")} target="_blank" rel="noopener" className="inline-flex items-center gap-2.5 rounded-[14px] border border-mocha-line bg-paper py-3.5 text-[0.92rem] font-medium text-espresso shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:border-caramel" style={{ paddingLeft: 18, paddingRight: 18 }}>
                <WaIcon className="h-[18px] w-[18px] text-caramel-deep" /> +250 791 811 234
              </a>
              <div className="inline-flex items-center gap-2.5 rounded-[14px] border border-mocha-line bg-paper py-3.5 text-[0.92rem] font-medium text-espresso shadow-[var(--shadow-soft)]" style={{ paddingLeft: 18, paddingRight: 18 }}>
                <MapPin size={18} className="text-caramel-deep" /> Kibagabaga, Kigali, Rwanda
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
export function Footer() {
  return (
    <footer className="relative z-[1] border-t border-mocha-line bg-cream2 py-10">
      <div className={`${wrap} flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left`}>
        <div className="text-[0.85rem] text-coffee-soft">
          <b className="text-espresso">Eddie Nyambo</b> — I install automated business systems that run companies, in Rwanda &amp; beyond 🇷🇼
          <br />© {new Date().getFullYear()} · Worked with me?{" "}
          <a href="/share" className="font-semibold text-caramel-deep">Share your experience →</a>
        </div>
        <div className="flex gap-3">
          {[
            { I: Linkedin, href: "https://www.linkedin.com/in/eddie-nyambo-41a460345/" },
            { I: Instagram, href: "https://www.instagram.com/eddien_0/" },
            { I: Github, href: "https://github.com/eddienyambo000-crypto" },
          ].map(({ I, href }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener" className="grid h-[38px] w-[38px] place-items-center rounded-[10px] border border-mocha-line bg-paper text-coffee transition-all hover:-translate-y-0.5 hover:text-espresso">
              <I size={18} />
            </a>
          ))}
          <a href={wa("Hi Eddie, I want an automated system for my business.")} target="_blank" rel="noopener" className="grid h-[38px] w-[38px] place-items-center rounded-[10px] border border-mocha-line bg-paper text-coffee transition-all hover:-translate-y-0.5 hover:text-[#25D366]">
            <WaIcon className="h-[18px] w-[18px]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
