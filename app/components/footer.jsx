"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Github, Twitter, Linkedin, Mail, MapPin, Phone, Heart, Star, Sparkles } from "lucide-react"

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <footer className="py-12 relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-[120px] opacity-50"></div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-pink-500/50"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatParticle ${Math.random() * 5 + 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Create Your <span className="gradient-text">Digital Twin</span>?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-xl">
              Join thousands of professionals who are saving time and increasing productivity with their AI-powered
              digital replicas.
            </p>
            <motion.button className="cybr-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Get Started Now
              <ArrowRight size={18} className="ml-2" />
            </motion.button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gray-900/50 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-6 hologram"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full neon-glow flex items-center justify-center bg-black mr-4">
                <span className="text-xl font-bold gradient-text">DR</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Digital Replica</h3>
                <p className="text-gray-400">Your AI-powered digital twin</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium mb-4">Links</h4>
                <ul className="space-y-2">
                  <motion.li variants={itemVariants}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                      <ArrowRight className="h-3 w-3 mr-2 text-pink-500" /> Home
                    </Link>
                  </motion.li>
                  <motion.li variants={itemVariants}>
                    <Link
                      href="#features"
                      className="text-gray-400 hover:text-white transition-colors flex items-center"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 text-pink-500" /> Features
                    </Link>
                  </motion.li>
                  <motion.li variants={itemVariants}>
                    <Link
                      href="#profile"
                      className="text-gray-400 hover:text-white transition-colors flex items-center"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 text-pink-500" /> Profile
                    </Link>
                  </motion.li>
                  <motion.li variants={itemVariants}>
                    <Link href="#tasks" className="text-gray-400 hover:text-white transition-colors flex items-center">
                      <ArrowRight className="h-3 w-3 mr-2 text-pink-500" /> Tasks
                    </Link>
                  </motion.li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-4">Contact</h4>
                <ul className="space-y-2">
                  <motion.li variants={itemVariants}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-pink-500" /> support@digitalreplica.ai
                    </Link>
                  </motion.li>
                  <motion.li variants={itemVariants}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-pink-500" /> +1 (555) 123-4567
                    </Link>
                  </motion.li>
                  <motion.li variants={itemVariants}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-pink-500" /> San Francisco, CA
                    </Link>
                  </motion.li>
                </ul>
              </div>
            </div>

            <motion.div variants={itemVariants} className="mt-6 p-4 bg-black/40 border border-pink-500/20 rounded-lg">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <Sparkles className="h-4 w-4 text-pink-500 mr-2" /> Demo Mode
              </h4>
              <p className="text-xs text-gray-400">
                This is a fully functional demo of Digital Replica. All features are available for exploration without
                backend connections.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="border-t border-pink-500/20 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p variants={itemVariants} className="text-gray-400 mb-4 md:mb-0 flex items-center">
              © {new Date().getFullYear()} Digital Replica. Made with <Heart className="h-4 w-4 text-pink-500 mx-1" />{" "}
              by AI enthusiasts.
            </motion.p>
            <motion.div variants={itemVariants} className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-pink-500 transition-colors transform hover:scale-110 duration-300"
              >
                <Github size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-pink-500 transition-colors transform hover:scale-110 duration-300"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-pink-500 transition-colors transform hover:scale-110 duration-300"
              >
                <Linkedin size={20} />
              </Link>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="flex justify-center mt-8">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <Star className="h-4 w-4 text-yellow-500" />
              <Star className="h-4 w-4 text-yellow-500" />
              <Star className="h-4 w-4 text-yellow-500" />
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="ml-2 text-sm text-gray-400">Rated 4.9/5 by over 1,000 users</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
