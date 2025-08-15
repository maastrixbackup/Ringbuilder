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
        key: "setting",
        label: "Setting",
        tagline: "Choose a",
        img: selectedSetting?.image,
        price: selectedSetting?.price,
      },
      {
        key: "diamond",
        label: `${stoneLabel}`,
        tagline: `Choose a`,
        img: selectedSetting?.image,
        price: selectedSetting?.price,
      },
      {
        key: "complete",
        label: "Ring",
        tagline: "Complete",
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
      case 0:
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
    <div className="flex max-w-6xl mx-auto mt-24 rounded overflow-hidden border border-gray-300">
      {STEPS.map((step, index) => {
        const isCompleted = index < currentStep - 1;
        const isActive = index === currentStep - 1;
        const isFuture = index > currentStep - 1;

        const highlightBorder = isActive
          ? "#eab308"
          : isCompleted
          ? "#22c55e"
          : "#d1d5db";

        return (
          <div
            key={step.key}
            className="relative  flex-1 h-[100px] flex items-center justify-between px-6 py-4 bg-white"
            style={{
              borderRight:
                index !== STEPS.length - 1
                  ? "none"
                  : `1px solid ${highlightBorder}`,
              borderTop: `1px solid ${highlightBorder}`,
              borderLeft: `1px solid ${highlightBorder}`,
              borderBottom: `1px solid ${highlightBorder}`,
              boxShadow: isActive
                ? "0 0 10px rgba(212,175,55,0.4)"
                : isCompleted
                ? "0 0 6px rgba(34,197,94,0.3)"
                : "none",
            }}
            disabled={isFuture}
          >
            {index !== STEPS.length - 1 && (
              <>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: "-20px",
                    width: 0,
                    height: 0,
                    borderTop: "50px solid transparent",
                    borderBottom: "50px solid transparent",
                    borderLeft: `20px solid ${highlightBorder}`,
                    zIndex: 1,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: "-19px",
                    width: 0,
                    height: 0,
                    borderTop: "50px solid transparent",
                    borderBottom: "50px solid transparent",
                    borderLeft: `20px solid white`,
                    zIndex: 2,
                  }}
                />
              </>
            )}

            <div
              className="cursor-pointer"
              onClick={() => {
                if (!isFuture) {
                  if (isCompleted || isActive) goView(index);
                  dispatch(setCurrentStep(index + 1));
                }
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: "60px", // fixed width for uniform look
                  height: "100%", // take full height of the step
                  backgroundColor: "white",
                }}
              >
                <div
                  className="font-bold text-gray-800"
                  style={{
                    fontSize: "2.5rem",
                    lineHeight: 1,
                  }}
                >
                  {index + 1}
                </div>
              </div>
              <div className="text-xs text-gray-500">{step.tagline}</div>
              <div className="text-sm tracking-wide text-gray-900 font-medium">
                {step.label.toUpperCase()}
              </div>
            </div>

            {step.img && index !== 2 && isCompleted && (
              <div className="flex items-center gap-3">
                {/* Price and Actions */}
                <div className="flex flex-col items-start">
                  {step.price && (
                    <div className="text-sm font-medium text-gray-800">
                      {step.price.toLocaleString()}
                    </div>
                  )}
                  <div className="flex gap-2 mt-1 text-xs">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goView(index);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        doDelete(index);
                      }}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Image */}
                <div className="w-18 h-14 border border-gray-300 rounded overflow-hidden">
                  <img
                    src={step.img}
                    alt={step.label}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
