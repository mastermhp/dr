"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Sparkles, Zap } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"

// Dynamically import 3D components to reduce initial load time
const AvelineRobot = dynamic(() => import("./aveline-robot"), { ssr: false })

export default function HeroSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div style={{ y, opacity }} className="text-center lg:text-left">
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-gray-800/50 backdrop-blur-sm border border-pink-500/30 hologram">
              <span className="text-sm font-medium text-gray-300 flex items-center">
                <Sparkles size={16} className="mr-2 text-pink-500 animate-pulse" />
                Next Generation AI Technology
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold mb-6">
              Your <span className="gradient-text neon-text">Digital Replica</span>
              <br />
              Powered by AI
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto lg:mx-0">
              Create a digital version of yourself that can handle emails, tasks, and communications with your unique
              style and preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href='/dashboard'>
              <button className="cybr-btn">
                Get Started
                <ArrowRight size={18} className="ml-2" />
              </button>
              </Link>
              <button className="px-8 py-4 border border-pink-500/30 bg-black/50 text-white rounded-md backdrop-blur-sm hover:bg-black/70 transition-all duration-300 hologram">
                Watch Demo
              </button>
            </div>
          </motion.div>

          <motion.div style={{ scale }} className="relative h-[500px] mt-32 flex items-center justify-center">
            {mounted && <AvelineRobot />}

            {/* Floating elements */}
            <div className="absolute top-1/4 -left-4 w-20 h-20 bg-purple-500/10 backdrop-blur-md rounded-lg border border-purple-500/20 flex items-center justify-center floating hologram">
              <Zap size={32} className="text-purple-500" />
            </div>
            <div
              className="absolute bottom-1/4 -right-4 w-20 h-20 bg-pink-500/10 backdrop-blur-md rounded-lg border border-pink-500/20 flex items-center justify-center floating hologram"
              style={{ animationDelay: "1s" }}
            >
              <Sparkles size={32} className="text-pink-500" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
