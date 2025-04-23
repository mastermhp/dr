"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useState, useEffect } from "react"
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei"
import AvelineRobotModel from "./aveline-robot-model"
import VoiceInterface from "./voice-interface"

export default function AvelineRobot() {
  const [talking, setTalking] = useState(false)
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("Hello! I'm your AI Intelecx AI. How can I assist you today?")

  // Speech recognition setup
  useEffect(() => {
    if (!listening) return

    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      console.error("Speech recognition not supported in this browser")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-US"

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("")

      setTranscript(transcript)
    }

    recognition.start()

    return () => {
      recognition.stop()
    }
  }, [listening])

  // Speech synthesis setup
  useEffect(() => {
    if (!talking || !response) return

    const utterance = new SpeechSynthesisUtterance(response)
    utterance.rate = 1.0
    utterance.pitch = 1.2
    utterance.volume = 1.0

    // Use a female voice if available
    const voices = window.speechSynthesis.getVoices()
    const femaleVoice = voices.find((voice) => voice.name.includes("female") || voice.name.includes("Female"))
    if (femaleVoice) {
      utterance.voice = femaleVoice
    }

    utterance.onend = () => {
      setTalking(false)
    }

    window.speechSynthesis.speak(utterance)

    return () => {
      window.speechSynthesis.cancel()
    }
  }, [talking, response])

  // Process user input and generate response
  useEffect(() => {
    if (!transcript || !listening) return

    // Simple response logic - in a real app, this would connect to an AI service
    const processInput = () => {
      const input = transcript.toLowerCase()

      if (input.includes("hello") || input.includes("hi")) {
        return "Hello there! It's nice to talk with you."
      } else if (input.includes("name")) {
        return "I'm your AI Intelecx AI. You can call me Aveline."
      } else if (input.includes("how are you")) {
        return "I'm functioning perfectly, thank you for asking! How are you doing today?"
      } else if (input.includes("what can you do")) {
        return "I can assist with tasks, answer questions, and represent you digitally. Think of me as your AI twin!"
      } else if (input.includes("thank")) {
        return "You're welcome! I'm happy to help."
      } else if (input.includes("bye") || input.includes("goodbye")) {
        return "Goodbye! Feel free to talk to me anytime you need assistance."
      } else {
        return "I heard you say: " + transcript + ". How can I help with that?"
      }
    }

    // Delay response to make it feel more natural
    const timer = setTimeout(() => {
      const newResponse = processInput()
      setResponse(newResponse)
      setListening(false)
      setTalking(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [transcript, listening])

  return (
    <div className="w-full h-full relative">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 25 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <AvelineRobotModel />
          <Environment preset="city" />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.4} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 2.5}
          />
        </Suspense>
      </Canvas>

      <VoiceInterface
        talking={talking}
        setTalking={setTalking}
        listening={listening}
        setListening={setListening}
        transcript={transcript}
        setTranscript={setTranscript}
        response={response}
      />
    </div>
  )
}
