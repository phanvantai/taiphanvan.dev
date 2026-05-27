export const locales = ["vi", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "vi";

export const localeNames: Record<Locale, string> = {
  vi: "Tiếng Việt",
  en: "English",
};

export const ogLocales: Record<Locale, string> = {
  vi: "vi_VN",
  en: "en_US",
};

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function assertLocale(value: string | undefined): asserts value is Locale {
  if (!isLocale(value)) {
    throw new Error(`Unsupported locale: ${value ?? "(empty)"}`);
  }
}

export function withLocale(locale: Locale, href: string): string {
  if (href === "/") return `/${locale}`;
  return `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
}

export function stripLocale(pathname: string): string {
  const parts = pathname.split("/");
  if (isLocale(parts[1])) {
    const stripped = `/${parts.slice(2).join("/")}`;
    return stripped === "/" ? "/" : stripped.replace(/\/$/, "") || "/";
  }
  return pathname || "/";
}

export function switchLocalePath(pathname: string, locale: Locale): string {
  return withLocale(locale, stripLocale(pathname));
}
