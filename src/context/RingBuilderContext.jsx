import React, { createContext, useContext, useState } from "react";

const RingBuilderContext = createContext();

export const useRingBuilder = () => useContext(RingBuilderContext);

export const RingBuilderProvider = ({ children }) => {
  const [selectedSetting, setSelectedSetting] = useState(null);
  const [selectedDiamond, setSelectedDiamond] = useState(null);

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
