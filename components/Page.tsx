import Link from "next/link";
import { Headline } from "@/components/ui";

/** Consistent page width + rhythm. */
export function Wrap({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-[1440px] px-[var(--gutter)] ${className}`}>{children}</div>
  );
}

export function Band({
  children,
  id,
  tight = false,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  tight?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={className}
      style={{
        paddingTop: tight ? "var(--space-section-tight)" : "var(--space-section)",
      }}
    >
      {children}
    </section>
  );
}

/**
 * Every inner page opens the same way: index number, title, one line of
 * orientation. It is the filing system made visible.
 */
export function PageIntro({
  no,
  title,
  lead,
  children,
}: {
  no: string;
  /** "|" splits off the accent italic tail */
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <Wrap className="pt-14 lg:pt-20">
      <div className="flex items-baseline gap-4 sm:gap-6">
        <span className="label tnum">{no}</span>
        <span className="label">Index</span>
      </div>

      <h1 className="display mt-6 max-w-[16ch] text-[clamp(2.4rem,7.4vw,5rem)] text-ink">
        <Headline text={title} />
      </h1>

      {lead && <p className="mt-7 max-w-[52ch] text-[1.05rem] leading-relaxed">{lead}</p>}

      {children}
    </Wrap>
  );
}

/** Closing invitation, used at the foot of the argument pages. */
export function NextStep({
  title,
  lead,
  href = "/contact",
  cta = "Let's talk",
}: {
  title: string;
  lead?: string;
  href?: string;
  cta?: string;
}) {
  return (
    <Band>
      <Wrap>
        <div className="hairline pt-12">
          <h2 className="display max-w-[18ch] text-[clamp(2rem,5.4vw,3.4rem)] text-ink">
            {title}
          </h2>
          {lead && <p className="mt-5 max-w-[48ch] text-[1.02rem] leading-relaxed">{lead}</p>}
          <Link href={href} className="btn btn-primary mt-9">
            {cta}
            <span aria-hidden>&#8594;</span>
          </Link>
        </div>
      </Wrap>
    </Band>
  );
}
