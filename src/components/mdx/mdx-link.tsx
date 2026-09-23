import Link from "next/link";
import { getLocale } from "next-intl/server";
import type { ComponentProps } from "react";

import { isLocale, withLocale, type Locale } from "@/i18n/routing";

type Props = ComponentProps<"a">;

/**
 * Internal MDX links are written without a locale (`/work/examino`) so the
 * same content works under `/vi` and `/en`. Prefix them with the current
 * locale at render time; already-localized or external links pass through.
 */
function localizeHref(href: string, locale: Locale): string {
  const [, first] = href.split("/");
  if (isLocale(first)) return href;
  return withLocale(locale, href);
}

export async function MdxLink({ href, children, ...rest }: Props) {
  if (!href) return <a {...rest}>{children}</a>;

  if (href.startsWith("/")) {
    const locale = (await getLocale()) as Locale;
    return (
      <Link href={localizeHref(href, locale)} {...rest}>
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
