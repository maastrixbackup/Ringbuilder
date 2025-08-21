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
  const { currentStep, selectedSetting, selectedStone, mode, filters } =
    useSelector((s) => s.ringBuilder);

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
        img: selectedStone?.image,
        price: selectedStone?.price,
      },
      {
        key: "complete",
        label: "Ring",
        tagline: "Complete",
        img: null,
        price: null,
      },
    ];
  }, [selectedSetting, mode, selectedStone]);

  // --- View button logic ---
  const goView = (tabIndex) => {
    switch (tabIndex) {
      case 0: // Setting -> Ring Details (1b)
        if (selectedSetting?.id) {
          navigate(`/ring-details?id=${selectedSetting.id}`);
        } else {
          navigate("/rings");
        }
        break;
      case 1: // Diamond -> Diamond Details
        navigate("/diamond-details");
        break;
      default:
        break;
    }
  };

  const doDelete = (tabIndex) => {
    switch (tabIndex) {
      case 0:
        dispatch(clearSelectedSetting());
        const query = new URLSearchParams(filters || {}).toString();
        navigate(`/rings${query ? `?${query}` : ""}`);
        break;
      case 1:
        dispatch(clearSelectedStone());
        navigate(mode === "gemstone" ? "/gemstones" : "/diamonds");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex mx-auto mt-24 rounded overflow-hidden border border-gray-300">
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
            className="relative flex-1 h-[80px] flex items-center justify-between px-5 py-3 bg-white"
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
            {/* Arrow */}
            {index !== STEPS.length - 1 && (
              <>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: "-16px",
                    width: 0,
                    height: 0,
                    borderTop: "40px solid transparent",
                    borderBottom: "40px solid transparent",
                    borderLeft: `16px solid ${highlightBorder}`,
                    zIndex: 1,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: "-15px",
                    width: 0,
                    height: 0,
                    borderTop: "40px solid transparent",
                    borderBottom: "40px solid transparent",
                    borderLeft: `16px solid white`,
                    zIndex: 2,
                  }}
                />
              </>
            )}

            {/* Step label click (tab itself) */}
            <div
              className="cursor-pointer ml-2"
              onClick={() => {
                if (!isFuture) {
                  if (index === 0) {
                    // Settings tab -> always Rings listing (1a)
                    const query = new URLSearchParams(filters || {}).toString();
                    navigate(`/rings${query ? `?${query}` : ""}`);
                  } else if (isCompleted || isActive) {
                    goView(index);
                  }
                  dispatch(setCurrentStep(index + 1));
                }
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: "50px",
                  height: "100%",
                  backgroundColor: "white",
                }}
              >
                <div
                  className="font-bold text-gray-800"
                  style={{
                    fontSize: "2rem",
                    lineHeight: 1,
                  }}
                >
                  {index + 1}
                </div>
              </div>
              <div className="text-[11px] text-gray-500">{step.tagline}</div>
              <div className="text-sm tracking-wide text-gray-900 font-medium">
                {step.label.toUpperCase()}
              </div>
            </div>

            {/* Image + Actions */}
            {step.img && index !== 2 && (isCompleted || isActive) && (
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-start">
                  {step.price && (
                    <div className="text-sm font-medium text-gray-800">
                      {step.price.toLocaleString()}
                    </div>
                  )}
                  <div className="flex gap-2 mt-1 text-xs">
                    {/* View button -> 1b Ring Details */}
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

                <div className="w-16 h-12 border border-gray-300 rounded overflow-hidden">
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
