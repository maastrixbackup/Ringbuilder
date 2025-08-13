import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRingBuilder } from "../../context/RingBuilderContext";
import { baseUrl } from "../../utils/utils";
import Loader from "../../utils/loader";
import Tab2 from "../Tab2";

const SettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [ringStyles, setRingStyles] = useState([]);
  const [allRings, setAllRings] = useState([]);
  const navigate = useNavigate();
  const { setSelectedSetting, setCurrentStep } = useRingBuilder();
  const [searchParams, setSearchParams] = useSearchParams();

  const getFilters = async (styleTitle = null) => {
    try {
      setLoading(true);
      const payload = styleTitle ? { ring_style: styleTitle } : {};

      const response = await fetch(baseUrl() + "ring-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.status && result.data) {
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
    const shape = searchParams.get("shape");
    if (shape) {
      setSelectedStyle(shape);
      getFilters(shape);
    } else {
      getFilters();
    }
    setCurrentStep(1);
  }, []);

  const handleStyleSelect = (styleTitle) => {
    setSelectedStyle(styleTitle);
    setSearchParams({ shape: styleTitle });
    getFilters(styleTitle);
  };

  return (
    <section className="mt-2">
      <div className={`container ${loading ? "blurred" : ""}`}>
        <>
          <Tab2 />
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
                    onClick={() => handleStyleSelect(style.title)}
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

          {/* Filters */}
          <div className="col-md-12 mt-3">
            <div className="filter-row d-flex flex-wrap align-items-center gap-2">
              {/* Keep your filters as before */}
            </div>
          </div>

          {/* Rings List */}
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
                      const newSetting = {
                        label: ring.title,
                        price: `$${ring.ring_price}`,
                        image: ring.normal_image || "/settings/ring.jpg",
                      };
                      setSelectedSetting(newSetting);
                      localStorage.removeItem("selectedDiamond");
                      setCurrentStep(2);
                      navigate("/ring-details");
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

export default SettingsPage;
