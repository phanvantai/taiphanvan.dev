import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeXml, ExternalLinkIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { MdxContent } from "@/components/mdx/mdx-content";
import { CreativeWorkJsonLd } from "@/components/seo/json-ld";
import { assertLocale, locales, withLocale, type Locale } from "@/i18n/routing";
import { getAllWork, getWorkBySlug } from "@/lib/mdx";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { WorkStatus } from "@/types/work";

function ogImage(title: string) {
  const params = new URLSearchParams({ title, type: "work" });
  return `${siteConfig.url}/og?${params.toString()}`;
}

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export const revalidate = 3600;

const STATUS_TONE: Record<WorkStatus, string> = {
  shipped: "border-emerald-500/30 text-emerald-500 bg-emerald-500/10",
  "in-progress": "border-amber-500/30 text-amber-500 bg-amber-500/10",
  archived: "border-border/40 text-muted-foreground bg-muted/40",
};

export async function generateStaticParams() {
  return locales.flatMap((locale) => getAllWork(locale).map((w) => ({ locale, slug: w.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  assertLocale(rawLocale);
  const locale: Locale = rawLocale;
  const t = await getTranslations({ locale, namespace: "Work" });
  const work = getWorkBySlug(locale, slug);
  if (!work) return { title: t("notFound") };

  const og = work.cover ? `${siteConfig.url}${work.cover}` : ogImage(work.title);

  return {
    title: work.title,
    description: work.tagline,
    openGraph: {
      title: work.title,
      description: work.tagline,
      type: "article",
      url: `${siteConfig.url}${withLocale(locale, `/work/${slug}`)}`,
      images: [{ url: og, width: 1200, height: 630, alt: work.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: work.title,
      description: work.tagline,
      images: [og],
    },
    alternates: {
      canonical: withLocale(locale, `/work/${slug}`),
      languages: Object.fromEntries(
        locales
          .filter((l) => getWorkBySlug(l, slug))
          .map((l) => [l, withLocale(l, `/work/${slug}`)]),
      ),
    },
  };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  assertLocale(rawLocale);
  const locale: Locale = rawLocale;
  const t = await getTranslations({ locale, namespace: "Work" });
  const work = getWorkBySlug(locale, slug);
  if (!work) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <CreativeWorkJsonLd locale={locale} work={work} />
      <header className="border-border/40 mb-10 space-y-4 border-b pb-10">
        <Link
          href={withLocale(locale, "/work")}
          className="site-back text-muted-foreground hover:text-foreground font-mono text-xs transition-colors"
        >
          {t("back")}
        </Link>

        <div className="site-meta flex flex-wrap items-center gap-2 font-mono text-[11px]">
          <span className="text-muted-foreground">{work.period}</span>
          <span aria-hidden className="text-muted-foreground">
            ·
          </span>
          <span
            data-status={work.status}
            className={cn(
              "site-status rounded-md border px-2 py-0.5 tracking-wide uppercase",
              STATUS_TONE[work.status],
            )}
          >
            {t(`status.${work.status}`)}
          </span>
        </div>

        <h1 className="site-page-title text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {work.title}
        </h1>
        <p className="text-muted-foreground text-lg text-pretty">{work.tagline}</p>

        <div className="grid gap-4 pt-2 text-sm sm:grid-cols-2">
          <div>
            <p className="site-info-label text-muted-foreground font-mono text-[11px] tracking-wider uppercase">
              {t("role")}
            </p>
            <p className="mt-1">{work.role}</p>
          </div>
          <div>
            <p className="site-info-label text-muted-foreground font-mono text-[11px] tracking-wider uppercase">
              {t("stack")}
            </p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {work.stack.map((s) => (
                <span
                  key={s}
                  className="site-tag border-border/40 rounded-md border px-2 py-0.5 font-mono text-[10px]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {(work.links?.live || work.links?.github) && (
          <div className="flex flex-wrap gap-3 pt-2 font-mono text-xs">
            {work.links.live && (
              <a
                href={work.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="site-link-button border-border/60 hover:border-foreground/40 hover:text-foreground inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 transition-colors"
              >
                <ExternalLinkIcon className="size-3" /> {t("live")}
              </a>
            )}
            {work.links.github && (
              <a
                href={work.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="site-link-button border-border/60 hover:border-foreground/40 hover:text-foreground inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 transition-colors"
              >
                <CodeXml className="size-3" /> {t("source")}
              </a>
            )}
          </div>
        )}
      </header>

      <div className="prose prose-neutral dark:prose-invert prose-headings:scroll-mt-20 prose-headings:tracking-tight prose-pre:p-0 max-w-none">
        <MdxContent source={work.content} />
      </div>
    </article>
  );
}
