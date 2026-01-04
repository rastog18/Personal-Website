import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Footer } from "@/components/Footer"
import { profile } from "@/data/profile"
import AnimatedBackground from "@/components/AnimatedBackground"


const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
})

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Minimal, fast CS portfolio showcasing projects, hackathons, and experience."
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} font-sans bg-premium`}>
        <ThemeProvider>
          <AnimatedBackground />
          {children}
          <Footer github={profile.socials.github} linkedin={profile.socials.linkedin} />
        </ThemeProvider>
      </body>
    </html>
  )
}
