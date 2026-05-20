import { RecentPostsBrutalist } from "@/components/home/recent-posts-brutalist";
import { RecentPostsCypher } from "@/components/home/recent-posts-cypher";
import { RecentPostsMinimalist } from "@/components/home/recent-posts-minimalist";
import { RecentPostsTerminal } from "@/components/home/recent-posts-terminal";
import { getUIStyle } from "@/lib/ui-style";

export function RecentPosts() {
  const style = getUIStyle();
  if (style === "terminal") return <RecentPostsTerminal />;
  if (style === "neo-brutalist") return <RecentPostsBrutalist />;
  if (style === "minimalist") return <RecentPostsMinimalist />;
  return <RecentPostsCypher />;
}
