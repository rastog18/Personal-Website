"use client"

import * as React from "react"
import Image from "next/image"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MinimalHeroProps {
  name: string
  surname?: string
  tagline: string
  description: string
  email: string
  github: string
  linkedin: string
  twitter?: string
  profileImage?: string
}

export function MinimalHero({
  name,
  surname,
  tagline,
  description,
  email,
  github,
  linkedin,
  twitter,
  profileImage
}: MinimalHeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 pt-24 pb-20 relative">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Section - Text Content */}
        <div className="space-y-6">
          <p className="text-sm text-black/50 dark:text-white/50 font-sans">
            Welcome, I'm
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 ml-2" />
          </p>

          <div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-black dark:text-white leading-tight">
              {name}
            </h1>
            {surname && (
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-amber-500 dark:text-amber-400 italic leading-tight mt-2">
                {surname}
              </h2>
            )}
          </div>

          <p className="text-base sm:text-lg text-black/60 dark:text-white/60 font-sans leading-relaxed">
            {tagline.split(".").map((part, i, arr) => (
              <span key={i}>
                {i === arr.length - 2 ? (
                  <>
                    {part}
                    <span className="text-amber-500 dark:text-amber-400">.</span>
                  </>
                ) : (
                  part
                )}
                {i < arr.length - 1 && " "}
              </span>
            ))}
          </p>

          <p className="text-sm sm:text-base text-black/50 dark:text-white/50 font-sans leading-relaxed max-w-xl">
            {description}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 pt-2">
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2"
            >
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="text-sm text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </a>
            {twitter && (
              <a
                href={twitter}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2"
              >
                <Twitter className="h-4 w-4" />
                <span>X Twitter</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Section - Profile Image */}
        <motion.div 
          className="relative flex items-center justify-center order-first lg:order-last"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96">
            {/* Animated circular border */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-indigo-600/20 dark:border-indigo-400/20"
              animate={{
                rotate: 360,
                scale: [1, 1.05, 1]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            {/* Circular Image Frame */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-black/10 dark:border-white/10 shadow-xl">
              {profileImage ? (
                <motion.div
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full"
                >
                  <Image
                    src={profileImage}
                    alt={`${name} ${surname || ""}`.trim()}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 640px) 192px, (max-width: 1024px) 256px, 384px"
                  />
                </motion.div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-amber-100 dark:from-indigo-900/20 dark:to-amber-900/20 flex items-center justify-center">
                  <span className="text-6xl font-serif text-black/20 dark:text-white/20">
                    {name[0]}{surname?.[0] || ""}
                  </span>
                </div>
              )}
            </div>

            {/* Animated Decorative Dots */}
            <motion.div
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-indigo-600 dark:bg-indigo-400"
              animate={{
                y: [0, -8, 0],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0
              }}
            />
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-500 dark:bg-amber-400"
              animate={{
                y: [0, 8, 0],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            <motion.div
              className="absolute top-1/2 -right-2 -translate-y-1/2 w-3 h-3 rounded-full bg-indigo-600 dark:bg-indigo-400"
              animate={{
                x: [0, 8, 0],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Side Elements */}
      {/* Left Side - Social Icons */}
      <div className="fixed left-6 bottom-0 top-0 hidden lg:flex flex-col items-center justify-center gap-6 z-10">
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
        >
          <Github className="h-5 w-5" />
        </a>
        <a
          href={linkedin}
          target="_blank"
          rel="noreferrer"
          className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        {twitter && (
          <a
            href={twitter}
            target="_blank"
            rel="noreferrer"
            className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
          >
            <Twitter className="h-5 w-5" />
          </a>
        )}
      </div>

      {/* Right Side - Email */}
      <div className="fixed right-6 bottom-0 top-0 hidden lg:flex items-center z-10">
        <a
          href={`mailto:${email}`}
          className="text-sm text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
          style={{ 
            writingMode: "vertical-rl",
            textOrientation: "mixed"
          }}
        >
          {email}
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-black/40 dark:text-white/40">
        <span className="text-xs font-sans">SCROLL</span>
        <svg
          className="w-4 h-4 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}

