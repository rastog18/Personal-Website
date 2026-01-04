import { notFound } from "next/navigation"
import Link from "next/link"
import { ExternalLink, Github, ArrowLeft } from "lucide-react"
import { profile } from "@/data/profile"

export function generateStaticParams() {
  return profile.projects.map(p => ({ id: p.id }))
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = profile.projects.find(p => p.id === params.id)
  if (!project) return notFound()

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <header className="mt-6">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          {project.title}
        </h1>
        <p className="mt-3 text-base text-black/65 dark:text-white/65">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {project.tags.map(t => (
            <span
              key={t}
              className="inline-flex items-center rounded-full px-2.5 py-1 text-xs
                         border border-black/10 dark:border-white/10 text-black/70 dark:text-white/70
                         bg-white/70 dark:bg-white/5 backdrop-blur"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2">
          {project.links.github ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium
                         border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur
                         hover:border-black/20 dark:hover:border-white/20 transition"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          ) : null}
          {project.links.demo ? (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white
                         bg-[rgb(var(--accent))] hover:opacity-95 transition"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          ) : null}
        </div>
      </header>

      <section className="mt-10 space-y-8">
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-6">
          <h2 className="text-lg font-semibold">Problem</h2>
          <p className="mt-2 text-sm text-black/65 dark:text-white/65 leading-relaxed">
            {project.problem}
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-6">
          <h2 className="text-lg font-semibold">Solution</h2>
          <p className="mt-2 text-sm text-black/65 dark:text-white/65 leading-relaxed">
            {project.solution}
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-6">
          <h2 className="text-lg font-semibold">Tech</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tech.map(t => (
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

        {project.highlights?.length ? (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-6">
            <h2 className="text-lg font-semibold">Impact</h2>
            <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-black/65 dark:text-white/65">
              {project.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </main>
  )
}
