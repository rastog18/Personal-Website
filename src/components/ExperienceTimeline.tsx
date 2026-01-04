"use client"

import type { ExperienceItem } from "../data/profile";
import { useInView } from "../hooks/useInView";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

function TimelineItem({ item }: { item: ExperienceItem }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div
      ref={ref}
      className="relative pl-10"
      data-inview={inView ? "true" : "false"}
    >
      {/* Rail */}
      <div className="absolute left-[14px] top-0 h-full w-px bg-zinc-200 dark:bg-zinc-800" />

      {/* Node */}
      <div
        className={[
          "absolute left-[7px] top-2 h-4 w-4 rounded-full border",
          "border-zinc-300 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950",
          "transition-[transform,opacity,box-shadow] duration-500 ease-out-quint",
          inView ? "scale-100 opacity-100 shadow-[0_0_0_0_rgba(20,184,166,0.15)]" : "scale-90 opacity-60"
        ].join(" ")}
      >
        {/* Pulse ring - only animate if not reduced motion */}
        {!prefersReducedMotion && (
          <div
            className={inView ? "absolute inset-0 rounded-full animate-pulse-ring" : "absolute inset-0 rounded-full"}
            style={{ boxShadow: "0 0 0 6px rgba(20,184,166,.10)" }}
            aria-hidden="true"
          />
        )}
        <div className="absolute inset-[3px] rounded-full bg-[rgb(var(--accent))]/70" />
      </div>

      {/* Card */}
      <div
        className={[
          "rounded-2xl border border-zinc-200 bg-white/80 p-5 shadow-sm",
          "dark:border-zinc-800 dark:bg-zinc-950/35",
          "transition-[transform,opacity] duration-500 ease-out-quint",
          inView ? "translate-y-0 opacity-100" : "translate-y-[8px] opacity-0"
        ].join(" ")}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold tracking-tight">{item.role}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{item.org}</p>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.dates}</p>
        </div>

        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-200">
          {item.bullets.slice(0, 2).map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  return (
    <div className="space-y-5" aria-label="Experience timeline">
      {items.map((x) => (
        <TimelineItem key={x.id} item={x} />
      ))}
    </div>
  );
}
