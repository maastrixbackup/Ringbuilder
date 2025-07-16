import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Lightformer } from "@react-three/drei";
import { useState } from "react";
import RingVariants from "./RingVariants";
import styles from "./RingCanvas.module.css";

const themes = [
  { label: "Studio", preset: "studio" },
  { label: "City", preset: "city" },
  { label: "Warehouse", preset: "warehouse" },
  { label: "Park", preset: "park" },
];

export default function JewelryViewer() {
  const [variant, setVariant] = useState(0);
  const [theme, setTheme] = useState("studio");

  return (
    <div className={styles.viewerWrapper}>
      <div className={styles.canvasBox}>
        <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 5, 5]} intensity={1} />
          <Environment preset={theme} />
          <RingVariants activeIndex={variant} />
          <OrbitControls autoRotate enableZoom enablePan />
        </Canvas>
      </div>

      <div className={styles.controls}>
        <h3>Theme Presets</h3>
        <div className={styles.themes}>
          {themes.map((t) => (
            <button
              key={t.preset}
              className={theme === t.preset ? styles.activeBtn : styles.btn}
              onClick={() => setTheme(t.preset)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
