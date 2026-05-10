"use client";

import { useState } from "react";

import { Card } from "@/components/ui/card";
import { ProjectSheet } from "@/app/tools/tracker/_components/project-sheet";
import { StaleBadge } from "@/app/tools/tracker/_components/stale-badge";
import { TouchButton } from "@/app/tools/tracker/_components/touch-button";
import { cn } from "@/lib/utils";
import type { ProjectWithTasks } from "@/types/tracker";

interface Props {
  project: ProjectWithTasks;
}

export function ProjectCard({ project }: Props) {
  const [open, setOpen] = useState(false);

  const total = project.tasks.length;
  const done = project.tasks.filter((t) => t.done).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const accent = project.color ?? "var(--color-foreground)";

  return (
    <>
      <Card
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className={cn(
          "site-card group hover:border-foreground/30 relative cursor-pointer gap-3 p-4 transition-colors",
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block size-2 rounded-full"
              style={{ background: accent }}
            />
            <h3 className="site-card-title text-base leading-tight font-semibold">
              {project.emoji && <span className="mr-1.5">{project.emoji}</span>}
              {project.name}
            </h3>
          </div>
          <StaleBadge lastUpdate={project.lastUpdate} status={project.status} />
        </div>

        {project.description && (
          <p className="text-muted-foreground line-clamp-2 text-sm">{project.description}</p>
        )}

        <div className="flex items-center gap-2.5 pt-1">
          <div className="bg-muted h-1 flex-1 overflow-hidden rounded-full">
            <div
              className="h-full rounded-full transition-[width] duration-300"
              style={{ width: `${pct}%`, background: accent }}
            />
          </div>
          <span className="site-meta text-muted-foreground font-mono text-[10px]">
            {done}/{total}
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="site-meta text-muted-foreground font-mono text-[10px]">
            {total === 0 ? "Chưa có task" : `${total - done} việc còn`}
          </span>
          <div onClick={(e) => e.stopPropagation()}>
            <TouchButton projectId={project.id} />
          </div>
        </div>
      </Card>

      <ProjectSheet open={open} onOpenChange={setOpen} project={project} />
    </>
  );
}
