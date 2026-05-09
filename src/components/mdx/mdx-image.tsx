import NextImage from "next/image";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type Props = ComponentProps<typeof NextImage> & { caption?: string };

export function MdxImage({ caption, className, alt, ...rest }: Props) {
  return (
    <figure className="not-prose my-6 space-y-2">
      <div className="border-border/60 overflow-hidden rounded-lg border">
        <NextImage
          alt={alt}
          className={cn("h-auto w-full", className)}
          sizes="(max-width: 768px) 100vw, 720px"
          {...rest}
        />
      </div>
      {caption && (
        <figcaption className="text-muted-foreground text-center font-mono text-[11px]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
