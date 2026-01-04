/* CSS-based animated background - eye-catching but tasteful */
"use client"

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

// Configuration constants (tune easily)
const CONFIG = {
  intensity: 0.6, // 0-1: overall opacity/intensity
  speed: 1, // 1 = normal speed, 0.5 = slower, 2 = faster
  enableGrain: true, // subtle texture grain
}

export default function AnimatedBackground() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
    >
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-purple-50/20 to-pink-50/30 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-pink-950/40" />

      {/* Animated gradient blobs */}
      {!prefersReducedMotion && (
        <>
          <div
            className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full opacity-40 blur-3xl mix-blend-multiply dark:mix-blend-screen"
            style={{
              background: "radial-gradient(circle, rgba(99, 102, 241, 0.4), transparent 70%)",
              animation: `float-1 ${20 / CONFIG.speed}s ease-in-out infinite alternate`,
            }}
          />
          <div
            className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] rounded-full opacity-40 blur-3xl mix-blend-multiply dark:mix-blend-screen"
            style={{
              background: "radial-gradient(circle, rgba(168, 85, 247, 0.4), transparent 70%)",
              animation: `float-2 ${25 / CONFIG.speed}s ease-in-out infinite alternate`,
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl mix-blend-multiply dark:mix-blend-screen"
            style={{
              background: "radial-gradient(circle, rgba(236, 72, 153, 0.3), transparent 70%)",
              animation: `float-3 ${30 / CONFIG.speed}s ease-in-out infinite alternate`,
            }}
          />
        </>
      )}

      {/* Static gradients for reduced motion */}
      {prefersReducedMotion && (
        <>
          <div
            className="absolute top-0 left-0 w-1/2 h-1/2 opacity-30 blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(99, 102, 241, 0.4), transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-30 blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(168, 85, 247, 0.4), transparent 70%)",
            }}
          />
        </>
      )}

      {/* Subtle grain texture */}
      {CONFIG.enableGrain && (
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
      )}

      {/* Vignette overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-black/5 dark:from-black/10 dark:to-black/10" />
    </div>
  )
}

