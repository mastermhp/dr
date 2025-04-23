"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  FileText,
  Calendar,
  MessageSquare,
  Check,
  X,
  Clock,
  Send,
  Zap,
  Bot,
  AlertCircle,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TaskSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "ai",
      content:
        "Hello! I'm your Intelecx AI. I've received a job offer from tech-recruiter@company.com. Would you like me to draft a response?",
    },
    {
      sender: "user",
      content:
        "Yes, please draft a polite response asking about the salary range and remote work options.",
    },
    {
      sender: "ai",
      content:
        "I've drafted a response: \"Thank you for the job offer! I'm excited about the opportunity to join your team as a Senior Developer. Before proceeding, I'd like to inquire about the salary range for this position and the remote work policy. Looking forward to your response.\" Would you like me to send this, or would you like to make any changes?",
    },
  ]);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      type: "email",
      icon: <Mail className="h-5 w-5 text-pink-500" />,
      title: "Job Offer Response",
      from: "tech-recruiter@company.com",
      time: "10:30 AM",
      status: "pending",
      preview: "We're excited to offer you the position of Senior Developer...",
    },
    {
      id: 2,
      type: "document",
      icon: <FileText className="h-5 w-5 text-purple-500" />,
      title: "Weekly Report",
      from: "manager@company.com",
      time: "Yesterday",
      status: "completed",
      preview:
        "Please prepare the weekly progress report for the client meeting...",
    },
    {
      id: 3,
      type: "calendar",
      icon: <Calendar className="h-5 w-5 text-blue-500" />,
      title: "Meeting Schedule",
      from: "team@company.com",
      time: "2 days ago",
      status: "completed",
      preview: "We need to schedule a team meeting for the upcoming project...",
    },
  ]);

  const [automatedTasks, setAutomatedTasks] = useState([
    {
      id: 4,
      type: "email",
      icon: <Mail className="h-5 w-5 text-pink-500" />,
      title: "Client Follow-up",
      from: "client@example.com",
      time: "3 hours ago",
      status: "automated",
      preview:
        "Your AI sent a follow-up email to the client regarding project status...",
      aiAction:
        "Sent a detailed project update with current milestones and timeline.",
    },
    {
      id: 5,
      type: "document",
      icon: <FileText className="h-5 w-5 text-purple-500" />,
      title: "Research Summary",
      from: "research-team@company.com",
      time: "Yesterday",
      status: "automated",
      preview: "Your AI compiled research findings into a summary document...",
      aiAction:
        "Created a 5-page summary with key insights and recommendations.",
    },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    setChatMessages([...chatMessages, { sender: "user", content: message }]);
    setMessage("");

    // Simulate AI response after a short delay
    setTimeout(() => {
      let response;
      const lowerMessage = message.toLowerCase();

      if (lowerMessage.includes("send") || lowerMessage.includes("good")) {
        response =
          "Great! I've sent the response to the recruiter. I'll notify you when they reply.";
      } else if (
        lowerMessage.includes("change") ||
        lowerMessage.includes("edit")
      ) {
        response = "What changes would you like me to make to the draft?";
      } else if (
        lowerMessage.includes("hello") ||
        lowerMessage.includes("hi")
      ) {
        response = "Hello! How can I assist you today?";
      } else {
        response =
          "I'll take that into consideration. Would you like me to make any changes to the draft before sending it?";
      }

      setChatMessages((prev) => [...prev, { sender: "ai", content: response }]);
    }, 1000);
  };

  const approveTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: "approved" } : task
      )
    );

    // Add a new automated task after approval
    setTimeout(() => {
      const newAutomatedTask = {
        id: Date.now(),
        type: "email",
        icon: <Mail className="h-5 w-5 text-green-500" />,
        title: "Job Offer Response",
        from: "tech-recruiter@company.com",
        time: "Just now",
        status: "automated",
        preview: "Your AI sent a response to the job offer inquiry...",
        aiAction:
          "Sent a polite response asking about salary range and remote work options.",
      };

      setAutomatedTasks([newAutomatedTask, ...automatedTasks]);
    }, 2000);
  };

  const declineTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <section id="tasks" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Task <span className="gradient-text">Handling</span> AI
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Your digital twin can handle various tasks independently or with
            your supervision, saving you time and energy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-6  h-full"
          >
            <Tabs defaultValue="pending" className="h-full">
              <TabsList className="grid grid-cols-2 mb-6 bg-black/50 border border-pink-500/20">
                <TabsTrigger
                  value="pending"
                  className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
                >
                  <Clock className="h-4 w-4 mr-2" /> Pending Tasks
                </TabsTrigger>
                <TabsTrigger
                  value="automated"
                  className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
                >
                  <Bot className="h-4 w-4 mr-2" /> Automated Tasks
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="pending"
                className="space-y-4 h-[500px] overflow-y-auto pr-2"
              >
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-black/50 rounded-xl p-4 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 flex items-start"
                    >
                      <div className="mr-4 mt-1">{task.icon}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-medium">{task.title}</h4>
                          <div className="text-xs text-gray-400 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {task.time}
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">
                          From: {task.from}
                        </p>
                        <p className="text-sm text-gray-300 mb-3">
                          {task.preview}
                        </p>

                        <div className="flex justify-between items-center">
                          <div className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300">
                            {task.type}
                          </div>
                          <div className="flex space-x-2">
                            {task.status === "pending" ? (
                              <>
                                <button
                                  onClick={() => declineTask(task.id)}
                                  className="px-3 py-1 bg-black border border-pink-500/30 rounded-md hover:bg-pink-500/10 transition-all duration-300 flex items-center text-sm ripple-btn"
                                >
                                  <X className="h-4 w-4 mr-1" /> Decline
                                </button>
                                <button
                                  onClick={() => approveTask(task.id)}
                                  className="px-3 py-1 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-all duration-300 flex items-center text-sm ripple-btn"
                                >
                                  <Check className="h-4 w-4 mr-1" /> Approve
                                </button>
                              </>
                            ) : task.status === "approved" ? (
                              <div className="text-xs px-2 py-1 rounded-full bg-blue-900/50 text-blue-400 flex items-center">
                                <Clock className="h-3 w-3 mr-1" /> Processing
                              </div>
                            ) : (
                              <div className="text-xs px-2 py-1 rounded-full bg-green-900/50 text-green-400 flex items-center">
                                <Check className="h-3 w-3 mr-1" /> Completed
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mb-4">
                      <Check className="h-8 w-8 text-green-500" />
                    </div>
                    <h4 className="text-xl font-medium mb-2">All Caught Up!</h4>
                    <p className="text-gray-400 max-w-xs">
                      You have no pending tasks at the moment. Your AI assistant
                      is handling everything.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent
                value="automated"
                className="space-y-4 h-[500px] overflow-y-auto pr-2"
              >
                {automatedTasks.length > 0 ? (
                  automatedTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-black/50 rounded-xl p-4 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 flex items-start"
                    >
                      <div className="mr-4 mt-1">{task.icon}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-medium">{task.title}</h4>
                          <div className="text-xs text-gray-400 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {task.time}
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">
                          From: {task.from}
                        </p>
                        <p className="text-sm text-gray-300 mb-3">
                          {task.preview}
                        </p>

                        <div className="bg-gray-800/50 p-2 rounded-md mb-3 border border-pink-500/10">
                          <div className="flex items-center mb-1">
                            <Bot className="h-3 w-3 text-pink-500 mr-1" />
                            <span className="text-xs text-pink-400">
                              AI Action:
                            </span>
                          </div>
                          <p className="text-xs text-gray-300">
                            {task.aiAction}
                          </p>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300">
                            {task.type}
                          </div>
                          <div className="flex space-x-2">
                            <div className="text-xs px-2 py-1 rounded-full bg-purple-900/50 text-purple-400 flex items-center">
                              <Zap className="h-3 w-3 mr-1" /> Automated
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mb-4">
                      <AlertCircle className="h-8 w-8 text-yellow-500" />
                    </div>
                    <h4 className="text-xl font-medium mb-2">
                      No Automated Tasks Yet
                    </h4>
                    <p className="text-gray-400 max-w-xs">
                      Your AI assistant hasn't performed any automated tasks
                      yet. Approve some tasks to see automation in action.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-full"
          >
            <Tabs defaultValue="chat" className="h-full">
              <TabsList className="grid grid-cols-2 mb-6 bg-black/50 border border-pink-500/20">
                <TabsTrigger
                  value="chat"
                  className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
                >
                  <MessageSquare className="h-4 w-4 mr-2" /> Chat Interface
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
                >
                  <FileText className="h-4 w-4 mr-2" /> Task Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="h-full">
                <div className="bg-gray-900/50 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-6  h-full flex flex-col">
                  <div className="flex-1 overflow-y-auto mb-4 space-y-4 h-[400px] pr-2">
                    {chatMessages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex items-start ${
                          msg.sender === "user" ? "justify-end" : ""
                        }`}
                      >
                        {msg.sender === "ai" && (
                          <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center mr-3 flex-shrink-0 border border-pink-500/30">
                            <span className="text-xs font-bold">AI</span>
                          </div>
                        )}
                        <div
                          className={`${
                            msg.sender === "ai"
                              ? "bg-black/50 rounded-lg rounded-tl-none border border-pink-500/20"
                              : "bg-pink-500/10 rounded-lg rounded-tr-none border border-pink-500/30"
                          } p-3 text-sm max-w-[80%]`}
                        >
                          {msg.content}
                        </div>
                        {msg.sender === "user" && (
                          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center ml-3 flex-shrink-0 border border-purple-500/30">
                            <span className="text-xs font-bold">You</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      placeholder="Type your message..."
                      className="w-full bg-black/70 border border-pink-500/30 rounded-lg py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="absolute right-1 top-1 h-9 w-9 p-0 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-all duration-300 flex items-center justify-center ripple-btn"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings">
                <div className="bg-gray-900/50 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-6 h-full">
                  <h3 className="text-xl font-bold mb-6 glow-text">
                    Task Permissions
                  </h3>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-medium">Email Handling</h4>
                      <div className="flex items-center justify-between p-3 bg-black/50 rounded-lg border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300">
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-pink-500 mr-3" />
                          <span>Job-related emails</span>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-green-900/50 text-green-400 text-xs">
                          Auto-respond
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-black/50 rounded-lg border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300">
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-pink-500 mr-3" />
                          <span>Financial emails</span>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-yellow-900/50 text-yellow-400 text-xs">
                          Require approval
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-black/50 rounded-lg border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300">
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-pink-500 mr-3" />
                          <span>Marketing emails</span>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-red-900/50 text-red-400 text-xs">
                          Ignore
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-medium">Document Creation</h4>
                      <div className="flex items-center justify-between p-3 bg-black/50 rounded-lg border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-purple-500 mr-3" />
                          <span>Weekly reports</span>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-green-900/50 text-green-400 text-xs">
                          Auto-generate
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-black/50 rounded-lg border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-purple-500 mr-3" />
                          <span>Project proposals</span>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-yellow-900/50 text-yellow-400 text-xs">
                          Draft only
                        </div>
                      </div>
                    </div>

                    <button className="w-full cybr-btn">
                      Update Permissions
                    </button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
