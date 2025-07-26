import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model({ modelPath, themeColor }) {
  const { scene } = useGLTF(modelPath || "/models/3.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.color.set(themeColor);
        child.material.needsUpdate = true;
      }
    });
  }, [themeColor, scene]);

  scene.scale.set(0.5, 0.5, 0.5);
  scene.position.y = -0.5;

  return <primitive object={scene} />;
}

function Controls({ targetRef }) {
  const controlsRef = useRef();
  const { camera, gl } = useThree();

  useEffect(() => {
    if (targetRef?.current && controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();

      // Auto-fit model to canvas
      controlsRef.current.fitToBox(targetRef.current, true);
    }
  }, [targetRef]);

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableZoom
      enablePan={false}
      autoRotate
      autoRotateSpeed={1}
    />
  );
}

export default function DiamondViewer({ modelPath, themeColor }) {
  const modelRef = useRef();

  return (
    <div className="col-md-12">
      <div style={{ height: "300px", border: "1px solid #ddd" }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[1, 2, 3]} intensity={0.9} />
          <Suspense fallback={null}>
            <group ref={modelRef}>
              <Model modelPath={modelPath} themeColor={themeColor} />
            </group>
          </Suspense>
          <Controls targetRef={modelRef} />
        </Canvas>
      </div>
    </div>
  );
}
