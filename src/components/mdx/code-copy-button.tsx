"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface Props {
  text: string;
  className?: string;
}

export function CodeCopyButton({ text, className }: Props) {
  const [copied, setCopied] = useState(false);

  async function onClick() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard API may be blocked (insecure context, permissions); fail silently.
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={copied ? "Đã copy" : "Copy code"}
      className={cn(
        "border-border/40 bg-background/80 text-muted-foreground hover:bg-muted hover:text-foreground inline-flex size-7 items-center justify-center rounded-md border transition-colors",
        className,
      )}
    >
      {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
    </button>
  );
}
