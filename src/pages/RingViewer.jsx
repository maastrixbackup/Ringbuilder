// components/RingViewer.js
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { OrbitControls, Environment } from "@react-three/drei";
import Ring from "../Components/Ring";
import Diamond from "../Components/Diamond";
import * as THREE from "three";

export default function RingViewer({ metalTexture }) {
  const diamondRef = useRef();

  const cubeMap = new THREE.CubeTextureLoader()
    .setPath("/textures/stone_env/")
    .load([
      "pano_px.webp",
      "pano_nx.webp",
      "pano_py.webp",
      "pano_ny.webp",
      "pano_pz.webp",
      "pano_nz.webp",
    ]);

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
          position={[5, 10, 5]}
          angle={0.3}
          penumbra={0.5}
          intensity={2.5}
          castShadow
        />
        <pointLight position={[0, 5, 0]} intensity={1.5} />
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
            intensity={1.25}
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
