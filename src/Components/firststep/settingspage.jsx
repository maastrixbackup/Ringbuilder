import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRingBuilder } from "../../context/RingBuilderContext";
import { baseUrl } from "../../utils/utils";
import Loader from "../../utils/loader";
import Tab from "../Tab";

const GpPage = () => {
  const [loading, setLoading] = useState(true);
  const [ringStyles, setRingStyles] = useState([]);
  const [allRings, setAllRings] = useState([]);
  const navigate = useNavigate();
  const { setSelectedSetting } = useRingBuilder();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const paramsObj = {};
    for (const [key, value] of searchParams.entries()) {
      paramsObj[key] = value;
    }
    setFilters(paramsObj);
  }, []);

  useEffect(() => {
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v && v.trim() !== "")
    );

    const queryString = new URLSearchParams(cleanFilters).toString();

    navigate(`/ring_builder/${queryString ? `?${queryString}` : ""}`, {
      replace: true,
    });
  }, [filters, navigate]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(`${baseUrl()}ring-products?${searchParams.toString()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status && result.data) {
          setRingStyles(result.data.style || []);
          setAllRings(result.data.products || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [searchParams]);

  const updateFilter = (key, value) => {
    setFilters((prev) => {
      if (key === "ring-type") {
        if (prev[key] === value) {
          const { [key]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [key]: value };
      }

      return { ...prev, [key]: value };
    });
  };

  return (
    <section className="mt-2">
      <div className={`container ${loading ? "blurred" : ""}`}>
        <>
          <Tab />
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
                      filters["ring-type"] === style.title
                        ? "!border !border-gray-500 !bg-green-200"
                        : ""
                    }`}
                    onClick={() => {
                      updateFilter("ring-type", style.title);
                    }}
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

          <div className="col-md-12 mt-3">
            <div className="filter-row d-flex flex-wrap align-items-center gap-2">
              <select
                className="filter-dropdown"
                value={filters.size}
                onChange={(e) => updateFilter("size", e.target.value)}
              >
                <option value="">Ring Size</option>
                <option value="4">4</option>
                <option value="4.5">4.5</option>
                <option value="5">5</option>
              </select>
              <select
                className="filter-dropdown"
                value={filters.metal}
                onChange={(e) => updateFilter("metal", e.target.value)}
              >
                <option value="">Metal</option>
                <option value="14K White Gold">14K White Gold</option>
                <option value="14K Yellow Gold">14K Yellow Gold</option>
              </select>
              <select
                className="filter-dropdown"
                value={filters.width}
                onChange={(e) => updateFilter("width", e.target.value)}
              >
                <option value="">Width</option>
                <option value="1.5 mm">1.5 mm</option>
                <option value="2 mm">2 mm</option>
                <option value="2.5 mm">2.5 mm</option>
              </select>
              <select
                className="filter-dropdown"
                value={filters["set-with"]}
                onChange={(e) => updateFilter("set-with", e.target.value)}
              >
                <option value="">Can Be Set With</option>
                <option value="Round">Round</option>
                <option value="Princess">Princess</option>
              </select>
              <select
                className="filter-dropdown"
                value={filters.price}
                onChange={(e) => updateFilter("price", e.target.value)}
              >
                <option value="">Price</option>
                <option value="<1000">Under $1,000</option>
                <option value="1000–2500">$1,000–$2,500</option>
              </select>
              <label className="filter-checkbox">
                <input type="checkbox" /> On Sale
              </label>
              <select
                className="filter-dropdown"
                value={filters["date-by"]}
                onChange={(e) => updateFilter("date-by", e.target.value)}
              >
                <option value="">Shipping Date by</option>
                <option value="1 Week">1 Week</option>
                <option value="2 Weeks">2 Weeks</option>
              </select>
              <select
                className="filter-dropdown"
                value={filters["sort-by"]}
                onChange={(e) => updateFilter("sort-by", e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="Best Sellers">Best Sellers</option>
                <option value="Price: Low to High">Price: Low to High</option>
              </select>
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
                      const newSetting = {
                        label: ring.title,
                        price: `$${ring.ring_price}`,
                      };
                      setSelectedSetting(newSetting);
                      localStorage.removeItem("selectedDiamond");
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
