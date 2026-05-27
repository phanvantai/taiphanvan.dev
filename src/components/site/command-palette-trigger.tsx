"use client";

import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { COMMAND_PALETTE_OPEN_EVENT } from "@/components/site/command-palette";

export function CommandPaletteTrigger() {
  const t = useTranslations("Site.actions");

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label={t("openCommandPalette")}
      onClick={() => window.dispatchEvent(new Event(COMMAND_PALETTE_OPEN_EVENT))}
    >
      <SearchIcon />
    </Button>
  );
}
