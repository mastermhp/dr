"use client"

import { useState, useRef, useEffect } from "react"
import {
  Search,
  Plus,
  Phone,
  Video,
  MoreHorizontal,
  Send,
  Paperclip,
  Mic,
  Bot,
  Smile,
  Check,
  CheckCheck,
  Play,
  MessageSquare,
} from "lucide-react"
import DashboardLayout from "../components/dashboard-layout"

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState(null)
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef(null)
  const [isRecording, setIsRecording] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastMessage: "Can you send me the project files?",
      lastMessageTime: "10:30 AM",
      unread: 2,
    },
    {
      id: 2,
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      lastMessage: "Thanks for the update!",
      lastMessageTime: "Yesterday",
      unread: 0,
    },
    {
      id: 3,
      name: "Jessica Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastMessage: "Let's schedule a meeting tomorrow",
      lastMessageTime: "Yesterday",
      unread: 0,
    },
    {
      id: 4,
      name: "David Miller",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "away",
      lastMessage: "I'll check and get back to you",
      lastMessageTime: "Monday",
      unread: 0,
    },
    {
      id: 5,
      name: "AI Assistant",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastMessage: "I've completed the task you assigned",
      lastMessageTime: "Just now",
      unread: 1,
      isAI: true,
    },
  ])

  const [conversations, setConversations] = useState({
    1: [
      {
        id: 1,
        sender: 2,
        text: "Hi Alex, how's the project coming along?",
        time: "10:15 AM",
        status: "read",
      },
      {
        id: 2,
        sender: 1,
        text: "It's going well! I'm working on the final touches.",
        time: "10:18 AM",
        status: "read",
      },
      {
        id: 3,
        sender: 2,
        text: "Great! When do you think you'll be done?",
        time: "10:20 AM",
        status: "read",
      },
      {
        id: 4,
        sender: 1,
        text: "I should be finished by tomorrow afternoon.",
        time: "10:22 AM",
        status: "read",
      },
      {
        id: 5,
        sender: 2,
        text: "Perfect! Can you send me the project files when you're done?",
        time: "10:30 AM",
        status: "delivered",
      },
    ],
    2: [
      {
        id: 1,
        sender: 2,
        text: "Hey, did you get a chance to review the proposal?",
        time: "Yesterday, 3:45 PM",
        status: "read",
      },
      {
        id: 2,
        sender: 1,
        text: "Yes, I did! It looks great.",
        time: "Yesterday, 4:00 PM",
        status: "read",
      },
      {
        id: 3,
        sender: 2,
        text: "Thanks for the update!",
        time: "Yesterday, 4:05 PM",
        status: "read",
      },
    ],
    3: [
      {
        id: 1,
        sender: 2,
        text: "Hi Alex, are you available for a meeting tomorrow?",
        time: "Yesterday, 1:30 PM",
        status: "read",
      },
      {
        id: 2,
        sender: 1,
        text: "Sure, what time works for you?",
        time: "Yesterday, 1:45 PM",
        status: "read",
      },
      {
        id: 3,
        sender: 2,
        text: "How about 10 AM?",
        time: "Yesterday, 2:00 PM",
        status: "read",
      },
      {
        id: 4,
        sender: 1,
        text: "That works for me. Let's schedule it.",
        time: "Yesterday, 2:15 PM",
        status: "read",
      },
      {
        id: 5,
        sender: 2,
        text: "Let's schedule a meeting tomorrow",
        time: "Yesterday, 2:30 PM",
        status: "read",
      },
    ],
    4: [
      {
        id: 1,
        sender: 2,
        text: "Alex, do you have the latest sales numbers?",
        time: "Monday, 9:00 AM",
        status: "read",
      },
      {
        id: 2,
        sender: 1,
        text: "I don't have them yet. I'll need to check with the sales team.",
        time: "Monday, 9:15 AM",
        status: "read",
      },
      {
        id: 3,
        sender: 2,
        text: "Okay, let me know when you have them.",
        time: "Monday, 9:20 AM",
        status: "read",
      },
      {
        id: 4,
        sender: 1,
        text: "I'll check and get back to you",
        time: "Monday, 9:30 AM",
        status: "read",
      },
    ],
    5: [
      {
        id: 1,
        sender: 2,
        text: "Hello Alex, I'm your AI assistant. How can I help you today?",
        time: "Just now",
        status: "read",
        isAI: true,
      },
      {
        id: 2,
        sender: 2,
        text: "I've completed the weekly report you requested. Would you like me to send it to the team?",
        time: "Just now",
        status: "delivered",
        isAI: true,
      },
    ],
  })

  const emojis = ["😊", "👍", "❤️", "🎉", "🔥", "👏", "😂", "🙏", "🤔", "😍"]

  useEffect(() => {
    // Scroll to bottom of messages
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [activeChat, conversations])

  const handleSendMessage = () => {
    if (!message.trim() && !isRecording) return

    const newMessage = {
      id: Date.now(),
      sender: 1, // Current user
      text: isRecording ? "🎤 Voice message (0:07)" : message,
      time: "Just now",
      status: "sent",
      isVoice: isRecording,
    }

    if (activeChat) {
      setConversations({
        ...conversations,
        [activeChat]: [...conversations[activeChat], newMessage],
      })

      // Mark messages as read
      const updatedContacts = contacts.map((contact) => {
        if (contact.id === activeChat) {
          return { ...contact, unread: 0 }
        }
        return contact
      })
      setContacts(updatedContacts)

      // Simulate AI response if messaging the AI Assistant
      if (activeChat === 5) {
        setTimeout(() => {
          const aiResponse = {
            id: Date.now() + 1,
            sender: 5, // AI
            text: isRecording
              ? "I've listened to your voice message. I'll take care of that right away."
              : `I understand you want to ${message.toLowerCase()}. I'll help you with that.`,
            time: "Just now",
            status: "delivered",
            isAI: true,
          }

          setConversations({
            ...conversations,
            [activeChat]: [...conversations[activeChat], newMessage, aiResponse],
          })
        }, 1500)
      }
    }

    setMessage("")
    setIsRecording(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const getContactById = (id) => {
    return contacts.find((contact) => contact.id === id)
  }

  const handleStartRecording = () => {
    setIsRecording(true)
    // In a real app, this would start recording audio
  }

  const handleStopRecording = () => {
    // In a real app, this would stop recording and process the audio
    handleSendMessage()
  }

  const handleEmojiClick = (emoji) => {
    setMessage(message + emoji)
    setShowEmojiPicker(false)
  }

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Contacts Sidebar */}
        <div className="w-full md:w-80 border-r border-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-800">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-black/30 border border-gray-700 text-white text-sm rounded-lg block w-full pl-10 p-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`flex items-center p-4 cursor-pointer hover:bg-gray-900/50 transition-colors ${
                  activeChat === contact.id ? "bg-gray-900/70" : ""
                }`}
                onClick={() => setActiveChat(contact.id)}
              >
                <div className="relative">
                  <img
                    src={contact.avatar || "/placeholder.svg"}
                    alt={contact.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${
                      contact.status === "online"
                        ? "bg-green-500"
                        : contact.status === "away"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                    }`}
                  ></span>
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium flex items-center">
                      {contact.name}
                      {contact.isAI && <Bot className="h-3 w-3 ml-1 text-purple-500" />}
                    </h3>
                    <span className="text-xs text-gray-400">{contact.lastMessageTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-400 truncate max-w-[150px]">{contact.lastMessage}</p>
                    {contact.unread > 0 && (
                      <span className="bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-800">
            <button className="w-full px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors flex items-center justify-center">
              <Plus className="h-5 w-5 mr-2" />
              New Conversation
            </button>
          </div>
        </div>

        {/* Chat Area */}
        {activeChat ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={getContactById(activeChat).avatar || "/placeholder.svg"}
                  alt={getContactById(activeChat).name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <h3 className="font-medium flex items-center">
                    {getContactById(activeChat).name}
                    {getContactById(activeChat).isAI && <Bot className="h-4 w-4 ml-1 text-purple-500" />}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {getContactById(activeChat).status === "online"
                      ? "Online"
                      : getContactById(activeChat).status === "away"
                        ? "Away"
                        : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                  <Phone className="h-5 w-5 text-gray-400" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                  <Video className="h-5 w-5 text-gray-400" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                  <MoreHorizontal className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-900/30">
              <div className="space-y-4">
                {conversations[activeChat].map((msg) => {
                  const isCurrentUser = msg.sender === 1
                  return (
                    <div key={msg.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                      {!isCurrentUser && (
                        <img
                          src={getContactById(activeChat).avatar || "/placeholder.svg"}
                          alt={getContactById(activeChat).name}
                          className="w-8 h-8 rounded-full object-cover mr-2 self-end"
                        />
                      )}
                      <div
                        className={`max-w-[70%] ${
                          isCurrentUser
                            ? "bg-pink-500/20 border border-pink-500/30"
                            : msg.isAI
                              ? "bg-purple-500/20 border border-purple-500/30"
                              : "bg-gray-800/50 border border-gray-700"
                        } rounded-lg p-3`}
                      >
                        {msg.isVoice ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-32 h-8 bg-gray-700/50 rounded-full flex items-center px-2">
                              <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                                <div className="h-full w-3/4 bg-pink-500 rounded-full"></div>
                              </div>
                            </div>
                            <span className="text-xs text-gray-400">0:07</span>
                            <button className="p-1 rounded-full bg-pink-500/20 hover:bg-pink-500/30 transition-colors">
                              <Play className="h-4 w-4 text-pink-500" />
                            </button>
                          </div>
                        ) : (
                          <p className="text-sm">{msg.text}</p>
                        )}
                        <div className="flex justify-end items-center mt-1 space-x-1">
                          <span className="text-xs text-gray-400">{msg.time}</span>
                          {isCurrentUser && (
                            <span>
                              {msg.status === "sent" ? (
                                <Check className="h-3 w-3 text-gray-400" />
                              ) : msg.status === "delivered" ? (
                                <CheckCheck className="h-3 w-3 text-gray-400" />
                              ) : (
                                <CheckCheck className="h-3 w-3 text-blue-400" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                  <Paperclip className="h-5 w-5 text-gray-400" />
                </button>
                <div className="relative flex-1">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isRecording}
                    placeholder={isRecording ? "Recording..." : "Type a message..."}
                    className="w-full bg-black/30 border border-gray-700 rounded-lg py-2 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none h-10 max-h-32 overflow-auto"
                    style={{ minHeight: "40px" }}
                  />
                  <div className="absolute right-2 top-2 flex space-x-1">
                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="p-1 rounded-full hover:bg-gray-800 transition-colors"
                    >
                      <Smile className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                  {showEmojiPicker && (
                    <div className="absolute bottom-12 right-0 bg-gray-900 border border-gray-700 rounded-lg p-2 shadow-lg">
                      <div className="grid grid-cols-5 gap-2">
                        {emojis.map((emoji, index) => (
                          <button
                            key={index}
                            onClick={() => handleEmojiClick(emoji)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-800 rounded transition-colors"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {isRecording ? (
                  <button
                    onClick={handleStopRecording}
                    className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                  >
                    <Mic className="h-5 w-5 text-white" />
                  </button>
                ) : message.trim() ? (
                  <button
                    onClick={handleSendMessage}
                    className="p-2 rounded-full bg-pink-500 hover:bg-pink-600 transition-colors"
                  >
                    <Send className="h-5 w-5 text-white" />
                  </button>
                ) : (
                  <button
                    onClick={handleStartRecording}
                    className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                  >
                    <Mic className="h-5 w-5 text-gray-400" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-900/30">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-medium mb-2">Select a Conversation</h3>
              <p className="text-gray-400 max-w-md">
                Choose a contact from the list to start messaging or create a new conversation.
              </p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
