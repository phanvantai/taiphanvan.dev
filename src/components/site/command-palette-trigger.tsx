"use client";

import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { COMMAND_PALETTE_OPEN_EVENT } from "@/components/site/command-palette";

export function CommandPaletteTrigger() {
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Open command palette (⌘K)"
      onClick={() => window.dispatchEvent(new Event(COMMAND_PALETTE_OPEN_EVENT))}
    >
      <SearchIcon />
    </Button>
  );
}
