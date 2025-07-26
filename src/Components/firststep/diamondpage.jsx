import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRingBuilder } from "../../context/RingBuilderContext";
import { baseUrl } from "../../utils/utils";
import Loader from "../../utils/loader";

const DiamondsPage = () => {
  const navigate = useNavigate();
  const { setSelectedDiamond } = useRingBuilder();
  const [loading, setLoading] = useState(true);
  const [diamondShapes, setDiamondShapes] = useState([]);
  const [allDiamonds, setAllDiamonds] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null); // no "All"

  const getDiamonds = async (shape = null) => {
    try {
      setLoading(true);

      const payload = {};
      if (shape) {
        payload.shape = shape;
      }

      const res = await fetch(baseUrl() + "diamond-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.status && result.data) {
        setDiamondShapes(result.data.shapes || []);
        setAllDiamonds(result.data.products || []);
      }
    } catch (error) {
      console.error("Error loading diamonds:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDiamonds(); // fetch all diamonds on mount
  }, []);

  return (
    <section className="mt-2">
      <div className="container">
        {loading ? (
          <Loader />
        ) : (
          <>
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

            {/* Diamond Shape Filters */}
            <div className="row mt-4">
              <div className="col-md-12">
                <div className="ring-style-list d-flex flex-wrap gap-2">
                  {diamondShapes.map((shape, i) => (
                    <div
                      key={shape.name}
                      className={`ring-style-item ${
                        selectedShape === shape.name ? "border border-dark" : ""
                      }`}
                      style={{ width: "70px", cursor: "pointer" }}
                      onClick={() => {
                        setSelectedShape(shape.title);
                        getDiamonds(shape.title); 
                      }}
                    >
                      <div className="shape-box text-center">
                        <img
                          src={shape.image || "/diamonds/default-shape.png"}
                          alt={shape.name}
                          height={i === 9 ? "20px" : "30px"}
                        />
                        <br />
                        {shape.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-7 mt-4">
                <h1 className="engaging-ring">
                  View All Diamonds{" "}
                  <span className="disable">[{allDiamonds.length}]</span>
                </h1>
                <p className="paragragh-engaging-ring pt-3">
                  Pick your perfect diamond with James Allen. Start by choosing
                  a high-quality, GIA-certified diamond from our selection of
                  conflict-free diamonds. Then select your preferred ring
                  setting!
                </p>
              </div>
            </div>

            {/* Diamond List */}
            <div className="row mt-4">
              {allDiamonds.length === 0 ? (
                <div className="col-12">
                  <p>No diamonds found for selected shape.</p>
                </div>
              ) : (
                allDiamonds.map((diamond) => (
                  <div className="col-md-3 mb-4" key={diamond.id}>
                    <div
                      className="ring-product-box"
                      onClick={() => {
                        setSelectedDiamond({
                          label: diamond.title,
                          price: `$${diamond.price}`,
                          model: diamond.model || "/models/default.glb",
                        });
                        navigate("/complete-ring");
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="ring-image-box">
                        <img
                          src={diamond.main_image || "/diamonds/default.jpg"}
                          className="w-100"
                          alt={diamond.title}
                        />
                      </div>
                      <div className="content-ring-box">
                        <p>{diamond.title}</p>
                        <p>${diamond.price}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default DiamondsPage;
