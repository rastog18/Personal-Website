/* Hero overlay background that fades on scroll */
"use client"

import * as React from "react"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"
import { cn } from "@/lib/utils"

interface HeroOverlayProps {
  children: React.ReactNode
  className?: string
}

export function HeroOverlay({ children, className }: HeroOverlayProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const [opacity, setOpacity] = React.useState(1)

  React.useEffect(() => {
    if (!ref.current) return

    if (prefersReducedMotion) {
      // For reduced motion, just check if in viewport
      const observer = new IntersectionObserver(
        ([entry]) => {
          setOpacity(entry.isIntersecting ? 1 : 0)
        },
        { threshold: 0.5 }
      )
      observer.observe(ref.current)
      return () => observer.disconnect()
    }

    // Smooth fade based on intersection ratio
    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio
        // Start fading when ratio drops below 0.8, complete at 0.2
        const fadeStart = 0.8
        const fadeEnd = 0.2
        if (ratio >= fadeStart) {
          setOpacity(1)
        } else if (ratio <= fadeEnd) {
          setOpacity(0)
        } else {
          // Linear interpolation
          const fadeRange = fadeStart - fadeEnd
          const fadeProgress = (ratio - fadeEnd) / fadeRange
          setOpacity(Math.max(0, Math.min(1, fadeProgress)))
        }
      },
      {
        threshold: Array.from({ length: 21 }, (_, i) => i / 20), // 21 steps for smooth fade
        rootMargin: "-10% 0px -10% 0px", // Start fading when 10% from viewport edges
      }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [prefersReducedMotion])

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Overlay background panel */}
      <div
        className="absolute inset-0 -z-10 rounded-2xl transition-opacity duration-700 ease-out"
        style={{
          opacity: prefersReducedMotion ? opacity : opacity,
          transition: prefersReducedMotion ? "opacity 0.01ms" : "opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Glass/gradient background */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/80 via-white/60 to-white/70 backdrop-blur-md dark:from-zinc-900/80 dark:via-zinc-900/60 dark:to-zinc-900/70" />
        
        {/* Subtle border */}
        <div className="absolute inset-0 rounded-2xl border border-black/5 dark:border-white/10" />
        
        {/* Noise texture */}
        <div
          className="absolute inset-0 rounded-2xl opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: "150px 150px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-0">{children}</div>
    </div>
  )
}
