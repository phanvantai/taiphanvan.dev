import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { WorkCard } from "@/components/work/work-card";
import { getFeaturedWork } from "@/lib/mdx";

export function FeaturedWork() {
  const featured = getFeaturedWork();
  if (featured.length === 0) return null;

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <header className="mb-8 flex items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="text-muted-foreground font-mono text-xs">/work</p>
          <h2 className="text-2xl font-semibold tracking-tight">Featured work</h2>
        </div>
        <Link
          href="/work"
          className="group text-muted-foreground hover:text-foreground inline-flex items-center gap-1 font-mono text-xs transition-colors"
        >
          All work
          <ArrowRightIcon className="size-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((w) => (
          <WorkCard key={w.slug} work={w} />
        ))}
      </div>
    </section>
  );
}
