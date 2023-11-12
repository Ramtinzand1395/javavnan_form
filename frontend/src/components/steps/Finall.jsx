import React, { useEffect, useState } from "react";
import {
  createQRcodeService,
  paymentresponseService,
} from "../../services/userService";
import { useNavigate } from "react-router-dom";

const Finall = ({ Authority, Status }) => {
  const [PayStatus, setPayStatus] = useState("");
  const [QrcodeImg, setQrcodeImg] = useState("");
  const [Isvalid, setIsvalid] = useState(false);
  const UserId = localStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    const getdata = async () => {
      try {
        const { data, status } = await paymentresponseService({
          query: { Authority, Status },
        });
        if (status === 200) {
          setIsvalid(true);
          const getinfo = async () => {
            const { data: QRcode } = await createQRcodeService(UserId);
            setQrcodeImg(QRcode.url);
          };
          getinfo();
          setPayStatus(data);
        }
      } catch (err) {
        console.log(err);
        setIsvalid(false);
        setPayStatus(err.response.data);
      }
    };
    getdata();
  }, [Authority, Status, UserId]);

  const handleback = () => {
    navigate("/");
  };
  return (
    <div>
      <p className="text-white">
        <p
          className={`text-white bg-red-500 p-3 ${
            Isvalid ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {PayStatus}
        </p>
        {Isvalid ? (
          <div className="bg-white p-5">
            <p className="text-red-500">
               از کد زیر عکس بگیرید بلیط ورود و شام شما این میباشد.
               هنگام ورود حتما آنرا به همراه داشته باشید.
            </p>
            {QrcodeImg.length > 0 ? (
              <img src={QrcodeImg} className="w-[50vw] h-[50vh]" alt="QrcodeImg" />
            ) : (
              <p>در حال ساخت بلیط منتظر بمانید.</p>
            )}
          </div>
        ) : (
          <div className="bg-white w-[50vw] p-5 absolute right-[25vw] mt-10 text-black text-center font-vazir text-2xl ">
            <p>
              {" "}
              برای ثبت نام و دسترسی به qrcode عملیات ثبت نام را دوباره انجام
              دهید.{" "}
            </p>
          </div>
        )}
      </p>
        <div className="flex items-center justify-center">
        <button className="px-10 py-2 bg-green-500 rounded-lg font-vazir mt-[50vh]" onClick={() => handleback()}>
           بازگشت به صفحه اصلی
        </button>
        </div>
    </div>
  );
};

export default Finall;
