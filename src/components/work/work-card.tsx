import Link from "next/link";

import { cn } from "@/lib/utils";
import type { WorkListItem } from "@/types/work";

const STATUS_LABEL: Record<WorkListItem["status"], string> = {
  shipped: "Shipped",
  "in-progress": "In progress",
  archived: "Archived",
};

const STATUS_TONE: Record<WorkListItem["status"], string> = {
  shipped: "border-emerald-500/30 text-emerald-500",
  "in-progress": "border-amber-500/30 text-amber-500",
  archived: "border-border/40 text-muted-foreground",
};

interface Props {
  work: WorkListItem;
}

export function WorkCard({ work }: Props) {
  return (
    <Link href={`/work/${work.slug}`} className="group">
      <article className="border-border/60 bg-card group-hover:border-foreground/30 flex h-full flex-col gap-3 rounded-xl border p-5 transition-colors">
        <div className="flex items-start justify-between gap-2">
          <h3 className="group-hover:text-primary text-lg font-semibold tracking-tight transition-colors">
            {work.title}
          </h3>
          <span
            className={cn(
              "rounded-md border px-2 py-0.5 font-mono text-[10px] tracking-wide uppercase",
              STATUS_TONE[work.status],
            )}
          >
            {STATUS_LABEL[work.status]}
          </span>
        </div>

        <p className="text-muted-foreground line-clamp-2 text-sm">{work.tagline}</p>

        <div className="text-muted-foreground mt-auto flex flex-wrap items-center gap-1.5 pt-2 font-mono text-[10px]">
          <span>{work.period}</span>
          {work.stack.slice(0, 3).map((s) => (
            <span key={s} className="border-border/40 rounded-md border px-1.5 py-0.5">
              {s}
            </span>
          ))}
          {work.stack.length > 3 && <span>+{work.stack.length - 3}</span>}
        </div>
      </article>
    </Link>
  );
}
