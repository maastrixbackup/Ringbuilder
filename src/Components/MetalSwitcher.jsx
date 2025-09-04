// components/MetalSwitcher.js
import { setMetalHDR } from "../utils/lightingHelpers";

const themes = [
  {
    label: "white",
    color: "#e5e4e2",
    metalness: 1,
    roughness: 0.2,
    envMapIntensity: 1.5,
  },
  {
    label: "rose",
    color: "#b76e79",
    metalness: 1,
    roughness: 0.25,
    envMapIntensity: 1.3,
  },
  {
    label: "yellow",
    color: "#b8860b",
    metalness: 0.9,
    roughness: 0.3,
    envMapIntensity: 1.2,
  },
];

export default function MetalSwitcher({
  setMetalTheme,
  setSelectedColor,
  selectedColor,
  renderer,
  scene,
}) {
  const handleChange = (data) => {
    setMetalHDR(data.label, renderer, scene);
    setMetalTheme(data.label);
    setSelectedColor(data.label);
  };

  return (
    <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
      {themes.map((theme) => (
        <button
          key={theme.label}
          onClick={() => handleChange(theme)}
          style={{
            backgroundColor: theme.color,
            border: "1px solid #ccc",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            cursor: "pointer",
            outline: selectedColor === theme.label ? "3px solid black" : "none",
          }}
          title={theme.label}
        />
      ))}
    </div>
  );
}
