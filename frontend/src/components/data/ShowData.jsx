import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getInfoService } from "../../services/userService";

const ShowData = () => {
    const { userId } = useParams();

  const [userInfo, setuserInfo] = useState([]);
  const [dinnerInfo, setdinnerInfo] = useState([]);

  useEffect(() => {
    const getinfo = async () => {
      const { data } = await getInfoService(userId);
      setuserInfo(data.user);
      setdinnerInfo(data.dinner);
    };
    getinfo();
  }, [userId]);
  return (
    <div className="bg-white mx-auto container">
      {userInfo.map((user) => (
        <div className="text-red-500" key={user._id}>
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

export default ShowData;
