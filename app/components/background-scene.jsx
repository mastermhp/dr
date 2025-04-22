"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import Scene from "./scene"

export default function BackgroundScene() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
