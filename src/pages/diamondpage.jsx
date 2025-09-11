import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedStone, setCurrentStep } from "../store/ringBuilderSlice";
import { baseUrl } from "../utils/utils";
import Loader from "../utils/loader";
import Tab from "../Components/Tab";
import Header from "../Components/Header";

const DiamondsPage = () => {
  const [loading, setLoading] = useState(true);
  const [allDiamonds, setAllDiamonds] = useState([]);
  const [filters, setFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState({});
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentStep(2));
    const getDiamondFilterData = async () => {
      try {
        const res = await fetch(baseUrl() + "getDiamondFilterData");
        const result = await res.json();
        setFilterOptions(result.data || {});
      } catch (error) {
        console.error("Error fetching diamond filters", error);
      }
    };
    getDiamondFilterData();
  }, [dispatch]);

  useEffect(() => {
    const paramsObj = {};
    for (const [key, value] of searchParams.entries()) {
      paramsObj[key] = value;
    }
    setFilters(paramsObj);
  }, [searchParams]);

  useEffect(() => {
    if (!filters) return;

    const controller = new AbortController();

    const fetchDiamonds = async () => {
      setLoading(true);

      const cleanFilters = {};
      if (filters.shape) cleanFilters.shape = filters.shape;
      if (filters.cut) cleanFilters.cut = filters.cut;
      if (filters.color) cleanFilters.color = filters.color;
      if (filters.clarity) cleanFilters.clarity = filters.clarity;
      if (filters.grown_type) cleanFilters.grown_type = filters.grown_type;

      if (filters.carat) {
        const [from, to] = filters.carat.split("-");
        cleanFilters.carat_from = from;
        cleanFilters.carat_to = to;
      }

      if (filters.price) {
        const [from, to] = filters.price.split("-");
        cleanFilters.price_from = from;
        cleanFilters.price_to = to;
      }

      cleanFilters.sort = filters.sort;

      const queryString = new URLSearchParams(cleanFilters).toString();

      navigate(`/diamonds${queryString ? `?${queryString}` : ""}`, {
        replace: true,
      });

      try {
        const res = await fetch(`${baseUrl()}diamond-products?${queryString}`, {
          signal: controller.signal,
        });
        const result = await res.json();
        if (result?.status) {
          setAllDiamonds(result.data.products || []);
        } else {
          setAllDiamonds([]);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching diamonds:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchDiamonds, 300);

    return () => {
      clearTimeout(debounceTimer);
      controller.abort();
    };
  }, [filters, navigate]);

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => {
      if (prev[key] === value) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: value };
    });
  }, []);

  return (
    <>
      <Header />
      <section className="mt-24">
        <div className={`container ${loading ? "blurred" : ""}`}>
          <Tab />
          <div className="row mt-2">
            <div className="page-header">
              <h1>Discover Your Perfect Diamond</h1>
              <p>
                Browse our curated collection of ethically sourced,
                GIA-certified diamonds designed to complement your chosen
                setting.
              </p>
            </div>

            {/* Filters */}
            <div className="col-md-12 mt-1">
              <div className="shape-filters flex flex-wrap gap-4">
                {filterOptions.shapes?.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => updateFilter("shape", s.title)}
                    className={`shape-option cursor-pointer border rounded-lg p-2 ${
                      filters.shape === s.title
                        ? "border-yellow-600 bg-yellow-50"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={s.image}
                      className="w-12 h-12 object-contain mx-auto"
                    />
                    <p className="text-sm text-center mt-1">{s.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="row mt-4">
            {allDiamonds.length === 0 ? (
              <div className="col-12">
                <p>No diamonds found for selected filters.</p>
              </div>
            ) : (
              allDiamonds.map((diamond) => (
                <div className="col-md-3 mb-4" key={diamond.id}>
                  <div
                    className="ring-product-box premium-card"
                    onClick={() => {
                      dispatch(
                        setSelectedStone({
                          id: diamond.id,
                          label: diamond.title,
                          price: diamond.price,
                          image: diamond.img_one,
                        })
                      );
                      navigate(`/diamond-details?id=${diamond.id}`);
                    }}
                  >
                    <div className="ring-image-box">
                      <div className="product-container">
                        <img
                          src={diamond.img_one || "/diamonds/default.jpg"}
                          alt={diamond.title}
                          className="default-image w-100"
                        />
                        <img
                          src={diamond.img_one}
                          alt="On model"
                          className="hover-image w-100"
                        />
                      </div>
                    </div>
                    <div className="content-ring-box">
                      <p className="ring-title">{diamond.title}</p>
                      <p className="ring-price">${diamond.price}</p>
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

export default DiamondsPage;
