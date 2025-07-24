// import React from "react";
// import { useRingBuilder } from "../../context/RingBuilderContext";
// import DiamondViewer from "./diamondViewer";

// export default function CompleteRingPage() {
//   const { selectedSetting, selectedDiamond } = useRingBuilder();

//   if (!selectedDiamond) return <p>No diamond selected.</p>;

//   return (
//     <div className="container mt-4">
//       <h3>Your Completed Ring</h3>
//       <DiamondViewer modelPath={selectedDiamond.model} />
//       <p>
//         <strong>Setting:</strong> {selectedSetting?.label}
//       </p>
//       <p>
//         <strong>Diamond:</strong> {selectedDiamond.label}
//       </p>
//       <p>
//         <strong>Price:</strong> {selectedDiamond.price}
//       </p>
//     </div>
//   );
// }

// src/Components/firststep/completingpage.jsx
import React from "react";
import { useRingBuilder } from "../../context/RingBuilderContext";
import DiamondViewer from "./diamondViewer";

export default function CompleteRingPage() {
  const { selectedSetting, selectedDiamond } = useRingBuilder();

  return (
    <div className="container mt-4">
      <div className="stepper mb-4">
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
          <DiamondViewer modelPath={selectedDiamond.model} />
          <div className="mt-4">
            <p>
              <strong>Setting:</strong> {selectedSetting.label}
            </p>
            <p>
              <strong>Diamond:</strong> {selectedDiamond.label}
            </p>
            <p>
              <strong>Price:</strong> {selectedDiamond.price}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
