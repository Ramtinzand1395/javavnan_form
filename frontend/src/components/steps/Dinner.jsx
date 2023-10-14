import { useContext, useState } from "react";
import { Field, Formik, Form } from "formik";
import { dinnerService } from "../../services/userService";
import { toast } from "react-toastify";
import { StepperContext } from "../context/StepperContext";
const Dinner = () => {
  const { dinner, setdinner, UserId } = useContext(StepperContext);
const [Totall, setTotall] = useState();
  const getPrice = (values) => {
    let totalPrice = 0;
    if (values.dinner === "nodinner") {
      totalPrice += 50000;
    } else if (values.dinner === "olvie") {
      totalPrice += 100000;
    }

    if (values.drinks === "cocakola") {
      totalPrice += 7000;
    } else if (values.drinks === "fanta") {
      totalPrice += 6000;
    } else if (values.drinks === "noDrink") {
      totalPrice += 0;
    }

    setTotall(totalPrice)
    return totalPrice;
  };
  const registerDinner = async (values) => {
    try {
      const { data, status } = await dinnerService(values, UserId, Totall);
      if (status === 201) {
        toast.success(data.message);
        setdinner(data.selectedDinner);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <Formik
          initialValues={{
            dinner: dinner.dinnerStatus,
            drinks: dinner.drinksStatus,
          }}
          onSubmit={(values) => {
            registerDinner(values);
          }}
        >
          {({ values }) => (
            <Form>
              <label
                className={` md:text-base font-medium text-xs mb-2 text-black font-vazir text-start bg-gray-400 py-1 px-2 rounded-lg flex items-center hover:bg-green-400 transition-all duration-200 ease-in-out`}
              >
                <Field
                  type="radio"
                  name="dinner"
                  value="nodinner"
                  className="ml-2"
                />
                بدون شام (بلیط ورود به بزم به همراه پکیج)
                <span className="text-red-500">50000 تومان</span>
              </label>

              <label
                className={` md:text-base font-medium text-xs mb-2 text-black font-vazir text-start bg-gray-400 py-1 px-2 rounded-lg flex items-center hover:bg-green-400 transition-all duration-200 ease-in-out`}
              >
                <Field
                  type="radio"
                  name="dinner"
                  value="olvie"
                  className="ml-2"
                />
                شام الوویه (بلیط ورود به بزم به همراه پکیج)
                <span className="text-red-500">100000 تومان</span>
              </label>
              {/**noshidani */}
              <label
                className={` md:text-base font-bold text-xs mb-2 text-black font-vazir text-start `}
              >
                انتخاب نوشیدنی
              </label>

              <label
                className={` md:text-base font-medium text-xs mb-2 text-black font-vazir text-start bg-gray-400 py-1 px-2 rounded-lg flex items-center hover:bg-green-400 transition-all duration-200 ease-in-out`}
              >
                <Field
                  type="radio"
                  name="drinks"
                  value="noDrink"
                  className="ml-2"
                />
                بدون نوشیدنی
              </label>

              <label
                className={` md:text-base font-medium text-xs mb-2 text-black font-vazir text-start bg-gray-400 py-1 px-2 rounded-lg flex items-center hover:bg-green-400 transition-all duration-200 ease-in-out`}
              >
                <Field
                  type="radio"
                  name="drinks"
                  value="cocakola"
                  className="ml-2"
                />
                نوشابه مشکی کوکا کولا
                <span className="text-red-500">7000 تومان</span>
              </label>

              <label
                className={` md:text-base font-medium text-xs mb-2 text-black font-vazir text-start bg-gray-400 py-1 px-2 rounded-lg flex items-center hover:bg-green-400 transition-all duration-200 ease-in-out`}
              >
                <Field
                  type="radio"
                  name="drinks"
                  value="fanta"
                  className="ml-2"
                />
                نوشابه زرد فانتا
                <span className="text-red-500">6000 تومان</span>
              </label>

              <div>شام شما: {values.dinner}</div>
              <div>نوشیدنی شما: {values.drinks}</div>
              <div> مجموع قیمت پرداختی: {getPrice(values)}</div>
              <div className="mx-2 flex items-start flex-col">
                <button
                  type="submit"
                  className="w-full py-2 text-white bg-blue-400 font-vazir mt-5 rounded-full hover:bg-blue-500 hover:border border-black transition-all delay-75"
                >
                  ثبت اطلاعات
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Dinner;
