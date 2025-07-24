import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRingBuilder } from "../../context/RingBuilderContext";

const diamondShapes = [
  { name: "Round", file: "diamond-shape-1.png" },
  { name: "Princess", file: "diamond-shape-2.png" },
  { name: "Emerald", file: "diamond-shape-3.png" },
  { name: "Asscher", file: "diamond-shape-4.png" },
  { name: "Cushion", file: "diamond-shape-5.png" },
  { name: "Marquise", file: "diamond-shape-6.png" },
  { name: "Oval", file: "diamond-shape-7.png" },
  { name: "Radiant", file: "diamond-shape-8.png" },
  { name: "Pear", file: "diamond-shape-9.png" },
  { name: "Heart", file: "diamond-shape-10.png" },
];

const allDiamonds = [
  { id: 1, shape: "Round" },
  { id: 2, shape: "Princess" },
  { id: 3, shape: "Emerald" },
  { id: 4, shape: "Oval" },
  { id: 5, shape: "Round" },
  { id: 6, shape: "Pear" },
  { id: 7, shape: "Heart" },
  { id: 8, shape: "Cushion" },
];

const DiamondsPage = () => {
  const [selectedShape, setSelectedShape] = useState("All");
  const navigate = useNavigate();
  const { setSelectedDiamond } = useRingBuilder();
  const filteredDiamonds =
    selectedShape === "All"
      ? allDiamonds
      : allDiamonds.filter((d) => d.shape === selectedShape);

  return (
    <section className="mt-2">
      <div className="container-fluid">
        {/* Stepper */}
        <div className="stepper">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-label">
              <small>Choose a</small>
              <strong>SETTING</strong>
            </div>
            <div className="step-icon">
              <i className="fas fa-cogs"></i>
            </div>
          </div>

          <div className="step active">
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

        {/* Filter Row */}
        <div className="row mt-4">
          <div className="col-md-7">
            <div className="ring-style-list d-flex flex-wrap gap-2">
              {diamondShapes.map((shape, i) => (
                <div
                  key={shape.name}
                  className={`ring-style-item ${
                    selectedShape === shape.name ? "border border-dark" : ""
                  }`}
                  style={{ width: "70px", cursor: "pointer" }}
                  onClick={() => setSelectedShape(shape.name)}
                >
                  <div className="shape-box text-center">
                    <img
                      src={`/diamonds/${shape.file}`}
                      alt={shape.name}
                      height={i === 9 ? "20px" : "30px"}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="col-md-7 mt-4">
            <h1 className="engaging-ring">
              View All Diamonds{" "}
              <span className="disable">[12,696 of 182,404]</span>
            </h1>
            <p className="paragragh-engaging-ring pt-3">
              Pick your perfect diamond with James Allen. Start by choosing a
              high-quality, GIA-certified diamond from our selection of
              conflict-free diamonds. Then select your preferred ring setting!
            </p>
          </div>
        </div>

        {/* Diamond Preview Cards */}
        <div className="row mt-4">
          {filteredDiamonds.slice(0, 1).map((diamond) => (
            <div className="col-md-3" key={diamond.id}>
              <div
                className="ring-product-box"
                onClick={() => {
                  setSelectedDiamond({
                    label: diamond.shape + " Cut Diamond",
                    price: "$2060",
                    model: "/models/di_03.glb",
                  });
                  navigate("/complete-ring");
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="ring-image-box">
                  <img
                    src="https://ion.jamesallen.com/sgmdirect/photoID/41178066/Diamond/25617287/nl/Diamond-round-1-Carat_4_first_.jpg"
                    className="w-100"
                    alt="Diamond"
                  />
                </div>
                <div className="content-ring-box">
                  <p>
                    IGI 1.00 Carat H-SI1 Excellent Cut {diamond.shape} Diamond
                  </p>
                  <p>$2,060</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiamondsPage;
