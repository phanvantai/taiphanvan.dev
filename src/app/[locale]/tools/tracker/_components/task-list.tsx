"use client";

import type { Task } from "@prisma/client";
import { XIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { addTask, deleteTask, updateTask } from "../_actions";
import { cn } from "@/lib/utils";

interface Props {
  projectId: string;
  tasks: Task[];
}

export function TaskList({ projectId, tasks }: Props) {
  const [draft, setDraft] = useState("");
  const [pending, startTransition] = useTransition();

  function onAdd() {
    const title = draft.trim();
    if (!title) return;
    startTransition(async () => {
      const res = await addTask(projectId, { title });
      if (res.ok) {
        setDraft("");
      } else {
        toast.error(res.error);
      }
    });
  }

  return (
    <div className="space-y-1.5">
      {tasks.length === 0 && (
        <p className="border-border/60 text-muted-foreground/70 rounded-md border border-dashed px-3 py-3 text-center font-mono text-[11px]">
          Chưa có task. Thêm việc cần làm.
        </p>
      )}
      {tasks.map((task) => (
        <TaskRow key={task.id} task={task} />
      ))}
      <div className="flex items-center gap-2 pt-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onAdd();
            }
          }}
          placeholder="+ Thêm task, Enter để lưu..."
          disabled={pending}
          className="text-sm"
        />
        <Button size="sm" onClick={onAdd} disabled={pending || !draft.trim()}>
          Add
        </Button>
      </div>
    </div>
  );
}

function TaskRow({ task }: { task: Task }) {
  const [pending, startTransition] = useTransition();
  const [deleting, startDelete] = useTransition();

  function onToggle(checked: boolean) {
    startTransition(async () => {
      const res = await updateTask(task.id, { done: checked });
      if (!res.ok) toast.error(res.error);
    });
  }

  function onDelete() {
    startDelete(async () => {
      const res = await deleteTask(task.id);
      if (!res.ok) toast.error(res.error);
    });
  }

  return (
    <div
      className={cn(
        "group border-border/40 bg-background/50 flex items-center gap-2.5 rounded-md border px-3 py-2 transition-opacity",
        (pending || deleting) && "opacity-60",
        task.done && "opacity-50",
      )}
    >
      <Checkbox
        checked={task.done}
        onCheckedChange={(v) => onToggle(Boolean(v))}
        disabled={pending}
        aria-label={task.title}
      />
      <span
        className={cn(
          "flex-1 text-sm leading-snug",
          task.done && "text-muted-foreground line-through",
        )}
      >
        {task.title}
      </span>
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={onDelete}
        disabled={deleting}
        className="opacity-0 transition-opacity group-hover:opacity-100"
        aria-label="Xoá task"
      >
        <XIcon />
      </Button>
    </div>
  );
}
