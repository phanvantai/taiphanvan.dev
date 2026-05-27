import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { MdxContent } from "@/components/mdx/mdx-content";
import { assertLocale, locales, withLocale, type Locale } from "@/i18n/routing";
import { getPage } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  assertLocale(rawLocale);
  const locale: Locale = rawLocale;
  const t = await getTranslations({ locale, namespace: "Pages" });
  const page = getPage(locale, "now");
  if (!page) return { title: t("nowFallback") };
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: withLocale(locale, "/now"),
      languages: Object.fromEntries(
        locales.filter((l) => getPage(l, "now")).map((l) => [l, withLocale(l, "/now")]),
      ),
    },
  };
}

// Đổi sang `true` để bật page lại.
const ENABLED: boolean = false;

export default async function NowPage({ params }: PageProps) {
  if (!ENABLED) notFound();

  const { locale: rawLocale } = await params;
  assertLocale(rawLocale);
  const locale: Locale = rawLocale;
  const t = await getTranslations({ locale, namespace: "Pages" });
  const page = getPage(locale, "now");
  if (!page) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <header className="border-border/40 mb-10 space-y-3 border-b pb-8">
        <p className="site-eyebrow text-muted-foreground font-mono text-xs">/now</p>
        <h1 className="site-page-title text-3xl font-semibold tracking-tight sm:text-4xl">
          {page.title}
        </h1>
        {page.description && (
          <p className="text-muted-foreground text-pretty">{page.description}</p>
        )}
        {page.updated && (
          <p className="site-meta text-muted-foreground font-mono text-[11px]">
            {t("lastUpdated", { date: formatDate(page.updated) })}
          </p>
        )}
      </header>

      <div className="prose prose-neutral dark:prose-invert prose-headings:tracking-tight prose-pre:p-0 max-w-none">
        <MdxContent source={page.content} />
      </div>
    </article>
  );
}
