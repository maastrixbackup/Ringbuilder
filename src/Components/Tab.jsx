import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearSelectedSetting,
  clearSelectedStone,
  setCurrentStep,
} from "../store/ringBuilderSlice";

export default function RingBuilderArrowStepperImages() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentStep, selectedSetting, selectedStone, mode } = useSelector(
    (s) => s.ringBuilder
  );

  const STEPS = useMemo(() => {
    const stoneLabel = mode === "gemstone" ? "Gemstone" : "Diamond";
    return [
      {
        key: "style",
        label: "Setting",
        tagline: "Choose a Setting",
        img: selectedSetting?.image,
        price: selectedSetting?.price,
      },
      {
        key: "metal",
        label: "Setting",
        tagline: "View your Setting",
        img: selectedSetting?.image,
        price: selectedSetting?.price,
      },
      {
        key: "stone",
        label: stoneLabel,
        tagline: `Choose a ${stoneLabel}`,
        img: selectedStone?.image,
        price: selectedStone?.price,
      },
      {
        key: "customize",
        label: stoneLabel,
        tagline: `View ${stoneLabel}`,
        img: selectedStone?.image,
        price: selectedStone?.price,
      },
      {
        key: "review",
        label: "Complete Ring",
        tagline: "Checkout",
        img: null,
        price: null,
      },
    ];
  }, [selectedSetting, selectedStone, mode]);

  const goView = (index) => {
    switch (index) {
      case 0:
        navigate("/rings");
        break;
      case 1:
        navigate("/ring-details");
        break;
      case 2:
      case 3:
        navigate(mode === "gemstone" ? "/gemstones" : "/diamonds");
        break;
      default:
        break;
    }
  };

  const doDelete = (index) => {
    switch (index) {
      case 0: // delete setting selection
      case 1:
        dispatch(clearSelectedSetting());
        navigate("/rings");
        break;
      case 2:
      case 3:
        dispatch(clearSelectedStone());
        navigate(mode === "gemstone" ? "/gemstones" : "/diamonds");
        break;
      default:
        break;
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <div className="flex w-full">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentStep - 1;
          const isActive = index === currentStep - 1;
          const isFuture = index > currentStep - 1;

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
                disabled={isFuture}
                onClick={() => {
                  if (!isFuture) {
                    if (isCompleted || isActive) goView(index);
                    dispatch(setCurrentStep(index + 1));
                  }
                }}
                className={`flex items-center justify-between h-22 w-full border ${baseColor} transition-all px-4`}
              >
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm font-semibold text-black">
                    {step.label}
                  </span>
                  <span className="text-xs">{step.tagline}</span>
                  <span className="text-sm font-bold text-yellow-700 mt-1">
                    {isCompleted && step.price}
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  {index !== 4 && isCompleted && (
                    <div
                      className={`w-12 h-12 overflow-hidden rounded-md border shadow-sm ${
                        isActive ? "border-yellow-500" : "!border-gray-400"
                      }`}
                    >
                      {isCompleted && step.img && (
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
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            goView(index);
                          }}
                        >
                          View
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            doDelete(index);
                          }}
                        >
                          Delete
                        </button>
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
