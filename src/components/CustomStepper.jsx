import React from 'react'
import '../styles/customstepper.css';

const CustomStepper = ({currentStep, steps }) => {
  return (
    <div >
        <div className="stepper">
        {steps.map((label, index) => (
        <div key={label} className={`step ${currentStep === index ? 'active' : ''}`}>
          <div className="step-number">{index + 1}</div>
          <div className="step-label">{label}</div>
        </div>
      ))}
        </div>

    </div>
  )
}

export default CustomStepper