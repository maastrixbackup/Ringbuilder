import { useState } from "react";

const STEPS = [
  {
    key: "style",
    label: "Setting",
    tagline: "Choose a Setting",
    price: "$1,200",
    img: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=200&auto=format&fit=crop",
  },
  {
    key: "metal",
    label: "Setting",
    tagline: "View your Setting",
    price: "$1,200",
    img: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=200&auto=format&fit=crop",
  },
  {
    key: "stone",
    label: "Diamond",
    tagline: "Choose a Diamond",
    price: "$3,500",
    img: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=200&auto=format&fit=crop",
  },
  {
    key: "customize",
    label: "Diamond",
    tagline: "View Diamond",
    price: "$3,500",
    img: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=200&auto=format&fit=crop",
  },
  {
    key: "review",
    label: "Complete Ring",
    tagline: "Checkout",
    price: "$4,700",
    img: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=200&auto=format&fit=crop",
  },
];

export default function RingBuilderArrowStepperImages() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <div className="flex w-full">
        {STEPS.map((step, index) => {
          const isCompleted = index < current;
          const isActive = index === current;
          const baseColor = isActive
            ? "bg-yellow-400 text-black shadow-lg scale-105"
            : isCompleted
            ? "bg-green-400 text-black border-green-600 shadow-lg"
            : "bg-gray-100 text-black border-2";

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
                className={`flex items-center justify-between h-22 w-full border ${baseColor} transition-all px-4`}
              >
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm font-semibold text-black">{step.label}</span>
                  <span className="text-xs">{step.tagline}</span>
                  <span className="text-sm font-bold text-yellow-700 mt-1">
                    {isCompleted && step.price}
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  {index !== 4 && isCompleted && (
                    <div
                      className={`w-12 h-12 overflow-hidden rounded-md border shadow-sm 
                    ${isActive ? "border-yellow-500" : "!border-gray-400"}`}
                    >
                      {isCompleted && index !== 4 && (
                        <img
                          src={step.img}
                          alt={step.label}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  )}

                  <div className="flex gap-2 mt-1 text-xs">
                    {isCompleted && (
                      <>
                        <button className="text-blue-600 hover:underline">
                          View
                        </button>
                        <button className="text-red-600 hover:underline">
                          Delete
                        </button>{" "}
                      </>
                    )}
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
