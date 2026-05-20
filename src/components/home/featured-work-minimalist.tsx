import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

import { getFeaturedWork } from "@/lib/mdx";
import type { WorkListItem } from "@/types/work";

const STATUS_LABEL: Record<WorkListItem["status"], string> = {
  shipped: "shipped",
  "in-progress": "in progress",
  archived: "archived",
};

export function FeaturedWorkMinimalist() {
  const featured = getFeaturedWork();
  if (featured.length === 0) return null;

  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
      <header className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <p className="mn-eyebrow">Selected work</p>
          <h2 className="mn-display text-foreground mt-2 text-3xl sm:text-4xl">
            Things mình đã làm.
          </h2>
        </div>
        <Link
          href="/work"
          className="text-muted-foreground hover:text-foreground mn-link-underline inline-flex items-center gap-1 text-sm font-medium"
        >
          All work <ArrowUpRightIcon className="size-3.5" />
        </Link>
      </header>

      <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border sm:grid-cols-2">
        {featured.map((w, i) => (
          <li
            key={w.slug}
            className="bg-card hover:bg-foreground/[0.02] dark:hover:bg-foreground/[0.04] transition-colors"
          >
            <Link
              href={`/work/${w.slug}`}
              className="group flex h-full flex-col gap-4 p-6 sm:p-7"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-muted-foreground font-mono text-xs tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-muted-foreground font-mono text-[11px] tracking-wide"
                  data-status={w.status}
                >
                  {STATUS_LABEL[w.status]}
                </span>
              </div>
              <h3 className="text-foreground text-xl font-medium tracking-tight sm:text-2xl">
                {w.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{w.tagline}</p>
              <div className="border-border mt-auto flex items-center justify-between gap-3 border-t pt-4">
                <p className="text-muted-foreground font-mono text-xs">{w.period}</p>
                <p className="text-muted-foreground truncate font-mono text-xs">
                  {w.stack.slice(0, 3).join(" · ")}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
