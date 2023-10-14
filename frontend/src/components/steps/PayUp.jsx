import { useContext, useEffect, useState } from "react";
import { getInfoService } from "../../services/userService";
import { StepperContext } from "../context/StepperContext";

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
    <div>
      {userInfo.map((user) => (
        <div className="" key={user._id}>
          <p>
            اطلاعات فردی : {user.name} {user.lastname}
          </p>
        </div>
      ))}

      {dinnerInfo.map((dinner) => (
        <div className="" key={dinner._id}>
          <p className="">
            اطلاعات شام : {dinner.dinnerStatus} {dinner.drinksStatus}
          </p>
          <p>مجموع قیمت پرداختی : {dinner.price}</p>
        </div>
      ))}
    </div>
  );
};

export default PayUp;
