import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "../styles/Steps.css";

const Step5 = ({ onSubmit, handleBack, stepFiveState, setStepFiveState }) => {
    const dispatch = useDispatch();

    const toggleLanguage = (language) => {
        setStepFiveState((prev) => {
            const newLanguages = prev.preferredLanguages.includes(language)
                ? { ...prev, preferredLanguages: prev.preferredLanguages.filter((lang) => lang !== language) }
                : { ...prev, preferredLanguages: [...prev.preferredLanguages, language] };
            console.log(newLanguages.preferredLanguages, "Updated preferredLanguages");
            return newLanguages;
        });
    };

    const handleSubmit = () => {
        if (stepFiveState.preferredLanguages.length === 0) {
            alert("Please select at least one language.");
            return;
        }

        dispatch({
            type: "SET_USER_DETAILS",
            payload: { ...stepFiveState },
        });

        localStorage.setItem("UserDetails", JSON.stringify(stepFiveState));

        dispatch({
            type: "SET_CURRENT_STEP",
            payload: 0,
        });
    };

    useEffect(() => {
        dispatch({
            type: "SET_USER_DETAILS",
            payload: { ...stepFiveState },
        });
    }, [stepFiveState, dispatch]);

    useEffect(() => {
        const userDetailsString = localStorage.getItem("UserDetails");
        if (userDetailsString) {
            const userDetails = JSON.parse(userDetailsString);
            setStepFiveState({ preferredLanguages: userDetails.preferredLanguages || [] });
        }
    }, [setStepFiveState]);

    const languages = [
        { name: "English", flag: "GB" },
        { name: "Hindi", flag: "IN" },
        { name: "Spanish", flag: "ES" },
        { name: "German", flag: "DE" },
    ];

    return (
        <div>
            <div className="form-card-wraper">
                <div className="form-card">
                    <div>Step 5: Preferred Languages</div>
                    <div className="step5-language-wraper-div">
                        {languages.map((lang) => (
                            <div
                                key={lang.name}
                                onClick={() => toggleLanguage(lang.name)}
                                className="language-selection"
                                style={{
                                    border: stepFiveState.preferredLanguages.includes(lang.name)
                                        ? "1px solid yellow"
                                        : "1px solid #ccc",
                                    cursor: "pointer",
                                    padding: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "5px",
                                }}
                            >
                                <span className="text-sm language-flag">{lang.flag}</span>
                                <span className="text-md" style={{ marginLeft: "10px" }}>
                                    {lang.name}
                                </span>
                            </div>
                        ))}
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
                            onClick={() => { handleSubmit(); onSubmit(); }} 
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step5;
