"use client";

import { CheckCircle2Icon, Loader2Icon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { touchProject } from "../_actions";

interface Props {
  projectId: string;
}

export function TouchButton({ projectId }: Props) {
  const [pending, startTransition] = useTransition();

  function onClick(e: React.MouseEvent) {
    e.stopPropagation();
    startTransition(async () => {
      const res = await touchProject(projectId);
      if (res.ok) toast.success("Đã bump 📌");
      else toast.error(res.error);
    });
  }

  return (
    <Button
      variant="ghost"
      size="xs"
      disabled={pending}
      onClick={onClick}
      className="font-mono text-[10px]"
      aria-label="Mark as updated"
    >
      {pending ? <Loader2Icon className="animate-spin" /> : <CheckCircle2Icon />}
      Touch
    </Button>
  );
}
