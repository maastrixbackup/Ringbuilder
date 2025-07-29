// RingBuilderContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const RingBuilderContext = createContext();

export const useRingBuilder = () => useContext(RingBuilderContext);

export const RingBuilderProvider = ({ children }) => {
  const [selectedSetting, setSelectedSettingState] = useState(() => {
    const saved = localStorage.getItem("selectedSetting");
    return saved ? JSON.parse(saved) : null;
  });

  const [selectedDiamond, setSelectedDiamondState] = useState(() => {
    const saved = localStorage.getItem("selectedDiamond");
    return saved ? JSON.parse(saved) : null;
  });

  // Persist setting
  const setSelectedSetting = (setting) => {
    setSelectedSettingState(setting);
    localStorage.setItem("selectedSetting", JSON.stringify(setting));
  };

  // Persist diamond
  const setSelectedDiamond = (diamond) => {
    setSelectedDiamondState(diamond);
    localStorage.setItem("selectedDiamond", JSON.stringify(diamond));
  };

  return (
    <RingBuilderContext.Provider
      value={{
        selectedSetting,
        setSelectedSetting,
        selectedDiamond,
        setSelectedDiamond,
      }}
    >
      {children}
    </RingBuilderContext.Provider>
  );
};
