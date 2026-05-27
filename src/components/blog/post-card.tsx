import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { withLocale, type Locale } from "@/i18n/routing";
import { formatDate } from "@/lib/utils";
import type { PostListItem } from "@/types/post";

interface Props {
  post: PostListItem;
}

export function PostCard({ post }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations("Blog");

  return (
    <article className="group">
      <Link href={withLocale(locale, `/blog/${post.slug}`)} className="block">
        <div className="site-row border-border/40 group-hover:border-foreground/20 flex flex-col gap-2 border-b py-6 transition-colors">
          <div className="site-meta text-muted-foreground flex items-center gap-2 font-mono text-[11px]">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{t("readingTime", { minutes: post.readingTime })}</span>
            {post.tags.length > 0 && (
              <>
                <span aria-hidden>·</span>
                <span className="truncate">{post.tags.map((t) => `#${t}`).join(" ")}</span>
              </>
            )}
          </div>
          <h2 className="site-card-title group-hover:text-primary text-xl font-semibold tracking-tight transition-colors">
            {post.title}
          </h2>
          <p className="text-muted-foreground line-clamp-2 text-sm">{post.description}</p>
        </div>
      </Link>
    </article>
  );
}
