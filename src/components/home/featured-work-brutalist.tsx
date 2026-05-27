import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { withLocale, type Locale } from "@/i18n/routing";
import { getFeaturedWork } from "@/lib/mdx";
import type { WorkListItem } from "@/types/work";

const STATUS_LABEL: Record<WorkListItem["status"], string> = {
  shipped: "SHIPPED",
  "in-progress": "WIP",
  archived: "ARCHIVED",
};

export function FeaturedWorkBrutalist() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Home.work");
  const featured = getFeaturedWork(locale);
  if (featured.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <header className="border-foreground bg-foreground text-background mb-8 flex flex-wrap items-center justify-between gap-4 border-2 px-4 py-3">
        <h2 className="nb-display text-2xl sm:text-3xl">
          {t("brutalistTitle")} <span className="text-accent">★</span>
        </h2>
        <Link
          href={withLocale(locale, "/work")}
          className="bg-accent text-accent-foreground border-background inline-flex items-center gap-1 border-2 px-3 py-1 font-mono text-xs font-bold uppercase transition-transform hover:translate-x-[-2px]"
        >
          {t("brutalistAll")} <ArrowUpRightIcon className="size-3.5" />
        </Link>
      </header>

      <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {featured.map((w, i) => (
          <li key={w.slug}>
            <Link
              href={withLocale(locale, `/work/${w.slug}`)}
              className="nb-card group flex h-full flex-col gap-3 p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="nb-display text-accent text-4xl tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="nb-tag">{STATUS_LABEL[w.status]}</span>
              </div>
              <h3 className="nb-display text-foreground text-2xl">{w.title}</h3>
              <p className="text-foreground/85 text-sm leading-relaxed">{w.tagline}</p>
              <div className="border-foreground/80 mt-auto border-t-2 pt-3">
                <p className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                  {w.period}
                </p>
                <p className="text-foreground mt-1 truncate font-mono text-xs font-bold uppercase">
                  {w.stack.slice(0, 4).join(" / ")}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
