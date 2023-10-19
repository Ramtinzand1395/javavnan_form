import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  arriwedUsers,
  getInfoService,
  deliverDinner,
} from "../../services/userService";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

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
console.log(localStorage.getItem("admin" , "local"))
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

  //DeleteUser
  const handleArriwed = async (userId) => {
    try {
      const { data, status } = await arriwedUsers(userId);
      if (status === 201) {
        setuserInfo([data.selectedUser]);
        toast.success(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  //Alertuser
  const confirmDelete = (user) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            className="bg-indigo-900 border-2 rounded-2xl p-4 border-white w-[50vw] h-auto"
          >
            <p className="text-white font-vazir my-5 ">
              آیا مطمعنی
              <span className="text-red-400 font-bold text-xl">
                {" "}
                {user.name}{" "}
              </span>
              را رسیده؟
            </p>
            <button
              onClick={() => {
                handleArriwed(user._id);
                onClose();
              }}
              className="bg-green-500 rounded-lg py-2 px-10 border-white border-2 text-black hover:bg-green-400 ml-5"
            >
              بله
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 rounded-lg py-2 px-10 border-white border-2 text-black hover:bg-red-400 ml-5"
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  const confirmdinner = (user) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            className="bg-indigo-900 border-2 rounded-2xl p-4 border-white w-[50vw] h-auto"
          >
            <p className="text-white font-vazir my-5 ">
              آیا مطمعنی
              <span className="text-red-400 font-bold text-xl">
                {" "}
                {user.name}{" "}
              </span>
              تحویل گرفته؟
            </p>
            <button
              onClick={() => {
                handleDinner(user._id);
                onClose();
              }}
              className="bg-green-500 rounded-lg py-2 px-10 border-white border-2 text-black hover:bg-green-400 ml-5"
            >
              بله
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 rounded-lg py-2 px-10 border-white border-2 text-black hover:bg-red-400 ml-5"
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  //DeleteUser
  const handleDinner = async (userId) => {
    try {
      const { data, status } = await deliverDinner(userId);
      if (status === 201) {
        setuserInfo([data.selectedUser]);
        toast.success(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  return (
    <div
      className={`mx-auto container bg-white text-black font-vazir font-bold`}
    >
      {userInfo.map((user) => (
        <div key={user._id}>
          <p>
            اطلاعات فردی : {user.name} {user.lastname}
          </p>
        </div>
      ))}

      {dinnerInfo.map((dinner) => {
        const [DinnerName, DrinkName] = alterDinner(dinner);
        return (
          <div className="" key={dinner._id}>
           <p> شام:{DinnerName}</p>
                 <p> نوشیدنی :{DrinkName}</p>
          </div>
        );
      })}
      {/**btn */}
      <div>
        {userInfo.map((user) => (
          <div className="text-black p-4" key={user._id}>
            <button
              onClick={() => confirmDelete(user)}
              className="bg-green-500 rounded-md px-4 py-1 mx-2"
            >
              {user.status === "arriwed" ? "قبلا وارد شده" : "  تایید ورود"}
            </button>
            <button
              onClick={() => confirmdinner(user)}
              className="bg-orange-400 rounded-md px-4 py-1 mx-2"
            >
              {user.dinnerstatus === "delliverd"
                ? "تحویل داده شده "
                : " تحویل شام"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowData;
