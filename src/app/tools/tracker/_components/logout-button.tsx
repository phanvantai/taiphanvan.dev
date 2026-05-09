"use client";

import { LogOutIcon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const [pending, startTransition] = useTransition();

  function onClick() {
    startTransition(async () => {
      try {
        await fetch("/api/tracker/logout", { method: "POST" });
        // Hard nav: ensure middleware re-runs without the stale auth cookie.
        window.location.assign("/tools/tracker/login");
      } catch {
        toast.error("Logout fail");
      }
    });
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={pending}
      aria-label="Logout"
      className="text-muted-foreground"
    >
      <LogOutIcon />
      <span className="sr-only sm:not-sr-only">Logout</span>
    </Button>
  );
}
