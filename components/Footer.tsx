import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import { EMAIL, NAME, NAV, WA_HELLO, WHATSAPP_PRETTY } from "@/lib/site";
import { ArrowRight, ArrowUpRight, WideName } from "@/components/ui";

export function Footer() {
  return (
    <footer className="ft on-dark" aria-labelledby="ft-title">
      <div className="wrap">
        <p className="label flex items-center gap-2.5">
          <span className="dot" aria-hidden="true" />
          Available for new work
        </p>
        <h2 className="ft__h" id="ft-title">
          Got something worth building?
          <span>Let&apos;s talk it through.</span>
        </h2>
        <p className="ft__p">
          Tell me what you&apos;re working on. I&apos;ll tell you honestly how I&apos;d build it, or
          who would be better for it.
        </p>
        <div className="ft__ctas">
          <a className="btn btn-primary" href={WA_HELLO} target="_blank" rel="noopener noreferrer">
            WhatsApp me
            <ArrowRight />
          </a>
          <Link className="btn btn-ghost" href="/contact">
            Write it down instead
          </Link>
        </div>

        <div className="ft__cols">
          <div>
            <h2>Work</h2>
            <ul>
              {PROJECTS.map((p) => (
                <li key={p.slug}>
                  <Link className="uline" href={`/work/${p.slug}`}>
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Site</h2>
            <ul>
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link className="uline" href={n.href}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Reach me</h2>
            <ul>
              <li>
                <a className="uline inline-flex items-center gap-1.5" href={WA_HELLO} target="_blank" rel="noopener noreferrer">
                  WhatsApp {WHATSAPP_PRETTY}
                  <ArrowUpRight />
                </a>
              </li>
              <li>
                <a className="uline [overflow-wrap:anywhere]" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </li>
              <li className="flex min-h-[2.75rem] items-center">Kigali, Rwanda</li>
            </ul>
          </div>
        </div>

        <WideName text={NAME.toUpperCase()} className="ft__name" />
      </div>
      <div className="wrap">
        <div className="ft__bot">
          <span>
            © {new Date().getFullYear()} {NAME}. Designed and built in Kigali.
          </span>
          <a className="uline" href="#top">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
