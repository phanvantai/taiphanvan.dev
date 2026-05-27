import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { WorkCard } from "@/components/work/work-card";
import { assertLocale, locales, withLocale, type Locale } from "@/i18n/routing";
import { getAllWork } from "@/lib/mdx";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  assertLocale(locale);
  const t = await getTranslations({ locale, namespace: "Work" });

  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
    alternates: {
      canonical: withLocale(locale, "/work"),
      languages: Object.fromEntries(locales.map((l) => [l, withLocale(l, "/work")])),
    },
    openGraph: {
      title: t("metadataTitle"),
      description: t("metadataDescription"),
      url: `${siteConfig.url}${withLocale(locale, "/work")}`,
    },
  };
}

export default async function WorkPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  assertLocale(rawLocale);
  const locale: Locale = rawLocale;
  const t = await getTranslations({ locale, namespace: "Work" });
  const work = getAllWork(locale);

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <header className="mb-10 space-y-3">
        <p className="site-eyebrow text-muted-foreground font-mono text-xs">/work</p>
        <h1 className="site-page-title text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="text-muted-foreground">{t("description", { count: work.length })}</p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {work.map((w) => (
          <WorkCard key={w.slug} work={w} />
        ))}
      </div>
    </section>
  );
}
