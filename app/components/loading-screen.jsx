"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing AI Systems")

  useEffect(() => {
    const texts = [
      "Initializing AI Systems",
      "Loading Neural Networks",
      "Calibrating Digital Twin",
      "Syncing Personality Matrix",
      "Preparing 3D Environment",
    ]

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 30)

    const textInterval = setInterval(() => {
      setLoadingText(texts[Math.floor(Math.random() * texts.length)])
    }, 1000)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <div className="noise-overlay"></div>
      <div className="scanline"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-8 gradient-text glitch" title="Intelecx AI">
          Intelecx AI
        </h1>

        <div className="w-64 md:w-96 h-2 bg-gray-800 rounded-full mb-4 overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
          ></motion.div>
        </div>

        <p className="text-gray-400 text-sm mb-8">{loadingText}...</p>

        <div className="flex justify-center space-x-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-pink-500"
              style={{
                animation: `pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) ${i * 0.2}s infinite`,
              }}
            ></div>
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-4 text-xs text-gray-500">
        <p>v1.0.0 | NEXT-GEN AI DIGITAL TWIN</p>
      </div>
    </div>
  )
}
