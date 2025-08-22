// components/HeadDecoration.js
import { Decal } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

export default function HeadDecoration({ mesh }) {
  const texture = useLoader(THREE.TextureLoader, "/textures/rndHead_px.webp");

  if (!mesh?.current) return null;

  return (
    <Decal
      mesh={mesh.current}
        position={[0, 0.5, 0]} // adjust to diamond top
        rotation={[0, 0, 0]}
        scale={2} // adjust size
        map={texture}
    />
  );
}
