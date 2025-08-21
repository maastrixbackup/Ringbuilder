import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep } from "../store/ringBuilderSlice";
import Tab from "../Components/Tab";
import Header from "../Components/Header";
import Loader from "../utils/loader";
import { motion } from "framer-motion";

const DiamondDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedStone } = useSelector((s) => s.ringBuilder);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specs", label: "Specifications" },
    { id: "care", label: "Care & Maintenance" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setCurrentStep(2));
    if (!selectedStone) {
      navigate("/diamonds");
      return;
    } else {
      setLoading(false);
    }
  }, [navigate, selectedStone, dispatch]);

  if (!selectedStone) return null;

  return (
    <>
      <Header />
      <section className="mt-4 container font-[Poppins]">
        <div className={`container ${loading ? "blurred" : ""}`}>
          <Tab />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
            <div>
              <motion.img
                key={selectedStone.image}
                src={selectedStone.image}
                alt={selectedStone.label}
                className="w-full rounded-xl shadow-lg cursor-zoom-in"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-serif font-semibold mb-2 text-gray-800">
                {selectedStone.label}
              </h3>
              <p className="text-base text-gray-600 mb-6">
                Price:{" "}
                <span className="text-yellow-700 font-medium">
                  ${selectedStone.price}
                </span>
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg text-base shadow-lg transition"
                onClick={() => navigate("/complete-ring")}
              >
                Select this Diamond
              </motion.button>
            </motion.div>
          </div>

          {/* Tabs Section */}
          <div className="mt-10">
            <div className="flex gap-6 pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-2 text-sm font-serif transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "text-yellow-700 border-b-2 border-yellow-700"
                      : "text-gray-500 hover:text-yellow-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-6 text-sm text-gray-600 leading-relaxed mb-50">
              {activeTab === "description" && (
                <p>
                  This {selectedStone.label} diamond is ethically sourced and
                  certified. Known for its brilliance and fire, it’s the perfect
                  centerpiece for your ring.
                </p>
              )}
              {activeTab === "specs" && (
                <div>
                  <p>
                    <strong>Carat:</strong> 1.0
                  </p>
                  <p>
                    <strong>Color:</strong> G
                  </p>
                  <p>
                    <strong>Clarity:</strong> VS2
                  </p>
                </div>
              )}
              {activeTab === "care" && (
                <p>
                  Clean with mild soap and water. Avoid harsh chemicals. Store
                  separately to prevent scratches.
                </p>
              )}
            </div>
          </div>
          {loading && <Loader isLoading={loading} />}
        </div>
      </section>
    </>
  );
};

export default DiamondDetailsPage;
