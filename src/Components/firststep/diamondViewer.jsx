import React, { Suspense, useEffect, useRef, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

function Model({ theme, modelPath }) {
  const group = useRef();
  const { scene: originalScene } = useGLTF(
    import.meta.env.BASE_URL + modelPath
  );

  const scene = useMemo(() => originalScene.clone(true), [originalScene]);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
          const name = child.name?.toLowerCase() || "";
    const isDiamond = name.includes("diamond_round");
        if (!isDiamond && !theme.raw) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(theme.color),
            metalness: theme.metalness,
            roughness: theme.roughness,
            envMapIntensity: theme.envMapIntensity,
          });
          child.material.needsUpdate = true;
        }
      }
    });

    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    scene.position.sub(center);
    // scene.scale.set(0.5, 0.5, 0.5);
  }, [scene, theme]);

  return <primitive object={scene} ref={group} />;
}

function Controls() {
  const controlsRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 1.5, 5);
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
    }
  }, []);

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping={true}
      dampingFactor={0.15}
      enablePan={false}
      rotateSpeed={0.6}
      autoRotate={true}
      autoRotateSpeed={2.5}
    />
  );
}

export default function DiamondViewer({ theme, modelPath }) {
  return (
    <div className="col-md-12">
      <div style={{ height: "300px", border: "1px solid #ddd" }}>
        <Canvas
          camera={{ fov: 35 }}
          gl={{
            physicallyCorrectLights: true,
            outputEncoding: THREE.sRGBEncoding,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
        >
          <Environment preset="studio" background={false} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <Suspense fallback={null}>
            <Model key={theme.label} theme={theme} modelPath={modelPath} />
          </Suspense>
          <Controls />
        </Canvas>
      </div>
    </div>
  );
}
