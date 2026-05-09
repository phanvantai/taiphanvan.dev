"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import type { TrackerFilter, TrackerSort } from "@/types/tracker";

const FILTERS: { value: TrackerFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "paused", label: "Paused" },
  { value: "done", label: "Done" },
  { value: "archived", label: "Archived" },
];

const SORTS: { value: TrackerSort; label: string }[] = [
  { value: "recent", label: "Recent" },
  { value: "stale", label: "Most stale" },
];

interface Props {
  filter: TrackerFilter;
  sort: TrackerSort;
  count: number;
}

export function FilterBar({ filter, sort, count }: Props) {
  const pathname = usePathname();
  const params = useSearchParams();

  function buildHref(updates: { filter?: TrackerFilter; sort?: TrackerSort }) {
    const next = new URLSearchParams(params);
    if (updates.filter) {
      if (updates.filter === "all") next.delete("filter");
      else next.set("filter", updates.filter);
    }
    if (updates.sort) {
      if (updates.sort === "recent") next.delete("sort");
      else next.set("sort", updates.sort);
    }
    const qs = next.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  return (
    <div className="border-border/60 flex flex-wrap items-center justify-between gap-3 border-b pb-3">
      <div className="-mx-1 flex flex-wrap items-center font-mono text-xs">
        {FILTERS.map((f) => {
          const active = f.value === filter;
          return (
            <Link
              key={f.value}
              href={buildHref({ filter: f.value })}
              className={cn(
                "rounded-md px-2.5 py-1 transition-colors",
                active
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              )}
            >
              {f.label}
            </Link>
          );
        })}
      </div>
      <div className="text-muted-foreground flex items-center gap-2 font-mono text-xs">
        <span>{count} project</span>
        <span aria-hidden>·</span>
        {SORTS.map((s, i) => (
          <span key={s.value} className="contents">
            <Link
              href={buildHref({ sort: s.value })}
              className={cn(
                "rounded-md px-1.5 py-0.5 transition-colors",
                s.value === sort
                  ? "text-foreground underline underline-offset-4"
                  : "hover:text-foreground",
              )}
            >
              {s.label}
            </Link>
            {i === 0 && <span aria-hidden>/</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
