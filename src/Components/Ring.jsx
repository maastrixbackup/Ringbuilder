import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Ring({ metalTexture, scale = 1 }) {
  const { scene } = useGLTF("/models/Ring_17740_JV_RND_100.gltf", true);

  useEffect(() => {
    if (!scene) return;

    // Center the model
    const bbox = new THREE.Box3().setFromObject(scene);
    const center = bbox.getCenter(new THREE.Vector3());
    scene.position.sub(center);

    // Apply enhanced metal material
    scene.traverse((child) => {
      if (child.isMesh) {
        const material = new THREE.MeshPhysicalMaterial({
          metalness: 1,
          roughness: 0.2,
          clearcoat: 1,
          clearcoatRoughness: 0.05,
          envMapIntensity: 2,
        });

        // Optional: enable anisotropy for better texture clarity
        if (material.map) {
          material.map.anisotropy = 8;
          material.map.encoding = THREE.sRGBEncoding;
        }

        child.material = material;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene, metalTexture]);

  return <primitive object={scene} scale={[scale, scale, scale]} />;
}
