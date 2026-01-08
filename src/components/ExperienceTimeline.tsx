"use client"

import * as React from "react"
import type { ExperienceItem } from "../data/profile"
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion"
import { motion, AnimatePresence } from "framer-motion"

function TimelineItem({ item, index }: { item: ExperienceItem; index: number }) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [hasAnimated, setHasAnimated] = React.useState(false)
  const itemRef = React.useRef<HTMLDivElement>(null)

  // Better intersection observer - triggers earlier and smoother
  React.useEffect(() => {
    if (hasAnimated || prefersReducedMotion) {
      setHasAnimated(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
          }
        })
      },
      {
        threshold: 0.1, // Trigger at 10% visibility
        rootMargin: "150px" // Start animating 150px before entering viewport
      }
    )

    if (itemRef.current) {
      observer.observe(itemRef.current)
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current)
      }
    }
  }, [hasAnimated, prefersReducedMotion])

  const inView = hasAnimated || prefersReducedMotion

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const nodeVariants = {
    hidden: { 
      scale: 0,
      opacity: 0
    },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.15 + 0.2,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  }

  const lineVariants = {
    hidden: { 
      scaleY: 0,
      transformOrigin: "top"
    },
    visible: { 
      scaleY: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        delay: prefersReducedMotion ? 0 : index * 0.15 + 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  return (
    <motion.div
      ref={itemRef}
      className="relative pl-10 pb-8 last:pb-0"
      variants={itemVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {/* Animated Rail Line */}
      <motion.div
        className="absolute left-[14px] top-0 h-full w-0.5 bg-gradient-to-b from-indigo-500/30 via-indigo-500/50 to-transparent dark:from-indigo-400/30 dark:via-indigo-400/50"
        variants={lineVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      />

      {/* Animated Node */}
      <motion.div
        className="absolute left-[7px] top-2 z-10"
        variants={nodeVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="relative">
          {/* Outer glow ring */}
          {!prefersReducedMotion && inView && (
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(99, 102, 241, 0.4)",
                  "0 0 0 8px rgba(99, 102, 241, 0)",
                  "0 0 0 0 rgba(99, 102, 241, 0)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          )}
          
          {/* Node border */}
          <div className="h-4 w-4 rounded-full border-2 border-indigo-600 dark:border-indigo-400 bg-white dark:bg-slate-950 shadow-lg relative z-10" />
          
          {/* Inner fill */}
          <motion.div
            className="absolute inset-[3px] rounded-full bg-indigo-600 dark:bg-indigo-400"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.3,
              delay: prefersReducedMotion ? 0 : index * 0.15 + 0.4,
              type: "spring",
              stiffness: 300
            }}
          />
      </div>
      </motion.div>

      {/* Animated Card */}
      <motion.div
        data-expandable
        data-item-id={item.id}
        className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer overflow-hidden"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.6,
          delay: prefersReducedMotion ? 0 : index * 0.15 + 0.2,
          ease: [0.22, 1, 0.36, 1]
        }}
        whileHover={prefersReducedMotion ? {} : { 
          scale: 1.01,
          transition: { duration: 0.2 }
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
            <div className="flex-1">
              <h3 className="text-base font-semibold tracking-tight text-black dark:text-white">
                {item.role}
              </h3>
              <p className="text-sm text-black/60 dark:text-white/60 mt-0.5">
                {item.org}
              </p>
          </div>
            <div className="flex items-center gap-2">
              <motion.p
                className="text-xs font-medium text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/30"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : index * 0.15 + 0.5
                }}
              >
                {item.dates}
              </motion.p>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-indigo-600 dark:text-indigo-400"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </div>
        </div>

          {/* Always visible bullets (first 2) */}
          <ul className="space-y-2 mt-4">
          {item.bullets.slice(0, 2).map((b, i) => (
              <motion.li
                key={i}
                className="text-sm text-black/70 dark:text-white/70 leading-relaxed pl-5 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-indigo-600/40 dark:before:bg-indigo-400/40"
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : index * 0.15 + 0.4 + i * 0.1,
                  duration: 0.4
                }}
              >
                {b}
              </motion.li>
            ))}
          </ul>

          {/* Expandable content */}
          <AnimatePresence>
            {isExpanded && item.bullets.length > 2 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <ul className="space-y-2 mt-4 pt-4 border-t border-black/5 dark:border-white/10">
                  {item.bullets.slice(2).map((b, i) => (
                    <motion.li
                      key={i + 2}
                      className="text-sm text-black/70 dark:text-white/70 leading-relaxed pl-5 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-indigo-600/40 dark:before:bg-indigo-400/40"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{
                        delay: i * 0.05,
                        duration: 0.3
                      }}
                    >
                      {b}
                    </motion.li>
          ))}
        </ul>
              </motion.div>
            )}
          </AnimatePresence>
      </div>
      </motion.div>
    </motion.div>
  )
}

export default function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  return (
    <div className="space-y-0" aria-label="Experience timeline">
      {items.map((x, index) => (
        <TimelineItem key={x.id} item={x} index={0} />
      ))}
    </div>
  )
}
