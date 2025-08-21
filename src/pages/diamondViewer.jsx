import React, { Suspense, useEffect, useRef, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, SSAO } from "@react-three/postprocessing";
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
          child.material = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: theme.metalness ?? 1,
            roughness: theme.roughness ?? 0.05,
            envMapIntensity: theme.envMapIntensity ?? 2.0,
            reflectivity: 1,
            clearcoat: 1,
            clearcoatRoughness: 0.03,
          });
          child.material.needsUpdate = true;
        }
        
      }
    });

    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    scene.position.sub(center);
  }, [scene, theme]);

  return <primitive object={scene} ref={group} />;
}

function Controls() {
  const controlsRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 1.5, 4);
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
    }
  }, []);

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.15}
      enablePan={false}
      rotateSpeed={0.6}
      autoRotate
      autoRotateSpeed={2.0}
    />
  );
}

export default function DiamondViewer({ theme, modelPath }) {
  return (
    <div className="col-md-12">
      <div style={{ height: "400px", border: "1px solid #ddd" }}>
        <Canvas
          camera={{ fov: 35 }}
          gl={{
            physicallyCorrectLights: true,
            outputEncoding: THREE.sRGBEncoding,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.3,
            antialias: true,
            powerPreference: "high-performance",
          }}
        >
          <Suspense fallback={null}>
            <Environment
              files="/hdr/studio_small_03_1k.hdr"
              background={false}
              intensity={1.2}
            />
          </Suspense>

          {/* Key Lights */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <directionalLight position={[-5, 5, -5]} intensity={1.5} color={0xfff8e7} />

          <Suspense fallback={null}>
            <Model key={theme.label} theme={theme} modelPath={modelPath} />
          </Suspense>

          <Controls />

          {/* <EffectComposer>
            <Bloom
              luminanceThreshold={0.8}
              luminanceSmoothing={0.1}
              intensity={0.4}
            />
            <SSAO
              radius={0.2}
              intensity={30}
              luminanceInfluence={0.5}
            />
          </EffectComposer> */}
        </Canvas>
      </div>
    </div>
  );
}
