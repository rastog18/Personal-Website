"use client"

import * as React from "react"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

/**
 * Custom Cursor Glow Component
 * 
 * Creates a smooth, trailing glow effect that follows the cursor.
 * Uses linear interpolation (lerp) for buttery smooth animation.
 */
export function CursorGlow() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 })
  const [glowPos, setGlowPos] = React.useState({ x: 0, y: 0 })
  const animationFrameRef = React.useRef<number | null>(null)
  const glowPosRef = React.useRef({ x: 0, y: 0 })

  // Track mouse position
  React.useEffect(() => {
    if (prefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [prefersReducedMotion])

  // Smooth animation using requestAnimationFrame and lerp
  React.useEffect(() => {
    if (prefersReducedMotion) {
      // For reduced motion, just hide the glow
      return
    }

    const animate = () => {
      // Linear interpolation (lerp) with factor 0.1
      // Formula: newPos = oldPos + (targetPos - oldPos) * 0.1
      const lerpFactor = 0.1
      
      glowPosRef.current.x += (mousePos.x - glowPosRef.current.x) * lerpFactor
      glowPosRef.current.y += (mousePos.y - glowPosRef.current.y) * lerpFactor

      setGlowPos({
        x: glowPosRef.current.x,
        y: glowPosRef.current.y,
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Start continuous animation loop
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [mousePos, prefersReducedMotion])

  // Don't render if reduced motion is preferred
  if (prefersReducedMotion) {
    return null
  }

  // Blob size: 384px = 96 units in Tailwind (96 * 4 = 384)
  const blobSize = 384
  const offset = blobSize / 2 // -192px offset to center on cursor

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    >
      <div
        className="absolute h-96 w-96 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 opacity-20 blur-3xl transition-none"
        style={{
          left: `${glowPos.x - offset}px`,
          top: `${glowPos.y - offset}px`,
          transform: "translate(0, 0)", // Prevent any transform-based positioning
        }}
      />
    </div>
  )
}

