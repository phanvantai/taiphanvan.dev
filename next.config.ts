import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// React 19.3 ships <ViewTransition> as stable and Next 16.3 dropped the
// `experimental.viewTransition` flag — route-level view transitions come from
// the <ViewTransition> wrapper in src/app/[locale]/layout.tsx.
const nextConfig: NextConfig = {};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
