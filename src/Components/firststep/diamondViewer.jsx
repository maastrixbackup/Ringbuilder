// src/Components/firststep/diamondViewer.jsx
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model({ modelPath }) {
  const { scene } = useGLTF(modelPath || "/models/di_03.glb");

  scene.scale.set(0.5, 0.5, 0.5);
  scene.rotation.x = Math.PI / 2;
  scene.position.y = -0.5;

  return <primitive object={scene} />;
}

export default function DiamondViewer({ modelPath, height = "250px" }) {
  return (
    <div style={{ width: "100%", height }}>
      <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[1, 2, 3]} intensity={0.9} />
        <Suspense fallback={null}>
          <Model modelPath={modelPath} />
        </Suspense>
        <OrbitControls
          enableZoom
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}
