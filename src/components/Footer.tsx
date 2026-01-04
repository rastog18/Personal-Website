import { SocialLinks } from "@/components/SocialLinks"

export function Footer({
  github,
  linkedin
}: {
  github: string
  linkedin: string
}) {
  return (
    <footer className="mt-16 border-t border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm text-black/60 dark:text-white/60">
          © {new Date().getFullYear()} • Built with Next.js + Tailwind
        </p>
        <SocialLinks github={github} linkedin={linkedin} />
      </div>
    </footer>
  )
}
