/* Data models and content for profile information */

export type SocialKey = "github" | "linkedin"

export type Socials = Record<SocialKey, string>

export type LinkSet = {
  github?: string
  demo?: string
}

export type Project = {
  id: string
  title: string
  description: string // 1-line punchy
  tags: string[]
  links: LinkSet
  problem: string
  solution: string
  tech: string[]
  highlights?: string[] // metrics/impact bullets
}

export type Hackathon = {
  id: string
  eventName: string
  projectName: string
  date: string // e.g. "Oct 2025"
  role: string
  description: string // 1-line what it did
  award?: string
  tags: string[]
  links: LinkSet
}

export type ExperienceItem = {
  id: string
  role: string
  org: string
  dates: string
  bullets: string[]
}

export type ProfileData = {
  name: string
  headline: string
  about: string
  email: string
  socials: Socials
  projects: Project[]
  hackathons: Hackathon[]
  experience: ExperienceItem[]
}

export const profile: ProfileData = {
  name: "Shivam Rastogi",
  headline:
    "CS student building fast, real-time products — from web apps to computer vision — with a bias for shipping.",
  about:
    "I like turning messy problems into crisp interfaces and reliable systems. Recently I've been focused on performance, accessibility, and building end-to-end projects that feel polished enough to ship.",
  email: "rastog18@purdue.edu",
  socials: {
    github: "https://github.com/rastog18",
    linkedin: "https://www.linkedin.com/in/rastog18"
  },

  projects: [
    {
      id: "signbridge",
      title: "SignBridge",
      description: "Real-time ASL → speech with low-latency vision + transformer inference.",
      tags: ["Computer Vision", "Real-time", "TypeScript", "Python", "MediaPipe", "Transformers", "Auth0", "BERT", "CNN", "TensorFlow"],
      links: {
        github: "https://github.com/rastog18/signbridge"
      },
      problem:
        "Translating sign language quickly and accurately is hard because vision pipelines are noisy and models are expensive to run in real time.",
      solution:
        "Built a streamlined landmark pipeline with MediaPipe and optimized inference for responsive ASL-to-speech. Added a clean UI and playback flow that feels instantaneous.",
      tech: ["MediaPipe", "Transformer", "Auth0", "REST APIs", "BERT", "CNN", "TensorFlow/PyTorch", "TypeScript", "Python"],
      highlights: [
        "98.5% accuracy on a 249-word ASL vocabulary",
        "Reduced misclassification errors by 30% through buffer optimization",
        "40% reduction in video processing latency",
        "Best Use of Auth0 award at BoilerMake"
      ]
    },
    {
      id: "boilerhush",
      title: "BoilerHush",
      description: "Real-time study spot recommender using live Google Maps data and distance calculations.",
      tags: ["Flask", "AJAX", "Web Scraping", "Google Maps API", "JavaScript", "Bootstrap"],
      links: {
        github: "https://github.com/rastog18/boilerhush"
      },
      problem:
        "Students waste time searching for available study spots, especially during peak hours when popular locations are crowded.",
      solution:
        "Built a location-based web app that scrapes live Google Maps data and calculates walking times to recommend the best available study spots in real-time.",
      tech: ["Flask", "AJAX", "Jinja", "Web Scraping", "DistanceMatrix API", "Bootstrap", "Google Maps API"],
      highlights: [
        "35% improvement in location accuracy",
        "50% reduction in user wait time",
        "100-200% performance improvement through async endpoints"
      ]
    },
    {
      id: "etherpoly",
      title: "EtherPoly",
      description: "NFT Monopoly-style housing game with ERC721 smart contracts on Sepolia testnet.",
      tags: ["Solidity", "ERC721", "Web3", "JavaScript", "NFT"],
      links: {
        github: "https://github.com/rastog18/etherpoly"
      },
      problem:
        "Traditional board games lack ownership and permanence—assets exist only within the game session.",
      solution:
        "Built a decentralized Monopoly-style game where 16 NFT-based residence halls can be minted and traded using ERC721 smart contracts, giving players true ownership.",
      tech: ["Solidity", "ERC721", "JavaScript", "HTML", "CSS", "Sepolia", "Metamask"],
      highlights: [
        "Deployed on Sepolia testnet with full NFT trading functionality",
        "Integrated Metamask for wallet connectivity",
        "75+ student users during testing"
      ]
    },
    {
      id: "shell",
      title: "UNIX Shell",
      description: "Full-featured UNIX-style shell supporting 15+ core features including piping, redirection, and job control.",
      tags: ["C", "Unix", "Systems Programming", "Process Control"],
      links: {
        github: "https://github.com/rastog18/shell"
      },
      problem:
        "Understanding low-level process management and system calls requires hands-on experience with operating system internals.",
      solution:
        "Engineered a complete UNIX-style shell with command parsing, piping, I/O redirection, job control, and background execution using fork(), execvp(), and waitpid().",
      tech: ["C", "Unix System Calls", "Forking", "Pipes", "Signals", "Process Control", "Git", "Bash"],
      highlights: [
        "15+ core features including custom built-in commands",
        "30% reduction in system call overhead",
        "Stress-tested with 50+ concurrent child processes",
        "Zero zombie or orphan processes through proper signal handling"
      ]
    },
    {
      id: "cryptobaso",
      title: "CryptoBaso",
      description: "DEX platform with gasless transactions using SKALE's zero-cost infrastructure.",
      tags: ["Solidity", "Web3", "DeFi", "SKALE", "TypeScript"],
      links: {
        github: "https://github.com/rastog18/cryptobaso"
      },
      problem:
        "High gas fees and front-running attacks make DEX trading expensive and unfair for users.",
      solution:
        "Developed a decentralized exchange platform that splits swap orders across multiple transactions, preventing front-running and eliminating gas fees using SKALE's zero-cost infrastructure.",
      tech: ["SKALE Network", "React", "Solidity", "DeFi", "JavaScript", "TypeScript", "Ether.js", "Web3.js"],
      highlights: [
        "$1000 award at ETHGlobal",
        "100% elimination of gas fees",
        "Smart contracts prevent front-running attacks"
      ]
    }
  ],

  hackathons: [
    {
      id: "boilermake-signbridge",
      eventName: "BoilerMake",
      projectName: "SignBridge",
      date: "Oct 2024",
      role: "Lead (Vision pipeline + integration)",
      description: "ASL recognition with real-time speech output and a clean demo flow.",
      award: "Best Use of Auth0",
      tags: ["Computer Vision", "Real-time", "TypeScript", "MediaPipe", "Transformers", "Auth0"],
      links: {
        github: "https://github.com/rastog18/signbridge"
      }
    },
    {
      id: "ethglobal-cryptobaso",
      eventName: "ETHGlobal",
      projectName: "CryptoBaso",
      date: "Oct 2024",
      role: "Smart contract + frontend",
      description: "DEX prototype with clean swaps UI and gasless transactions using SKALE.",
      award: "$1000 Award",
      tags: ["Solidity", "Web3", "DeFi", "SKALE", "Next.js", "Security", "TypeScript"],
      links: {
        github: "https://github.com/rastog18/cryptobaso"
      }
    }
  ],

  experience: [
    {
      id: "signbridge-engineer",
      role: "Software Engineer",
      org: "SignBridge",
      dates: "July 2025 – Present",
      bullets: [
        "Pioneered an automated ASL-to-speech translation system by leveraging a Transformer-based neural network and MediaPipe for real-time gesture recognition, culminating in a 98.5% accuracy rate on a 249-word ASL vocabulary",
        "Constructed a robust computer vision model using a Convolutional Neural Network to process ASL gestures into text, applying buffer optimization that reduced misclassification errors by over 30%",
        "Integrated Auth0 authentication and deployed a lip-sync API to synthesize synchronized video output with personalized voice generation, reducing video processing latency by 40%",
        "Garnered the 'Best Use of Auth0' award at BoilerMake, highlighting innovative approach to user authentication and facial recognition"
      ]
    },
    {
      id: "xlbyte-intern",
      role: "Software Development Intern",
      org: "XLByte",
      dates: "June 2024 – August 2024",
      bullets: [
        "Oversaw the engineering and deployment of a scalable MVC framework, using MongoDB as a backend and LINQ for data manipulation to achieve a 25% reduction in code complexity",
        "Developed a full-stack College Directory platform, integrating grading systems to serve 40,000+ students",
        "Boosted application performance by 40% by optimizing RESTful API endpoints and implementing dynamic AJAX calls"
      ]
    },
    {
      id: "viplc-mobile",
      role: "Mobile App Developer",
      org: "Virtually Integrated Projects Learning Community",
      dates: "Jan 2024 – May 2024",
      bullets: [
        "Built a resistor-analysis mobile app used by over 10,000+ engineering students and individuals with color blindness, offering real-time resistance calculations using camera input",
        "Applied Otsu thresholding and image processing to boost band segmentation by 35% under inconsistent lighting",
        "Achieved 93%+ classification accuracy by applying KNN and logistic regression for color prediction",
        "Improved usability with image overlays and cut backend response time by 40% using optimized server architecture"
      ]
    },
    {
      id: "hackthefuture-lead",
      role: "Software Engineering Team Lead",
      org: "Hack the Future",
      dates: "Aug 2024 – Present",
      bullets: [
        "Spearheaded a Scrum team of 10 developers in deployment of a full-stack MERN-stack inventory management system, leveraging Agile methodologies and Test-Driven Development, resulting in a 30% reduction in development time",
        "Engineered a predictive resource allocation model using linear regression to analyze historical inventory data, which enabled the organization to anticipate future needs and optimize resource allocation by 30%",
        "Implemented inventory and purchase CRUD with collapsible rows and real-time edits; standardized UI with Material-UI and visualized metrics via Chart.js, boosting efficiency by 25%"
      ]
    },
    {
      id: "blockchain-lecturer",
      role: "Course Lecturer",
      org: "Block Chain",
      dates: "Aug 2024 – Present",
      bullets: [
        "Instructed a semester-long blockchain development course for 200+ students, combining Ethereum foundations with hands-on smart contract programming using Solidity, Hardhat, Remix, Foundry, and Metamask",
        "Created weekly modules with live demos, labs, and team-based projects including a Metamask-based attendance system and a token vending machine, emphasizing security, gas efficiency, and real-world deployment",
        "Guided students in Git-based workflows, smart contract testing, and final capstone projects, culminating in fully deployed dApps showcasing both technical depth and collaborative development"
      ]
    }
  ]
}

/** Collect unique tags from Projects + Hackathons */
export function collectSkills(data: ProfileData) {
  const set = new Set<string>()
  for (const p of data.projects) p.tags.forEach(t => set.add(t))
  for (const h of data.hackathons) h.tags.forEach(t => set.add(t))
  return Array.from(set).sort((a, b) => a.localeCompare(b))
}

/** Helpful counts for UI */
export function skillCounts(data: ProfileData) {
  const counts = new Map<string, number>()
  for (const p of data.projects) {
    p.tags.forEach(t => counts.set(t, (counts.get(t) || 0) + 1))
  }
  for (const h of data.hackathons) {
    h.tags.forEach(t => counts.set(t, (counts.get(t) || 0) + 1))
  }
  return counts
}
