import { useState } from "react";

import { StepperContext } from "../components/context/StepperContext";
import Acount from "./steps/Acount";
import Dinner from "./steps/Dinner";
import PayUp from "./steps/PayUp";
import Finall from "./steps/Finall";
import Stepper from "./Stepper";
import StepperControll from "./StepperControll";
import { Link } from "react-router-dom";
const RegisterForm = () => {
  const [currentStep, setcurrentStep] = useState(1);
  const [UserId, setUserId] = useState("");
  const [dinner, setdinner] = useState("");
  const [user, setuser] = useState([]);
  const [finallData, setfinallData] = useState([]);
  const steps = ["اطلاعات فردی", "شام", "پرداخت", "تمام"];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Acount />;
      case 2:
        return <Dinner />;
      case 3:
        return <PayUp />;
      case 4:
        return <Finall />;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setcurrentStep(newStep);
  };

  return (
    <div className="md:w-1/2 mx-auto shadow-2xl pb-2 bg-white rounded-2xl">
      {/**Steper */}
      <div className="container mt-5">
        <Stepper steps={steps} currentStep={currentStep} />
        {/**Display components */}
        <div className="my-10 p-10">
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
      <Link to={"/login"}>ورود</Link>
    </div>
  );
};

export default RegisterForm;
