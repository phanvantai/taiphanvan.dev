import { z } from "zod";

import { PROJECT_STATUS_VALUES } from "@/types/tracker";

const colorRegex = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export const projectCreateSchema = z.object({
  name: z.string().trim().min(1, "Tên không được trống").max(80),
  emoji: z.string().trim().max(8).optional().or(z.literal("")),
  color: z.string().trim().regex(colorRegex, "Hex color không hợp lệ").optional().or(z.literal("")),
  status: z.enum(PROJECT_STATUS_VALUES).default("ACTIVE"),
  description: z.string().trim().max(500).optional().or(z.literal("")),
  notes: z.string().max(20000).optional().or(z.literal("")),
});

export const projectUpdateSchema = projectCreateSchema.partial();

export const taskCreateSchema = z.object({
  title: z.string().trim().min(1, "Task title trống").max(200),
});

export const taskUpdateSchema = z.object({
  title: z.string().trim().min(1).max(200).optional(),
  done: z.boolean().optional(),
});

export type ProjectCreateInput = z.infer<typeof projectCreateSchema>;
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>;
export type TaskCreateInput = z.infer<typeof taskCreateSchema>;
export type TaskUpdateInput = z.infer<typeof taskUpdateSchema>;
