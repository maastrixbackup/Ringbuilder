import React, { useState } from "react";
import { useRingBuilder } from "../context/RingBuilderContext";
import DiamondViewer from "./diamondViewer";
import { useNavigate } from "react-router-dom";
export default function CompleteRingPage() {
  const { selectedSetting, selectedDiamond } = useRingBuilder();
  const navigate = useNavigate();
  const themes = [
    {
      label: "Original",
      raw: true,
    },
    {
      label: "Gold",
      color: "#b8860b",
      metalness: 1,
      roughness: 0.2,
      envMapIntensity: 1.5,
    },
    {
      label: "Rose Gold",
      color: "#b76e79",
      metalness: 1,
      roughness: 0.25,
      envMapIntensity: 1.3,
    },
    {
      label: "Platinum",
      color: "#e5e4e2",
      metalness: 0.9,
      roughness: 0.3,
      envMapIntensity: 1.2,
    },
    {
      label: "Black",
      color: "#2f2f2f",
      metalness: 0.8,
      roughness: 0.35,
      envMapIntensity: 1.1,
    },
  ];

  const [theme, setTheme] = useState(themes[0]);

  return (
    <div className="container mt-4">
      <div className="stepper mb-4 d-flex justify-content-between">
        <div className="step">
          <div className="step-number">1</div>
          <div className="step-label">
            <small>Choose a</small>
            <strong>SETTING</strong>
          </div>
          <div className="step-icon">
            <i className="fas fa-cogs"></i>
          </div>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <div className="step-label">
            <small>Ring</small>
            <strong>Overview</strong>
          </div>
          <div className="step-icon">
            <i className="far fa-gem"></i>
          </div>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <div className="step-label">
            <small>Choose a</small>
            <strong>DIAMOND</strong>
          </div>
          <div className="step-icon">
            <i className="far fa-gem"></i>
          </div>
        </div>
        <div className="step active">
          <div className="step-number">3</div>
          <div className="step-label">
            <small>Complete</small>
            <strong>RING</strong>
          </div>
          <div className="step-icon">
            <i className="fas fa-ring"></i>
          </div>
        </div>
      </div>

      <div className="back-to-gallery mt-3 mb-2">
        <span
          onClick={() => navigate("/diamonds")}
          style={{
            fontSize: "12px",
            fontWeight: "600",
            textDecoration: "underline",
            cursor: "pointer",
            color: "#000",
            textTransform: "uppercase",
          }}
        >
          &lt; BACK TO DIAMOND SECTION
        </span>
      </div>

      <h3 className="mb-4">Your Completed Ring</h3>

      {!selectedSetting || !selectedDiamond ? (
        <p>Please go back and select both a setting and diamond.</p>
      ) : (
        <>
          <div className="mb-3">
            <strong>Choose Ring Theme:</strong>
            <div className="d-flex gap-2 mt-2">
              {themes.map((t) => (
                <button
                  key={t.label}
                  onClick={() => {
                    console.log("Theme selected:", t.label);
                    setTheme(t);
                  }}
                  style={{
                    backgroundColor: t.color,
                    border: "1px solid #ccc",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    outline:
                      theme.label === t.label ? "3px solid black" : "none",
                  }}
                  title={t.label}
                />
              ))}
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <DiamondViewer
                theme={theme}
                modelPath={"/models/gltf/ring.gltf"}
              />
            </div>

            <div className="col-md-4">
              <img
                src="https://dev.maastrixdemo.com/ring_builder/public/storage/images/rings/r_img_1753443378.jpeg"
                width="100%"
                alt="Ring"
              />
            </div>

            <div className="col-md-4">
              <p>
                <strong>Setting:</strong> {selectedSetting.label}
              </p>
              <p>
                <strong>Diamond:</strong> {selectedDiamond.label}
              </p>
              <p>
                <strong>Price:</strong> ₹{selectedDiamond.price}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
