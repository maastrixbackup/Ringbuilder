import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const RingDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedSetting, ui } = useSelector((s) => s.ringBuilder);
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specs", label: "Specifications" },
    { id: "care", label: "Care & Maintenance" },
  ];
  useEffect(() => {
    if (!selectedSetting) {
      navigate("/rings");
      return;
    }
    dispatch(setCurrentStep(2));
  }, [selectedSetting]);

  if (!selectedSetting) return null;

  const goMode = (mode) => {
    dispatch(setMode(mode));
    dispatch(closeChoiceModal());
    dispatch(setCurrentStep(3));
    navigate(mode === "gemstone" ? "/gemstones" : "/diamonds");
  };

  return (
    <>
      <Header />
      <section className="mt-4 container font-[Poppins]">
        <Tab />

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
          {/* Left - Images */}
          <div>
            <motion.img
              key={selectedSetting.image}
              src={selectedSetting.image}
              alt={selectedSetting.label}
              className="w-full rounded-xl shadow-lg cursor-zoom-in"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="flex gap-4 mt-4">
              {[
                selectedSetting.image,
                selectedSetting.image,
                selectedSetting.image,
              ].map((thumb, i) => (
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

          {/* Right - Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-serif font-semibold mb-2 text-gray-800">
              {selectedSetting.label}
            </h3>
            <p className="text-base text-gray-600 mb-6">
              Price:{" "}
              <span className="text-yellow-700 font-medium">
                {selectedSetting.price}
              </span>
            </p>

            {/* Metal Types */}
            <div className="mb-6">
              <h3 className="text-xs font-medium text-gray-700 mb-2 tracking-wide uppercase">
                Metal Type
              </h3>
              <div className="flex gap-2">
                {["14K White Gold", "14K Yellow Gold", "Platinum"].map(
                  (metal) => (
                    <button
                      key={metal}
                      className="px-3 py-1.5 text-xs border border-gray-300 rounded-full 
                   hover:border-yellow-500 hover:bg-yellow-50 
                   transition-all duration-200 shadow-sm font-light text-gray-700"
                    >
                      {metal}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Ring Size */}
            <div className="mb-6">
              <h3 className="text-xs font-medium text-gray-700 mb-2 tracking-wide uppercase">
                Ring Size
              </h3>
              <div className="flex gap-2 flex-wrap">
                {[5, 6, 7, 8].map((size) => (
                  <button
                    key={size}
                    className="w-9 h-9 text-xs border border-gray-300 rounded-full 
                   hover:border-yellow-500 transition-all duration-200 
                   shadow-sm font-light text-gray-700"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

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

        {/* Description Section */}
        <div className="mt-10 ">
          {/* Tab Header */}
          <div className="flex gap-6  pb-2">
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

          {/* Tab Content */}
          <div className="mt-6 text-sm text-gray-600 leading-relaxed mb-50">
            {activeTab === "description" && (
              <div>
                <p className="mb-6">
                  This {selectedSetting.label} is crafted with precision and
                  elegance. Designed to highlight the beauty of your chosen
                  gemstone or diamond, it offers timeless sophistication and
                  comfort for daily wear.
                </p>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p>
                    <strong>Metal:</strong> 14K White Gold
                  </p>
                  <p>
                    <strong>Ring Size:</strong> 6
                  </p>
                  <p>
                    <strong>Width:</strong> 2mm
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Weight:</strong> 3.2g
                  </p>
                  <p>
                    <strong>Finish:</strong> High Polish
                  </p>
                  <p>
                    <strong>Origin:</strong> Made in Italy
                  </p>
                </div>
              </div>
            )}

            {activeTab === "care" && (
              <div>
                <p>
                  To keep your {selectedSetting.label} looking its best, clean
                  it regularly with mild soap and warm water. Avoid harsh
                  chemicals, and store separately to prevent scratching.
                </p>
                <ul className="mt-3 list-disc pl-5">
                  <li>Clean with a soft cloth weekly.</li>
                  <li>Remove when swimming or doing heavy work.</li>
                  <li>Store in a fabric-lined jewelry box.</li>
                </ul>
              </div>
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
      </section>
    </>
  );
};

export default RingDetailsPage;
