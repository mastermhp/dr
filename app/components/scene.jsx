"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function Scene() {
  const particlesRef = useRef()
  const gridRef = useRef()

  // Create particles geometry
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCount = 2000

  // Positions
  const posArray = new Float32Array(particlesCount * 3)
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10
  }
  particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

  // Colors
  const colors = new Float32Array(particlesCount * 3)
  for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3
    // Pink to purple colors
    colors[i3] = 1.0 // R
    colors[i3 + 1] = Math.random() * 0.3 // G
    colors[i3 + 2] = Math.random() * 0.5 + 0.5 // B
  }
  particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

  // Create grid geometry
  const gridGeometry = new THREE.BufferGeometry()
  const gridVertices = []
  const size = 20
  const divisions = 20
  const step = size / divisions

  // Create grid lines
  for (let i = 0; i <= divisions; i++) {
    const pos = i * step - size / 2
    // Horizontal lines
    gridVertices.push(-size / 2, pos, 0)
    gridVertices.push(size / 2, pos, 0)

    // Vertical lines
    gridVertices.push(pos, -size / 2, 0)
    gridVertices.push(pos, size / 2, 0)
  }

  const gridArray = new Float32Array(gridVertices)
  gridGeometry.setAttribute("position", new THREE.BufferAttribute(gridArray, 3))

  useFrame((state) => {
    const { clock } = state
    const elapsedTime = clock.getElapsedTime()

    // Animate particles
    if (particlesRef.current) {
      particlesRef.current.rotation.x = elapsedTime * 0.0005
      particlesRef.current.rotation.y = elapsedTime * 0.0003
    }

    // Animate grid
    if (gridRef.current) {
      gridRef.current.material.opacity = (Math.sin(elapsedTime * 0.5) + 1) * 0.1 + 0.1
      gridRef.current.position.z = -5 + Math.sin(elapsedTime * 0.2) * 2
    }
  })

  return (
    <>
      <points ref={particlesRef} geometry={particlesGeometry}>
        <pointsMaterial
          size={0.05}
          sizeAttenuation={true}
          vertexColors={true}
          transparent={true}
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments ref={gridRef} geometry={gridGeometry}>
        <lineBasicMaterial color="#ff1493" transparent opacity={0.2} />
      </lineSegments>

      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
    </>
  )
}
