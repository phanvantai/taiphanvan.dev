"use client";

import { PlusIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { createProject } from "../_actions";

export function NewProjectButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [color, setColor] = useState("#6366F1");
  const [description, setDescription] = useState("");
  const [pending, startTransition] = useTransition();

  function reset() {
    setName("");
    setEmoji("");
    setColor("#6366F1");
    setDescription("");
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    startTransition(async () => {
      const res = await createProject({ name, emoji, color, description });
      if (res.ok) {
        toast.success("Đã thêm project");
        reset();
        setOpen(false);
      } else {
        toast.error(res.error);
      }
    });
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) reset();
      }}
    >
      <SheetTrigger render={<Button size="sm" />}>
        <PlusIcon />
        New project
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-border/60 border-b p-4 sm:p-5">
          <SheetTitle className="text-muted-foreground font-mono text-xs tracking-wide uppercase">
            New project
          </SheetTitle>
        </SheetHeader>
        <form onSubmit={onSubmit} className="flex flex-1 flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
            <div className="grid grid-cols-[5rem_1fr] gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="np-emoji" className="font-mono text-[11px]">
                  Emoji
                </Label>
                <Input
                  id="np-emoji"
                  value={emoji}
                  onChange={(e) => setEmoji(e.target.value)}
                  maxLength={4}
                  placeholder="🎯"
                  className="text-center"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="np-name" className="font-mono text-[11px]">
                  Name
                </Label>
                <Input
                  id="np-name"
                  autoFocus
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Examino, BeStar app..."
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="np-color" className="font-mono text-[11px]">
                Color
              </Label>
              <div className="flex gap-2">
                <input
                  id="np-color"
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
            <div className="space-y-1.5">
              <Label htmlFor="np-desc" className="font-mono text-[11px]">
                Description
              </Label>
              <Textarea
                id="np-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Mô tả ngắn..."
              />
            </div>
          </div>
          <SheetFooter className="border-border/60 flex-row justify-end gap-2 border-t p-4 sm:p-5">
            <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={pending || !name.trim()}>
              {pending ? "Đang tạo..." : "Tạo"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
