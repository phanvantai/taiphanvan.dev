import { CheckCircle2Icon, InfoIcon, OctagonAlertIcon, TriangleAlertIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CalloutType = "info" | "warning" | "success" | "error";

interface Props {
  type?: CalloutType;
  children: ReactNode;
  title?: string;
}

const STYLES: Record<
  CalloutType,
  { icon: typeof InfoIcon; border: string; bg: string; iconColor: string }
> = {
  info: {
    icon: InfoIcon,
    border: "border-blue-500/30",
    bg: "bg-blue-500/5",
    iconColor: "text-blue-500",
  },
  warning: {
    icon: TriangleAlertIcon,
    border: "border-amber-500/30",
    bg: "bg-amber-500/5",
    iconColor: "text-amber-500",
  },
  success: {
    icon: CheckCircle2Icon,
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5",
    iconColor: "text-emerald-500",
  },
  error: {
    icon: OctagonAlertIcon,
    border: "border-red-500/30",
    bg: "bg-red-500/5",
    iconColor: "text-red-500",
  },
};

export function Callout({ type = "info", title, children }: Props) {
  const { icon: Icon, border, bg, iconColor } = STYLES[type];
  return (
    <aside
      className={cn(
        "not-prose my-6 flex gap-3 rounded-lg border px-4 py-3 text-sm leading-relaxed",
        border,
        bg,
      )}
    >
      <Icon className={cn("mt-0.5 size-4 shrink-0", iconColor)} />
      <div className="space-y-1 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
        {title && <p className="text-foreground font-semibold">{title}</p>}
        {children}
      </div>
    </aside>
  );
}
