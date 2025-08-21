// components/MetalSwitcher.js
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export default function MetalSwitcher({ setMetalTexture }) {
  const textures = {
    white: useLoader(TextureLoader, "/textures/metal/white.png"),
    yellow: useLoader(TextureLoader, "/textures/metal/yellow.png"),
    rose: useLoader(TextureLoader, "/textures/metal/rose.png"),
  };

  return (
    <div style={{ position: "absolute", top: 20, left: 20 }}>
      {Object.keys(textures).map((metal) => (
        <button
          key={metal}
          onClick={() => setMetalTexture(textures[metal])}
          style={{ marginRight: 10 }}
        >
          {metal}
        </button>
      ))}
    </div>
  );
}
