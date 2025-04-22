"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function FlyingRobotModel() {
  const robotRef = useRef()
  const propellerRef = useRef()
  const headRef = useRef()
  const eyeRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    // Floating animation
    robotRef.current.position.y = Math.sin(t * 2) * 0.1
    robotRef.current.rotation.y = Math.sin(t / 4) * 0.3

    // Propeller rotation
    propellerRef.current.rotation.y += 0.3

    // Head movement
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t / 2) * 0.2
    }

    // Eye blinking
    if (eyeRef.current) {
      if (Math.floor(t) % 3 === 0 && t % 1 < 0.15) {
        eyeRef.current.scale.y = 0.1
      } else {
        eyeRef.current.scale.y = 1
      }
    }
  })

  return (
    <group ref={robotRef}>
      {/* Main body */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.2, 16]} />
        <meshStandardMaterial
          color="#ff1493"
          metalness={0.8}
          roughness={0.2}
          emissive="#ff1493"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Top dome / head */}
      <group ref={headRef} position={[0, 0.15, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.4, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#ff69b4"
            metalness={0.9}
            roughness={0.1}
            emissive="#ff69b4"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Eye */}
        <mesh ref={eyeRef} position={[0, 0.1, 0.35]} castShadow>
          <capsuleGeometry args={[0.1, 0.02, 8, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1} />
        </mesh>
      </group>

      {/* Bottom part */}
      <mesh position={[0, -0.15, 0]} castShadow>
        <coneGeometry args={[0.5, 0.3, 16]} />
        <meshStandardMaterial
          color="#c71585"
          metalness={0.7}
          roughness={0.3}
          emissive="#c71585"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Propeller mount */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Propeller */}
      <group ref={propellerRef} position={[0, 0.5, 0]}>
        <mesh position={[0.2, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <boxGeometry args={[0.4, 0.05, 0.01]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        <mesh position={[-0.2, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <boxGeometry args={[0.4, 0.05, 0.01]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      </group>

      {/* Arms/legs */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[Math.sin((i * Math.PI) / 2) * 0.6, -0.1, Math.cos((i * Math.PI) / 2) * 0.6]}
          castShadow
        >
          <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
          <meshStandardMaterial color="#ff69b4" emissive="#ff69b4" emissiveIntensity={0.2} />
        </mesh>
      ))}

      {/* Feet/landing pads */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[Math.sin((i * Math.PI) / 2) * 0.6, -0.25, Math.cos((i * Math.PI) / 2) * 0.6]}
          castShadow
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#c71585" emissive="#c71585" emissiveIntensity={0.2} />
        </mesh>
      ))}

      {/* Add glowing effect */}
      <pointLight position={[0, 0, 0]} color="#ff1493" intensity={0.5} distance={1.5} />
    </group>
  )
}
