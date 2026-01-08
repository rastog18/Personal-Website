"use client"

import * as React from "react"
import { ExternalLink, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

// Prevent hydration errors by only rendering embeds on client
const useIsClient = () => {
  const [isClient, setIsClient] = React.useState(false)
  React.useEffect(() => {
    setIsClient(true)
  }, [])
  return isClient
}

interface LinkedInEmbedsProps {
  postUrls: string[]
  maxDisplay?: number
  showViewAll?: boolean
  linkedinProfileUrl?: string
  className?: string
}

/**
 * Extracts the post ID from a LinkedIn post URL
 * LinkedIn URLs can be in various formats:
 * - https://www.linkedin.com/posts/username_activity-1234567890
 * - https://www.linkedin.com/feed/update/urn:li:activity:1234567890
 */
function extractPostId(url: string): string {
  try {
    // Extract the activity ID from the URL
    const match = url.match(/activity-(\d+)/)
    if (match) return match[1]
    
    // Try URN format
    const urnMatch = url.match(/activity:(\d+)/)
    if (urnMatch) return urnMatch[1]
    
    // Fallback: use the URL itself as identifier
    return url.split('/').pop() || url
  } catch {
    return url
  }
}

/**
 * LinkedIn Embeds Component
 * 
 * Renders LinkedIn posts using LinkedIn's official embed method.
 * Requires the LinkedIn embed script to be loaded in the layout.
 */
export function LinkedInEmbeds({
  postUrls,
  maxDisplay,
  showViewAll = false,
  linkedinProfileUrl,
  className
}: LinkedInEmbedsProps) {
  const isClient = useIsClient()
  const [loadedPosts, setLoadedPosts] = React.useState<Set<string>>(new Set())
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  // Limit posts if maxDisplay is specified
  const displayUrls = maxDisplay ? postUrls.slice(0, maxDisplay) : postUrls
  const hasMore = maxDisplay && postUrls.length > maxDisplay

  // Trigger LinkedIn embed processing after component mounts
  React.useEffect(() => {
    if (!isClient) return

    // Wait for script to load and then parse embeds
    const checkAndParse = () => {
      if (typeof window !== 'undefined' && (window as any).IN?.parse && containerRef.current) {
        (window as any).IN.parse(containerRef.current)
      }
    }

    // Check immediately (script might already be loaded)
    checkAndParse()

    // Also check after a delay in case script is still loading
    const timer = setTimeout(checkAndParse, 500)
    const timer2 = setTimeout(checkAndParse, 1500)

    // Watch for script load event
    const script = document.getElementById('linkedin-embed-script')
    if (script) {
      script.addEventListener('load', checkAndParse)
    }

    // Mark as loaded after a delay (LinkedIn script handles the actual embed)
    const loadTimer = setTimeout(() => {
      displayUrls.forEach(url => {
        const postId = extractPostId(url)
        setLoadedPosts(prev => new Set(prev).add(postId))
      })
    }, 2000)

    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
      clearTimeout(loadTimer)
      if (script) {
        script.removeEventListener('load', checkAndParse)
      }
    }
  }, [displayUrls, isClient])

  // Track which embeds have loaded
  const handleLoad = React.useCallback((postId: string) => {
    setLoadedPosts(prev => new Set(prev).add(postId))
  }, [])

  if (postUrls.length === 0) {
    return (
      <div className={cn("rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-6", className)}>
        <p className="text-sm text-black/60 dark:text-white/60">
          No LinkedIn posts configured yet.
        </p>
      </div>
    )
  }

  // Prevent hydration error by not rendering embeds on server
  if (!isClient) {
    return (
      <div className={cn("grid gap-4 sm:grid-cols-2", className)}>
        {displayUrls.map((url) => {
          const postId = extractPostId(url)
          return (
            <div
              key={postId}
              className="min-h-[200px] rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur flex items-center justify-center"
            >
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-6 w-6 animate-spin text-[rgb(var(--accent))]" />
                <p className="text-xs text-black/50 dark:text-white/50">Loading post...</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div 
        ref={containerRef}
        className="grid gap-4 sm:grid-cols-2"
      >
        {displayUrls.map((url, index) => {
          const postId = extractPostId(url)
          const hasLoaded = loadedPosts.has(postId)

          return (
            <div
              key={postId}
              className="relative min-h-[200px] rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur overflow-hidden"
            >
              {/* Loading skeleton */}
              {!hasLoaded && (
                <div className="absolute inset-0 flex items-center justify-center p-6 z-10 bg-white/70 dark:bg-white/5 rounded-2xl">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-6 w-6 animate-spin text-[rgb(var(--accent))]" />
                    <p className="text-xs text-black/50 dark:text-white/50">Loading post...</p>
                  </div>
                </div>
              )}

              {/* LinkedIn Embed */}
              <div className={cn("w-full", hasLoaded ? "opacity-100" : "opacity-0")}>
                <blockquote
                  className="linkedin-post-embed"
                  data-post-url={url}
                  data-height="auto"
                >
                  <a href={url} target="_blank" rel="noreferrer" className="text-transparent">
                    {url}
                  </a>
                </blockquote>
              </div>
            </div>
          )
        })}
      </div>

      {/* View all / See more actions */}
      {(hasMore || showViewAll) && (
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
          {hasMore && (
            <a
              href="/posts"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium
                         border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur
                         hover:border-black/20 dark:hover:border-white/20 transition"
            >
              See more posts
              <span className="text-[rgb(var(--accent))]">→</span>
            </a>
          )}
          
          {showViewAll && linkedinProfileUrl && (
            <a
              href={linkedinProfileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium
                         border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur
                         hover:border-black/20 dark:hover:border-white/20 transition"
            >
              View all on LinkedIn
              <ExternalLink className="h-4 w-4 text-[rgb(var(--accent))]" />
            </a>
          )}
        </div>
      )}
    </div>
  )
}

