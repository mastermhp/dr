"use client"

import { useState } from "react"
import {
  Bot,
  Sliders,
  MessageSquare,
  Mail,
  Calendar,
  FileText,
  Shield,
  Download,
  Trash2,
  AlertTriangle,
  Brain,
  Zap,
  Check,
  RefreshCw,
  Lock,
  Sparkles,
} from "lucide-react"
import DashboardLayout from "../components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function AISettingsPage() {
  const [automationLevel, setAutomationLevel] = useState(75)
  const [personalitySettings, setPersonalitySettings] = useState({
    communicationStyle: "professional",
    responseLength: 3,
    decisionMaking: 3,
    tone: "neutral",
  })
  const [accessSettings, setAccessSettings] = useState({
    email: true,
    calendar: true,
    documents: true,
    contacts: false,
    financials: false,
  })
  const [learningSettings, setLearningSettings] = useState({
    continuousLearning: true,
    emailAnalysis: true,
    documentAnalysis: true,
    calendarAnalysis: false,
    dataRetention: "180",
  })
  const [voiceSettings, setVoiceSettings] = useState({
    voiceEnabled: true,
    voiceType: "female",
    voiceSpeed: 1.0,
    voicePitch: 1.2,
    greetingsEnabled: true,
    pageIntrosEnabled: true,
  })

  const handleAutomationLevelChange = (e) => {
    setAutomationLevel(Number.parseInt(e.target.value))
  }

  const handlePersonalityChange = (field, value) => {
    setPersonalitySettings({
      ...personalitySettings,
      [field]: value,
    })
  }

  const handleAccessToggle = (field) => {
    setAccessSettings({
      ...accessSettings,
      [field]: !accessSettings[field],
    })
  }

  const handleLearningToggle = (field) => {
    setLearningSettings({
      ...learningSettings,
      [field]: !learningSettings[field],
    })
  }

  const handleVoiceToggle = (field) => {
    setVoiceSettings({
      ...voiceSettings,
      [field]: !voiceSettings[field],
    })
  }

  const handleVoiceChange = (field, value) => {
    setVoiceSettings({
      ...voiceSettings,
      [field]: value,
    })
  }

  const handleResetAI = () => {
    if (confirm("Are you sure you want to reset your AI? This will delete all learning data and reset to default settings.")) {
      // In a real app, this would reset the AI
      alert("AI has been reset to default settings")
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">AI Settings</h1>
            <p className="text-gray-400">Customize how your AI digital twin works and represents you</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-all duration-300 flex items-center">
              <Check className="h-5 w-5 mr-2" />
              Save All Settings
            </button>
          </div>
        </div>

        <Tabs defaultValue="automation" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8 bg-black/50 border border-pink-500/20">
            <TabsTrigger value="automation" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              <Sliders className="h-4 w-4 mr-2" />
              Automation
            </TabsTrigger>
            <TabsTrigger value="personality" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              <Brain className="h-4 w-4 mr-2" />
              Personality
            </TabsTrigger>
            <TabsTrigger value="voice" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              <MessageSquare className="h-4 w-4 mr-2" />
              Voice & Interaction
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              <Shield className="h-4 w-4 mr-2" />
              Privacy & Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="automation">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                  <CardHeader>
                    <CardTitle>Automation Level</CardTitle>
                    <CardDescription>Control how much your AI can do autonomously</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
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
                          onChange={handleAutomationLevelChange}
                          className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-sm text-gray-400 mt-1">
                          <span>Manual</span>
                          <span>Balanced</span>
                          <span>Fully Automated</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-800 hover:border-pink-500/20 transition-all duration-300">
                          <div className="flex items-center">
                            <Mail className="h-5 w-5 text-pink-500 mr-3" />
                            <div>
                              <h4 className="font-medium">Email Handling</h4>
                              <p className="text-xs text-gray-400">Allow AI to read, categorize, and respond to emails</p>
                            </div>
                          </div>
                          <div className="relative inline-block w-12 h-6 rounded-full bg-gray-800">
                            <input type="checkbox" className="sr-only" id="toggle-email" defaultChecked />
                            <label htmlFor="toggle-email" className="absolute inset-0 rounded-full cursor-pointer">
                              <span className="absolute inset-0 rounded-full bg-pink-500 transition-all duration-300 transform translate-x-0"></span>
                              <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 transform translate-x-6"></span>
                            </label>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-800 hover:border-pink-500/20 transition-all duration-300">
                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 text-pink-500 mr-3" />
                            <div>
                              <h4 className="font-medium">Calendar Management</h4>
                              <p className="text-xs text-gray-400">Allow AI to schedule and manage your calendar</p>
                            </div>
                          </div>
                          <div className="relative inline-block w-12 h-6 rounded-full bg-gray-800">
                            <input type="checkbox" className="sr-only" id="toggle-calendar" defaultChecked />
                            <label htmlFor="toggle-calendar" className="absolute inset-0 rounded-full cursor-pointer">
                              <span className="absolute inset-0 rounded-full bg-pink-500 transition-all duration-300 transform translate-x-0"></span>
                              <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 transform translate-x-6"></span>
                            </label>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-800 hover:border-pink-500/20 transition-all duration-300">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-pink-500 mr-3" />
                            <div>
                              <h4 className="font-medium">Document Creation</h4>
                              <p className="text-xs text-gray-400">Allow AI to create and edit documents</p>
                            </div>
                          </div>
                          <div className="relative inline-block w-12 h-6 rounded-full bg-gray-800">
                            <input type="checkbox" className="sr-only" id="toggle-docs" defaultChecked />
                            <label htmlFor="toggle-docs" className="absolute inset-0 rounded-full cursor-pointer">
                              <span className="absolute inset-0 rounded-full bg-pink-500 transition-all duration-300 transform translate-x-0"></span>
                              <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 transform translate-x-6"></span>
                            </label>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-800 hover:border-pink-500/20 transition-all duration-300">
                          <div className="flex items-center">
                            <MessageSquare className="h-5 w-5 text-pink-500 mr-3" />
                            <div>
                              <h4 className="font-medium">Message Responses</h4>
                              <p className="text-xs text-gray-400">Allow AI to respond to messages on your behalf</p>
                            </div>
                          </div>
                          <div className="relative inline-block w-12 h-6 rounded-full bg-gray-800">
                            <input type="checkbox" className="sr-only" id="toggle-messages" defaultChecked />
                            <label htmlFor="toggle-messages" className="absolute inset-0 rounded-full cursor-pointer">
                              <span className="absolute inset-0 rounded-full bg-pink-500 transition-all duration-300 transform translate-x-0"></span>
                              <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 transform translate-x-6"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-8 bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                  <CardHeader>
                    <CardTitle>Task Permissions</CardTitle>
                    <CardDescription>Control what types of tasks your AI can handle</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="text-lg font-medium">Email Handling</h4>
                        <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-800 hover:border-pink-500/20 transition-all duration-300">
                          <div className="flex items-center">
                            <Mail className="h-5 w-5 text-pink-500 mr-3" />
                            <span>Job-related emails</span>
                          </div>
                          <select className="bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                            <option value="auto-respond">Auto-respond</option>
                            <option value="require-approval">Require approval</option>
                            <option value="ignore">Ignore</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-800 hover:border-pink-500/20 transition-all duration-300">
                          <div className="flex items-center">
                            <Mail className="h-5 w-5 text-pink-500 mr-3" />
                            <span>Financial emails</span>
                          </div>
                          <select className="bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                            <option value="auto-respond">Auto-respond</option>
                            <option value="require-approval" selected>Require approval</option>
                            <option value="ignore">Ignore</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-800 hover:border-pink-500/20 transition-all duration-300">
                          <div className="flex items-center">
                            <Mail className="h-5 w-5 text-pink-500 mr-3" />
                            <span>Marketing emails</span>
                          </div>
                          <select className="bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                            <option value="auto-respond">Auto-respond</option>
                            <option value="require-approval">Require approval</option>
                            <option value="ignore" selected>Ignore</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-lg font-medium">Document Creation</h4>
                        <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-800 hover:border-pink-500/20 transition-all duration-300">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-purple-500 mr-3" />
                            <span>Weekly reports</span>
                          </div>
                          <select className="bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                            <option value="auto-generate" selected>Auto-generate</option>
                            <option value="draft-only">Draft only</option>
                            <option value="require-approval">Require approval</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-800 hover:border-pink-500/20 transition-all duration-300">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-purple-500 mr-3" />
                            <span>Project proposals</span>
                          </div>
                          <select className="bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                            <option value="auto-generate">Auto-generate</option>
                            <option value="draft-only" selected>Draft only</option>
                            <option value="require-approval">Require approval</option>
                          </select>
                        </div>
                      </div>

                      <button className="w-full cybr-btn">Update Task Permissions</button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="h-5 w-5 text-purple-500 mr-2" />
                      AI Automation Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Overall Automation</span>
                          <span className="text-pink-500">{automationLevel}%</span>
                        </div>
                        <Progress value={automationLevel} className="h-2" />
                      </div>

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
                      </div>

                      <div className="p-4 bg-black/30 rounded-lg border border-purple-500/20">
                        <h4 className="font-medium flex items-center mb-2">
                          <Bot className="h-4 w-4 text-purple-500 mr-2" />
                          AI Insight
                        </h4>
                        <p className="text-sm text-gray-400">
                          Your current automation level is optimized for productivity while maintaining control. Increasing to 85% could save you an additional 5 hours per week.
                        </p>
                      </div>

                      <button className="w-full neon-btn">Test Automation</button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6 bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                  <CardHeader>
                    <CardTitle>Automation Schedule</CardTitle>
                    <CardDescription>When your AI should be most active</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Working Hours (9AM-5PM)</span>
                        <select className="bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                          <option value="high">High Activity</option>
                          <option value="medium" selected>Medium Activity</option>
                          <option value="low">Low Activity</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>After Hours (5PM-9AM)</span>
                        <select className="bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                          <option value="high" selected>High Activity</option>
                          <option value="medium">Medium Activity</option>
                          <option value="low">Low Activity</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Weekends</span>
                        <select className="bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                          <option value="high">High Activity</option>
                          <option value="medium" selected>Medium Activity</option>
                          <option value="low">Low Activity</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Vacation Mode</span>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-gray-800">
                          <input type="checkbox" className="sr-only" id="toggle-vacation" />
                          <label htmlFor="toggle-vacation" className="absolute inset-0 rounded-full cursor-pointer">
                            <span className="absolute inset-0 rounded-full bg-gray-800 transition-all duration-300 transform translate-x-0"></span>
                            <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 transform translate-x-0"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="personality">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                <CardHeader>
                  <CardTitle>AI Personality Settings</CardTitle>
                  <CardDescription>Customize how your AI represents you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium">Communication Style</label>
                      <select
                        value={personalitySettings.communicationStyle}
                        onChange={(e) => handlePersonalityChange("communicationStyle", e.target.value)}
                        className="w-full mt-1 bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      >
                        <option value="professional">Professional</option>
                        <option value="casual">Casual</option>
                        <option value="friendly">Friendly</option>
                        <option value="formal">Formal</option>
                        <option value="technical">Technical</option>
                      </select>
                      <p className="text-xs text-gray-400 mt-1">
                        Determines how your AI communicates in emails, messages, and documents.
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Response Length</label>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-400 mr-2">Concise</span>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value={personalitySettings.responseLength}
                          onChange={(e) => handlePersonalityChange("responseLength", e.target.value)}
                          className="flex-1 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-xs text-gray-400 ml-2">Detailed</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Controls how detailed your AI's responses will be.</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Decision Making</label>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-400 mr-2">Conservative</span>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value={personalitySettings.decisionMaking}
                          onChange={(e) => handlePersonalityChange("decisionMaking", e.target.value)}
                          className="flex-1 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-xs text-gray-400 ml-2">Decisive</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Affects how your AI makes decisions when handling tasks.
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Tone</label>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        <button
                          onClick={() => handlePersonalityChange("tone", "neutral")}
                          className={`px-3 py-2 rounded-md ${
                            personalitySettings.tone === "neutral"
                              ? "bg-pink-500 text-white"
                              : "bg-black/30 border border-gray-700 hover:border-pink-500/30 transition-colors"
                          }`}
                        >
                          Neutral
                        </button>
                        <button
                          onClick={() => handlePersonalityChange("tone", "enthusiastic")}
                          className={`px-3 py-2 rounded-md ${
                            personalitySettings.tone === "enthusiastic"
                              ? "bg-pink-500 text-white"
                              : "bg-black/30 border border-gray-700 hover:border-pink-500/30 transition-colors"
                          }`}
                        >
                          Enthusiastic
                        </button>
                        <button
                          onClick={() => handlePersonalityChange("tone", "serious")}
                          className={`px-3 py-2 rounded-md ${
                            personalitySettings.tone === "serious"
                              ? "bg-pink-500 text-white"
                              : "bg-black/30 border border-gray-700 hover:border-pink-500/30 transition-colors"
                          }`}
                        >
                          Serious
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Sets the emotional tone of your AI's communications.</p>
                    </div>

                    <button className="w-full cybr-btn">Save Personality Settings</button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                <CardHeader>
                  <CardTitle>AI Learning Settings</CardTitle>
                  <CardDescription>Control how your AI learns from your data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Continuous Learning</h4>
                        <p className="text-xs text-gray-400">Allow AI to learn from new interactions</p>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-gray-800">
                        <input
                          type="checkbox"
                          className="sr-only"
                          id="toggle-learning"
                          checked={learningSettings.continuousLearning}
                          onChange={() => handleLearningToggle("continuousLearning")}
                        />
                        <label htmlFor="toggle-learning" className="absolute inset-0 rounded-full cursor-pointer">
                          <span
                            className={`absolute inset-0 rounded-full ${
                              learningSettings.continuousLearning ? "bg-pink-500" : "bg-gray-800"
                            } transition-all duration-300 transform translate-x-0`}
                          ></span>
                          <span
                            className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 transform ${
                              learningSettings.continuousLearning ? "translate-x-6" : "translate-x-0"
                            }`}
                          ></span>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email Analysis</h4>
                        <p className="text-xs text-gray-400">Learn from your email communications</p>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-gray-800">
                        <input
                          type="checkbox"
                          className="sr-only"
                          id="toggle-email-learning"
                          checked={learningSettings.emailAnalysis}
                          onChange={() => handleLearningToggle("emailAnalysis")}
                        />
                        <label htmlFor="toggle-email-learning" className="absolute inset-0 rounded-full cursor-pointer">
                          <span
                            className={`absolute inset-0 rounded-full ${
                              learningSettings.emailAnalysis ? "bg-pink-500" : "bg-gray-800"
                            } transition-all duration-300 transform translate-x-0`}
                          ></span>
                          <span
                            className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 transform ${
                              learningSettings.emailAnalysis ? "translate-x-6" : "translate-x-0"
                            }`}
                          ></span>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Document Analysis</h4>
                        <p className="text-xs text-gray-400">Learn from your documents and files</p>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-gray-800">
                        <input
                          type="checkbox"
                          className="sr-only"
                          id="toggle-docs-learning"
                          checked={learningSettings.documentAnalysis}
                          onChange={() => handleLearningToggle("documentAnalysis")}
                        />
                        <label htmlFor="toggle-docs-learning" className="absolute inset-0 rounded-full cursor-pointer">
                          <span
                            className={`absolute inset-0 rounded-full ${
                              learningSettings.documentAnalysis ? "bg-pink-500" : "bg-gray-800"
                            } transition-all duration-300 transform translate-x-0`}
                          ></span>
                          <span
                            className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 transform ${
                              learningSettings.documentAnalysis ? "translate-x-6" : "translate-x-0"
                            }`}
                          ></span>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Calendar Integration</h4>
                        <p className="text-xs text-gray-400">Learn from your schedule and events</p>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-gray-800">
                        <input
                          type="checkbox"
                          className="sr-only"
                          id="toggle-calendar-learning"
                          checked={learningSettings.calendarAnalysis}
                          onChange={() => handleLearningToggle("calendarAnalysis")}
                        />
                        <label
                          htmlFor="toggle-calendar-learning"
                          className="absolute inset-0 rounded-full cursor-pointer"
                        >
                          <span
                            className={`absolute inset-0 rounded-full ${
                              learningSettings.calendarAnalysis ? "bg-pink-500" : "bg-gray-800"
                            } transition-all duration-300 transform translate-x-0`}
                          ></span>
                          <span
                            className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 transform ${
                              learningSettings.calendarAnalysis ? "translate-x-6" : "translate-x-0"
                            }`}
                          ></span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Data Retention</h4>
                      <select
                        value={learningSettings.dataRetention}
                        onChange={(e) => setLearningSettings({ ...learningSettings, dataRetention: e.target.value })}
                        className="w-full bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      >
                        <option value="30">30 days</option>
                        <option value="90">90 days</option>
                        <option value="180">180 days</option>
                        <option value="365">1 year</option>
                        <option value="forever">Forever</option>
                      </select>
                      <p className="text-xs text-gray-400 mt-1">How long your AI retains learning data.</p>
                    </div>

                    <button className="w-full neon-btn">Save Learning Settings</button>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                <CardHeader>
                  <CardTitle>Personality Preview</CardTitle>
                  <CardDescription>See how your AI will communicate based on current settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-black/30 rounded-lg border border-pink-500/20">
                        <h4 className="font-medium mb-2">Email Response Example</h4>
                        <div className="bg-black/50 p-3 rounded-md border border-gray-800 text-sm">
                          <p className="mb-2">
                            <strong>Subject:</strong> Re: Project Timeline Update
                          </p>
                          <p className="mb-2">
                            <strong>To:</strong> client@example.com
                          </p>
                          <p>
                            {personalitySettings.communicationStyle === "professional" ? (
                              <>
                                Thank you for your inquiry regarding the project timeline. I've reviewed our progress and
                                can confirm that we are on track to meet the agreed-upon deadline of October 15th.
                                <br />
                                <br />
                                The development phase is 85% complete, and we anticipate beginning QA testing next week.
                                I'll provide a more detailed progress report by Friday.
                                <br />
                                <br />
                                Please let me know if you have any specific questions or concerns.
                              </>
                            ) : personalitySettings.communicationStyle === "casual" ? (
                              <>
                                Thanks for checking in about the timeline! We're right on track for the Oct 15th
                                deadline.
                                <br />
                                <br />
                                We've got about 85% of the development done and we'll start testing next week. I'll send
                                over more details by Friday.
                                <br />
                                <br />
                                Let me know if you need anything else!
                              </>
                            ) : personalitySettings.communicationStyle === "formal" ? (
                              <>
                                Dear Client,
                                <br />
                                <br />
                                I am writing in response to your inquiry regarding the project timeline. I am pleased to
                                inform you that the project is proceeding according to schedule, with an anticipated
                                completion date of October 15th, as previously agreed upon.
                                <br />
                                <br />
                                The development phase is currently 85% complete. Quality assurance testing is scheduled
                                to commence next week. A comprehensive progress report will be provided to you by Friday.
                                <br />
                                <br />
                                Should you have any additional inquiries or concerns, please do not hesitate to contact
                                me.
                                <br />
                                <br />
                                Sincerely,
                                <br />
                                Alex Johnson
                              </>
                            ) : (
                              <>
                                Hi there!
                                <br />
                                <br />
                                Thanks for checking in on the project timeline! I'm happy to report we're right on
                                schedule for our October 15th deadline. 😊
                                <br />
                                <br />
                                We've completed about 85% of the development work and we'll be starting testing next
                                week. I'll send you a more detailed update by Friday.
                                <br />
                                <br />
                                Let me know if you have any questions or if there's anything else you need!
                                <br />
                                <br />
                                Best,
                                <br />
                                Alex
                              </>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-black/30 rounded-lg border border-pink-500/20">
                        <h4 className="font-medium mb-2">Meeting Response Example</h4>
                        <div className="bg-black/50 p-3 rounded-md border border-gray-800 text-sm">
                          <p className="mb-2">
                            <strong>Request:</strong> "Can we schedule a meeting to discuss the new marketing strategy?"
                          </p>
                          <p>
                            {personalitySettings.communicationStyle === "professional" ? (
                              <>
                                I'd be happy to schedule a meeting to discuss the new marketing strategy. Based on your
                                calendar, I see you have availability this Thursday at 2:00 PM or Friday at 10:00 AM.
                                <br />
                                <br />
                                Would either of these times work for you? If not, please let me know your preferred time
                                and I'll adjust accordingly.
                              </>
                            ) : personalitySettings.communicationStyle === "casual" ? (
                              <>
                                Sure thing! Let's get a meeting on the calendar to talk about the marketing strategy.
                                <br />
                                <br />
                                Looks like you're free Thursday at 2pm or Friday at 10am. Either of those work for you?
                                If not, just let me know what's better and we'll figure it out.
                              </>
                            ) : personalitySettings.communicationStyle === "formal" ? (
                              <>
                                I would be pleased to arrange a meeting regarding the new marketing strategy.
                                <br />
                                <br />
                                Upon reviewing your calendar, I have identified two potential meeting times: Thursday,
                                October 12th at 2:00 PM, or Friday, October 13th at 10:00 AM.
                                <br />
                                <br />
                                Please advise which of these options would be most suitable, or provide alternative times
                                if neither is convenient.
                              </>
                            ) : (
                              <>
                                I'd love to chat about the new marketing strategy! 🚀
                                <br />
                                <br />
                                I checked your calendar and it looks like you're free Thursday at 2pm or Friday at 10am.
                                Would either of those times work for you?
                                <br />
                                <br />
                                Just let me know what works best and I'll get it set up right away! 👍
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-black/30 rounded-lg border border-purple-500/20">
                      <h4 className="font-medium flex items-center mb-2">
                        <Bot className="h-4 w-4 text-purple-500 mr-2" />
                        AI Insight
                      </h4>
                      <p className="text-sm text-gray-400">
                        Based on your current personality settings, your AI will communicate in a{" "}
                        <span className="text-pink-500">{personalitySettings.communicationStyle}</span> style with{" "}
                        {personalitySettings.responseLength < 3
                          ? "concise"
                          : personalitySettings.responseLength > 3
                          ? "detailed"
                          : "balanced"}{" "}
                        responses and a{" "}
                        {personalitySettings.decisionMaking < 3
                          ? "conservative"
                          : personalitySettings.decisionMaking > 3
                          ? "decisive"
                          : "balanced"}{" "}
                        approach to decision making.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="voice">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                <CardHeader>
                  <CardTitle>Voice Settings</CardTitle>
                  <CardDescription>Customize your AI's voice and speech patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Voice Enabled</h4>
                        <p className="text-xs text-gray-400">Enable voice interactions with your AI</p>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-gray-800">
                        <input
                          type="checkbox"
                          className="sr-only"
                          id="toggle-voice"
                          checked={voiceSettings.voiceEnabled}
                          onChange={() => handleVoiceToggle("voiceEnabled")}
                        />
                        <label htmlFor="toggle-voice" className="absolute inset-0 rounded-full cursor-pointer">
                          <span
                            className={`absolute inset-0 rounded-full ${
                              voiceSettings.voiceEnabled ? "bg-pink-500" : "bg-gray-800"
                            } transition-all duration-300 transform translate-x-0`}
                          ></span>
                          <span
                            className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 transform ${
                              voiceSettings.voiceEnabled ? "translate-x-6" : "translate-x-0"
                            }`}
                          ></span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Voice Type</label>
                      <select
                        value={voiceSettings.voiceType}
                        onChange={(e) => handleVoiceChange("voiceType", e.target.value)}
                        className="w-full mt-1 bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        disabled={!voiceSettings.voiceEnabled}
                      >
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="neutral">Neutral</option>
                        <option value="british">British</option>
                        <option value="australian">Australian</option>
                      </select>
                      <p className="text-xs text-gray-400 mt-1">Select the voice type for your AI assistant.</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Voice Speed</label>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-400 mr-2">Slow</span>
                        <input
                          type="range"
                          min="0.5"
                          max="2"
                          step="0.1"
                          value={voiceSettings.voiceSpeed}
                          onChange={(e) => handleVoiceChange("voiceSpeed", e.target.value)}
                          className="flex-1 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                          disabled={!voiceSettings.voiceEnabled}
                        />
                        <span className="text-xs text-gray-400 ml-2">Fast</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Current: {voiceSettings.voiceSpeed}x speed
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Voice Pitch</label>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-400 mr-2">Low</span>
                        <input
                          type="range"
                          min="0.5"
                          max="2"
                          step="0.1"
                          value={voiceSettings.voicePitch}
                          onChange={(e) => handleVoiceChange("voicePitch", e.target.value)}
                          className="flex-1 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                          disabled={!voiceSettings.voiceEnabled}
                        />
                        <span className="text-xs text-gray-400 ml-2">High</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Current: {voiceSettings.voicePitch}x pitch
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Welcome Greetings</h4>
                        <p className="text-xs text-gray-400">Automatic voice greeting when entering the site</p>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-gray-800">
                        <input
                          type="checkbox"
                          className="sr-only"
                          id="toggle-greetings"
                          checked={voiceSettings.greetingsEnabled}
                          onChange={() => handleVoiceToggle("greetingsEnabled")}
                          disabled={!voiceSettings.voiceEnabled}
                        />
                        <label htmlFor="toggle-greetings" className="absolute inset-0 rounded-full cursor-pointer">
                          <span
                            className={`absolute inset-0 rounded-full ${
                              voiceSettings.greetingsEnabled ? "bg-pink-500" : "bg-gray-800"
                            } transition-all duration-300 transform translate-x-0`}
                          ></span>
                          <span
                            className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 transform ${
                              voiceSettings.greetingsEnabled ? "translate-x-6" : "translate-x-0"
                            }`}
                          ></span>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Page Introductions</h4>
                        <p className="text-xs text-gray-400">Voice introduction when navigating to new pages</p>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-gray-800">
                        <input
                          type="checkbox"
                          className="sr-only"
                          id="toggle-intros"
                          checked={voiceSettings.pageIntrosEnabled}
                          onChange={() => handleVoiceToggle("pageIntrosEnabled")}
                          disabled={!voiceSettings.voiceEnabled}
                        />
                        <label htmlFor="toggle-intros" className="absolute inset-0 rounded-full cursor-pointer">
                          <span
                            className={`absolute inset-0 rounded-full ${
                              voiceSettings.pageIntrosEnabled ? "bg-pink-500" : "bg-gray-800"
                            } transition-all duration-300 transform translate-x-0`}
                          ></span>
                          <span
                            className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 transform ${
                              voiceSettings.pageIntrosEnabled ? "translate-x-6" : "translate-x-0"
                            }`}
                          ></span>
                        </label>
                      </div>
                    </div>

                    <button className="w-full cybr-btn">Save Voice Settings</button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                <CardHeader>
                  <CardTitle>Interaction Settings</CardTitle>
                  <CardDescription>Configure how you interact with your AI</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 bg-black/30 rounded-lg border border-pink-500/20">
                      <h4 className="font-medium mb-2">Voice Commands</h4>
                      <p className="text-sm text-gray-400 mb-3">
                        Enable specific voice commands to control your AI assistant
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">"Hey Aveline"</span>
                          <div className="relative inline-block w-10 h-5 rounded-full bg-gray-800">
                            <input type="checkbox" className="sr-only" id="cmd-hey" defaultChecked />
                            <label htmlFor="cmd-hey" className="absolute inset-0 rounded-full cursor-pointer">
                              <span className="absolute inset-0 rounded-full bg-pink-500 transition-all duration-300 transform translate-x-0"></span>
                              <span className="absolute left-1 top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 transform translate-x-5"></span>
                            </label>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">"Schedule meeting"</span>
                          <div className="relative inline-block w-10 h-5 rounded-full bg-gray-800">
                            <input type="checkbox" className="sr-only" id="cmd-schedule" defaultChecked />
                            <label htmlFor="cmd-schedule" className="absolute inset-0 rounded-full cursor-pointer">
                              <span className="absolute inset-0 rounded-full bg-pink-500 transition-all duration-300 transform translate-x-0"></span>
                              <span className="absolute left-1 top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 transform translate-x-5"></span>
                            </label>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">"Send email"</span>
                          <div className="relative inline-block w-10 h-5 rounded-full bg-gray-800">
                            <input type="checkbox" className="sr-only" id="cmd-email" defaultChecked />
                            <label htmlFor="cmd-email" className="absolute inset-0 rounded-full cursor-pointer">
                              <span className="absolute inset-0 rounded-full bg-pink-500 transition-all duration-300 transform translate-x-0"></span>
                              <span className="absolute left-1 top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 transform translate-x-5"></span>
                            </label>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">"Create task"</span>
                          <div className="relative inline-block w-10 h-5 rounded-full bg-gray-800">
                            <input type="checkbox" className="sr-only" id="cmd-task" defaultChecked />
                            <label htmlFor="cmd-task" className="absolute inset-0 rounded-full cursor-pointer">
                              <span className="absolute inset-0 rounded-full bg-pink-500 transition-all duration-300 transform translate-x-0"></span>
                              <span className="absolute left-1 top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 transform translate-x-5"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-black/30 rounded-lg border border-pink-500/20">
                      <h4 className="font-medium mb-2">Custom Voice Commands</h4>
                      <p className="text-sm text-gray-400 mb-3">
                        Add your own custom voice commands
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            placeholder="Command phrase"
                            className="flex-1 bg-black/50 border border-gray-700 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          />
                          <select className="bg-black/50 border border-gray-700 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                            <option value="email">Send Email</option>
                            <option value="meeting">Schedule Meeting</option>
                            <option value="task">Create Task</option>
                            <option value="custom">Custom Action</option>
                          </select>
                        </div>
                        <button className="w-full px-3 py-2 bg-black/50 border border-pink-500/30 rounded-md hover:bg-pink-500/10 transition-all duration-300 text-sm">
                          Add Command
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-black/30 rounded-lg border border-pink-500/20">
                      <h4 className="font-medium mb-2">Voice Feedback</h4>
                      <p className="text-sm text-gray-400 mb-3">
                        Configure when your AI provides voice feedback
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Task completion</span>
                          <div className="relative inline-block w-10 h-5 rounded-full bg-gray-800">
                            <input type="checkbox" className="sr-only" id="feedback-task" defaultChecked />
                            <label htmlFor="feedback-task" className="absolute inset-0 rounded-full cursor-pointer">
                              <span className="absolute inset-0 rounded-full bg-pink-500 transition-all duration-300 transform translate-x-0"></span>
                              <span className="absolute left-1 top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 transform translate-x-5"></span>
                            </label>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">New messages</span>
                          <div className="relative inline-block w-10 h-5 rounded-full bg-gray-800">
                            <input type="checkbox" className="sr-only" id="feedback-messages" defaultChecked />
                            <label htmlFor="feedback-messages" className="absolute inset-0 rounded-full cursor-pointer">
                              <span className="absolute inset-0 rounded-full bg-pink-500 transition-all duration-300 transform translate-x-0"></span>
                              <span className="absolute left-1 top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 transform translate-x-5"></span>
                            </label>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Reminders</span>
                          <div className="relative inline-block w-10 h-5 rounded-full bg-gray-800">
                            <input type="checkbox" className="sr-only" id="feedback-reminders" defaultChecked />
                            <label htmlFor="feedback-reminders" className="absolute inset-0 rounded-full cursor-pointer">
                              <span className="absolute inset-0 rounded-full bg-pink-500 transition-all duration-300 transform translate-x-0"></span>
                              <span className="absolute left-1 top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 transform translate-x-5"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button className="w-full neon-btn">Test Voice Interaction</button>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                <CardHeader>
                  <CardTitle>Voice Preview</CardTitle>
                  <CardDescription>Preview how your AI will sound with current settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-black/30 rounded-lg border border-pink-500/20">
                        <h4 className="font-medium mb-2">Welcome Greeting</h4>
                        <p className="text-sm text-gray-400 mb-3">
                          This is what users will hear when they first visit your site
                        </p>
                        <div className="bg-black/50 p-3 rounded-md border border-gray-800 text-sm">
                          <p>
                            "Hello! I'm Aveline, your AI Intelecx AI. I'm here to assist you with tasks, communications, and project management. How can I help you today?"
                          </p>
                        </div>
                        <button className="mt-3 w-full px-3 py-2 bg-black/50 border border-pink-500/30 rounded-md hover:bg-pink-500/10 transition-all duration-300 text-sm flex items-center justify-center">
                          <Sparkles className="h-4 w-4 mr-2" />
                          Play Greeting
                        </button>
                      </div>

                      <div className="p-4 bg-black/30 rounded-lg border border-pink-500/20">
                        <h4 className="font-medium mb-2">Dashboard Introduction</h4>
                        <p className="text-sm text-gray-400 mb-3">
                          This is what users will hear when visiting the dashboard
                        </p>
                        <div className="bg-black/50 p-3 rounded-md border border-gray-800 text-sm">
                          <p>
                            "Welcome to your dashboard. You have 3 pending tasks and 2 unread messages. Your productivity score is 78%, which is 12% higher than last week. Would you like me to summarize your day?"
                          </p>
                        </div>
                        <button className="mt-3 w-full px-3 py-2 bg-black/50 border border-pink-500/30 rounded-md hover:bg-pink-500/10 transition-all duration-300 text-sm flex items-center justify-center">
                          <Sparkles className="h-4 w-4 mr-2" />
                          Play Introduction
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-black/30 rounded-lg border border-purple-500/20">
                      <h4 className="font-medium flex items-center mb-2">
                        <Bot className="h-4 w-4 text-purple-500 mr-2" />
                        Custom Voice Sample
                      </h4>
                      <p className="text-sm text-gray-400 mb-3">
                        Enter text to hear how it sounds with your current voice settings
                      </p>
                      <textarea
                        placeholder="Enter text to hear with your current voice settings..."
                        className="w-full h-20 bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent mb-3"
                      ></textarea>
                      <button className="w-full px-3 py-2 bg-black/50 border border-purple-500/30 rounded-md hover:bg-purple-500/10 transition-all duration-300 text-sm flex items-center justify-center">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Play Custom Text
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="privacy">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                  <CardDescription>Control your data and AI access</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-medium">Access Control</h4>
                      <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-800">
                        <div>
                          <h5 className="font-medium">Email Access</h5>
                          <p className="text-xs text-gray-400">Allow AI to access your email</p>
                        </div>
                        <div className="relative inline-block w-10 h-5 rounded-full bg-gray-800">
                          <input
                            type="checkbox"
                            className="sr-only"
                            id="toggle-email-access"
                            checked={accessSettings.email}
                            onChange={() => handleAccessToggle("email")}
                          />
                          <label htmlFor="toggle-email-access" className="absolute inset-0 rounded-full cursor-pointer">
                            <span
                              className={`absolute inset-0 rounded-full ${
                                accessSettings.email ? "bg-pink-500" : "bg-gray-800"
                              } transition-all duration-300 transform translate-x-0`}
                            ></span>
                            <span
                              className={`absolute left-1 top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 transform ${
                                accessSettings.email ? "translate-x-5" : "translate-x-0"
                              }`}
                            ></span>
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-800">
                        <div>
                          <h5 className="font-medium">Calendar Access</h5>
                          <p className="text-xs text-gray-400">Allow AI to access your calendar</p>
                        </div>
                        <div className="relative inline-block w-10 h-5 rounded-full bg-gray-800">
                          <input
                            type="checkbox"
                            className="sr-only"
                            id="toggle-calendar-access"
                            checked={accessSettings.calendar}
                            onChange={() => handleAccessToggle("calendar")}
                          />
                          <label
                            htmlFor="toggle-calendar-access"
                            className="absolute inset-0 rounded-full cursor-pointer"
                          >
                            <span
                              className={`absolute inset-0 rounded-full ${
                                accessSettings.calendar ? "bg-pink-500" : "bg-gray-800"
                              } transition-all duration-300 transform translate-x-0`}
                            ></span>
                            <span
                              className={`absolute left-1 top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 transform ${
                                accessSettings.calendar ? "translate-x-5" : "translate-x-0"
                              }`}
                            ></span>
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-800">
                        <div>
                          <h5 className="font-medium">Document Access</h5>
                          <p className="text-xs text-gray-400">Allow AI to access your documents</p>
                        </div>
                        <div className="relative inline-block w-10 h-5 rounded-full bg-gray-800">
                          <input
                            type="checkbox"
                            className="sr-only"
                            id="toggle-doc-access"
                            checked={accessSettings.documents}
                            onChange={() => handleAccessToggle("documents")}
                          />
                          <label htmlFor="toggle-doc-access" className="absolute inset-0 rounded-full cursor-pointer">
                            <span
                              className={`absolute inset-0 rounded-full ${
                                accessSettings.documents ? "bg-pink-500" : "bg-gray-800"
                              } transition-all duration-300 transform translate-x-0`}
                            ></span>
                            <span
                              className={`absolute left-1 top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 transform ${
                                accessSettings.documents ? "translate-x-5" : "translate-x-0"
                              }`}
                            ></span>
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-800">
                        <div>
                          <h5 className="font-medium">Contacts Access</h5>
                          <p className="text-xs text-gray-400">Allow AI to access your contacts</p>
                        </div>
                        <div className="relative inline-block w-10 h-5 rounded-full bg-gray-800">
                          <input
                            type="checkbox"
                            className="sr-only"
                            id="toggle-contacts-access"
                            checked={accessSettings.contacts}
                            onChange={() => handleAccessToggle("contacts")}
                          />
                          <label
                            htmlFor="toggle-contacts-access"
                            className="absolute inset-0 rounded-full cursor-pointer"
                          >
                            <span
                              className={`absolute inset-0 rounded-full ${
                                accessSettings.contacts ? "bg-pink-500" : "bg-gray-800"
                              } transition-all duration-300 transform translate-x-0`}
                            ></span>
                            <span
                              className={`absolute left-1 top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 transform ${
                                accessSettings.contacts ? "translate-x-5" : "translate-x-0"
                              }`}
                            ></span>
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-800">
                        <div>
                          <h5 className="font-medium">Financial Data Access</h5>
                          <p className="text-xs text-gray-400">Allow AI to access financial information</p>
                        </div>
                        <div className="relative inline-block w-10 h-5 rounded-full bg-gray-800">
                          <input
                            type="checkbox"
                            className="sr-only"
                            id="toggle-financial-access"
                            checked={accessSettings.financials}
                            onChange={() => handleAccessToggle("financials")}
                          />
                          <label
                            htmlFor="toggle-financial-access"
                            className="absolute inset-0 rounded-full cursor-pointer"
                          >
                            <span
                              className={`absolute inset-0 rounded-full ${
                                accessSettings.financials ? "bg-pink-500" : "bg-gray-800"
                              } transition-all duration-300 transform translate-x-0`}
                            ></span>
                            <span
                              className={`absolute left-1 top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 transform ${
                                accessSettings.financials ? "translate-x-5" : "translate-x-0"
                              }`}
                            ></span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-black/30 rounded-lg border border-pink-500/20">
                      <h4 className="font-medium flex items-center mb-2">
                        <Lock className="h-4 w-4 text-pink-500 mr-2" />
                        Security Level
                      </h4>
                      <p className="text-sm text-gray-400 mb-3">
                        Set the security level for your AI assistant
                      </p>
                      <select className="w-full bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                        <option value="standard">Standard</option>
                        <option value="high" selected>High</option>
                        <option value="maximum">Maximum</option>
                      </select>
                      <p className="text-xs text-gray-400 mt-2">
                        High security requires additional verification for sensitive operations.
                      </p>
                    </div>

                    <button className="w-full cybr-btn">Save Privacy Settings</button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Manage your AI's data and learning history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 bg-black/30 rounded-lg border border-pink-500/20">
                      <h4 className="font-medium mb-2">Data Storage</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Used Storage</span>
                          <span>1.2 GB / 5 GB</span>
                        </div>
                        <Progress value={24} className="h-2" />
                        <p className="text-xs text-gray-400">
                          Your AI's learning data and conversation history
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <button className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-md hover:border-pink-500/30 transition-colors text-left flex items-center">
                        <Download className="h-4 w-4 text-pink-500 mr-2" />
                        Download Your Data
                      </button>

                      <button className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-md hover:border-pink-500/30 transition-colors text-left flex items-center">
                        <RefreshCw className="h-4 w-4 text-pink-500 mr-2" />
                        Sync Data
                      </button>

                      <button className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-md hover:border-pink-500/30 transition-colors text-left flex items-center">
                        <Trash2 className="h-4 w-4 text-pink-500 mr-2" />
                        Delete Learning Data
                      </button>

                      <button
                        onClick={handleResetAI}
                        className="w-full px-4 py-2 bg-black/50 border border-red-500/30 rounded-md hover:border-red-500/50 transition-colors text-left flex items-center"
                      >
                        <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                        Reset AI Completely
                      </button>
                    </div>

                    <div className="p-4 bg-black/30 rounded-lg border border-pink-500/20">
                      <h4 className="font-medium mb-2">Data Retention Policy</h4>
                      <p className="text-sm text-gray-400 mb-3">
                        Control how long your data is stored
                      </p>
                      <select className="w-full bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                        <option value="30">30 days</option>
                        <option value="90">90 days</option>
                        <option value="180" selected>180 days</option>
                        <option value="365">1 year</option>
                        <option value="forever">Forever</option>
                      </select>
                      <p className="text-xs text-gray-400 mt-2">
                        Data older than this will be automatically deleted.
                      </p>
                </div>
                </div>
               </CardContent>
               </Card>
               </div>
               </TabsContent>
               </Tabs>
               </div>
               </DashboardLayout>
  )
}
