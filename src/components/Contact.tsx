"use client"

import * as React from "react"
import { Copy, Mail, Send } from "lucide-react"
import { SocialLinks } from "@/components/SocialLinks"
import { cn } from "@/lib/utils"

export function Contact({
  email,
  github,
  linkedin
}: {
  email: string
  github: string
  linkedin: string
}) {
  const [copied, setCopied] = React.useState(false)
  const [name, setName] = React.useState("")
  const [from, setFrom] = React.useState("")
  const [msg, setMsg] = React.useState("")

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // Fallback
      const el = document.createElement("textarea")
      el.value = email
      document.body.appendChild(el)
      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    }
  }

  const mailto = React.useMemo(() => {
    const subject = encodeURIComponent(`Portfolio inquiry — ${name || "Hello"}`)
    const body = encodeURIComponent(
      `Name: ${name || "(not provided)"}\nEmail: ${from || "(not provided)"}\n\n${msg || ""}`
    )
    return `mailto:${email}?subject=${subject}&body=${body}`
  }, [email, name, from, msg])

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,0.9fr]">
      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-sm text-black/70 dark:text-white/70">
              <Mail className="h-4 w-4" />
              <span className="font-medium">Email</span>
            </div>
            <p className="mt-2 text-sm text-black/65 dark:text-white/65">{email}</p>
          </div>
          <button
            type="button"
            onClick={copyEmail}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition",
              "border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:border-black/20 dark:hover:border-white/20"
            )}
            aria-label="Copy email"
          >
            <Copy className="h-4 w-4" />
            {copied ? "Copied" : "Copy email"}
          </button>
        </div>

        <div className="mt-4">
          <SocialLinks github={github} linkedin={linkedin} />
        </div>
      </div>

      <form
        className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-5"
        onSubmit={(e) => {
          e.preventDefault()
          window.location.href = mailto
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="font-semibold">Send a quick note</p>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white
                       bg-[rgb(var(--accent))] hover:opacity-95 transition"
          >
            <Send className="h-4 w-4" />
            Email me
          </button>
        </div>

        <div className="mt-4 grid gap-3">
          <input
            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/10 px-3 py-2 text-sm"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/10 px-3 py-2 text-sm"
            placeholder="Your email (optional)"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <textarea
            className="w-full min-h-[120px] rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/10 px-3 py-2 text-sm"
            placeholder="Message"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <p className="text-xs text-black/55 dark:text-white/55">
            Uses <span className="font-medium">mailto</span> — no backend, no tracking.
          </p>
        </div>
      </form>
    </div>
  )
}
