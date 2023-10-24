import { useContext, useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { dinnerService } from "../../services/userService";
import { toast } from "react-toastify";
import { StepperContext } from "../context/StepperContext";
import { dinnerValidation } from "../validation/Validation";

const Dinner = () => {
  const { dinner, setdinner, UserId } = useContext(StepperContext);
  const [Totall, setTotall] = useState();
  const [loading, setloading] = useState(false);

  const getPrice = (values) => {
    let totalPrice = 0;
    if (values.dinner === "nodinner") {
      totalPrice += 89000;
    } else if (values.dinner === "olvie") {
      totalPrice += 110000;
    } else if (values.dinner === "calbas") {
      totalPrice += 136000;
    }

    if (values.drinks === "cocakola") {
      totalPrice += 13000;
    } else if (values.drinks === "fanta") {
      totalPrice += 13000;
    } else if (values.drinks === "noDrink") {
      totalPrice += 0;
    }

    setTotall(totalPrice);
    return totalPrice;
  };
  const registerDinner = async (values) => {
    setloading(true);
    if (!UserId) {
      setloading(false);
      toast.error("اطلاعات فردی شما ثبت نشده دوباره تلاش کنید.");
    } else {
      try {
        const { data, status } = await dinnerService(values, UserId, Totall);
        if (status === 201) {
          toast.success(data.message);
          setdinner(data.selectedDinner);
        }
        setloading(false);
      } catch (err) {
        setloading(false);
        toast.error(err.response.data.message);
        console.log(err);
      }
    }
    setloading(false);
  };
  return (
    <div className="flex flex-col font-tanha">
      <div className="w-full mx-2 flex-1">
        <Formik
          initialValues={{
            dinner: dinner.dinnerStatus,
            drinks: dinner.drinksStatus,
          }}
          validationSchema={dinnerValidation}
          onSubmit={(values) => {
            registerDinner(values);
          }}
        >
          {({ values }) => (
            <Form>
              <div className="mb-2">
                <label
                  className={` md:text-base font-bold text-xs mb-4 text-white text-start `}
                >
                  انتخاب شام
                </label>
              </div>

              <label
                className={` md:text-base font-medium text-xs mb-2 text-black  text-start bg-white py-1 px-2 rounded-lg flex items-center hover:bg-green-400 transition-all duration-200 ease-in-out`}
              >
                <Field
                  type="radio"
                  name="dinner"
                  value="nodinner"
                  className="ml-2"
                />
                بدون شام ( بلیط ورودی به همراه فینگرفود و تم بزم )
                <span className="text-red-500 mx-2 text-xs font-medium ">
                  89,000 تومان
                </span>
              </label>

              <label
                className={` md:text-base font-medium text-xs mb-2 text-black font-vazir text-start bg-white py-1 px-2 rounded-lg flex items-center hover:bg-green-400 transition-all duration-200 ease-in-out`}
              >
                <Field
                  type="radio"
                  name="dinner"
                  value="olvie"
                  className="ml-2"
                />
                الوویه ( بلیط ورودی به همراه فینگرفود و تم بزم )
                <span className="text-red-500 mx-2 text-xs font-medium ">
                  110,000 تومان
                </span>
              </label>

              <label
                className={` md:text-base font-medium text-xs mb-2 text-black font-vazir text-start bg-white py-1 px-2 rounded-lg flex items-center hover:bg-green-400 transition-all duration-200 ease-in-out`}
              >
                <Field
                  type="radio"
                  name="dinner"
                  value="calbas"
                  className="ml-2"
                />
                ساندویچ کالباس ( بلیط ورودی به همراه فینگرفود و تم بزم )
                <span className="text-red-500 mx-2 text-xs font-medium ">
                  136,000 تومان
                </span>
              </label>
              <ErrorMessage name="dinner" component="div" className="text-red-500 text-xs" />

              {/**noshidani */}
              <div className="mb-2">
                <label
                  className={` md:text-base font-bold text-xs mb-4 text-white text-start `}
                >
                  انتخاب نوشیدنی
                </label>
              </div>

              <label
                className={` md:text-base font-medium text-xs mb-2 text-black font-vazir text-start bg-white py-1 px-2 rounded-lg flex items-center hover:bg-green-400 transition-all duration-200 ease-in-out`}
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
                className={` md:text-base font-medium text-xs mb-2 text-black font-vazir text-start bg-white py-1 px-2 rounded-lg flex items-center hover:bg-green-400 transition-all duration-200 ease-in-out`}
              >
                <Field
                  type="radio"
                  name="drinks"
                  value="cocakola"
                  className="ml-2"
                />
                نوشابه مشکی کوکا کولا
                <span className="text-red-500 mx-2 text-xs font-medium ">
                  13,000 تومان
                </span>
              </label>

              <label
                className={` md:text-base font-medium text-xs mb-2 text-black font-vazir text-start bg-white py-1 px-2 rounded-lg flex items-center hover:bg-green-400 transition-all duration-200 ease-in-out`}
              >
                <Field
                  type="radio"
                  name="drinks"
                  value="fanta"
                  className="ml-2"
                />
                نوشابه زرد فانتا
                <span className="text-red-500 mx-2 text-xs font-medium ">
                  13,000 تومان
                </span>
              </label>
              <ErrorMessage name="drinks" component="div" className="text-red-500 text-xs" />

              <div className="opacity-0">
                {" "}
                مجموع قیمت پرداختی: {getPrice(values)}
              </div>

              <div className="mx-2 flex items-start flex-col">
                <button
                  type="submit"
                  className="w-full py-2 text-white bg-blue-400 font-vazir mt-5 rounded-full hover:bg-blue-500 hover:border border-black transition-all delay-75"
                >
                  {loading ? " در حال ثبت شام " : " ثبت اطلاعات شام"}
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
