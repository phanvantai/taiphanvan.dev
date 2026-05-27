import { FeaturedWork } from "@/components/home/featured-work";
import { Hero } from "@/components/home/hero";
import { RecentPosts } from "@/components/home/recent-posts";
import { SocialLinks } from "@/components/home/social-links";
import { PersonJsonLd } from "@/components/seo/json-ld";
import { assertLocale, type Locale } from "@/i18n/routing";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  assertLocale(rawLocale);
  const locale: Locale = rawLocale;

  return (
    <>
      <PersonJsonLd locale={locale} />
      <Hero />
      <FeaturedWork />
      <RecentPosts />
      <SocialLinks />
    </>
  );
}
