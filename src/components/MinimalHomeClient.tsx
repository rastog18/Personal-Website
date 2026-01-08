"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { MinimalHeader } from "@/components/MinimalHeader"
import { MinimalHero } from "@/components/MinimalHero"
import { Section } from "@/components/Section"
import { SkillChips } from "@/components/SkillChips"
import { ProjectCard } from "@/components/ProjectCard"
import ExperienceTimeline from "@/components/ExperienceTimeline"
import { Contact } from "@/components/Contact"
import { collectSkills, skillCounts, type ProfileData } from "@/data/profile"
import { linkedInPostUrls } from "@/data/linkedinPosts"
import { LinkedInEmbeds } from "@/components/LinkedInEmbeds"
import { JourneyTimeline } from "@/components/JourneyTimeline"
import { buildJourneyMilestones } from "@/data/journey"

function matchesAllTags(itemTags: string[], active: string[]) {
  if (active.length === 0) return true
  const set = new Set(itemTags)
  return active.every(t => set.has(t))
}

export function MinimalHomeClient({ data }: { data: ProfileData }) {
  const reduce = useReducedMotion()
  const [activeTags, setActiveTags] = React.useState<string[]>([])
  const [showAllProjects, setShowAllProjects] = React.useState(false)

  const skills = React.useMemo(() => collectSkills(data), [data])
  const counts = React.useMemo(() => skillCounts(data), [data])

  const filteredProjects = React.useMemo(() => {
    return data.projects.filter(p => matchesAllTags(p.tags, activeTags))
  }, [data.projects, activeTags])

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

  // Extract name parts
  const nameParts = data.headline.split(" ")
  const firstName = nameParts[0] || data.name
  const lastName = nameParts.slice(1).join(" ") || ""

  return (
    <>
      <MinimalHeader name={data.headline} />
      
      <main className="relative">
        {/* Hero Section */}
        <section id="about">
          <MinimalHero
            name={firstName}
            surname={lastName}
            tagline="and I code solutions."
            description={data.about}
            email={data.email}
            github={data.socials.github}
            linkedin={data.socials.linkedin}
            profileImage={data.profileImage}
          />
        </section>

        {/* Content Sections */}
        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-16 space-y-20">
          {/* SKILLS */}
          <motion.section {...sectionMotion} id="skills">
            <Section
              title="Skills"
              subtitle="Click to filter projects. Multi-select works—stack skills to narrow down."
            >
              <SkillChips
                skills={skills}
                counts={counts}
                active={activeTags}
                onToggle={toggleTag}
                onClear={clearTags}
              />
            </Section>
          </motion.section>

          {/* PROJECTS */}
          <motion.section {...sectionMotion} id="projects">
            <Section
              title="Featured Projects"
              subtitle="A few things I've built recently. Each project includes a short, recruiter-friendly summary and deeper technical detail."
            >
              <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                {displayedProjects.map((p, i) => (
                  <motion.div
                    key={p.id}
                    id={`proj-${p.id}`}
                    className="scroll-mt-24"
                    initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: reduce ? 0 : 0.3, delay: i * 0.05 }}
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
              </div>

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
                    <span className="text-indigo-600 dark:text-indigo-400">→</span>
                  </button>
                </div>
              ) : null}
            </Section>
          </motion.section>

          {/* HACKATHONS */}
          <motion.section {...sectionMotion} id="hackathons">
            <Section
              title="Hackathons"
              subtitle="Compact, scannable highlights."
            >
              <div className="space-y-4">
                {data.hackathons.map((h) => (
                  <div key={h.id} id={`hack-${h.id}`} className="scroll-mt-24">
                    <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-sm p-5">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="text-base font-semibold text-black dark:text-white">
                            {h.projectName}
                          </h3>
                          <p className="text-sm text-black/60 dark:text-white/60 mt-0.5">
                            {h.eventName} • {h.role}
                          </p>
                        </div>
                        {h.award && (
                          <span className="text-xs font-medium text-amber-600 dark:text-amber-400 px-2 py-1 rounded-full bg-amber-50 dark:bg-amber-950/30">
                            {h.award}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-black/70 dark:text-white/70">{h.description}</p>
                      <p className="text-xs text-black/50 dark:text-white/50 mt-2">{h.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </motion.section>

          {/* EXPERIENCE */}
          <motion.section {...sectionMotion} id="experience">
            <Section
              title="Experience"
              subtitle="Short, impact-focused timeline."
            >
              <div className="space-y-0">
                {data.experience.map((exp) => (
                  <div key={exp.id} id={`exp-${exp.id}`} className="scroll-mt-24">
                    <ExperienceTimeline items={[exp]} />
                  </div>
                ))}
              </div>
            </Section>
          </motion.section>

          {/* LINKEDIN POSTS */}
          {linkedInPostUrls.length > 0 && (
            <motion.section {...sectionMotion} id="posts">
              <Section
                title="Posts"
                subtitle="Recent thoughts and updates. Click any post to view on LinkedIn."
              >
                <LinkedInEmbeds
                  postUrls={linkedInPostUrls}
                  maxDisplay={6}
                  showViewAll={true}
                  linkedinProfileUrl={data.socials.linkedin}
                />
              </Section>
            </motion.section>
          )}

          {/* CONTACT */}
          <motion.section {...sectionMotion} id="contact">
            <Section
              title="Contact"
              subtitle="If you're hiring or want to collaborate, send a quick note—happy to share more details."
            >
              <Contact email={data.email} github={data.socials.github} linkedin={data.socials.linkedin} />
            </Section>
          </motion.section>

          {/* JOURNEY TIMELINE */}
          <JourneyTimeline milestones={buildJourneyMilestones(data.projects, data.hackathons, data.experience)} />
        </div>
      </main>
    </>
  )
}

