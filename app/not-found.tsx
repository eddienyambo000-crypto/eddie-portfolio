import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DESTINATIONS } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="px-5 pb-28 pt-36 sm:px-8">
      <div className="mx-auto max-w-[1240px]">
        <span className="eyebrow">404</span>
        <h1 className="mt-5 max-w-[16ch] text-[clamp(2.4rem,7vw,4.4rem)] leading-[1]">
          That door does not <span className="tail">open onto anything.</span>
        </h1>
        <p className="mt-6 max-w-lg text-[1.02rem] leading-[1.75]">
          The page moved or never existed. Here is everything that does exist.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {DESTINATIONS.map((d) => (
            <Link
              key={d.key}
              href={d.href}
              className="panel group flex items-center justify-between gap-4 p-5 transition-[transform,border-color] duration-400 [transition-timing-function:var(--ease-spring)] hover:-translate-y-1 hover:border-amber-dim"
            >
              <span>
                <span className="block font-mono text-[0.68rem] text-faint">{d.no}</span>
                <span className="mt-1.5 block font-display text-[1.2rem] text-ivory">
                  {d.label}
                </span>
              </span>
              <ArrowRight
                size={16}
                aria-hidden
                className="flex-none text-faint transition-[color,transform] duration-400 group-hover:translate-x-1 group-hover:text-amber"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
