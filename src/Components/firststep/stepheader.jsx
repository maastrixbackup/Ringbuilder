import React from "react";
import { useLocation } from "react-router-dom";

const StepHeader = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex gap-5 justify-center p-4 border-b">
      <div className={`step ${isActive("/") ? "font-bold" : ""}`}>1 Choose a <br /> SETTING</div>
      <div className={`step ${isActive("/diamonds") ? "font-bold" : ""}`}>2 Choose a <br /> DIAMOND</div>
      <div className={`step ${isActive("/complete-ring") ? "font-bold" : ""}`}>3 Complete <br /> RING</div>
    </div>
  );
};

export default StepHeader;
