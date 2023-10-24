import { useState } from "react";

import { StepperContext } from "../components/context/StepperContext";
import Acount from "./steps/Acount";
import Dinner from "./steps/Dinner";
import PayUp from "./steps/PayUp";
import Stepper from "./Stepper";
import StepperControll from "./StepperControll";
import { Link } from "react-router-dom";
const RegisterForm = () => {
  const [currentStep, setcurrentStep] = useState(1);
  const [UserId, setUserId] = useState("");
  const [dinner, setdinner] = useState("");
  const [user, setuser] = useState([]);
  const [finallData, setfinallData] = useState([]);

  const steps = ["اطلاعات فردی", "شام", "پرداخت" , ""];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Acount />;
      case 2:
        return <Dinner />;
      case 3:
        return <PayUp />;
      default:
    }
  };

  const handleClick = (direction ) => {
    if (user.length === 0 && currentStep === 1) {
      alert("پرکردن فرم");
      return;
    }
    if (dinner.length === 0 && currentStep === 2) {
      alert("پرکردن فرم");
      return;
    }
    let newStep = currentStep;
    direction === "next" ? newStep++ : newStep--;
    if (newStep > 0 && newStep <= steps.length) {
      setcurrentStep(newStep);
    }
  };

  return (
    <div className="md:w-1/2 mx-auto shadow-2xl pb-2 bg-black shadow-white bg-opacity-60 rounded-2xl">
      {/**Steper */}
      <div className="container mt-5">
        <Stepper steps={steps} currentStep={currentStep} />
        {/**Display components */}
        <div className="my-10 px-10 py-2">
          <StepperContext.Provider
            value={{
              setUserId,
              UserId,
              finallData,
              setfinallData,
              dinner,
              setdinner,
              user,
              setuser,
            }}
          >
            {displayStep(currentStep)}
          </StepperContext.Provider>
        </div>
      </div>
      {/**Navigation */}
      {currentStep !== steps.length && (
        <StepperControll
          handleClick={handleClick}
          steps={steps}
          currentStep={currentStep}
        />
      )}
    </div>
  );
};

export default RegisterForm;
