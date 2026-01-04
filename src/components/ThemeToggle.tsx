"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, systemTheme } = useTheme()
  const current = theme === "system" ? systemTheme : theme

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10",
        "bg-white/70 dark:bg-white/5 backdrop-blur px-3 py-2 text-sm",
        "hover:border-black/20 dark:hover:border-white/20 transition",
        className
      )}
      aria-label="Toggle theme"
      onClick={() => setTheme(current === "dark" ? "light" : "dark")}
    >
      {current === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="hidden sm:inline">{current === "dark" ? "Light" : "Dark"}</span>
    </button>
  )
}
