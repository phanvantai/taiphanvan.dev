export type UIStyle = "cypher-2049" | "terminal" | "neo-brutalist" | "minimalist";

const VALID_STYLES: readonly UIStyle[] = [
  "cypher-2049",
  "terminal",
  "neo-brutalist",
  "minimalist",
] as const;

export function getUIStyle(): UIStyle {
  const raw = process.env.NEXT_PUBLIC_UI_STYLE?.trim().toLowerCase();
  return VALID_STYLES.includes(raw as UIStyle) ? (raw as UIStyle) : "cypher-2049";
}
