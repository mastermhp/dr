"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Bot, Zap, Clock, Calendar, FileText, Mail, Check, ArrowRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function AutomationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [automationLevel, setAutomationLevel] = useState(70)

  const handleSliderChange = (e) => {
    setAutomationLevel(Number.parseInt(e.target.value))
  }

  const automatedTasks = [
    {
      id: 1,
      title: "Email Management",
      description: "Filter, categorize, and respond to emails based on your preferences",
      icon: <Mail className="h-6 w-6 text-pink-500" />,
      progress: 85,
    },
    {
      id: 2,
      title: "Calendar Scheduling",
      description: "Automatically schedule meetings and manage your calendar",
      icon: <Calendar className="h-6 w-6 text-purple-500" />,
      progress: 75,
    },
    {
      id: 3,
      title: "Document Creation",
      description: "Generate reports, summaries, and other documents",
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      progress: 65,
    },
    {
      id: 4,
      title: "Task Prioritization",
      description: "Analyze and prioritize your tasks based on deadlines and importance",
      icon: <Clock className="h-6 w-6 text-green-500" />,
      progress: 80,
    },
  ]

  return (
    <section id="automation" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            AI <span className="gradient-text">Automation</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Let your digital twin handle tasks autonomously while you focus on what matters most. Customize your
            automation level to match your comfort and needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gray-900/50 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-6 glow-text">Automation Control Center</h3>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-medium">Automation Level</span>
                  <span className="text-pink-500 font-bold">{automationLevel}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={automationLevel}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-1">
                  <span>Manual</span>
                  <span>Balanced</span>
                  <span>Fully Automated</span>
                </div>
              </div>

              <div className="space-y-6">
                {automatedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-black/50 rounded-xl p-4 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300"
                  >
                    <div className="flex items-center mb-3">
                      {task.icon}
                      <div className="ml-3">
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-gray-400">{task.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="flex-1 mr-4">
                        <Progress value={task.progress * (automationLevel / 100)} className="h-2" />
                      </div>
                      <span className="text-xs text-gray-400">
                        {Math.round(task.progress * (automationLevel / 100))}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 cybr-btn">
                Apply Settings <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6">
              Your AI Twin Works <span className="gradient-text">While You Rest</span>
            </h3>
            <p className="text-gray-300 mb-8">
              With Digital Replica's advanced automation capabilities, your AI twin continues to work on your behalf
              even when you're offline. Set your comfort level and let AI handle routine tasks.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                  <Zap className="h-6 w-6 text-pink-500" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Continuous Productivity</h4>
                  <p className="text-gray-400">
                    Your digital twin works 24/7, ensuring that important tasks are handled even when you're
                    unavailable.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                  <Bot className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Intelligent Decision Making</h4>
                  <p className="text-gray-400">
                    Your AI learns your preferences and decision patterns to make choices that align with your style.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                  <Clock className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Time-Sensitive Responses</h4>
                  <p className="text-gray-400">
                    Never miss a deadline again. Your AI prioritizes time-sensitive tasks and ensures timely responses.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                  <Check className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Customizable Permissions</h4>
                  <p className="text-gray-400">
                    Maintain control by setting specific permissions for different types of tasks and communications.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-5 bg-black/40 border border-pink-500/20 rounded-lg">
              <div className="flex items-center mb-3">
                <Bot className="h-5 w-5 text-pink-500 mr-2" />
                <h4 className="text-lg font-medium">Demo Mode Active</h4>
              </div>
              <p className="text-sm text-gray-400">
                In this demo, you can adjust the automation level and see how it affects task handling. All features are
                functional for demonstration without requiring backend connections.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
