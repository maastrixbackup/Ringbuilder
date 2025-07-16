import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export default function RingVariants({ activeIndex }) {
  const { scene } = useGLTF("/models/di_03.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.name.startsWith("Variant_")) {
        child.visible = child.name === `Variant_${activeIndex + 1}`;
      }
    });
  }, [scene, activeIndex]);

  return <primitive object={scene} scale={1.8} position={[0, -0.3, 0]} />;
}
