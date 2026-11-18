import type { Metadata } from "next";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import { ArrowRight } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="wrap section" aria-labelledby="nf-title">
      <p className="label">404</p>
      <h1 className="h2 mt-4 max-w-[14ch]" id="nf-title">
        This page isn&apos;t here.
      </h1>
      <p className="lead mt-5">It may have moved when the site was rebuilt. These are all live:</p>
      <ul className="mt-10 border-b border-line">
        {PROJECTS.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/work/${p.slug}`}
              className="group flex min-h-[3.5rem] items-center justify-between gap-4 border-t border-line py-4 text-[clamp(1.4rem,3vw,2rem)] font-bold tracking-[-0.03em]"
            >
              {p.name}
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ul>
      <Link className="btn btn-primary mt-10" href="/">
        Back to the start
      </Link>
    </section>
  );
}
