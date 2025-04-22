"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeProviderContext = createContext({})

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  enableSystem = false,
  storageKey = "digital-replica-theme",
  ...props
}) {
  const [theme, setTheme] = useState(defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement

    // Remove old theme class
    root.classList.remove("light", "dark")

    // Add new theme class
    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (newTheme) => {
      setTheme(newTheme)
      localStorage.setItem(storageKey, newTheme)
    },
    themes: ["light", "dark"],
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
