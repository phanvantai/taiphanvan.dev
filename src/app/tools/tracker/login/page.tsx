import type { Metadata } from "next";
import { Suspense } from "react";

import { LoginForm } from "@/app/tools/tracker/login/_login-form";

export const metadata: Metadata = {
  title: "Tracker — Login",
  robots: { index: false, follow: false },
};

export default function TrackerLoginPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-sm flex-col justify-center px-4 py-12 sm:px-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="site-eyebrow text-muted-foreground font-mono text-xs">
            /tools/tracker/login
          </p>
          <h1 className="site-page-title text-2xl font-semibold tracking-tight">Tracker</h1>
          <p className="text-muted-foreground text-sm">Riêng tư. Nhập password để vô.</p>
        </div>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </section>
  );
}
