import { useContext, useEffect, useState } from "react";
import { getInfoService } from "../../services/userService";
import { StepperContext } from "../context/StepperContext";
import { useNavigate } from "react-router-dom";

const PayUp = () => {
  const { UserId } = useContext(StepperContext);
  const [userInfo, setuserInfo] = useState([]);
  const [dinnerInfo, setdinnerInfo] = useState([]);

  useEffect(() => {
    const getinfo = async () => {
      const { data } = await getInfoService(UserId);
      setuserInfo(data.user);
      setdinnerInfo(data.dinner);
    };
    getinfo();
  }, [UserId]);
  return (
    <div className="flex flex-col items-center justify-between">
      <h2 className="text-white font-bold font-vazir text-center text-2xl">
        با درود
      </h2>
      <p className="text-white font-bold font-vazir text-center text-2xl">
        اطلاعات خود را بررسی و سپس برای پرداخت اقدام نمایید
      </p>
      {userInfo.map((user) => (
        <div
          className="text-white font-bold font-vazir text-center text-2xl"
          key={user._id}
        >
          <p>
            اطلاعات فردی : {user.name} {user.lastname}
          </p>
        </div>
      ))}

      {dinnerInfo.map((dinner) => (
        <div className="" key={dinner._id}>
          <p className="text-white font-bold font-vazir text-center text-2xl">
            اطلاعات شام : {dinner.dinnerStatus} {dinner.drinksStatus}
          </p>
          <p>مجموع قیمت پرداختی : {dinner.price}</p>
          <a className="bg-green-500" href={`https://idpay.ir/icewizard-10/${dinner.price}0`}>
            پرداخت
          </a>{" "}
        </div>
      ))}
    </div>
  );
};

export default PayUp;
