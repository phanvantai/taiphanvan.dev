import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { withLocale, type Locale } from "@/i18n/routing";

const TAGS = ["maker", "polyglot", "Việt Nam", "AI-native", "indie"] as const;

export function HeroMinimalist() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Home.hero");

  return (
    <section className="border-border border-b px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-5xl gap-12 sm:grid-cols-[1.4fr_1fr] sm:gap-16">
        <div className="space-y-8">
          <p className="mn-eyebrow mn-dot">{t("personalSite")}</p>

          <h1 className="mn-display text-foreground text-[clamp(2.75rem,7vw,5.25rem)]">
            {t("introPrefix")} <span className="mn-accent">{t("name")}</span>.
          </h1>

          <p className="text-muted-foreground max-w-prose text-base leading-relaxed sm:text-lg">
            {t("bodyBefore")}{" "}
            <Link
              href={withLocale(locale, "/work")}
              className="text-foreground mn-link-underline font-medium decoration-1 underline-offset-4"
            >
              {t("bodyLink")}
            </Link>{" "}
            {t("bodyAfter")}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 rounded-full font-medium"
              render={<Link href={withLocale(locale, "/blog")} />}
            >
              {t("readBlog")} <ArrowRightIcon className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:border-foreground rounded-full bg-transparent font-medium"
              render={<Link href={withLocale(locale, "/work")} />}
            >
              {t("seeWork")}
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-muted-foreground hover:text-foreground rounded-full font-medium hover:bg-transparent"
              render={<Link href={withLocale(locale, "/about")} />}
            >
              {t("about")}
            </Button>
          </div>
        </div>

        <aside className="space-y-6 sm:pt-2">
          <div className="mn-card p-6">
            <p className="mn-eyebrow">{t("now")}</p>
            <p className="text-foreground mt-3 text-xl font-medium tracking-tight">
              {t("nowTitle")}
            </p>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {t("nowDescription")}
            </p>
          </div>

          <div>
            <p className="mn-eyebrow">{t("tags")}</p>
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
              {TAGS.map((t, i) => (
                <span key={t} className="text-muted-foreground font-mono text-xs">
                  {t}
                  {i < TAGS.length - 1 && <span className="text-border ml-3">·</span>}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
