import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Step1 = ({ nextStep, stepOneState, setStepOneState }) => {
  const dispatch = useDispatch();
  const { verificationMobile, otp, otpSent } = stepOneState;

  const sendOtp = () => {
    if (!verificationMobile) {
      alert("Enter Your Mobile Number");
    } else {
      alert("Your OTP is: 1234");
      setStepOneState((prevState) => ({ ...prevState, otpSent: true }));
    }
  };

  const verifyOtp = () => {
    if (otp === "1234") {
      nextStep();
    } else if (!otp) {
      alert("Enter OTP Number");
    } else {
      alert("Invalid OTP Number");
    }

    dispatch({
      type: "SET_USER_DETAILS",
      payload: { verificationMobile, otp },
    });
  };

  useEffect(() => {
    const userDetailsString = localStorage.getItem("UserDetails");
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      setStepOneState((prevState) => ({
        ...prevState,
        verificationMobile: userDetails.verificationMobile || "",
        otp: userDetails.otp || "",
      }));
    }
  }, [setStepOneState]);

  return (
    <div className="form-card-wraper">
      <div className="form-card">
        <div>Step 1: Enter Mobile Number</div>
        <div className="input-margin">
          <label className="text-sm">Mobile Number</label>
          <input
            type="number"
            placeholder="Enter mobile number"
            className="input-style text-sm"
            value={verificationMobile}
            onChange={(e) =>
              setStepOneState((prevState) => ({
                ...prevState,
                verificationMobile: e.target.value,
              }))
            }
          />
        </div>
        {otpSent && (
          <div className="input-margin">
            <label className="text-sm">OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              className="input-style text-sm"
              value={otp}
              onChange={(e) =>
                setStepOneState((prevState) => ({
                  ...prevState,
                  otp: e.target.value,
                }))
              }
            />
          </div>
        )}
        <div className="btn-step-style">
          <button
            className="form-button-style text-white text-sm"
            onClick={sendOtp}
          >
            {otpSent ? "Re-send OTP" : "Send OTP"}
          </button>
          {otpSent && (
            <button
              className="form-button-style text-white text-sm"
              onClick={verifyOtp}
            >
              Verify OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step1;
