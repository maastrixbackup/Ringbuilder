import React, { useState } from "react";
import { useRingBuilder } from "../../context/RingBuilderContext";
import DiamondViewer from "./diamondViewer";

export default function CompleteRingPage() {
  const { selectedSetting, selectedDiamond } = useRingBuilder();

  const [themeColor, setThemeColor] = useState("#b8860b"); // default: Gold

  const themes = [
    { label: "Gold", color: "#b8860b" },
    { label: "Rose Gold", color: "#b76e79" },
    { label: "Platinum", color: "#e5e4e2" },
    { label: "Black", color: "#2f2f2f" },
  ];

  return (
    <div className="container mt-4">
      {/* Stepper */}
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

      <h3 className="mb-4">Your Completed Ring</h3>

      {!selectedSetting || !selectedDiamond ? (
        <p>Please go back and select both a setting and diamond.</p>
      ) : (
        <>
          {/* Theme Picker */}
          <div className="mb-3">
            <strong>Choose Ring Theme:</strong>
            <div className="d-flex gap-2 mt-2">
              {themes.map((t) => (
                <button
                  key={t.color}
                  onClick={() => setThemeColor(t.color)}
                  style={{
                    backgroundColor: t.color,
                    border: "1px solid #ccc",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    outline: themeColor === t.color ? "2px solid black" : "none",
                  }}
                  title={t.label}
                />
              ))}
            </div>
          </div>

          <div className="row">
            {/* Diamond 3D Viewer */}
            <div className="col-md-4">
              <DiamondViewer
                // modelPath={selectedDiamond.model}
                themeColor={themeColor}
              />
            </div>

            {/* Ring Image (static) */}
            <div className="col-md-4">
              <img
                src="https://dev.maastrixdemo.com/ring_builder/public/storage/images/rings/r_img_1753443378.jpeg"
                width="100%"
                alt="Ring"
              />
            </div>

            {/* Info Section */}
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
