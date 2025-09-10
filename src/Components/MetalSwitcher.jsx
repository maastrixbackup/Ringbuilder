// components/MetalSwitcher.js

const themes = [
  {
    label: "white",
    color: "#e5e4e2",
    roughness: 0.12, // polished white gold
    envMapIntensity: 1.0,
  },
  {
    label: "rose",
    color: "#b76e79",
    roughness: 0.14, // slightly softer gradient
    envMapIntensity: 1.05,
  },
  {
    label: "yellow",
    color: "#b8860b",
    roughness: 0.14,
    envMapIntensity: 1.05,
  },
];

export default function MetalSwitcher({
  setMetalTheme,
  setSelectedColor,
  selectedColor,
}) {
  const handleChange = (data) => {
    setMetalTheme(data.label); // only updates material props
    setSelectedColor(data.label); // drives HDRSetup through metalKey
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
