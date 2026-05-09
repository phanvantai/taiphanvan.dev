"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { TRACKER_COOKIE_NAME, verifySession } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  projectCreateSchema,
  projectUpdateSchema,
  taskCreateSchema,
  taskUpdateSchema,
} from "@/app/tools/tracker/_schemas";

export type ActionResult<T = void> =
  | (T extends void ? { ok: true } : { ok: true; data: T })
  | { ok: false; error: string };

const TRACKER_PATH = "/tools/tracker";

async function requireAuth() {
  const secret = process.env.TRACKER_COOKIE_SECRET;
  if (!secret) {
    redirect(`${TRACKER_PATH}/login?error=config`);
  }
  const cookieStore = await cookies();
  const cookie = cookieStore.get(TRACKER_COOKIE_NAME)?.value;
  const ok = await verifySession(cookie, secret);
  if (!ok) {
    redirect(`${TRACKER_PATH}/login`);
  }
}

function fmtZod(err: unknown): string {
  if (err && typeof err === "object" && "issues" in err) {
    const issues = (err as { issues: { message: string }[] }).issues;
    return issues[0]?.message ?? "Invalid input";
  }
  return "Invalid input";
}

function nullify<T extends string | undefined>(v: T): T | null {
  if (v === undefined || v === "") return null as T | null;
  return v;
}

// ============================================================
// Projects
// ============================================================

export async function createProject(input: unknown): Promise<ActionResult<{ id: string }>> {
  await requireAuth();
  const parsed = projectCreateSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: fmtZod(parsed.error) };

  const data = parsed.data;
  const created = await db.sideProject.create({
    data: {
      name: data.name,
      emoji: nullify(data.emoji),
      color: nullify(data.color),
      status: data.status,
      description: nullify(data.description),
      notes: nullify(data.notes),
    },
    select: { id: true },
  });
  revalidatePath(TRACKER_PATH);
  return { ok: true, data: created };
}

export async function updateProject(id: string, input: unknown): Promise<ActionResult> {
  await requireAuth();
  if (!id) return { ok: false, error: "Missing id" };
  const parsed = projectUpdateSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: fmtZod(parsed.error) };

  const d = parsed.data;
  await db.sideProject.update({
    where: { id },
    data: {
      ...(d.name !== undefined && { name: d.name }),
      ...(d.emoji !== undefined && { emoji: nullify(d.emoji) }),
      ...(d.color !== undefined && { color: nullify(d.color) }),
      ...(d.status !== undefined && { status: d.status }),
      ...(d.description !== undefined && { description: nullify(d.description) }),
      ...(d.notes !== undefined && { notes: nullify(d.notes) }),
      lastUpdate: new Date(),
    },
  });
  revalidatePath(TRACKER_PATH);
  return { ok: true };
}

export async function deleteProject(id: string): Promise<ActionResult> {
  await requireAuth();
  if (!id) return { ok: false, error: "Missing id" };
  await db.sideProject.delete({ where: { id } });
  revalidatePath(TRACKER_PATH);
  return { ok: true };
}

export async function touchProject(id: string): Promise<ActionResult> {
  await requireAuth();
  if (!id) return { ok: false, error: "Missing id" };
  await db.sideProject.update({
    where: { id },
    data: { lastUpdate: new Date() },
  });
  revalidatePath(TRACKER_PATH);
  return { ok: true };
}

// ============================================================
// Tasks
// ============================================================

export async function addTask(
  projectId: string,
  input: unknown,
): Promise<ActionResult<{ id: string }>> {
  await requireAuth();
  if (!projectId) return { ok: false, error: "Missing projectId" };
  const parsed = taskCreateSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: fmtZod(parsed.error) };

  const created = await db.task.create({
    data: { projectId, title: parsed.data.title },
    select: { id: true },
  });
  await db.sideProject.update({
    where: { id: projectId },
    data: { lastUpdate: new Date() },
  });
  revalidatePath(TRACKER_PATH);
  return { ok: true, data: created };
}

export async function updateTask(taskId: string, input: unknown): Promise<ActionResult> {
  await requireAuth();
  if (!taskId) return { ok: false, error: "Missing taskId" };
  const parsed = taskUpdateSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: fmtZod(parsed.error) };

  const d = parsed.data;
  const task = await db.task.update({
    where: { id: taskId },
    data: {
      ...(d.title !== undefined && { title: d.title }),
      ...(d.done !== undefined && { done: d.done, doneAt: d.done ? new Date() : null }),
    },
    select: { projectId: true },
  });
  await db.sideProject.update({
    where: { id: task.projectId },
    data: { lastUpdate: new Date() },
  });
  revalidatePath(TRACKER_PATH);
  return { ok: true };
}

export async function deleteTask(taskId: string): Promise<ActionResult> {
  await requireAuth();
  if (!taskId) return { ok: false, error: "Missing taskId" };
  const task = await db.task.delete({
    where: { id: taskId },
    select: { projectId: true },
  });
  await db.sideProject.update({
    where: { id: task.projectId },
    data: { lastUpdate: new Date() },
  });
  revalidatePath(TRACKER_PATH);
  return { ok: true };
}
