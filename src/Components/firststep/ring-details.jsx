import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tab from "../Tab";
import { useDispatch, useSelector } from "react-redux";
import { openChoiceModal, closeChoiceModal, setCurrentStep, setMode } from "../../redux/ringBuilderSlice";

const RingDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedSetting, ui } = useSelector((s) => s.ringBuilder);

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
    // move to choose step 3
    dispatch(setCurrentStep(3));
    navigate(mode === "gemstone" ? "/gemstones" : "/diamonds");
  };

  return (
    <section className="mt-2 container">
      <Tab />
      <div className="row mt-4">
        <div className="col-md-7">
          <img src={selectedSetting.image} alt={selectedSetting.label} className="img-fluid" />
        </div>

        <div className="col-md-5">
          <h2>{selectedSetting.label}</h2>
          <p className="text-muted">Price: {selectedSetting.price}</p>

          <select className="form-control my-2">
            <option>Metal Type</option>
            <option>14K White Gold</option>
            <option>14K Yellow Gold</option>
          </select>

          <select className="form-control my-2">
            <option>Ring Size</option>
            <option>5</option>
            <option>6</option>
          </select>

          <select className="form-control my-2">
            <option>Width</option>
            <option>1.5 mm</option>
            <option>2 mm</option>
          </select>

          <button className="btn btn-dark mt-3" onClick={() => dispatch(openChoiceModal())}>
            Select this Setting
          </button>
        </div>
      </div>

      {/* Choice Modal */}
      {ui.choiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Continue with</h3>
            <div className="flex flex-col gap-3">
              <button className="btn btn-outline-secondary" onClick={() => goMode("diamond")}>Choose a Diamond</button>
              <button className="btn btn-outline-secondary" onClick={() => goMode("gemstone")}>Choose a Gemstone</button>
            </div>
            <button className="mt-4 text-sm text-gray-600 hover:underline" onClick={() => dispatch(closeChoiceModal())}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default RingDetailsPage;