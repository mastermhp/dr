"use client";

import { Calendar } from "@/components/ui/calendar";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Brain,
  Shield,
  Database,
  MessageSquare,
  UserCheck,
  FileText,
  Mic,
  Bot,
  Zap,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    {
      icon: <UserCheck className="h-12 w-12 text-pink-500" />,
      title: "Digital Profile",
      description:
        "Upload your resume, portfolio, and work samples to create your digital twin.",
    },
    {
      icon: <Brain className="h-12 w-12 text-purple-500" />,
      title: "Task Handling AI",
      description:
        "Let your AI handle tasks like responding to emails and writing reports.",
    },
    {
      icon: <Shield className="h-12 w-12 text-pink-500" />,
      title: "Permission System",
      description:
        "Define custom rules for task delegation with granular control.",
    },
    {
      icon: <Database className="h-12 w-12 text-purple-500" />,
      title: "Memory System",
      description:
        "Your AI learns from history to make better decisions over time.",
    },
    {
      icon: <MessageSquare className="h-12 w-12 text-pink-500" />,
      title: "AI Personality",
      description:
        "Shape how your AI thinks: serious, witty, formal, or casual.",
    },
    {
      icon: <FileText className="h-12 w-12 text-purple-500" />,
      title: "Project Mode",
      description:
        "Let your AI take over specific projects with timeline tracking.",
    },
    {
      icon: <Bot className="h-12 w-12 text-pink-500" />,
      title: "Automation",
      description:
        "AI handles your to-do list and assignments in your absence.",
    },
    {
      icon: <Mic className="h-12 w-12 text-purple-500" />,
      title: "Voice Control",
      description:
        "Assign tasks and receive feedback using voice commands and responses.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="features" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Create your digital twin with advanced AI capabilities that learn
            your style, preferences, and skills to handle tasks just like you
            would.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 h-full card-3d hologram">
                <CardHeader className="pb-2">
                  <div className="mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Automation Feature Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 bg-gray-900/60 backdrop-blur-lg border border-pink-500/20 rounded-2xl p-6 "
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="col-span-1">
              <h3 className="text-2xl font-bold mb-4 gradient-text">
                AI Automation
              </h3>
              <p className="text-gray-300 mb-6">
                Your digital twin works even when you're away, handling tasks
                and projects autonomously based on your preferences and past
                decisions.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center mr-3">
                    <Zap className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Continuous Productivity</h4>
                    <p className="text-sm text-gray-400">
                      Your work continues even when you're offline
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                    <Clock className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">24/7 Availability</h4>
                    <p className="text-sm text-gray-400">
                      Respond to urgent matters at any time
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                    <Bot className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Smart Prioritization</h4>
                    <p className="text-sm text-gray-400">
                      AI intelligently prioritizes your tasks
                    </p>
                  </div>
                </div>
              </div>

              <button className="mt-6 neon-btn">Explore Automation</button>
            </div>

            <div className="col-span-2 bg-black/40 rounded-xl p-5 border border-pink-500/10">
              <h4 className="text-lg font-medium mb-4 flex items-center">
                <Bot className="h-5 w-5 text-pink-500 mr-2" />
                Automation Demo
              </h4>

              <div className="space-y-4">
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-pink-500 mr-2" />
                      <span className="font-medium">
                        Weekly Report Generation
                      </span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-full">
                      Automated
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    Your AI has compiled the weekly report based on your team's
                    activities and previous report formats.
                  </p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Completed 2 hours ago</span>
                    <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors">
                      View Report
                    </button>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 text-purple-500 mr-2" />
                      <span className="font-medium">Client Email Response</span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-full">
                      Automated
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    Your AI responded to client inquiry about project timeline
                    with details from your project management system.
                  </p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">
                      Completed 45 minutes ago
                    </span>
                    <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors">
                      View Email
                    </button>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-8">
                      {/* <div className="bg-black w-64 h-72">
                        <Calendar className="h-1 w-1 text-purple-700" />
                      </div> */}
                      <div className="flex flex-col gap-4 justify-center items-center ">
                        <span className="font-medium">Meeting Scheduling</span>
                        <p className="text-sm text-gray-400 w-[360px] mb-3">
                          Your AI is coordinating with 5 team members to find
                          the optimal meeting time based on everyone's
                          availability.
                        </p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded-full">
                      In Progress
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">
                      Started 10 minutes ago
                    </span>
                    <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
