"use client";

import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const params = useSearchParams();
  const from = params.get("from") ?? "/tools/tracker";
  const error = params.get("error");

  const [password, setPassword] = useState("");
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password) return;

    startTransition(async () => {
      try {
        const res = await fetch("/api/tracker/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });
        const data = (await res.json()) as { ok: boolean; error?: string };
        if (!data.ok) {
          toast.error(data.error ?? "Login fail");
          return;
        }
        // Hard navigation: middleware cached the unauthenticated redirect for
        // `from`; router.replace would re-use it. window.location forces a full
        // request that carries the freshly-set cookie.
        window.location.assign(from);
      } catch {
        toast.error("Network error");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error === "config" && (
        <p className="border-destructive/40 bg-destructive/10 text-destructive rounded-md border px-3 py-2 text-xs">
          ⚠ Server chưa config TRACKER_COOKIE_SECRET. Check .env.local.
        </p>
      )}
      <div className="space-y-2">
        <Label htmlFor="password" className="font-mono text-xs">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={pending}
          placeholder="••••••••"
        />
      </div>
      <Button type="submit" size="lg" disabled={pending || !password} className="w-full">
        {pending ? "Đang vô..." : "Vô tracker"}
      </Button>
    </form>
  );
}
