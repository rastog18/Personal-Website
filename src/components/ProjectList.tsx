import { useMemo, useRef, useState } from "react";
import type { Project } from "../data/profile";
import { ProjectCard } from "./ProjectCard";
import { matchesAllTags } from "@/utils/tags";
import { useAutoHeight } from "@/hooks/useAutoHeight";

export default function ProjectList({
  projects,
  activeTags
}: {
  projects: Project[];
  activeTags: string[];
}) {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => {
    return projects.filter((p) => matchesAllTags(p.tags, activeTags));
  }, [projects, activeTags]);

  const visible = useMemo(() => {
    // Requirement: show 4 initially.
    // If user is filtering, show all matching (more intuitive).
    if (activeTags.length > 0) return filtered;
    return expanded ? filtered : filtered.slice(0, 4);
  }, [filtered, expanded, activeTags]);

  useAutoHeight(containerRef, { deps: [visible.length, activeTags.join(","), expanded] });

  const showMoreNeeded = activeTags.length === 0 && filtered.length > 4;

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="grid gap-4 sm:grid-cols-2"
        aria-live="polite"
        aria-label="Projects list"
      >
        {visible.map((p, i) => (
          <div key={p.id} className="card-enter" style={{ animationDelay: `${i * 45}ms` }}>
            <ProjectCard {...p} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950/35 dark:text-zinc-200">
          <p className="font-medium">No projects match these filters.</p>
          <p className="mt-1 text-zinc-600 dark:text-zinc-300">
            Try clearing filters or selecting fewer skills.
          </p>
          <a
            href="#skills"
            className="mt-4 inline-flex rounded-lg bg-accent-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-accent-400"
          >
            Back to Skills
          </a>
        </div>
      )}

      {showMoreNeeded && (
        <button
          type="button"
          className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Show less" : `Show more (${filtered.length - 4})`}
        </button>
      )}
    </div>
  );
}
