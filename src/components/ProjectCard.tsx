import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { cn } from "@/lib/utils"

export function ProjectCard({
  id,
  title,
  description,
  tags,
  links
}: {
  id: string
  title: string
  description: string
  tags: string[]
  links: { github?: string; demo?: string }
}) {
  const showTags = tags.slice(0, 4)

  return (
    <article
      className={cn(
        "group h-full rounded-2xl border border-black/10 dark:border-white/10",
        "bg-white/70 dark:bg-white/5 backdrop-blur",
        "transition-transform will-change-transform",
        "hover:-translate-y-0.5 hover:shadow-lg dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]",
        "hover:border-black/20 dark:hover:border-white/20"
      )}
    >
      <div className="p-5 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-semibold tracking-tight">
              <Link
                href={`/projects/${id}/`}
                className="outline-none focus-visible:ring-0"
              >
                <span className="bg-gradient-to-b from-black/90 to-black/70 dark:from-white/95 dark:to-white/70 bg-clip-text text-transparent">
                  {title}
                </span>
              </Link>
            </h3>
            <p className="mt-2 text-sm text-black/65 dark:text-white/65 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {links.github ? (
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-black/10 dark:border-white/10 p-2
                           bg-white/60 dark:bg-white/5 hover:border-black/20 dark:hover:border-white/20 transition"
                aria-label="GitHub link"
              >
                <Github className="h-4 w-4" />
              </a>
            ) : null}
            {links.demo ? (
              <a
                href={links.demo}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-black/10 dark:border-white/10 p-2
                           bg-white/60 dark:bg-white/5 hover:border-black/20 dark:hover:border-white/20 transition"
                aria-label="Live demo link"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {showTags.map(t => (
            <span
              key={t}
              className="relative inline-flex items-center rounded-full px-2.5 py-1 text-xs
                         border border-black/10 dark:border-white/10 text-black/70 dark:text-white/70"
            >
              <span className="relative">
                {t}
                <span
                  className="pointer-events-none absolute -bottom-0.5 left-0 h-[1px] w-full scale-x-0 bg-[rgb(var(--accent))]
                             origin-left transition-transform duration-300 group-hover:scale-x-100"
                />
              </span>
            </span>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/10">
          <Link
            href={`/projects/${id}/`}
            className="underline-sweep inline-flex items-center gap-2 text-sm font-medium text-black/80 dark:text-white/80
                       hover:text-black dark:hover:text-white transition"
          >
            View details
            <span className="text-[rgb(var(--accent))]">→</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
