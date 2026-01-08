"use client"

import * as React from "react"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

export function TechCursor() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = React.useState(true)
  const [isHovering, setIsHovering] = React.useState(false)

  React.useEffect(() => {
    if (prefersReducedMotion) return

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Check if hovering over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.tagName === "A" || 
                           target.tagName === "BUTTON" || 
                           target.closest("a") !== null ||
                           target.closest("button") !== null ||
                           target.style.cursor === "pointer"
      setIsHovering(isInteractive)
    }

    window.addEventListener("mousemove", updateCursor)
    window.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", updateCursor)
      window.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <>
      {/* Custom cursor - terminal/code style */}
      <div
        className="fixed pointer-events-none z-[9999] transition-opacity duration-200 will-change-transform"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isVisible ? 1 : 0,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="relative">
          {/* Terminal cursor - blinking block */}
          <div 
            className={`w-2 h-4 border transition-all duration-200 ${
              isHovering 
                ? "border-amber-400 bg-amber-400/30" 
                : "border-indigo-500 dark:border-indigo-400 bg-indigo-500/20 dark:bg-indigo-400/20"
            }`}
          >
            {/* Blinking effect */}
            <div 
              className={`absolute inset-0 transition-opacity ${
                isHovering ? "bg-amber-400" : "bg-indigo-500 dark:bg-indigo-400"
              }`}
              style={{ 
                animation: "cursor-blink 1s infinite",
                animationTimingFunction: "steps(2, end)"
              }} 
            />
          </div>
        </div>
      </div>

      {/* Add cursor blink animation */}
      <style jsx global>{`
        @keyframes cursor-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        /* Hide default cursor only on desktop, keep it on mobile */
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  )
}

