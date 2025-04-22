"use client"

import { useState } from "react"
import {
  FileText,
  Mail,
  Calendar,
  Clock,
  Check,
  X,
  Plus,
  Filter,
  Search,
  ChevronDown,
  Bot,
  Zap,
  AlertCircle,
} from "lucide-react"
import DashboardLayout from "../components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TasksPage() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Respond to client email",
      description: "Draft a response to the client inquiry about project timeline",
      dueDate: "Today, 5:00 PM",
      priority: "high",
      status: "in-progress",
      type: "email",
      assignedTo: "me",
      icon: <Mail className="h-5 w-5 text-pink-500" />,
    },
    {
      id: 2,
      title: "Prepare weekly report",
      description: "Compile data and create the weekly progress report",
      dueDate: "Tomorrow, 10:00 AM",
      priority: "medium",
      status: "not-started",
      type: "document",
      assignedTo: "me",
      icon: <FileText className="h-5 w-5 text-purple-500" />,
    },
    {
      id: 3,
      title: "Team meeting",
      description: "Discuss project progress and next steps with the team",
      dueDate: "Wed, 2:00 PM",
      priority: "medium",
      status: "not-started",
      type: "meeting",
      assignedTo: "me",
      icon: <Calendar className="h-5 w-5 text-blue-500" />,
    },
    {
      id: 4,
      title: "Review design mockups",
      description: "Provide feedback on the new design mockups",
      dueDate: "Thu, 3:00 PM",
      priority: "low",
      status: "not-started",
      type: "review",
      assignedTo: "me",
      icon: <FileText className="h-5 w-5 text-green-500" />,
    },
    {
      id: 5,
      title: "Client presentation",
      description: "Prepare and deliver presentation to the client",
      dueDate: "Fri, 11:00 AM",
      priority: "high",
      status: "not-started",
      type: "presentation",
      assignedTo: "me",
      icon: <FileText className="h-5 w-5 text-orange-500" />,
    },
  ])

  const [automatedTasks, setAutomatedTasks] = useState([
    {
      id: 101,
      title: "Email follow-up",
      description: "Sent follow-up email to marketing team about campaign results",
      completedDate: "Today, 2:30 PM",
      type: "email",
      icon: <Mail className="h-5 w-5 text-pink-500" />,
      aiAction: "Sent a reminder email with a summary of pending items",
    },
    {
      id: 102,
      title: "Meeting notes",
      description: "Compiled and distributed meeting notes from yesterday's call",
      completedDate: "Today, 10:15 AM",
      type: "document",
      icon: <FileText className="h-5 w-5 text-purple-500" />,
      aiAction: "Transcribed audio, formatted key points, and shared with participants",
    },
    {
      id: 103,
      title: "Calendar organization",
      description: "Rescheduled conflicting meetings and optimized your calendar",
      completedDate: "Yesterday, 4:45 PM",
      type: "calendar",
      icon: <Calendar className="h-5 w-5 text-blue-500" />,
      aiAction: "Resolved scheduling conflicts and grouped related meetings",
    },
  ])

  const [completedTasks, setCompletedTasks] = useState([
    {
      id: 201,
      title: "Project proposal",
      description: "Created and submitted the project proposal document",
      completedDate: "Yesterday",
      type: "document",
      icon: <FileText className="h-5 w-5 text-purple-500" />,
    },
    {
      id: 202,
      title: "Client call",
      description: "Discussed project requirements with the client",
      completedDate: "2 days ago",
      type: "meeting",
      icon: <Calendar className="h-5 w-5 text-blue-500" />,
    },
    {
      id: 203,
      title: "Budget review",
      description: "Reviewed and approved the project budget",
      completedDate: "3 days ago",
      type: "review",
      icon: <FileText className="h-5 w-5 text-green-500" />,
    },
  ])

  const [showNewTaskForm, setShowNewTaskForm] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    type: "task",
  })

  const handleAddTask = () => {
    if (!newTask.title) return

    const task = {
      id: Date.now(),
      ...newTask,
      status: "not-started",
      assignedTo: "me",
      icon: <FileText className="h-5 w-5 text-purple-500" />,
    }

    setTasks([task, ...tasks])
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
      type: "task",
    })
    setShowNewTaskForm(false)
  }

  const handleCompleteTask = (id) => {
    const task = tasks.find((t) => t.id === id)
    if (!task) return

    const completedTask = {
      ...task,
      completedDate: "Just now",
    }

    setCompletedTasks([completedTask, ...completedTasks])
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const handleAssignToAI = (id) => {
    const task = tasks.find((t) => t.id === id)
    if (!task) return

    // Remove from tasks
    setTasks(tasks.filter((t) => t.id !== id))

    // Add to automated tasks after a delay to simulate AI processing
    setTimeout(() => {
      const automatedTask = {
        id: task.id,
        title: task.title,
        description: task.description,
        completedDate: "Just now",
        type: task.type,
        icon: task.icon,
        aiAction: "Task automatically processed and completed",
      }

      setAutomatedTasks([automatedTask, ...automatedTasks])
    }, 2000)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Task Management</h1>
            <p className="text-gray-400">Manage your tasks and let your AI handle the routine ones</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => setShowNewTaskForm(true)}
              className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-all duration-300 flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Task
            </button>
          </div>
        </div>

        {/* New Task Form */}
        {showNewTaskForm && (
          <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
            <CardHeader>
              <CardTitle>Create New Task</CardTitle>
              <CardDescription>Add details for your new task</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Task Title</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Enter task title"
                    className="w-full bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Enter task description"
                    className="w-full h-20 bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Due Date</label>
                    <input
                      type="text"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      placeholder="e.g., Tomorrow, 5:00 PM"
                      className="w-full bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Priority</label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                      className="w-full bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Type</label>
                    <select
                      value={newTask.type}
                      onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
                      className="w-full bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="task">Task</option>
                      <option value="email">Email</option>
                      <option value="meeting">Meeting</option>
                      <option value="document">Document</option>
                      <option value="review">Review</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    onClick={() => setShowNewTaskForm(false)}
                    className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddTask}
                    className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                  >
                    Create Task
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Task Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              className="bg-black/30 border border-gray-700 text-white text-sm rounded-lg block w-full pl-10 p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div className="flex space-x-3 w-full md:w-auto">
            <button className="px-3 py-2 bg-black/30 border border-gray-700 rounded-md hover:border-pink-500/30 transition-colors flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>

            <select className="bg-black/30 border border-gray-700 text-white text-sm rounded-lg block p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
              <option value="all">All Types</option>
              <option value="email">Email</option>
              <option value="document">Document</option>
              <option value="meeting">Meeting</option>
              <option value="review">Review</option>
            </select>

            <select className="bg-black/30 border border-gray-700 text-white text-sm rounded-lg block p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Tasks Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8 bg-black/50 border border-pink-500/20">
            <TabsTrigger value="active" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              Active Tasks
            </TabsTrigger>
            <TabsTrigger value="automated" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              AI Automated
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              Completed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="space-y-4">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <Card
                    key={task.id}
                    className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex items-start">
                          <div className="mr-4 mt-1">{task.icon}</div>
                          <div>
                            <h3 className="text-lg font-medium">{task.title}</h3>
                            <p className="text-gray-400 text-sm mt-1">{task.description}</p>

                            <div className="flex flex-wrap gap-2 mt-3">
                              <div className="flex items-center text-xs text-gray-400">
                                <Clock className="h-3 w-3 mr-1" />
                                {task.dueDate}
                              </div>

                              <div
                                className={`px-2 py-0.5 rounded-full text-xs ${
                                  task.priority === "high"
                                    ? "bg-red-900/30 text-red-400"
                                    : task.priority === "medium"
                                      ? "bg-yellow-900/30 text-yellow-400"
                                      : "bg-green-900/30 text-green-400"
                                }`}
                              >
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                              </div>

                              <div
                                className={`px-2 py-0.5 rounded-full text-xs ${
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

                              <div className="px-2 py-0.5 rounded-full text-xs bg-gray-800 text-gray-300">
                                {task.type}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex mt-4 md:mt-0 space-x-2">
                          <button
                            onClick={() => handleAssignToAI(task.id)}
                            className="px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors flex items-center text-sm"
                          >
                            <Bot className="h-4 w-4 mr-1" />
                            Assign to AI
                          </button>
                          <button
                            onClick={() => handleCompleteTask(task.id)}
                            className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center text-sm"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Complete
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="px-3 py-1 bg-black border border-pink-500/30 rounded-md hover:bg-pink-500/10 transition-colors flex items-center text-sm"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mb-4">
                    <Check className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">All Caught Up!</h3>
                  <p className="text-gray-400 max-w-md">
                    You have no active tasks at the moment. Add a new task or let your AI assistant handle your routine
                    tasks.
                  </p>
                  <button
                    onClick={() => setShowNewTaskForm(true)}
                    className="mt-6 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors flex items-center"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add New Task
                  </button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="automated">
            <div className="space-y-4">
              {automatedTasks.length > 0 ? (
                automatedTasks.map((task) => (
                  <Card
                    key={task.id}
                    className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex items-start">
                          <div className="mr-4 mt-1">{task.icon}</div>
                          <div>
                            <div className="flex items-center">
                              <h3 className="text-lg font-medium">{task.title}</h3>
                              <div className="ml-3 px-2 py-0.5 rounded-full bg-purple-900/30 text-purple-400 text-xs flex items-center">
                                <Zap className="h-3 w-3 mr-1" /> AI Automated
                              </div>
                            </div>
                            <p className="text-gray-400 text-sm mt-1">{task.description}</p>

                            <div className="mt-3 p-2 bg-black/30 rounded-md border border-purple-500/20">
                              <div className="flex items-center mb-1">
                                <Bot className="h-3 w-3 text-purple-500 mr-1" />
                                <span className="text-xs text-purple-400">AI Action:</span>
                              </div>
                              <p className="text-xs text-gray-300">{task.aiAction}</p>
                            </div>

                            <div className="flex items-center text-xs text-gray-400 mt-3">
                              <Clock className="h-3 w-3 mr-1" />
                              Completed: {task.completedDate}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mb-4">
                    <Bot className="h-8 w-8 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Automated Tasks Yet</h3>
                  <p className="text-gray-400 max-w-md">
                    Your AI assistant hasn't automated any tasks yet. Assign tasks to your AI to see them here.
                  </p>
                  <button className="mt-6 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors flex items-center">
                    <Zap className="h-5 w-5 mr-2" />
                    Configure AI Automation
                  </button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="space-y-4">
              {completedTasks.length > 0 ? (
                completedTasks.map((task) => (
                  <Card
                    key={task.id}
                    className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1">{task.icon}</div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium">{task.title}</h3>
                            <div className="ml-3 px-2 py-0.5 rounded-full bg-green-900/30 text-green-400 text-xs flex items-center">
                              <Check className="h-3 w-3 mr-1" /> Completed
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm mt-1">{task.description}</p>

                          <div className="flex items-center text-xs text-gray-400 mt-3">
                            <Clock className="h-3 w-3 mr-1" />
                            Completed: {task.completedDate}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mb-4">
                    <AlertCircle className="h-8 w-8 text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Completed Tasks</h3>
                  <p className="text-gray-400 max-w-md">
                    You haven't completed any tasks yet. Complete tasks to see them here.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
