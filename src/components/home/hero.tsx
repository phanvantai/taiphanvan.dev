import { HeroBrutalist } from "@/components/home/hero-brutalist";
import { HeroCypher } from "@/components/home/hero-cypher";
import { HeroTerminal } from "@/components/home/hero-terminal";
import { getUIStyle } from "@/lib/ui-style";

export function Hero() {
  const style = getUIStyle();
  if (style === "terminal") return <HeroTerminal />;
  if (style === "neo-brutalist") return <HeroBrutalist />;
  return <HeroCypher />;
}
