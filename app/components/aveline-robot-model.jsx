"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react"

export default function AvelineRobotModel() {
  const [talking, setTalking] = useState(false)
  const [listening, setListening] = useState(false)

  const robotRef = useRef()
  const headRef = useRef()
  const mouthRef = useRef()
  const leftEyeRef = useRef()
  const rightEyeRef = useRef()
  const leftArmRef = useRef()
  const rightArmRef = useRef()
  const antennaLightRef = useRef()

  // Listen for speech events from parent component
  useEffect(() => {
    const handleSpeechEvent = (event) => {
      if (event.detail.type === "talking") {
        setTalking(event.detail.value)
      } else if (event.detail.type === "listening") {
        setListening(event.detail.value)
      }
    }

    window.addEventListener("speech-event", handleSpeechEvent)
    return () => window.removeEventListener("speech-event", handleSpeechEvent)
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    // Subtle body movement
    robotRef.current.position.y = Math.sin(t) * 0.1
    robotRef.current.rotation.y = Math.sin(t / 2) * 0.05

    // Head movement
    headRef.current.rotation.y = Math.sin(t / 1.5) * 0.1
    headRef.current.rotation.z = Math.sin(t / 2) * 0.05

    // Eye blinking
    if (leftEyeRef.current && rightEyeRef.current) {
      // Blink every 3 seconds
      if (Math.floor(t) % 3 === 0 && t % 1 < 0.15) {
        leftEyeRef.current.scale.y = 0.1
        rightEyeRef.current.scale.y = 0.1
      } else {
        leftEyeRef.current.scale.y = 1
        rightEyeRef.current.scale.y = 1
      }
    }

    // Mouth animation when talking
    if (mouthRef.current) {
      if (talking) {
        mouthRef.current.scale.y = 0.5 + Math.sin(t * 15) * 0.5
      } else {
        mouthRef.current.scale.y = 0.2
      }
    }

    // Arm movement
    leftArmRef.current.rotation.x = Math.sin(t / 1.2) * 0.1
    rightArmRef.current.rotation.x = Math.sin(t / 1.2 + 1) * 0.1

    // Special animation when listening
    if (listening) {
      rightArmRef.current.rotation.z = Math.sin(t * 2) * 0.2 - 0.3
    } else {
      rightArmRef.current.rotation.z = Math.sin(t / 1.5) * 0.1
    }

    // Antenna light pulsing
    if (antennaLightRef.current) {
      if (talking || listening) {
        antennaLightRef.current.intensity = 2 + Math.sin(t * 10) * 1.5
      } else {
        antennaLightRef.current.intensity = 1 + Math.sin(t) * 0.5
      }
    }
  })

  return (
    <group ref={robotRef} position={[0, -1, 0]} scale={1}>
      {/* Body */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.3, 1.2, 16]} />
        <meshStandardMaterial color="#ff1493" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Chest plate */}
      <mesh position={[0, 1.1, 0.3]} castShadow>
        <boxGeometry args={[0.6, 0.4, 0.2]} />
        <meshStandardMaterial color="#c71585" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Control panel on chest */}
      <mesh position={[0, 1.1, 0.41]} castShadow>
        <planeGeometry args={[0.4, 0.2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Buttons on control panel */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-0.15 + i * 0.15, 1.1, 0.42]} castShadow>
          <circleGeometry args={[0.03, 16]} />
          <meshStandardMaterial
            color={i === 0 ? "#ff0000" : i === 1 ? "#00ff00" : "#0000ff"}
            emissive={i === 0 ? "#ff0000" : i === 1 ? "#00ff00" : "#0000ff"}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Head */}
      <group ref={headRef} position={[0, 1.8, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#ff69b4" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Face plate */}
        <mesh position={[0, 0, 0.2]} castShadow>
          <boxGeometry args={[0.4, 0.3, 0.1]} />
          <meshStandardMaterial color="#333333" />
        </mesh>

        {/* Eyes */}
        <mesh ref={leftEyeRef} position={[-0.1, 0.05, 0.25]} castShadow>
          <capsuleGeometry args={[0.05, 0.02, 8, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1} />
        </mesh>

        <mesh ref={rightEyeRef} position={[0.1, 0.05, 0.25]} castShadow>
          <capsuleGeometry args={[0.05, 0.02, 8, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1} />
        </mesh>

        {/* Mouth */}
        <mesh ref={mouthRef} position={[0, -0.08, 0.25]} castShadow>
          <capsuleGeometry args={[0.15, 0.02, 8, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.5} />
        </mesh>

        {/* Antenna */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.2, 8]} />
          <meshStandardMaterial color="#333333" />
        </mesh>

        <mesh position={[0, 0.4, 0]} castShadow>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={1} />
        </mesh>

        {/* Antenna light */}
        <pointLight ref={antennaLightRef} position={[0, 0.4, 0]} color="#ff00ff" intensity={1} distance={2} />
      </group>

      {/* Left arm */}
      <group ref={leftArmRef} position={[-0.5, 1.2, 0]}>
        <mesh position={[-0.15, 0, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow>
          <capsuleGeometry args={[0.1, 0.6, 8, 16]} />
          <meshStandardMaterial color="#ff69b4" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Left hand */}
        <mesh position={[-0.4, -0.2, 0]} castShadow>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#c71585" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Left fingers */}
        {[0, 1, 2, 3].map((i) => (
          <mesh
            key={i}
            position={[-0.4 - Math.cos((i * Math.PI) / 2) * 0.1, -0.2 - Math.sin((i * Math.PI) / 2) * 0.1, 0]}
            castShadow
          >
            <capsuleGeometry args={[0.02, 0.1, 8, 16]} />
            <meshStandardMaterial color="#c71585" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* Right arm */}
      <group ref={rightArmRef} position={[0.5, 1.2, 0]}>
        <mesh position={[0.15, 0, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
          <capsuleGeometry args={[0.1, 0.6, 8, 16]} />
          <meshStandardMaterial color="#ff69b4" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Right hand */}
        <mesh position={[0.4, -0.2, 0]} castShadow>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#c71585" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Right fingers */}
        {[0, 1, 2, 3].map((i) => (
          <mesh
            key={i}
            position={[0.4 + Math.cos((i * Math.PI) / 2) * 0.1, -0.2 - Math.sin((i * Math.PI) / 2) * 0.1, 0]}
            castShadow
          >
            <capsuleGeometry args={[0.02, 0.1, 8, 16]} />
            <meshStandardMaterial color="#c71585" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* Legs */}
      <mesh position={[-0.2, 0.3, 0]} castShadow>
        <capsuleGeometry args={[0.12, 0.6, 8, 16]} />
        <meshStandardMaterial color="#ff69b4" metalness={0.8} roughness={0.2} />
      </mesh>

      <mesh position={[0.2, 0.3, 0]} castShadow>
        <capsuleGeometry args={[0.12, 0.6, 8, 16]} />
        <meshStandardMaterial color="#ff69b4" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Feet */}
      <mesh position={[-0.2, -0.1, 0.1]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.3]} />
        <meshStandardMaterial color="#c71585" metalness={0.7} roughness={0.3} />
      </mesh>

      <mesh position={[0.2, -0.1, 0.1]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.3]} />
        <meshStandardMaterial color="#c71585" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Small control panel floating above the robot */}
      <Html position={[0, 2.5, 0]} center>
        <div className="flex space-x-2 bg-black/70 p-2 rounded-full backdrop-blur-md border border-pink-500/30 scale-75">
          <button
            onClick={() => {
              const newValue = !listening
              setListening(newValue)
              window.dispatchEvent(new CustomEvent("robot-control", { detail: { type: "listening", value: newValue } }))
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              listening ? "bg-pink-500 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {listening ? <Mic size={14} /> : <MicOff size={14} />}
          </button>
          <button
            onClick={() => {
              const newValue = !talking
              setTalking(newValue)
              window.dispatchEvent(new CustomEvent("robot-control", { detail: { type: "talking", value: newValue } }))
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              talking ? "bg-pink-500 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {talking ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>
        </div>
      </Html>
    </group>
  )
}
