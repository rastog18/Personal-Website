"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function SkillChips({
  skills,
  counts,
  active,
  onToggle,
  onClear
}: {
  skills: string[]
  counts: Map<string, number>
  active: string[]
  onToggle: (skill: string) => void
  onClear: () => void
}) {
  const activeSet = React.useMemo(() => new Set(active), [active])

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {skills.map(skill => {
          const isOn = activeSet.has(skill)
          const count = counts.get(skill) ?? 0
          return (
            <button
              key={skill}
              type="button"
              aria-pressed={isOn}
              onClick={() => onToggle(skill)}
              className={cn(
                "group relative inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm",
                "transition select-none",
                isOn
                  ? "border-transparent bg-[rgba(var(--accent),0.14)] text-black dark:text-white"
                  : "border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:border-black/20 dark:hover:border-white/20",
              )}
            >
              <span className="relative">
                {skill}
                <span
                  className={cn(
                    "pointer-events-none absolute -bottom-0.5 left-0 h-[1px] w-full scale-x-0 bg-[rgb(var(--accent))]",
                    "origin-left transition-transform duration-300 group-hover:scale-x-100",
                    isOn && "scale-x-100"
                  )}
                />
              </span>
              <span className={cn("text-xs opacity-60", isOn && "opacity-80")}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs sm:text-sm text-black/55 dark:text-white/55">
          {active.length === 0 ? (
            <>Tip: click a skill to filter Projects + Hackathons.</>
          ) : (
            <>
              Filtering by{" "}
              <span className="font-medium text-black/80 dark:text-white/80">
                {active.join(", ")}
              </span>
              .
            </>
          )}
        </p>

        {active.length > 0 ? (
          <button
            type="button"
            onClick={onClear}
            className="text-xs sm:text-sm rounded-full px-3 py-1.5 border border-black/10 dark:border-white/10
                       hover:border-black/20 dark:hover:border-white/20 transition bg-white/60 dark:bg-white/5"
          >
            Clear filters
          </button>
        ) : null}
      </div>
    </div>
  )
}
