"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    // Surface to whatever logging the runtime has wired up. In production
    // this is captured by Vercel + Sentry-equivalent if we add one later.
    console.error("[app/error.tsx]", error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-xl flex-col items-start justify-center gap-6 px-4 py-16 sm:px-6">
      <p className="text-muted-foreground font-mono text-xs">500 · Lỗi bất ngờ</p>
      <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        Có gì đó vỡ.
      </h1>
      <p className="text-muted-foreground max-w-prose text-pretty">
        Một lỗi không lường trước xảy ra. Bro thử lại, hoặc về home. Nếu vẫn vậy thì cho mình biết
        kèm thông tin gì bro vừa làm.
      </p>
      {error.digest && (
        <p className="border-border/40 bg-muted/40 text-muted-foreground rounded-md border px-3 py-2 font-mono text-[11px]">
          digest: {error.digest}
        </p>
      )}
      <div className="flex flex-wrap gap-3 pt-2">
        <Button onClick={reset}>Thử lại</Button>
        <Button variant="outline" render={<Link href="/" />}>
          Về home
        </Button>
      </div>
    </section>
  );
}
