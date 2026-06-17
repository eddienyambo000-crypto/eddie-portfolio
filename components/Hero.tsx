"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Instagram, Github, ArrowRight, Check, Zap, BadgeCheck } from "lucide-react";
import { WaIcon } from "./icons";
import { wa, type Profile } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

function AnimatedHeadline({ text, className }: { text: string; className?: string }) {
  const [head, tail] = text.split("|");
  const headWords = head.trim().split(/\s+/);
  const tailWords = (tail || "").trim().split(/\s+/).filter(Boolean);
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } };
  const word = {
    hidden: { opacity: 0, y: "0.4em" },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
  };
  return (
    <motion.h1 variants={container} initial="hidden" animate="show" className={className}>
      {headWords.map((w, i) => (
        <motion.span key={`h${i}`} variants={word} className="mr-[0.25em] inline-block">
          {w}
        </motion.span>
      ))}
      {tailWords.map((w, i) => (
        <motion.span key={`t${i}`} variants={word} className="serif-i mr-[0.25em] inline-block">
          {w}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="home" className="relative z-[1] overflow-hidden pb-[84px] pt-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
      </div>
      <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-8 px-6 md:grid-cols-[1.15fr_0.85fr] md:gap-14">
        {/* text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="order-2 text-center md:order-1 md:text-left"
        >
          <span className="eyebrow">{profile.hero_eyebrow}</span>
          <AnimatedHeadline
            text={profile.hero_h1}
            className="mt-5 font-display text-[clamp(2.4rem,6vw,4.4rem)] font-black leading-[1.02]"
          />
          <p className="mx-auto mt-6 max-w-[520px] text-[clamp(1.04rem,1.6vw,1.18rem)] text-coffee md:mx-0">
            {profile.hero_sub}
          </p>

          <div className="mt-6 flex items-center justify-center gap-2.5 text-[0.95rem] font-medium text-espresso md:justify-start">
            <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-[rgba(176,122,75,0.14)] text-caramel-deep">
              <Check size={13} strokeWidth={3} />
            </span>
            <span className="text-left">{profile.hero_promise}</span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <a
              href={wa("Hi Eddie, I want an automated system for my business.")}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 rounded-[13px] bg-gradient-to-br from-caramel to-caramel-deep px-9 py-4 text-[1.02rem] font-semibold text-white shadow-[0_12px_28px_rgba(176,122,75,0.18)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Get My Free Teardown <ArrowRight size={17} />
            </a>
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 rounded-[13px] border border-mocha-line bg-paper px-9 py-4 text-[1.02rem] font-semibold text-espresso shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-0.5 hover:border-caramel"
            >
              See My Work
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 md:justify-start">
            <div className="flex">
              {["S", "F", "H", "+"].map((c, i) => (
                <span
                  key={i}
                  className="grid h-[34px] w-[34px] place-items-center rounded-full border-2 border-cream bg-gradient-to-br from-mocha to-caramel text-[0.72rem] font-bold text-espresso"
                  style={{ marginLeft: i === 0 ? 0 : -9 }}
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="text-[0.84rem] text-coffee-soft">
              <span className="tracking-[2px] text-caramel">★★★★★</span>
              <br />
              <b className="text-espresso">3+ systems live</b> · 100% delivery · Kigali → worldwide
            </div>
          </div>

          <div className="mt-7 flex items-center justify-center gap-4 md:justify-start">
            <span className="font-mono text-[0.66rem] tracking-[0.14em] text-coffee-soft">FIND ME</span>
            {[
              { I: Linkedin, href: "https://www.linkedin.com/in/eddie-nyambo-41a460345/", hover: "hover:text-[#0A66C2]" },
              { I: Instagram, href: "https://www.instagram.com/eddien_0/", hover: "hover:text-[#E1306C]" },
              { I: Github, href: "https://github.com/eddienyambo000-crypto", hover: "hover:text-espresso" },
            ].map(({ I, href, hover }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener"
                className={`grid h-[38px] w-[38px] place-items-center rounded-[10px] border border-mocha-line bg-paper text-coffee transition-all duration-200 hover:-translate-y-0.5 ${hover}`}
              >
                <I size={18} />
              </a>
            ))}
            <a
              href={wa("Hi Eddie, I want an automated system for my business.")}
              target="_blank"
              rel="noopener"
              className="grid h-[38px] w-[38px] place-items-center rounded-[10px] border border-mocha-line bg-paper text-coffee transition-all duration-200 hover:-translate-y-0.5 hover:text-[#25D366]"
            >
              <WaIcon className="h-[18px] w-[18px]" />
            </a>
          </div>
        </motion.div>

        {/* portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="relative order-1 mx-auto w-[min(62%,250px)] md:order-2 md:w-[min(100%,400px)]"
        >
          {/* offset frame */}
          <div className="pointer-events-none absolute inset-0 -z-10 translate-x-4 translate-y-4 rounded-3xl border border-caramel opacity-55" />
          <div className="relative aspect-[7/10] overflow-hidden rounded-[24px] border border-mocha-line bg-gradient-to-b from-cream2 to-mocha shadow-[var(--shadow-lg)]">
            <Image
              src={profile.photo_url || "/eddie.jpg"}
              alt="Eddie Nyambo — automation engineer"
              fill
              priority
              sizes="(max-width:768px) 62vw, 400px"
              className="object-cover"
              style={{ objectPosition: "center 46%" }}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-t from-[rgba(46,28,18,0.34)] to-transparent" />
          </div>

          {/* floating chips */}
          <div className="animate-floaty absolute -right-3.5 top-6 z-[3] hidden items-center gap-2 rounded-[13px] border border-mocha-line bg-paper px-3.5 py-2.5 text-[0.78rem] font-semibold text-espresso shadow-[var(--shadow-card)] sm:flex">
            <Zap size={16} className="text-caramel-deep" /> Live in 2–3 weeks
          </div>
          <div className="animate-floaty absolute -left-5 top-[46%] z-[3] hidden items-center gap-2 rounded-[13px] border border-mocha-line bg-paper px-3.5 py-2.5 text-[0.78rem] font-semibold text-espresso shadow-[var(--shadow-card)] sm:flex" style={{ animationDelay: "0.8s" }}>
            <BadgeCheck size={16} className="text-caramel-deep" /> Runs 24/7
          </div>
          <div className="absolute bottom-[18px] left-[18px] z-[3] flex items-center gap-2.5 rounded-[14px] border border-mocha-line bg-white/90 px-4 py-2.5 shadow-[var(--shadow-card)] backdrop-blur">
            <span className="animate-pulsedot h-2.5 w-2.5 rounded-full bg-[#2faa5a]" />
            <div>
              <b className="block text-[0.84rem] leading-tight text-espresso">Available for hire</b>
              <span className="text-[0.72rem] text-coffee-soft">Kibagabaga, Kigali 🇷🇼</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
