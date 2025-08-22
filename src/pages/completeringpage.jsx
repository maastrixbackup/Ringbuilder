import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DiamondViewer from "./diamondViewer";
import Tab from "../Components/Tab";
import Header from "../Components/Header";
import { setCurrentStep } from "../store/ringBuilderSlice";
import RingViewer from "./RingViewer";
import MetalSwitcher from "../Components/MetalSwitcher";
import * as THREE from "three";

export default function CompleteRingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedSetting, selectedStone } = useSelector((s) => s.ringBuilder);

  const themes = [
    { label: "Original", raw: true },
    {
      label: "Gold",
      color: "#b8860b",
      metalness: 1,
      roughness: 0.2,
      envMapIntensity: 1.5,
    },
    {
      label: "Rose Gold",
      color: "#b76e79",
      metalness: 1,
      roughness: 0.25,
      envMapIntensity: 1.3,
    },
    {
      label: "Platinum",
      color: "#e5e4e2",
      metalness: 0.9,
      roughness: 0.3,
      envMapIntensity: 1.2,
    },
    {
      label: "Black",
      color: "#2f2f2f",
      metalness: 0.8,
      roughness: 0.35,
      envMapIntensity: 1.1,
    },
  ];

  const [metalTexture, setMetalTexture] = useState(
    new THREE.TextureLoader().load("/textures/metal/white.png")
  );

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
                <MetalSwitcher setMetalTexture={setMetalTexture} />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                {/* <DiamondViewer theme={theme} modelPath={"models/3.glb"} /> */}
                <RingViewer metalTexture={metalTexture} />
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
