/* Hook to detect when an element enters the viewport using Intersection Observer */
"use client"

import { useEffect, useRef, useState, type RefObject } from "react"

interface UseInViewOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
}

export function useInView<T extends HTMLElement = HTMLElement>(
  options: UseInViewOptions = {}
): { ref: RefObject<T>; inView: boolean } {
  const { threshold = 0 } = options
  const [inView, setInView] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      {
        threshold,
        root: options.root,
        rootMargin: options.rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, options.root, options.rootMargin])

  return { ref, inView }
}

