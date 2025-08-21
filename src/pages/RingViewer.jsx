// components/RingViewer.js
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useRef } from "react";
import { OrbitControls, Environment } from "@react-three/drei";
import Ring from "../Components/Ring";
import Diamond from "../Components/Diamond";
import HeadDecoration from "../Components/HeadDecoration";
import MetalSwitcher from "../Components/MetalSwitcher";
import * as THREE from "three";

export default function RingViewer() {
  const diamondRef = useRef();
  const [metalTexture, setMetalTexture] = useState(
    new THREE.TextureLoader().load("/textures/metal/white.png")
  );

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
      <MetalSwitcher setMetalTexture={setMetalTexture} />
      <Canvas
        camera={{ position: [0, 2, 5], fov: 50 }}
        shadows
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <spotLight
          position={[5, 10, 5]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
        />
        <pointLight position={[-5, 5, -5]} intensity={1.5} />

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
            intensity={1}
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
