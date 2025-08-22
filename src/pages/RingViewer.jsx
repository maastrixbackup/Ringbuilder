// components/RingViewer.js
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useRef } from "react";
import { OrbitControls, Environment } from "@react-three/drei";
import Ring from "../Components/Ring";
import Diamond from "../Components/Diamond";
import HeadDecoration from "../Components/HeadDecoration";
import MetalSwitcher from "../Components/MetalSwitcher";
import * as THREE from "three";

export default function RingViewer({ metalTexture }) {
  const diamondRef = useRef();

  const cubeMap = new THREE.CubeTextureLoader()
    .setPath("/textures/stone_env/")
    .load(["px.webp", "nx.webp", "py.webp", "ny.webp", "pz.webp", "nz.webp"]);

  return (
    <div
      style={{
        width: "100%",
        height: 300,
        borderRadius: 16,
        overflow: "hidden",
        marginTop: "10%",
      }}
    >
      <Canvas
        camera={{ position: [0, 2, 5], fov: 50 }}
        shadows
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputEncoding: THREE.sRGBEncoding,
        }}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = 0.5; // darker overall
        }}
      >
        <ambientLight intensity={0.15} />
        <spotLight
          position={[5, 8, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <pointLight position={[-5, 5, -5]} intensity={0.8} />

        <Suspense fallback={null}>
          <group scale={1.5}>
            <Ring metalTexture={metalTexture} scale={100} />
            <Diamond
              cubeMap={cubeMap}
              ref={diamondRef}
              scale={1}
              position={[0, 0.75, 0]}
            />
          </group>
          <Environment
            intensity={0.5}
            background={false}
            files="/hdr/studio_small_03_1k.hdr"
          />

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            autoRotate
            autoRotateSpeed={5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
