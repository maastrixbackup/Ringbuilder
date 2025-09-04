// components/RingViewer.js
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { OrbitControls, Environment } from "@react-three/drei";
import Ring from "../Components/Ring";
import Diamond from "../Components/Diamond";
import * as THREE from "three";
import { HDRSetup } from "../Components/HDRSetup";


export default function RingViewer({ metalKey, setRenderer, setScene }) {
  const diamondRef = useRef();
  const DPR = Math.min(window.devicePixelRatio, 2);

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
        dpr={DPR}
        camera={{ position: [0, 2, 5], fov: 50 }}
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
          physicallyCorrectLights: true,
        }}
        onCreated={async ({ gl, scene }) => {
          gl.setClearColor(0xffffff, 1);
          gl.toneMappingExposure = 1.0;
          setRenderer(gl);
          setScene(scene);
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
            <Ring scale={100} />
            <Diamond ref={diamondRef} scale={1} position={[0, 0.8, 0]} />
          </group>

          <HDRSetup metalKey={metalKey} diamondRef={diamondRef} />

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
