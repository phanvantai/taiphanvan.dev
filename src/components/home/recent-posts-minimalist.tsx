import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { withLocale, type Locale } from "@/i18n/routing";
import { getAllPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

export function RecentPostsMinimalist() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Home.posts");
  const posts = getAllPosts(locale).slice(0, 5);
  if (posts.length === 0) return null;

  return (
    <section className="border-border bg-secondary/30 border-y">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
        <header className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <p className="mn-eyebrow">{t("journal")}</p>
            <h2 className="mn-display text-foreground mt-2 text-3xl sm:text-4xl">{t("latest")}</h2>
          </div>
          <Link
            href={withLocale(locale, "/blog")}
            className="text-muted-foreground hover:text-foreground mn-link-underline inline-flex items-center gap-1 text-sm font-medium"
          >
            {t("all")} <ArrowUpRightIcon className="size-3.5" />
          </Link>
        </header>

        <ol className="divide-border divide-y">
          {posts.map((post, i) => (
            <li key={post.slug}>
              <Link
                href={withLocale(locale, `/blog/${post.slug}`)}
                className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-6 gap-y-2 py-5 sm:gap-x-8 sm:py-6"
              >
                <span className="text-muted-foreground font-mono text-xs tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="text-foreground group-hover:mn-accent truncate text-lg font-medium tracking-tight transition-colors sm:text-xl">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-muted-foreground mt-1 line-clamp-1 text-sm">
                      {post.description}
                    </p>
                  )}
                </div>
                <time
                  dateTime={post.date}
                  className="text-muted-foreground hidden font-mono text-xs sm:block"
                >
                  {formatDate(post.date)}
                </time>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
