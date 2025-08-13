import React from "react";
import { useNavigate } from "react-router-dom";
import { useRingBuilder } from "../../context/RingBuilderContext";
import Tab2 from "../Tab2";

const RingDetailsPage = () => {
  const navigate = useNavigate();
  const { selectedSetting, setCurrentStep } = useRingBuilder();

  React.useEffect(() => {
    if (!selectedSetting) {
      navigate("/");
    } else {
      setCurrentStep(2);
    }
  }, [selectedSetting]);

  if (!selectedSetting) return null;

  return (
    <section className="mt-2 container">
      <Tab2 />
      <div className="row mt-4">
        {/* 7 Columns Image */}
        <div className="col-md-7">
          <img
            src={selectedSetting.image}
            alt={selectedSetting.label}
            className="img-fluid"
          />
        </div>

        {/* 3 Columns Details */}
        <div className="col-md-5">
          <h2>{selectedSetting.label}</h2>
          <p className="text-muted">Price: {selectedSetting.price}</p>

          {/* Extra Filters */}
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

          <button
            className="btn btn-dark mt-3"
            onClick={() => {
              setCurrentStep(3);
              navigate("/diamonds");
            }}
          >
            Continue to Diamonds
          </button>
        </div>
      </div>
    </section>
  );
};

export default RingDetailsPage;
