import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Ring({ metalTexture, scale = 1 }) {
  const { scene } = useGLTF("/models/Ring_17740_JV_RND_100_decoded.glb");

  useEffect(() => {
    if (!scene) return;

    const bbox = new THREE.Box3().setFromObject(scene);
    const center = bbox.getCenter(new THREE.Vector3());
    scene.position.sub(center);

    scene.traverse((child) => {
      if (child.isMesh) {
        if (child.name === "Body_1") {
          const material = new THREE.MeshPhysicalMaterial({
            metalness: 1,
            roughness: 0.2,
            clearcoat: 1,
            clearcoatRoughness: 0.05,
            envMapIntensity: 2,
          });

          if (metalTexture?.isTexture) {
            material.map = metalTexture;
            material.map.anisotropy = 8;
            material.map.encoding = THREE.sRGBEncoding;
          } else if (metalTexture?.isColor) {
            material.color = metalTexture;
          }

          child.material = material;
        }
        // ❌ Do nothing for diamond meshes
      }
    });
  }, [scene, metalTexture]);

  return <primitive object={scene} scale={[scale, scale, scale]} />;
}
