import { FeaturedWork } from "@/components/home/featured-work";
import { Hero } from "@/components/home/hero";
import { RecentPosts } from "@/components/home/recent-posts";
import { SocialLinks } from "@/components/home/social-links";
import { PersonJsonLd } from "@/components/seo/json-ld";

export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <Hero />
      <FeaturedWork />
      <RecentPosts />
      <SocialLinks />
    </>
  );
}
