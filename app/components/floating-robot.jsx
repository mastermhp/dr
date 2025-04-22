"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import FlyingRobotModel from "./flying-robot-model"

export default function FloatingRobot() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 5], fov: 25 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <FlyingRobotModel />
      </Suspense>
    </Canvas>
  )
}
