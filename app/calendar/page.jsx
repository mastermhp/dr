"use client"

import { useState } from "react"
import {
  CalendarIcon,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Users,
  Video,
  MapPin,
  Bot,
  Zap,
} from "lucide-react"
import DashboardLayout from "../components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [showEventForm, setShowEventForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Team Meeting",
      description: "Weekly team sync to discuss project progress",
      date: new Date(2023, 10, 15, 10, 0),
      endDate: new Date(2023, 10, 15, 11, 0),
      type: "meeting",
      location: "Conference Room A",
      participants: ["Alex Johnson", "Sarah Williams", "Michael Brown"],
      isVirtual: true,
      virtualLink: "https://meet.example.com/team-123",
    },
    {
      id: 2,
      title: "Client Presentation",
      description: "Present the new product features to the client",
      date: new Date(2023, 10, 17, 14, 0),
      endDate: new Date(2023, 10, 17, 15, 30),
      type: "presentation",
      location: "Main Office",
      participants: ["Alex Johnson", "Client Team"],
      isVirtual: false,
    },
    {
      id: 3,
      title: "Project Deadline",
      description: "Submit the final project deliverables",
      date: new Date(2023, 10, 20, 17, 0),
      endDate: new Date(2023, 10, 20, 17, 0),
      type: "deadline",
      location: "",
      participants: ["Alex Johnson"],
      isVirtual: false,
    },
    {
      id: 4,
      title: "AI-Scheduled: Marketing Meeting",
      description: "Your AI assistant scheduled this meeting based on your availability",
      date: new Date(2023, 10, 18, 11, 0),
      endDate: new Date(2023, 10, 18, 12, 0),
      type: "ai-scheduled",
      location: "Virtual",
      participants: ["Alex Johnson", "Marketing Team"],
      isVirtual: true,
      virtualLink: "https://meet.example.com/marketing-456",
      aiScheduled: true,
    },
  ])

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: new Date(),
    endDate: new Date(new Date().setHours(new Date().getHours() + 1)),
    type: "meeting",
    location: "",
    participants: ["Alex Johnson"],
    isVirtual: false,
    virtualLink: "",
  })

  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()

    const days = []

    // Add empty days for the start of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: null, date: null })
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i)
      days.push({
        day: i,
        date: currentDate,
        events: events.filter(
          (event) => event.date.getDate() === i && event.date.getMonth() === month && event.date.getFullYear() === year,
        ),
      })
    }

    return days
  }

  const days = getDaysInMonth(currentMonth)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const handleDateClick = (date) => {
    if (!date) return
    setSelectedDate(date)
    setNewEvent({
      ...newEvent,
      date: new Date(date.setHours(9, 0, 0, 0)),
      endDate: new Date(date.setHours(10, 0, 0, 0)),
    })
  }

  const handleAddEvent = () => {
    if (!newEvent.title) return

    const event = {
      id: Date.now(),
      ...newEvent,
    }

    setEvents([...events, event])
    setShowEventForm(false)
    setNewEvent({
      title: "",
      description: "",
      date: new Date(),
      endDate: new Date(new Date().setHours(new Date().getHours() + 1)),
      type: "meeting",
      location: "",
      participants: ["Alex Johnson"],
      isVirtual: false,
      virtualLink: "",
    })
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  const getEventsByDate = (date) => {
    if (!date) return []

    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    )
  }

  const todayEvents = getEventsByDate(new Date())
  const selectedDateEvents = selectedDate ? getEventsByDate(selectedDate) : []

  const handleAISchedule = () => {
    // Simulate AI scheduling a meeting
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(10, 0, 0, 0)

    const aiEvent = {
      id: Date.now(),
      title: "AI-Scheduled: Team Check-in",
      description: "Your AI assistant scheduled this meeting based on team availability",
      date: tomorrow,
      endDate: new Date(tomorrow.getTime() + 60 * 60 * 1000), // 1 hour later
      type: "ai-scheduled",
      location: "Virtual",
      participants: ["Alex Johnson", "Team Members"],
      isVirtual: true,
      virtualLink: "https://meet.example.com/ai-scheduled",
      aiScheduled: true,
    }

    setEvents([...events, aiEvent])

    // Show confirmation message
    alert("Your AI assistant has scheduled a team check-in for tomorrow at 10:00 AM")
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Calendar</h1>
            <p className="text-gray-400">Manage your schedule and let your AI optimize your time</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button
              onClick={() => setShowEventForm(true)}
              className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-all duration-300 flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Event
            </button>
            <button
              onClick={handleAISchedule}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-all duration-300 flex items-center"
            >
              <Bot className="h-5 w-5 mr-2" />
              AI Schedule
            </button>
          </div>
        </div>

        {/* New Event Form */}
        {showEventForm && (
          <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
            <CardHeader>
              <CardTitle>Create New Event</CardTitle>
              <CardDescription>Add details for your new calendar event</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Event Title</label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="Enter event title"
                    className="w-full bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="Enter event description"
                    className="w-full h-20 bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Date & Time</label>
                    <input
                      type="datetime-local"
                      value={newEvent.date.toISOString().slice(0, 16)}
                      onChange={(e) => setNewEvent({ ...newEvent, date: new Date(e.target.value) })}
                      className="w-full bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">End Date & Time</label>
                    <input
                      type="datetime-local"
                      value={newEvent.endDate.toISOString().slice(0, 16)}
                      onChange={(e) => setNewEvent({ ...newEvent, endDate: new Date(e.target.value) })}
                      className="w-full bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Event Type</label>
                    <select
                      value={newEvent.type}
                      onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                      className="w-full bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="meeting">Meeting</option>
                      <option value="presentation">Presentation</option>
                      <option value="deadline">Deadline</option>
                      <option value="personal">Personal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input
                      type="text"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      placeholder="Enter location"
                      className="w-full bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="isVirtual"
                      checked={newEvent.isVirtual}
                      onChange={(e) => setNewEvent({ ...newEvent, isVirtual: e.target.checked })}
                      className="mr-2"
                    />
                    <label htmlFor="isVirtual" className="text-sm font-medium">
                      Virtual Meeting
                    </label>
                  </div>

                  {newEvent.isVirtual && (
                    <input
                      type="text"
                      value={newEvent.virtualLink}
                      onChange={(e) => setNewEvent({ ...newEvent, virtualLink: e.target.value })}
                      placeholder="Enter meeting link"
                      className="w-full bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  )}
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    onClick={() => setShowEventForm(false)}
                    className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddEvent}
                    className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                  >
                    Create Event
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <button onClick={handlePrevMonth} className="p-1 rounded-full hover:bg-gray-800 transition-colors">
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setCurrentMonth(new Date())}
                      className="px-2 py-1 text-sm bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Today
                    </button>
                    <button onClick={handleNextMonth} className="p-1 rounded-full hover:bg-gray-800 transition-colors">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-gray-400 py-2">
                      {day}
                    </div>
                  ))}

                  {days.map((day, index) => {
                    const isToday =
                      day.date &&
                      day.date.getDate() === new Date().getDate() &&
                      day.date.getMonth() === new Date().getMonth() &&
                      day.date.getFullYear() === new Date().getFullYear()

                    const isSelected =
                      day.date &&
                      selectedDate &&
                      day.date.getDate() === selectedDate.getDate() &&
                      day.date.getMonth() === selectedDate.getMonth() &&
                      day.date.getFullYear() === selectedDate.getFullYear()

                    return (
                      <div
                        key={index}
                        className={`min-h-[100px] p-1 border ${
                          !day.day
                            ? "border-transparent"
                            : isSelected
                              ? "border-pink-500"
                              : isToday
                                ? "border-purple-500/50"
                                : "border-gray-800"
                        } rounded-md ${day.day ? "hover:border-pink-500/50 cursor-pointer" : ""} transition-colors`}
                        onClick={() => day.day && handleDateClick(day.date)}
                      >
                        {day.day && (
                          <>
                            <div className={`text-right text-sm ${isToday ? "text-purple-500 font-bold" : ""}`}>
                              {day.day}
                            </div>
                            <div className="mt-1 space-y-1">
                              {day.events &&
                                day.events.slice(0, 3).map((event) => (
                                  <div
                                    key={event.id}
                                    className={`text-xs p-1 rounded truncate ${
                                      event.aiScheduled
                                        ? "bg-purple-900/30 text-purple-400"
                                        : event.type === "meeting"
                                          ? "bg-blue-900/30 text-blue-400"
                                          : event.type === "presentation"
                                            ? "bg-orange-900/30 text-orange-400"
                                            : event.type === "deadline"
                                              ? "bg-red-900/30 text-red-400"
                                              : "bg-green-900/30 text-green-400"
                                    }`}
                                  >
                                    {formatTime(event.date)} {event.title}
                                  </div>
                                ))}
                              {day.events && day.events.length > 3 && (
                                <div className="text-xs text-gray-400 text-center">+{day.events.length - 3} more</div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            <Tabs defaultValue="today" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4 bg-black/50 border border-pink-500/20">
                <TabsTrigger value="today" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                  Today
                </TabsTrigger>
                <TabsTrigger
                  value="selected"
                  className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
                >
                  {selectedDate ? formatDate(selectedDate) : "Selected"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="today">
                <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CalendarIcon className="h-5 w-5 text-pink-500 mr-2" />
                      Today's Schedule
                    </CardTitle>
                    <CardDescription>{formatDate(new Date())}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {todayEvents.length > 0 ? (
                      <div className="space-y-4">
                        {todayEvents.map((event) => (
                          <div
                            key={event.id}
                            className="p-3 bg-black/30 rounded-lg border border-gray-800 hover:border-pink-500/20 transition-all duration-300"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium">{event.title}</h4>
                              <button className="text-gray-400 hover:text-white">
                                <MoreHorizontal className="h-4 w-4" />
                              </button>
                            </div>
                            <p className="text-sm text-gray-400 mb-3">{event.description}</p>

                            <div className="flex flex-wrap gap-2 text-xs">
                              <div className="flex items-center text-gray-400">
                                <Clock className="h-3 w-3 mr-1" />
                                {formatTime(event.date)} - {formatTime(event.endDate)}
                              </div>

                              {event.location && (
                                <div className="flex items-center text-gray-400">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {event.location}
                                </div>
                              )}

                              {event.participants && event.participants.length > 0 && (
                                <div className="flex items-center text-gray-400">
                                  <Users className="h-3 w-3 mr-1" />
                                  {event.participants.length} participants
                                </div>
                              )}

                              {event.isVirtual && (
                                <div className="flex items-center text-blue-400">
                                  <Video className="h-3 w-3 mr-1" />
                                  Virtual
                                </div>
                              )}

                              {event.aiScheduled && (
                                <div className="flex items-center text-purple-400">
                                  <Bot className="h-3 w-3 mr-1" />
                                  AI Scheduled
                                </div>
                              )}
                            </div>

                            {event.isVirtual && event.virtualLink && (
                              <div className="mt-3">
                                <a
                                  href={event.virtualLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-pink-500 hover:text-pink-400 transition-colors"
                                >
                                  Join Meeting
                                </a>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <CalendarIcon className="h-12 w-12 text-gray-500 mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Events Today</h3>
                        <p className="text-gray-400 text-sm max-w-xs">
                          You have no scheduled events for today. Enjoy your free time!
                        </p>
                        <button
                          onClick={() => setShowEventForm(true)}
                          className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors flex items-center text-sm"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Event
                        </button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="selected">
                <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CalendarIcon className="h-5 w-5 text-pink-500 mr-2" />
                      {selectedDate ? formatDate(selectedDate) : "Select a Date"}
                    </CardTitle>
                    <CardDescription>
                      {selectedDate ? `Events for ${formatDate(selectedDate)}` : "Click on a date to view events"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedDate ? (
                      selectedDateEvents.length > 0 ? (
                        <div className="space-y-4">
                          {selectedDateEvents.map((event) => (
                            <div
                              key={event.id}
                              className="p-3 bg-black/30 rounded-lg border border-gray-800 hover:border-pink-500/20 transition-all duration-300"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">{event.title}</h4>
                                <button className="text-gray-400 hover:text-white">
                                  <MoreHorizontal className="h-4 w-4" />
                                </button>
                              </div>
                              <p className="text-sm text-gray-400 mb-3">{event.description}</p>

                              <div className="flex flex-wrap gap-2 text-xs">
                                <div className="flex items-center text-gray-400">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {formatTime(event.date)} - {formatTime(event.endDate)}
                                </div>

                                {event.location && (
                                  <div className="flex items-center text-gray-400">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {event.location}
                                  </div>
                                )}

                                {event.participants && event.participants.length > 0 && (
                                  <div className="flex items-center text-gray-400">
                                    <Users className="h-3 w-3 mr-1" />
                                    {event.participants.length} participants
                                  </div>
                                )}

                                {event.isVirtual && (
                                  <div className="flex items-center text-blue-400">
                                    <Video className="h-3 w-3 mr-1" />
                                    Virtual
                                  </div>
                                )}

                                {event.aiScheduled && (
                                  <div className="flex items-center text-purple-400">
                                    <Bot className="h-3 w-3 mr-1" />
                                    AI Scheduled
                                  </div>
                                )}
                              </div>

                              {event.isVirtual && event.virtualLink && (
                                <div className="mt-3">
                                  <a
                                    href={event.virtualLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-pink-500 hover:text-pink-400 transition-colors"
                                  >
                                    Join Meeting
                                  </a>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <CalendarIcon className="h-12 w-12 text-gray-500 mb-4" />
                          <h3 className="text-lg font-medium mb-2">No Events</h3>
                          <p className="text-gray-400 text-sm max-w-xs">No events scheduled for this date.</p>
                          <button
                            onClick={() => setShowEventForm(true)}
                            className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors flex items-center text-sm"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Event
                          </button>
                        </div>
                      )
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <CalendarIcon className="h-12 w-12 text-gray-500 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Select a Date</h3>
                        <p className="text-gray-400 text-sm max-w-xs">
                          Click on a date in the calendar to view events for that day.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card className="mt-6 bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 text-purple-500 mr-2" />
                  AI Calendar Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-black/30 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                    <h4 className="font-medium flex items-center">
                      <Bot className="h-4 w-4 text-purple-500 mr-2" />
                      Schedule Optimization
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">
                      Your AI assistant can analyze your calendar and suggest optimal meeting times based on your
                      productivity patterns.
                    </p>
                    <button className="mt-3 w-full px-3 py-2 bg-black/50 border border-purple-500/30 rounded-md hover:bg-purple-500/10 transition-all duration-300 text-sm">
                      Optimize My Schedule
                    </button>
                  </div>

                  <div className="p-3 bg-black/30 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                    <h4 className="font-medium flex items-center">
                      <Bot className="h-4 w-4 text-purple-500 mr-2" />
                      Meeting Scheduler
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">
                      Let your AI coordinate with participants and find the best time for everyone.
                    </p>
                    <button className="mt-3 w-full px-3 py-2 bg-black/50 border border-purple-500/30 rounded-md hover:bg-purple-500/10 transition-all duration-300 text-sm">
                      Schedule a Meeting
                    </button>
                  </div>

                  <div className="p-3 bg-black/30 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                    <h4 className="font-medium flex items-center">
                      <Bot className="h-4 w-4 text-purple-500 mr-2" />
                      Smart Reminders
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">
                      Your AI can set intelligent reminders based on event importance and your preparation needs.
                    </p>
                    <button className="mt-3 w-full px-3 py-2 bg-black/50 border border-purple-500/30 rounded-md hover:bg-purple-500/10 transition-all duration-300 text-sm">
                      Enable Smart Reminders
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
