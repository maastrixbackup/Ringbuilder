import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRingBuilder } from "../../context/RingBuilderContext";
const styles = [
  { name: "Solitaire", file: "Solitaire.298b4.svg" },
  { name: "Pavé", file: "Pave.02a75.svg" },
  { name: "Channel Set", file: "ChannelSet.bfa07.svg" },
  { name: "Side-Stone", file: "SideStone.b47b8.svg" },
  { name: "Three Stone", file: "ThreeStones.fe216.svg" },
  { name: "Bezel", file: "Bezel.cc61c.svg" },
  { name: "Halo", file: "Halo.09bb1.svg" },
  { name: "Hidden Halo", file: "HiddenHalo.0d63e.svg" },
];

const allRings = [
  { id: 1, style: "Solitaire" },
  { id: 2, style: "Pavé" },
  { id: 3, style: "Channel Set" },
  { id: 4, style: "Side-Stone" },
  { id: 5, style: "Three Stone" },
  { id: 6, style: "Bezel" },
  { id: 7, style: "Halo" },
  { id: 8, style: "Hidden Halo" },
];

const GpPage = () => {
  const [selectedStyle, setSelectedStyle] = useState("All");
  const navigate = useNavigate();
  const { setSelectedSetting } = useRingBuilder();
  const filteredRings =
    selectedStyle === "All"
      ? allRings
      : allRings.filter((ring) => ring.style === selectedStyle);

  return (
    <section className="mt-2">
      <div className="container-fluid">
        <div className="stepper">
          <div className="step active">
            <div className="step-number">1</div>
            <div className="step-label">
              <small>Choose a</small>
              <strong>SETTING</strong>
            </div>
            <div className="step-icon">
              <i className="fas fa-cogs"></i>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-label">
              <small>Choose a</small>
              <strong>DIAMOND</strong>
            </div>
            <div className="step-icon">
              <i className="far fa-gem"></i>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-label">
              <small>Complete</small>
              <strong>RING</strong>
            </div>
            <div className="step-icon">
              <i className="fas fa-ring"></i>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-7">
            <h1 className="engaging-ring">
              Engagement Rings: Choose Your Perfect Setting{" "}
              <span className="disable">[1,946]</span>
            </h1>
            <p className="paragragh-engaging-ring pt-3">
              Our selection of engagement ring settings includes every metal and
              every style. Yellow gold, white gold, platinum, and rose gold;
              vintage, modern, classic or trendy — we have the perfect ring.
            </p>
          </div>

        
          <div className="col-md-7">
            <div className="ring-style-list">
              {styles.map((style) => (
                <div
                  key={style.name}
                  className={`ring-style-item ${
                    selectedStyle === style.name ? "border border-dark" : ""
                  }`}
                  onClick={() => setSelectedStyle(style.name)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={`/settings/${style.file}`} alt={style.name} />
                  <span>{style.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row mt-4">
          {filteredRings.slice(0, 1).map((ring) => (
            <div className="col-md-3" key={ring.id}>
              <div
                className="ring-product-box"
                onClick={() => {
                  setSelectedSetting({
                    label: ring.style + " Engagement Ring",
                    price: "$760",
                  });
                  navigate("/diamonds");
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="ring-image-box">
                  <div className="product-container">
                    <img
                      src="/settings/ring.jpg"
                      alt="Default product"
                      className="default-image w-100"
                    />
                    <img
                      src="/settings/second-image.jpg"
                      alt="On model"
                      className="hover-image w-100"
                    />
                  </div>
                </div>
                <div className="content-ring-box">
                  <p>{ring.style} Engagement Ring</p>
                  <p>$760 (Setting Price)</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GpPage;
