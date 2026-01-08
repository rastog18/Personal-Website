"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion"
import type { Project, Hackathon, ExperienceItem } from "../data/profile"
import { Code, Trophy, Briefcase } from "lucide-react"

type TimelineEntry = {
  id: string
  type: "project" | "hackathon" | "experience"
  date: string
  sortDate: number
  title: string
  subtitle: string
  description: string
  sectionId: string
}

// Parse date string to a sortable number
function parseDate(dateStr: string): number {
  const months: Record<string, number> = {
    jan: 1, january: 1, feb: 2, february: 2, mar: 3, march: 3,
    apr: 4, april: 4, may: 5, jun: 6, june: 6,
    jul: 7, july: 7, aug: 8, august: 8, sep: 9, september: 9,
    oct: 10, october: 10, nov: 11, november: 11, dec: 12, december: 12
  }

  const firstPart = dateStr.split("–")[0].trim().toLowerCase()
  const parts = firstPart.split(" ")
  
  if (parts.length >= 2) {
    const month = months[parts[0]]
    const year = parseInt(parts[1])
    if (month && year) {
      return year * 100 + month
    }
  }
  
  const yearMatch = dateStr.match(/\d{4}/)
  if (yearMatch) {
    return parseInt(yearMatch[0]) * 100
  }
  
  return 0
}

export default function HorizontalTimeline({
  projects,
  hackathons,
  experience
}: {
  projects: Project[]
  hackathons: Hackathon[]
  experience: ExperienceItem[]
}) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)

  // Combine all items into a unified timeline
  const timelineEntries: TimelineEntry[] = React.useMemo(() => {
    const entries: TimelineEntry[] = []

    // Add hackathons
    hackathons.forEach((h) => {
      entries.push({
        id: h.id,
        type: "hackathon",
        date: h.date,
        sortDate: parseDate(h.date),
        title: h.projectName,
        subtitle: h.eventName,
        description: h.description,
        sectionId: "hackathons"
      })
    })

    // Add experience
    experience.forEach((e) => {
      const startDate = e.dates.split("–")[0].trim()
      entries.push({
        id: e.id,
        type: "experience",
        date: e.dates,
        sortDate: parseDate(e.dates),
        title: e.role,
        subtitle: e.org,
        description: e.bullets[0] || "",
        sectionId: "experience"
      })
    })

    // Add projects (they don't have dates, so we'll add them at the end or estimate)
    // For now, let's add them without dates at the end
    projects.forEach((p) => {
      entries.push({
        id: p.id,
        type: "project",
        date: "", // Projects don't have dates
        sortDate: 0,
        title: p.title,
        subtitle: "Project",
        description: p.description,
        sectionId: "projects"
      })
    })

    // Sort by date (newest first), items without dates go to end
    return entries.sort((a, b) => {
      if (a.sortDate === 0 && b.sortDate === 0) return 0
      if (a.sortDate === 0) return 1
      if (b.sortDate === 0) return -1
      return b.sortDate - a.sortDate
    })
  }, [projects, hackathons, experience])

  const handleClick = (entry: TimelineEntry, index: number) => {
    setActiveIndex(index)
    const element = document.getElementById(entry.sectionId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "project":
        return <Code className="h-4 w-4" />
      case "hackathon":
        return <Trophy className="h-4 w-4" />
      case "experience":
        return <Briefcase className="h-4 w-4" />
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case "project":
        return {
          dot: "bg-indigo-600 dark:bg-indigo-400",
          text: "text-indigo-600 dark:text-indigo-400",
          border: "border-indigo-600 dark:border-indigo-400",
          bg: "bg-indigo-50/50 dark:bg-indigo-950/30"
        }
      case "hackathon":
        return {
          dot: "bg-amber-500 dark:bg-amber-400",
          text: "text-amber-600 dark:text-amber-500",
          border: "border-amber-500 dark:border-amber-400",
          bg: "bg-amber-50/50 dark:bg-amber-950/30"
        }
      case "experience":
        return {
          dot: "bg-emerald-600 dark:bg-emerald-400",
          text: "text-emerald-600 dark:text-emerald-400",
          border: "border-emerald-600 dark:border-emerald-400",
          bg: "bg-emerald-50/50 dark:bg-emerald-950/30"
        }
    }
  }

  return (
    <div className="w-full">
      {/* Title Section */}
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2">
          Journey
        </h2>
        <p className="text-sm text-black/60 dark:text-white/60">
          A chronological timeline of everything I've built and accomplished. Click to jump to that section.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-8 sm:p-12">
        {/* Horizontal Line with Dots */}
        <div className="relative mb-12">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-black/10 dark:bg-white/10 -translate-y-1/2" />
          
          {/* Dots */}
          <div className="relative flex justify-between">
            {timelineEntries.map((entry, index) => {
              const isActive = activeIndex === index
              const colors = getColor(entry.type)
              
              return (
                <motion.button
                  key={entry.id}
                  onClick={() => handleClick(entry, index)}
                  className="relative z-10"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.4,
                    delay: prefersReducedMotion ? 0 : index * 0.05
                  }}
                >
                  <motion.div
                    className={`w-4 h-4 rounded-full ${colors.dot} shadow-lg transition-colors duration-300`}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.2 }}
                    animate={isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                    transition={{
                      scale: { duration: 2, repeat: isActive ? Infinity : 0, ease: "easeInOut" }
                    }}
                  />
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Cards - Horizontal Scrollable */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-4 min-w-max">
            {timelineEntries.map((entry, index) => {
              const isActive = activeIndex === index
              const colors = getColor(entry.type)
              
              return (
                <motion.button
                  key={entry.id}
                  onClick={() => handleClick(entry, index)}
                  className={`relative rounded-xl border p-4 text-left transition-all duration-300 min-w-[200px] max-w-[250px] ${
                    isActive
                      ? `${colors.border} ${colors.bg} shadow-lg`
                      : "border-black/10 dark:border-white/10 bg-white/50 dark:bg-slate-800/50 hover:border-black/20 dark:hover:border-white/20"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.5,
                    delay: prefersReducedMotion ? 0 : index * 0.05 + 0.2
                  }}
                  whileHover={prefersReducedMotion ? {} : { 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Icon and Type */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`${colors.text}`}>
                      {getIcon(entry.type)}
                    </div>
                    <span className={`text-xs font-medium uppercase tracking-wide ${colors.text}`}>
                      {entry.type}
                    </span>
                  </div>

                  {/* Date */}
                  {entry.date && (
                    <p className={`text-xs font-medium mb-1 ${colors.text}`}>
                      {entry.date}
                    </p>
                  )}
                  
                  {/* Title */}
                  <h3 className={`text-base font-bold mb-1 ${
                    isActive
                      ? colors.text
                      : "text-black dark:text-white"
                  }`}>
                    {entry.title}
                  </h3>
                  
                  {/* Subtitle */}
                  <p className={`text-xs mb-2 ${
                    isActive
                      ? `${colors.text}/80`
                      : "text-black/60 dark:text-white/60"
                  }`}>
                    {entry.subtitle}
                  </p>
                  
                  {/* Description */}
                  <p className={`text-xs line-clamp-2 ${
                    isActive
                      ? `${colors.text}/70`
                      : "text-black/60 dark:text-white/60"
                  }`}>
                    {entry.description}
                  </p>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className={`absolute top-2 right-2 w-2 h-2 rounded-full ${colors.dot}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
