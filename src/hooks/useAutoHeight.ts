/* Hook to automatically adjust container height when dependencies change */
"use client"

import { useEffect, useRef, type RefObject } from "react"

interface UseAutoHeightOptions {
  deps: unknown[]
  duration?: number
}

export function useAutoHeight(
  ref: RefObject<HTMLElement>,
  options: UseAutoHeightOptions
): void {
  const { deps, duration = 300 } = options
  const prefersReducedMotionRef = useRef(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    prefersReducedMotionRef.current = mediaQuery.matches

    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches
    }
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const prefersReducedMotion = prefersReducedMotionRef.current

    if (prefersReducedMotion) {
      // For reduced motion, just set to auto immediately
      element.style.height = "auto"
      element.style.transition = "none"
      return
    }

    // Get current height
    const currentHeight = element.offsetHeight
    
    // Reset to auto to get natural height
    element.style.height = "auto"
    element.style.transition = `height ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`
    
    // Force reflow
    void element.offsetHeight
    
    // Get the natural scroll height
    const naturalHeight = element.scrollHeight
    
    // Set the starting height explicitly
    element.style.height = `${currentHeight}px`
    
    // Force reflow again
    void element.offsetHeight
    
    // Transition to natural height
    element.style.height = `${naturalHeight}px`
    
    // Clean up after transition completes
    const handleTransitionEnd = () => {
      element.style.height = "auto"
      element.removeEventListener("transitionend", handleTransitionEnd)
    }
    
    element.addEventListener("transitionend", handleTransitionEnd, { once: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps.concat([duration]))
}

