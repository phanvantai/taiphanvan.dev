import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { MdxContent } from "@/components/mdx/mdx-content";
import { PostCard } from "@/components/blog/post-card";
import { Toc } from "@/components/blog/toc";
import { BlogPostingJsonLd } from "@/components/seo/json-ld";
import { assertLocale, locales, withLocale, type Locale } from "@/i18n/routing";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/mdx";
import { siteConfig } from "@/lib/site-config";
import { extractToc } from "@/lib/toc";
import { formatDate } from "@/lib/utils";

function ogImage(title: string) {
  const params = new URLSearchParams({ title, type: "blog" });
  return `${siteConfig.url}/og?${params.toString()}`;
}

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  return locales.flatMap((locale) => getAllPosts(locale).map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  assertLocale(rawLocale);
  const locale: Locale = rawLocale;
  const t = await getTranslations({ locale, namespace: "Blog" });
  const post = getPostBySlug(locale, slug);
  if (!post) return { title: t("notFound") };

  const og = post.cover ? `${siteConfig.url}${post.cover}` : ogImage(post.title);

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      url: `${siteConfig.url}${withLocale(locale, `/blog/${slug}`)}`,
      images: [{ url: og, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [og],
    },
    alternates: {
      canonical: withLocale(locale, `/blog/${slug}`),
      languages: Object.fromEntries(
        locales
          .filter((l) => getPostBySlug(l, slug))
          .map((l) => [l, withLocale(l, `/blog/${slug}`)]),
      ),
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  assertLocale(rawLocale);
  const locale: Locale = rawLocale;
  const t = await getTranslations({ locale, namespace: "Blog" });
  const post = getPostBySlug(locale, slug);
  if (!post) notFound();

  const toc = extractToc(post.content);
  const related = getRelatedPosts(locale, slug, 3);

  return (
    <article className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_220px] lg:py-16">
      <BlogPostingJsonLd locale={locale} post={post} />
      <div className="min-w-0">
        <header className="border-border/40 mb-8 space-y-3 border-b pb-8">
          <Link
            href={withLocale(locale, "/blog")}
            className="site-back text-muted-foreground hover:text-foreground font-mono text-xs transition-colors"
          >
            {t("back")}
          </Link>
          <h1 className="site-page-title text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {post.title}
          </h1>
          <p className="text-muted-foreground text-pretty">{post.description}</p>
          <div className="site-meta text-muted-foreground flex flex-wrap items-center gap-2 font-mono text-[11px]">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{t("readingTime", { minutes: post.readingTime })}</span>
            {post.tags.length > 0 && (
              <>
                <span aria-hidden>·</span>
                <span className="flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <Link
                      key={t}
                      href={`${withLocale(locale, "/blog")}?tag=${encodeURIComponent(t)}`}
                      className="hover:text-foreground"
                    >
                      #{t}
                    </Link>
                  ))}
                </span>
              </>
            )}
          </div>
        </header>

        {post.cover && (
          <figure className="border-border/60 mb-10 overflow-hidden rounded-lg border">
            <Image
              src={post.cover}
              alt={post.title}
              width={1200}
              height={630}
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="aspect-[1200/630] w-full object-cover"
            />
          </figure>
        )}

        <div className="prose prose-neutral dark:prose-invert prose-headings:scroll-mt-20 prose-headings:tracking-tight prose-pre:p-0 max-w-none">
          <MdxContent source={post.content} />
        </div>

        {related.length > 0 && (
          <section className="border-border/40 mt-16 border-t pt-10">
            <h2 className="site-section-heading text-muted-foreground mb-4 font-mono text-xs tracking-wider uppercase">
              {t("related")}
            </h2>
            <div className="divide-border/40 -my-6 divide-y">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <aside className="hidden lg:sticky lg:top-20 lg:block lg:self-start">
        <Toc entries={toc} />
      </aside>
    </article>
  );
}
