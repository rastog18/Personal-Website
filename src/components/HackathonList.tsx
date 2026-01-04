import { ExternalLink, Github, Trophy } from "lucide-react"

export function HackathonList({
  items
}: {
  items: Array<{
    id: string
    eventName: string
    projectName: string
    date: string
    role: string
    description: string
    award?: string
    tags: string[]
    links: { github?: string; demo?: string }
  }>
}) {
  return (
    <div className="space-y-3">
      {items.map((h, i) => (
        <article
          key={h.id}
          className="card-enter rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-4"
          style={{ animationDelay: `${i * 35}ms` }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-semibold">{h.eventName}</span>
                <span className="text-black/40 dark:text-white/40">•</span>
                <span className="text-sm text-black/70 dark:text-white/70">{h.date}</span>
              </div>
              <div className="mt-1 text-sm">
                <span className="font-medium">{h.projectName}</span>
                <span className="text-black/40 dark:text-white/40"> — </span>
                <span className="text-black/65 dark:text-white/65">{h.role}</span>
              </div>
              <p className="mt-2 text-sm text-black/65 dark:text-white/65">{h.description}</p>

              {h.award ? (
                <div className="mt-2 inline-flex items-center gap-2 text-xs rounded-full px-2.5 py-1
                                border border-black/10 dark:border-white/10 bg-[rgba(var(--accent),0.12)]">
                  <Trophy className="h-3.5 w-3.5" />
                  <span className="font-medium">{h.award}</span>
                </div>
              ) : null}

              <div className="mt-3 flex flex-wrap gap-2">
                {h.tags.slice(0, 6).map(t => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full px-2.5 py-1 text-xs
                               border border-black/10 dark:border-white/10 text-black/70 dark:text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {h.links.github ? (
                <a
                  href={h.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-black/10 dark:border-white/10 p-2
                             bg-white/60 dark:bg-white/5 hover:border-black/20 dark:hover:border-white/20 transition"
                  aria-label="Hackathon GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              ) : null}
              {h.links.demo ? (
                <a
                  href={h.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-black/10 dark:border-white/10 p-2
                             bg-white/60 dark:bg-white/5 hover:border-black/20 dark:hover:border-white/20 transition"
                  aria-label="Hackathon demo"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
