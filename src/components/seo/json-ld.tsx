import { siteConfig } from "@/lib/site-config";
import type { Post } from "@/types/post";
import type { Work } from "@/types/work";

function JsonLd<T extends Record<string, unknown>>({ data }: { data: T }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

function ogUrl({ title, type }: { title: string; type: "blog" | "work" | "page" }) {
  const params = new URLSearchParams({ title, type });
  return `${siteConfig.url}/og?${params.toString()}`;
}

export function PersonJsonLd() {
  const sameAs = Object.values(siteConfig.social).filter((url) => url.length > 0);

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: siteConfig.author.name,
        alternateName: "Tai Phan",
        url: siteConfig.url,
        jobTitle: "Software Engineer",
        description: siteConfig.description,
        sameAs,
      }}
    />
  );
}

export function BlogPostingJsonLd({ post }: { post: Post }) {
  const url = `${siteConfig.url}/blog/${post.slug}`;
  return (
    <JsonLd
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
        inLanguage: "vi-VN",
      }}
    />
  );
}

export function CreativeWorkJsonLd({ work }: { work: Work }) {
  const url = `${siteConfig.url}/work/${work.slug}`;
  return (
    <JsonLd
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
