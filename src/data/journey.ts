import type { Project, Hackathon, ExperienceItem } from "./profile"

export type JourneyMilestone = {
  id: string
  title: string
  dateRange: string
  type: "project" | "hackathon" | "experience" | "award" | "teaching"
  sectionId: string
  orderIndex: number // For chronological sorting
  subtitle?: string
  projectId?: string // For project navigation
}

// Parse date string to a sortable number (year * 100 + month)
function parseDate(dateStr: string): number {
  const months: Record<string, number> = {
    jan: 1, january: 1, feb: 2, february: 2, mar: 3, march: 3,
    apr: 4, april: 4, may: 5, jun: 6, june: 6,
    jul: 7, july: 7, aug: 8, august: 8, sep: 9, september: 9,
    oct: 10, october: 10, nov: 11, november: 11, dec: 12, december: 12
  }

  // Extract first date from range (e.g., "July 2025 – Present" -> "July 2025")
  const firstPart = dateStr.split("–")[0].trim().toLowerCase()
  const parts = firstPart.split(" ")
  
  if (parts.length >= 2) {
    const month = months[parts[0]]
    const year = parseInt(parts[1])
    if (month && year) {
      return year * 100 + month
    }
  }
  
  // Fallback: try to extract year only
  const yearMatch = dateStr.match(/\d{4}/)
  if (yearMatch) {
    return parseInt(yearMatch[0]) * 100
  }
  
  return 0
}

export function buildJourneyMilestones(
  projects: Project[],
  hackathons: Hackathon[],
  experience: ExperienceItem[]
): JourneyMilestone[] {
  const milestones: JourneyMilestone[] = []

  // Add experience items
  experience.forEach((exp) => {
    milestones.push({
      id: `exp-${exp.id}`,
      title: `${exp.role} at ${exp.org}`,
      dateRange: exp.dates,
      type: "experience",
      sectionId: `exp-${exp.id}`,
      orderIndex: parseDate(exp.dates)
      // No subtitle - will show first 3 words of title
    })
  })

  // Add hackathons (with awards if applicable)
  hackathons.forEach((hack) => {
    const title = hack.award 
      ? `${hack.projectName} – ${hack.award}`
      : hack.projectName
    
    milestones.push({
      id: `hack-${hack.id}`,
      title,
      dateRange: hack.date,
      type: hack.award ? "award" : "hackathon",
      sectionId: `hack-${hack.id}`,
      orderIndex: parseDate(hack.date)
      // No subtitle - will show first 3 words of title
    })
  })

  // Add projects (they don't have dates, so we'll add them at the end)
  projects.forEach((proj) => {
    milestones.push({
      id: `proj-${proj.id}`,
      title: proj.title,
      dateRange: "", // Projects don't have dates
      type: "project",
      sectionId: `proj-${proj.id}`,
      orderIndex: 0, // Will be sorted to end
      projectId: proj.id // For navigation to project page
      // No subtitle - will show first 3 words of title
    })
  })

  // Sort chronologically (oldest first)
  return milestones.sort((a, b) => {
    // Items without dates (orderIndex 0) go to the end
    if (a.orderIndex === 0 && b.orderIndex === 0) return 0
    if (a.orderIndex === 0) return 1
    if (b.orderIndex === 0) return -1
    return a.orderIndex - b.orderIndex
  })
}

