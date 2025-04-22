"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import {
  BarChart,
  Calendar,
  Clock,
  Mail,
  MessageSquare,
  FileText,
  Bell,
  CheckCircle,
  Bot,
  Zap,
  ArrowRight,
  Plus,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import DashboardLayout from "../components/dashboard-layout"

// Dynamically import 3D components
const AvelineRobot = dynamic(() => import("../components/aveline-robot"), { ssr: false })

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    tasksCompleted: 0,
    tasksInProgress: 0,
    automationLevel: 0,
    aiResponses: 0,
  })

  // Demo data
  const recentActivities = [
    {
      id: 1,
      type: "email",
      title: "Email Response",
      description: "Responded to client inquiry about project timeline",
      time: "10 minutes ago",
      icon: <Mail className="h-4 w-4 text-pink-500" />,
    },
    {
      id: 2,
      type: "document",
      title: "Report Generated",
      description: "Weekly progress report created and sent to team",
      time: "1 hour ago",
      icon: <FileText className="h-4 w-4 text-purple-500" />,
    },
    {
      id: 3,
      type: "meeting",
      title: "Meeting Scheduled",
      description: "Team sync scheduled for tomorrow at 10:00 AM",
      time: "2 hours ago",
      icon: <Calendar className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 4,
      type: "chat",
      title: "Chat Response",
      description: "Answered questions about project requirements",
      time: "3 hours ago",
      icon: <MessageSquare className="h-4 w-4 text-green-500" />,
    },
  ]

  const upcomingTasks = [
    {
      id: 1,
      title: "Client Presentation",
      dueDate: "Today, 2:00 PM",
      priority: "high",
      status: "in-progress",
      type: "meeting",
    },
    {
      id: 2,
      title: "Weekly Report Submission",
      dueDate: "Tomorrow, 9:00 AM",
      priority: "medium",
      status: "not-started",
      type: "document",
    },
    {
      id: 3,
      title: "Team Feedback Collection",
      dueDate: "Friday, 5:00 PM",
      priority: "low",
      status: "not-started",
      type: "task",
    },
  ]

  const notifications = [
    {
      id: 1,
      title: "New Email Received",
      description: "You have a new email from marketing@company.com",
      time: "5 minutes ago",
      read: false,
      type: "email",
    },
    {
      id: 2,
      title: "Task Completed",
      description: "Your AI completed the weekly report generation",
      time: "1 hour ago",
      read: false,
      type: "task",
    },
    {
      id: 3,
      title: "Meeting Reminder",
      description: "Client meeting in 30 minutes",
      time: "2 hours ago",
      read: true,
      type: "meeting",
    },
  ]

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)

      // Animate stats counting up
      const interval = setInterval(() => {
        setStats((prev) => {
          const newStats = { ...prev }
          if (newStats.tasksCompleted < 24) newStats.tasksCompleted += 1
          if (newStats.tasksInProgress < 8) newStats.tasksInProgress += 1
          if (newStats.automationLevel < 75) newStats.automationLevel += 3
          if (newStats.aiResponses < 42) newStats.aiResponses += 2

          if (
            newStats.tasksCompleted >= 24 &&
            newStats.tasksInProgress >= 8 &&
            newStats.automationLevel >= 75 &&
            newStats.aiResponses >= 42
          ) {
            clearInterval(interval)
          }

          return newStats
        })
      }, 50)

      return () => clearInterval(interval)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome to your Digital Replica</h1>
            <p className="text-gray-400">Your AI assistant is ready to help you manage tasks and communications.</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <span className="text-sm text-gray-400">Demo Mode Active</span>
            <div className="px-3 py-1 bg-pink-500/20 text-pink-500 rounded-full text-xs font-medium">
              All Features Available
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Tasks Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.tasksCompleted}</div>
                <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Clock className="h-5 w-5 text-blue-500 mr-2" />
                  Tasks In Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.tasksInProgress}</div>
                <p className="text-xs text-gray-400 mt-1">Currently active</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Bot className="h-5 w-5 text-purple-500 mr-2" />
                  Automation Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.automationLevel}%</div>
                <Progress value={stats.automationLevel} className="h-1 mt-2" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <MessageSquare className="h-5 w-5 text-pink-500 mr-2" />
                  AI Responses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.aiResponses}</div>
                <p className="text-xs text-gray-400 mt-1">Last 30 days</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* AI Assistant */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram overflow-hidden">
              <CardHeader>
                <CardTitle>Your AI Assistant</CardTitle>
                <CardDescription>Interact with your digital twin</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="h-[300px] relative">
                    <AvelineRobot />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold gradient-text">Aveline</h3>
                    <p className="text-gray-300">
                      Your AI digital twin is ready to assist you with tasks, communications, and project management.
                    </p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Learning Progress</span>
                        <span className="text-pink-500">68%</span>
                      </div>
                      <Progress value={68} className="h-1" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Personality Match</span>
                        <span className="text-pink-500">82%</span>
                      </div>
                      <Progress value={82} className="h-1" />
                    </div>

                    <div className="flex space-x-3 mt-6">
                      <button className="flex-1 cybr-btn text-sm py-2">Chat Now</button>
                      <button className="flex-1 neon-btn text-sm">Configure</button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>What your AI has been doing</CardDescription>
                </div>
                <button className="text-sm text-pink-500 hover:text-pink-400 transition-colors flex items-center">
                  View All <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start p-3 bg-black/30 rounded-lg border border-gray-800 hover:border-pink-500/20 transition-all duration-300"
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{activity.title}</h4>
                          <span className="text-xs text-gray-400">{activity.time}</span>
                        </div>
                        <p className="text-sm text-gray-400">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Tasks */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Upcoming Tasks</CardTitle>
                  <CardDescription>Tasks that need your attention</CardDescription>
                </div>
                <button className="px-3 py-1 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-all duration-300 flex items-center text-sm">
                  <Plus className="h-4 w-4 mr-1" /> Add Task
                </button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 bg-black/30 rounded-lg border border-gray-800 hover:border-pink-500/20 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{task.title}</h4>
                        <div
                          className={`px-2 py-1 rounded-full text-xs ${
                            task.priority === "high"
                              ? "bg-red-900/30 text-red-400"
                              : task.priority === "medium"
                                ? "bg-yellow-900/30 text-yellow-400"
                                : "bg-green-900/30 text-green-400"
                          }`}
                        >
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm text-gray-400">
                          <Clock className="h-4 w-4 mr-1" />
                          {task.dueDate}
                        </div>
                        <div
                          className={`px-2 py-1 rounded-full text-xs ${
                            task.status === "in-progress"
                              ? "bg-blue-900/30 text-blue-400"
                              : task.status === "completed"
                                ? "bg-green-900/30 text-green-400"
                                : "bg-gray-800 text-gray-400"
                          }`}
                        >
                          {task.status === "in-progress"
                            ? "In Progress"
                            : task.status === "completed"
                              ? "Completed"
                              : "Not Started"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Notifications */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Stay updated on important events</CardDescription>
                </div>
                <div className="relative">
                  <Bell className="h-5 w-5 text-gray-400" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full text-xs flex items-center justify-center">
                    {notifications.filter((n) => !n.read).length}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border ${notification.read ? "bg-black/20 border-gray-800" : "bg-black/30 border-pink-500/20"} hover:border-pink-500/30 transition-all duration-300`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`font-medium ${notification.read ? "text-gray-300" : "text-white"}`}>
                          {notification.title}
                        </h4>
                        <span className="text-xs text-gray-400">{notification.time}</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{notification.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300">
                          {notification.type}
                        </div>
                        {!notification.read && (
                          <button className="text-xs text-pink-500 hover:text-pink-400 transition-colors">
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Automation Status */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 text-pink-500 mr-2" />
                  Automation Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Email Handling</span>
                    <div className="px-2 py-1 rounded-full bg-green-900/30 text-green-400 text-xs">Active</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Meeting Scheduling</span>
                    <div className="px-2 py-1 rounded-full bg-green-900/30 text-green-400 text-xs">Active</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Document Generation</span>
                    <div className="px-2 py-1 rounded-full bg-yellow-900/30 text-yellow-400 text-xs">Partial</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Social Media Management</span>
                    <div className="px-2 py-1 rounded-full bg-gray-800 text-gray-400 text-xs">Inactive</div>
                  </div>

                  <button className="w-full neon-btn mt-2">Adjust Settings</button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 bg-black/30 rounded-lg border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 text-left">
                    <Mail className="h-5 w-5 text-pink-500 mb-2" />
                    <span className="text-sm font-medium block">Check Emails</span>
                  </button>
                  <button className="p-3 bg-black/30 rounded-lg border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 text-left">
                    <Calendar className="h-5 w-5 text-purple-500 mb-2" />
                    <span className="text-sm font-medium block">Schedule Meeting</span>
                  </button>
                  <button className="p-3 bg-black/30 rounded-lg border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 text-left">
                    <FileText className="h-5 w-5 text-blue-500 mb-2" />
                    <span className="text-sm font-medium block">Create Report</span>
                  </button>
                  <button className="p-3 bg-black/30 rounded-lg border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 text-left">
                    <BarChart className="h-5 w-5 text-green-500 mb-2" />
                    <span className="text-sm font-medium block">View Analytics</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
