import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tab from "../Components/Tab";
import Header from "../Components/Header";
import { setCurrentStep } from "../store/ringBuilderSlice";
import RingViewer from "./RingViewer";
import MetalSwitcher from "../Components/MetalSwitcher";
import { setMetalTheme } from "../Components/materials";

export default function CompleteRingPage() {
  const dispatch = useDispatch();
  const { selectedSetting, selectedStone } = useSelector((s) => s.ringBuilder);

  const [selectedColor, setSelectedColor] = useState("white");

  useEffect(() => {
    dispatch(setCurrentStep(3));
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="container mt-4">
        <Tab />
        {!selectedSetting || !selectedStone ? (
          <p>Please go back and select both a setting and a diamond.</p>
        ) : (
          <>
            <div className="mt-3">
              <strong>Choose Ring Theme:</strong>
              <div className="d-flex gap-2 mt-2">
                <MetalSwitcher
                  setMetalTheme={setMetalTheme} // ✅ only changes material properties
                  setSelectedColor={setSelectedColor}
                  selectedColor={selectedColor}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <RingViewer metalKey={selectedColor} />
              </div>

              <div className="col-md-4">
                <img src={selectedSetting.image} width="100%" alt="Ring" />
              </div>

              <div className="col-md-4">
                <p>
                  <strong>Setting:</strong> {selectedSetting.label}
                </p>
                <p>
                  <strong>Diamond:</strong> {selectedStone.label}
                </p>
                <p>
                  <strong>Price:</strong> ${selectedStone.price}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
