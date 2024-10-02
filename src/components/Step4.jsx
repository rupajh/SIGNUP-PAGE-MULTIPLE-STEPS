import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Step4 = ({ nextStep, handleBack, stepFourState, setStepFourState }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userDetailsString = localStorage.getItem("UserDetails");
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      setStepFourState({
        ...stepFourState,
        aadharNumber: userDetails.aadharNumber || "",
        aadharDoc: userDetails.aadharDoc || "",
        panNumber: userDetails.panNumber || "",
        panDoc: userDetails.panDoc || "",
      });
    }
  }, []);

  

  const handleDocUpload = (field) => (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setStepFourState({
        ...stepFourState,
        [field]: reader.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStepFourState({
      ...stepFourState,
      [name]: value,
    });
  };

  const handleNext = () => {
    dispatch({
      type: "SET_USER_DETAILS",
      payload: stepFourState,
    });
    nextStep();
  };

  return (
    <div>
      <div className="form-card-wraper">
        <div className="form-card">
          <div>Step 4: Aadhar & PAN Details</div>

          <div className="input-margin">
            <label className="text-sm">Aadhar Number</label>
            <input
              type="number"
              name="aadharNumber"
              value={stepFourState.aadharNumber}
              onChange={handleInputChange}
              placeholder="Enter Aadhar Number"
              className="input-style text-sm"
            />
          </div>

          <div className="input-margin">
            <label className="text-sm">Aadhar Document (Upload PDF file)</label>
            <input
              type="file"
              accept="application/pdf"
              name="aadharDoc"
              onChange={handleDocUpload("aadharDoc")}
              className="input-style text-sm"
            />
            {stepFourState.aadharDoc && (
              <div className="text-xs text-green-500">
                Aadhar document uploaded.
              </div>
            )}
          </div>

          <div className="input-margin">
            <label className="text-sm">PAN Number</label>
            <input
              type="text"
              name="panNumber"
              value={stepFourState.panNumber}
              onChange={handleInputChange}
              placeholder="Enter PAN Number"
              className="input-style text-sm"
            />
          </div>

          <div className="input-margin">
            <label className="text-sm">PAN Document (Upload PDF file)</label>
            <input
              type="file"
              accept="application/pdf"
              name="panDoc"
              onChange={handleDocUpload("panDoc")}
              className="input-style text-sm"
            />
            {stepFourState.panDoc && (
              <div className="text-xs text-green-500">
                PAN document uploaded.
              </div>
            )}
          </div>

          <div className="btn-step-style">
            <button
              className="form-button-style text-white text-sm"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              className="form-button-style text-white text-sm"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
