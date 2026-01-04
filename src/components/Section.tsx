"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useInView } from "@/hooks/useInView"

export function Section({
  id,
  title,
  subtitle,
  children,
  className
}: {
  id?: string
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.1 })

  return (
    <section 
      ref={ref}
      id={id} 
      className={cn("scroll-mt-24 section-reveal", className)}
      data-inview={inView ? "true" : "false"}
    >
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">{title}</h2>
        {subtitle ? (
          <p className="mt-2 text-sm sm:text-base text-black/60 dark:text-white/60 max-w-2xl">
            {subtitle}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  )
}
