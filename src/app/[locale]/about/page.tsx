import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { MdxContent } from "@/components/mdx/mdx-content";
import { PersonJsonLd } from "@/components/seo/json-ld";
import { assertLocale, locales, withLocale, type Locale } from "@/i18n/routing";
import { getPage } from "@/lib/mdx";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  assertLocale(rawLocale);
  const locale: Locale = rawLocale;
  const t = await getTranslations({ locale, namespace: "Pages" });
  const page = getPage(locale, "about");
  if (!page) return { title: t("aboutFallback") };
  const ogParams = new URLSearchParams({ title: page.title, type: "page" });
  const og = `${siteConfig.url}/og?${ogParams.toString()}`;
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: withLocale(locale, "/about"),
      languages: Object.fromEntries(
        locales.filter((l) => getPage(l, "about")).map((l) => [l, withLocale(l, "/about")]),
      ),
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteConfig.url}${withLocale(locale, "/about")}`,
      images: [{ url: og, width: 1200, height: 630, alt: page.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [og],
    },
  };
}

// Đổi sang `true` để bật page lại.
const ENABLED: boolean = false;

export default async function AboutPage({ params }: PageProps) {
  if (!ENABLED) notFound();

  const { locale: rawLocale } = await params;
  assertLocale(rawLocale);
  const locale: Locale = rawLocale;
  const page = getPage(locale, "about");
  if (!page) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <PersonJsonLd locale={locale} />
      <header className="border-border/40 mb-10 space-y-3 border-b pb-8">
        <p className="site-eyebrow text-muted-foreground font-mono text-xs">/about</p>
        <h1 className="site-page-title text-3xl font-semibold tracking-tight sm:text-4xl">
          {page.title}
        </h1>
        {page.description && (
          <p className="text-muted-foreground text-pretty">{page.description}</p>
        )}
      </header>

      <div className="prose prose-neutral dark:prose-invert prose-headings:tracking-tight prose-pre:p-0 max-w-none">
        <MdxContent source={page.content} />
      </div>
    </article>
  );
}
