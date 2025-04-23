"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Upload, Linkedin, Github, Mail, FileText, Briefcase, Code, ArrowRight, Check, X } from "lucide-react"

export default function ProfileSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [profileCompletion, setProfileCompletion] = useState(45)

  const handleFileUpload = () => {
    // Demo function to simulate file upload
    const newFile = {
      id: Date.now(),
      name: `Document_${Math.floor(Math.random() * 1000)}.pdf`,
      type: "application/pdf",
      size: `${Math.floor(Math.random() * 5) + 1}MB`,
    }

    setUploadedFiles([...uploadedFiles, newFile])
    setProfileCompletion(Math.min(profileCompletion + 15, 100))
  }

  const removeFile = (id) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id))
    setProfileCompletion(Math.max(profileCompletion - 15, 45))
  }

  return (
    <section id="profile" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-6 glow-text">Create Your Digital Profile</h3>

              <div className="space-y-6">
                <div className="bg-black/50 rounded-xl p-4 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 glow-border">
                  <div className="flex items-center mb-4">
                    <FileText className="h-6 w-6 text-pink-500 mr-3" />
                    <h4 className="text-lg font-medium">Upload Documents</h4>
                  </div>
                  <p className="text-gray-400 mb-4">
                    Upload your resume, portfolio, and work samples to help your AI understand your skills and
                    experience.
                  </p>

                  {uploadedFiles.length > 0 && (
                    <div className="mb-4 space-y-2">
                      {uploadedFiles.map((file) => (
                        <div key={file.id} className="flex items-center justify-between bg-gray-800/50 p-2 rounded-md">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm">{file.name}</span>
                            <span className="text-xs text-gray-500 ml-2">({file.size})</span>
                          </div>
                          <button
                            onClick={() => removeFile(file.id)}
                            className="text-gray-400 hover:text-pink-500 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={handleFileUpload}
                    className="w-full px-4 py-2 bg-black border border-pink-500/30 rounded-md hover:bg-pink-500/10 transition-all duration-300 flex items-center justify-center ripple-btn"
                  >
                    <Upload className="h-4 w-4 mr-2" /> Upload Files
                  </button>
                </div>

                <div className="bg-black/50 rounded-xl p-4 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 glow-border">
                  <div className="flex items-center mb-4">
                    <Briefcase className="h-6 w-6 text-purple-500 mr-3" />
                    <h4 className="text-lg font-medium">Connect Accounts</h4>
                  </div>
                  <p className="text-gray-400 mb-4">
                    Link your professional accounts to enhance your digital twin's knowledge base.
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="px-3 py-2 bg-black border border-pink-500/30 rounded-md hover:bg-pink-500/10 transition-all duration-300 flex items-center justify-center ripple-btn">
                      <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
                    </button>
                    <button className="px-3 py-2 bg-black border border-pink-500/30 rounded-md hover:bg-pink-500/10 transition-all duration-300 flex items-center justify-center ripple-btn">
                      <Github className="h-4 w-4 mr-2" /> GitHub
                    </button>
                    <button className="px-3 py-2 bg-black border border-pink-500/30 rounded-md hover:bg-pink-500/10 transition-all duration-300 flex items-center justify-center ripple-btn">
                      <Mail className="h-4 w-4 mr-2" /> Email
                    </button>
                  </div>
                </div>

                <div className="bg-black/50 rounded-xl p-4 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 glow-border">
                  <div className="flex items-center mb-4">
                    <Code className="h-6 w-6 text-pink-500 mr-3" />
                    <h4 className="text-lg font-medium">Define Preferences</h4>
                  </div>
                  <p className="text-gray-400 mb-4">
                    Set your communication style, priorities, and the types of tasks your AI should handle.
                  </p>
                  <button className="w-full cybr-btn">
                    Configure Preferences <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your <span className="gradient-text">Digital Twin</span> Starts With Your Profile
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              The more your AI knows about you, the better it can represent you. Build a comprehensive profile that
              captures your professional identity, communication style, and work preferences.
            </p>

            <div className="bg-gray-900/30 backdrop-blur-sm border border-pink-500/20 rounded-xl p-6 mb-8 hologram">
              <h4 className="text-xl font-medium mb-4">Profile Completion</h4>
              <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
                <div
                  className="bg-gradient-to-r from-pink-500 to-purple-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${profileCompletion}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span className={profileCompletion >= 25 ? "text-pink-400" : ""}>
                  Basic Info {profileCompletion >= 25 && <Check className="inline h-3 w-3" />}
                </span>
                <span className={profileCompletion >= 50 ? "text-pink-400" : ""}>
                  Documents {profileCompletion >= 50 && <Check className="inline h-3 w-3" />}
                </span>
                <span className={profileCompletion >= 75 ? "text-pink-400" : ""}>
                  Preferences {profileCompletion >= 75 && <Check className="inline h-3 w-3" />}
                </span>
                <span className={profileCompletion >= 100 ? "text-pink-400" : ""}>
                  Complete {profileCompletion >= 100 && <Check className="inline h-3 w-3" />}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-gray-300">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
                <span>Higher accuracy</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span>Better responses</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span>More capabilities</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-black/40 border border-pink-500/20 rounded-lg">
              <h4 className="text-lg font-medium mb-2 flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Demo Mode Active
              </h4>
              <p className="text-sm text-gray-400">
                You're experiencing the Intelecx AI in demo mode. All features are functional for demonstration
                purposes without requiring backend connections.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
