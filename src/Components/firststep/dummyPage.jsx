import { useState } from "react";

export default function DummyPage() {
  const steps = [
    { id: 1, label: "Select Ring" },
    { id: 2, label: "Ring Details" },
    { id: 3, label: "Select Diamond" },
    { id: 4, label: "Diamond Details" },
    { id: 5, label: "3D View & Checkout" },
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRing, setSelectedRing] = useState(null);
  const [selectedDiamond, setSelectedDiamond] = useState(null);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Stepper */}
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
            {/* Step Circle */}
            <button
              onClick={() => setCurrentStep(step.id)}
              className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold shadow-md transition-transform duration-300
                ${
                  step.id <= currentStep
                    ? "bg-yellow-500 hover:scale-110"
                    : "bg-gray-300 hover:scale-105"
                }`}
            >
              {step.id}
            </button>

            {/* Label */}
            <span
              className={`mt-2 text-sm transition-colors duration-300 ${
                step.id <= currentStep
                  ? "text-yellow-600 font-medium"
                  : "text-gray-500"
              }`}
            >
              {step.label}
            </span>

            {/* Previews with fade & slide-up */}
            {step.id === 1 && selectedRing && (
              <div
                className="mt-2 w-16 h-16 border border-yellow-400 rounded-lg p-1 bg-white shadow
                  animate-fade-slide"
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtK4qqTe-_RDGovxFMeqk22GbM74DxBDXNJA&s"
                  alt="Ring"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            {step.id === 3 && selectedDiamond && (
              <div
                className="mt-2 w-16 h-16 border border-yellow-400 rounded-lg p-1 bg-white shadow
                  animate-fade-slide"
              >
                <img
                  src="https://media.istockphoto.com/id/481365786/photo/diamond.jpg?s=612x612&w=0&k=20&c=niuZ5_KvgJrK08y-bjpXEsninUBf83ha-44_yrPmqpk="
                  alt="Diamond"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="p-6 border rounded-lg bg-white shadow transition-all duration-500">
        {currentStep === 1 && (
          <div className="animate-fade-slide">
            <h2 className="text-lg font-semibold mb-4">
              Step 1: Select Your Ring
            </h2>
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors duration-300"
              onClick={() =>
                setSelectedRing({
                  image: "https://via.placeholder.com/80",
                  name: "Gold Solitaire",
                })
              }
            >
              Pick Example Ring
            </button>
          </div>
        )}
        {currentStep === 3 && (
          <div className="animate-fade-slide">
            <h2 className="text-lg font-semibold mb-4">
              Step 3: Select Your Diamond
            </h2>
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors duration-300"
              onClick={() =>
                setSelectedDiamond({
                  image: "https://via.placeholder.com/80",
                  name: "1.2 Carat Round",
                })
              }
            >
              Pick Example Diamond
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-6 flex gap-3">
          {currentStep > 1 && (
            <button
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors duration-300"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Back
            </button>
          )}
          {currentStep < steps.length && (
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors duration-300"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

