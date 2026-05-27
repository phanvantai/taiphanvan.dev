import Script from "next/script";
import { ogLocales, withLocale, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import { getLocale, getTranslations } from "next-intl/server";
import type { Post } from "@/types/post";
import type { Work } from "@/types/work";

function JsonLd<T extends Record<string, unknown>>({ data, id }: { data: T; id: string }) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function ogUrl({ title, type }: { title: string; type: "blog" | "work" | "page" }) {
  const params = new URLSearchParams({ title, type });
  return `${siteConfig.url}/og?${params.toString()}`;
}

export async function PersonJsonLd({ locale: explicitLocale }: { locale?: Locale }) {
  const locale = explicitLocale ?? ((await getLocale()) as Locale);
  const t = await getTranslations({ locale, namespace: "Site" });
  const sameAs = Object.values(siteConfig.social).filter((url) => url.length > 0);

  return (
    <JsonLd
      id={`person-${locale}`}
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: siteConfig.author.name,
        alternateName: "Tai Phan",
        url: `${siteConfig.url}${withLocale(locale, "/")}`,
        jobTitle: "Software Engineer",
        description: t("description"),
        inLanguage: ogLocales[locale],
        sameAs,
      }}
    />
  );
}

export function BlogPostingJsonLd({ locale, post }: { locale: Locale; post: Post }) {
  const url = `${siteConfig.url}${withLocale(locale, `/blog/${post.slug}`)}`;
  return (
    <JsonLd
      id={`blog-posting-${locale}-${post.slug}`}
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        headline: post.title,
        description: post.description,
        image: post.cover
          ? `${siteConfig.url}${post.cover}`
          : ogUrl({ title: post.title, type: "blog" }),
        datePublished: post.date,
        dateModified: post.date,
        author: {
          "@type": "Person",
          name: siteConfig.author.name,
          url: siteConfig.url,
        },
        publisher: {
          "@type": "Person",
          name: siteConfig.author.name,
          url: siteConfig.url,
        },
        keywords: post.tags.join(", "),
        inLanguage: ogLocales[locale],
      }}
    />
  );
}

export function CreativeWorkJsonLd({ locale, work }: { locale: Locale; work: Work }) {
  const url = `${siteConfig.url}${withLocale(locale, `/work/${work.slug}`)}`;
  return (
    <JsonLd
      id={`creative-work-${locale}-${work.slug}`}
      data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: work.title,
        url,
        description: work.tagline,
        image: work.cover
          ? `${siteConfig.url}${work.cover}`
          : ogUrl({ title: work.title, type: "work" }),
        creator: {
          "@type": "Person",
          name: siteConfig.author.name,
          url: siteConfig.url,
        },
        keywords: work.stack.join(", "),
      }}
    />
  );
}
