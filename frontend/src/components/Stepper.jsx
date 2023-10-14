import { useEffect, useRef, useState } from "react";

const Stepper = ({ currentStep, steps }) => {
  const [newStep, setnewStep] = useState([]);
  const stepRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    let count = 0;

    while (count < newStep.length) {
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highligthed: true,
          selected: true,
          complited: true,
        };
        count++;
      } else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highligthed: false,
          selected: true,
          complited: true,
        };
        count++;
      } else {
        newSteps[count] = {
          ...newSteps[count],
          highligthed: false,
          selected: false,
          complited: false,
        };
        count++;
      }
    }
    return newSteps;
  };
  useEffect(() => {
    //create Object
    const stepsState = steps.map((step, index) => 
      Object.assign(
        {},
        {
          description: step,
          complited: false,
          highligthed: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      )
    );
    stepRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepRef.current);
    setnewStep(current);
  }, [steps, currentStep]);
  const displaySteps = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={
          index !== newStep.length - 1
            ? "w-full flex items-center"
            : "flex items-center"
        }
      >
        <div className="relative flex flex-col items-center text-teal-600">
          {/**Dispaly number */}
          <div className={`rounded-full transition-all duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 ${step?.selected ? "bg-green-600 text-white font-bold border border-green-600" : ""}`}>
           {step.complited ? (<span className="text-white font-bold text-xl">&#10003;</span>) : (index + 1)}
          </div>
          {/**Display description */}
          <div className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium ${step.highligthed ? "text-gray-900" : "text-gray-400"}`}>
            {step.description}
          </div>
        </div>
        {/**display line */}
        <div className={`flex-auto border-t-2 transition-all duration-500 ease-in-out ${step.complited ? "border-green-600" : "border-gray-300"}`}></div>
      </div>
    );
  });

  return (
    <div className="mx-4 p-4 flex justify-between items-center">
      {displaySteps}
    </div>
  );
};

export default Stepper;
