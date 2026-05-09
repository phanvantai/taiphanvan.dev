import type { ProjectStatus } from "@prisma/client";

import { cn, daysSince } from "@/lib/utils";

const WARN_DAYS = 7;
const ALERT_DAYS = 14;

interface Props {
  lastUpdate: Date;
  status: ProjectStatus;
  className?: string;
}

export function StaleBadge({ lastUpdate, status, className }: Props) {
  if (status !== "ACTIVE") {
    const labels: Record<Exclude<ProjectStatus, "ACTIVE">, string> = {
      PAUSED: "Paused",
      DONE: "Done",
      ARCHIVED: "Archived",
    };
    return (
      <span
        className={cn(
          "border-border/60 bg-muted/40 text-muted-foreground inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[10px] tracking-wide uppercase",
          className,
        )}
      >
        {labels[status]}
      </span>
    );
  }

  const d = daysSince(lastUpdate);
  let tone: "ok" | "warn" | "alert";
  let label: string;
  if (d >= ALERT_DAYS) {
    tone = "alert";
    label = `Bỏ bê ${d} ngày 🔥`;
  } else if (d >= WARN_DAYS) {
    tone = "warn";
    label = `Lâu rồi ${d} ngày ⏰`;
  } else {
    tone = "ok";
    label = d === 0 ? "Hôm nay ✓" : `${d} ngày trước`;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[10px] tracking-wide",
        tone === "alert" &&
          "border-red-500/30 bg-red-500/10 text-red-400 dark:border-red-500/40 dark:bg-red-500/15",
        tone === "warn" &&
          "border-amber-500/30 bg-amber-500/10 text-amber-500 dark:border-amber-500/40 dark:bg-amber-500/15 dark:text-amber-300",
        tone === "ok" &&
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:border-emerald-500/40 dark:bg-emerald-500/15 dark:text-emerald-300",
        className,
      )}
    >
      {label}
    </span>
  );
}
