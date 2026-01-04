import { Github, Linkedin, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

export function SocialLinks({
  github,
  linkedin,
  className
}: {
  github: string
  linkedin: string
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <a
        href={github}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-3 py-2 text-sm
                   bg-white/70 dark:bg-white/5 backdrop-blur hover:border-black/20 dark:hover:border-white/20 transition"
        aria-label="GitHub"
      >
        <Github className="h-4 w-4" />
        <span className="hidden sm:inline">GitHub</span>
        <ExternalLink className="h-3.5 w-3.5 opacity-60" />
      </a>
      <a
        href={linkedin}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-3 py-2 text-sm
                   bg-white/70 dark:bg-white/5 backdrop-blur hover:border-black/20 dark:hover:border-white/20 transition"
        aria-label="LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
        <span className="hidden sm:inline">LinkedIn</span>
        <ExternalLink className="h-3.5 w-3.5 opacity-60" />
      </a>
    </div>
  )
}
