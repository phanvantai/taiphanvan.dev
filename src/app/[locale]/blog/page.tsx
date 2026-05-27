import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PostCard } from "@/components/blog/post-card";
import { TagFilter } from "@/components/blog/tag-filter";
import { assertLocale, locales, withLocale, type Locale } from "@/i18n/routing";
import { getAllPosts, getAllTags } from "@/lib/mdx";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

interface SearchParams {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tag?: string }>;
}

export async function generateMetadata({
  params,
}: Pick<SearchParams, "params">): Promise<Metadata> {
  const { locale } = await params;
  assertLocale(locale);
  const t = await getTranslations({ locale, namespace: "Blog" });

  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
    alternates: {
      canonical: withLocale(locale, "/blog"),
      languages: Object.fromEntries(locales.map((l) => [l, withLocale(l, "/blog")])),
    },
    openGraph: {
      title: t("metadataTitle"),
      description: t("metadataDescription"),
      url: `${siteConfig.url}${withLocale(locale, "/blog")}`,
    },
  };
}

export default async function BlogPage({ params, searchParams }: SearchParams) {
  const { locale: rawLocale } = await params;
  assertLocale(rawLocale);
  const locale: Locale = rawLocale;
  const t = await getTranslations({ locale, namespace: "Blog" });
  const sp = await searchParams;
  const activeTag = typeof sp.tag === "string" ? sp.tag : undefined;

  const allPosts = getAllPosts(locale);
  const allTags = getAllTags(locale);
  const posts = activeTag ? allPosts.filter((p) => p.tags.includes(activeTag)) : allPosts;
  const lastUpdate = allPosts[0]?.date;

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <header className="mb-8 space-y-3">
        <p className="site-eyebrow text-muted-foreground font-mono text-xs">/blog</p>
        <h1 className="site-page-title text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </header>

      <div className="site-stats text-muted-foreground border-border/60 mb-8 flex flex-wrap items-center gap-x-4 gap-y-1 border-y py-2 font-mono text-[11px]">
        <span>
          <span className="site-stats-label">{t("archive")}</span> · {allPosts.length}{" "}
          {t("entries")}
        </span>
        {lastUpdate && (
          <>
            <span aria-hidden>·</span>
            <span>
              <span className="site-stats-label">{t("last")}</span>{" "}
              <time dateTime={lastUpdate}>{lastUpdate}</time>
            </span>
          </>
        )}
        {activeTag && (
          <>
            <span aria-hidden>·</span>
            <span>
              <span className="site-stats-label">{t("filter")}</span> #{activeTag}
            </span>
          </>
        )}
      </div>

      <div className="mb-10">
        <TagFilter tags={allTags} activeTag={activeTag} />
      </div>

      {posts.length === 0 ? (
        <p className="border-border/60 text-muted-foreground rounded-lg border border-dashed px-6 py-12 text-center text-sm">
          {t("empty")}
        </p>
      ) : (
        <div className="site-list divide-border/40 -my-6 divide-y">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
