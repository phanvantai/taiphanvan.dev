export const siteConfig = {
  name: "Tai Phan",
  url: "https://taiphanvan.dev",
  ogImage: "https://taiphanvan.dev/og",
  description: "Engineer xây sản phẩm. Viết về Next.js, AI, indie SaaS.",
  author: {
    name: "Phan Văn Tài",
    handle: "@taiphanvan",
    email: "",
  },
  social: {
    github: "",
    twitter: "",
    linkedin: "",
    facebook: "",
  },
  nav: [
    { label: "Work", href: "/work" },
    { label: "Blog", href: "/blog" },
    { label: "Tools", href: "/tools" },
    { label: "About", href: "/about" },
    { label: "Now", href: "/now" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
