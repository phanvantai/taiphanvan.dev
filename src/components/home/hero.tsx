import { HeroBrutalist } from "@/components/home/hero-brutalist";
import { HeroCypher } from "@/components/home/hero-cypher";
import { HeroMinimalist } from "@/components/home/hero-minimalist";
import { HeroTerminal } from "@/components/home/hero-terminal";
import { getUIStyle } from "@/lib/ui-style";

export function Hero() {
  const style = getUIStyle();
  if (style === "terminal") return <HeroTerminal />;
  if (style === "neo-brutalist") return <HeroBrutalist />;
  if (style === "minimalist") return <HeroMinimalist />;
  return <HeroCypher />;
}
