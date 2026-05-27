import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { assertLocale, locales, withLocale, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  assertLocale(locale);
  const t = await getTranslations({ locale, namespace: "Tools" });

  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
    alternates: {
      canonical: withLocale(locale, "/tools"),
      languages: Object.fromEntries(locales.map((l) => [l, withLocale(l, "/tools")])),
    },
    openGraph: {
      title: t("metadataTitle"),
      description: t("metadataDescription"),
      url: `${siteConfig.url}${withLocale(locale, "/tools")}`,
    },
  };
}

export default async function ToolsPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  assertLocale(rawLocale);
  const locale: Locale = rawLocale;
  const t = await getTranslations({ locale, namespace: "Tools" });
  const tools = [
    {
      href: withLocale(locale, "/tools/tracker"),
      title: t("trackerTitle"),
      description: t("trackerDescription"),
      status: t("trackerStatus"),
    },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="mb-10 space-y-3">
        <p className="site-eyebrow text-muted-foreground font-mono text-xs">/tools</p>
        <h1 className="site-page-title text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="group">
            <Card className="site-card group-hover:border-foreground/30 h-full transition-colors">
              <CardHeader>
                <CardTitle className="site-card-title text-base">{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent className="site-meta text-muted-foreground font-mono text-xs">
                {tool.status}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
