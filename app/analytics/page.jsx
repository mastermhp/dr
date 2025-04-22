"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  Calendar,
  Clock,
  Download,
  Filter,
  BarChart2,
  PieChartIcon,
  TrendingUp,
  Bot,
  Zap,
  RefreshCw,
} from "lucide-react"
import DashboardLayout from "../components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("week")

  // Sample data for charts
  const taskCompletionData = [
    { name: "Mon", completed: 5, automated: 3 },
    { name: "Tue", completed: 7, automated: 4 },
    { name: "Wed", completed: 4, automated: 6 },
    { name: "Thu", completed: 8, automated: 5 },
    { name: "Fri", completed: 6, automated: 7 },
    { name: "Sat", completed: 3, automated: 2 },
    { name: "Sun", completed: 2, automated: 1 },
  ]

  const productivityData = [
    { name: "Mon", productivity: 65 },
    { name: "Tue", productivity: 72 },
    { name: "Wed", productivity: 68 },
    { name: "Thu", productivity: 85 },
    { name: "Fri", productivity: 78 },
    { name: "Sat", productivity: 60 },
    { name: "Sun", productivity: 55 },
  ]

  const taskTypeData = [
    { name: "Emails", value: 35 },
    { name: "Meetings", value: 25 },
    { name: "Documents", value: 20 },
    { name: "Research", value: 15 },
    { name: "Other", value: 5 },
  ]

  const timeDistributionData = [
    { name: "Productive", value: 65 },
    { name: "Meetings", value: 20 },
    { name: "Breaks", value: 10 },
    { name: "Distractions", value: 5 },
  ]

  const aiEfficiencyData = [
    { name: "Mon", manual: 4, ai: 2 },
    { name: "Tue", manual: 3.5, ai: 1.5 },
    { name: "Wed", manual: 5, ai: 1.8 },
    { name: "Thu", manual: 4.2, ai: 1.2 },
    { name: "Fri", manual: 3.8, ai: 1 },
    { name: "Sat", manual: 2, ai: 0.8 },
    { name: "Sun", manual: 1.5, ai: 0.5 },
  ]

  const COLORS = ["#ff1493", "#9c27b0", "#3f51b5", "#2196f3", "#009688"]
  const TIME_COLORS = ["#4caf50", "#ff9800", "#2196f3", "#f44336"]

  const formatTooltipValue = (value) => {
    return `${value} hrs`
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-gray-400">Track your productivity and AI automation efficiency</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <div className="flex items-center space-x-2">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-black/30 border border-gray-700 text-white text-sm rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              <button className="p-2 bg-black/30 border border-gray-700 rounded-lg hover:border-pink-500/30 transition-colors">
                <Filter className="h-5 w-5 text-gray-400" />
              </button>
              <button className="p-2 bg-black/30 border border-gray-700 rounded-lg hover:border-pink-500/30 transition-colors">
                <Download className="h-5 w-5 text-gray-400" />
              </button>
              <button className="p-2 bg-black/30 border border-gray-700 rounded-lg hover:border-pink-500/30 transition-colors">
                <RefreshCw className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                Productivity Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">78%</div>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from last week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Clock className="h-5 w-5 text-blue-500 mr-2" />
                Time Saved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">14.5 hrs</div>
              <p className="text-xs text-blue-500 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +3.2 hrs from last week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Bot className="h-5 w-5 text-purple-500 mr-2" />
                AI Automation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">65%</div>
              <p className="text-xs text-purple-500 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8% from last week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Calendar className="h-5 w-5 text-pink-500 mr-2" />
                Tasks Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">42</div>
              <p className="text-xs text-pink-500 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15 from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="productivity" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8 bg-black/50 border border-pink-500/20">
            <TabsTrigger
              value="productivity"
              className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
            >
              <BarChart2 className="h-4 w-4 mr-2" />
              Productivity
            </TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              <PieChartIcon className="h-4 w-4 mr-2" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="ai" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              <Bot className="h-4 w-4 mr-2" />
              AI Efficiency
            </TabsTrigger>
          </TabsList>

          <TabsContent value="productivity">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                <CardHeader>
                  <CardTitle>Productivity Score</CardTitle>
                  <CardDescription>Your daily productivity score over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={productivityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="name" stroke="#888" />
                        <YAxis stroke="#888" domain={[0, 100]} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#222", borderColor: "#444" }}
                          formatter={(value) => [`${value}%`, "Productivity"]}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="productivity"
                          stroke="#ff1493"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                <CardHeader>
                  <CardTitle>Time Distribution</CardTitle>
                  <CardDescription>How your time is distributed across activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={timeDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {timeDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={TIME_COLORS[index % TIME_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, "Time Spent"]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tasks">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                <CardHeader>
                  <CardTitle>Task Completion</CardTitle>
                  <CardDescription>Manual vs AI-automated task completion</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={taskCompletionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="name" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip contentStyle={{ backgroundColor: "#222", borderColor: "#444" }} />
                        <Legend />
                        <Bar dataKey="completed" name="Manual" fill="#ff1493" />
                        <Bar dataKey="automated" name="Automated" fill="#9c27b0" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                <CardHeader>
                  <CardTitle>Task Types</CardTitle>
                  <CardDescription>Distribution of tasks by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={taskTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {taskTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, "Tasks"]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                <CardHeader>
                  <CardTitle>Time Efficiency</CardTitle>
                  <CardDescription>Time spent on tasks: Manual vs AI-assisted</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={aiEfficiencyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="name" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#222", borderColor: "#444" }}
                          formatter={formatTooltipValue}
                        />
                        <Legend />
                        <Bar dataKey="manual" name="Manual Time" fill="#f44336" />
                        <Bar dataKey="ai" name="AI-assisted Time" fill="#4caf50" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                <CardHeader>
                  <CardTitle>AI Insights</CardTitle>
                  <CardDescription>AI-generated productivity insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-black/30 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                      <h4 className="font-medium flex items-center">
                        <Bot className="h-4 w-4 text-purple-500 mr-2" />
                        Peak Productivity Times
                      </h4>
                      <p className="text-sm text-gray-400 mt-1">
                        Your productivity peaks between 9:00 AM and 11:30 AM. Consider scheduling your most important
                        tasks during this time window.
                      </p>
                    </div>

                    <div className="p-3 bg-black/30 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                      <h4 className="font-medium flex items-center">
                        <Bot className="h-4 w-4 text-purple-500 mr-2" />
                        Meeting Efficiency
                      </h4>
                      <p className="text-sm text-gray-400 mt-1">
                        Your meetings are 35% more efficient when scheduled in the afternoon. Morning meetings tend to
                        run over time.
                      </p>
                    </div>

                    <div className="p-3 bg-black/30 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                      <h4 className="font-medium flex items-center">
                        <Bot className="h-4 w-4 text-purple-500 mr-2" />
                        Email Management
                      </h4>
                      <p className="text-sm text-gray-400 mt-1">
                        AI automation has reduced your email processing time by 68%. Consider increasing automation
                        level for routine emails.
                      </p>
                    </div>

                    <div className="p-3 bg-black/30 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                      <h4 className="font-medium flex items-center">
                        <Bot className="h-4 w-4 text-purple-500 mr-2" />
                        Task Optimization
                      </h4>
                      <p className="text-sm text-gray-400 mt-1">
                        Grouping similar tasks together could increase your efficiency by an estimated 22%. Try batching
                        tasks by category.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* AI Recommendations */}
        <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 text-purple-500 mr-2" />
              AI Productivity Recommendations
            </CardTitle>
            <CardDescription>Personalized suggestions to improve your productivity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-black/30 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <h4 className="font-medium flex items-center mb-2">
                  <Bot className="h-5 w-5 text-purple-500 mr-2" />
                  Schedule Optimization
                </h4>
                <p className="text-sm text-gray-400 mb-3">
                  Your calendar shows frequent context switching. Try grouping similar meetings and tasks together to
                  reduce mental overhead.
                </p>
                <button className="w-full px-3 py-2 bg-black/50 border border-purple-500/30 rounded-md hover:bg-purple-500/10 transition-all duration-300 text-sm">
                  Optimize Schedule
                </button>
              </div>

              <div className="p-4 bg-black/30 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <h4 className="font-medium flex items-center mb-2">
                  <Bot className="h-5 w-5 text-purple-500 mr-2" />
                  Email Automation
                </h4>
                <p className="text-sm text-gray-400 mb-3">
                  You spend 2.5 hours per week on routine emails. Increasing AI automation could save you up to 2 hours
                  weekly.
                </p>
                <button className="w-full px-3 py-2 bg-black/50 border border-purple-500/30 rounded-md hover:bg-purple-500/10 transition-all duration-300 text-sm">
                  Enhance Email Automation
                </button>
              </div>

              <div className="p-4 bg-black/30 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <h4 className="font-medium flex items-center mb-2">
                  <Bot className="h-5 w-5 text-purple-500 mr-2" />
                  Focus Time
                </h4>
                <p className="text-sm text-gray-400 mb-3">
                  Adding 2 hours of uninterrupted focus time per day could increase your productivity score by an
                  estimated 15%.
                </p>
                <button className="w-full px-3 py-2 bg-black/50 border border-purple-500/30 rounded-md hover:bg-purple-500/10 transition-all duration-300 text-sm">
                  Schedule Focus Time
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
