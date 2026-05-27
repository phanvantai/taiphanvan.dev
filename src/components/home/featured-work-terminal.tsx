import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { withLocale, type Locale } from "@/i18n/routing";
import { getFeaturedWork } from "@/lib/mdx";
import type { WorkListItem } from "@/types/work";

const STATUS_GLYPH: Record<WorkListItem["status"], { glyph: string; label: string }> = {
  shipped: { glyph: "[✓]", label: "shipped" },
  "in-progress": { glyph: "[~]", label: "wip" },
  archived: { glyph: "[x]", label: "archived" },
};

export function FeaturedWorkTerminal() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Home.work");
  const featured = getFeaturedWork(locale);
  if (featured.length === 0) return null;

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-muted-foreground text-xs">
            <span className="text-accent">$</span> ls ./work --sort=featured
          </p>
          <h2 className="mt-1 text-xl tracking-tight">
            {t("terminalList").replace("*", "")}
            <span className="text-accent">*</span>
          </h2>
        </div>
        <Link
          href={withLocale(locale, "/work")}
          className="hover:text-accent text-muted-foreground inline-flex items-center gap-1 text-xs underline-offset-4 hover:underline"
        >
          → ./work/
        </Link>
      </header>

      <div className="border-foreground/30 bg-card/40 overflow-hidden border">
        <div className="border-foreground/30 text-muted-foreground grid grid-cols-[auto_1fr_auto] gap-3 border-b px-3 py-1.5 text-[10px] tracking-widest uppercase">
          <span>{t("tableStatus")}</span>
          <span>{t("tableName")}</span>
          <span>{t("tablePeriod")}</span>
        </div>
        <ol>
          {featured.map((w, i) => {
            const s = STATUS_GLYPH[w.status];
            return (
              <li key={w.slug} className="border-foreground/20 group border-b last:border-b-0">
                <Link
                  href={withLocale(locale, `/work/${w.slug}`)}
                  className="hover:bg-accent/10 grid grid-cols-[auto_1fr_auto] items-baseline gap-3 px-3 py-3 transition-colors"
                >
                  <span className="text-accent text-xs tabular-nums">
                    {String(i + 1).padStart(2, "0")} {s.glyph}
                  </span>
                  <div className="min-w-0">
                    <span className="text-foreground group-hover:text-accent block truncate text-base font-medium transition-colors">
                      {w.title}
                    </span>
                    <span className="text-muted-foreground block truncate text-xs">
                      &gt; {w.tagline}
                    </span>
                    <span className="text-muted-foreground/70 mt-1 block truncate text-[10px] tracking-wider uppercase">
                      {t("stack")}: {w.stack.slice(0, 4).join(" · ")}
                    </span>
                  </div>
                  <span className="text-muted-foreground text-xs tabular-nums">{w.period}</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="text-muted-foreground mt-3 text-[11px]">
        <span className="text-accent">$</span> echo &quot;
        {t("terminalEcho", { count: featured.length })}{" "}
        <Link
          href={withLocale(locale, "/work")}
          className="hover:text-accent underline underline-offset-4"
        >
          cd ./work
        </Link>{" "}
        {t("terminalEchoTail")}&quot;
      </p>
    </section>
  );
}
