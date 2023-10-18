const StepperControll = ({ handleClick, currentStep }) => {
  return (
    <div className="container flex justify-around mt-4 mb-8">
      {/**back btn */}
      <button
        onClick={() => handleClick()}
        className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold  border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200 ease-in-out font-tanha ${
          currentStep === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        قبلی
      </button>
      {/**next btn */}
      <button
        onClick={() => handleClick("next")}
        className={`${
          currentStep === 3 ? "hidden" : "cursor-pointer"
        } bg-green-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200 ease-in-out font-tanha `}
      >
        بعدی
      </button>
    </div>
  );
};

export default StepperControll;
