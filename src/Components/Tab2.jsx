import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRingBuilder } from "../context/RingBuilderContext";

export default function Tab2() {
  const { currentStep, setCurrentStep } = useRingBuilder();
  const location = useLocation();

  const steps = [
    { id: 1, label: "Select Ring" },
    { id: 2, label: "Ring Details" },
    { id: 3, label: "Select Diamond" },
    { id: 4, label: "Diamond Details" },
    { id: 5, label: "3D View & Checkout" },
  ];

  useEffect(() => {
    if (location.pathname === "/") setCurrentStep(1);
    else if (location.pathname === "/ring-details") setCurrentStep(2);
    else if (location.pathname === "/diamonds") setCurrentStep(3);
    else if (location.pathname === "/diamond-details") setCurrentStep(4);
    else if (location.pathname === "/complete-ring") setCurrentStep(5);
  }, [location.pathname]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8 relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-200"></div>
        <div
          className="absolute top-5 left-0 h-1 bg-yellow-500 transition-all duration-500"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        ></div>

        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center flex-1 z-10">
            <button
              className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold shadow-md transition-transform duration-300
                ${
                  step.id <= currentStep
                    ? "bg-yellow-500 hover:scale-110"
                    : "bg-gray-300 hover:scale-105"
                }`}
            >
              {step.id}
            </button>
            <span
              className={`mt-2 text-sm transition-colors duration-300 ${
                step.id <= currentStep
                  ? "text-yellow-600 font-medium"
                  : "text-gray-500"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
