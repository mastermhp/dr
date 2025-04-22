"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import Navbar from "./components/navbar"
import HeroSection from "./components/hero-section"
import LoadingScreen from "./components/loading-screen"
import FeaturesSection from "./components/features-section"
import ProfileSection from "./components/profile-section"
import TaskSection from "./components/task-section"
import AutomationSection from "./components/automation-section"
import Footer from "./components/footer"

// Dynamically import 3D components to reduce initial load time
// Using dynamic import with ssr: false for all Three.js components
const FloatingRobot = dynamic(() => import("./components/floating-robot"), { ssr: false })
const BackgroundScene = dynamic(() => import("./components/background-scene"), { ssr: false })

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      {/* 3D Background Canvas - Completely separated */}
      <div className="fixed inset-0 z-0">
        <BackgroundScene />
      </div>

      {/* Floating notification robot - Completely separated */}
      <div className="fixed top-20 right-10 z-50 w-24 h-24 md:w-32 md:h-32">
        <FloatingRobot />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <ProfileSection />
        <TaskSection />
        <AutomationSection />
        <Footer />
      </div>
    </main>
  )
}
