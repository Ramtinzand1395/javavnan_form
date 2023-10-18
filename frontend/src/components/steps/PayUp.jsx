import { useContext, useEffect, useState } from "react";
import { getInfoService } from "../../services/userService";
import { StepperContext } from "../context/StepperContext";
import { useNavigate } from "react-router-dom";

const PayUp = () => {
  const { UserId } = useContext(StepperContext);
  const [userInfo, setuserInfo] = useState([]);
  const [dinnerInfo, setdinnerInfo] = useState([]);

  const alterDinner = (dinner) => {
    let DinnerName = "";
    let DrinkName = "";
    switch (dinner.dinnerStatus) {
      case "nodinner":
        DinnerName = " بدون غذا ";
        break;

      case "olvie":
        DinnerName = " ساندویچ اولوویه ";
        break;

      case "calbas":
        DinnerName = " ساندویچ کالباس";
        break;
      default:
    }
    switch (dinner.drinksStatus) {
      case "noDrink":
        DrinkName = " بدون نوشیدنی ";
        break;

      case "fanta":
        DrinkName = " نوشابه زرد (فانتا) ";
        break;

      case "cocakola":
        DrinkName = "نوشابه مشکی پپسی";
        break;
      default:
    }
    return [DinnerName, DrinkName];
  };
  useEffect(() => {
    const getinfo = async () => {
      const { data } = await getInfoService(UserId);
      setuserInfo(data.user);
      setdinnerInfo(data.dinner);
    };
    getinfo();
  }, [UserId]);
  return (
    <div>
      <div className="mb-2">
        <h2 className="text-white font-bold font-vazir text-center text-2xl mb-2">
          با درود
        </h2>
        <p className="text-white font-bold font-vazir text-center text-2xl  mb-2">
          اطلاعات خود را بررسی و سپس جهت پرداخت اقدام نمایید
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="">
          <label className="text-white font-bold font-vazir text-2xl text-start mb-2">
            اطلاعات فردی{" "}
          </label>
          {userInfo.map((user) => (
            <div key={user._id}>
              <p className="text-white font-vazir text-base text-start">
                نام : {user.name} 
              </p>
              <p className="text-white font-vazir text-base text-start">
                نام خانودگی : {user.lastname}
              </p>
            </div>
          ))}
        </div>

        <div className="">
          <label className="text-white font-bold font-vazir text-2xl text-start mb-2">
            اطلاعات شام{" "}
          </label>
          {dinnerInfo.map((dinner) => {
            const [DinnerName, DrinkName] = alterDinner(dinner);
            return (
              <div className="" key={dinner._id}>
                <h2 className="text-white font-vazir text-base text-start">
                  <p> شام:{DinnerName}</p>
                 <p> نوشیدنی :{DrinkName}</p>
                </h2>
                <p className="text-white font-semibold font-vazir text-base mt-4">
                  مجموع قیمت پرداختی : {dinner.price}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {dinnerInfo.map((dinner) => (
        <a
          key={dinner._id}
          className="bg-green-500 px-6 py-1 text-white font-vazir rounded-lg my-4"
          href={`https://idpay.ir/icewizard-10/${dinner.price}0`}
          target="_blank" // Add this attribute to open the link in a new window
          rel="noopener noreferrer"
        >
          پرداخت
        </a>
      ))}
      <div className="flex items-center justify-around mt-4 p-2 bg-white opacity-80 rounded-lg">
        <p className="text-red-500 font-vazir text-center text-base">
          متخریم به شما اعلام کنیم بار سرد با اعنواع نوشیدنی ها جهت استفاده
          همکیشان عزیز راه اندازی شد
        </p>
      </div>
    </div>
  );
};

export default PayUp;
