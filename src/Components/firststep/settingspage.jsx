import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRingBuilder } from "../../context/RingBuilderContext";
import { baseUrl } from "../../utils/utils";
import Loader from "../../utils/loader";

const GpPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [ringStyles, setRingStyles] = useState([]);
  const [allRings, setAllRings] = useState([]);
  const navigate = useNavigate();
  const { setSelectedSetting } = useRingBuilder();

  const getFilters = async (styleTitle = null) => {
    try {
      setLoading(true);
      const payload = styleTitle ? { ring_style: styleTitle } : {};

      const response = await fetch(baseUrl() + "ring-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.status && result.data) {
        // Only set styles on first load (when no filter is applied)
        if (!styleTitle) {
          setRingStyles(result.data.style || []);
        }
        setAllRings(result.data.products || []);
      }
    } catch (error) {
      console.error("Error occurred while fetching the data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFilters();
  }, []);

  return (
    <section className="mt-2">
      <div className={`container ${loading ? "blurred" : ""}`}>
        <>
          {/* Stepper */}
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

          {/* Header */}
          <div className="row mt-4">
            <div className="col-md-7">
              <h1 className="engaging-ring">
                Engagement Rings: Choose Your Perfect Setting{" "}
                <span className="disable">[{allRings.length}]</span>
              </h1>
              <p className="paragragh-engaging-ring pt-3">
                Our selection of engagement ring settings includes every metal
                and every style. Yellow gold, white gold, platinum, and rose
                gold; vintage, modern, classic or trendy — we have the perfect
                ring.
              </p>
            </div>

            <div className="col-md-12">
              <div className="ring-style-list d-flex flex-wrap gap-2">
                {ringStyles.map((style) => (
                  <div
                    key={style.id}
                    className={`ring-style-item ${
                      selectedStyle === style.title ? "border border-dark" : ""
                    }`}
                    onClick={() => {
                      setSelectedStyle(style.title);
                      getFilters(style.title);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={
                        style.image && style.image !== ""
                          ? style.image
                          : "/settings/fallback-style.svg"
                      }
                      alt={style.title}
                      style={{ width: 50, height: 50, objectFit: "contain" }}
                    />
                    <span>{style.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="row mt-4">
            {allRings.length === 0 ? (
              <div className="col-12">
                <p>No rings found for selected style.</p>
              </div>
            ) : (
              allRings.map((ring) => (
                <div className="col-md-3 mb-4" key={ring.id}>
                  <div
                    className="ring-product-box"
                    onClick={() => {
                      setSelectedSetting({
                        label: ring.title,
                        price: `$${ring.ring_price}`,
                      });
                      navigate("/diamonds");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="ring-image-box">
                      <div className="product-container">
                        <img
                          src={ring.normal_image || "/settings/ring.jpg"}
                          alt={ring.title}
                          className="default-image w-100"
                        />
                        <img
                          src={ring.hover_image || "/settings/second-image.jpg"}
                          alt="On model"
                          className="hover-image w-100"
                        />
                      </div>
                    </div>

                    <div className="content-ring-box">
                      <p>{ring.title}</p>
                      <p>${ring.ring_price} (Setting Price)</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      </div>
      {loading && <Loader isLoading={loading} />}
    </section>
  );
};

export default GpPage;
