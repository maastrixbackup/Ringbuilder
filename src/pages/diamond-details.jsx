import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentStep } from "../store/ringBuilderSlice";
import Tab from "../Components/Tab";
import Header from "../Components/Header";
import Loader from "../utils/loader";
import { motion } from "framer-motion";
import { baseUrl } from "../utils/utils";

const DiamondDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [diamond, setDiamond] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) {
      navigate("/diamonds");
      return;
    }
    setLoading(true);
    fetch(baseUrl() + `diamondProductDetails/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((result) => {
        if (result?.status) {
          const d = result.data;
          const images = [d.img_one, d.img_two, d.img_three, d.img_four].filter(
            (img) => img !== null
          );
          setDiamond({
            id: d.id,
            title: d.title,
            price: d.price,
            shape: d.shape,
            cut: d.cut,
            color: d.color,
            carat: d.carat,
            clarity: d.clarity,
            grown_type: d.grown_type === 1 ? "Lab Grown" : "Natural",
            images,
          });
          dispatch(setCurrentStep(2));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching diamond details:", err);
        setLoading(false);
      });
  }, [id, navigate, dispatch]);

  if (!diamond) return null;

  return (
    <>
      <Header />
      <section className="mt-4 container font-[Poppins]">
        <div className={`container ${loading ? "blurred" : ""}`}>
          <Tab />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
            {/* Diamond Images */}
            <div>
              <motion.img
                key={diamond.images[0]}
                src={diamond.images[0]}
                alt={diamond.title}
                className="w-full rounded-xl shadow-lg cursor-zoom-in"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              {diamond.images.length > 1 && (
                <div className="flex gap-4 mt-4">
                  {diamond.images.map((thumb, i) => (
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
              )}
            </div>

            {/* Diamond Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-serif font-semibold mb-2 text-gray-800">
                {diamond.title}
              </h3>
              <p className="text-base text-gray-600 mb-6">
                Price:{" "}
                <span className="text-yellow-700 font-medium">
                  ${diamond.price}
                </span>
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg text-base shadow-lg transition"
                onClick={() => {
                  dispatch(setCurrentStep(3));
                  navigate("/complete-ring");
                }}
              >
                Select this Diamond
              </motion.button>
            </motion.div>
          </div>

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
                <p>
                  This {diamond.title} is{" "}
                  <span className="font-medium">{diamond.grown_type}</span>,{" "}
                  ethically sourced and certified. Known for its brilliance and
                  fire, it’s the perfect centerpiece for your ring.
                </p>
              )}
              {activeTab === "specs" && (
                <div className="grid grid-cols-2 gap-2">
                  <p>
                    <strong>Carat:</strong> {diamond.carat}
                  </p>
                  <p>
                    <strong>Shape:</strong> {diamond.shape}
                  </p>
                  <p>
                    <strong>Cut:</strong> {diamond.cut}
                  </p>
                  <p>
                    <strong>Color:</strong> {diamond.color}
                  </p>
                  <p>
                    <strong>Clarity:</strong> {diamond.clarity}
                  </p>
                  <p>
                    <strong>Type:</strong> {diamond.grown_type}
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
