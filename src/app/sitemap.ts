import type { MetadataRoute } from "next";

import { locales, withLocale } from "@/i18n/routing";
import { getAllPosts, getAllWork } from "@/lib/mdx";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    [
      { href: "/", priority: 1, changeFrequency: "weekly" as const },
      { href: "/blog", priority: 0.9, changeFrequency: "weekly" as const },
      { href: "/work", priority: 0.9, changeFrequency: "weekly" as const },
      { href: "/tools", priority: 0.5, changeFrequency: "monthly" as const },
    ].map((route) => ({
      url: `${siteConfig.url}${withLocale(locale, route.href)}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
  );

  const blogRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({
      url: `${siteConfig.url}${withLocale(locale, `/blog/${post.slug}`)}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  );

  const workRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getAllWork(locale).map((work) => ({
      url: `${siteConfig.url}${withLocale(locale, `/work/${work.slug}`)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [...staticRoutes, ...blogRoutes, ...workRoutes];
}
