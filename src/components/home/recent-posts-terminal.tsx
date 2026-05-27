import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { withLocale, type Locale } from "@/i18n/routing";
import { getAllPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

export function RecentPostsTerminal() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Home.posts");
  const posts = getAllPosts(locale).slice(0, 5);
  if (posts.length === 0) return null;

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-6">
        <p className="text-muted-foreground text-xs">
          <span className="text-accent">$</span> tail -n 5 ./blog/posts.log
        </p>
        <h2 className="mt-1 text-xl tracking-tight">
          {t("terminalTitle").replace("*", "")}
          <span className="text-accent">*</span>
        </h2>
      </header>

      <ol className="border-foreground/30 bg-card/40 divide-foreground/20 divide-y border">
        {posts.map((post, i) => (
          <li key={post.slug}>
            <Link
              href={withLocale(locale, `/blog/${post.slug}`)}
              className="hover:bg-accent/10 group block px-3 py-3 transition-colors"
            >
              <div className="text-muted-foreground flex flex-wrap items-baseline gap-x-3 text-[10px] tracking-widest uppercase">
                <span className="text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <time dateTime={post.date} className="tabular-nums">
                  {formatDate(post.date)}
                </time>
                <span aria-hidden>·</span>
                <span>
                  {post.readingTime} {t("minute")}
                </span>
              </div>
              <p className="text-foreground group-hover:text-accent mt-1.5 text-base leading-snug font-medium transition-colors">
                <span className="text-accent">&gt;</span> {post.title}
              </p>
              {post.description && (
                <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                  {post.description}
                </p>
              )}
              {post.tags.length > 0 && (
                <p className="text-muted-foreground/70 mt-1.5 text-[10px] tracking-wider">
                  tags: {post.tags.map((t) => `#${t}`).join(" ")}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ol>

      <p className="text-muted-foreground mt-3 text-[11px]">
        <span className="text-accent">$</span>{" "}
        <Link
          href={withLocale(locale, "/blog")}
          className="hover:text-accent underline underline-offset-4"
        >
          cat ./blog/
        </Link>{" "}
        {t("terminalAll")}
      </p>
    </section>
  );
}
