import type { Metadata } from "next";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Tools",
  description: "Mini tools cá nhân của Tai.",
};

const tools = [
  {
    href: "/tools/tracker",
    title: "Side Project Tracker",
    description: "Track side project, nhắc khi bỏ bê quá lâu.",
    status: "Riêng tư · cần password",
  },
];

export default function ToolsPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="mb-10 space-y-3">
        <p className="site-eyebrow text-muted-foreground font-mono text-xs">/tools</p>
        <h1 className="site-page-title text-3xl font-semibold tracking-tight sm:text-4xl">Tools</h1>
        <p className="text-muted-foreground">
          Mini tool tự build cho việc dùng cá nhân. Có gì hay sẽ public ra đây.
        </p>
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
