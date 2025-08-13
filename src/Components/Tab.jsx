import { useState } from "react";

const STEPS = [
  {
    key: "style",
    label: "Style",
    tagline: "Pick a ring style",
    img: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=200&auto=format&fit=crop",
  },
  {
    key: "metal",
    label: "Metal",
    tagline: "Choose your metal",
    img: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=200&auto=format&fit=crop",
  },
  {
    key: "stone",
    label: "Stone",
    tagline: "Select a gemstone",
    img: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=200&auto=format&fit=crop",
  },
  {
    key: "customize",
    label: "Customize",
    tagline: "Size & engraving",
    img: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=200&auto=format&fit=crop",
  },
  {
    key: "review",
    label: "Review",
    tagline: "Summary & checkout",
    img: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=200&auto=format&fit=crop",
  },
];

export default function RingBuilderArrowStepperImages() {
  const [current, setCurrent] = useState(1); // example: on step 2

  return (
    <div className="max-w-6xl mx-auto mt-6">
      {/* Tabs Row */}
      <div className="flex w-full">
        {STEPS.map((step, index) => {
          const isCompleted = index < current;
          const isActive = index === current;
          const baseColor = isCompleted
            ? "bg-yellow-400 text-white"
            : isActive
            ? "bg-yellow-50 text-yellow-800 border-yellow-500 shadow-lg scale-105"
            : "bg-gray-100 text-gray-500 border-gray-300";

          return (
            <div
              key={step.key}
              className="relative flex-1 transition-transform duration-200"
              style={{
                clipPath:
                  index !== STEPS.length - 1
                    ? "polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%)"
                    : "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              }}
            >
              <button
                onClick={() => setCurrent(index)}
                className={`flex flex-col items-center justify-center h-20 w-full border ${baseColor} transition-all px-2`}
              >
                {/* Step Image */}
                <div
                  className={`w-8 h-8 mb-1 overflow-hidden rounded-full border shadow-sm 
                  ${isActive ? "border-yellow-500" : "border-gray-300"}`}
                >
                  <img
                    src={step.img}
                    alt={step.label}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Step Label */}
                <span className="text-sm font-semibold">{step.label}</span>
                <span className="text-xs">{step.tagline}</span>
              </button>
            </div>
          );
        })}
      </div>

      
    </div>
  );
}
