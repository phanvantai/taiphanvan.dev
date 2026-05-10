export const siteConfig = {
  name: "Tai Phan",
  url: "https://taiphanvan.dev",
  ogImage: "https://taiphanvan.dev/og",
  description:
    "Canvas cá nhân của Tai — engineer ở Việt Nam, làm sản phẩm. Tech, AI, phim, sách, ảnh, game, bất cứ gì muốn ghi.",
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
