import { SocialLinksBrutalist } from "@/components/home/social-links-brutalist";
import { SocialLinksCypher } from "@/components/home/social-links-cypher";
import { SocialLinksTerminal } from "@/components/home/social-links-terminal";
import { getUIStyle } from "@/lib/ui-style";

export function SocialLinks() {
  const style = getUIStyle();
  if (style === "terminal") return <SocialLinksTerminal />;
  if (style === "neo-brutalist") return <SocialLinksBrutalist />;
  return <SocialLinksCypher />;
}
