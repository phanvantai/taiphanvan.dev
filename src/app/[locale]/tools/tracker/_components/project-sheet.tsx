"use client";

import { Trash2Icon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { deleteProject, updateProject } from "../_actions";
import { MarkdownPreview } from "./markdown-preview";
import { TaskList } from "./task-list";
import { cn, formatDate } from "@/lib/utils";
import { PROJECT_STATUS_VALUES, type ProjectWithTasks } from "@/types/tracker";

interface Props {
  project: ProjectWithTasks;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const STATUS_LABEL: Record<(typeof PROJECT_STATUS_VALUES)[number], string> = {
  ACTIVE: "Active",
  PAUSED: "Paused",
  DONE: "Done",
  ARCHIVED: "Archived",
};

export function ProjectSheet({ project, open, onOpenChange }: Props) {
  const [name, setName] = useState(project.name);
  const [emoji, setEmoji] = useState(project.emoji ?? "");
  const [color, setColor] = useState(project.color ?? "#6366F1");
  const [status, setStatus] = useState<(typeof PROJECT_STATUS_VALUES)[number]>(project.status);
  const [description, setDescription] = useState(project.description ?? "");
  const [notes, setNotes] = useState(project.notes ?? "");
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const [pending, startTransition] = useTransition();
  const [deleting, startDelete] = useTransition();

  function onSave() {
    startTransition(async () => {
      const res = await updateProject(project.id, {
        name,
        emoji,
        color,
        status,
        description,
        notes,
      });
      if (res.ok) {
        toast.success("Đã save");
        onOpenChange(false);
      } else {
        toast.error(res.error);
      }
    });
  }

  function onDelete() {
    if (!confirm(`Xoá project "${project.name}"? Toàn bộ task sẽ mất.`)) return;
    startDelete(async () => {
      const res = await deleteProject(project.id);
      if (res.ok) {
        toast.success("Đã xoá");
        onOpenChange(false);
      } else {
        toast.error(res.error);
      }
    });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-xl">
        <SheetHeader className="border-border/60 border-b p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block size-2.5 rounded-full"
              style={{ background: color || "var(--color-foreground)" }}
            />
            <SheetTitle className="text-muted-foreground font-mono text-xs tracking-wide uppercase">
              Edit project
            </SheetTitle>
          </div>
          <SheetDescription className="text-muted-foreground/80 font-mono text-[11px]">
            Tạo {formatDate(project.createdAt)} · last update {formatDate(project.lastUpdate)}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          <div className="space-y-5">
            <div className="grid grid-cols-[5rem_1fr] gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="emoji" className="font-mono text-[11px]">
                  Emoji
                </Label>
                <Input
                  id="emoji"
                  value={emoji}
                  onChange={(e) => setEmoji(e.target.value)}
                  maxLength={4}
                  placeholder="🎯"
                  className="text-center"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="name" className="font-mono text-[11px]">
                  Name
                </Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="status" className="font-mono text-[11px]">
                  Status
                </Label>
                <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECT_STATUS_VALUES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {STATUS_LABEL[s]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="color" className="font-mono text-[11px]">
                  Color
                </Label>
                <div className="flex gap-2">
                  <input
                    id="color"
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="border-input bg-background h-9 w-12 cursor-pointer rounded-md border"
                  />
                  <Input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    maxLength={7}
                    className="flex-1 font-mono text-xs uppercase"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description" className="font-mono text-[11px]">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                placeholder="Mô tả ngắn 1-2 câu..."
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="font-mono text-[11px]">Notes (markdown)</Label>
                <div className="flex font-mono text-[10px]">
                  <button
                    type="button"
                    onClick={() => setTab("edit")}
                    className={cn(
                      "border-border/60 rounded-l-md border px-2 py-0.5 transition-colors",
                      tab === "edit"
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:bg-muted/60",
                    )}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab("preview")}
                    className={cn(
                      "border-border/60 rounded-r-md border border-l-0 px-2 py-0.5 transition-colors",
                      tab === "preview"
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:bg-muted/60",
                    )}
                  >
                    Preview
                  </button>
                </div>
              </div>
              {tab === "edit" ? (
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={6}
                  placeholder="## TODO&#10;- &#x5B; &#x5D; ..."
                  className="font-mono text-[13px]"
                />
              ) : (
                <div className="border-input bg-background/50 min-h-32 rounded-md border px-3 py-2.5">
                  <MarkdownPreview source={notes} />
                </div>
              )}
            </div>

            <div className="space-y-2 pt-2">
              <Label className="font-mono text-[11px]">Tasks</Label>
              <TaskList projectId={project.id} tasks={project.tasks} />
            </div>
          </div>
        </div>

        <SheetFooter className="border-border/60 flex-row items-center justify-between border-t p-4 sm:p-5">
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            disabled={deleting}
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2Icon />
            Delete
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={onSave} disabled={pending || !name.trim()}>
              {pending ? "Saving..." : "Save"}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
