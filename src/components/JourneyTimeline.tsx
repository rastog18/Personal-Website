"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"
import { useInView } from "@/hooks/useInView"
import { useRouter } from "next/navigation"
import type { JourneyMilestone } from "@/data/journey"
import { cn } from "@/lib/utils"

interface JourneyTimelineProps {
  milestones: JourneyMilestone[]
}

export function JourneyTimeline({ milestones }: JourneyTimelineProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const router = useRouter()
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { ref: sectionRef, inView } = useInView<HTMLElement>({ threshold: 0.1 })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Progress line width (subtle animation)
  const progressWidth = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  )

  // Track active section via IntersectionObserver
  React.useEffect(() => {
    const observers: IntersectionObserver[] = []

    milestones.forEach((milestone) => {
      const element = document.getElementById(milestone.sectionId)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              setActiveId(milestone.id)
            }
          })
        },
        {
          threshold: 0.3,
          rootMargin: "-20% 0px -60% 0px"
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [milestones])

  const handleClick = (milestone: JourneyMilestone, e: React.MouseEvent) => {
    e.preventDefault()
    
    // Projects: navigate to project detail page
    if (milestone.type === "project" && milestone.projectId) {
      router.push(`/projects/${milestone.projectId}/`)
      return
    }
    
    // Experience/Hackathons: scroll to section and expand if needed
    // Try multiple ways to find the element
    let element = document.getElementById(milestone.sectionId)
    
    // If not found, try without the prefix
    if (!element && milestone.sectionId.startsWith('exp-')) {
      const idWithoutPrefix = milestone.sectionId.replace('exp-', '')
      element = document.getElementById(idWithoutPrefix) || document.getElementById(`exp-${idWithoutPrefix}`)
    }
    if (!element && milestone.sectionId.startsWith('hack-')) {
      const idWithoutPrefix = milestone.sectionId.replace('hack-', '')
      element = document.getElementById(idWithoutPrefix) || document.getElementById(`hack-${idWithoutPrefix}`)
    }
    if (!element && milestone.sectionId.startsWith('proj-')) {
      const idWithoutPrefix = milestone.sectionId.replace('proj-', '')
      element = document.getElementById(idWithoutPrefix) || document.getElementById(`proj-${idWithoutPrefix}`)
    }
    
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      })

      // For experience items, try to trigger expansion
      if (milestone.type === "experience") {
        // Small delay to ensure scroll completes, then try to expand
        setTimeout(() => {
          const itemId = milestone.id.replace('exp-', '')
          const expElement = element?.querySelector(`[data-item-id="${itemId}"]`) as HTMLElement
          if (expElement) {
            expElement.click()
          }
        }, prefersReducedMotion ? 0 : 500)
      }
    } else {
      // Fallback: try scrolling to the section by ID
      const sectionElement = document.querySelector(`#${milestone.sectionId}`) as HTMLElement
      if (sectionElement) {
        const headerOffset = 80
        const elementPosition = sectionElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion ? "auto" : "smooth"
        })
      }
    }
  }

  const getColorClasses = (type: JourneyMilestone["type"]) => {
    switch (type) {
      case "project":
        return {
          dot: "bg-indigo-500 dark:bg-indigo-400",
          border: "border-indigo-500 dark:border-indigo-400",
          borderInactive: "border-indigo-500/60 dark:border-indigo-400/60",
          text: "text-indigo-400 dark:text-indigo-400",
          hover: "hover:border-indigo-500/50 dark:hover:border-indigo-400/50"
        }
      case "hackathon":
      case "award":
        return {
          dot: "bg-amber-500 dark:bg-amber-400",
          border: "border-amber-500 dark:border-amber-400",
          borderInactive: "border-amber-500/60 dark:border-amber-400/60",
          text: "text-amber-400 dark:text-amber-400",
          hover: "hover:border-amber-500/50 dark:hover:border-amber-400/50"
        }
      case "experience":
      case "teaching":
        return {
          dot: "bg-emerald-500 dark:bg-emerald-400",
          border: "border-emerald-500 dark:border-emerald-400",
          borderInactive: "border-emerald-500/60 dark:border-emerald-400/60",
          text: "text-emerald-400 dark:text-emerald-400",
          hover: "hover:border-emerald-500/50 dark:hover:border-emerald-400/50"
        }
    }
  }

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="w-full py-16 scroll-mt-24"
    >
      <div className="mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2">
          Journey
        </h2>
        <p className="text-sm text-black/60 dark:text-white/60">
          A chronological timeline of everything I've built and accomplished.
        </p>
      </div>

      {/* Desktop: Horizontal scrollable */}
      <div className="hidden md:block relative">

        <div
          ref={containerRef}
          className="overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none"
          }}
        >
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <div className="relative min-w-max">
            {/* Progress line (subtle) */}
            {!prefersReducedMotion && (
              <motion.div
                className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-indigo-500/40 to-indigo-400/20 -z-10"
                style={{ width: progressWidth }}
              />
            )}

            {/* Main timeline line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-black/10 dark:bg-white/10 -z-10" />

            {/* Timeline items */}
            <div className="relative flex gap-6">
              {milestones.map((milestone, index) => {
                const isActive = activeId === milestone.id
                const colors = getColorClasses(milestone.type)

                return (
                  <motion.a
                    key={milestone.id}
                    href={milestone.type === "project" && milestone.projectId ? `/projects/${milestone.projectId}/` : `#${milestone.sectionId}`}
                    onClick={(e) => handleClick(milestone, e)}
                    className={cn(
                      "group relative flex flex-col items-center gap-4 cursor-pointer flex-shrink-0",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-lg p-2 -m-2 transition-all"
                    )}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={
                      inView
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: 20, scale: 0.95 }
                    }
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.5,
                      delay: prefersReducedMotion ? 0 : index * 0.05
                    }}
                    whileHover={
                      prefersReducedMotion
                        ? {}
                        : { y: -1, transition: { duration: 0.2 } }
                    }
                  >
                    {/* Dot */}
                    <motion.div
                      className={cn(
                        "relative w-3 h-3 rounded-full border-2 transition-all duration-300",
                        isActive
                          ? `${colors.dot} ${colors.border} shadow-lg`
                          : `bg-transparent ${colors.borderInactive} group-hover:${colors.dot} group-hover:bg-opacity-30`
                      )}
                      animate={
                        isActive && !prefersReducedMotion
                          ? {
                              scale: [1, 1.2, 1]
                            }
                          : { scale: 1 }
                      }
                      transition={{
                        duration: 2,
                        repeat: isActive && !prefersReducedMotion ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    />

                    {/* Card - Fixed size for all */}
                    <motion.div
                      className={cn(
                        "relative rounded-xl border p-4 w-[200px] h-[140px] flex flex-col justify-start text-center transition-all duration-300 mt-2",
                        "bg-white/40 dark:bg-white/[0.05] backdrop-blur-sm",
                        isActive
                          ? `${colors.border} shadow-lg`
                          : "border-white/10 dark:border-white/10 group-hover:border-white/20 dark:group-hover:border-white/20"
                      )}
                      whileHover={
                        prefersReducedMotion
                          ? {}
                          : {
                              y: -2,
                              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",
                              transition: { duration: 0.2 }
                            }
                      }
                    >
                      {/* Subtitle or first 3 words of title */}
                      <p className={cn(
                        "text-[10px] font-semibold mb-2 uppercase tracking-widest",
                        isActive ? colors.text : "text-black/50 dark:text-white/50"
                      )}>
                        {(() => {
                          // If subtitle exists and is not empty, show it
                          if (milestone.subtitle && milestone.subtitle.trim().length > 0) {
                            return milestone.subtitle
                          }
                          // Otherwise, show first 3 words of title
                          if (milestone.title && milestone.title.trim().length > 0) {
                            return milestone.title.split(" ").slice(0, 3).join(" ")
                          }
                          // Fallback
                          return "Item"
                        })()}
                      </p>

                      {/* Title - hidden, only show subtitle/first 3 words */}
                      <h3 className="hidden">
                        {milestone.title}
                      </h3>

                      {/* Date range */}
                      {milestone.dateRange && (
                        <p className="text-[11px] font-medium text-black/60 dark:text-white/60 mt-auto pt-2 border-t border-black/5 dark:border-white/5">
                          {milestone.dateRange}
                        </p>
                      )}
                    </motion.div>
                  </motion.a>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Horizontal scrollable */}
      <div className="md:hidden relative">

        <div
          ref={containerRef}
          className="overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none"
          }}
        >
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <div className="relative flex gap-4 min-w-max">
            {/* Timeline line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-black/10 dark:bg-white/10" />

            {milestones.map((milestone, index) => {
              const isActive = activeId === milestone.id
              const colors = getColorClasses(milestone.type)

              return (
                <motion.a
                  key={milestone.id}
                  href={milestone.type === "project" && milestone.projectId ? `/projects/${milestone.projectId}/` : `#${milestone.sectionId}`}
                  onClick={(e) => handleClick(milestone, e)}
                  className={cn(
                    "group relative flex flex-col items-center gap-3 cursor-pointer flex-shrink-0",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-lg p-2 -m-2"
                  )}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={
                    inView
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 20, scale: 0.95 }
                  }
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.5,
                    delay: prefersReducedMotion ? 0 : index * 0.05
                  }}
                >
                  {/* Dot */}
                  <motion.div
                    className={cn(
                      "relative w-3 h-3 rounded-full border-2 transition-all duration-300 z-10",
                      isActive
                        ? `${colors.dot} ${colors.border} shadow-lg`
                        : `bg-transparent ${colors.borderInactive} group-hover:${colors.dot} group-hover:bg-opacity-30`
                    )}
                    animate={
                      isActive && !prefersReducedMotion
                        ? {
                            scale: [1, 1.2, 1]
                          }
                        : { scale: 1 }
                    }
                    transition={{
                      duration: 2,
                      repeat: isActive && !prefersReducedMotion ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Card - Fixed size for all */}
                  <div
                    className={cn(
                      "relative rounded-xl border p-4 w-[160px] h-[140px] flex flex-col justify-start text-center transition-all duration-300 mt-2",
                      "bg-white/40 dark:bg-white/[0.05] backdrop-blur-sm",
                      isActive
                        ? `${colors.border} shadow-lg`
                        : "border-white/10 dark:border-white/10 group-hover:border-white/20 dark:group-hover:border-white/20"
                    )}
                  >
                      {/* Subtitle or first 3 words of title */}
                      <p className={cn(
                        "text-[10px] font-semibold mb-2 uppercase tracking-widest",
                        isActive ? colors.text : "text-black/50 dark:text-white/50"
                      )}>
                        {(() => {
                          // If subtitle exists and is not empty, show it
                          if (milestone.subtitle && milestone.subtitle.trim().length > 0) {
                            return milestone.subtitle
                          }
                          // Otherwise, show first 3 words of title
                          if (milestone.title && milestone.title.trim().length > 0) {
                            return milestone.title.split(" ").slice(0, 3).join(" ")
                          }
                          // Fallback
                          return "Item"
                        })()}
                      </p>

                    {/* Title - hidden, only show subtitle/first 3 words */}
                    <h3 className="hidden">
                      {milestone.title}
                    </h3>

                    {/* Date range */}
                    {milestone.dateRange && (
                      <p className="text-[11px] font-medium text-black/60 dark:text-white/60 mt-auto pt-2 border-t border-black/5 dark:border-white/5">
                        {milestone.dateRange}
                      </p>
                    )}
                  </div>
                </motion.a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
