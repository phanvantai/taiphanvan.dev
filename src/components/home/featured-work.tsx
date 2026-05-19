import { FeaturedWorkBrutalist } from "@/components/home/featured-work-brutalist";
import { FeaturedWorkCypher } from "@/components/home/featured-work-cypher";
import { FeaturedWorkMinimalist } from "@/components/home/featured-work-minimalist";
import { FeaturedWorkTerminal } from "@/components/home/featured-work-terminal";
import { getUIStyle } from "@/lib/ui-style";

export function FeaturedWork() {
  const style = getUIStyle();
  if (style === "terminal") return <FeaturedWorkTerminal />;
  if (style === "neo-brutalist") return <FeaturedWorkBrutalist />;
  if (style === "minimalist") return <FeaturedWorkMinimalist />;
  return <FeaturedWorkCypher />;
}
