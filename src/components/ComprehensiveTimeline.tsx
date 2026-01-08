"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "../hooks/useInView"
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion"
import { Github, ExternalLink, Award, Briefcase, Code, Trophy } from "lucide-react"
import type { Project, Hackathon, ExperienceItem } from "../data/profile"

type TimelineEntry = {
  id: string
  type: "project" | "hackathon" | "experience"
  date: string
  sortDate: number // For sorting
  title: string
  subtitle: string
  description: string
  data: Project | Hackathon | ExperienceItem
}

// Parse date string to a sortable number
function parseDate(dateStr: string): number {
  // Handle formats like "Oct 2024", "July 2025 – Present", "Jan 2024 – May 2024"
  const months: Record<string, number> = {
    jan: 1, january: 1, feb: 2, february: 2, mar: 3, march: 3,
    apr: 4, april: 4, may: 5, jun: 6, june: 6,
    jul: 7, july: 7, aug: 8, august: 8, sep: 9, september: 9,
    oct: 10, october: 10, nov: 11, november: 11, dec: 12, december: 12
  }

  // Extract first date from range
  const firstPart = dateStr.split("–")[0].trim().toLowerCase()
  const parts = firstPart.split(" ")
  
  if (parts.length >= 2) {
    const month = months[parts[0]]
    const year = parseInt(parts[1])
    if (month && year) {
      return year * 100 + month
    }
  }
  
  // Fallback: try to extract year only
  const yearMatch = dateStr.match(/\d{4}/)
  if (yearMatch) {
    return parseInt(yearMatch[0]) * 100
  }
  
  return 0
}

function TimelineItem({ entry, index }: { entry: TimelineEntry; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 })
  const prefersReducedMotion = usePrefersReducedMotion()
  const [isExpanded, setIsExpanded] = React.useState(false)

  const getIcon = () => {
    switch (entry.type) {
      case "project":
        return <Code className="h-4 w-4" />
      case "hackathon":
        return <Trophy className="h-4 w-4" />
      case "experience":
        return <Briefcase className="h-4 w-4" />
    }
  }

  const getColor = () => {
    switch (entry.type) {
      case "project":
        return "indigo"
      case "hackathon":
        return "amber"
      case "experience":
        return "emerald"
    }
  }

  const color = getColor()
  const colorClasses = {
    indigo: {
      bg: "bg-indigo-600 dark:bg-indigo-400",
      border: "border-indigo-600 dark:border-indigo-400",
      text: "text-indigo-600 dark:text-indigo-400",
      badge: "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400",
      line: "from-indigo-500/30 via-indigo-500/50"
    },
    amber: {
      bg: "bg-amber-500 dark:bg-amber-400",
      border: "border-amber-500 dark:border-amber-400",
      text: "text-amber-600 dark:text-amber-500",
      badge: "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-500",
      line: "from-amber-500/30 via-amber-500/50"
    },
    emerald: {
      bg: "bg-emerald-600 dark:bg-emerald-400",
      border: "border-emerald-600 dark:border-emerald-400",
      text: "text-emerald-600 dark:text-emerald-400",
      badge: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400",
      line: "from-emerald-500/30 via-emerald-500/50"
    }
  }[color]

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      className="relative pl-10 pb-8 last:pb-0"
      variants={itemVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {/* Animated Rail Line */}
      <motion.div
        className={`absolute left-[14px] top-0 h-full w-0.5 bg-gradient-to-b ${colorClasses.line} to-transparent`}
        initial={{ scaleY: 0, transformOrigin: "top" }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.8,
          delay: prefersReducedMotion ? 0 : index * 0.1 + 0.3,
          ease: [0.22, 1, 0.36, 1]
        }}
      />

      {/* Animated Node */}
      <motion.div
        className="absolute left-[7px] top-2 z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.5,
          delay: prefersReducedMotion ? 0 : index * 0.1 + 0.2,
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
      >
        <div className="relative">
          {!prefersReducedMotion && inView && (
            <motion.div
              className={`absolute inset-0 rounded-full ${colorClasses.bg} opacity-40`}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 0, 0.4]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          )}
          <div className={`h-4 w-4 rounded-full border-2 ${colorClasses.border} bg-white dark:bg-slate-950 shadow-lg relative z-10 flex items-center justify-center`}>
            <div className={`${colorClasses.text} relative z-10`}>
              {getIcon()}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card */}
      <motion.div
        className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer overflow-hidden"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.6,
          delay: prefersReducedMotion ? 0 : index * 0.1 + 0.2,
          ease: [0.22, 1, 0.36, 1]
        }}
        whileHover={prefersReducedMotion ? {} : { scale: 1.01, transition: { duration: 0.2 } }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-semibold tracking-tight text-black dark:text-white">
                  {entry.title}
                </h3>
                {entry.type === "hackathon" && (entry.data as Hackathon).award && (
                  <Award className={`h-4 w-4 ${colorClasses.text}`} />
                )}
              </div>
              <p className="text-sm text-black/60 dark:text-white/60">
                {entry.subtitle}
              </p>
            </div>
            <motion.p
              className={`text-xs font-medium px-2 py-1 rounded-full ${colorClasses.badge}`}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 + 0.5 }}
            >
              {entry.date}
            </motion.p>
          </div>

          <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed mb-3">
            {entry.description}
          </p>

          {/* Links for projects and hackathons */}
          {(entry.type === "project" || entry.type === "hackathon") && (
            <div className="flex items-center gap-2 mb-3">
              {(entry.data as Project | Hackathon).links.github && (
                <a
                  href={(entry.data as Project | Hackathon).links.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:border-black/20 dark:hover:border-white/20 transition"
                >
                  <Github className="h-3.5 w-3.5" />
                  Code
                </a>
              )}
              {entry.type === "project" && (entry.data as Project).links.demo && (
                <a
                  href={(entry.data as Project).links.demo}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Demo
                </a>
              )}
              {entry.type === "project" && (
                <Link
                  href={`/projects/${entry.data.id}/`}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition"
                >
                  View details →
                </Link>
              )}
            </div>
          )}

          {/* Expandable content for experience */}
          {entry.type === "experience" && (
            <AnimatePresence>
              {isExpanded && (entry.data as ExperienceItem).bullets.length > 0 && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden space-y-2 mt-4 pt-4 border-t border-black/5 dark:border-white/10"
                >
                  {(entry.data as ExperienceItem).bullets.map((bullet, i) => (
                    <motion.li
                      key={i}
                      className="text-sm text-black/70 dark:text-white/70 leading-relaxed pl-5 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-emerald-600/40 dark:before:bg-emerald-400/40"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      {bullet}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          )}

          {/* Expand indicator */}
          {entry.type === "experience" && (entry.data as ExperienceItem).bullets.length > 0 && (
            <div className="flex items-center justify-end mt-3 pt-3 border-t border-black/5 dark:border-white/10">
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={`${colorClasses.text}`}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ComprehensiveTimeline({
  projects,
  hackathons,
  experience
}: {
  projects: Project[]
  hackathons: Hackathon[]
  experience: ExperienceItem[]
}) {
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
        subtitle: `${h.role} • ${h.eventName}`,
        description: h.description,
        data: h
      })
    })

    // Add experience
    experience.forEach((e) => {
      // Extract start date from date range
      const startDate = e.dates.split("–")[0].trim()
      entries.push({
        id: e.id,
        type: "experience",
        date: e.dates,
        sortDate: parseDate(e.dates),
        title: e.role,
        subtitle: e.org,
        description: e.bullets[0] || "", // Use first bullet as description
        data: e
      })
    })

    // Sort by date (newest first)
    return entries.sort((a, b) => b.sortDate - a.sortDate)
  }, [projects, hackathons, experience])

  return (
    <div className="space-y-0" aria-label="Comprehensive timeline">
      {timelineEntries.map((entry, index) => (
        <TimelineItem key={entry.id} entry={entry} index={index} />
      ))}
    </div>
  )
}

