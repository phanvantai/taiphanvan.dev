import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  experimental: {
    // React 19 <ViewTransition> integration — Next triggers a CSS view transition
    // on route navigation. Falls back to instant nav on browsers without support.
    viewTransition: true,
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
