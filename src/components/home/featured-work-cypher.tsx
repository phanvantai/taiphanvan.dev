import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { withLocale, type Locale } from "@/i18n/routing";
import { getFeaturedWork } from "@/lib/mdx";
import type { WorkListItem } from "@/types/work";

const STATUS_LABEL: Record<WorkListItem["status"], { label: string; tone: string }> = {
  shipped: { label: "DEPLOYED", tone: "cy-tag-cyan" },
  "in-progress": { label: "ACTIVE", tone: "cy-tag-pink" },
  archived: { label: "ARCHIVED", tone: "cy-tag" },
};

const KANJI_GLYPHS = ["株", "電", "賽", "脳", "記", "夢"] as const;

export function FeaturedWorkCypher() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Home.work");
  const featured = getFeaturedWork(locale);
  if (featured.length === 0) return null;

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-10 sm:py-24">
      <header className="mb-10">
        <p className="cy-rule cy-mono text-[10.5px] tracking-[0.22em] uppercase">
          <span>{t("cypherRule")}</span>
        </p>
        <div className="mt-6 flex items-end justify-between gap-4">
          <h2 className="cy-display text-foreground text-3xl sm:text-5xl">
            {t("cypherTitlePrefix")} <span className="cy-amber">{t("cypherTitleAccent")}</span>
            <span className="cy-pink">/</span>
          </h2>
          <Link
            href={withLocale(locale, "/work")}
            className="cy-mono cy-amber border-foreground/30 inline-flex items-center gap-1.5 border px-3 py-1.5 text-[10.5px] tracking-[0.22em] uppercase transition-colors hover:border-[var(--cy-amber)]"
          >
            {t("fullArchive")} <ArrowUpRightIcon className="size-3.5" />
          </Link>
        </div>
      </header>

      <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {featured.map((w, i) => {
          const status = STATUS_LABEL[w.status];
          const kanji = KANJI_GLYPHS[i % KANJI_GLYPHS.length];
          return (
            <li key={w.slug}>
              <Link
                href={withLocale(locale, `/work/${w.slug}`)}
                className="cy-card group relative flex h-full flex-col gap-3 overflow-hidden p-6"
              >
                {/* Kanji watermark */}
                <span
                  className="cy-kanji absolute -right-2 -bottom-6 text-[8rem] leading-none opacity-30 transition-opacity group-hover:opacity-60"
                  style={{ writingMode: "horizontal-tb" }}
                  aria-hidden
                >
                  {kanji}
                </span>

                <div className="relative flex items-start justify-between gap-3">
                  <span className="cy-id">K-{String(i + 1).padStart(3, "0")}</span>
                  <span className={`cy-tag ${status.tone}`}>{status.label}</span>
                </div>

                <h3 className="cy-display text-foreground relative mt-1 text-2xl">{w.title}</h3>
                <p className="text-foreground/80 relative text-sm leading-relaxed">{w.tagline}</p>

                <div className="border-foreground/15 cy-mono relative mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 border-t pt-3 text-[10px] tracking-[0.18em] uppercase">
                  <span className="cy-amber">◇ {w.period}</span>
                  <span className="text-muted-foreground/60" aria-hidden>
                    ·
                  </span>
                  <span className="text-foreground/70 truncate">
                    {w.stack.slice(0, 4).join(" / ")}
                  </span>
                  <ArrowUpRightIcon className="cy-pink ml-auto size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
