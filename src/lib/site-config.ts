export const siteConfig = {
  name: "Tai Phan",
  url: "https://taiphanvan.dev",
  ogImage: "https://taiphanvan.dev/og",
  description: "Engineer xây sản phẩm. Viết về Next.js, AI, indie SaaS.",
  author: {
    name: "Phan Văn Tài",
    handle: "@phanvantai",
    email: "taipv.swe@gmail.com",
  },
  social: {
    github: "https://github.com/phanvantai",
    twitter: "",
    linkedin: "https://www.linkedin.com/in/tai-phan-van",
    facebook: "",
  },
  nav: [
    { label: "Work", href: "/work" },
    { label: "Blog", href: "/blog" },
    { label: "Tools", href: "/tools" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
