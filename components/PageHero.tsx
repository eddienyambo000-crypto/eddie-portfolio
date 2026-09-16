import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Headline } from "@/components/ui";

/** The opening block every inner page shares, so the app feels like one thing. */
export function PageHero({
  eyebrow,
  title,
  lead,
  back = { href: "/", label: "Home screen" },
  children,
}: {
  eyebrow: string;
  /** "|" splits off the accent-italic tail, same convention as the CMS headline */
  title: string;
  lead?: string;
  back?: { href: string; label: string } | null;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative px-5 pb-10 pt-28 sm:px-8 sm:pt-32 lg:pb-14 lg:pt-36">
      <div className="mx-auto max-w-[1240px]">
        {back && (
          <Link
            href={back.href}
            className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint transition-colors duration-200 hover:text-amber"
          >
            <ChevronLeft size={13} aria-hidden />
            {back.label}
          </Link>
        )}

        <span className="eyebrow mt-6 flex w-max max-w-full">{eyebrow}</span>

        <h1 className="mt-5 max-w-[19ch] text-[clamp(2.4rem,7vw,4.6rem)] leading-[1]">
          <Headline text={title} />
        </h1>

        {lead && (
          <p className="mt-6 max-w-xl text-[1.04rem] leading-[1.75]">{lead}</p>
        )}

        {children}
      </div>
    </section>
  );
}
