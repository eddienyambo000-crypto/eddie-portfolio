import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ArrowUpRight } from "@/components/ui";
import { EMAIL, WA_HELLO, WHATSAPP_PRETTY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Eddie Nyambo what you're building. WhatsApp is fastest; email works too. Based in Kigali, working with clients anywhere.",
  alternates: { canonical: "/contact" },
};

const STEPS = [
  "I read it and reply, usually with two or three questions about how things work today.",
  "We talk for half an hour. I tell you what I'd build first, and what I wouldn't build at all.",
  "If it makes sense for both of us, you get a written plan, a price and a date.",
];

export default function ContactPage() {
  return (
    <section className="wrap section pt-[clamp(2rem,6vw,4rem)]" aria-labelledby="contact-title">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
        <div>
          <p className="label">Contact</p>
          <h1 className="h2 mt-4" id="contact-title">
            Tell me what you&apos;re building.
          </h1>
          <p className="lead mt-5">
            A few sentences is plenty. If I&apos;m not the right person for it, I&apos;ll say so and
            point you to someone who is.
          </p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>

        <aside className="lg:pt-24" aria-label="Other ways to reach me">
          <div className="rounded-[1.75rem] bg-mint p-6 sm:p-8">
            <p className="label">Fastest</p>
            <a
              className="mt-3 inline-flex items-center gap-2 text-[clamp(1.4rem,3vw,1.9rem)] font-bold tracking-[-0.03em]"
              href={WA_HELLO}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="uline">WhatsApp {WHATSAPP_PRETTY}</span>
              <ArrowUpRight />
              <span className="sr-only">(opens WhatsApp)</span>
            </a>
            <p className="label mt-6">Email</p>
            <a className="uline mt-2 inline-block break-all font-semibold" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            <p className="label mt-6">Where</p>
            <p className="mt-2 font-semibold">Kigali, Rwanda. Remote anywhere.</p>
          </div>

          <h2 className="label mt-10">What happens next</h2>
          <ol className="mt-4">
            {STEPS.map((s, i) => (
              <li key={s} className="grid grid-cols-[2.25rem_1fr] border-t border-line py-4">
                <span className="font-mono text-[0.8rem] text-ink-2">{String(i + 1).padStart(2, "0")}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}
