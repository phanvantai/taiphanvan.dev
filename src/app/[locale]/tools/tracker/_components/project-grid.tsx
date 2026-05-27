import { ProjectCard } from "./project-card";
import type { ProjectWithTasks } from "@/types/tracker";

interface Props {
  projects: ProjectWithTasks[];
}

export function ProjectGrid({ projects }: Props) {
  return (
    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  );
}
