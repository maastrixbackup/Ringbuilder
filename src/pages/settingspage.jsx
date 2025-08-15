import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedSetting } from "../store/ringBuilderSlice";
import { baseUrl } from "../utils/utils";
import Loader from "../utils/loader";
import Tab from "../Components/Tab";
import Header from "../Components/Header";

const Setting = () => {
  const [loading, setLoading] = useState(true);
  const [allRings, setAllRings] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState({});

  useEffect(() => {
    getRingFilterData();
  }, []);

  const getRingFilterData = async () => {
    try {
      setLoading(true);
      const res = await fetch(baseUrl() + "getRingFilterData", {
        method: "GET",
      });
      const result = await res.json();
      setFilterOptions(result.data);
    } catch (error) {
      console.error("Error occured while fetching the data", error);
    } finally {
      setLoading(false);
    }
  };
  
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

    navigate(`/rings/${queryString ? `?${queryString}` : ""}`, {
      replace: true,
    });
    setLoading(true);

    fetch(`${baseUrl()}ring-products?${queryString}`)
      .then((res) => res.json())
      .then((result) => {
        if (result?.status) {
          setAllRings(result.data.products || []);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [filters, navigate]);

  const updateFilter = (key, value) => {
    setFilters((prev) => {
      // if (key === "ring-type") {
      if (prev[key] === value) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: value };
      // }

      // return { ...prev, [key]: value };
    });
  };

  return (
    <>
      <Header />
      <section className="mt-24">
        <div className={`container ${loading ? "blurred" : ""}`}>
          <Tab />
          <div className="row mt-4">
            <div className="page-header elegant-header">
              <h1>Discover Your Perfect Engagement Ring</h1>
              <p>
                Explore our curated collection of timeless settings, crafted
                with precision and designed to celebrate your unique love story.
              </p>
            </div>

            <div className="col-md-12">
              <div className="ring-style-list d-flex flex-wrap gap-2">
                {filterOptions.style?.map((style) => (
                  <div
                    key={style.id}
                    className={`ring-style-item ${
                      filters["ring_style"] === style.title
                        ? "!border !border-gray-500 !bg-green-200"
                        : ""
                    }`}
                    onClick={() => updateFilter("ring_style", style.title)}
                  >
                    <img
                      src={style.image || "/settings/fallback-style.svg"}
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
            <div className="filter-row d-flex flex-wrap align-items-center ">
              <select
                className="filter-dropdown"
                value={filters.ring_size || ""}
                onChange={(e) => updateFilter("ring_size", e.target.value)}
              >
                <option value="">Ring Size</option>
                {filterOptions.size?.map((s) => (
                  <option key={s.id} value={s.size}>
                    {s.size}
                  </option>
                ))}
              </select>

              {/* Metal Colors */}
              <select
                className="filter-dropdown"
                value={filters.ring_color || ""}
                onChange={(e) => updateFilter("ring_color", e.target.value)}
              >
                <option value="">Metal</option>
                {filterOptions.colors?.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* Width */}
              <select
                className="filter-dropdown"
                value={filters.ring_width || ""}
                onChange={(e) => updateFilter("ring_width", e.target.value)}
              >
                <option value="">Width</option>
                {filterOptions.width?.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.width}
                  </option>
                ))}
              </select>

              {/* Shapes */}
              <select
                className="filter-dropdown"
                value={filters.diamond_shape || ""}
                onChange={(e) => updateFilter("diamond_shape", e.target.value)}
              >
                <option value="">Can Be Set With</option>
                {filterOptions.shapes?.map((shape) => (
                  <option key={shape.id} value={shape.title}>
                    {shape.title}
                  </option>
                ))}
              </select>

              {/* Karat */}
              <select
                className="filter-dropdown"
                value={filters.ring_karat || ""}
                onChange={(e) => updateFilter("ring_karat", e.target.value)}
              >
                <option value="">Karat</option>
                {filterOptions.karats?.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.title}K
                  </option>
                ))}
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
                    className="ring-product-box premium-card"
                    onClick={() => {
                      const newSetting = {
                        label: ring.title,
                        price: `$${ring.ring_price}`,
                        image: ring.normal_image,
                      };
                      dispatch(setSelectedSetting(newSetting));
                      // localStorage.removeItem("selectedDiamond");
                      navigate("/ring-details");
                    }}
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
                      <p className="ring-title">{ring.title}</p>
                      <p className="ring-price">
                        ${ring.ring_price} (Setting Price)
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {loading && <Loader isLoading={loading} />}
      </section>
    </>
  );
};

export default Setting;
