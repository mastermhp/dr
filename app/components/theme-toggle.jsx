"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center hover:bg-gray-700/50 transition-colors"
    >
      {theme === "dark" ? <Sun size={18} className="text-gray-300" /> : <Moon size={18} className="text-gray-700" />}
    </button>
  )
}
