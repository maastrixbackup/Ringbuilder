import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Tab from "../Components/Tab";
import { useDispatch, useSelector } from "react-redux";
import {
  openChoiceModal,
  closeChoiceModal,
  setCurrentStep,
  setMode,
} from "../store/ringBuilderSlice";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../Components/Header";
import Loader from "../utils/loader";
import { baseUrl } from "../utils/utils";

const RingDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ui, selectedSetting } = useSelector((s) => s.ringBuilder);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  const id = searchParams.get("id");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) {
      navigate("/rings");
      return;
    }
    setLoading(true);
    fetch(baseUrl() + `ring-product-details/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((result) => {
        if (result?.status) {
          setProduct(result.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching ring details:", err);
        setLoading(false);
      });
  }, [id, navigate]);

  if (!product) return loading ? <Loader isLoading /> : null;

  const goMode = (mode) => {
    dispatch(setMode(mode));
    dispatch(closeChoiceModal());
    dispatch(setCurrentStep(2));
    navigate(mode === "gemstone" ? "/gemstones" : "/diamonds");
  };

  return (
    <>
      <Header />
      <section className="mt-4 container font-[Poppins]">
        <div className={`container ${loading ? "blurred" : ""}`}>
          <Tab />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
            {/* Images */}
            <div>
              <motion.img
                key={product.ring_image}
                src={product.ring_image}
                alt={product.title}
                className="w-full rounded-xl shadow-lg cursor-zoom-in"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="flex gap-4 mt-4">
                {product.images?.map((thumb, i) => (
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    key={i}
                    src={thumb}
                    alt={`Thumbnail ${i}`}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-200 hover:border-yellow-500 cursor-pointer transition"
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-serif font-semibold mb-2 text-gray-800">
                {product.title}
              </h3>
              <p className="text-base text-gray-600 mb-6">
                Price:{" "}
                <span className="text-yellow-700 font-medium">
                  ${product.ring_price}
                </span>
              </p>

              {/* Example: Metal options if available */}
              {product.metals && (
                <div className="mb-6">
                  <h3 className="text-xs font-medium text-gray-700 mb-2 tracking-wide uppercase">
                    Metal Type
                  </h3>
                  <div className="flex gap-2">
                    {product.metals.map((metal) => (
                      <button
                        key={metal}
                        className="px-3 py-1.5 text-xs border border-gray-300 rounded-full hover:border-yellow-500 hover:bg-yellow-50 transition-all duration-200 shadow-sm font-light text-gray-700"
                      >
                        {metal}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg text-base shadow-lg transition"
                onClick={() => dispatch(openChoiceModal())}
              >
                Select this Setting
              </motion.button>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="mt-10">
            <div className="flex gap-6 pb-2">
              {["description", "specs", "care"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-sm font-serif transition-colors duration-200 ${
                    activeTab === tab
                      ? "text-yellow-700 border-b-2 border-yellow-700"
                      : "text-gray-500 hover:text-yellow-600"
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="mt-6 text-sm text-gray-600 leading-relaxed mb-50">
              {activeTab === "description" && (
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              )}
              {activeTab === "specs" && (
                <pre>{JSON.stringify(product.specifications, null, 2)}</pre>
              )}
              {activeTab === "care" && (
                <p>{product.care_instructions || "Handle with care."}</p>
              )}
            </div>
          </div>

          {/* Choice Modal */}
          <AnimatePresence>
            {ui.choiceModalOpen && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                >
                  <h3 className="text-lg font-semibold mb-4">Continue with</h3>
                  <div className="flex flex-col gap-3">
                    <button
                      className="px-4 py-2 border rounded-lg hover:border-yellow-500 transition"
                      onClick={() => goMode("diamond")}
                    >
                      Choose a Diamond
                    </button>
                    <button
                      className="px-4 py-2 border rounded-lg hover:border-yellow-500 transition"
                      onClick={() => goMode("gemstone")}
                    >
                      Choose a Gemstone
                    </button>
                  </div>
                  <button
                    className="mt-4 text-sm text-gray-600 hover:underline"
                    onClick={() => dispatch(closeChoiceModal())}
                  >
                    Cancel
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          {loading && <Loader isLoading={loading} />}
        </div>
      </section>
    </>
  );
};

export default RingDetailsPage;
