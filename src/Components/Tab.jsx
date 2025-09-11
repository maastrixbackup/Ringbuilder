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
      case 1:
        if (selectedStone?.id) {
          navigate(`/diamond-details?id=${selectedStone.id}`);
        } else {
          navigate("/diamonds");
        }
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
    <div className="flex flex-wrap md:flex-nowrap mx-auto mt-22 rounded overflow-hidden border border-gray-300">
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
            className="relative flex-1 min-w-[160px] md:min-w-0 h-[70px] md:h-[80px] flex items-center justify-between px-3 md:px-5 py-2 md:py-3 bg-white"
            style={{
              borderRight:
                index !== STEPS.length - 1 && window.innerWidth >= 768
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
            {/* Arrow (desktop only) */}
            {index !== STEPS.length - 1 && (
              <div className="hidden md:block">
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
              </div>
            )}

            <div
              className="cursor-pointer ml-1 md:ml-2 flex-1"
              onClick={() => {
                if (!isFuture) {
                  if (index === 0) {
                    const query = new URLSearchParams(filters || {}).toString();
                    navigate(`/rings${query ? `?${query}` : ""}`);
                  } else if (index === 1) {
                  
                    navigate(mode === "gemstone" ? "/gemstones" : "/diamonds");
                  } else if (isCompleted || isActive) {
                    goView(index);
                  }
                  dispatch(setCurrentStep(index + 1));
                }
              }}
            >
              <div className="flex items-center">
                <div
                  className="font-bold text-gray-800 flex items-center justify-center"
                  style={{
                    fontSize: "1.5rem",
                    lineHeight: 1,
                    width: "40px",
                    height: "40px",
                  }}
                >
                  {index + 1}
                </div>
                <div className="ml-2">
                  <div className="text-[10px] md:text-[11px] text-gray-500">
                    {step.tagline}
                  </div>
                  <div className="text-xs md:text-sm tracking-wide text-gray-900 font-medium">
                    {step.label.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            {/* Image + Actions */}
            {step.img && index !== 2 && (
              <div className="flex items-center gap-2 ml-2">
                <div className="flex flex-col items-start">
                  {step.price != null && (
                    <div className="text-xs md:text-sm font-medium text-gray-800">
                      {step.price.toLocaleString()}
                    </div>
                  )}
                  <div className="flex gap-2 mt-1 text-[10px] md:text-xs">
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

                <div className="w-12 h-10 md:w-16 md:h-12 border border-gray-300 rounded overflow-hidden">
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
