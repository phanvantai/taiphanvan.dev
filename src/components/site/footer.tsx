import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();
  const socialLinks = Object.entries(siteConfig.social).filter(([, url]) => url.length > 0);

  return (
    <footer className="border-border/60 border-t">
      <div className="text-muted-foreground mx-auto flex max-w-5xl flex-col items-start justify-between gap-3 px-4 py-8 text-sm sm:flex-row sm:items-center sm:px-6">
        <p className="font-mono">
          © {year} {siteConfig.author.name}
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map(([key, href]) => (
            <Link
              key={key}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground capitalize transition-colors"
            >
              {key}
            </Link>
          ))}
          <Link href="/rss.xml" className="hover:text-foreground font-mono transition-colors">
            RSS
          </Link>
        </div>
      </div>
    </footer>
  );
}
