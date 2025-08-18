// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setSelectedSetting, setCurrentStep } from "../store/ringBuilderSlice";
// import { baseUrl } from "../utils/utils";
// import Loader from "../utils/loader";
// import Tab from "../Components/Tab";
// import Header from "../Components/Header";

// const DiamondsPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);
//   const [diamondShapes, setDiamondShapes] = useState([]);
//   const [allDiamonds, setAllDiamonds] = useState([]);
//   const [selectedShape, setSelectedShape] = useState(null);

//   useEffect(() => {
//     dispatch(setCurrentStep(2));
//   }, [dispatch]);

//   const getDiamonds = async (shape = null) => {
//     try {
//       setLoading(true);

//       const payload = {};
//       if (shape) {
//         payload.shape = shape;
//       }

//       const res = await fetch(baseUrl() + "diamond-products", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const result = await res.json();
//       if (result.status && result.data) {
//         setDiamondShapes(result.data.shapes || []);
//         setAllDiamonds(result.data.products || []);
//       }
//     } catch (error) {
//       console.error("Error loading diamonds:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getDiamonds();
//   }, []);

//   return (
//     <>
//       <Header />
//       <section className="mt-2">
//         <div className={`container ${loading ? "blurred" : ""}`}>
//           <>
//             <Tab />
//             <div className="back-to-gallery mt-3 mb-2">
//               <span
//                 onClick={() => navigate("/")}
//                 style={{
//                   fontSize: "12px",
//                   fontWeight: "600",
//                   textDecoration: "underline",
//                   cursor: "pointer",
//                   color: "#000",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 &lt; BACK TO RING SECTION
//               </span>
//             </div>

//             {/* Diamond Shape Filters */}
//             <div className="row mt-4">
//               <div className="col-md-12">
//                 <div className="ring-style-list d-flex flex-wrap gap-2">
//                   {diamondShapes.map((shape, i) => (
//                     <div
//                       // key={shape.name}
//                       key={shape.id || i}
//                       className={`ring-style-item ${
//                         selectedShape === shape.title
//                           ? "border border-dark"
//                           : ""
//                       }`}
//                       style={{ width: "70px", cursor: "pointer" }}
//                       onClick={() => {
//                         setSelectedShape(shape.title);
//                         getDiamonds(shape.title);
//                       }}
//                     >
//                       <div className="shape-box text-center">
//                         <img
//                           src={shape.image || "/diamonds/default-shape.png"}
//                           alt={shape.name}
//                           height={i === 9 ? "20px" : "30px"}
//                         />
//                         <br />
//                         {shape.title}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="col-md-7 mt-4">
//                 <h1 className="engaging-ring">
//                   View All Diamonds{" "}
//                   <span className="disable">[{allDiamonds.length}]</span>
//                 </h1>
//                 <p className="paragragh-engaging-ring pt-3">
//                   Pick your perfect diamond with James Allen. Start by choosing
//                   a high-quality, GIA-certified diamond from our selection of
//                   conflict-free diamonds. Then select your preferred ring
//                   setting!
//                 </p>
//               </div>
//             </div>

//             {/* Diamond List */}
//             <div className="row mt-4">
//               {allDiamonds.length === 0 ? (
//                 <div className="col-12">
//                   <p>No diamonds found for selected shape.</p>
//                 </div>
//               ) : (
//                 allDiamonds.map((diamond) => (
//                   <div className="col-md-3 mb-4" key={diamond.id}>
//                     <div
//                       className="ring-product-box"
//                       onClick={() => {
//                         setSelectedSetting({
//                           label: diamond.title,
//                           price: `$${diamond.price}`,
//                           model: diamond.model || "/models/default.glb",
//                         });
//                         navigate("/complete-ring");
//                       }}
//                       style={{ cursor: "pointer" }}
//                     >
//                       <div className="ring-image-box">
//                         <img
//                           src={diamond.main_image || "/diamonds/default.jpg"}
//                           className="w-100"
//                           alt={diamond.title}
//                         />
//                       </div>
//                       <div className="content-ring-box">
//                         <p>{diamond.title}</p>
//                         <p>${diamond.price}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </>
//         </div>
//         {loading && <Loader isLoading={loading} />}
//       </section>
//     </>
//   );
// };

// export default DiamondsPage;




// src/pages/diamondspage.jsx
import { useState, useEffect } from "react";
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
    getDiamondFilterData();
  }, [dispatch]);

  const getDiamondFilterData = async () => {
    try {
      setLoading(true);
      const res = await fetch(baseUrl() + "getDiamondFilterData", {
        method: "GET",
      });
      const result = await res.json();
      setFilterOptions(result.data || {});
    } catch (error) {
      console.error("Error fetching diamond filters", error);
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

    navigate(`/diamonds/${queryString ? `?${queryString}` : ""}`, {
      replace: true,
    });

    setLoading(true);
    fetch(`${baseUrl()}diamond-products?${queryString}`, { method: "GET" })
      .then((res) => res.json())
      .then((result) => {
        if (result?.status) {
          setAllDiamonds(result.data.products || []);
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
      if (prev[key] === value) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: value };
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
              <h1>Discover Your Perfect Diamond</h1>
              <p>
                Browse our curated collection of ethically sourced, GIA-certified
                diamonds designed to complement your chosen setting.
              </p>
            </div>

            {/* Filters */}
            <div className="col-md-12 mt-3">
              <div className="filter-row d-flex flex-wrap align-items-center">
                <select
                  className="filter-dropdown"
                  value={filters.shape || ""}
                  onChange={(e) => updateFilter("shape", e.target.value)}
                >
                  <option value="">Shape</option>
                  {filterOptions.shapes?.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>

                <select
                  className="filter-dropdown"
                  value={filters.carat || ""}
                  onChange={(e) => updateFilter("carat", e.target.value)}
                >
                  <option value="">Carat</option>
                  {filterOptions.carat?.map((c) => (
                    <option key={c.id} value={c.value}>
                      {c.value}
                    </option>
                  ))}
                </select>

                <select
                  className="filter-dropdown"
                  value={filters.color || ""}
                  onChange={(e) => updateFilter("color", e.target.value)}
                >
                  <option value="">Color</option>
                  {filterOptions.colors?.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <select
                  className="filter-dropdown"
                  value={filters.clarity || ""}
                  onChange={(e) => updateFilter("clarity", e.target.value)}
                >
                  <option value="">Clarity</option>
                  {filterOptions.clarity?.map((cl) => (
                    <option key={cl.id} value={cl.name}>
                      {cl.name}
                    </option>
                  ))}
                </select>
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
                          image: diamond.main_image,
                        })
                      );
                      navigate("/diamond-details");
                    }}
                  >
                    <div className="ring-image-box">
                       <div className="product-container">
                      <img
                        src={diamond.main_image || "/diamonds/default.jpg"}
                        alt={diamond.title}
                        className="default-image w-100"
                      />
                        <img
                          src={diamond.main_image}
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

