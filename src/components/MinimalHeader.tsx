"use client"

import * as React from "react"
import Link from "next/link"
import { FileText, Menu, X } from "lucide-react"

interface MinimalHeaderProps {
  name: string
  resumeUrl?: string
}

export function MinimalHeader({ name, resumeUrl = "/resume.pdf" }: MinimalHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  
  // Extract initials from name
  const initials = name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Work" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-sm border-b border-black/5 dark:border-white/5" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5 flex items-center justify-between">
        {/* Logo - Initials with accent */}
        <Link 
          href="/" 
          className="group relative text-2xl font-serif text-black dark:text-white transition-all duration-300 hover:scale-105"
        >
          <span className="relative z-10">{initials}</span>
          <span className="absolute inset-0 bg-indigo-600/10 dark:bg-indigo-400/10 rounded-md blur-sm group-hover:bg-indigo-600/20 dark:group-hover:bg-indigo-400/20 transition-all duration-300" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative px-4 py-2 text-sm text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors group"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute inset-0 bg-indigo-600/0 dark:bg-indigo-400/0 group-hover:bg-indigo-600/10 dark:group-hover:bg-indigo-400/10 rounded-md transition-all duration-200" />
            </a>
          ))}
        </nav>

        {/* Desktop Resume Button */}
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all duration-200 hover:scale-105 hover:shadow-lg shadow-indigo-500/20"
        >
          <FileText className="h-4 w-4" />
          <span>Resume</span>
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/5 dark:border-white/5 bg-white/98 dark:bg-slate-950/98 backdrop-blur-md">
          <nav className="max-w-7xl mx-auto px-6 sm:px-8 py-5 flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-indigo-600/10 dark:hover:bg-indigo-400/10 transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all duration-200 w-fit"
            >
              <FileText className="h-4 w-4" />
              <span>Resume</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
