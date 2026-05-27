import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { withLocale, type Locale } from "@/i18n/routing";

export default async function NotFound() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("NotFound");

  return (
    <section className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-xl flex-col items-start justify-center gap-6 px-4 py-16 sm:px-6">
      <p className="text-muted-foreground font-mono text-xs">{t("label")}</p>
      <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        {t("title")}
      </h1>
      <p className="text-muted-foreground max-w-prose text-pretty">{t("description")}</p>
      <div className="flex flex-wrap gap-3 pt-2">
        <Button render={<Link href={withLocale(locale, "/")} />}>{t("home")}</Button>
        <Button variant="outline" render={<Link href={withLocale(locale, "/blog")} />}>
          {t("blog")}
        </Button>
      </div>
    </section>
  );
}
