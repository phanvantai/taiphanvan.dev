"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import type { TocEntry } from "@/lib/toc";

interface Props {
  entries: TocEntry[];
}

export function Toc({ entries }: Props) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (entries.length === 0) return;

    const headings = entries
      .map((e) => document.getElementById(e.slug))
      .filter((el): el is HTMLElement => Boolean(el));

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (records) => {
        // Pick the first intersecting heading from top.
        const visible = records
          .filter((r) => r.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="text-muted-foreground mb-3 font-mono text-[11px] tracking-wider uppercase">
        On this page
      </p>
      <ul className="border-border/60 space-y-1.5 border-l">
        {entries.map((entry) => {
          const isActive = entry.slug === active;
          return (
            <li key={entry.slug} className={cn(entry.depth === 3 && "ml-3")}>
              <a
                href={`#${entry.slug}`}
                className={cn(
                  "-ml-px block border-l-2 py-0.5 pl-3 leading-snug transition-colors",
                  isActive
                    ? "border-foreground text-foreground"
                    : "text-muted-foreground hover:text-foreground border-transparent",
                )}
              >
                {entry.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
