import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { metalMaterial, diamondMaterial } from "./materials";

export default function Ring({ scale = 1 }) {
  const { scene } = useGLTF("/models/Ring_17740_JV_RND_100_decoded.glb");

  useEffect(() => {
    if (!scene) return;

    // Center the model
    const bbox = new THREE.Box3().setFromObject(scene);
    const center = bbox.getCenter(new THREE.Vector3());
    scene.position.sub(center);

    // Assign materials by mesh name
    scene.traverse((o) => {
      if (!o.isMesh) return;
      const n = o.name.toLowerCase();
      if (n.includes("stone") || n.includes("diamond")) {
        o.material = diamondMaterial;
      } else {
        o.material = metalMaterial;
        o.castShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={[scale, scale, scale]} />;
}
