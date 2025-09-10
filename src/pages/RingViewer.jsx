import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Ring from "../Components/Ring";
import Diamond from "../Components/Diamond";
import { useHDRLoader } from "../Components/HDRSetup";

function SceneContent({ metalKey }) {
  const hdrReady = useHDRLoader(metalKey);

  if (!hdrReady) {
    return null;
  }

  return (
    <>
      <group scale={1.5}>
        <Ring scale={100} />
        <Diamond scale={1} position={[0, 0.8, 0]} />
      </group>

      <ambientLight intensity={0.05} />
      <directionalLight position={[-2, 2, -2]} intensity={0.08} />
      <directionalLight position={[2, 1, 1]} intensity={0.06} />
      <OrbitControls
        enablePan={false}
        enableZoom
        autoRotate
        autoRotateSpeed={5}
      />
    </>
  );
}

export default function RingViewer({ metalKey }) {
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
        dpr={Math.min(window.devicePixelRatio, 2)}
        camera={{ position: [0, 2, 5], fov: 50 }}
        gl={{
          antialias: true,
          alpha: false,
        }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.setClearColor(0xffffff, 1);
          gl.physicallyCorrectLights = true;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMappingExposure = 0.8;
        }}
      >
        <Suspense fallback={null}>
          <SceneContent metalKey={metalKey} />
        </Suspense>
      </Canvas>
    </div>
  );
}