import type { Metadata } from "next";

import "../globals.css";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function RootRedirectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
