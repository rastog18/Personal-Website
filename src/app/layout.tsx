import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Footer } from "@/components/Footer"
import { profile } from "@/data/profile"
import { TechCursor } from "@/components/TechCursor"
import AnimatedBackground from "@/components/AnimatedBackground"
import { CursorGlow } from "@/components/CursorGlow"


const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
})

const fontSerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap"
})

export const metadata: Metadata = {
  title: "Shivam Rastogi",
  description: "Minimal, fast CS portfolio showcasing projects, hackathons, and experience."
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontSerif.variable} font-sans bg-premium`}>
        <Script
          src="https://platform.linkedin.com/in.js"
          strategy="lazyOnload"
          id="linkedin-embed-script"
        />
        <ThemeProvider>
          <TechCursor />
          {children}
          <Footer github={profile.socials.github} linkedin={profile.socials.linkedin} />
        </ThemeProvider>
      </body>
    </html>
  )
}
