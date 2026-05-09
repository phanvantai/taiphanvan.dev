import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { mdxToHtml } from "@/lib/mdx-to-html";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

const MAX_ITEMS = 50;

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts().slice(0, MAX_ITEMS);

  const items = await Promise.all(
    posts.map(async (post) => {
      const full = getPostBySlug(post.slug);
      const html = full ? await mdxToHtml(full.content) : "";
      const url = `${siteConfig.url}/blog/${post.slug}`;
      return { post, url, html };
    }),
  );

  const buildDate = posts[0]?.date ?? new Date().toISOString();
  const lastBuildDate = new Date(buildDate).toUTCString();

  const itemsXml = items
    .map(
      ({ post, url, html }) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
      <content:encoded><![CDATA[${html}]]></content:encoded>
      ${post.tags.map((t) => `<category>${escapeXml(t)}</category>`).join("\n      ")}
    </item>`,
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>vi-VN</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
