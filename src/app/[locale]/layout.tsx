import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ViewTransition } from "react";
import { notFound } from "next/navigation";

import { CommandPalette } from "@/components/site/command-palette";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { ThemeProvider } from "@/components/site/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { assertLocale, locales, ogLocales, type Locale } from "@/i18n/routing";
import { getAllPosts } from "@/lib/mdx";
import { siteConfig } from "@/lib/site-config";
import { getUIStyle } from "@/lib/ui-style";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "latin-ext"],
});

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params;
  assertLocale(locale);

  const t = await getTranslations({ locale, namespace: "Site" });
  const defaultOg = `${siteConfig.url}/og?title=${encodeURIComponent(siteConfig.name)}&type=page`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: t("description"),
    authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
    creator: siteConfig.author.name,
    openGraph: {
      type: "website",
      locale: ogLocales[locale],
      url: `${siteConfig.url}/${locale}`,
      title: siteConfig.name,
      description: t("description"),
      siteName: siteConfig.name,
      images: [{ url: defaultOg, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: t("description"),
      images: [defaultOg],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
      types: {
        "application/rss+xml": [{ url: "/rss.xml", title: `${siteConfig.name} — RSS` }],
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: rawLocale } = await params;
  if (!locales.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const paletteHits = getAllPosts(locale).map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    tags: p.tags,
  }));

  const uiStyle = getUIStyle();
  const fontVars = `${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable}`;
  const defaultTheme = uiStyle === "neo-brutalist" || uiStyle === "minimalist" ? "light" : "dark";
  const themeInitScript = `
(() => {
  try {
    const defaultTheme = ${JSON.stringify(defaultTheme)};
    const storedTheme = window.localStorage.getItem("theme");
    const theme = storedTheme === "light" || storedTheme === "dark" || storedTheme === "system" ? storedTheme : defaultTheme;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const resolvedTheme = theme === "system" ? systemTheme : theme;
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
    document.documentElement.style.colorScheme = resolvedTheme;
  } catch (_) {}
})();
`;

  return (
    <html lang={locale} suppressHydrationWarning data-ui-style={uiStyle} className={fontVars}>
      <head>
        <script
          id="theme-init"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className="bg-background text-foreground flex min-h-screen flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider defaultTheme={defaultTheme} enableSystem disableTransitionOnChange>
            <Header />
            <ViewTransition>
              <main className="flex-1">{children}</main>
            </ViewTransition>
            <Footer />
            <CommandPalette posts={paletteHits} />
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
