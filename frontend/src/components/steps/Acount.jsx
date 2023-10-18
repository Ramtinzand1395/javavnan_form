import { useContext, useState } from "react";
import { Field, ErrorMessage, Formik, Form } from "formik";
import { registerUserService } from "../../services/userService";
import { toast } from "react-toastify";
import { StepperContext } from "../context/StepperContext";
import {userValidation} from "../validation/Validation"
const Acount = () => {
  const { setUserId, user, setuser, UserId } = useContext(StepperContext);
  const [loading, setloading] = useState(false);
  const registerUser = async (values) => {
    try {
      const { data, status } = await registerUserService(values, UserId);
      if (status === 201) {
        setloading(true);
        toast.success(data.message);
        setUserId(data.userId);
        setuser(data.user);
      }
      setloading(false);
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  };

  return (
    <div className="flex flex-col font-tanha">
      <div className="w-full mx-2 flex-1">
        <Formik
          initialValues={{
            name: user.name,
            lastname: user.lastname,
          }}
          validationSchema={userValidation}

          onSubmit={(values) => {
            registerUser(values);
          }}
        >
          <Form>
            <label
              className={`block md:text-base font-bold text-xs mb-2 text-white font-tanha text-start`}
            >
              نام
            </label>
            <Field
              name="name"
              type="text"
              className="p-2 mb-5 px-2 appearance-none outline-none w-full text-black bg-white-400 focus:bg-gray-600 border focus:text-white border-black text-base rounded-lg"
            />

            <ErrorMessage
              name="name"
              render={(msg) => <div className="text-red-500 m-4">{msg}</div>}
            />
            <label
              className={`block md:text-base font-bold text-xs mb-2 text-white font-tanha text-start`}
            >
              نام خانوادگی
            </label>
            <Field
              name="lastname"
              type="text"
              className="p-2 mb-5 px-2 appearance-none outline-none w-full text-black bg-white-400 focus:bg-gray-600 border focus:text-white border-black text-base rounded-lg"
            />

            <ErrorMessage
              name="lastname"
              render={(msg) => <div className="text-red-500 m-4">{msg}</div>}
            />
            <div className="mx-2 flex items-start flex-col">
              <button
                type="submit"
                className="w-full py-2 text-white bg-blue-400 font-vazir mt-5 rounded-full hover:bg-blue-500 border border-white transition-all delay-75"
              >
                {loading ? " در حال ثبت نام " : " ثبت اطلاعات"}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Acount;
