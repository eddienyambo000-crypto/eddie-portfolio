import type { Metadata } from "next";
import { CalendarCheck, Mail, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Footer, Section } from "@/components/sections";
import { Reveal } from "@/components/ui";
import { getContent } from "@/lib/content";
import { CALENDAR, EMAIL, OFFER, WA_DEFAULT, WHATSAPP_PRETTY } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Start a build",
  description:
    "Free teardown of your business: 30 minutes, no pitch, and you keep the map either way. WhatsApp, email or book a call.",
  alternates: { canonical: "/contact" },
};

const WAYS = [
  {
    Icon: MessageCircle,
    label: "WhatsApp",
    value: WHATSAPP_PRETTY,
    note: "Fastest. I usually reply the same hour.",
    href: WA_DEFAULT,
  },
  {
    Icon: CalendarCheck,
    label: "Book the 30 minutes",
    value: "Free teardown call",
    note: "Pick a slot that suits you. No pitch, no deck.",
    href: CALENDAR,
  },
  {
    Icon: Mail,
    label: "Email",
    value: EMAIL,
    note: "Best if you want to send documents first.",
    href: `mailto:${EMAIL}`,
  },
];

export default async function ContactPage() {
  const d = await getContent();

  return (
    <>
      <PageHero
        eyebrow={`${OFFER.slots} build slots left this month`}
        title="Show me the business.|I will show you the leak."
        lead="Thirty minutes. I map how customers reach you now and exactly where they fall out. You keep that map whether you hire me or not — it is useful either way."
      />

      <Section tight>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] lg:gap-6">
          <ContactForm />

          <div className="flex flex-col gap-3">
            {WAYS.map((w, i) => (
              <Reveal key={w.label} delay={i * 0.07}>
                <a
                  href={w.href}
                  target={w.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="panel group flex h-full items-start gap-4 p-5 transition-[transform,border-color] duration-400 [transition-timing-function:var(--ease-spring)] hover:-translate-y-1 hover:border-amber-dim lg:p-6"
                >
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-xl border border-line bg-ink-3 text-amber">
                    <w.Icon size={18} strokeWidth={1.7} aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[0.66rem] uppercase tracking-[0.16em] text-faint">
                      {w.label}
                    </span>
                    <span className="mt-1 block truncate text-[1rem] text-ivory">{w.value}</span>
                    <span className="mt-1.5 block text-[0.85rem] leading-relaxed">{w.note}</span>
                  </span>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.24}>
              <div className="panel-raised edge-top p-5 lg:p-6">
                <div className="flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-live">
                  <span className="dot-live" aria-hidden />
                  What happens next
                </div>
                <ol className="mt-4 space-y-3 text-[0.88rem] leading-relaxed">
                  {[
                    "I reply and ask three questions about how customers reach you.",
                    "We do 30 minutes. I map the leak and tell you what to fix first.",
                    "If it is worth building, I quote it. If it is not, I tell you that too.",
                  ].map((s, i) => (
                    <li key={s} className="flex gap-3">
                      <span className="font-mono text-[0.72rem] text-amber">0{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Footer projects={d.projects} />
    </>
  );
}
