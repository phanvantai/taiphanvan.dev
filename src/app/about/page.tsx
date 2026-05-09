import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MdxContent } from "@/components/mdx/mdx-content";
import { PersonJsonLd } from "@/components/seo/json-ld";
import { getPage } from "@/lib/mdx";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const page = getPage("about");
  if (!page) return { title: "About" };
  const ogParams = new URLSearchParams({ title: page.title, type: "page" });
  const og = `${siteConfig.url}/og?${ogParams.toString()}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: "/about" },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteConfig.url}/about`,
      images: [{ url: og, width: 1200, height: 630, alt: page.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [og],
    },
  };
}

export default function AboutPage() {
  const page = getPage("about");
  if (!page) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <PersonJsonLd />
      <header className="border-border/40 mb-10 space-y-2 border-b pb-8">
        <p className="text-muted-foreground font-mono text-xs">/about</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{page.title}</h1>
        {page.description && (
          <p className="text-muted-foreground text-pretty">{page.description}</p>
        )}
      </header>

      <div className="prose prose-neutral dark:prose-invert prose-headings:tracking-tight prose-pre:p-0 max-w-none">
        <MdxContent source={page.content} />
      </div>
    </article>
  );
}
