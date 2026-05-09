"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";

import { CodeCopyButton } from "@/components/mdx/code-copy-button";

type Props = ComponentProps<"pre"> & {
  "data-language"?: string;
};

export function Pre({ children, className, ...rest }: Props) {
  const ref = useRef<HTMLPreElement>(null);
  const [text, setText] = useState("");
  const language = rest["data-language"];

  useEffect(() => {
    if (!ref.current) return;
    setText(ref.current.querySelector("code")?.textContent ?? "");
  }, [children]);

  return (
    <div className="not-prose group border-border/60 relative my-6 overflow-hidden rounded-lg border bg-[#0F0F0F] dark:bg-[#0a0a0a]">
      {language && (
        <div className="border-border/40 flex items-center justify-between border-b px-4 py-1.5">
          <span className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
            {language}
          </span>
          <CodeCopyButton
            text={text}
            className="opacity-0 transition-opacity group-hover:opacity-100"
          />
        </div>
      )}
      {!language && (
        <CodeCopyButton
          text={text}
          className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100"
        />
      )}
      <pre
        ref={ref}
        className={`${className ?? ""} overflow-x-auto px-4 py-3.5 text-[13px] leading-relaxed`}
        {...rest}
      >
        {children}
      </pre>
    </div>
  );
}
