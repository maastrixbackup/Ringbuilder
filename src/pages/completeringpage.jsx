import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DiamondViewer from "./diamondViewer";
import Tab from "../Components/Tab";
import Header from "../Components/Header";
import { setCurrentStep } from "../store/ringBuilderSlice";
import Loader from "../utils/loader";

export default function CompleteRingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedSetting, selectedStone } = useSelector((s) => s.ringBuilder);
  const [loading, setLoading] = useState(true);

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

  const [theme, setTheme] = useState(themes[0]);

  useEffect(() => {
    dispatch(setCurrentStep(3));
    setLoading(false);
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className={`container ${loading ? "blurred" : ""}`}>
          <Tab />

          <div className="back-to-gallery mt-4 mb-4">
            <span
              onClick={() => navigate("/diamonds")}
              style={{
                fontSize: "12px",
                fontWeight: "600",
                textDecoration: "underline",
                cursor: "pointer",
                color: "#000",
                textTransform: "uppercase",
              }}
            >
              &lt; BACK TO DIAMOND SECTION
            </span>
          </div>

          <h3 className="mb-4">Your Completed Ring</h3>

          {!selectedSetting || !selectedStone ? (
            <p>Please go back and select both a setting and a diamond.</p>
          ) : (
            <>
              <div className="mb-3">
                <strong>Choose Ring Theme:</strong>
                <div className="d-flex gap-2 mt-2">
                  {themes.map((t) => (
                    <button
                      key={t.label}
                      onClick={() => setTheme(t)}
                      style={{
                        backgroundColor: t.color,
                        border: "1px solid #ccc",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        outline:
                          theme.label === t.label ? "3px solid black" : "none",
                      }}
                      title={t.label}
                    />
                  ))}
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <DiamondViewer
                    theme={theme}
                    modelPath={"models/gltf/ring.gltf"}
                  />
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
          {loading && <Loader isLoading={loading} />}
        </div>
      </div>
    </>
  );
}
