export type WorkStatus = "shipped" | "in-progress" | "archived";

export interface WorkLinks {
  live?: string;
  github?: string;
}

export interface WorkFrontmatter {
  title: string;
  slug: string;
  tagline: string;
  period: string;
  status: WorkStatus;
  stack: string[];
  role: string;
  links?: WorkLinks;
  cover?: string;
  order: number;
  featured?: boolean;
}

export interface Work extends WorkFrontmatter {
  content: string;
}

export type WorkListItem = WorkFrontmatter;
