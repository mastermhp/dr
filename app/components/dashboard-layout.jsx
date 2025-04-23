"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  User,
  Calendar,
  MessageSquare,
  FileText,
  Settings,
  BarChart,
  Bot,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  LogOut,
} from "lucide-react"

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Tasks", href: "/tasks", icon: FileText },
    { name: "Calendar", href: "/calendar", icon: Calendar },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Analytics", href: "/analytics", icon: BarChart },
    { name: "AI Settings", href: "/ai-settings", icon: Bot },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]"></div>
        </div>
        <div className="noise-overlay"></div>
      </div>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900/70 backdrop-blur-xl border-r border-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full neon-glow flex items-center justify-center bg-black">
                <span className="text-lg font-bold gradient-text">IA</span>
              </div>
              <span className="text-xl font-bold gradient-text">Intelecx AI</span>
            </Link>
            <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-3">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                      isActive ? "bg-pink-500/20 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <item.icon className={`h-5 w-5 mr-3 ${isActive ? "text-pink-500" : ""}`} />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-800 mr-3">
                <img src="/placeholder.svg?height=40&width=40" alt="Profile" className="w-full h-full rounded-full" />
              </div>
              <div>
                <p className="font-medium">Alex Johnson</p>
                <p className="text-xs text-gray-400">alex@example.com</p>
              </div>
              <button className="ml-auto text-gray-400 hover:text-white">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className={`lg:pl-64 min-h-screen`}>
        {/* Top navigation */}
        <header className="sticky top-0 z-30 bg-gray-900/70 backdrop-blur-xl border-b border-gray-800">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <button className="lg:hidden text-gray-400 hover:text-white mr-4" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-6 w-6" />
              </button>

              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-black/30 border border-gray-700 text-white text-sm rounded-lg block w-64 pl-10 p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative text-gray-400 hover:text-white">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full text-xs flex items-center justify-center">
                  3
                </span>
              </button>

              <div className="relative">
                <button className="flex items-center text-sm text-gray-400 hover:text-white">
                  <span className="mr-1">Demo Mode</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="relative z-10">{children}</main>
      </div>
    </div>
  )
}
