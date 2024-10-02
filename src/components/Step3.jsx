import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";

const Step3 = ({ nextStep, handleBack, stepThreeState, setStepThreeState }) => {
  const { aboutMe, bannerImage } = stepThreeState;
  const dispatch = useDispatch();

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newBannerImage = reader.result;
          setStepThreeState((prev) => ({ ...prev, bannerImage: newBannerImage }));
        
        };
        reader.readAsDataURL(file);
      }
    },
  });

  const handleNext = () => {
   
    dispatch({
      type: "SET_USER_DETAILS",
      payload: stepThreeState,
    });

    nextStep();
  };

  useEffect(() => {
    const userDetailsString = localStorage.getItem("UserDetails");
    if (userDetailsString) {
      const { aboutMe, bannerImage } = JSON.parse(userDetailsString);
      setStepThreeState({ aboutMe, bannerImage });
    }

  }, [setStepThreeState]);

  return (
    <div className="form-card-wraper">
      <div className="form-card">
        <div>Step 3: About Me & Banner Image</div>
        <div className="input-margin">
          <label className="text-sm">About Me</label>
          <textarea
            value={aboutMe}
            onChange={(e) => {
              const newAboutMe = e.target.value;
              setStepThreeState((prev) => ({ ...prev, aboutMe: newAboutMe }));
            }}
            placeholder="Tell us about yourself"
            className="input-style text-sm"
          />
        </div>

        <div className="input-margin">
          <label className="text-sm">Banner Image</label>
          <div
            {...getRootProps()}
            style={{ border: "2px dashed #ccc", padding: "20px", cursor: "pointer" }}
          >
            <input {...getInputProps()} />
            <p className="text-sm">
              Drag 'n' drop your banner image here, or click to select one
            </p>
          </div>
        </div>

        {bannerImage && (
          <img src={bannerImage} alt="Banner" style={{ width: "100%", marginTop: "20px" }} />
        )}

        <div className="btn-step-style">
          <button className="form-button-style text-white text-sm" onClick={handleBack}>
            Back
          </button>
          <button className="form-button-style text-white text-sm" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3;
