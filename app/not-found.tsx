import Link from "next/link";
import { INDEX_ROWS } from "@/lib/site";
import { Wrap } from "@/components/Page";

export default function NotFound() {
  return (
    <Wrap className="pb-[var(--space-section)] pt-20">
      <span className="label tnum">404</span>
      <h1 className="display mt-6 max-w-[14ch] text-[clamp(2.4rem,7.4vw,5rem)] text-ink">
        That page is not <span className="italic-accent">in the index.</span>
      </h1>
      <p className="mt-6 max-w-[46ch] text-[1.02rem] leading-relaxed">
        It moved, or it never existed. Here is everything that does.
      </p>

      <nav aria-label="Index" className="mt-12 border-t border-stone-2">
        {INDEX_ROWS.map((r) => (
          <Link
            key={r.no}
            href={r.href}
            className="group flex items-baseline gap-5 border-b border-stone-2 py-5"
          >
            <span className="label tnum">{r.no}</span>
            <span className="display flex-1 text-[clamp(1.5rem,3.4vw,2.1rem)] text-ink">
              {r.label}
            </span>
            <span
              aria-hidden
              className="text-meta transition-[transform,color] duration-[520ms] [transition-timing-function:var(--ease-out-soft)] group-hover:translate-x-1 group-hover:text-vermilion-ink"
            >
              &#8594;
            </span>
          </Link>
        ))}
      </nav>
    </Wrap>
  );
}
