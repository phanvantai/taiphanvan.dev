import Link from "next/link";
import { useLocale } from "next-intl";

import { withLocale, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface Props {
  tags: { tag: string; count: number }[];
  activeTag?: string;
}

export function TagFilter({ tags, activeTag }: Props) {
  const locale = useLocale() as Locale;

  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
      <Link
        href={withLocale(locale, "/blog")}
        data-active={!activeTag}
        className={cn(
          "site-tag-link rounded-md border px-2.5 py-1 transition-colors",
          !activeTag
            ? "border-foreground bg-foreground text-background"
            : "border-border/60 text-muted-foreground hover:border-foreground/40 hover:text-foreground",
        )}
      >
        All
      </Link>
      {tags.map(({ tag, count }) => {
        const active = activeTag === tag;
        return (
          <Link
            key={tag}
            href={`${withLocale(locale, "/blog")}?tag=${encodeURIComponent(tag)}`}
            data-active={active}
            className={cn(
              "site-tag-link rounded-md border px-2.5 py-1 transition-colors",
              active
                ? "border-foreground bg-foreground text-background"
                : "border-border/60 text-muted-foreground hover:border-foreground/40 hover:text-foreground",
            )}
          >
            #{tag}
            <span className="ml-1 text-[10px] opacity-60">{count}</span>
          </Link>
        );
      })}
    </div>
  );
}
