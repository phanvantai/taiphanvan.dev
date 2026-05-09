export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  featured?: boolean;
  cover?: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
  readingTime: number; // minutes (rounded)
}

export interface PostListItem extends PostFrontmatter {
  slug: string;
  readingTime: number;
}
