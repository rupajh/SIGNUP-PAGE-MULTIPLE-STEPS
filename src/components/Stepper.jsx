import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import "../styles/Steps.css";
import CustomStepper from './CustomStepper';

const Stepper = () => {
    const [stepOneState, setStepOneState] = useState({
        verificationMobile: "",
        otp: "",
        otpSent: false,
      });
      const [stepThreeState, setStepThreeState] = useState({
        aboutMe: "",
        bannerImage: "",
      });
    
      const [stepFourState, setStepFourState] = useState({
        aadharNumber: "",
        aadharDoc: "",
        panNumber: "",
        panDoc: "",
      });

      const [stepFiveState, setStepFiveState] = useState({
        preferredLanguages: "",
      });
    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        mobile: "",
        profileImage: null,
      });
    const currentStep = useSelector((state) => state.currentStep);
    const userDetails = useSelector((state) => state.userDetails);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedStep = localStorage.getItem('currentStep');
        if (storedStep) {
            const parsedStep = parseInt(storedStep, 10);
            if (parsedStep >= 0 && parsedStep <= 4) {
                dispatch({
                    type: 'SET_CURRENT_STEP',
                    payload: parsedStep, 
                });
            }
        }
    }, [dispatch]);

    const nextStep = () => {
        const newStep = currentStep + 1;
        dispatch({
            type: 'SET_CURRENT_STEP',
            payload: newStep,
        });
    };

    const handleSubmit = () => {
        console.log('UserDetails:', userDetails);
        localStorage.setItem('UserDetails', JSON.stringify(userDetails));
    };

    const handleBack = () => {
        const newStep = currentStep - 1;
        dispatch({
            type: 'SET_CURRENT_STEP',
            payload: newStep,
        });
    };

    useEffect(() => {
        localStorage.setItem('currentStep', currentStep);
    }, [currentStep]);

    return (
        <div>
            <CustomStepper
                currentStep={currentStep}
                steps={["Mobile & OTP", "Personal Details", "About Me", "Aadhar & PAN", "Languages"]}
            />
            {(() => {
                switch (currentStep) {
                    case 0:
                        return <Step1 nextStep={nextStep} stepOneState={stepOneState} setStepOneState={setStepOneState}/>;
                    case 1:
                        return <Step2 nextStep={nextStep} handleBack={handleBack}formState={formState} 
                        setFormState={setFormState} />;
                    case 2:
                        return <Step3 nextStep={nextStep} handleBack={handleBack} stepThreeState={stepThreeState}setStepThreeState={setStepThreeState}/>;
                    case 3:
                        return <Step4 nextStep={nextStep} handleBack={handleBack} stepFourState={stepFourState}setStepFourState={setStepFourState}/>;
                    case 4:
                        return <Step5 onSubmit={handleSubmit} handleBack={handleBack} stepFiveState={stepFiveState}setStepFiveState={setStepFiveState}/>;
                    default:
                        return <div>Unknown step</div>;
                }
            })()}
        </div>
    );
};

export default Stepper;
