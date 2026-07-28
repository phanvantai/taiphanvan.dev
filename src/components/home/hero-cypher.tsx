import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { withLocale, type Locale } from "@/i18n/routing";

const SIGNALS = [
  { k: "subj.id", v: "K-V0.1.4" },
  { k: "block", v: "ÆØ-04 / SAIGON" },
  { k: "coord", v: "10°47′N 106°40′E" },
  { k: "stack", v: "next.js · mdx" },
] as const;

const KANJI_LEFT = "電脳 — 賽博 — 記憶";
const KANJI_RIGHT = "二〇四九 — 株式会社";

export function HeroCypher() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Home.hero");
  const now = new Date();
  const stamp = `${now.getUTCFullYear()}.${String(now.getUTCMonth() + 1).padStart(2, "0")}.${String(now.getUTCDate()).padStart(2, "0")} · ${String(now.getUTCHours()).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(2, "0")} UTC`;
  const headingLocale = locale === "vi" ? "vi" : "en-US";
  const introPrefix = t("introPrefix").toLocaleUpperCase(headingLocale);
  const name = t("name").toLocaleUpperCase(headingLocale);

  return (
    <section className="border-border cy-noise relative overflow-hidden border-b">
      <div className="cy-aurora" aria-hidden />
      <div className="cy-scanlines absolute inset-0" aria-hidden />

      {/* Kanji decorative columns */}
      <span className="cy-kanji absolute top-8 left-2 hidden sm:block" aria-hidden>
        {KANJI_LEFT}
      </span>
      <span className="cy-kanji cy-kanji-pink absolute top-8 right-2 hidden sm:block" aria-hidden>
        {KANJI_RIGHT}
      </span>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-10 sm:py-24">
        {/* Top chrome */}
        <div className="cy-mono mb-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10.5px] tracking-[0.18em] uppercase">
          <span className="cy-id">REC // {stamp}</span>
          <span className="cy-tag cy-tag-pink">JOI.LINK · 0.1.4</span>
          <span className="cy-tag cy-tag-cyan">CH-31.7</span>
          <span className="cy-amber ml-auto hidden sm:inline">◣ {t("scope")}</span>
        </div>

        {/* Headline */}
        <h1 className="cy-display text-foreground text-[clamp(3rem,11vw,9rem)]">
          <span className="block">{introPrefix}</span>
          <span className="cy-glitch block" data-text={`${name}.`}>
            <span className="cy-amber">{name}</span>
            <span className="cy-pink">.</span>
          </span>
        </h1>

        {/* Body grid */}
        <div className="mt-12 grid gap-10 sm:grid-cols-[1.6fr_1fr] sm:gap-14">
          <div className="space-y-7">
            <p className="text-foreground/90 max-w-prose text-lg leading-relaxed text-pretty">
              {t("bodyBefore")}{" "}
              <Link
                href={withLocale(locale, "/work")}
                className="cy-amber underline-offset-4 hover:underline"
              >
                {t("bodyLink")}
              </Link>{" "}
              {t("bodyAfter")}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="cy-mono rounded-none bg-[var(--cy-amber)] tracking-widest text-[oklch(0.115_0.03_50)] uppercase shadow-[0_0_28px_-4px_var(--cy-amber)] transition-shadow hover:shadow-[0_0_44px_-2px_var(--cy-amber)]"
                render={<Link href={withLocale(locale, "/blog")} />}
              >
                {t("readBlog")} <ArrowRightIcon />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="cy-mono border-foreground/30 rounded-none tracking-widest uppercase hover:border-[var(--cy-pink)] hover:text-[var(--cy-pink)]"
                render={<Link href={withLocale(locale, "/work")} />}
              >
                {t("seeWork")}
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="cy-mono rounded-none tracking-widest uppercase hover:text-[var(--cy-cyan)]"
                render={<Link href={withLocale(locale, "/about")} />}
              >
                {t("about")}
              </Button>
            </div>
          </div>

          {/* Right scope panel */}
          <aside className="cy-scope cy-mono p-5">
            <p className="cy-amber border-foreground/20 mb-3 border-b pb-2 text-[10px] tracking-[0.22em] uppercase">
              {t("transcript")}
            </p>
            <dl className="space-y-2 text-[12px]">
              {[...SIGNALS, { k: "status", v: t("status") }].map((s) => (
                <div key={s.k} className="grid grid-cols-[5.5rem_1fr] gap-3">
                  <dt className="cy-pink tracking-widest uppercase">{s.k}</dt>
                  <dd className="text-foreground/90 truncate">{s.v}</dd>
                </div>
              ))}
            </dl>
            <p className="border-foreground/20 mt-4 border-t pt-3 text-[10px] tracking-widest uppercase">
              <span className="cy-cyan">◇</span> {t("endTransmission")}
            </p>
          </aside>
        </div>
      </div>

      {/* Bottom marquee-ish ticker */}
      <div className="border-foreground/15 cy-mono relative z-10 border-t bg-[oklch(from_var(--background)_l_c_h_/_0.6)]">
        <div className="mx-auto flex max-w-6xl items-center gap-4 overflow-hidden px-4 py-2 text-[10.5px] tracking-[0.22em] whitespace-nowrap uppercase sm:px-10">
          <span className="cy-amber">{t("live")}</span>
          <span className="text-muted-foreground">{t("tickerOk")}</span>
          <span className="cy-pink">{t("tickerCanvas")}</span>
          <span className="text-muted-foreground">·</span>
          <span className="cy-cyan">{t("tickerChannel")}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-foreground/70">{stamp}</span>
        </div>
      </div>
    </section>
  );
}
