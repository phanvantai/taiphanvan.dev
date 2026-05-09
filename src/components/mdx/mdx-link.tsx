import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<"a">;

export function MdxLink({ href, children, ...rest }: Props) {
  if (!href) return <a {...rest}>{children}</a>;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}
