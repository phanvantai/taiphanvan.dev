import type { ProjectStatus, SideProject, Task } from "@prisma/client";

export type { ProjectStatus, SideProject, Task };

export type ProjectWithTasks = SideProject & { tasks: Task[] };

export type TrackerFilter = "all" | "active" | "paused" | "done" | "archived";
export type TrackerSort = "recent" | "stale";

export const PROJECT_STATUS_VALUES = ["ACTIVE", "PAUSED", "DONE", "ARCHIVED"] as const;
