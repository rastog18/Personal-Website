"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ArrowRight, FileText } from "lucide-react"

import { Section } from "@/components/Section"
import { ThemeToggle } from "@/components/ThemeToggle"
import { SkillChips } from "@/components/SkillChips"
import { ProjectCard } from "@/components/ProjectCard"
import { HackathonList } from "@/components/HackathonList"
import ExperienceTimeline from "@/components/ExperienceTimeline"
import { Contact } from "@/components/Contact"
import { SocialLinks } from "@/components/SocialLinks"
import { HeroOverlay } from "@/components/HeroOverlay"

import { collectSkills, skillCounts, type ProfileData } from "@/data/profile"

function matchesAllTags(itemTags: string[], active: string[]) {
  if (active.length === 0) return true
  const set = new Set(itemTags)
  return active.every(t => set.has(t))
}

export function HomeClient({ data }: { data: ProfileData }) {
  const reduce = useReducedMotion()
  const [activeTags, setActiveTags] = React.useState<string[]>([])
  const [showAllProjects, setShowAllProjects] = React.useState(false)

  const skills = React.useMemo(() => collectSkills(data), [data])
  const counts = React.useMemo(() => skillCounts(data), [data])

  const filteredProjects = React.useMemo(() => {
    return data.projects.filter(p => matchesAllTags(p.tags, activeTags))
  }, [data.projects, activeTags])

  const filteredHackathons = React.useMemo(() => {
    return data.hackathons.filter(h => matchesAllTags(h.tags, activeTags))
  }, [data.hackathons, activeTags])

  const displayedProjects = React.useMemo(() => {
    if (activeTags.length > 0) return filteredProjects
    if (showAllProjects) return data.projects
    return data.projects.slice(0, 4)
  }, [activeTags.length, filteredProjects, showAllProjects, data.projects])

  function toggleTag(tag: string) {
    setShowAllProjects(false)
    setActiveTags(prev => {
      const on = prev.includes(tag)
      const next = on ? prev.filter(t => t !== tag) : [...prev, tag]
      return next
    })

    // Optional polish: bring attention to Projects section
    const el = document.getElementById("projects")
    if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
  }

  function clearTags() {
    setActiveTags([])
  }

  const sectionMotion = {
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: reduce ? 0 : 0.5, ease: "easeOut" as const }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14">
      {/* HERO */}
      <motion.section {...sectionMotion} className="relative">
        <HeroOverlay className="p-6 sm:p-8 -mx-4 sm:-mx-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-black/60 dark:text-white/60">
                {data.name}
              </p>
              <h1 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight max-w-3xl">
                {data.headline}
              </h1>
              <p className="mt-4 text-sm sm:text-base text-black/65 dark:text-white/65 max-w-2xl leading-relaxed">
                {data.about}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="/resume.pdf"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white
                             bg-[rgb(var(--accent))] hover:opacity-95 transition"
                >
                  <FileText className="h-4 w-4" />
                  Resume
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium
                             border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur
                             hover:border-black/20 dark:hover:border-white/20 transition"
                >
                  Contact
                  <ArrowRight className="h-4 w-4 text-[rgb(var(--accent))]" />
                </a>

                <SocialLinks github={data.socials.github} linkedin={data.socials.linkedin} />
              </div>
            </div>

            <ThemeToggle className="shrink-0" />
          </div>
        </HeroOverlay>

        <div className="mt-10 border-t border-black/10 dark:border-white/10" />
      </motion.section>

      {/* SKILLS */}
      <div className="mt-10 sm:mt-12">
        <Section
          id="skills"
          title="Skills"
          subtitle="Click to filter projects and hackathons. Multi-select works—stack skills to narrow down."
        >
          <SkillChips
            skills={skills}
            counts={counts}
            active={activeTags}
            onToggle={toggleTag}
            onClear={clearTags}
          />
        </Section>
      </div>

      {/* PROJECTS */}
      <div className="mt-12">
        <Section
          id="projects"
          title="Featured Projects"
          subtitle="A few things I've built recently. Each project includes a short, recruiter-friendly summary and deeper technical detail."
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                transition={{ duration: reduce ? 0 : 0.25 }}
                className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-6"
              >
                <p className="font-semibold">No matches.</p>
                <p className="mt-1 text-sm text-black/65 dark:text-white/65">
                  Try removing a filter, or explore broader tags.
                </p>
                <button
                  type="button"
                  onClick={clearTags}
                  className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium
                             bg-[rgb(var(--accent))] text-white hover:opacity-95 transition"
                >
                  Clear filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                layout
                className="grid gap-4 sm:gap-5 sm:grid-cols-2"
                transition={{ duration: reduce ? 0 : 0.28 }}
              >
                {displayedProjects.map((p, i) => (
                  <motion.div 
                    key={p.id} 
                    layout 
                    transition={{ duration: reduce ? 0 : 0.28 }}
                    className="card-enter"
                    style={{ animationDelay: reduce ? '0ms' : `${i * 45}ms` }}
                  >
                    <ProjectCard
                      id={p.id}
                      title={p.title}
                      description={p.description}
                      tags={p.tags}
                      links={p.links}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {activeTags.length === 0 && data.projects.length > 4 ? (
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowAllProjects(v => !v)}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium
                           border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur
                           hover:border-black/20 dark:hover:border-white/20 transition"
              >
                {showAllProjects ? "Show less" : "Show more"}
                <span className="text-[rgb(var(--accent))]">→</span>
              </button>
            </div>
          ) : null}
        </Section>
      </div>

      {/* HACKATHONS */}
      <div className="mt-12">
        <Section
          id="hackathons"
          title="Hackathons"
          subtitle="Compact, scannable highlights. These share the same skill filters above."
        >
          {filteredHackathons.length === 0 ? (
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-5">
              <p className="text-sm text-black/65 dark:text-white/65">
                No hackathons match the current filters.
              </p>
              {activeTags.length > 0 ? (
                <button
                  type="button"
                  onClick={clearTags}
                  className="mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium
                             bg-[rgb(var(--accent))] text-white hover:opacity-95 transition"
                >
                  Clear filters
                </button>
              ) : null}
            </div>
          ) : (
            <HackathonList items={filteredHackathons} />
          )}
        </Section>
      </div>

      {/* EXPERIENCE */}
      <div className="mt-12">
        <Section
          id="experience"
          title="Experience"
          subtitle="Short, impact-focused timeline."
        >
          <ExperienceTimeline items={data.experience} />
        </Section>
      </div>

      {/* CONTACT */}
      <div className="mt-12">
        <Section
          id="contact"
          title="Contact"
          subtitle="If you're hiring or want to collaborate, send a quick note—happy to share more details."
        >
          <Contact email={data.email} github={data.socials.github} linkedin={data.socials.linkedin} />
        </Section>
      </div>

      {/* Tiny helper link */}
      <div className="mt-10 text-xs text-black/55 dark:text-white/55">
        <Link href="#skills" className="hover:text-black dark:hover:text-white transition">
          Back to skills ↑
        </Link>
      </div>
    </main>
  )
}
