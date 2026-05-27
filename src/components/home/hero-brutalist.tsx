import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { withLocale, type Locale } from "@/i18n/routing";

const TAGS = ["MAKER", "POLYGLOT", "VIỆT NAM", "AI-NATIVE", "INDIE"] as const;

export function HeroBrutalist() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Home.hero");
  const introPrefix = t("introPrefix").toLocaleUpperCase(locale === "vi" ? "vi" : "en-US");
  const [introFirst = introPrefix, introSecond = ""] = introPrefix.split(", ");

  return (
    <section className="border-foreground border-b-4 px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-[1.4fr_1fr] sm:gap-10">
        {/* Left: title block */}
        <div className="space-y-6">
          <p className="border-foreground bg-background inline-block border-2 px-2 py-0.5 font-mono text-[11px] font-bold tracking-widest uppercase">
            {`// ${t("personalSite").toLowerCase()}`}
          </p>

          <h1 className="nb-display text-foreground text-[clamp(3rem,9vw,7rem)]">
            {introFirst},
            <br />
            {introSecond && (
              <>
                {introSecond}
                <br />
              </>
            )}
            <span className="bg-foreground text-background -ml-1 inline-block -rotate-1 px-2">
              {t("name").toLocaleUpperCase(locale === "vi" ? "vi" : "en-US")}
              <span className="text-accent">.</span>
            </span>
          </h1>

          <p className="text-foreground border-foreground bg-card max-w-prose border-2 p-4 text-base leading-relaxed">
            {t("bodyBefore")}{" "}
            <Link
              href={withLocale(locale, "/work")}
              className="bg-accent text-accent-foreground border-foreground border-2 px-1 font-bold underline-offset-2 hover:underline"
            >
              {t("bodyLink")}
            </Link>{" "}
            {t("bodyAfter")}
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Button
              size="lg"
              className="border-foreground bg-foreground text-background rounded-none border-2 font-bold uppercase shadow-[5px_5px_0_0_var(--accent)] transition-transform hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_0_var(--accent)]"
              render={<Link href={withLocale(locale, "/blog")} />}
            >
              {t("readBlog")} <ArrowRightIcon />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-foreground bg-accent text-accent-foreground rounded-none border-2 font-bold uppercase shadow-[5px_5px_0_0_var(--foreground)] transition-transform hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_0_var(--foreground)]"
              render={<Link href={withLocale(locale, "/work")} />}
            >
              {t("seeWork")}
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="border-foreground rounded-none border-2 font-bold uppercase hover:bg-transparent hover:underline"
              render={<Link href={withLocale(locale, "/about")} />}
            >
              {t("about")}
            </Button>
          </div>
        </div>

        {/* Right: card stack */}
        <aside className="space-y-4">
          <div className="nb-card p-5">
            <p className="font-mono text-[10px] font-bold tracking-widest uppercase">
              {t("now")} LIVE →
            </p>
            <p className="nb-display mt-2 text-3xl">{t("nowTitle")}</p>
            <p className="text-muted-foreground mt-2 text-sm">{t("nowDescription")}</p>
          </div>
          <div className="nb-card-flat p-5">
            <p className="font-mono text-[10px] font-bold tracking-widest uppercase">{t("tags")}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <span key={t} className="nb-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="border-foreground nb-stripe text-background h-10 border-2" aria-hidden />
        </aside>
      </div>
    </section>
  );
}
