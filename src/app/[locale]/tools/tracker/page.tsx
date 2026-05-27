import type { Metadata } from "next";
import type { Prisma, ProjectStatus } from "@prisma/client";

import { db } from "@/lib/db";
import type { TrackerFilter, TrackerSort } from "@/types/tracker";
import { FilterBar } from "./_components/filter-bar";
import { LogoutButton } from "./_components/logout-button";
import { NewProjectButton } from "./_components/new-project-button";
import { ProjectGrid } from "./_components/project-grid";

export const metadata: Metadata = {
  title: "Side Project Tracker",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const FILTER_TO_STATUS: Record<Exclude<TrackerFilter, "all">, ProjectStatus> = {
  active: "ACTIVE",
  paused: "PAUSED",
  done: "DONE",
  archived: "ARCHIVED",
};

function parseFilter(v: string | string[] | undefined): TrackerFilter {
  const s = Array.isArray(v) ? v[0] : v;
  if (s === "active" || s === "paused" || s === "done" || s === "archived") return s;
  return "all";
}

function parseSort(v: string | string[] | undefined): TrackerSort {
  const s = Array.isArray(v) ? v[0] : v;
  return s === "stale" ? "stale" : "recent";
}

type SearchParams = Promise<{ filter?: string | string[]; sort?: string | string[] }>;

export default async function TrackerPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const filter = parseFilter(sp.filter);
  const sort = parseSort(sp.sort);

  const where: Prisma.SideProjectWhereInput =
    filter === "all" ? {} : { status: FILTER_TO_STATUS[filter] };

  const projects = await db.sideProject.findMany({
    where,
    include: {
      tasks: {
        orderBy: [{ done: "asc" }, { createdAt: "asc" }],
      },
    },
    orderBy: {
      lastUpdate: sort === "stale" ? "asc" : "desc",
    },
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="site-eyebrow text-muted-foreground font-mono text-xs">/tools/tracker</p>
          <h1 className="site-page-title text-3xl font-semibold tracking-tight">Side Projects</h1>
          <p className="text-muted-foreground text-sm">
            Bỏ bê quá 7 ngày là vàng, 14 ngày là đỏ. Nhắc Tai đừng làm dở mà bỏ.
          </p>
        </div>
        <div className="flex gap-2">
          <NewProjectButton />
          <LogoutButton />
        </div>
      </header>

      <FilterBar filter={filter} sort={sort} count={projects.length} />

      {projects.length === 0 ? (
        <div className="border-border/60 mt-10 rounded-lg border border-dashed p-12 text-center">
          <p className="text-muted-foreground text-sm">
            {filter === "all"
              ? "Chưa có project. Add cái đầu tiên đi bro 🚀"
              : `Không có project nào "${filter}". Nhẹ não rồi.`}
          </p>
        </div>
      ) : (
        <ProjectGrid projects={projects} />
      )}
    </section>
  );
}
