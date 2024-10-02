import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Step2 = ({ nextStep, handleBack, formState, setFormState }) => {
  const dispatch = useDispatch();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState((prevState) => ({
          ...prevState,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    dispatch({
      type: "SET_USER_DETAILS",
      payload: formState,
    });
    nextStep();
  };

  useEffect(() => {
    const userDetailsString = localStorage.getItem("UserDetails");
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      console.log(userDetails, "userDetails");
      setFormState(userDetails);
    }
  }, [setFormState]);

  return (
    <div>
      <div className="form-card-wraper">
        <div className="form-card">
          <div>
            <div>Step 2: Personal Details</div>
            <div className="row">
              <div className="input-margin col-6">
                <label className="text-sm">First Name</label>
                <input
                  type="text"
                  value={formState.firstName}
                  onChange={(e) => setFormState((prev) => ({ ...prev, firstName: e.target.value }))}
                  className="input-style text-sm"
                  placeholder="Enter First Name"
                />
              </div>

              <div className="input-margin col-6">
                <label className="text-sm">Last Name</label>
                <input
                  type="text"
                  value={formState.lastName}
                  onChange={(e) => setFormState((prev) => ({ ...prev, lastName: e.target.value }))}
                  className="input-style text-sm"
                  placeholder="Enter Last Name"
                />
              </div>
            </div>

            <div className="row">
              <div className="input-margin col-6">
                <label className="text-sm">Email Id</label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                  className="input-style text-sm"
                  placeholder="Enter Email"
                />
              </div>
              <div className="input-margin col-6">
                <label className="text-sm">Password</label>
                <input
                  type="password"
                  value={formState.password}
                  onChange={(e) => setFormState((prev) => ({ ...prev, password: e.target.value }))}
                  className="input-style text-sm"
                  placeholder="Enter Password"
                />
              </div>
            </div>

            <div className="input-margin">
              <label className="text-sm">Mobile</label>
              <input
                type="text"
                value={formState.mobile}
                onChange={(e) => setFormState((prev) => ({ ...prev, mobile: e.target.value }))}
                className="input-style text-sm"
                placeholder="Enter Mobile No."
              />
            </div>

            <div className="input-margin">
              <label className="text-sm">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="input-style text-sm"
              />
            </div>

            {formState.profileImage && (
              <img
                src={formState.profileImage}
                alt="Profile"
                style={{ width: "150px", marginTop: "20px" }}
              />
            )}
          </div>
          <div className="btn-step-style">
            <button className="form-button-style text-white text-sm" onClick={handleBack}>Back</button>
            <button className="form-button-style text-white text-sm" onClick={handleNext}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
